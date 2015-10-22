import React from 'react';
import SemanticRadio from '../common/semanticRadio';
import SemanticRadioItem from '../common/semanticRadioItem';
import FileInputWithToggle from '../common/fileInputWithToggle';
import FormSlider from './formSlider';
import TextArea from '../common/textArea';
import SemanticInput from '../common/semanticInput';
var MoreOptions = React.createClass({


  render() {
    var {
        gammaFormSliderOptions,
        cappingFormSliderOptions,
        buttonTag,
        isDisabled,
        isInteractionsDisabled,
        isPositive,
        onInteractionsToggle,
        onInteractionsInputChange,
        onShouldRandomize,
        onShouldRunShortestPath,
        shouldRandomize,
        shouldRunShortestPath,
        ...other
        } = this.props;

    var radioLabels = ["Append", "Replace"];

    return (
        <div>
          <SemanticRadio radioItemsLabels={radioLabels} label="Interactions:" name="interactions-kind"/>

          <div className="ui two fields">
            <FileInputWithToggle checkboxLabel="Load interactome file "
                                 isDisabled={ isDisabled }
                                 isPositive={ isPositive }
                                 onSelect={ this.props.onSelect }
                                 buttonId="interactomeFileUpload"
                                 buttonTag={ buttonTag }
                                 onChange={ this.props.onChange }/>

            <div className="inline field">
              <SemanticRadioItem name="interactions"
                                 label="Interactions List"
                                 kind="toggle"
                                 onChange={ onInteractionsToggle }/>
              <TextArea name="interactions-list"
                        rows="1"
                        disabled={ isInteractionsDisabled }
                        onInteractionsInputChange={ onInteractionsInputChange }/>
            </div>
          </div>


          <div className="field">
            <FormSlider options={gammaFormSliderOptions}/>
          </div>
          <div className="field">
            <FormSlider options={cappingFormSliderOptions}/>
          </div>
          <div className="inline fields">
            <SemanticRadioItem label="Randomizations (<= 10)"
                               kind="toggle"
                               onChange={ onShouldRandomize }/>
            <SemanticInput label="Source" size="two wide small" disabled={ !shouldRandomize }/>
            <SemanticInput label="Target" size="two wide small" disabled={ !shouldRandomize }/>
            <SemanticInput label="Both" size="two wide small" disabled={ !shouldRandomize }/>

          </div>
          <div className="field">
            <SemanticRadioItem label="Run as Shortest Path"
                               kind="toggle"
                               onChange={ onShouldRunShortestPath }/>
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

