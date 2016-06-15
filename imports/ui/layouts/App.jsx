import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import NavBar from '../components/NavBar.jsx';
 import MyAppBar from '../components/MyAppBar.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Meteor } from 'meteor/meteor';
 
// App component - represents the whole app
export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div>
        <MyAppBar />  
        <NavBar />
        { this.props.children }
      </div>
      </MuiThemeProvider>
    );
  }
}