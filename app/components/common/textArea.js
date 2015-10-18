import React from 'react';
import QTipPopup from './qtipPopup';

var TextArea = React.createClass({
  render() {
    var { label ,value,qtip,id }=this.props;
    return (

        <label >{label}<QTipPopup content={qtip.content} title={qtip.title}/>

          <textarea rows="3" id={id} value={value}></textarea>
        </label>
    );
  }
});

export default TextArea;
