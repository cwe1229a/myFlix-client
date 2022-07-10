import React from 'react';
<<<<<<< Updated upstream

export class MovieView extends React.Component {

=======
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

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        <div className='movie-director'>
          <span className='label'>Director:</span>
          <span className='value'>{movie.Director.Name + '~ ' + movie.Director.Bio}</span>
        </div>
        <div className='movie-genre'>
          <span className='label'>Genre:</span>
          <span className='value'>{movie.Genre.Name + '~ ' + movie.Genre.Description}</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>
=======
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

>>>>>>> Stashed changes
      </div>
    );
  }
}