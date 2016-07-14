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
import {muiTheme} from '../styles/colors';
import Radium, { StyleRoot } from 'radium';
 
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
        height: '100%',
        marginTop: 60,
      },
      main: {
        width: '100%',
        height: '100%',
        '@media (min-width: 626px)': {
          marginLeft: 200,
        },
      },
      navBar: {
        display: 'flex',
        position: 'fixed',
        width: 200,
        flexDirection: 'column',
        padding: 15,
        '@media (max-width: 626px)': {
          display: 'none',
        },
      },
      appBar: {
        position: 'fixed',
        top: 0,
      }
    };
    return (
      <StyleRoot>
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      <div>
        <MyAppBar style={styles.appBar} onLeftIconButtonTouchTap={this.toggleDrawer.bind(this)} currentUser={this.props.currentUser}/>  
        <MyAppDrawer ref='drawer' currentUser={this.props.currentUser} isAdmin={this.props.isAdmin}/>
        <div style={styles.container} >
          <NavBar style={styles.navBar} currentUser={this.props.currentUser} isAdmin={this.props.isAdmin}/>
          <div style={styles.main} >
            { this.props.children }
          </div>
        </div>
      </div>
      </MuiThemeProvider>
      </StyleRoot>
    );
  }
}

App.PropTypes = {
  currentUser: PropTypes.string.isRequired,
};
//export default Radium(App);