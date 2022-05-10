import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ListGroup extends Component {
  render() {
    const { items, propertyValue, propertyId, selectedItem, onChange } =
      this.props;
    return (
      <div className="list-group">
        {items.map((item) => (
          <a
            onClick={() => onChange(item)}
            key={item[propertyId]}
            className={
              selectedItem === item
                ? 'list-group-item list-group-item-action active'
                : 'list-group-item list-group-item-action'
            }
          >
            {item[propertyValue]}
          </a>
        ))}
      </div>
    );
  }
}

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
};

export default ListGroup;
