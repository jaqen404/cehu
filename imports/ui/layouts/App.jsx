import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import NavBar from '../components/NavBar.jsx';
 
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

 
// App component - represents the whole app
export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div className="container">
        <NavBar />
        { this.props.children }
      </div>
      </MuiThemeProvider>
    );
  }
}