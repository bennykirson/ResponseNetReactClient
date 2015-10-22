import React from 'react';
import GeneSearch from '../form/geneSearch';
import SemanticDropdown from '../common/semanticDropdown';
import TextArea from '../common/textArea';
import FileInputWithToggle from '../common/fileInputWithToggle';
import MoreOptions from '../form/moreOptionsForm';
import QTipPopup from '../common/qtipPopup';


var Home = React.createClass({
  getInitialState() {
    return {
      option: 'Human',
      sourceSetValues: '',
      showMoreOptions: false,
      isProteinFileInputDisabled: true,
      isGeneFileInputDisabled: true,
      isInteractomeFileInputDisabled: true,
      isProteinFileInputGreen: false,
      isGeneFileInputGreen: false,
      isInteractionsDisabled: true,
      shouldRunShortestPath: false,
      shouldRandomize: false,
      interactionsTextAreaValue: '',
      fileTag1: "Upload File",
      fileTag2: "Upload File"
    };
  },

  onChange(option){
    this.setState({
      option
    });
  },

  onFileUploadHandler(value){


  },
  onSearchChange(value) {
    this.setState({
      sourceSetValues: this.state.sourceSetValues + value + ", "
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
    this.setState({isInteractionsDisabled: !this.state.isInteractionsDisabled});
  },

  onInteractionsInputChange(value) {
    this.setState({interactionsTextAreaValue: value});
  },

  shouldRandomizeHandler() {
    this.setState({shouldRandomize: !this.state.shouldRandomize});
  },

  shouldRunShortestPathHandler() {
    this.setState({shouldRunShortestPath: !this.state.shouldRunShortestPath});
  },

  render() {

    //FIXME MOVE ALL THE VARIABLES TO SOMEOTHER PLACE \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
    //FIXME MOVE ALL THE VARIABLES TO SOMEOTHER PLACE \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
    //FIXME MOVE ALL THE VARIABLES TO SOMEOTHER PLACE \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/

    var gammaSlider = {
      sliderName: "Gamma",
      minName: "smaller network",
      maxName: "larger network",
      minValue: 1,
      maxValue: 50,
      defaultValue: 1,
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
      defaultValue: 0,
      step: 0.1,
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
      content: "The format should be name,type,weight,capacity\n Example 1: FUS3 gene \nExample 2: FUS3 protein \nExample 3: FUS3 gene 0.5 0.9",
      title: ""
    };


    //FIXME MOVE ALL THE VARIABLES TO SOMEOTHER PLACE ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //FIXME MOVE ALL THE VARIABLES TO SOMEOTHER PLACE ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //FIXME MOVE ALL THE VARIABLES TO SOMEOTHER PLACE ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    return (
        <div className="ui ui raised padded container segment">
          <div className="ui form">


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
                <GeneSearch onChange={this.onSearchChange} defaultText="Search for a protein..." id="protein_search"/>
              </div>
              <div className="ui field">
                <GeneSearch defaultText="Search for a gene..." id="gene_search"/>
              </div>
            </div>
            <div className="two fields">
              <div className="ui field ">
                <TextArea label="Source Set:(your proteins)" id="source-textarea" value={this.state.sourceSetValues}
                          qtip={sourceSetQtip}/>
              </div>

              <div className="ui field ">
                <TextArea label="Target Set:(your genes and/or proteins)" id="target-textarea" qtip={targetSetQtip}/>
              </div>
            </div>
            <div className="two fields">
              <div className="ui field">
                <FileInputWithToggle onSelect={this.onFileUploadHandler} buttonTag={this.state.fileTag1}
                                     onChange={this.onFileInputToggleHandler} checkboxLabel="Load from a file"
                                     isDisabled={this.state.isProteinFileInputDisabled}
                                     isPositive={this.state.isProteinFileInputGreen} buttonId="source-file"/></div>
              <div className="ui field">
                <FileInputWithToggle onSelect={this.onFileUploadHandler} buttonTag={this.state.fileTag2}
                                     onChange={this.onFileInputToggleHandler} checkboxLabel="Load from a file"
                                     isDisabled={this.state.isGeneFileInputDisabled}
                                     isPositive={this.state.isGeneFileInputGreen} buttonId="target-file"/></div>
            </div>

            <h3 className="ui dividing header">Enter job details</h3>

            <div className="inline field required">
              <label htmlFor="job-name-input">Job name:<QTipPopup content="Allows you to access the job later." title=""/></label>
              <input className="ui fluid input"
                     id="job-name-input"
                     type="text"
                     placeholder="Enter job name..."/>
            </div>

            <div className="inline field">
              <label htmlFor="job-description-input">Job description (Optional):</label>
              <input className="ui fluid input"
                     id="job-description-input"
                     type="text"
                     placeholder="Enter job description..."/>
            </div>

            <div className="ui dividing header">
              <a tabIndex='0' onClick={ this.onMoreOptions }>More Options</a>
            </div>

            {this.state.showMoreOptions && (
                <MoreOptions onChange={ this.onFileInputToggleHandler }
                             onInteractionsToggle={ this.onInteractionsHandler }
                             onInteractionsInputChange={ this.onInteractionsInputChange }
                             isDisabled={ this.state.isInteractomeFileInputDisabled }
                             isInteractionsDisabled={ this.state.isInteractionsDisabled }
                             gammaFormSliderOptions={ gammaSlider }
                             cappingFormSliderOptions={ cappingSlider }
                             shouldRandomize={ this.state.shouldRandomize }
                             shouldRunShortestPath={ this.state.shouldRunShortestPath }
                             onShouldRandomize={ this.shouldRandomizeHandler }
                             onShouldRunShortestPath={ this.shouldRunShortestPathHandler }/>)
            }
          </div>
        </div>
    );
  }
});

export default Home;
