import React from 'react';
import { getChemicalsFromXML,getSummaryFromXML,getFilesFromXML,getSessionsFromXML, getXMLFromString ,getJSONFromGraphML} from '../../utilities';
import getXML from "../../api/api";
import R from "ramda";
import CytoscapeComponent from '../graph/cytoscapeComponent';
import TabberComponent from '../graph/TabberComponent';

//Start Tabs import s
import PropertiesTab from '../tabber/propertiesTab';
import GraphOptionsTab from '../tabber/graphOptionsTab';
import FilesTab from '../tabber/filesTab';
import ChemicalsTab from '../tabber/chemicalsTab';
import GeneOntologyTab from '../tabber/geneOntologyTab';
import LayersTab from '../tabber/layersTab';
import LogTab from '../tabber/logTab';
import SummaryTab from '../tabber/summaryTab';
//End Tabs imports


import ReactTabs  from 'react-tabs';
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

var Graph = React.createClass({
  getInitialState() {
    return {
      currentIndex: 0,
      graph: {},
      isLoaded: false,
      selectedNodes: [],
      selectedEdges: [],
      loadedFiles: [],
      loadedSummary: []
    };
  },
  getFiles(){
    var data = [localStorage.GUID, localStorage.jobName, localStorage.userName];
    getXML("GetLinksForJob", data).fork(R.noop, (res) => {
      var parsed = JSON.parse(res.text);
      var files = getFilesFromXML(getXMLFromString(parsed.result));
      this.setState({
        loadedFiles: files
      });
    });
  },
  getSummary(){
    var data = [localStorage.GUID, localStorage.jobName, localStorage.userName];
    getXML("GetGraphSummary", data).fork(R.noop, (res) => {
      var parsed = JSON.parse(res.text);
      var summary = getSummaryFromXML(getXMLFromString(parsed.result));
      this.setState({
        loadedSummary: summary
      });
    });


  },
  getChemicals(){

  },
  componentWillMount() {
    if (localStorage.userName) {
      localStorage.jobName = this.props.params.sessionName;
      localStorage.GUID = this.props.params.sessionId;
      var data = [this.props.params.sessionId, localStorage.userName];
      getXML("LoadSession", data).fork(R.noop, (res) => {
        var parsed = JSON.parse(res.text);
        var parsedGraph = getJSONFromGraphML(getXMLFromString(parsed.result));

        this.setState({
          graph: parsedGraph,
          isLoaded: true
        });
      });

    }
  },
  handleSelected(index, last) {
    this.setState({
      currentIndex: index
    });
  },
  onChangeSelection(nodes, edges){
    this.setState({
      selectedNodes: nodes,
      selectedEdges: edges
    });
  }

  ,

  render() {
    var {...other}=this.props;
    return (
        <div>
          {this.state.isLoaded ? (
              <div className="ui grid">
                <div className="ui ten wide column"><CytoscapeComponent data={this.state.graph}
                                                                        onChange={this.onChangeSelection}/>
                </div>
                <div className="ui six wide column">
                  <div className="ui segment container tabber-size">
                    <Tabs
                        onSelect={this.handleSelected}
                        selectedIndex={this.state.currentIndex}>
                      <TabList>
                        <Tab>Properties</Tab>
                        <Tab>Layers</Tab>
                        <Tab>Gene Ontology</Tab>
                        <Tab>Chemicals</Tab>
                        <Tab>Summary</Tab>
                        <Tab>Files</Tab>
                        <Tab>Log</Tab>
                        <Tab>Graph Options</Tab>
                      </TabList>
                      <TabPanel>
                        <PropertiesTab nodes={this.state.selectedNodes} edges={this.state.selectedEdges}/>
                      </TabPanel>
                      <TabPanel>
                        <h2>Hello from Bar</h2>
                      </TabPanel>
                      <TabPanel>
                        <GeneOntologyTab />
                      </TabPanel>
                      <TabPanel>
                        <ChemicalsTab getChemicals={this.getChemicals} />
                      </TabPanel>
                      <TabPanel>
                        <SummaryTab getSummary={this.getSummary} summary={this.state.loadedSummary}/>
                      </TabPanel>
                      <TabPanel>
                        <FilesTab files={this.state.loadedFiles} getFiles={this.getFiles}/>
                      </TabPanel>
                      <TabPanel>
                        <h2>Hello from Baz5</h2>
                      </TabPanel>
                      <TabPanel>
                        <GraphOptionsTab />
                      </TabPanel>
                    </Tabs>
                  </div>
                </div>
              </div>
          ) : (
              <div className="ui active dimmer">
                <div className="ui medium text loader">Graph is being loaded....</div>
              </div>
          )}
        </div>

    );
  }
});

export default Graph;
