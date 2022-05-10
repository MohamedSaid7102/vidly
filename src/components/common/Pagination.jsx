import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

export class Pagination extends Component {
  render() {
    const { pageSize, itemsCount, onPageChange, currentPage } = this.props;
    const pagesCount = Math.ceil(itemsCount / pageSize);

    if (pagesCount === 1) return null; //do not render this Pagiantion if there is nothing more than 1 page

    const pages = _.range(1, pagesCount + 1);
    
    return (
      <ul className="pagination pagination-m">
        {pages.map((page, index) => (
          <li
            key={index}
            className={currentPage === page ? 'page-item active' : 'page-item'}
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

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
