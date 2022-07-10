import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      user: null
    };
  }

  addMovie(movie, user) {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    console.log(movie);
    console.log(token);

    axios.post(`https://piratemoviesapi.herokuapp.com/users/${username}/movies/${movie._id}`, {},
      { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        this.setState({
          user: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movie, user, onBackClick } = this.props;

    return (
      <div className='movie-view'>
        <div className='movie-poster'>
          <img src={movie.ImagePath} />
        </div>
        <div className='movie-title'>
          <span className='label'>Title: </span>
          <span className='value'>{movie.Title}</span>
        </div>
        <div className='movie-description'>
          <span className='label'>Description:</span>
          <span className='value'>{movie.Description}</span>
        </div>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button className="link" variant="info">Director</Button>
        </Link>
        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button className="link" variant="info">Genre</Button>
        </Link>
        <div className="favorites">
          <Button variant="dark" onClick={() => { this.addMovie(movie, user) }}>Add movies to Favourites</Button>
        </div>
        <Button onClick={() => { onBackClick(null); }}>Back</Button>

      </div>
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