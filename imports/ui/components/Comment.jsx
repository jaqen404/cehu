import React, { Component, PropTypes } from 'react';

import { browserHistory } from 'react-router';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {accent_color,primary_color,dark_primary_color} from '../styles/colors';
 
// Envent component - represents a single todo item
export default class Comment extends Component {
  render() {
    const styles = {
    }
    return (
      <Card style={this.props.style}>
        <CardHeader
          title={this.props.comment.userName}
          subtitle="Subtitle"
          avatar="http://lorempixel.com/100/100/nature/"
        />
        <CardText>
          {this.props.comment.text}
        </CardText>
        <CardActions>
        </CardActions>
      </Card>
    );
  }
}
Comment.PropTypes = {
  currentUser: PropTypes.string.isRequired,
  comment: PropTypes.array.isRequired,
};