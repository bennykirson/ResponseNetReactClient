import 'babel-core/polyfill';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import $ from 'jquery';
global.$ = global.jQuery = $;
import '../node_modules/semantic-ui-transition/transition.min';

import React from 'react';
import Router, { Route, IndexRoute } from 'react-router';
import App from './app';

//Components
import Home from './components/content/home';
import Login from './components/content/login';
import LoadSession from './components/content/load-session';
import Graph from './components/content/graph';


var routes = (

    <Route path="/" component={ App }>
      <IndexRoute component={ Home }/>
      <Route path="home" component={ Home }/>
      <Route path="login" component={ Login }/>
      <Route path="load-session" component={ LoadSession }/>
      <Route path="graph/:sessionId" component={ Graph }/>


    </Route>
);

//React.render(<Router>{routes}</Router>, document.body);
// FIXME THIS IS THE CORRECT WAY TO DO THIS !!!!
 React.render(<Router history={createBrowserHistory()}>{routes}</Router>, document.body);
//FIXME IT BOTHERS ME ON DEVELOPMENT

