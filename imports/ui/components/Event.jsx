import React, { Component, PropTypes } from 'react';

import {ListItem} from 'material-ui/List';
import { browserHistory } from 'react-router';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import ActionDone from 'material-ui/svg-icons/action/done';
import ContentClear from 'material-ui/svg-icons/content/clear';
import {accent_color,primary_color,dark_primary_color} from '../styles/colors';
 
// Envent component - represents a single todo item
export default class Envent extends Component {
	showDetail(e) {
		const path = `/eventdetail/${this.props.event._id}`;
    browserHistory.push(path);
	}
  renderIcon() {
    const event = this.props.event;
    const userEvent = this.props.userEvent;
    if (!userEvent && event.rightIndex < 0) {
      return <ActionFavoriteBorder color={primary_color}/>;
    } else if (!!userEvent && event.rightIndex < 0) {
      return <ActionFavorite color={primary_color}/>;
    } else if (!userEvent && event.rightIndex >= 0) {
      return <ActionFavorite color={accent_color}/>;
    } else if (event.rightIndex == userEvent.answerIndex) {
      return <ActionDone color={accent_color}/>;
    } else {
      return <ContentClear color={dark_primary_color}/>;
    }
  }
  render() {
    return (
    	<ListItem primaryText={this.props.event.title} rightIcon={this.renderIcon()} onTouchTap={this.showDetail.bind(this)}/>
    );
  }
}
 
Envent.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  event: PropTypes.object,
  userEvent: PropTypes.object,
};