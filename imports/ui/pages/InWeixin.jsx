import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Paper from 'material-ui/Paper';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {muiTheme} from '../styles/colors';
import Radium, { StyleRoot } from 'radium';
 
// App component - represents the whole app
export default class InWeixin extends Component {
  render() {
    const styles = {
      container: {
        height: '100%',
        marginLeft: 0,
        paddingRight: 0,
      },
      paper: {
        padding: '50px 10px',
        margin: 20
      }
    };
    return (
      <StyleRoot>
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      <div style={styles.container} >
        <Paper zDepth={1} style={styles.paper}>
          请点击右上角，在浏览器中打开！
        </Paper>
      </div>
      </MuiThemeProvider>
      </StyleRoot>
    );
  }
}