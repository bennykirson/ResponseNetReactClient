import React from 'react';

var InjectionText = React.createClass({
  render() {
    var { children} = this.props;
    var injection;
    if (children.indexOf("anonymous")===0){
      injection="Guest";
    }else{
      var injection=children;
    }
    return (

        <div>
          {injection}
        </div>
    );
  }
});

export default InjectionText;
