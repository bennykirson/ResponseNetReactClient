import React from 'react';
import Modal from 'semantic-ui-modal';
import Dimmer from 'semantic-ui-dimmer';

$.fn.modal = Modal;
$.fn.dimmer = Dimmer;
var ModalMessage = React.createClass({
  componentDidMount() {
    $(React.findDOMNode(this)).modal({
      blurring: true
    }).modal('show');

  },
  inputChangeHandler(){

  },
  render() {
    var {children,...other}=this.props;
    return (
        <div className="ui modal">
          <i className="close icon"/>
          <div className="header">
            Name the new layer:
            <input className="ui fluid input" type="text" placeholder="Layer name..." />
          </div>
          <div className="actions">
            <div className="ui black deny button">
              Nope
            </div>
            <div className="ui positive right labeled icon button">
              Yep, that's me
              <i className="checkmark icon"/>
            </div>
          </div>
        </div>
    );
  }
});

export default ModalMessage;
