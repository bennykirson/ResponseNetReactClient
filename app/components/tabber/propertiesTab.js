import React from 'react';
import {  map, mapObjIndexed } from 'ramda';
import QTipPopup from '../common/qtipPopup';
import TableWrapper from '../table/tableWrapper';

var PropertiesTab = React.createClass({
  linkyfyData(keyName,value){
    if (keyName === "commonName" || keyName === "ENSG" || keyName === "Entrez" || keyName === "sourceNode" || keyName === "targetNode") {
      return "http://www.ncbi.nlm.nih.gov/gene/?term="+value;
    } else {
      return "";
    }
  },
  render() {
    var {nodes,edges,...other}=this.props;

    var newNode = mapObjIndexed((value, key, object) => {
      return {
        value: value,
        link: this.linkyfyData(key,value)
      };
    });
    var createNewObjects = map(newNode);
    var newNodes = createNewObjects(nodes);
    var newEdges = createNewObjects(edges);

    var nodeHeaders = [
      {name: "Common Name", id: "commonName"},
      {name: "ENSG", id: "ENSG"},
      {name: "Entrez", id: "Entrez"},
      {name: "Random Source", id: "RandomSource"},
      {name: "Random Target", id: "RandomTarget"},
      {name: "Random Predicted", id: "RandomPredicted"},
      {name: "Incoming Flow", id: "incomingFlow"}
    ];

    var edgeHeaders = [
      {name: "Source Node", id: "sourceNode"},
      {name: "Target Node", id: "targetNode"},
      {node: "Weight", id: "weight"},
      {name: "Type", id: "type"},
      {name: "Flow", id: "flow"},
      {name: "Random", id: "random"}
    ];

    return (
        <div>
          <h4>Properties for selected nodes and edges <QTipPopup
              content="Select a group of elements, the properties will update to reflect the change " title=""/></h4>
          {nodes.length > 0 ? (
              <div>
                <h5>Nodes:</h5>

                <div className="horizontal-scrollable vertical-scrollable">
                  <TableWrapper headers={nodeHeaders} rows={newNodes}/>
                </div>
              </div>
          ) : (
              <div/>
          )}
          {edges.length > 0 ? (
              <div>
                <br/>
                <h5>Edges:</h5>

                <div className="horizontal-scrollable vertical-scrollable">
                  <TableWrapper headers={edgeHeaders} rows={newEdges}/>
                </div>
              </div>
          ) : (
              <div/>
          )}
        </div>
    );
  }
});

export default PropertiesTab;
