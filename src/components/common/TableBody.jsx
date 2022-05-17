import _ from 'lodash';
import React, { Component } from 'react';

export class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  generateKey = (item, column) => {
    return item[this.props.propertyId] + (column.path || column.key);
  };
  render() {
    const { data, columns, propertyId } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item[propertyId]}>
            {columns.map((column) => (
              <td key={this.generateKey(item, column)}>
                {this.renderCell(item, column)}
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
