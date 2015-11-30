import React from 'react';
import { getGeneOntologyFromXML,getGraphMLFromData,getChemicalsFromXML,getSummaryFromXML,getFilesFromXML,getSessionsFromXML, getXMLFromString ,getJSONFromGraphML} from '../../utils/utilities';
import getXML from "../../api/api";
import R from "ramda";
import CytoscapeComponent from '../graph/cytoscapeComponent';
import TabberComponent from '../graph/TabberComponent';
import JobLink from '../graph/jobLink';
import ModalMessage from '../graph/modalMessage';
//Start Tabs import s
import PropertiesTab from '../tabber/propertiesTab';
import GraphOptionsTab from '../tabber/graphOptionsTab';
import FilesTab from '../tabber/filesTab';
import ChemicalsTab from '../tabber/chemicalsTab';
import GeneOntologyTab from '../tabber/geneOntologyTab';
import LayersTab from '../tabber/layersTab';
import LogTab from '../tabber/logTab';
import SummaryTab from '../tabber/summaryTab';
import LayerUtils from '../../utils/layerUtils';

//End Tabs imports


import ReactTabs  from 'react-tabs';
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

const GO_TAB_INDEX = 2;
const CHEMICALS_TAB_INDEX = 3;

window.R = R; // for experimentation & debugging

