// Footer.js
import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css'; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4} className="footer-section">
            <h5>About Us</h5>
            <p>
              E-Shopper is your go-to online store for the latest fashion trends and unbeatable deals. We offer a wide range of products to cater to all your shopping needs.
            </p>
          </Col>
          <Col md={4} className="footer-section">
            <h5>Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
              <Nav.Link as={Link} to="/terms">Terms & Conditions</Nav.Link>
              <Nav.Link as={Link} to="/privacy">Privacy Policy</Nav.Link>
            </Nav>
          </Col>
          <Col md={4} className="footer-section">
            <h5>Contact Us</h5>
            <p>
              Email: support@eshopper.com
              <br />
              Phone: +1 234 567 890
            </p>
            <h5>Follow Us</h5>
            <Nav className="social-links">
              <Nav.Link href="https://facebook.com" target="_blank">Facebook</Nav.Link>
              <Nav.Link href="https://twitter.com" target="_blank">Twitter</Nav.Link>
              <Nav.Link href="https://instagram.com" target="_blank">Instagram</Nav.Link>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-3">
            <p>&copy; 2024 E-Shopper. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

