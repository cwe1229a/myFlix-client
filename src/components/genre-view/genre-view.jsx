import React from 'react';
import PropTypes from 'prop-types';

import { Button, Col, Container, Row } from 'react-bootstrap';


export class GenreView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;


    return (
      <Container>
        <Row>
          <Col className="label">Genre: </Col>
          <Col className="value">{movie.Genre.Name}</Col>
        </Row>
        <Row className="mt-3">
          <Col className="label">Description: </Col>
          <Col className="value">{movie.Genre.Description}</Col>
        </Row>
        <Button className="d-block mt-3" onClick={() => { onBackClick(null); }} variant="warning">Back</Button>
      </Container>
    )
  }
}

GenreView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};