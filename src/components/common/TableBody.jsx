import _ from 'lodash';
import React, { Component } from 'react';

export class TableBody extends Component {
  renderCell = (item, property) => {
    if (property.path) return _.get(item, property.path);

    return property.content(item);
  };
  render() {
    const { items, properties, propertyId } = this.props;
    return (
      <tbody>
        {items.map((item) => (
          <tr key={item[propertyId]}>
            {properties.map((property) => (
              <td key={property.path || property.key}>
                {this.renderCell(item, property)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

TableBody.defaultProps = {
  propertyId: '_id',
};

export default TableBody;
