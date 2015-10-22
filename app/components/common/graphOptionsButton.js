import React from 'react';

var GraphOptionsButton = React.createClass({
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
