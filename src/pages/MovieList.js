import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MovieCard, Loading } from '../components';

import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fecthMovies();
  }

  fecthMovies() {
    this.setState({ loading: true }, async () => {
      const requestMovies = await movieAPI.getMovies();
      this.setState({ movies: requestMovies, loading: false });
    });
  }

  render() {
    const { movies, loading } = this.state;

    // Render Loading here if the request is still happening

    return (
      <div data-testid="movie-list">
        {loading ? (
          <Loading />
        ) : (
          movies.map((movie) => <MovieCard key={movie.title} movie={movie} />)
        )}
        <Link to="/movies/new">ADICIONAR CARTÃO</Link>
      </div>
    );
  }
}

export default MovieList;
