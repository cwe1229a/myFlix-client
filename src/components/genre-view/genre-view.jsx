import React from 'react';
import PropTypes from 'prop-types';

import { Button, Col, Container, Row } from 'react-bootstrap';
import './genre-view.scss';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col className="label">Genre: </Col>
          <Col className="value">{genre.Genre.name}</Col>
        </Row>
        <Row>
          <Col className="label">Description: </Col>
          <Col className="value">{genre.Genre.Description}</Col>
        </Row>
        <Button className="submit" onClick={() => { onBackClick(null); }} variant="link">Back</Button>
      </Container>
    )
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};