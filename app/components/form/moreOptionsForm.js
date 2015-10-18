import React from 'react';
import SemanticRadio from '../common/semanticRadio';
import FileInputWithToggle from '../common/fileInputWithToggle';
import FormSlider from './formSlider';

var MoreOptions = React.createClass({


  render() {
    var { gammaFormSliderOptions,cappingFormSliderOptions,buttonTag,isDisabled,isPositive,...other}=this.props;
    var radioLabels = ["Append", "Replace"];

    return (
        <div>
          <SemanticRadio radioItemsLabels={radioLabels} label="Interactions:" name="interactions-kind"/>

          <div className="ui two fields">
            <FileInputWithToggle checkboxLabel="Load interactome file " isDisabled={isDisabled} isPositive={isPositive}
                                 onSelect={this.props.onSelect} buttonId="interactomeFileUpload" buttonTag={buttonTag} onChange={this.props.onChange}/>

            <div className="field">
              blablaaa
            </div>
          </div>



        <div className="field">
          <FormSlider options={gammaFormSliderOptions}/>
        </div>
        <div className="field">
          <FormSlider options={cappingFormSliderOptions} />

        </div>
        </div>
    );
  }
});

export default MoreOptions;

/**
 *
 *  <FormSlider options={gammaFormSliderOptions}/>
 <FormSlider options={cappingFormSliderOptions}/>
 */

