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
        onGammaChange,
        onCappingChange,
        randomSourceValue,
        randomTargetValue,
        randomBothValue,
        onFormInputChange,
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
                        onChange={ onInteractionsInputChange }/>
            </div>
          </div>


          <div className="field">
            <FormSlider options={gammaFormSliderOptions} onChange={ onGammaChange }/>
          </div>
          <div className="field">
            <FormSlider options={cappingFormSliderOptions} onChange={ onCappingChange }/>
          </div>
          <div className="inline fields">
            <SemanticRadioItem label="Randomizations (<= 10)"
                               kind="toggle"
                               onChange={ onShouldRandomize }/>
            <SemanticInput label="Source"
                           id="jobRandomSource"
                           size="two wide small"
                           value={ randomSourceValue }
                           onChange={ onFormInputChange }
                           disabled={ !shouldRandomize }/>
            <SemanticInput label="Target"
                           id="jobRandomTarget"
                           size="two wide small"
                           value={ randomTargetValue }
                           onChange={ onFormInputChange }
                           disabled={ !shouldRandomize }/>
            <SemanticInput label="Both"
                           id="jobRandomBoth"
                           size="two wide small"
                           onChange={ onFormInputChange }
                           value={ randomBothValue }
                           disabled={ !shouldRandomize }/>

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

