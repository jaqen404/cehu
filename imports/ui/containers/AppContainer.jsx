import { createContainer } from 'meteor/react-meteor-data';
import App from '../layouts/App.jsx';

export default createContainer(() => {
	const currentUser = Meteor.userId();
	// Meteor.subscribe('userData');
	const isAdmin = Roles.userIsInRole(Meteor.userId(), 'super-admin');
  return {
  	currentUser: currentUser,
  	isAdmin: isAdmin,
  };
}, App);
