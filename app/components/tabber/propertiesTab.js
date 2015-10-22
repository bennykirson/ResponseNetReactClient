import React from 'react';
import QTipPopup from '../common/qtipPopup';
import DataGrid from 'react-datagrid';
import TableRow from './tableRow';

var PropertiesTab = React.createClass({
  render() {
    var {nodes,edges,...other}=this.props;
   // var nodesContent = nodes.map((item, i) => <TableRow key={ i } data={ nodes } />);
    //var edgesContent = edges.map((item, i) => <TableRow key={ i } data={ edges } />);
    return (
        <div>
          <h4>Properties for selected nodes and edges <QTipPopup
              content="Select a group of elements, the properties will update to reflect the change " title=""/></h4>
          {nodes.length > 0 ? (
              <div>
                <h5>Nodes:</h5>

                <div className="horizontal-scrollable vertical-scrollable">
                  <table className="ui celled striped selectable table">
                    <thead>
                    <tr>
                      <th>CommonName</th>
                      <th>ENSG</th>
                      <th>Entrez</th>
                      <th>RandomSource</th>
                      <th>RandomTarget</th>
                      <th>RandomPredicted</th>
                      <th>IncomingFlow</th>
                    </tr>
                    </thead>
                    <tbody>
                    {nodesContent}
                    </tbody>
                  </table>
                </div>
              </div>
          ) : (
              <div/>
          )}
          {edges.length > 0 ? (
              <div>
                <h5>Edges:</h5>

                <div className="vertical-scrollable">
                  <table className="ui celled striped selectable table">
                    <thead>
                    <tr>
                      <th>SourceNode</th>
                      <th>TargetNode</th>
                      <th>Weight</th>
                      <th>Type</th>
                      <th>Flow</th>
                      <th>Random</th>
                    </tr>
                    </thead>
                    <tbody>
                  {edgesContent}

                    </tbody>
                  </table>
                </div>
              </div>
          ) : (
              <div/>
          )}
          {edges.length === 0 && nodes.length === 0 ? (
              <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
              </div>
          ) : (
              <div/>
          )}

        </div>
    );
  }
});

export default PropertiesTab;
