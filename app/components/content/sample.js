import React from 'react';
import { History } from 'react-router';
import { generateGUID } from '../../utils/utilities';
import getXML from '../../api/api';

var Sample = React.createClass({

  mixins: [History],

  componentWillMount() {
    var userName;
    if (localStorage.userName) {
      userName = localStorage.userName
    } else {
      localStorage.userName = "anonymous_" + generateGUID();
      userName = localStorage.userName;
    }
    var sessionId = generateGUID();
    var data = [
      sessionId, userName, "Mr_Sample", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", true
    ];
    getXML("RunResponseNet", data).fork(R.noop, (res) => {
      this.history.pushState(null, `/graph/${sessionId}/Mr_Sample`);
    });
  },

  render() {
    return (
        <div className="ui active intermediate text loader">
          <p>
            {'Please wait. Fetching Sample...'}
          </p>
        </div>
    );
  }
});

export default Sample;
