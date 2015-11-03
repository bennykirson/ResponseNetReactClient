import React from 'react';
import GraphOptionsButton from '../common/graphOptionsButton';
import GraphInputFile from '../form/graphInputFile';

var GraphOptionsTab = React.createClass({
  changeLayout(layout){
    this.props.changeLayout(layout);
  },
  removeNodes(){
    this.props.removeNodes();
  },
  getTFT(){
    this.props.getTFT();
  },
  saveSession(){
    this.props.saveSession();
  },
  render() {
    var {...other}=this.props;
    return (
        <div>
          <h3>Change Layout</h3>
          <GraphOptionsButton onClick={this.changeLayout}>Random</GraphOptionsButton>
          <GraphOptionsButton onClick={this.changeLayout}>Grid</GraphOptionsButton>
          <GraphOptionsButton onClick={this.changeLayout}>Circle</GraphOptionsButton>
          <GraphOptionsButton onClick={this.changeLayout}>Concentric</GraphOptionsButton>
          <GraphOptionsButton onClick={this.changeLayout}>Tree</GraphOptionsButton>

          <h3>Graph Options</h3>
          <GraphOptionsButton onClick={this.removeNodes}>Remove Selected</GraphOptionsButton>
          <GraphOptionsButton onClick={this.getTFT}>Additional TFT</GraphOptionsButton>
          <GraphInputFile onSelect={this.props.importGraph}>Import Graph</GraphInputFile>


          <h3>Session</h3>
          <GraphOptionsButton onClick={this.saveSession}>Save Session</GraphOptionsButton>
        </div>
    );
  }
});

export default GraphOptionsTab;
