import React, { Component, PropTypes } from 'react';

import {ListItem} from 'material-ui/List';
import { browserHistory } from 'react-router';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import ActionDone from 'material-ui/svg-icons/action/done';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ContentBlock from 'material-ui/svg-icons/content/block';
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
    const now = new Date();
    const isClosed = event.closingDate <= now;
    if (!userEvent && event.rightIndex < 0) {
      if (!isClosed) {
        //未预测，未揭晓，未截止
        return <ActionFavoriteBorder color={primary_color}/>;
      } else {
        //未预测，未揭晓，已截止
        return <ContentBlock color={dark_primary_color}/>;
      }
    } else if (!!userEvent && event.rightIndex < 0) {
      //已预测，未揭晓
      return <ActionFavorite color={primary_color}/>;
    } else if (!userEvent && event.rightIndex >= 0) {
      //未预测，已揭晓
      return <ActionFavorite color={accent_color}/>;
    } else if (event.rightIndex == userEvent.answerIndex) {
      //已预测，预测成功
      return <ActionDone color={accent_color}/>;
    } else {
      //已预测，预测失败
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