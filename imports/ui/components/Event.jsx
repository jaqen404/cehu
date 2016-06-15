import React, { Component, PropTypes } from 'react';

import {ListItem} from 'material-ui/List';
import { browserHistory } from 'react-router';
 
// Envent component - represents a single todo item
export default class Envent extends Component {
	showDetail(e) {
		const path = `/eventdetail/${this.props.event._id}`;
    browserHistory.push(path);
	}
  render() {
    return (
    	<ListItem primaryText={this.props.event.title} onTouchTap={this.showDetail.bind(this)}/>
    );
  }
}
 
Envent.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  event: PropTypes.object,
};