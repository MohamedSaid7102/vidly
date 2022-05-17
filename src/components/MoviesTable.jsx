import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Delete from './common/Delete';
import Like from './common/like';
import TableHeader from './common/TableHeader';

export class MoviesTable extends Component {
  columns = [
    { label: 'Title', path: 'title' },
    { label: 'Genre', path: 'genre.name' },
    { label: 'Stock', path: 'numberInStock' },
    { label: 'Rate', path: 'dailyRentalRate' },
    { key: 'like' },
    { key: 'delete' },
  ];
  render() {
    const { movies, onLike, onDelete, onSort, sortColumn } = this.props;
    return (
      <div>
        <table className="table">
          <TableHeader
            columns={this.columns}
            onSort={onSort}
            sortColumn={sortColumn}
          />
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
