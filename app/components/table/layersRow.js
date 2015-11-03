import React from 'react';

var LayersRow = React.createClass({
  render() {
    var{name,...other}=this.props;
    return (
        <tr>
          <td>{name}</td>
          <td>
            <div className="ui fitted checkbox">
              <input type="checkbox" defaultChecked/>
              <label></label>
            </div>
          </td>
          <td>
            <div className="ui fitted checkbox">
              <input type="checkbox" defaultChecked/>
              <label></label>
            </div>
          </td>
        </tr>
    );
  }
});

export default LayersRow;
