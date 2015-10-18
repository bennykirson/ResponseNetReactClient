import React from 'react';
import SemanticUiPopup from 'semantic-ui-popup';

$.fn.popup = SemanticUiPopup;

var QTipPopup = React.createClass({
  componentDidMount() {
    var element = React.findDOMNode(this);
    $(element).popup({
      on: 'click',
      inline: true,
      title: this.props.title,
      content: this.props.content
    });
  },
  render() {
    var {content,title, ...other}=this.props;
    return (
        <span className="form-help-icon" >[?]</span>
    );
  }
});

export default QTipPopup;
