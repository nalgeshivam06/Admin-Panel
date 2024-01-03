import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../../config';

const ImagesSection = () => {
    const [galleryData, setGalleryData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${BASE_URL}/api/getImgSection`)
            .then((response) => response.json())
            .then((data) => setGalleryData(data))
            .catch((error) => console.error('Error fetching images data:', error));
    }, []);

    const handleDelete = (imgId) => {
        fetch(`${BASE_URL}/api/deleteImgSection/${imgId}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => setGalleryData(data))
            .catch((error) => console.error('Error deleting data:', error));
    };

    return (
        <div className='mt-4 border-t border-red-400 py-4 mx-4'>
            <div className='text-center mb-6'>
                <h1 className='font-bold '>Image section</h1>
                <span className='text-red-400  mt-1 hover:cursor-pointer' onClick={() => navigate('/homePage/create-image-section')}>Create New</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryData && galleryData.map((item) => (
                    <div key={item._id} className="p-4 border border-gray-200 rounded-md">
                        <img
                            src={item.img}
                            alt={`Image ${item._id}`}
                            className="w-full h-40 object-cover rounded-md mb-2"
                        />
                        <p className='mb-2 mt-1 text-sm'>{item.text}</p>
                        <button
                            type="button"
                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1"
                            onClick={() => handleDelete(item._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImagesSection;
