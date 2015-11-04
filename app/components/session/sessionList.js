import React from 'react';
import SessionItem from "./sessionItem";

var SessionList = React.createClass({

  render() {
    var {sessions,...other}=this.props;
    var sessionItems = sessions.map((item, i)=> <SessionItem key={i} sessionId={item.id}
                                                             sessionName={item.name}/>);
    return (
        <div className="ui middle aligned divided list">
          {sessionItems}
        </div>
    );
  }
});

export default SessionList;
