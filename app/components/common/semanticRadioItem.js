import React from 'react';
import SemanticUiCheckBox from 'semantic-ui-checkbox';

$.fn.checkbox = SemanticUiCheckBox;

var SemanticRadioItem = React.createClass({
  componentDidMount() {
    var $element=$(React.findDOMNode(this.refs.toggler));
    $element.checkbox({
      onChange: () => {
        if (this.props.onChange) {
          var value=$element.checkbox("is checked");
          this.props.onChange(value);

        }
      }
    });
  },
  render() {
    var {name,label,kind ,...other}=this.props;
    return kind === "toggle" ? (
        <div className="field">
          <div className="ui toggle checkbox" ref="toggler">
            <label>{label}</label>
            <input type="checkbox"/>
          </div>
        </div>
    ) :

        (
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" name={name}/>
                <label>{label}</label>
              </div>
            </div>
        );
  }


});

export default SemanticRadioItem;
