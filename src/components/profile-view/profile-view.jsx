import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Card, Col, Row, Container } from 'react-bootstrap';

import { UserUpdate } from './update-view';

export function ProfileView(props) {
  const [userData, setUserData] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const token = localStorage.getItem('token');

  const getUser = () => {
    const username = localStorage.getItem('user');
    axios.get(`https://piratemoviesapi.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUserData(response.data);
        setUpdatedUser(response.data);
        setFavoriteMovies(props.movies.filter((m) => response.data.FavoriteMovies.includes(m._id)));
      })
      .catch(error => console.error(error))
  }

  useEffect(() => {
    getUser();
  }, [])


  const deleteAccount = () => {
    axios
      .delete(`https://piratemoviesapi.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert(`Your user account was deleted.`);
        localStorage.clear();
        window.open('/', '_self');
      })
      .catch((err) => console.log(err));
  };



  return (

    <Container className="profile-view">
      <Card>
        <Card.Body>
          <Card.Title>Crew Member</Card.Title>
          <Row>
            <Col className="label">Username:</Col>
            <Col className="value">{user.Username}</Col>
          </Row>
          <Row className="mt-3">
            <Col className="label">Password:</Col>
            <Col className="value">******</Col>
          </Row>
          <Row className="mt-3">
            <Col className="label">Email:</Col>
            <Col className="value">{user.Email}</Col>
          </Row>
          <Row className="mt-3">
            <Col className="label">Birthday:</Col>
            <Col className="value">{user.Birthday}</Col>
          </Row>
          <Link to={`/users/user-update/${userData.Username}`}>
            <Button variant="primary" type="submit">Update Profile</Button>
          </Link>
        </Card.Body>
      </Card>
      <Row>
        <Col>
          <Button variant="danger" type="submit" onClick={deleteAccount}>Delete Profile</Button>
        </Col>
      </Row>
      <Card>

        <Card.Body>
          <Card.Title>Favorite Movie List</Card.Title>
          {favoriteMovies.map((m) => {
            return (
              <div key={m._id}>
                <img src={m.ImagePath} />
                <Link to={`/movies/${m._id}`}>
                  <h4>{m.Title}</h4>
                </Link>
              </div>)
          })
          }
        </Card.Body>
      </Card>


    </Container>
  )
}

ProfileView.PropTypes = {

  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}


