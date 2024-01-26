import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../../config';

const ImageChanger = () => {
    const [imageChangerData, setImageChangerData] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${BASE_URL}/api/getImgChanger`)
            .then((response) => response.json())
            .then((data) => setImageChangerData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleDelete = (imgChanger) => {
        fetch(`${BASE_URL}/api/deleteImgChanger/${imgChanger}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => setImageChangerData(data))
            .catch((error) => console.error('Error deleting data:', error));
    };

    return (
        <div className='my-8 mx-4 border-t border-red-400 pt-6'>
            <div className='text-center mb-6'>
                <h1 className='font-bold '>Image Changer (Multiple Images)</h1>
                <span className='text-green-400 font-bold  mt-1 hover:cursor-pointer' onClick={() => navigate('/homePage/create-image-changer')}>Create Image Changer</span>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {
                    imageChangerData && imageChangerData.map((singleImgData, index) => (
                        <div key={index}>
                            <img className="h-auto max-w-full rounded-lg" src={singleImgData.img[0]} alt={singleImgData._id} />
                            <div className='mb-2'><b>Text: </b>{singleImgData.title}</div>
                            <button
                                type="button"
                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1"
                                onClick={() => handleDelete(singleImgData._id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default ImageChanger