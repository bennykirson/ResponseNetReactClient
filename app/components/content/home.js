import React from 'react';
import R from 'ramda';
import GeneSearch from '../form/geneSearch';
import SemanticDropdown from '../common/semanticDropdown';
import TextArea from '../common/textArea';
import FileInputWithToggle from '../common/fileInputWithToggle';
import MoreOptions from '../form/moreOptionsForm';
import QTipPopup from '../common/qtipPopup';

import getXML from '../../api/api';
import { getSessionsFromXML, getXMLFromString ,getJSONFromGraphML, generateGUID } from '../../utils/utilities';

var Home = React.createClass({
  getInitialState() {
    return {
      option: 'Human',
      sourceSetValues: '',
      targetSetValues: '',
      showMoreOptions: false,
      isProteinFileInputDisabled: true,
      isGeneFileInputDisabled: true,
      isInteractomeFileInputDisabled: true,
      isProteinFileInputGreen: false,
      isGeneFileInputGreen: false,
      isInteractionsDisabled: true,
      shouldRandomize: false,
      fileTag1: "Upload File",
      fileTag2: "Upload File",
      jobName: '',
      jobDescription: '',
      jobComments: '',
      jobEmail: '',
      jobOrganism: 'Human',
      jobResGraphPickle: '',
      jobSourceFile: '',
      jobTargetFile: '',
      jobPPI: '',
      jobTFFile: '',
      shouldRunShortestPath: false,
      jobGamma: 0,
      jobCapping: 0,
      jobRandomSource: 0,
      jobRandomTarget: 0,
      jobRandomBoth: 0,
      jobGoEnrich: 'off',
      jobReplaceOrAppend: 'r',
      geneFileData: "",
      proteinFileData: ""

    };
  },

  onChange(option){
    this.setState({
      option,
      jobOrganism: option,
      jobGamma: option === 'Human' ? 2.5 : 10,
      jobCapping: option === 'Human' ? 0.8 : 0.7
    });
  },

  onNetworkChangeHandler(jobResGraphPickle) {
    this.setState({
      jobResGraphPickle
    });
  },

  onFileUploadHandler(fileList, buttonId){

    if (fileList !== false) {
      var file = fileList[0];
      var textType = /text.*/;
      var fileName = file.name.substr(0, file.name.lastIndexOf('.'));
      var homeComponent = this;
      if (file.type.match(textType)) {
        var reader = new FileReader();
        reader.onload = function (e) {
          if (buttonId === "source-file") {
            homeComponent.setState({
              proteinFileData: reader.result,
              isProteinFileInputGreen: true,
              fileTag1: fileName
            });
          }
          else if (buttonId === "target-file") {
            homeComponent.setState({
              geneFileData: reader.result,
              isGeneFileInputGreen: true,
              fileTag2: fileName
            });
          }
        };
        reader.readAsText(file);
      } else {
        alert('File not supported!');
      }

    } else {
      if (buttonId === "source-file") {
        homeComponent.setState({
          proteinFileData: "",
          isProteinFileInputGreen: false,
          fileTag1: "Upload File"
        });
      }
      else if (buttonId === "target-file") {
        homeComponent.setState({
          geneFileData: "",
          isGeneFileInputGreen: false,
          fileTag2: "Upload File"
        });

      }
    }
  },

  onSourceSetGeneSearchHandler(value) {
    this.setState({
      sourceSetValues: this.state.sourceSetValues + value + ", Protein\n"
    });
  },
  onTargetSetGeneSearchHandler(value) {
    this.setState({
      targetSetValues: this.state.targetSetValues + value + ", Gene \n"
    });
  },

  onMoreOptions(){
    this.setState({
      showMoreOptions: !this.state.showMoreOptions
    });

  },
  onFileInputToggleHandler(buttonId){
    switch (buttonId) {
      case "source-file":
        this.setState({
          isProteinFileInputDisabled: !this.state.isProteinFileInputDisabled
        });
        break;
      case "target-file":
        this.setState({
          isGeneFileInputDisabled: !this.state.isGeneFileInputDisabled
        });
        break;
      case "interactomeFileUpload":
        this.setState({
          isInteractomeFileInputDisabled: !this.state.isInteractomeFileInputDisabled
        });
        break;
    }
  },

  onInteractionsHandler() {
    this.setState({
      isInteractionsDisabled: !this.state.isInteractionsDisabled
    });
  },

  onInteractionsInputChange(e) {
    this.setState({
      jobPPI: e.target.value
    });
  },

  shouldRandomizeHandler() {
    this.setState({
      shouldRandomize: !this.state.shouldRandomize
    });
  },

  shouldRunShortestPathHandler() {
    this.setState({
      shouldRunShortestPath: !this.state.shouldRunShortestPath
    });
  },

  formInputChangeHandler(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  },

  gammaSliderChangeHandler(value) {
    this.setState({
      jobGamma: value
    });
  },

  cappingSliderChangeHandler(value) {
    this.setState({
      jobCapping: value
    });
  },

  onSubmitFormHandler() {
    var sourceData = this.state.jobSourceFile;
    var targetData = this.state.jobTargetFile;
    if (this.state.isProteinFileInputGreen === true) {
      sourceData = sourceData + this.state.proteinFileData;
    }
    if (this.state.isGeneFileInputGreen === true) {
      targetData = targetData + this.state.geneFileData;
    }
    var userName;
    if (localStorage.userName !== undefined && localStorage.userName !== "") {
      userName = localStorage.userName
    } else {
      localStorage.userName = "anonymous_" + generateGUID();
      userName = localStorage.userName;
    }
    var data = [
      generateGUID(),
      userName,
      this.state.jobName,
      this.state.jobComments,
      this.state.jobOrganism,
      this.state.jobResGraphPickle,
      sourceData,
      targetData,
      '',
      this.state.jobPPI,
      this.state.jobTFFile,
      this.state.jobReplaceOrAppend,
      parseFloat(this.state.jobGamma),
      parseFloat(this.state.jobCapping),
      this.state.jobRandomSource,
      this.state.jobRandomTarget,
      this.state.jobRandomBoth,
      this.state.jobGoEnrich,
      false,
      this.state.shouldRunShortestPath,
      false,
      0,
      false
    ];
    getXML("RunResponseNet", data).fork(R.noop, (res) => {
      var parsed = JSON.parse(res.text);
      var data = getJSONFromGraphML(getXMLFromString(parsed.result));
      console.log(res);

    });
  },

  componentWillUpdate(nextProps, nextState) {
    console.log(nextState);
  },


  render() {
    var { jobGamma, jobCapping } = this.state;
    var gammaSlider = {
      sliderName: "Gamma",
      minName: "smaller network",
      maxName: "larger network",
      minValue: 1,
      maxValue: 50,
      defaultValue: jobGamma,
      step: 1,
      qtip: {
        content: "Control size of the output network (range 0-100)",
        title: ""
      }
    };
    var cappingSlider = {
      sliderName: "Capping",
      minName: "shorter paths",
      maxName: "longer paths",
      minValue: 0,
      maxValue: 1,
      defaultValue: jobCapping,
      step: 0.05,
      qtip: {
        content: "Controls path lengths of output network paths (range 0-1)",
        title: ""
      }
    };
    var items = [{
      name: 'Homo sapiens',
      "attrValue": "Human"
    }, {
      name: 'Saccharomyces cerevisiae',
      "attrValue": "Yeast"
    }];
    var items2 = [{
      "name": "Human (January 2014)",
      "attrValue": "Human-Jan2014"
    }, {
      "name": "Human (January 2011)",
      "attrValue": "Human-Jul2011"
    },
      {
        "name": "Human (July 2011 with regulatory)",
        "attrValue": "Human-Jul2011-reg"
      }
    ];
    var items3 = [{
      "name": "Yeast (January 2011)",
      "attrValue": "Yeast-Jan2011"
    }, {
      "name": "Yeast (July 2011)",
      "attrValue": "Yeast-Jul2011"
    },
      {
        "name": "Yeast (July 2011 with regulatory)",
        "attrValue": "Yeast-Jul2011-reg"
      },
      {
        "name": "Yeast (Jan 2009)",
        "attrValue": "Yeast-Original"
      }];
    var { option } = this.state;
    var content = option === 'Human' ? items2 : items3;
    var sourceSetQtip = {
      content: "The format should be : name, type, weight, capacity Example 1: FUS3 protein" +
      " Example 2: FUS3 protein 0.5 0.9",
      title: ""
    };
    var targetSetQtip = {
      content: "The format should be name,type,weight,capacity\n " +
      "Example 1: FUS3 gene \n" +
      "Example 2: FUS3 protein \n" +
      "Example 3: FUS3 gene 0.5 0.9",
      title: ""
    };

    return (
        <div className="ui ui raised padded container segment">
          <form className="ui form">


            <div className="ui dividing header"><h1>Welcome to ResponseNet</h1>

              <p> Identify the signaling and regulatory pathways connecting proteins and genes.</p>
            </div>
            <div className="two fields">
              <div className="field required">
                <label htmlFor="organism">Choose an organism to work with:</label>
                <SemanticDropdown id="organism" items={ items } label="Choose an organism to work with:"
                                  onChange={this.onChange}
                                  defaultText="Choose an Organism"/>

              </div>
              <div className="field required">
                <label htmlFor="network">Interactome version:</label>
                <SemanticDropdown id="network" items={ content } label="Interactome version:"
                                  onChange={ this.onNetworkChangeHandler }
                                  defaultText="Choose a network"/>
              </div>
            </div>

            <div className="ui dividing header">
              <h2>
                Enter the proteins and genes to be connected:
              </h2>

              <h3 className="ui header tiny">
                We support Ensmbel, Entrez and Gene Symbol identifiers
              </h3>
            </div>
            <div className="two fields">
              <div className="ui field">
                <GeneSearch onChange={this.onSourceSetGeneSearchHandler}
                            defaultText="Search for a protein..."
                            id="protein_search"/>
              </div>
              <div className="ui field">
                <GeneSearch onChange={this.onTargetSetGeneSearchHandler}
                            defaultText="Search for a gene..."
                            id="gene_search"/>
              </div>
            </div>
            <div className="two fields">
              <div className="ui field ">
                <TextArea label="Source Set (your proteins):"
                          id="sourceSetValues"
                          value={ this.state.sourceSetValues }
                          onChange={ this.formInputChangeHandler }
                          qtip={sourceSetQtip}/>
              </div>

              <div className="ui field ">
                <TextArea label="Target Set (your genes and/or proteins):"
                          id="targetSetValues"
                          value={ this.state.targetSetValues }
                          onChange={ this.formInputChangeHandler }
                          qtip={targetSetQtip}/>
              </div>
            </div>
            <div className="two fields">
              <div className="ui field">
                <FileInputWithToggle onSelect={this.onFileUploadHandler}
                                     buttonTag={this.state.fileTag1}
                                     onChange={this.onFileInputToggleHandler}
                                     checkboxLabel="Load from a file"
                                     isDisabled={this.state.isProteinFileInputDisabled}
                                     isPositive={this.state.isProteinFileInputGreen}
                                     buttonId="source-file"/></div>
              <div className="ui field">
                <FileInputWithToggle onSelect={this.onFileUploadHandler}
                                     buttonTag={this.state.fileTag2}
                                     onChange={this.onFileInputToggleHandler}
                                     checkboxLabel="Load from a file"
                                     isDisabled={this.state.isGeneFileInputDisabled}
                                     isPositive={this.state.isGeneFileInputGreen}
                                     buttonId="target-file"/></div>
            </div>

            <h3 className="ui dividing header">Enter job details</h3>

            <div className="inline field required">
              <label htmlFor="job-name-input">Job name:
                <QTipPopup content="Allows you to access the job later."
                           title=""/>
              </label>
              <input className="ui fluid input"
                     id="jobName"
                     type="text"
                     onChange={ this.formInputChangeHandler }
                     placeholder="Enter job name..."/>
            </div>

            <div className="inline field">
              <label htmlFor="jobDescription">Job description (Optional):</label>
              <input className="ui fluid input"
                     id="jobDescription"
                     type="text"
                     onChange={ this.formInputChangeHandler }
                     placeholder="Enter job description..."/>
            </div>

            <div className="ui dividing header">
              <a tabIndex='0' onClick={ this.onMoreOptions }>More Options</a>
            </div>

            {this.state.showMoreOptions && (
                <MoreOptions onChange={ this.onFileInputToggleHandler }
                             onFormInputChange={ this.formInputChangeHandler }
                             onInteractionsToggle={ this.onInteractionsHandler }
                             onInteractionsInputChange={ this.onInteractionsInputChange }
                             isDisabled={ this.state.isInteractomeFileInputDisabled }
                             isInteractionsDisabled={ this.state.isInteractionsDisabled }
                             gammaFormSliderOptions={ gammaSlider }
                             cappingFormSliderOptions={ cappingSlider }
                             onGammaChange={ this.gammaSliderChangeHandler }
                             onCappingChange={ this.cappingSliderChangeHandler }
                             shouldRandomize={ this.state.shouldRandomize }
                             shouldRunShortestPath={ this.state.shouldRunShortestPath }
                             onShouldRandomize={ this.shouldRandomizeHandler }
                             randomSourceValue={ this.state.jobRandomSource }
                             randomTargetValue={ this.state.jobRandomTarget }
                             randomBothValue={ this.state.jobRandomBoth }
                             onShouldRunShortestPath={ this.shouldRunShortestPathHandler }/>)
            }
          </form>
          <div className="ui divider"></div>
          <div className="ui submit button" onClick={ this.onSubmitFormHandler }>
            Submit new job
          </div>
        </div>
    );
  }
});

export default Home;
