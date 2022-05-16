import React, { Component } from 'react';

export class Delete extends Component {
  render() {
    const { item, onClick } = this.props;
    return (
      <button onClick={() => onClick(item)} className="btn btn-danger btn-sm">
        Delete
      </button>
    );
  }
}

export default Delete;
