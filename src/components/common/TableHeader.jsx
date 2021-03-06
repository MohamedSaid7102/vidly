import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    /*    My Logic
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
    this.props.onSort(sortColumn); //reise sort event
  };

  renderSort = (column) => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) return null; // return no icons
    if (column.path === sortColumn.path && sortColumn.order === 'asc')
      return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSort(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  sortColumn: PropTypes.object,
  columns: PropTypes.arrayOf(PropTypes.object),
};

export default TableHeader;
