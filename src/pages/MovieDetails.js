import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor() {
    super();

    this.state = {
      movie: {},
      loading: true,
    };
  }

  componentDidMount() {
    this.fecthMovie();
  }

  fecthMovie() {
    this.setState({ loading: true }, async () => {
      const { match } = this.props;
      const requestMovie = await movieAPI.getMovie(match.params.id);
      this.setState({ movie: requestMovie, loading: false });
    });
  }

  render() {
    // Change the condition to check the state
    // if (true) return <Loading />;

    const { movie, loading } = this.state;

    const { id, title, storyline, imagePath, genre, rating, subtitle } = movie;

    return (
      <div data-testid="movie-details">
        {loading ? (
          <Loading />
        ) : (
          <div>
            <img alt="Movie Cover" src={`../${imagePath}`} />
            <p>{`Title: ${title}`}</p>
            <p>{`Subtitle: ${subtitle}`}</p>
            <p>{`Storyline: ${storyline}`}</p>
            <p>{`Genre: ${genre}`}</p>
            <p>{`Rating: ${rating}`}</p>
            <Link to={`/movies/${id}/edit`}>EDITAR</Link>
            <Link to="/">VOLTAR</Link>
            <Link to="/" onClick={() => movieAPI.deleteMovie(id)}>
              DELETAR
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default MovieDetails;
