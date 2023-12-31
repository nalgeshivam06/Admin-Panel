
import React, { useEffect, useState } from 'react';

const HeaderInfoSection = () => {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/getHeaderInfoSection')
            .then((response) => response.json())
            .then((data) => setApiData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleDelete = (headerId) => {
        fetch(`http://localhost:8080/api/deleteHeaderInfoSection/${headerId}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => setApiData(data))
            .catch((error) => console.error('Error deleting data:', error));
    };

    return (
        <div className='border-t border-red-400 mt-5 py-6 mx-4 flex gap-x-6'>
            {apiData && apiData.map((item) => (
                <div key={item._id} style={{ marginBottom: '30px' }}>
                    <h2 className='text-orange-500 text-xl my-2 font-bold'>{item.headerTitle}</h2>
                    {item.sections.map((section) => (
                        <div key={section._id} style={{ marginBottom: '20px' }}>
                            <h3>{section.sectionName}</h3>
                            {section.content.map((contentItem) => (
                                <div key={contentItem._id} style={{ marginBottom: '10px' }}>
                                    <p>
                                        <strong>Subheader:</strong> {contentItem.subheader}
                                    </p>
                                    <p>
                                        <strong>Paragraph:</strong> {contentItem.paragraph}
                                    </p>
                                    <img
                                        src={`${contentItem.icon}`}
                                        alt={contentItem.icon}
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                    <button
                        type="button"
                        className="mt-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1"
                        onClick={() => handleDelete(item._id)}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default HeaderInfoSection;
