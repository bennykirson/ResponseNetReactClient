import React from 'react';
import { getSessionsFromXML, getXMLFromString } from '../../utilities';
import getXML from "../../api/api";
import R from "ramda";
import SessionList from "../session/sessionList";

var LoadSessions = React.createClass({
  getInitialState() {
    return {
      jsonSessions: [],
      isLoaded: false,
      noUser: false
    };
  },
  componentWillMount() {
    if (localStorage.userName) {
      getXML("GetSessions", localStorage.userName).fork(R.noop, (res) => {
        var parsed = JSON.parse(res.text);
        var jsonSessions = getSessionsFromXML(getXMLFromString(parsed.result));
        this.setState({
          jsonSessions,
          isLoaded: true
        });
      });

    } else {
      this.setState({
        noUser: true,
        isLoaded: true
      });
    }

  },

  render() {
    return (


        <div className="ui segment centered very padded">
          <div className="ui header">Previous Sessions</div>

          {this.state.isLoaded ? (
              <div>
                {this.state.noUser ? (
                    <div>
                      <p>You need to log in to see the sessions</p>
                    </div>
                ) : (
                    <div>
                      <p>For {localStorage.userName}</p>
                      <SessionList sessions={this.state.jsonSessions}/>
                    </div>)
                }
              </div>
          ) : (

              <div className="ui active inverted dimmer">
                <div className="ui medium text loader">Sessions are loading</div>
              </div>

          )}


        </div>


    );
  }
});

export default LoadSessions;




