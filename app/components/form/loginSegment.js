import React from 'react';
import { generateGUID } from '../../utils/utilities';
import SemanticButton from '../common/semanticButton';
import SemanticMessage from '../common/semanticMessage';

var LoginSegment = React.createClass({
  userLoginHandler(){
    var userName = React.findDOMNode(this.refs.userNameField).value;
    if (userName !== "undefined" && userName !== "") {
      localStorage.userName = userName;
      this.props.onClick(true);
    } else {
      this.props.onClick(false);


    }
  },
  anonymousLoginHandler(){
    localStorage.userName = "anonymous_" + generateGUID();
    this.props.onClick(true);
  },
  render(){
    var {onClick,warningMessage,...other}=this.props;
    return (
        <div className="ui middle aligned center aligned grid">
          <div className="six wide column">
            <div className="ui segment">
              <h2 className="ui teal header">
                Please enter your Username:
              </h2>

              <div className="ui field"><input ref="userNameField" type="text" placeholder="Enter Username"/>
                {warningMessage ? <SemanticMessage type={"error"} title={"Action Forbidden"}
                                                   content={"Username can't be empty"}/> : ""}
              </div>
              <br/>
              <div className="ui field"><SemanticButton isDisabled={false} onClick={this.userLoginHandler}>
                Login
              </SemanticButton>

              </div>
              <br/>
              OR

              <div className="ui field">
                <br/>
                <SemanticButton isDisabled={false} onClick={this.anonymousLoginHandler}>
                  Enter Anonymously
                </SemanticButton>
              </div>

            </div>
          </div>
        </div>
    );
  }
});

export default LoginSegment;
