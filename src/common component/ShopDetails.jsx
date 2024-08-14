import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ShopDetails = () => {
  const { id } = useParams(); // Get product ID from URL parameters
  const [product, setProduct] = useState(null); // State to store product data
  const [loading, setLoading] = useState(true); // State to indicate loading
  const [error, setError] = useState(null); // State to store any errors

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true); // Set loading state to true
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // Parse JSON response
        setProduct(data); // Set product data
      } catch (error) {
        setError(`Error fetching product details: ${error.message}`);
        console.error('Error:', error);
      } finally {
        setLoading(false); // Set loading state to false
      }
    };

    fetchProduct(); // Call the function to fetch product data
  }, [id]);

  if (loading) return <div>Loading...</div>; // Show loading message
  if (error) return <div>{error}</div>; // Show error message
  if (!product) return <div>No product found.</div>; // Show message if no product found

  return (
    <div>
      <h1>{product.title}</h1> {/* Display product title */}
      <img src={product.image} alt={product.title} style={{ width: '300px' }} /> {/* Display product image */}
      <p>{product.description}</p> {/* Display product description */}
      <p><strong>Price:</strong> ${product.price}</p> {/* Display product price */}
    </div>
  );
};

export default ShopDetails;
 






