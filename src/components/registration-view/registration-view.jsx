import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Card, CardGroup, Container, Col, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';

// import './registration-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
  });

  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({ ...values, usernameErr: 'Username is required' });
      isReq = false;
    }
    if (!Password) {
      setValues({ ...values, passwordErr: 'Password is required' });
      isReq = false;
    } else if (password.length < 6) {
      setValues({ ...values, passwordErr: 'Password must be 6 characters long' });
      isReq = false;
    }
    if (!email) {
      setValues({ ...values, emailErr: 'Email is required' });
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setValues({ ...values, emailErr: 'Email must be a valid email address' });
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios.post('https://piratemoviesapi.herokuapp.com/users', {
        Username: username,
        Password: Password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert("Registration complete. Welcome aboard! Proceed to log in");
          window.open('/', '_self');
        })
        .catch(response => {
          console.log('response');
          alert('unable to register');
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Ready to join the crew? Please Register to hop aboard!</Card.Title>
                <Form>
                  <Form.Group controlId="formUsername" className="reg-form-inputs">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username} onChange={e =>
                        setUsername(e.target.value)} />
                    {values.usernameErr && <p>{values.usernameErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="formPassword" className="reg-form-inputs">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={Password} onChange={e =>
                        setPassword(e.target.value)} />
                    {values.passwordErr && <p>{values.passwordErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="Email" className="reg-form-inputs">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email} onChange={e =>
                        setEmail(e.target.value)} />
                    {values.emailErr && <p>{values.emailErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="updateBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="date"
                      name="birthday" onChange={e =>
                        setBirthday(e.target.value)} />
                  </Form.Group>
                  <Button variant="primary" type="submit"
                    onClick={handleSubmit}>
                    Register
                  </Button>
                  <p></p>
                  <p>Already registered <Link to={'/'}>Sign in</Link>here</p>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>

  );
}

RegistrationView.PropTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }),
};
