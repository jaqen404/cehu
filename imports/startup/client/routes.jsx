import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import Admin from '../../ui/containers/AdminContainer.jsx';
import App from '../../ui/containers/AppContainer.jsx';
import Home from '../../ui/containers/HomeContainer.jsx';
import NewEvent from '../../ui/pages/NewEvent.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={App} >
    	<IndexRoute component={Home} />
    	<Route path='/admin' component={Admin} />
    	<Route path='/newevent' component={NewEvent} />
    </Route>
  </Router>
);