import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './ShopDetails.css'; // Import CSS for custom styling

const ShopDetails = () => {
  const { id } = useParams(); // Retrieve the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(`Error fetching product details: ${error.message}`);
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  if (!product) {
    return <div>No product found.</div>; // Handle case when no product data is available
  }

  return (
    <Container className="shop-details-container">
      <Row>
        <Col md={6}>
          <Card className="product-card">
            <Card.Img variant="top" src={product.image} className="product-image" />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text><strong>Price:</strong> ${product.price}</Card.Text>
              <Button variant="primary" className="add-to-cart-button">
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <h5>Product Details</h5>
          <ul className="product-details-list">
            <li><strong>ID:</strong> {product.id}</li>
            <li><strong>Category:</strong> {product.category}</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default ShopDetails;



