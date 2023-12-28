import React from 'react'
import AdminProductList from '../components/AdminProductList'
import AdminNavbar from '../components/AdminNavbar'

const AdminPanel = ({ currentWidth }) => {
  return (
    <div>
      <AdminNavbar/>
      <main className="mx-auto max-w-8xl px-0 sm:px-6 lg:px-16">
        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Product grid */}
            <div className="lg:col-span-3">
              {/* Your content */}
              <AdminProductList currentWidth={currentWidth} />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminPanel