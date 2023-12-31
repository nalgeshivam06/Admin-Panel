import React from 'react'
// import AdminProductList from '../components/AdminProductList'
import AdminNavbar from '../components/AdminNavbar'
import ProductForm from '../components/product/ProductForm'

const AdminPanel = ({ currentWidth }) => {
  return (
    <div>
      <AdminNavbar/>
      <ProductForm/>
    </div>
  )
}

export default AdminPanel