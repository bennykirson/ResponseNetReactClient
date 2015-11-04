import React from 'react';
import QTipPopup from './qtipPopup';

var TextArea = React.createClass({
  render() {
    var { label, value, qtip, id, rows, disabled, ...other }=this.props;
    return (

        <label >
          {label}
          { qtip && <QTipPopup content={qtip.content} title={qtip.title}/> }
          <textarea className={ "ui input " + (disabled ? "disabled" : "") }
                    rows={ rows || "3" }
                    id={ id }
                    value={ value }
                    { ...other }>
          </textarea>
        </label>
    );
  }
});

export default TextArea;