var Graph = React.createClass({

  getInitialState() {
    return {
      schema: [],
      initiateRemove: false,
      currentIndex: 0,
      graph: {},
      isLoaded: false,
      selectedNodes: [],
      selectedEdges: [],
      loadedFiles: [],
      loadedSummary: [],
      idToCommonNameMapper: {},
      commonNameToIdMapper: {},
      chemicalMemory: {},
      GOMemory: {},
      currentChemicals: [],
      currentGO: [],
      layers: {},
      graphFiltering: "union",
      layout: "breadthfirst"


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
  getUnaAvailable(idsArray, type){
    var ans = [];
    if (type === "medicine") {
      idsArray.map((id, i)=> {
        if (this.state.chemicalMemory[id] === undefined || this.state.chemicalMemory[id] === null)
          ans.push(id);
      });
    } else {
      idsArray.map((id, i)=> {
        if (this.state.GOMemory[id] === undefined || this.state.GOMemory[id] === null)
          ans.push(id);
      });
    }
    return ans;
  },
  getChemicals(){
    if (this.state.selectedNodes.length !== 0) {
      var nodeIds = [];
      var chemicals = [];
      //Get all selected nodes id
      this.state.selectedNodes.map((node, i)=> {
        nodeIds.push(node.id);
      });
      //Get all nodes that aren't saved in chemicalMemory
      var unAvailable = this.getUnaAvailable(nodeIds, "medicine");
      if (unAvailable.length > 0) {
        var nodeIdList = "" + unAvailable;
        var data = [localStorage.GUID, nodeIdList, localStorage.userName];
        getXML("GetChemicalsDataForNodes", data).fork(R.noop, (res) => {
          var parsed = JSON.parse(res.text);
          chemicals = getChemicalsFromXML(getXMLFromString(parsed.result));
          chemicals.map((node, i)=> {
            node["name"] = this.state.idToCommonNameMapper[node.id];
            this.state.chemicalMemory[node.id] = node;
          });
          chemicals = [];
          nodeIds.map((id, i)=> {
            chemicals.push(this.state.chemicalMemory[id]);
          });
          this.setState({
            currentChemicals: chemicals
          });
        });
      } else {
        nodeIds.map((id, i)=> {
          chemicals.push(this.state.chemicalMemory[id]);
        });
        this.setState({
          currentChemicals: chemicals
        });

      }
    } else {
      this.setState({
        currentChemicals: []
      });
    }
  },
  getGO(){
    if (this.state.selectedNodes.length !== 0) {
      var nodeIds = [];
      var GO = [];

      //Get all selected nodes id
      this.state.selectedNodes.map((node, i)=> {
        nodeIds.push(node.id);
      });

      //Get all nodes that aren't saved in chemicalMemory
      var unAvailable = this.getUnaAvailable(nodeIds, "ontology");
      if (unAvailable.length > 0) {
        var nodeIdList = "" + unAvailable;
        var data = [localStorage.GUID, nodeIdList, localStorage.userName];
        getXML("GetGeneOntologyDataForNodes", data).fork(R.noop, (res) => {
          var parsed = JSON.parse(res.text);
          GO = getGeneOntologyFromXML(getXMLFromString(parsed.result));
          if (GO.length !== 0) {
            //Get Id's and remember results
            GO.map((node)=> {
              node["id"] = this.state.commonNameToIdMapper[node.name];
              this.state.GOMemory[node.id] = node;
            });
            GO = [];
            //get all requested nodes
            nodeIds.map((id)=> {
              GO.push(this.state.GOMemory[id]);
            });


          } else {
            GO = [];
          }


          this.setState({
            currentGO: GO
          });

        });
      } else {

        nodeIds.map((id, i)=> {
          GO.push(this.state.GOMemory[id]);
        });
        this.setState({
          currentGO: GO
        });

      }
    } else {
      this.setState({
        currentGO: []
      });
    }
  },
  componentWillMount() {
    if (localStorage.userName) {
      localStorage.jobName = this.props.params.sessionName;
      localStorage.GUID = this.props.params.sessionId;
      var data = [this.props.params.sessionId, localStorage.userName];
      getXML("LoadSession", data).fork(R.noop, (res) => {
        var parsed = JSON.parse(res.text);


        var parsedData = getJSONFromGraphML(getXMLFromString(parsed.result));
        this.state.layers["ResponseNet"] = parsedData.elements;
        this.state.layers["ResponseNet"].name = "ResponseNet";
        this.state.layers["ResponseNet"].checkedNodes = true;
        this.state.layers["ResponseNet"].checkedEdges = true;
        this.state.layers["ResponseNet"].edgeCheckboxDisabled = false;
        this.setState({
          graph: parsedData.elements,
          schema: parsedData.schema,
          isLoaded: true
        });

      });

    }
  },
  handleSelected(index, last) {
    this.setState({
      currentIndex: index
    });
  }
  ,

  onChangeSelection(nodes, edges){
    nodes.map((node)=> {
      this.state.idToCommonNameMapper[node.id] = node.commonName;
    });
    nodes.map((node)=> {
      this.state.commonNameToIdMapper[node.commonName] = node.id;
    });
    this.setState({
      selectedNodes: nodes,
      selectedEdges: edges
    });
    if (this.state.currentIndex === CHEMICALS_TAB_INDEX) {
      this.getChemicals();
    } else if (this.state.currentIndex === GO_TAB_INDEX) {
      this.getGO();
    }
  },
  changeLayout(layout){
    var newLayout = layout.toLowerCase();
    if (newLayout == "tree")
      newLayout = "breadthfirst";
    this.setState({
      layout: newLayout
    });
  },
  initiateRemoveNodes(){
    this.setState({
          initiateRemove: true
        }
    );

  },
  removeNodes(nodes, edges){

    var { layers } = this.state;
    var newNodes = nodes.map(node => {
      return {data: node}
    });
    var newEdges = edges.map(edge => {
      return {data: edge}
    });

    var comparator = (x, y) => {
      return x.data.id === y.data.id;
    };

    var { graph } = this.state;
    var nodesLens = R.lensProp('nodes');
    var edgesLens = R.lensProp('edges');
    var filteredByNodes = R.mapObj(R.over(nodesLens, R.differenceWith(comparator, R.__, newNodes)), layers);
    var filteredByNodesAndEdges = R.mapObj(R.over(edgesLens, R.differenceWith(comparator, R.__, newEdges)), filteredByNodes);


    newGraph = Object.assign({}, graph);
    var checkedNodes = LayerUtils.extractChecked('checkedNodes')(R.values(filteredByNodesAndEdges));
    var checkedEdges = LayerUtils.extractChecked('checkedEdges')(R.values(filteredByNodesAndEdges));

    var changeNodes = LayerUtils.extractProp('nodes')(checkedNodes);
    var changeEdges = LayerUtils.extractProp('edges')(checkedEdges);
    newGraph.nodes = LayerUtils[this.state.graphFiltering](changeNodes);
    newGraph.edges = LayerUtils[this.state.graphFiltering](changeEdges);
    this.setState({
      graph: newGraph,
      layers: filteredByNodesAndEdges
    });
  },
  getTFT(){
    console.log("get TFT");

  },
  saveSession(){
    var { layers } = this.state;
    var { graph } = this.state;
    var newGraph = Object.assign({}, graph);
    var nodes = LayerUtils.extractProp('nodes')(layers);
    var edges = LayerUtils.extractProp('edges')(layers);
    newGraph.nodes = LayerUtils['union'](nodes);
    newGraph.edges = LayerUtils['union'](edges);
    var saveGraph = {nodes: newGraph.nodes, edges: newGraph.edges};
    var savedFileOutput = getGraphMLFromData(this.state.schema, saveGraph);

    var data = [localStorage.GUID, localStorage.userName, savedFileOutput, localStorage.jobName];
    getXML("SaveSession", data).fork(R.noop, (res) => {
      var parsed = JSON.parse(res.text);


    });
  },
  exportToGraphML(){
    var { layers } = this.state;
    var { graph } = this.state;
    var newGraph = Object.assign({}, graph);
    var nodes = LayerUtils.extractProp('nodes')(layers);
    var edges = LayerUtils.extractProp('edges')(layers);
    newGraph.nodes = LayerUtils['union'](nodes);
    newGraph.nodes = LayerUtils['union'](edges);
    var saveGraph = {nodes: newGraph.nodes, edges: newGraph.edges};

    var data = getGraphMLFromData(this.state.schema, saveGraph);

    var fileName = localStorage.jobName;
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  },
  importGraph(fileList){

    if (fileList !== false) {
      var file = fileList[0];
      var textType = /text.*/;

      if (file.type.match(textType)) {
        var reader = new FileReader();
        reader.onload = (e) => {
          var parsedData = getJSONFromGraphML(getXMLFromString(reader.result));


          var layers = this.state.layers;
          var newLayers = Object.assign({}, layers);
          var layerName = "importedLayer" + new Date().getTime();
          newLayers[layerName] = {name: layerName, nodes: parsedData.elements.nodes, edges: parsedData.elements.edges};
          newLayers[layerName].checkedNodes = true;
          newLayers[layerName].checkedEdges = true;
          newLayers[layerName].edgeCheckboxDisabled = false;
          this.setState({
            layers: newLayers
          });
        };
        reader.readAsText(file);
      } else {
        alert('File not supported!');
      }
    }
  },
  newLayerFromSelected(){

    var selectedNodes = this.state.selectedNodes.map((node) => {
      return {data: node, group: "nodes"};
    });
    var selectedEdges = this.state.selectedEdges.map((edge) => {
      return {data: edge, group: "edges"}
    });
    if (selectedEdges.length === 0 && selectedNodes.length === 0) {
      alert("Please select something")
    } else {
      var layers = this.state.layers;
      var newLayers = Object.assign({}, layers);
      var layerName = "selectedLayer" + new Date().getTime();
      newLayers[layerName] = {name: layerName, nodes: selectedNodes, edges: selectedEdges};
      newLayers[layerName].checkedNodes = true;
      newLayers[layerName].checkedEdges = true;
      newLayers[layerName].edgeCheckboxDisabled = false;
      this.setState({
        layers: newLayers,
        selectedNodes: [],
        selectedEdges: []
      });
      this.handleFilterChange(this.state.graphFiltering);
    }
  },
  handleLayerNameChange(newName, layerKey){
    var { layers } =this.state;
    var newLayers = Object.assign({}, layers);
    newLayers[layerKey].name = newName.name;
    this.setState({
      layers: newLayers
    });
  },

  handleFilterChange(target){

    var { layers } = this.state;

    var { graph } = this.state;
    var newGraph = Object.assign({}, graph);
    var checkedNodes = LayerUtils.extractChecked('checkedNodes')(R.values(layers));
    var checkedEdges = LayerUtils.extractChecked('checkedEdges')(R.values(layers));

    var nodes = LayerUtils.extractProp('nodes')(checkedNodes);
    var edges = LayerUtils.extractProp('edges')(checkedEdges);
    newGraph.nodes = [];
    newGraph.edges = [];
    if (nodes.length !== 0)
      newGraph.nodes = LayerUtils[target](nodes);
    if (edges.length !== 0)
      newGraph.edges = LayerUtils[target](edges);
    this.setState({
      graphFiltering: target,
      graph: newGraph
    });


  },

  onLayersCheckboxChangeHandler(name, e) {
    var change = false;
    if (e.target.name === "nodes") {
      this.state.layers[name].checkedNodes = !this.state.layers[name].checkedNodes;
      change = true;
      if (this.state.layers[name].checkedNodes === false) {
        this.state.layers[name].checkedEdges = false;
        this.state.layers[name].edgeCheckboxDisabled = true;
      } else {
        this.state.layers[name].checkedEdges = true;
        this.state.layers[name].edgeCheckboxDisabled = false;
      }
    } else {
      if (this.state.layers[name].edgeCheckboxDisabled === false) {
        change = true;
        this.state.layers[name].checkedEdges = !this.state.layers[name].checkedEdges;
      }

    }
    if (change)
      this.handleFilterChange(this.state.graphFiltering);
  },

  render() {
    var {...other}=this.props;

    return (
        <div>
          {this.state.isLoaded ? (
              <div>
                <div className="ui grid">
                  <div className="ui ten wide column">
                    <CytoscapeComponent data={this.state.graph}
                                        layers={this.state.layers}
                                        initiateRemove={this.state.initiateRemove}
                                        onChange={this.onChangeSelection}
                                        layout={this.state.layout}
                                        changeLayout={this.changeLayout}
                                        removeNodes={this.removeNodes}
                                        getTFT={this.getTFT}
                                        saveSession={this.saveSession}
                                        ToGraphML={this.exportToGraphML}
                                        importGraph={this.importGraph}
                                        newLayerFromSelected={this.newLayerFromSelected}
                                        filtering={this.state.graphFiltering}
                    />
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
                          <LayersTab layers={this.state.layers}
                                     handleFilterChange={this.handleFilterChange}
                                     onChange={ this.onLayersCheckboxChangeHandler }
                                     onLayerChangeName={this.handleLayerNameChange }
                          />
                        </TabPanel>
                        <TabPanel>
                          <GeneOntologyTab getGO={this.getGO} GO={this.state.currentGO}/>
                        </TabPanel>
                        <TabPanel>
                          <ChemicalsTab getChemicals={this.getChemicals} chemicals={this.state.currentChemicals}/>
                        </TabPanel>
                        <TabPanel>
                          <SummaryTab getSummary={this.getSummary} summary={this.state.loadedSummary}/>
                        </TabPanel>
                        <TabPanel>
                          <FilesTab files={this.state.loadedFiles} getFiles={this.getFiles}/>
                        </TabPanel>
                        <TabPanel>
                          <LogTab />
                        </TabPanel>
                        <TabPanel>
                          <GraphOptionsTab changeLayout={this.changeLayout} changeLayout={this.changeLayout}
                                           removeNodes={this.initiateRemoveNodes}
                                           getTFT={this.getTFT}
                                           saveSession={this.saveSession}
                                           importGraph={this.importGraph}/>
                        </TabPanel>
                      </Tabs>
                    </div>
                  </div>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div className="ui center aligned text container">
                  <JobLink GUID={localStorage.GUID} jobName={localStorage.jobName}/>
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
