import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../../config';

const ImgGrid = () => {
    const [gridImgData, setGridImgData] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${BASE_URL}/api/gridImg`)
            .then((response) => response.json())
            .then((data) => setGridImgData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleDelete = (imgGridId) => {
        fetch(`${BASE_URL}/api/gridImg/${imgGridId}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => setGridImgData(data))
            .catch((error) => console.error('Error deleting data:', error));
    };

    return (
        <div className='my-8 mx-4 border-t border-red-400 pt-6'>
            <div className='text-center mb-6'>
                <h1 className='font-bold '>Image Grid</h1>
                <span className='text-green-400 font-bold  mt-1 hover:cursor-pointer' onClick={() => navigate('/homePage/create-imgGrid-section')}>Create New</span>
            </div>
            <div class="grid grid-cols-3 md:grid-cols-4 gap-4">
                {
                    gridImgData && gridImgData.map((gridImg, index) => (
                        <div>
                            <img class="h-auto max-w-full rounded-lg" src={gridImg.img} alt={gridImg.category} />
                            <div className='mb-2'><b>Category: </b>{gridImg.category}</div>
                            <button
                                type="button"
                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1"
                                onClick={() => handleDelete(gridImg._id)}
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

export default ImgGrid