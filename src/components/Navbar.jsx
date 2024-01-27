import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        navigate('/')
    }
  return (
    <div className='mt-4'>
      <h1 className='text-3xl font-semibold pb-4 pl-3'>AYATRIO</h1>
      <ul>
      <li className='pl-3 pt-1.5 pb-1.5 text-lg hover:bg-gray-200 rounded-full'>
      <Link to="/homePage">Home</Link>
      </li>
      <li className='pl-3 pt-1.5 pb-1.5 text-lg hover:bg-gray-200 rounded-full'>
      <Link to="/admin">Dashboard</Link>
      </li>
      <li className='pl-3 pt-1.5 pb-1.5 text-lg hover:bg-gray-200 rounded-full'>
      <Link to="/create-product">Create Product</Link>
      </li>
      <li className='pl-3 pt-1.5 pb-1.5 text-lg hover:bg-gray-200 rounded-full'>
      <Link to="/">Email</Link>
      </li>
      <li className='pl-3 pt-1.5 pb-1.5 text-lg hover:bg-gray-200 rounded-full'>
      <div className='hover:cursor-pointer'  onClick={handleLogout}>Logout</div>
      </li>
    </ul>

    </div>
  )
}

export default Navbar
