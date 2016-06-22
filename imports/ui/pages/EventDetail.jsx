import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import UsersEvents from '../../api/usersevents.js';
import {secondary_text,divider_color,white} from '../styles/colors'

export default class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultSelected: '0',
    };
  }
  renderAnswers() {
    const answerStyle = {
        marginBottom: 16,
    };
    const answers = this.props.event.answers;
    if (answers) {
      let radioButtons =  answers.map((answer,index) => (
        <RadioButton
                value={`${index}`}
                label={answer}
                key={index}
                checkedIcon={<ActionFavorite />}
                uncheckedIcon={<ActionFavoriteBorder />}
                style={answerStyle}
                disabled={this.props.userEvent ? index != this.props.userEvent.answerIndex : false}
        />
      ));
      return answers ? <form onSubmit={this.handleSubmit.bind(this)}>
                <RadioButtonGroup name="radios" ref ="radios" defaultSelected={this.props.userEvent ? this.props.userEvent.answerIndex : '0'}>{radioButtons}</RadioButtonGroup>
                {!!this.props.isPreview || !!this.props.userEvent ? '' : <FlatButton label="确定" type="submit"/>}
              </form> : '';
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    const answerIndex = this.refs.radios.state.selected;
    const eventId = this.props.event._id;
    const answer = this.props.event.answers[answerIndex];
    Meteor.call('usersevents.insert', eventId, answerIndex, answer);
    const path = "/admin";
    browserHistory.push(path);
  }
  render() {
    const styles = {
      block: {
        maxWidth: 250,
      },
      radioButton: {
        marginBottom: 16,
      },
      card: {
        marginRight: 50,
        marginBottom: 50,
      },
      container: {
        background: 'SlateGray',
      },
      bigBanner: {
        background: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/68939/ae.jpg) center 1%',
        backgroundSize: 'cover',
        marginBottom: 30,
        width: '100%',
        height: 250,
      },
      large: {
        padding: '5em 3em 5em',
      },
      blockquote: {
        background: white,
        padding: '4em 2em 4em',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    };
  	const { event, eventExists } = this.props;
  	// if (!eventExists) {
  	// 	return <h1>not found</h1>
  	// }
    return (
      <Paper zDepth={1} style={styles.container}>
        <Paper zDepth={2} style={styles.blockquote} rounded={false}>
          <span>{event.title}</span>
        </Paper>
        <Paper zDepth={3} style={styles.bigBanner}>
          <div style={styles.large}>
          </div>
        </Paper>
        <Card style={styles.card}>
          <CardTitle title={event.title} subtitle="" />
          <CardText>
            {event.text}
          </CardText>
          <CardActions>
            {this.renderAnswers()}  
          </CardActions>
        </Card>
      </Paper>
    );
  }
}

EventDetail.propTypes = {
  event: PropTypes.object,
  eventExists: PropTypes.bool.isRequired,
};