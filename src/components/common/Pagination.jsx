import React, { Component } from 'react';
import _ from 'lodash';

export class Pagination extends Component {
  render() {
    const { pageSize, itemsCount, onPageChange } = this.props;
    const pagesCount = Math.ceil(itemsCount / pageSize);

    if (pagesCount === 1) return null; //do not render this Pagiantion if there is nothing more than 1 page

    const pages = _.range(1, pagesCount + 1);

    return (
      <ul className="pagination pagination-m">
        {pages.map((page, index) => (
          <li
            key={index}
            className="page-item"
            onClick={() => onPageChange(page)}
          >
            <a className="page-link" href="#" tabIndex="-1">
              {page}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

export default Pagination;
