import 'babel-core/polyfill';
import { createHashHistory } from 'history'
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
import Sample from './components/content/sample';

var history = createHashHistory({
  queryKey: false
});

var routes = (

    <Route path="/" component={ App }>
      <IndexRoute component={ Home }/>
      <Route path="home" component={ Home }/>
      <Route path="login" component={ Login }/>
      <Route path="load-session" component={ LoadSession }/>
      <Route path="sample" component={ Sample }/>
      <Route path="graph/:sessionId/:sessionName" component={ Graph }/>


    </Route>
);

 React.render(<Router history={history}>{routes}</Router>, document.body);


