import React from 'react';
import SemanticButton from '../common/semanticButton';
import InjectionText from '../common/injectionText';

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
            <div className="ui  segment">
              <h2 className="ui teal header">

               Welcome <InjectionText>{userInjection}</InjectionText>

              </h2>
              <br/>
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
