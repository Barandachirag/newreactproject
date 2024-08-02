// Cart.js
import React from 'react';
import { useCart } from './CartProvider'; 
import { Card, Button } from 'react-bootstrap';

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div>
      <h2>Your Cart</h2>
      <div className='product-grid'>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className='product-item'>
              <Card className='card'>
                <Card.Img variant="top" src={item.image} className='card-img' />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text className='card-text'>
                    {item.description}
                  </Card.Text>
                  <Card.Text>
                    Quantity: {item.quantity}
                  </Card.Text>
                  <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                    Remove from Cart
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;






