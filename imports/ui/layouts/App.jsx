import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';

import NavBar from '../components/NavBar.jsx';
import MyAppBar from '../components/MyAppBar.jsx';
import MyAppDrawer from '../components/MyAppDrawer.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Meteor } from 'meteor/meteor';
import {muiTheme} from '../styles/colors'
 
// App component - represents the whole app
export default class App extends Component {

  toggleDrawer() {
    this.refs.drawer.handleToggle();
  }
  render() {
    let styles = {
      container: {
        display: 'flex',
        width: '100%',
        height: '100%'
      },
      main: {
        width: '100%',
        height: '100%',
      },
    };
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      <div>
        <MyAppBar onLeftIconButtonTouchTap={this.toggleDrawer.bind(this)} currentUser={this.props.currentUser}/>  
        <MyAppDrawer ref='drawer' currentUser={this.props.currentUser} />
        <div style={styles.container} >
          <NavBar />
          <div style={styles.main} >
            { this.props.children }
          </div>
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

App.PropTypes = {
  currentUser: PropTypes.string.isRequired,
};