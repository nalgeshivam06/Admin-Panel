import React, { useEffect, useState } from 'react';

const ProductDisplay = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then((response) => response.json())
      .then((data) => setProductData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (productId) => {
    fetch(`http://localhost:8080/api/products/${productId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => setProductData(data))
      .catch((error) => console.error('Error deleting data:', error));
  };
  return (
    <div className='mx-6 my-8'>
      <h2 className='py-6 font-bold text-center text-xl'>Product Information</h2>
      <div className="flex gap-x-4">
        {productData && productData.map((product) => (
          <div key={product._id} style={{ marginBottom: '30px' }} className='p-2 border rounded'>
            <img key={product._id} src={product.images[0]} alt={`Product Image`} className='mb-6 w-[150px]' />
            <h3 className='font-bold text-orange-500'>{product.productTitle}</h3>
            <p><b>Product ID:</b> {product.productId}</p>
            <p><b>Pattern Number:</b> {product.patternNumber}</p>
            <p><b>Category:</b> {product.category}</p>
            <p><b>Subcategory:</b> {product.subcategory}</p>
            <p><b>Collection Name:</b> {product.collectionName}</p>
            <p><b>Room Category:</b> {product.roomCategory}</p>
            <p><b>Style:</b> {product.style}</p>
            <p><b>Dimensions:</b> {product.dimensions.length.value} mm x {product.dimensions.width.value} mm x {product.dimensions.thickness.value} mm</p>
            <p><b>Colors:</b> {product.colors.join(', ')}</p>
            <p><b>Unit Type:</b> {product.unitType}</p>
            <p><b>Units Available:</b> {product.units}</p>
            <p><b>Price per Unit:</b> ${product.perUnitPrice}</p>
            <p><b>Total Price: </b>${product.totalPrice}</p>
            <p><b>Popularity:</b> {product.popularity}</p>

            <h4 className='font-bold'>Ratings:</h4>
            {product.ratings.length > 0 ? (
              product.ratings.map((rating) => (
                <div key={rating._id}>
                  <p>User ID: {rating.userId}</p>
                  <p>Rating: {rating.rating}</p>
                  <p>Review: {rating.review}</p>
                  <p>Timestamp: {rating.timestamp}</p>
                </div>
              ))
            ) : (
              <p>No ratings available</p>
            )}

            <button
              type="button"
              className="mt-4 ml-1 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1"
              onClick={() => handleDelete(product._id)}
            >
              Delete
            </button>
          </div>

        ))}
      </div>
    </div>
  );
};

export default ProductDisplay;
