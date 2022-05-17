import React, { Component } from 'react';
import Delete from './common/Delete';
import Like from './common/like';

export class MoviesTable extends Component {
  render() {
    const { movies, onLike, onDelete, onSort } = this.props;
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => onSort('title')}>Title</th>
              <th onClick={() => onSort('genre.name')}>Genre</th>
              <th onClick={() => onSort('numberInStock')}>Stock</th>
              <th onClick={() => onSort('dailyRentalRate')}>Rate</th>
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
                  <Like liked={movie.liked} onClick={() => onLike(movie)} />
                </td>
                <td>
                  <Delete item={movie} onClick={onDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MoviesTable;
