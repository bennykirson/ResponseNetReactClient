import React from 'react';

var InjectionText = React.createClass({
  render() {
    var { children} = this.props;
    return (

        <div>
          {children}
        </div>
    );
  }
});

export default InjectionText;
