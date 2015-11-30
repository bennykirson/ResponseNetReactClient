import React from 'react';

var JobLink = React.createClass({
  render() {
    var {GUID,jobName,...other}=this.props;
    var jobLink="http://netbio.bgu.ac.il/respnet-new/#/graph/";
    jobLink+=GUID+"/"+jobName;
    return (
      <div>
        The job can be accessed using this <a href={ jobLink }>link</a> :
        <div className="ui basic label">
          {jobLink}
        </div>
      </div>
    );
  }
});

export default JobLink;
