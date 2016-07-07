import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import Admin from '../../ui/containers/AdminContainer.jsx';
import App from '../../ui/containers/AppContainer.jsx';
import Home from '../../ui/containers/HomeContainer.jsx';
import NewEvent from '../../ui/containers/NewEventContainer.jsx';
import EventDetail from '../../ui/containers/EventDetailContainer.jsx';
import DoneEvents from '../../ui/containers/DoneEventsContainer.jsx';
import AuthPageLogin from '../../ui/pages/AuthPageLogin.jsx';
import AuthPageJoin from '../../ui/pages/AuthPageJoin.jsx';
import EditEvent from '../../ui/containers/EditEventContainer.jsx'

function toAdmin(nextState, replaceState) {
    // const currentUser = Meteor.userId();
    // const isAdmin = Roles.userIsInRole(currentUser || '', 'super-admin');
    // if (!isAdmin) {
    //      replaceState(null, '/');
    // }
}
export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={App} >
    	<IndexRoute component={Home} />
    	<Route path='admin' component={Admin} onEnter={toAdmin}/>
        <Route path='edit/:id' component={EditEvent} />
    	<Route path='newevent' component={NewEvent} />
    	<Route path='eventdetail/:id' component={EventDetail} />
    	<Route path="login" component={AuthPageLogin}/>
    	<Route path="register" component={AuthPageJoin}/>
        <Route path="done" component={DoneEvents}/>
    </Route>
  </Router>
);