import React, {useState} from 'react';
import { Card, Row, Col, FloatingLabel, Form, Button } from 'react-bootstrap';


function ShippingInformationForm() {

    const [formData, setFormData] = useState({
        countryRegion: '',
        firstName: '',
        lastName: '',
        streetAddress: '',
        city: '',
        state: '',
        zip: '',
        email: '',
        phoneNumber: '',
      });
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    const [validated, setValidated] = useState(false);

    const handleShippingInfo = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
    };

  return (
    <>
      <Card>
        <Card.Header className="d-flex justify-content-center align-items-center">
          Shipping Information
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <Form noValidate validated={validated} onSubmit={handleShippingInfo}>
              {/* Row 1: Country/Region */}
              <Row className="mb-3">
                <Col xs={6}>
                <FloatingLabel controlId="countryRegion" label="Country/Region">
                    <Form.Select required
                      value={formData.countryRegion}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a country...</option>
                      <option value="USA">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>
              </Row>

              {/* Row 2: First Name and Last Name */}
              <Row className="mb-3">
                <Col>
                  <FloatingLabel controlId="firstName" label="First Name">
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter first name"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your first name.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel controlId="lastName" label="Last Name">
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter last name"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your last name.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
              </Row>

              {/* Row 3: Street Address */}
              <Row className="mb-3">
                <Col>
                  <FloatingLabel controlId="streetAddress" label="Street Address">
                    <Form.Control
                      type="text"
                      name="streetAddress"
                      value={formData.streetAddress}
                      onChange={handleInputChange}
                      placeholder="Enter street address"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your street address.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
              </Row>

              {/* Row 4: City, State, and ZIP Code */}
              <Row className="mb-3">
                <Col>
                  <FloatingLabel controlId="City" label="City">
                    <Form.Control
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter City"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your city.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel controlId="State" label="State">
                    <Form.Control
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Enter State"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your state.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel controlId="zip" label="ZIP">
                    <Form.Control
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      placeholder="Enter ZIP code"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid ZIP code.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
              </Row>

              {/* Row 5: Email and Phone Number */}
              <Row className="mb-3">
                <Col>
                  <FloatingLabel controlId="email" label="Email">
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid email address.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel controlId="phoneNumber" label="Phone Number">
                    <Form.Control
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid phone number.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>

                <Row>
                <Col className="d-flex justify-content-center py-3">
                    <Button type="submit" variant="primary">
                      Submit
                    </Button>
                </Col>
              </Row>

              </Row>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default ShippingInformationForm;
