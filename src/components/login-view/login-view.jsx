import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from "react-bootstrap";
import axios from 'axios';
import { Link } from 'react-router-dom';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPassword('Password must be 6 characters long');
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication */
      axios.post('https://piratemoviesapi.herokuapp.com/login', {
        Username: username,
        Password: password,
      })
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch((e) => {
          console.log('no such user');
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
                <Card.Title>Yaargh, matey! Sign into MyFlix</Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>
                  <Button variant="primary" size="lg" type="submit" onClick={handleSubmit}>
                    Submit
                  </Button>
                  <p>Need to Register?<Link to={`/register`}>Register Here</Link></p>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

// LoginView.propTypes = {
//   user: PropTypes.shape({
//     username: PropTypes.string.isRequired,
//     password: PropTypes.string.isRequired,
//   }),
//   onLoggedIn: PropTypes.func.isRequired,
// };
