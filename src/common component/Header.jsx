// Header.js
import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { AuthContext } from '../component/Signup/AuthContext';
import { useCart } from '../contexts/CartProvider';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { cart, addToCart } = useCart();
  const [shopList, setShopList] = useState([]);

  const navigate = useNavigate();

    const handleLogoutClick = async () => {
        try {
            await logout(); // Log out the user
            navigate('/Signup'); // Redirect to Signup page
        } catch (error) {
            console.error('Logout error:', error); // Handle any errors
        }
    };

  useEffect(() => {
    const fetchShopList = async () => {
      try {
        const snapshot = await db.collection('shopList').get();
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setShopList(list);
      } catch (error) {
        console.error('Error fetching shop list:', error);
      }
    };

    fetchShopList();
  }, []);

  const handleAddToCart = () => {
    const item = {
      id: 1, // Example product ID
      title: 'Example Product',
      description: 'This is an example product description.',
      image: 'https://via.placeholder.com/150', // Example image URL
    };
    addToCart(item);
  };

  return (
    <>
      {/* First Navbar */}
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#" style={{ fontSize: '50px' }}>
            <span style={{ color: 'pink' }}>E</span> Shopper
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {/* <Form className="d-flex" style={{ width: '400px' }}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success" style={{ color: 'pink', borderColor: 'pink' }} type="submit">Search</Button>
              </Form> */}
            </Nav>
            <Link to="/cart" style={{ textDecoration: 'none' }}>
              <Button variant="primary" onClick={handleAddToCart} style={{ marginRight: '10px' }}>
                <FaShoppingCart /> Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
              </Button>
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Second Navbar */}
      <Navbar expand="lg" style={{ backgroundColor: 'pink' }}>
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/home">&nbsp;Home</Nav.Link>
              <Nav.Link as={Link} to="/Shop">&nbsp;&nbsp;Shop</Nav.Link>
              <Nav.Link as={Link} to="/home">&nbsp;&nbsp;Shop Details</Nav.Link>
              
              {/* E Shopper List Dropdown */}
              {/* <NavDropdown title="E Shopper List" id="basic-nav-dropdown">
                {shopList.map((item) => (
                  <NavDropdown.Item key={item.id} as={Link} to={`/category/${item.id}`}>
                    {item.title}
                  </NavDropdown.Item>
                ))}
              </NavDropdown> */}
              
              <Nav.Link as={Link} to="/contact">&nbsp;&nbsp;Contact</Nav.Link>
            </Nav>
            <Nav.Link as={Link} to="/signup">&nbsp;&nbsp;Signup</Nav.Link>
            {isAuthenticated ? (
              <Button variant="danger" onClick={handleLogoutClick} style={{ marginRight: '10px' }}>
                Log Out
              </Button>
            ) : (
              <>
                
                <Nav.Link as={Link} to="/login">&nbsp;&nbsp;Login</Nav.Link>
               
                {/* <Nav.Link as={Link} to="/Logout">&nbsp;&nbsp;Logout</Nav.Link> */}
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;







