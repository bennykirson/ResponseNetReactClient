import React from 'react';
import { getSessionsFromXML, getXMLFromString ,getJSONFromGraphML} from '../../utilities';
import getXML from "../../api/api";
import R from "ramda";
import CytoscapeComponent from '../graph/cytoscapeComponent';
import TabberComponent from '../graph/TabberComponent';

import PropertiesTab from '../tabber/propertiesTab';

//REACT TAB CHECK
import ReactTabs  from 'react-tabs';
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

var Graph = React.createClass({
  getInitialState() {
    return {
      graph: {},
      isLoaded: false,
      selectedNodes:[],
      selectedEdges:[]
    };
  },
  handleSelect (index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
  },
  componentWillMount() {
    if (localStorage.userName) {
      var data = [this.props.params.sessionId, localStorage.userName];
      getXML("LoadSession", data).fork(R.noop, (res) => {
        var parsed = JSON.parse(res.text);
        var data = getJSONFromGraphML(getXMLFromString(parsed.result));

        this.setState({
          graph: data,
          isLoaded: true
        });
      });

    }
  },
  onChangeSelection(nodes,edges){
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
                  <div className="ui segment container">
                    <Tabs
                        onSelect={this.handleSelected}
                        selectedIndex={0}
                        >
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
                        <PropertiesTab nodes={[]} edges={[]}/>
                      </TabPanel>
                      <TabPanel>
                        <h2>Hello from Bar</h2>
                      </TabPanel>
                      <TabPanel>
                        <h2>Hello from Baz</h2>
                      </TabPanel>
                      <TabPanel>
                        <h2>Hello from Baz2</h2>
                      </TabPanel>
                      <TabPanel>
                        <h2>Hello from Baz3</h2>
                      </TabPanel>
                      <TabPanel>
                        <h2>Hello from Baz4</h2>
                      </TabPanel>
                      <TabPanel>
                        <h2>Hello from Baz5</h2>
                      </TabPanel>
                      <TabPanel>
                        <h2>Hello from Baz6</h2>
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
