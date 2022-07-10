import React from 'react';
<<<<<<< Updated upstream
=======
import PropTypes from 'prop-types';
<<<<<<< Updated upstream
import { Form, Button, Card } from "react-bootstrap";
import "./movie-card.scss";
>>>>>>> Stashed changes

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
=======
import { Button, Card } from 'react-bootstrap';
import './movie-card.scss';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movies } = this.props;
>>>>>>> Stashed changes

<<<<<<< Updated upstream
    return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>;
=======
    return (
      <Card>
        <Card.Img variant="top" src={movies.ImagePath} />
        <Card.Body>
<<<<<<< Updated upstream
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
=======
          <Card.Title>{movies.Title}</Card.Title>
          <Card.Text>{movies.Description}</Card.Text>
          <Link to={`/movies/${movies._id}`}>
            <Button variant="link">Open</Button>
          </Link>
>>>>>>> Stashed changes
        </Card.Body>
      </Card>
    );
>>>>>>> Stashed changes
  }
<<<<<<< Updated upstream
}
=======
}
MovieCard.propTypes = {
  movies: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired
};
>>>>>>> Stashed changes
