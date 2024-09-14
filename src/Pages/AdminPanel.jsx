import React from 'react' 
import ProductDisplay from '../components/product/ProductDisplay'
import Dashboard from '../components/dashboard/DashBoard.jsx'


const AdminPanel = ({ currentWidth }) => {
  return (
    <div>
      {/* <ProductDisplay/> */}
      
      <Dashboard/>
    
    </div>
  )
}

export default AdminPanel