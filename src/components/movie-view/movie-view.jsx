import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Button, Container, Card } from "react-bootstrap";

export class MovieView extends React.Component {


  componentDidMount() {
    document.addEventListener('keypress', event => {
      console.log(event.key);
    });
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
            <Button variant="secondary" onClick={() => { this.addMovie(movie, user) }}>Add movies to Favorites</Button>
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