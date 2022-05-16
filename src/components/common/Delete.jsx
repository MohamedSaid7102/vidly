import React, { Component } from 'react';

export class Delete extends Component {
  render() {
    const { item, onDelete } = this.props;
    return (
      <button onClick={() => onDelete(item)} className="btn btn-danger btn-sm">
        Delete
      </button>
    );
  }
}

export default Delete;
