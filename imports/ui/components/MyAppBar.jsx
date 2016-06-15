import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import { Link, browserHistory } from 'react-router';

function goLogout() {
  Meteor.logout();
  browserHistory.push('/');
}

function goLogin() {
  const path = "/login";
  browserHistory.push(path);
}

const styles = {
  title: {
    cursor: 'pointer',
  },
};

const MyAppBar = () => (
  <AppBar
    title={<span style={styles.title}>测乎</span>}
    iconElementRight={Meteor.userId() ? <FlatButton label="登出" onClick={goLogout} /> : <FlatButton label="登录"  onClick={goLogin} />}
  />
);

export default MyAppBar;