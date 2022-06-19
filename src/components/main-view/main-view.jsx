import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
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
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />;

    if (movies.length === 0) return <div className='main-view'>The list is empty!</div>;

    return (
      <div className='main-view'>
        {movies.map(movie => <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setState({ selectedMovie: newSelectedMovie }); }} />)}
      </div>
    );
  }
}