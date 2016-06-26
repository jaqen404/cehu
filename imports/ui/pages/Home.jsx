import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import EventsList from '../components/EventsList'
import Paper from 'material-ui/Paper';
import Event from '../components/Event.jsx';
import {pure_white} from '../styles/colors'
 
// App component - represents the whole app
export default class Home extends Component {
  render() {
    const styles = {
      card: {
        marginRight: 50,
      },
      container: {
        width: '100%',
        height: '100%',
      },
      bigBanner: {
        background: 'linear-gradient(rgba(76,87,101,0.5), rgba(76,57,101,0.5)),url(https://upload.wikimedia.org/wikipedia/commons/1/14/Panorama_puy_de_dome_sud.jpg) center 80%',
        backgroundSize: 'cover',
        height: 220,
        marginTop: 15,
        marginBottom: 30,
        marginRight: 10,
      },
      large: {
        padding: '5em 3em 5em',
      },
      bannerText: {
        color: pure_white,
        textAlign: 'center',
        display: 'block',
        textShadow: '0 0 4px rgba(0, 0, 0, 0.2)',
        fontSize: 40,
      }
    };
    return (
      <div >
        <Paper zDepth={1} style={styles.bigBanner}>
          <div style={styles.large}>
            <span style={styles.bannerText}>
              欢迎来到测乎
            </span>
          </div>
        </Paper>
        <EventsList currentUser={this.props.currentUser} events={this.props.events} usersEvents={this.props.usersEvents} />
      </div>
    );
  }
}

Home.PropTypes = {
  currentUser: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
  usersEvents: PropTypes.array,
};