import React, { useState, useEffect, useContext } from 'react';
import { Carousel, Button, Card } from 'react-bootstrap';
import { useCart } from '../contexts/CartProvider'; // Import CartProvider context
import carousel1 from '../component/Carousels/image/carousel1.jpg';
import carousel2 from '../component/Carousels/image/carousel2.jpg';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { AuthContext } from '../component/Signup/AuthContext'; // Import AuthContext
import './Home.css'; // Import CSS file for custom styles

function Home() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { addToCart } = useCart();
  const { logout } = useContext(AuthContext); // Get logout function from AuthContext
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterData();
  }, [data, searchQuery]);

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

  const filterData = () => {
    let filtered = data;

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  const filterByCategory = (category) => {
    if (category === 'all') {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) => item.category === category);
      setFilteredData(filtered);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/Logout'); // Navigate to Logout page
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div>
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img className="d-block w-100" src={carousel1} alt="First slide" />
          <Carousel.Caption className="carousel-caption">
            <h1>Discover Amazing Products</h1>
            <p>Find the best deals and latest trends.</p>
            <Link to="/shop">
              <Button variant="primary">Shop Now</Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={carousel2} alt="Second slide" />
          <Carousel.Caption className="carousel-caption">
            <h1>Exclusive Offers</h1>
            <p>Grab your favorite items at unbeatable prices.</p>
            <Link to="/shop">
              <Button variant="primary">Shop Now</Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '10px', width: '200px', marginRight: '10px' }}
        />
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

     

      <div className="product-grid">
        {filteredData && filteredData.map((item) => (
          <div key={item.id} className="product-item">
            <Card className="card">
              <Card.Img variant="top" src={item.image} className="card-img" />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text className="card-text">
                  {item.description}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => addToCart(item)} // Add item to cart
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;








 
