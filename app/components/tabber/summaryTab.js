import React from 'react';
import TableWrapper from '../table/tableWrapper';
import QTipPopup from '../common/qtipPopup';

var SummaryTab = React.createClass({
  componentWillMount() {
    if (this.props.summary.length === 0)
      this.props.getSummary();
  },

  render() {
    var {summary,...other}=this.props;
    var summaryHeaders = [{name: "Property", id: "property"}, {name: "Value", id: "valueColumn"}];
    return summary.length === 0 ? (
        <div/>
    ) : (
        <div>
          <h3>This is a summary of the response graph </h3>
          <h5> Reachable = on some path that connects source to target</h5>
          <TableWrapper headers={summaryHeaders} rows={summary}/>

        </div>
    );

  }

});

export default SummaryTab;
