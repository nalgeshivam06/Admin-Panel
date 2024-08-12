import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../../../config';

const CatDescription = () => {
    const navigate = useNavigate();
    const [categoryDescription, setcategoryDescription] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}/api/categorydescription`)
            .then((response) => response.json())
            .then((data) => setcategoryDescription(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleDelete = (id) => {
        fetch(`${BASE_URL}/api/categorydescription/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => setcategoryDescription(data))
            .catch((error) => console.error('Error deleting data:', error));
    };
    return (
        <div className='mt-6 mx-4'>
            <div className='text-center mb-6'>
                <h1 className='font-bold '>Category Description</h1>
                <span className='text-purple-400 font-bold  mt-1 hover:cursor-pointer' onClick={() => navigate('/homePage/create-category-description')}>Create New</span>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {
                    categoryDescription && categoryDescription.map((cat, index) => (
                        <div key={index}>
                            <img className="h-auto max-w-full rounded-lg" src={cat.imgSrc} alt={cat.category} />
                            <div className='mb-2'><b>Category: </b>{cat.category}</div>
                            <button
                                type="button"
                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1"
                                onClick={() => handleDelete(cat._id)}
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

export default CatDescription;