import React from 'react';
import { getSessionsFromXML, getXMLFromString } from '../../utilities';
import getXML from "../../api/api";
import R from "ramda";
import CytoscapeComponent from '../graph/cytoscapeComponent';
import TabberComponent from '../graph/TabberComponent';


var Graph = React.createClass({
  getInitialState() {
    return {
      graph: {},
      isLoaded: false
    };
  },

  componentWillMount() {
    if (localStorage.userName) {
      var data = [this.props.sessionId, localStorage.userName];
      getXML("LoadSession", data).fork(R.noop, (res) => {
        var parsed = JSON.parse(res.text);
        console.log(res.text);

        var graphXML = getXMLFromString(parsed.result);
        console.log(graphXML);
        console.log(parsed);

        this.setState({
          graph: graphXML,
          isLoaded: true
        });
      });

    }
  },


  render() {
    var {sessionId,...other}=this.props;
    return (
        <div>
          {this.state.isLoaded ? (
              <div className="ui grid">
                <div className="ui ten wide column"><CytoscapeComponent /></div>
                <div className="ui one wide column"><TabberComponent/>
                </div>
              </div>
          ) : (
              <div className="ui active dimmer">
                <div className="ui medium text loader">Graph is being loaded....</div>
              </div>
          )}
        </div>

    );
  }
});

export default Graph;
