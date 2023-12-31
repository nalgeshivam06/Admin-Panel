import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="flex items-center justify-between md:justify-left py-4 lg:py-3  bg-black text-white px-0 md:px-6">

            {/* dashboard */}
            <div className='hover:cursor-pointer' onClick={()=>navigate('/admin')}>Dashboard</div>

            <div className='flex'>
                <div className='mr-4'>
                    <NavLink to="/create-product">Create Product</NavLink>
                </div>
                <div className='mr-2'>
                    <NavLink to="/homePage">Update Home Page</NavLink>
                </div>
            </div>

        </nav>
    );
};

export default AdminNavbar;
