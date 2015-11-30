import React from 'react';
import SemanticRadioItem from './semanticRadioItem';
import SemanticInputFile from '../form/semanticInputFile';

var FileInputWithToggle = React.createClass({

  onChange(value){
    if (this.props.onChange) {
      this.props.onChange(this.props.buttonId);

    }
  },
  onSelect(value){
    this.props.onSelect(value, this.props.buttonId);
  },

  render() {
    var {checkboxLabel,isDisabled,isPositive,buttonId,buttonTag,...other}=this.props;
    return (
        <div className="ui inline fields">
          <div className=" ui field">
            <SemanticRadioItem label={checkboxLabel} onChange={this.onChange} kind="toggle"/>
          </div>
          <div className=" ui field">
            <SemanticInputFile buttonId={buttonId} buttonTag={buttonTag} isDisabled={isDisabled} isPositive={isPositive} onSelect={this.onSelect}/>
          </div>


        </div>

    );
  }
});

export default FileInputWithToggle;
