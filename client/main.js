import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { renderRoutes } from '../imports/startup/client/routes.jsx';
 
Meteor.startup(() => {
	injectTapEventPlugin();
 	render(renderRoutes(), document.getElementById('render-target'));
});