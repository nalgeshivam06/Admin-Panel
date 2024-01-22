import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../../config';

const MidInfoSection = () => {
    const [apiData, setApiData] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${BASE_URL}/api/getMidInfoSection`)
            .then((response) => response.json())
            .then((data) => setApiData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);


    const handleDelete = (midInfoId) => {
        fetch(`${BASE_URL}/api/deleteMidSection/${midInfoId}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => setApiData(data))
            .catch((error) => console.error('Error deleting data:', error));
    };

    return (
        <div className='border-t border-red-400 mt-5 py-6 mx-6'>
            <div className='text-center mb-6'> 
                <h1 className='font-bold'>Mid Info Section (Image Changer)</h1>
                <span className='text-green-400 mt-1 hover:cursor-pointer' onClick={()=>navigate('/homePage/create-mid-info-section')}>Create New</span>
            </div>
            <div className="flex gap-x-6">
                {apiData && apiData.map((item) => (
                    <div key={item._id} className="sample-card border rounded p-4">
                        <h2 className='font-bold'>{item.staticContent.title}</h2>
                        <h3>{item.staticContent.subtitle}</h3>
                        <div className="section-container flex">
                            {item.sections.map((section) => (
                                <div key={section._id} className="section border-r px-2">
                                    <img src={section.imageUrl} alt={section.heading} className='w-[100px] h-[100px] my-4' />
                                    <div className="section-details">
                                        <h4 className='font-bold'>{section.heading}</h4>
                                        <p>{section.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            className="text-white mt-4 text-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1"
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

export default MidInfoSection;
