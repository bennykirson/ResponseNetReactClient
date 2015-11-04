import React from 'react';
import SemanticTab from 'semantic-ui-tab';
$.fn.tab = SemanticTab;


var TabberComponent = React.createClass({
  componentDidMount() {
    $('.tabular.menu .item').tab();
  },

  render() {
    return (
        <div>
          <div className="ui top attached tabular menu">
            <a className="item" data-tab="tab-name2">Properties</a>
            <a className="item" data-tab="tab-name3">Layers</a>
            <a className="item" data-tab="tab-name4">Gene Ontology</a>
            <a className="item" data-tab="tab-name45">Chemicals</a>
            <a className="item" data-tab="tab-name46">Summary</a>
            <a className="item" data-tab="tab-name47">Files</a>
            <a className="item" data-tab="tab-name48">Log</a>
            <a className="item" data-tab="tab-name49">Graph Options</a>
          </div>
          <div className="ui bottom attached active tab segment" data-tab="tab-name2">
            <p></p>
            2
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
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <p></p>
          </div>
          <div className="ui bottom attached  tab segment" data-tab="tab-name3">
            <p></p>
            3
            <p></p>
          </div>
          <div className="ui bottom attached  tab segment" data-tab="tab-name4">
            <p></p>
            4
            <p></p>
          </div>
          <div className="ui bottom attached  tab segment" data-tab="tab-name45">
            <p></p>
            45
            <p></p>
          </div>
          <div className="ui bottom attached  tab segment" data-tab="tab-name46">
            <p></p>
            46
            <p></p>
          </div>
          <div className="ui bottom attached  tab segment" data-tab="tab-name47">
            <p></p>
            47
            <p></p>
          </div>
          <div className="ui bottom attached  tab segment" data-tab="tab-name48">
            <p></p>
            48
            <p></p>
          </div>
          <div className="ui bottom attached  tab segment" data-tab="tab-name49">
            <p></p>
            49
            <p></p>
          </div>


        </div>
    );
  }
});

export default TabberComponent;
