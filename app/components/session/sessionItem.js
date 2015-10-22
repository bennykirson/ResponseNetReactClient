import React from 'react';
import { Link } from 'react-router';

var SessionItem = React.createClass({

  render(){
    var {sessionName,sessionId,...other}=this.props;

    return (
        <div className="item">
          <div className="content">
            <Link to={`/graph/${sessionId}/${sessionName}`} className="header session-item">
              {sessionName}
            </Link>
          </div>
        </div>
    );
  }
});

export default SessionItem;
