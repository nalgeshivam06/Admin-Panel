import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../../config';
import AdminNavbar from '../../AdminNavbar';

const ImagechangerForm = () => {
    const [imageFiles, setImageFiles] = useState([]);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const navigate = useNavigate();

    const handleCreate = async () => {
        try {
            const formData = new FormData();
            imageFiles.forEach((file, index) => {
                formData.append(`image`, file);
            });
            formData.append('desc', description);
            formData.append('title', title);

            const response = await fetch(`${BASE_URL}/api/createImgChanger`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                console.error('Error creating image data:', response.statusText);
                return;
            }

            const data = await response.json();
            window.alert(data.message)
            navigate('/homePage')
            
        } catch (error) {
            console.error('Error creating image data:', error);
        }
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        setImageFiles([...imageFiles, ...files]);
    }    

    return (
        <>
        <AdminNavbar/>

            <div className='max-w-md mx-auto p-6 border rounded-md shadow-md mt-10'>
                <div className="mt-4">
                    <label htmlFor="imageInput" className="block text-sm font-medium leading-5 text-gray-700">
                        Select Image:
                    </label>
                    <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        onChange={handleFileChange}
                        multiple
                        className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                    />
                    <label htmlFor="descriptionInput" className="mt-5 block text-sm font-medium leading-5 text-gray-700">
                        Description:
                    </label>
                    <input
                        type="text"
                        id="descriptionInput"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                    />
                    <label htmlFor="titleInput" className="mt-5 block text-sm font-medium leading-5 text-gray-700">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="titleInput"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                    />
                    <button
                        type="button"
                        className="mt-5 w-full bg-indigo-500 p-3 rounded-md text-white font-medium focus:outline-none focus:shadow-outline-indigo active:bg-indigo-600"
                        onClick={handleCreate}
                    >
                        Create Multi Image Changer
                    </button>
                </div>
            </div>
        </>
    );
};

export default ImagechangerForm;
