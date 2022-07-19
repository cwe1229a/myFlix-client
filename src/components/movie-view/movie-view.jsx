import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Button, Container, Card } from "react-bootstrap";

export class MovieView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      user: null
    };
  }

  componentDidMount() {
    document.addEventListener('keypress', event => {
      console.log(event.key);
    });
  }

  addMovie(movie, user) {
    let username = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    console.log(movie);
    console.log(token);

    axios.post(`https://piratemoviesapi.herokuapp.com/users/${username}/movies/${movie._id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => {
        alert(`${movie.Title} was successfully added.`)
        window.open('/users/:username', '_self');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteMovie = (movie, user) => {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.delete(`https://piratemoviesapi.herokuapp.com/users/${currentUser}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        alert(`${movie.Title} was successfully deleted.`)
        window.open('/users/:username', '_self');
      })
      .catch(error => console.error(error))
  }

  render() {
    const { movie, user, onBackClick } = this.props;

    return (
      <Container>
        <Card>
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>
              <p>{movie.Description}</p>
              <p>
                Director: <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant="link">{movie.Director.Name}</Button>
                </Link>
              </p>
              <p>
                Genre: <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button variant="link">{movie.Genre.Name}</Button>
                </Link>
              </p>

            </Card.Text>
            <p>
              <Button variant="secondary" onClick={() => { this.addMovie(movie, user) }}>Add movies to Favorites</Button>
            </p>
            <p>
              <Button variant="warning" onClick={() => { this.deleteMovie(movie, user) }}>Remove movie from Favorites</Button>
            </p>
          </Card.Body>
          <Button variant="primary" onClick={() => { onBackClick() }}>Back</Button>
        </Card>
      </Container>
    );
  }
}
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};