import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllProductsAsync, selectAllProducts, selectedProductCategory } from '../Features/Product/productSlice';
import { Navigate, useNavigate, Link } from 'react-router-dom';

export default function AdminProductList({currentWidth}) {
    const dispatch = useDispatch();
    const newProducts = useSelector(selectAllProducts);
    const selectedProduct = useSelector(selectedProductCategory);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchAllProductsAsync());
    }, [dispatch])

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 pt-0 pb-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
                <div className='flex justify-between'>
                    <h2 className="text-2xl md:text-3xl tracking-wider font-bold text-gray-900 text-left font-agdasima capitalize">{selectedProduct}</h2>
                    {
                        currentWidth < 640 && <Filter />
                    }
                </div>
                <span className='text-sm mb-5 text-gray-500'>{newProducts.length} items</span>
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {newProducts.map((product) => (
                        <div key={product.id} className="group relative"
                        >
                            <div onClick={() => navigate(`/products/${product.id}`)} className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                                <div className='hover:cursor-pointer'>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        style={{ left: "82%", background: "white", borderRadius: "50%", padding: ".2rem" }}
                                        strokeWidth={1.8}
                                        stroke="black"
                                        className="w-6 h-6 absolute top-1 hover:cursor-pointer"

                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="mt-3 mb-2 inline-block m-0 uppercase flex justify-between align-items-center">
                                <p className='text-sm text-gray-500' style={{fontSize:"12px"}}>
                                    {product.brand}
                                </p>
                                <p className='label' style={{ letterSpacing: "0.9px", fontSize: "10px", fontWeight: "100", background: "var(--pale-orange)" }}>
                                    {product.label}
                                </p>
                            </div>

                            <div className="flex justify-between">
                                <div>
                                    <h3 className="text:sm md:text-lg text-gray-800">
                                        <p>
                                            {product.title}
                                        </p>
                                    </h3>
                                    {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                                </div>
                                <p className="text-sm md:text-lg text-gray-500 mr-1 line-through" style={{fontSize:"10px"}}>₹{product.price}</p>
                                <p className="text-sm md:text-lg font-medium text-gray-800">₹{ Math.round(product.price - (product.price * (product.discountPercentage / 100)))}</p>
                            </div>
                            <div className="mt-5">
                                <Link
                                    to={`/admin/product-form/edit/${product.id}`}
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Edit Product
                                </Link>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    )
}