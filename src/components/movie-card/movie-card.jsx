import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Container, Col, Row } from "react-bootstrap";
import "./movie-card.scss";

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Container fluid className="mccontainer">
        <Row>
          <Col>
            <Card>
              <Card.Img
                variant="top"
                className="movie-card"
                src={movie.ImagePath}
              />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Link to={`/movies/${movie._id}`}>
                  <Button variant="link">Open</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
