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
    pageSize: 4,
    currentPage: 1,
  };

  componentDidMount() {
    const genres = [{ _id: '', name: 'All' }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);

    this.setState({ movies }, this.checkLastMovieOnPageDelete);
  };

  checkLastMovieOnPageDelete = () => {
    //if this is the last movie on the page, so deleting it will result in an empty page, so we want to go back a step and set the currentPage to currentPage - 1 to see last page movies.
    const { movies, currentPage, pageSize } = this.state;
    const lastPage = Math.ceil(movies.length / pageSize) + 1;
    console.log(lastPage);
    if (movies.length % pageSize === 0 && currentPage === lastPage) {
      this.setState((oldState) => ({ currentPage: oldState.currentPage - 1 }));
    }
  };

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
    this.setState({ selectedGenre: genre });
    console.log(genre);
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      genres,
      selectedGenre,
    } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    let movies = paginate(allMovies, currentPage, pageSize);

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
              <p>Showing {count} movies in the database.</p>
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
                itemsCount={count}
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

