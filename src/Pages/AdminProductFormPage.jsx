import React from 'react'
import ProductForm from '../components/product/ProductForm'
import AdminNavbar from '../components/AdminNavbar'

const AdminProductFormPage = () => {
  return (
    <div>
      <AdminNavbar/>
      <ProductForm />
    </div>
  )
}

export default AdminProductFormPage