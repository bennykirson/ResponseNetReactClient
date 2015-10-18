import React from 'react';
import SemanticButton from '../common/semanticButton';

var LogoutSegment = React.createClass({
  onClick(value){
    console.log(value);

    this.props.onClick();
  },
  render() {
    var {userInjection,onClick,...other}=this.props;
    return (


        <div className="ui middle aligned center aligned grid">
          <div className="six wide column">
            <div className="ui raised very padded stacked segment">
              <h2 className="ui teal header">

               Welcome {userInjection}

              </h2>
              <SemanticButton  isDisabled={false} onClick={onClick}>
              Logout
              </SemanticButton>

            </div>
          </div>
        </div>
    );
  }
});

export default LogoutSegment;
