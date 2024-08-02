import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../common component/firebase'; // Adjust path as needed
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

const CreateShopPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    contact: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [shops, setShops] = useState([]);
  const [editingShopId, setEditingShopId] = useState(null); // Track the shop being edited

  useEffect(() => {
    fetchShops(); // Fetch shops when the component mounts
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.contact) newErrors.contact = 'Contact is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);

    try {
      const shopCollection = collection(db, 'shops');
      if (editingShopId) {
        // If editing an existing shop
        const shopDoc = doc(db, 'shops', editingShopId);
        await updateDoc(shopDoc, formData);
        console.log('Shop updated successfully');
        setEditingShopId(null); // Clear editing state
      } else {
        // Creating a new shop
        await addDoc(shopCollection, formData);
        console.log('Shop created successfully');
      }
      setFormData({
        name: '',
        description: '',
        location: '',
        contact: ''
      });
      await fetchShops(); // Refresh the list after adding or updating
    } catch (error) {
      console.error('Error handling shop:', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const fetchShops = async () => {
    try {
      const shopCollection = collection(db, 'shops');
      const shopSnapshot = await getDocs(shopCollection);
      const shopList = shopSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setShops(shopList);
    } catch (error) {
      console.error('Error fetching shops:', error.message);
    }
  };

  const handleEdit = (shop) => {
    setFormData({
      name: shop.name,
      description: shop.description,
      location: shop.location,
      contact: shop.contact
    });
    setEditingShopId(shop.id); // Set the shop ID to be edited
  };

  const handleDelete = async (id) => {
    try {
      const shopDoc = doc(db, 'shops', id);
      await deleteDoc(shopDoc);
      console.log('Shop deleted successfully');
      await fetchShops(); // Refresh the list
    } catch (error) {
      console.error('Error deleting shop:', error.message);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1>{editingShopId ? 'Edit Shop' : 'Create a New Shop'}</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Shop Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                isInvalid={!!errors.location}
              />
              <Form.Control.Feedback type="invalid">
                {errors.location}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formContact">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                isInvalid={!!errors.contact}
              />
              <Form.Control.Feedback type="invalid">
                {errors.contact}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : (editingShopId ? 'Update Shop' : 'Create Shop')}
            </Button>
          </Form>

          {/* <Button variant="secondary" onClick={fetchShops} className="mt-3">
            Fetch Shops
          </Button> */}

          <div>
            <h2>Shop List</h2>
            <ul>
              {shops.map(shop => (
                <li key={shop.id}>
                  {shop.name} - {shop.location} - {shop.description} - {shop.contact}
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(shop)}
                    className="ms-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(shop.id)}
                    className="ms-2"
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateShopPage;




