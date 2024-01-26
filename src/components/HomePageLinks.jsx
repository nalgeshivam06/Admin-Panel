import React from 'react';
import AdminNavbar from './AdminNavbar';
import { NavLink } from 'react-router-dom';

const HomePageLinks = () => {
    const sectionTitles = [
        "Slider section",
        "Mid Info Section (Image Changer)",
        "Header Info Section",
        "Image section",
        "Team Memebers",
        "Image Grid",
        "Map Detail",
        "Category Description",
        "Image Changer (Multiple Images)",
        "Reviews"
    ];

    return (
        <>
            <AdminNavbar />
            <div className='mb-8 mx-4 text-center py-6 homepagelinks'>
                <div className='mt-6'>
                    {sectionTitles.map((title, index) => (
                        <h4 key={index}>
                            <NavLink to={`/update-home-page/${title.toLowerCase().replace(/\s+/g, '-')}`}>
                                {title}
                            </NavLink>
                        </h4>
                    ))}
                </div>
            </div>
        </>
    );
};

export default HomePageLinks;
