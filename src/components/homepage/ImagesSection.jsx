import React, { useEffect, useState } from 'react';

const ImagesSection = () => {
    const [galleryData, setGalleryData] = useState([]);

    useEffect(() => {
        // Fetch data from your API endpoint
        fetch('http://localhost:8080/api/getImgSection')
            .then((response) => response.json())
            .then((data) => setGalleryData(data))
            .catch((error) => console.error('Error fetching images data:', error));
    }, []);

    const handleDelete = (imgId) => {
        fetch(`http://localhost:8080/api/deleteImgSection/${imgId}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => setGalleryData(data))
            .catch((error) => console.error('Error deleting data:', error));
    };

    return (
        <div className='mt-4 border-t border-red-400 py-4 flex mx-4'>
            {galleryData && galleryData.map((item) => (
                <div key={item._id} style={{ marginBottom: '20px',margin:"5px" }}>
                    <img
                        src={item.img}
                        alt={`Image ${item._id}`}
                        style={{ width: '300px', height: '300px' }}
                    />
                    <p className='mb-4 mt-1'>{item.text}</p>

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
    );
};

export default ImagesSection;
