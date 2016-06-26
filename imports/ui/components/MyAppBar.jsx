import React, { Component,PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import { Link, browserHistory } from 'react-router';

export default class MyAppBar extends Component {
  goLogin(e) {
    const path = "/login";
    browserHistory.push(path);
  }
  goLogout(e) {
    Meteor.logout();
    browserHistory.push('/');
  }

  render() {
    return (
      <AppBar
        style={this.props.style}
        title={<span>测乎</span>}
        onLeftIconButtonTouchTap={this.props.onLeftIconButtonTouchTap.bind(this)}
        iconElementRight={this.props.currentUser ? <FlatButton value="logout" label="登出" onClick={this.goLogout} /> : <FlatButton label="登录"  onClick={this.goLogin} />}
    />);
  }
}

MyAppBar.PropTypes = {
  currentUser: PropTypes.string.isRequired,
};
