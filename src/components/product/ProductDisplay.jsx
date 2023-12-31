import React, { useEffect, useState } from 'react';

const ProductDisplay = () => {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/products')
            .then((response) => response.json())
            .then((data) => setProductData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleDelete = (headerId) => {
        fetch(`http://localhost:8080/api/deleteHeaderInfoSection/${headerId}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => setProductData(data))
            .catch((error) => console.error('Error deleting data:', error));
    };
  return (
    <div>
      <h2>Product Information</h2>
      {products.map((product) => (
        <div key={product._id} style={{ marginBottom: '30px' }}>
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

          <h4>Images:</h4>
          {product.images.map((image, index) => (
            <img key={index} src={image} alt={`Product Image ${index + 1}`} style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProductDisplay;
