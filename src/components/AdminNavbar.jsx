import Logo from '../assets/react.svg'
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';

const AdminNavbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="flex items-center justify-between md:justify-left py-2 lg:py-3  bg-black text-white px-0 md:px-6">

            {/* go back */}
            <div to="/admin" className="ml-3 mr-3" onClick={() => navigate(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                </svg>
            </div>

            <div className='flex'>
                <div className='mr-4'>
                    <NavLink to="/admin">Create Product</NavLink>
                </div>
                <div className='mr-2'>
                    <NavLink to="/admin">Update Home Page</NavLink>
                </div>
            </div>

            {/* <Sidebar/> */}
        </nav>
    );
};

export default AdminNavbar;
