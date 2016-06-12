import React, { Component, PropTypes } from 'react';

import {ListItem} from 'material-ui/List';
 
// Envent component - represents a single todo item
export default class Envent extends Component {
  render() {
    return (
    	<ListItem primaryText={this.props.event.text} />
    );
  }
}
 
Envent.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  event: PropTypes.object.isRequired,
};