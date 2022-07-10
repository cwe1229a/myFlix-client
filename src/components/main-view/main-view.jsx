import React from 'react';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
>>>>>>> Stashed changes
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
=======
import axios from 'axios';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { Navbar } from '../navbar/navbar';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';

import { Col, Row } from 'react-bootstrap';


import './main-view.scss';

>>>>>>> Stashed changes

class MainView extends React.Component {

  constructor() {
    super();


    this.state = {
<<<<<<< Updated upstream
      movies: [
        {
          _id: '6286d1815bb1ae9a04c36b1c',
          Title: 'The Crimson Pirate',
          Description: 'During the 1700s, pirate Captain Vallo seizes a British warship and gets involved in various money-making schemes involving Caribbean rebels led by El Libre, British envoy Baron Jose Gruda, and a beautiful courtesan named Consuelo.',
          Director: {
            Name: 'Robert Siodmak',
            Bio: 'Robert Siodmak was a German director, writer and producer.',
            Birth: '1900',
            Death: '1973'
          },
          Genre: {
            Name: 'Comedy',
            Description: 'A comedy is a category in which emphasizes humor. It is designed to make the audience laugh through amusement.'
          },
          ImagePath: 'https://m.media-amazon.com/images/M/MV5BYTVjMDM2NGMtYjE0Ny00MTQ5LTg4MmUtNDU0ZGY3NGQ0OTA3XkEyXkFqcGdeQXVyMDI2NDg0NQ@@._V1_.jpg',
          Featured: true
        },
        {
          _id: '6286d58b5bb1ae9a04c36b1d',
          Title: 'Captain Blood',
          Description: 'After treating a Monmouth rebel against King James II in 1680s England, a young Irish doctor is exiled as a slave to Jamaica where he captures a Spanish gelleon and becomes the most feared pirate of the Caribbean.',
          Director: {
            Name: 'Michael Curtiz',
            Bio: "Michael Curtiz was a Hungarian director, writer and actor.",
            Birth: '1886',
            Death: '1962'
          },
          Genre: {
            Name: 'History',
            Description: 'Historical film is a fiction film showing past events or set within a historical period.'
          },
          ImagePath: 'https://m.media-amazon.com/images/M/MV5BMjMwNDc1MzMyNV5BMl5BanBnXkFtZTgwODUzMjU1MzE@._V1_.jpg',
          Featured: false
        },
        {
          _id: '6286e6445bb1ae9a04c36b25',
          Title: 'Pirates of the Caribbean: The Curse of the Black Pearl',
          Description: 'Blacksmith Will Turner teams up with an eccentric pirate named Jack Sparrow to save his love from undead pirates.',
          Director: {
            Name: 'Gore Verbinski',
            Bio: "Gore Verbinski is an American producer and director.",
            Birth: '1964'
          },
          Genre: {
            Name: 'Fantasy',
            Description: 'Fantasy films include fantastic themes like magic, suppernatural events, mythology and folklore.'
          },
          ImagePath: 'https://img1.hotstarext.com/image/upload/f_auto,t_vl/sources/r1/cms/prod/4452/674452-v',
          Featured: false
        },
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
=======
      user: null
    };
  }


  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://piratemoviesapi.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assigns the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('users');
>>>>>>> Stashed changes
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
<<<<<<< Updated upstream
    const { movies, selectedMovie } = this.state;
=======
    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router>
        <Navbar user={user} />
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view"></div>
            return <MoviesList movies={movies} />;
          }} />
>>>>>>> Stashed changes

    if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />;

    if (movies.length === 0) return <div className='main-view'>The list is empty!</div>;

    return (
<<<<<<< Updated upstream
      <div className='main-view'>
        {movies.map(movie => <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setState({ selectedMovie: newSelectedMovie }); }} />)}
=======
      <div className="main-view">
        {selectedMovie
          ? (
            <Row className="justify-content-md-center">
              <Col md={8}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            </Row>
          )
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          ))
        }
>>>>>>> Stashed changes
      </div>
    );
  }
<<<<<<< Updated upstream
}
=======
}
let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}


export default connect(mapStateToProps, { setMovies, setUser })(MainView);
>>>>>>> Stashed changes
