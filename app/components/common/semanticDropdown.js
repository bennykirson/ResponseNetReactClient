import React from 'react';
import SemanticUiDropdown from 'semantic-ui-dropdown';

$.fn.dropdown = SemanticUiDropdown;

var SemanticDropdown = React.createClass({
  componentDidMount() {
    $(React.findDOMNode(this)).dropdown({
      onChange: (value) => {
        if (this.props.onChange) {
          this.props.onChange(value);

        }
      }
    });
  },

  render() {
    var { defaultText, name,items, ...other } = this.props;

    return (
        <div className="ui selection dropdown" { ...other }>

          <input type="hidden" name={ name }/>

          <div className="default text">{ defaultText }</div>
          <i className="dropdown icon"></i>

          <div className="menu">
            {items.map((item, i) => <div className="ui item" data-value={item.attrValue}>{item.name}</div>)}
          </div>

        </div>
    );
  }
});

export default SemanticDropdown;
