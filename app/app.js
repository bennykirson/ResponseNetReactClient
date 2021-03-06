import React from 'react';

import { History,RouteContext,State } from 'react-router';
import getXML from '../app/api/api';
//components
import MenuWrapper from './components/navigation/menuWrapper';
import HeaderDiv from './components/headerDiv';
import FooterDiv from './components/footerDiv';
import UpperButton from './components/common/upperButton';
import Graph from './components/content/graph';

var App = React.createClass({

  mixins: [State],
  componentWillMount() {
    getXML("GetServerStatus", []).fork(() => this.setState({ serverRunning: false }), (res) => {
      var parsed = JSON.parse(res.text);

      parsed.result === "1" ? (
          this.setState({
            serverRunning: true
          })
      ) : (
          this.setState({
            serverRunning: false
          })
      );
    });
  },


  getInitialState() {
    return {
      serverRunning: true,
      userNameInjection: "To ResponseNet 2.0",
      items: [
        {name: 'Run ResponseNet', link: 'home'},
        {name: 'Login / change user', link: 'login'},
        {name: 'Load previous session', link: 'load-session'},
        {name: 'Show example output', link: `sample`},
        {
          name: 'Tutorial',
          href: 'http://netbio.bgu.ac.il/labwebsite/?q=responsenet-webserver-tutorial',
          title: 'Tutorial'
        },
        {
          name: 'Full Gene List',
          href: 'http://netbio.bgu.ac.il/labwebsite/?q=responsenet-webserver-20-interactome-full-gene-lists',
          title: 'Full Gene List'
        },
        {
          name: 'FAQ',
          href: 'http://netbio.bgu.ac.il/labwebsite/?q=responsenet-webserver-faq',
          title: 'FAQ'
        },
        {
          name: 'Contact Us',
          href: 'http://netbio.bgu.ac.il/labwebsite/?q=contact-us',
          title: 'Contact Us'
        }

      ]
    };
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
    return this.state.serverRunning ? (
        <div>
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

          {this.props.location.pathname.substring(0, 6) === '/graph' ? (
              <div>
                {this.props.children}
              </div>
          ) : (
              <div className="ui two column grid">
                <div className="ui three wide column">
                  <MenuWrapper items={ items }
                               injectionText={localStorage.userName? localStorage.userName : this.state.userNameInjection}/>
                </div>
                <div className="ui twelve wide column">
                  {this.props.children}
                </div>
              </div>
          )}


          < FooterDiv />
        </div>
    ) : (
        <p>
          Unfortunately, our servers are currently
          down.
          <br/>
          If the problem persists please send us an email at:
          <a href="mailto:estiyl@bgu.ac.il">estiyl@bgu.ac.il</a>
        </p>
    )
  }
});

export default App;

