import React, { useState, useEffect } from 'react'

const Slider = () => {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/getImgCircle')
            .then((response) => response.json())
            .then((data) => setApiData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleDelete = (circleId) => {
        fetch(`http://localhost:8080/api/deleteSliderCircle/${circleId}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => setApiData(data))
            .catch((error) => console.error('Error deleting data:', error));
    };
    return (
        <>
        <div className='flex justify-between mt-6 mx-4'>
            {apiData && apiData.map((item) => (
                <div key={item._id} style={{ marginBottom: '20px', position: "relative" }}>
                    <img src={item.imgSrc} alt="Product" style={{ maxWidth: '100%', width: "400px", height: "200px" }} />
                    {item.circles.map((circle) => (
                        <div
                            key={circle._id}
                            style={{
                                position: 'absolute',
                                top: `${circle.topPosition}%`,
                                left: `${circle.leftPosition}%`,
                                transform: 'translate(-50%, -50%)',
                                background: 'red',
                                color: 'white',
                                padding: '5px',
                                borderRadius: '50%',
                            }}
                        >
                            <p>{circle.productTitle}</p>
                            <p>{circle.productCategory}</p>
                            <p>${circle.price.toFixed(2)}</p>
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
            ))}
        </div>
    </>
    )
}

export default Slider