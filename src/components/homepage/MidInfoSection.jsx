import React, { useState, useEffect } from 'react';

const MidInfoSection = () => {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/getMidInfoSection')
            .then((response) => response.json())
            .then((data) => setApiData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    if (!apiData || apiData.length === 0 || !apiData[0]) {
        return <p>No midinfo section available</p>;
    }

    const { staticContent, sections } = apiData[0];

    const handleDelete = (midInfoId) => {
        fetch(`http://localhost:8080/api/deleteMidSection/${midInfoId}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => setApiData(data))
            .catch((error) => console.error('Error deleting data:', error));
    };

    return (
        <div>
            <h1>{staticContent?.title}</h1>
            <h2>{staticContent?.subtitle}</h2>

            {sections?.map((section) => (
                <div key={section._id} style={{ margin: '20px 0' }}>
                    <h3>{section.heading}</h3>
                    <p>{section.text}</p>
                    <img src={section.imageUrl} alt={section.heading} style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
            ))}

            <button
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1"
                onClick={() => handleDelete(apiData[0]._id)}
            >
                Delete
            </button>
        </div>
    );
};

export default MidInfoSection;
