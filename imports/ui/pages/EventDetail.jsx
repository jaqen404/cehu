import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import UsersEvents from '../../api/usersevents.js';

export default class EventDetail extends Component {
  renderAnswers() {
    const answerStyle = {
        marginBottom: 16,
    };
    const answers = this.props.event.answers;
    const defaultAnswer = answers ? answers[0] : "";
    if (answers) {
      let radioButtons =  answers.map((answer,index) => (
        <RadioButton
                value={answer}
                label={answer}
                key={index}
                checkedIcon={<ActionFavorite />}
                uncheckedIcon={<ActionFavoriteBorder />}
                style={answerStyle}
        />
      ));
      return answers ? <form onSubmit={this.handleSubmit.bind(this)}>
                <RadioButtonGroup name="shipSpeed" defaultSelected={defaultAnswer}>{radioButtons}</RadioButtonGroup>
                <FlatButton label="确定" type="submit"/>
              </form> : '';
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    const answer = e.target.elements[0].value.trim();
    const eventId = this.props.event._id;
    Meteor.call('usersevents.insert', eventId, answer);
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
        marginTop: 15,
      },
    };
  	const { event, eventExists } = this.props;
  	console.log(eventExists);
  	// if (!eventExists) {
  	// 	return <h1>not found</h1>
  	// }
    return (
      <Card style={styles.card}>
        <CardTitle title={event.title} subtitle="" />
        <CardText>
          {event.text}
        </CardText>
        <CardActions>
          {this.renderAnswers()}  
        </CardActions>
      </Card>
    );
  }
}

EventDetail.propTypes = {
  event: PropTypes.object,
  eventExists: PropTypes.bool.isRequired,
};