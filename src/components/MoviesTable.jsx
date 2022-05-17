import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Delete from './common/Delete';
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
      content: (movie) => (<Delete item={movie} onClick={this.props.onDelete} />),
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
          <TableBody items={movies} properties={this.columns} />
        </table>
      </div>
    );
  }
}

MoviesTable.propTypes = {
  sortColumn: PropTypes.object.isRequired,
};

export default MoviesTable;
