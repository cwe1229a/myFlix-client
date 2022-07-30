import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardGroup,
  Col,
  Row,
  Container,
  Form,
} from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "./profile-view.scss";

export function ProfileView({ movies }) {
  const [username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    axios
      .get(`https://piratemoviesapi.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsername(response.data.Username);
        setEmail(response.data.Email);
        setFavoriteMovies(response.data.FavoriteMovies);
        console.log(response.data);
      })
      .catch((e) => {
        console.log("Error");
      });
  };

  const deleteAccount = () => {
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    axios
      .delete(`https://piratemoviesapi.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert(`Your user account was deleted.`);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open("/", "_self");
      })
      .catch((err) => console.log(err));
  };

  const updateUser = () => {
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    axios
      .put(
        `https://piratemoviesapi.herokuapp.com/users/${user}`,
        {
          Username: username,
          Password: Password,
          Email: email,
          Birthday: birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      .then((response) => {
        alert(`Your profile has been updated`);
        localStorage.setItem("user", response.data.Username),
          console.log(response.data);
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log("Error");
      });
  };

  const favoriteMoviesList = () => {
    if (movies.length + 0) {
      return (
        <Row className="justify-content-md-center">
          {favoriteMovies.length === 0 ? (
            <h3>Add some movies to your list</h3>
          ) : (
            favoriteMovies.map((movieId, i) => (
              <Col md={6} lg={4} key={`${i}-${movieId}`}>
                <MovieCard
                  key={`${i}-${movieId}`}
                  movie={movies.find((m) => m._id == movieId)}
                />
              </Col>
            ))
          )}
        </Row>
      );
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Crew Member Info</Card.Title>
                <Form>
                  <Form.Group
                    controlId="formUsername"
                    className="reg-form-inputs"
                  >
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group
                    controlId="formPassword"
                    className="reg-form-inputs"
                  >
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="Email" className="reg-form-inputs">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="updateBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="date"
                      name="birthday"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={updateUser}>
                    Update your profile
                  </Button>
                  <p></p>
                  <Button
                    variant="warning"
                    type="submit"
                    onClick={deleteAccount}
                  >
                    Delete your profile
                  </Button>
                </Form>
                <p></p>
                <h3>Favorite Movies</h3>
                {favoriteMoviesList()}
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

ProfileView.propTypes = {
  profileView: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }),
};
