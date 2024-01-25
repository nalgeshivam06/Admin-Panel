        import React, { useEffect, useState } from 'react';
        import { useNavigate } from 'react-router-dom';
        import axios from 'axios';
        import { BASE_URL } from '../../../../config';

        const Imagechanger = () => {
            const [imgChangerData, setImgChangerData] = useState([]);
            const [imageFile, setImageFile] = useState(null);
            const [description, setDescription] = useState('');
            const [title, setTitle] = useState('');
            const navigate = useNavigate();

            useEffect(() => {
                const fetchImageData = async () => {
                    try {
                        const response = await axios.get(`${BASE_URL}/api/getImgChanger`);
                        setImgChangerData(response.data);
                    } catch (error) {
                        console.error('Error fetching image data:', error);
                    }
                };

                fetchImageData();
            }, []);

            const handleDelete = async () => {
                try {
                    const response = await axios.delete(`${BASE_URL}/api/deleteImgChanger/${imgChangerData._id}`);
                    
                    if (!response.data) {
                        console.error('Error deleting image data:', response.statusText);
                        return;
                    }

                    setImgChangerData(response.data);
                } catch (error) {
                    console.error('Error deleting image data:', error);
                }
            };

            const handleCreate = async () => {
            try {
                const formData = new FormData();
                formData.append('image', imageFile);
                formData.append('desc', description);
                formData.append('title', title);
        
                const response = await axios.post(`${BASE_URL}/api/createImgChanger`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
        
                if (!response.data) {
                    console.error('Error creating image data:', response.statusText);
                    return;
                }
        
                setImgChangerData(response.data);
            } catch (error) {
                console.error('Error creating image data:', error);
            }
        };
        

            const handleFileChange = (event) => {
                setImageFile(event.target.files[0]);
            };

            return (
                <div className='mt-4 border-t border-red-400 py-4 mx-4'>
                    <div className='text-center mb-6'>
                        <h1 className='font-bold'>Image changer</h1>
                        <span className='text-red-400 mt-1 hover:cursor-pointer' onClick={() => navigate('/homePage/create-image-changer')}>Create New</span>
                    </div>
                    {imgChangerData && (
                        <div className="p-4 border border-gray-200 rounded-md">
                            <img
                                src={imgChangerData.img}
                                alt={`Image ${imgChangerData._id}`}
                                className="w-full h-40 object-cover rounded-md mb-2"
                            />
                            <p className='mb-2 mt-1 text-sm'>{imgChangerData.text}</p>
                            <button
                                type="button"
                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                    <div className="mt-4">
                        <label htmlFor="imageInput" className="text-sm font-medium text-gray-600">
                            Select Image:
                        </label>
                        <input
                            type="file"
                            id="imageInput"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <label htmlFor="descriptionInput" className="text-sm font-medium text-gray-600 mt-2">
                            Description:
                        </label>
                        <input
                            type="text"
                            id="descriptionInput"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <label htmlFor="titleInput" className="text-sm font-medium text-gray-600 mt-2">
                            Title:
                        </label>
                        <input
                            type="text"
                            id="titleInput"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <button
                            type="button"
                            className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-1 mt-4"
                            onClick={handleCreate}
                        >
                            Create New Image
                        </button>
                    </div>
                </div>
            );
        };

        export default Imagechanger;
