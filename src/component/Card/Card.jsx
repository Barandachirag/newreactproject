import React, { useState, useEffect, createContext, useContext } from 'react';
import { Carousel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

// Create Cart Context
const CartContext = createContext();

const useCart = () => useContext(CartContext);

function CardComponent() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { cart, addToCart } = useCart();

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  const fetchData = () => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data); 
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  const fetchCategories = () => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((response) => response.json())
      .then((categories) => setCategories(categories))
      .catch((error) => console.error('Error fetching categories:', error));
  };

  const filterByCategory = (category) => {
    if (category === 'all') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => item.category === category);
      setFilteredData(filtered);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Button variant="primary" onClick={() => filterByCategory('all')}>All</Button>
        {categories.map((category, index) => (
          <Button 
            key={index} 
            variant="primary" 
            onClick={() => filterByCategory(category)} 
            style={{ marginLeft: '10px' }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>
      <div className='product-grid'>
        {filteredData && filteredData.map((item) => (
          <div key={item.id} className='product-item'>
            <Card className='card'>
              <Card.Img variant="top" src={item.image} className='card-img' />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text className='card-text'>
                  {item.description}
                </Card.Text>
                <Button variant="primary" onClick={() => addToCart(item)}>Add to Cart</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
