import React, { useState } from 'react';
import axios from 'axios';

import { Card, CardGroup, Col, Container, Form, Row, Button } from 'react-bootstrap';


export function UserUpdate(props) {
  const { user } = props;
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
    } else if (Password.length < 6) {
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
      const token = localStorage.getItem('token');
      axios.put(`https://piratemoviesapi.herokuapp.com/users/${user.Username}`, {
        Username: username,
        Password: Password,
        Email: email,
        Birthday: birthday
      },
        {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          console.log(response.data);
          alert('Profile was successfully updated.');
          window.open('/users/:username', '_self');
        })
        .catch(error => {
          console.error(error);
          alert('Unable to update profile.');
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
                <Card.Title> Edit your Profile </Card.Title>

                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={Password} onChange={e => setPassword(e.target.value)} />
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    {emailErr && <p>{emailErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="formBirthday">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control type="birthday" placeholder="Birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
                    {birthdayErr && <p>{birthdayErr}</p>}
                  </Form.Group>

                  <Button variant="primary" type="submit" onClick={handleSubmit}>Submit Changes</Button>
                  <p><Link to={`/users/${userToken}`}>Back to Profile</Link></p>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>

  )
}