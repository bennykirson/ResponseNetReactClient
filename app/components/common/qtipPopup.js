import React from 'react';
import SemanticUiPopup from 'semantic-ui-popup';

$.fn.popup = SemanticUiPopup;

var QTipPopup = React.createClass({
  componentDidMount() {
    var element = React.findDOMNode(this);
    $(element).popup({
      on: 'hover',
      title: this.props.title,
      content: this.props.content,
      type: 'wide'
    });
  },
  render() {
    var {content,title, ...other}=this.props;
    return (
        <i className="help icon link icon" />
    );
  }
});

export default QTipPopup;
