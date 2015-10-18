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
          <div className="ui top attached tabular menu FU">
            <a className="active item" data-tab="tab-name2">Tab Name 2</a>
            <a className="item" data-tab="tab-name3">Tab Name 3</a>
            <a className=" item" data-tab="tab-name4">Tab Name 4</a>
            <a className=" item" data-tab="tab-name45">Tab Name 45</a>
            <a className=" item" data-tab="tab-name46">Tab Name 46</a>
            <a className=" item" data-tab="tab-name47">Tab Name 47</a>
            <a className=" item" data-tab="tab-name48">Tab Name 48</a>
            <a className=" item" data-tab="tab-name49">Tab Name 49</a>
          </div>
          <div className="ui bottom attached active tab segment" data-tab="tab-name2">
            <p></p>
            2
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
