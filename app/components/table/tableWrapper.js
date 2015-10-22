import React from 'react';
import TableRow from './tableRow';

var TableWrapper = React.createClass({
  render() {
    var {headers,rows,...other}=this.props;

    return (
        <table className="ui celled striped selectable table">
          <thead>
          <tr>
            {headers.map((item, i) => <th key={ i }>{item.name}</th>)}
          </tr>
          </thead>
          <tbody>
          {rows.map((row, i) => {
            var newRow = headers.map((currentHeader, j) => {
              return row[currentHeader.id];
            });
            return <TableRow row={newRow} key={i} />
          })
          }
          </tbody>
        </table>
    );
  }
});

export default TableWrapper;
