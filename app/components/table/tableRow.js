import React from 'react';
import RowItem from './rowItem';

var TableRow = React.createClass({
  render() {
    var { row, ...other } = this.props;

    return (
        <tr>{ row.map((item, i) => <RowItem key={ i } item={ item } {...other}/>) }</tr>
    );
  }
});

export default TableRow;
