import React from 'react';

var RowItem = React.createClass({
  render() {
    var { item,  ...other } = this.props;

    return (
        <td >
          {item.link !== "" ? (
              <a href={item.link}>{item.value}</a>
          ) : (
              <div>
                {item.value}
              </div>
          )}
        </td>




    );
  }
});

export default RowItem;
