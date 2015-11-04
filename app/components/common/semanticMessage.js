import React from 'react';

var SemanticMessage = React.createClass({
  render() {
    var {type,content,title,...other}=this.props;
    var messageClass="ui message "+type;
    return (
        <div className={messageClass}>
          <div className="header">{title}</div>
          <p>{content}</p>
        </div>
    );
  }
});

export default SemanticMessage;
