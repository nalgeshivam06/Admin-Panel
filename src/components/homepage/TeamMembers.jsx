import React, { useEffect, useState } from 'react';

const TeamMembers = () => {
    const [teamData, setTeamData] = useState([]);

    useEffect(() => {
        // Fetch data from your API endpoint
        fetch('http://localhost:8080/api/profileContent')
            .then((response) => response.json())
            .then((data) => setTeamData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleDelete = (profileId) => {
        fetch(`http://localhost:8080/api/profileContent/${profileId}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => setTeamData(data))
            .catch((error) => console.error('Error deleting data:', error));
    };

    return (
        <div className='mt-4 border-t border-red-400 py-4'>
            <h2 className='py-4 text-center font-bold'>Team Members</h2>
            <div className='mx-4 flex mx-4 gap-x-4'>
                {teamData && teamData.map((member) => (
                    <div key={member._id} style={{ marginBottom: '20px' }} className='flex flex-col mt-4  border p-2'>
                        <img
                            src={member.image}
                            alt={`${member.name}'s Image`}
                            style={{ width:"50px",height:"50px",borderRadius: '50%' }}
                        />
                        <h3>{member.name}</h3>
                        <p>{member.role}</p>
                        <p>Icon: {member.icon}</p>
                        <button
                            type="button"
                            className="mt-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 w-[60px]"
                            onClick={() => handleDelete(member._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamMembers;
