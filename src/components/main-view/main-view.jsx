import React from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';


import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { UserUpdate } from '../profile-view/update-view';
import { Navbar } from '../navbar/navbar';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
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

  // componentDidMount() {
  //   axios.get('https://piratemoviesapi.herokuapp.com/movies')
  //     .then(response => {
  //       this.setState({
  //         movies: response.data
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  getMovies(token) {
    axios.get('https://piratemoviesapi.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser(authData.user.Username);
    this.getMovies(authData.token);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUser('');
  }

  onRegister() {
    this.setState({
      isRegistered: false,
    });
  }

  render() {
    let { movies, user } = this.props;

    return (
      <Router>
        <Navbar user={user} />
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return (<Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>)

            // if (movies.length === 0) return <div className="main-view" />;
            if (user) return (
              <MoviesList movies={movies} />
            )
          }} />

          <Route exact path="/login" render={() => {
            if (movies.length === 0) return <div className='main-view'>There are no movies here</div>;
            return <Col md={8}>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path={`/users/${user}`} render={({ history }) => {
            return <Col>
              <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path={`/users/user-update/${user}`}
            render={({ match, history }) => {
              if (!user) return <Redirect to="/" />
              return <Col>
                <UserUpdate />
              </Col>
            }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

        </Row>
      </Router>
    );
  }
}
let mapStateToProps = store => {
  return {
    movies: store.movies,
    user: store.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => {
      dispatch(setUser(user))
    },
    setMovies: (movies) => {
      dispatch(setMovies(movies))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);