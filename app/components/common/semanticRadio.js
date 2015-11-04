import React from 'react';
import SemanticRadioItem from './semanticRadioItem';

var SemanticRadio = React.createClass({
  render() {
    var { radioItemsLabels,label,name, ...other } = this.props;
    var content = radioItemsLabels.map((item, i) => <SemanticRadioItem key={ i } label={ item } name={name}/>);
    return (
        <div className="inline fields">
          <label>{label}<span className="form-help-icon"
                              id="interaction-question-mark">[?]</span></label>
          {content}
        </div>
    );
  }
});

export default SemanticRadio;
