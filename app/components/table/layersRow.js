import React from 'react';

var LayersRow = React.createClass({
  render() {
    var{name,layer, onChange, ...other}=this.props;

    return (
        <tr>
          <td>{name}</td>
          <td>
            <div className="ui fitted checkbox">
              <input type="checkbox" name="nodes" checked={layer.checkedNodes}  onChange={ onChange.bind(null, name) }/>
              <label></label>
            </div>
          </td>
          <td>
            <div className="ui fitted checkbox">
              <input type="checkbox" name="edges" checked={layer.checkedEdges}  onChange={ onChange.bind(null, name) }/>
              <label></label>
            </div>
          </td>
        </tr>
    );
  }
});

export default LayersRow;
