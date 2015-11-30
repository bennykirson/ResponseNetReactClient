import React from 'react';
import ClassNames from 'classnames';
import InlineEdit from '../common/inlineEdit'

var LayersRow = React.createClass({

  dataChanged(data) {
    this.props.onLayerNameChange(data, this.props.layerKey);
  },
  render() {
    var {name, layer, layerKey, isDisabled, onChange, ...other}=this.props;
    var classes = ClassNames('ui fitted checkbox', {disabled: isDisabled});
    return (
        <tr>
          <td>
            <InlineEdit
                activeClassName="editing"
                className="hover"
                text={ name }
                paramName="name"
                change={this.dataChanged}
            />
          </td>
          <td>
            <div className="ui fitted checkbox">
              <input type="checkbox" name="nodes" checked={layer.checkedNodes}
                     onChange={ onChange.bind(null, layerKey) }/>
              <label/>
            </div>
          </td>
          <td>
            <div className={classes}>
              <input type="checkbox" name="edges" checked={layer.checkedEdges}
                     onChange={ onChange.bind(null, layerKey) }/>
              <label/>
            </div>
          </td>
        </tr>
    );
  }
});

export default LayersRow;
