import React from 'react'
// import AdminProductList from '../components/AdminProductList'
import AdminNavbar from '../components/AdminNavbar'
import ProductDisplay from '../components/product/ProductDisplay'

const AdminPanel = ({ currentWidth }) => {
  return (
    <div>
      <AdminNavbar/>
      <ProductDisplay/>
    </div>
  )
}

export default AdminPanel