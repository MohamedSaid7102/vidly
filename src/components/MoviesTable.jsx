import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Delete from './common/Delete';
import Like from './common/like';

export class MoviesTable extends Component {
  raiseSortEvent = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    /*    My Logic
    console.log(path, sortColumn.path);
    sortColumn.path = path;
    sortColumn.order =
      sortColumn.path === path
        ? sortColumn.order === 'asc'
          ? 'desc'
          : 'asc'
        : 'asc';
    this.setState({ sortColumn });*/

    // Mosh Logic
    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    this.props.onSort(sortColumn);
  };
  render() {
    const { movies, onLike, onDelete } = this.props;
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => this.raiseSortEvent('title')}>Title</th>
              <th onClick={() => this.raiseSortEvent('genre.name')}>Genre</th>
              <th onClick={() => this.raiseSortEvent('numberInStock')}>
                Stock
              </th>
              <th onClick={() => this.raiseSortEvent('dailyRentalRate')}>
                Rate
              </th>
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

MoviesTable.propTypes = {
  sortColumn: PropTypes.object.isRequired,
};

export default MoviesTable;
