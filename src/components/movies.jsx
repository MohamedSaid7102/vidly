import React, { Component } from 'react';
import Like from './common/like';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/Pagination';
import paginate from './utils/pagination';
import ListGroup from './common/ListGroup';
import { getGenres } from '../services/fakeGenreService';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: { _id: '', name: 'All' },
    pageSize: 4,
    currentPage: 1,
  };

  componentDidMount() {
    const genres = [{ _id: '', name: 'All' }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres,
      // filteredMoviesLength: getMovies().length,
    });
  }

  checkLastMovieOnPageDelete = () => {
    //if this is the last movie on the page, so deleting it will result in an empty page, so we want to go back a step and set the currentPage to currentPage - 1 to see last page movies.
    const { currentPage, pageSize, movies } = this.state;
    const lastPage = Math.ceil(movies.length / pageSize) + 1;

    if (movies.length % pageSize === 0 && currentPage === lastPage) {
      this.setState((oldState) => ({ currentPage: oldState.currentPage - 1 }));
    }
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);

    this.setState({ movies }, this.checkLastMovieOnPageDelete);
  };

  /**
   * handleDelete setState call back
   * , () => {
      // set current genra movies length
      const { selectedGenre } = this.state;
      const filteredMovies =
        selectedGenre && selectedGenre._id !== ''
          ? movies.filter((m) => m.genre._id === selectedGenre._id)
          : movies;
      this.setState(
        {
          filteredMoviesLength: filteredMovies.length,
        },
        this.checkLastMovieOnPageDelete
      );
    }
    *
    *
    *  setFilteredMoviesLength = () => {
    // set current genra movies length
    const { selectedGenre, movies: allMovies } = this.state;
    const filteredMovies =
      selectedGenre && selectedGenre._id !== ''
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;
    this.setState({
      filteredMoviesLength: filteredMovies.length,
    });
  };
   */

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = (genre) => {
    // Set genra
    this.setState(
      {
        selectedGenre: genre,
        currentPage: 1,
      }
      // this.setFilteredMoviesLength
    );
  };

  render() {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      genres,
      selectedGenre,
    } = this.state;

    const filteredMovies =
      selectedGenre && selectedGenre._id !== ''
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    let movies = paginate(filteredMovies, currentPage, pageSize);

    if (allMovies.length === 0)
      return <p>There are no movies in the database.</p>;

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-3">
              <ListGroup
                items={genres}
                propertyValue="name"
                propertyId="_id"
                selectedItem={selectedGenre}
                onChange={this.handleGenreChange}
              />
            </div>
            <div className="col-8">
              <p>Showing {filteredMovies.length} movies in the database.</p>
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Stock</th>
                    <th>Rate</th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {movies.map((movie) => (
                    <tr key={movie._id}>
                      <td>{movie.title}</td>
                      <td>{movie.genre.name}</td>
                      <td>{movie.numberInStock}</td>
                      <td>{movie.dailyRentalRate}</td>
                      <td>
                        <Like
                          liked={movie.liked}
                          onClick={() => this.handleLike(movie)}
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => this.handleDelete(movie)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                pageSize={pageSize}
                itemsCount={filteredMovies.length}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;

