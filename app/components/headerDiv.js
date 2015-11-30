import React from 'react';

var HeaderDiv = React.createClass({
  render() {
    return (
        <div className="header">
          <a href="netbio.bgu.ac.il">
            <img src="statics/graphics/lab_header.jpg"
                 alt="The logo of the lab and the link to the main lab site"/>
          </a>
        </div>
    );
  }
});

export default HeaderDiv;
