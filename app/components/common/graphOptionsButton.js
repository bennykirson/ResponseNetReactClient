import React from 'react';

var GraphOptionsButton = React.createClass({
  onClick(){
    this.props.onClick(this.props.children);
  },
  render() {
    var {children,...other}=this.props;
    return (
        <button className="ui tiny teal button" onClick={this.onClick}>
          {children}
        </button>
    );
  }
});

export default GraphOptionsButton;
