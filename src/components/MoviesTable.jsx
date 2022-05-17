import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Like from './common/like';
import TableHeader from './common/TableHeader';
import TableBody from './common/TableBody';

export class MoviesTable extends Component {
  columns = [
    { label: 'Title', path: 'title' },
    { label: 'Genre', path: 'genre.name' },
    { label: 'Stock', path: 'numberInStock' },
    { label: 'Rate', path: 'dailyRentalRate' },
    {
      key: 'like',
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: 'delete',
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <div>
        <table className="table">
          <TableHeader
            columns={this.columns}
            onSort={onSort}
            sortColumn={sortColumn}
          />
          <TableBody data={movies} columns={this.columns} />
        </table>
      </div>
    );
  }
}

MoviesTable.propTypes = {
  sortColumn: PropTypes.object.isRequired,
};

export default MoviesTable;
