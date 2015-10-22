import React from 'react';
import GraphOptionsButton from '../common/graphOptionsButton';

var GraphOptionsTab = React.createClass({
  render() {
    return (
        <div>
          <h3>Change Layout</h3>
          <GraphOptionsButton>Random</GraphOptionsButton>
          <GraphOptionsButton>Grid</GraphOptionsButton>
          <GraphOptionsButton>Circle</GraphOptionsButton>
          <GraphOptionsButton>Concentric</GraphOptionsButton>
          <GraphOptionsButton>Tree</GraphOptionsButton>

          <h3>Graph Options</h3>
          <GraphOptionsButton>Remove Selected</GraphOptionsButton>
          <GraphOptionsButton>Additional TFT</GraphOptionsButton>

          <h3>Session</h3>
          <GraphOptionsButton>Save Session</GraphOptionsButton>
        </div>
    );
  }
});

export default GraphOptionsTab;
