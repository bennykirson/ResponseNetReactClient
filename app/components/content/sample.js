import React from 'react';
import { generateGUID } from '../../utils/utilities';

var Sample = React.createClass({
  componentWillMount() {
    var userName;
    if (localStorage.userName) {
      userName = localStorage.userName
    } else {
      localStorage.userName = "anonymous_" + generateGUID();
      userName = localStorage.userName;
    }
    var data = [
      generateGUID(), userName, "Mr_Sample", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", true
    ]
    getXML("RunResponseNet", data).fork(R.noop, (res) => {
      var parsed = JSON.parse(res.text);
      var data = getJSONFromGraphML(getXMLFromString(parsed.result));
      console.log(res);

    });
  },

  render() {
    return (
        <div />
    );
  }
});

export default Sample;
