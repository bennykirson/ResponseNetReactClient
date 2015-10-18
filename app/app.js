import React from 'react';

import { History } from 'react-router';
//components
import MenuWrapper from './components/navigation/menuWrapper';
import HeaderDiv from './components/headerDiv';
import FooterDiv from './components/footerDiv';
import UpperButton from './components/common/upperButton';
import Graph from './components/content/graph';


var App = React.createClass({

  mixins: [History],

  getInitialState() {
    return {

      items: [
        {name: 'Run ResponseNet', link: 'home'},
        {name: 'Login / change user', link: 'login'},
        {name: 'Load previous session', link: 'load-session'},
        {name: 'Show example output', link: 'graph'},
        {
          name: 'Tutorial',
          href: 'http://netbio.bgu.ac.il/labwebsite/?q=responsenet-webserver-tutorial',
          title: 'Tutorial'
        }

      ]
    };
  },

  componentWillReceiveProps(newProps) {

    console.log(newProps);
  },

  changeUrl(url, title, newTab){
    if (newTab) {
      window.open(url, title).focus();

    } else {
      window.open(url, '_self');
    }
  },

  render() {
    var faqUrl = "http://netbio.bgu.ac.il/labwebsite/?q=responsenet-webserver-tutorial";
    var { items } = this.state;
    return (<div>
          <a href="#form-container" tabIndex="1" className="accessibility-aid skip-link">Skip to content</a>
          <HeaderDiv />

          <div id="buttons_div">
            <UpperButton icon={"home"} label={"ResponseNet 2.0 main page"}
                         onClick={this.changeUrl.bind(this,'index.html','',false)}/>
            <UpperButton icon={"external share"} label={"Open in new window"}
                         onClick={this.changeUrl.bind(this,'index.html','ResponseNet',true)}/>
            <UpperButton icon={"help"} label={"ResponseNet 2.0 Help"}
                         onClick={this.changeUrl.bind(this,faqUrl,'Tutorial',true)}/>

          </div>

          {this.props.location.pathname === '/graph' ? (

              <Graph/>
          ) : (
              <div className="ui two column grid">
                <div className="ui three wide column">
                  <MenuWrapper items={ items } injectionText="To ResponseNet 2.0"/>
                </div>
                <div className="ui twelve wide column">
                  {this.props.children}
                </div>
              </div>
          )}


          < FooterDiv />
        </div>
    )
  }
});

export default App;

