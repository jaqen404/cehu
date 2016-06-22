import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import Admin from '../../ui/containers/AdminContainer.jsx';
import App from '../../ui/containers/AppContainer.jsx';
import Home from '../../ui/containers/HomeContainer.jsx';
import NewEvent from '../../ui/pages/NewEvent.jsx';
import EventDetail from '../../ui/containers/EventDetailContainer.jsx';
import DoneEvents from '../../ui/containers/DoneEventsContainer.jsx';
import AuthPageLogin from '../../ui/pages/AuthPageLogin.jsx';
import AuthPageJoin from '../../ui/pages/AuthPageJoin.jsx';
import EditEventContainer from '../../ui/containers/EditEventContainer.jsx'

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={App} >
    	<IndexRoute component={Home} />
    	<Route path='admin' component={Admin} />
        <Route path='edit/:id' component={EditEventContainer} />
    	<Route path='newevent' component={NewEvent} />
    	<Route path='eventdetail/:id' component={EventDetail} />
    	<Route path="login" component={AuthPageLogin}/>
    	<Route path="register" component={AuthPageJoin}/>
        <Route path="done" component={DoneEvents}/>
    </Route>
  </Router>
);