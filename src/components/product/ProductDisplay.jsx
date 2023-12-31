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
      <div className="flex gap-x-6">
        {productData && productData.map((product) => (
          <div key={product._id} style={{ marginBottom: '30px' }}>
            <img key={product._id} src={product.images[0]} alt={`Product Image`} style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }} />
            <h3>{product.productTitle}</h3>
            <p>Product ID: {product.productId}</p>
            <p>Pattern Number: {product.patternNumber}</p>
            <p>Category: {product.category}</p>
            <p>Subcategory: {product.subcategory}</p>
            <p>Collection Name: {product.collectionName}</p>
            <p>Room Category: {product.roomCategory}</p>
            <p>Style: {product.style}</p>
            <p>Dimensions: {product.dimensions.length.value} mm x {product.dimensions.width.value} mm x {product.dimensions.thickness.value} mm</p>
            <p>Colors: {product.colors.join(', ')}</p>
            <p>Unit Type: {product.unitType}</p>
            <p>Units Available: {product.units}</p>
            <p>Price per Unit: ${product.perUnitPrice}</p>
            <p>Total Price: ${product.totalPrice}</p>
            <p>Popularity: {product.popularity}</p>

            <h4>Ratings:</h4>
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
              className="mt-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1"
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
