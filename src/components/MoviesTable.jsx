import React, { Component } from 'react';
import Delete from './common/Delete';
import Like from './common/like';
import Pagination from './common/Pagination';

export class MoviesTable extends Component {
  render() {
    const { filteredMoviesLength, movies, handleLike,handleDelete, pageSize,moviesCount,currentPage ,handlePageChange} = this.props;
    return (
      <div>
        <p>Showing {filteredMoviesLength} movies in the database.</p>
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
                    onClick={() => handleLike(movie)}
                  />
                </td>
                <td>
                  <Delete item={movie} onDelete={handleDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          pageSize={pageSize}
          itemsCount={moviesCount}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    );
  }
}

export default MoviesTable;
