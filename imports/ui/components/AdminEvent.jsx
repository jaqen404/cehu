import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/events.js';
import { Link,browserHistory } from 'react-router';

import FlatButton from 'material-ui/FlatButton';

export default class AdminEvent extends Component {
  editThisEvent() {
    const path = `/edit/${this.props.event._id}`;
    browserHistory.push(path);
  }

  render() {
    const styles = {
      item: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
      }
    }
    return (
      <li style={styles.item}>
        <span>{this.props.event.title}</span>
        <FlatButton label="修改" primary={true} onClick={this.editThisEvent.bind(this)} />
      </li>
    );
  }
}
 
AdminEvent.propTypes = {
  // We can use propTypes to indicate it is required
  event: PropTypes.object.isRequired,
};