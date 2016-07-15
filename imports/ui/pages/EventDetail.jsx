import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

import {Card, CardHeader, CardMedia, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import UsersEvents from '../../api/usersevents.js';
import {secondary_text,divider_color,white,accent_color,primary_color} from '../styles/colors';
import {dateFormat} from '../../api/utils';
import MarkdownEditor from '../components/MarkdownEditor';
import CommentsList from '../components/CommentsList';
import Radium, { StyleRoot } from 'radium';

export default class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultSelected: '0',
      eventState: '揭晓结果：未揭晓',
      myState: '我的预测：未预测',
      result: '我的预测：未预测   |   我的预测：未预测',
    };
  }
  componentWillMount() {
    this.getResult();
  }  
  getResult() {
    let state = this.state;
    const props = this.props;
    let isRight = '';
    if (props.event.rightIndex >= 0) {
      state.eventState = '揭晓结果：' + props.event.rightAnswer;
    } else if (!!props.event.publishDate || !!props.event.publishTime) {
      const date = props.event.publishDate ? dateFormat(props.event.publishDate, 'yyyy-MM-dd hh:mm') : '';
      const time = props.event.publishTime ? dateFormat(props.event.publishTime, 'hh:mm') : '';
      state.eventState = '揭晓结果：未揭晓，揭晓时间' + date + ' | ' + time;
    }
    if (props.userEvent) {
      state.myState = '我的预测：' + props.userEvent.answer;
    }
    if (props.event.rightIndex >= 0 && !!props.userEvent) {
      if (props.userEvent.isRight) {
        isRight = '   |   预测成功';
      } else {
        isRight = '   |   预测失败'
      }
    } 
    state.result = state.myState + ' | ' + state.eventState + isRight;
    return state.result;
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
      const now = new Date();
      const isClosed = this.props.event.closingDate <= now;
      //预览模式、已预测、已揭晓、已截止，都不能预测，不显示确定button
      const showButton = !this.props.isPreview || !this.props.userEvent || !this.props.event.rightIndex >= 0 || !isClosed;
      return <form onSubmit={this.handleSubmit.bind(this)}>
                <h4>您的预测:</h4>
                <RadioButtonGroup name="radios" ref ="radios" defaultSelected={this.props.userEvent ? this.props.userEvent.answerIndex : '0'}>{radioButtons}</RadioButtonGroup>
                { showButton ? <FlatButton label="确定" type="submit"/> : ''}
                {this.renderRsultRadioButton()}
              </form>;
    } else {
      return '';
    }
  }
  renderRsultRadioButton() {
    return (
      this.props.event.rightIndex >= 0 ? 
        <div>
          <br />
          <h4>事件结果:</h4>
          <RadioButtonGroup name="RightRadios" defaultSelected={`${this.props.event.rightIndex}`}>
            <RadioButton
                value={`${this.props.event.rightIndex}`}
                label={this.props.event.rightAnswer}
                key={0}
                checkedIcon={<ActionFavorite color={accent_color}/>}
                uncheckedIcon={<ActionFavoriteBorder color={accent_color}/>}
        />
          </RadioButtonGroup>
        </div> 
      : ''
    );
  }
  handleSubmit(e) {
    e.preventDefault()
    let path = "/login";
    if (this.props.currentUser) {
      path = "/admin";
      const answerIndex = this.refs.radios.state.selected;
      const eventId = this.props.event._id;
      const answer = this.props.event.answers[answerIndex];
      Meteor.call('usersevents.insert', eventId, answerIndex, answer);
    }
    browserHistory.push(path);
  }
  render() {
    const styles = {
      radioButton: {
        marginBottom: 16,
      },
      answers: {
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '100%',
        paddingBottom: 20,
        '@media (min-width: 626px)': {
          width: '60%',
        },
      },
      container: {
        background: '#656998',//'SlateGray',
      },
      bigBanner: {
        background: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/68939/ae.jpg) center 1%',
        backgroundSize: 'cover',
        width: '100%',
        height: 250,
      },
      large: {
        padding: '5em 3em 5em',
      },
      blockquote: {
        background: white,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        '@media (min-width: 626px)': {
          width: '80%',
        },
      },
      centerText: {
        textAlign: 'center',
      },
      editor: {
        bottom: 0,
        width: '100%',
        margin: '20px auto 100px',
        '@media (min-width: 1045px)': {
          width: '60%',
        },
      },
      comments: {
        bottom: 0,
        width: '100%',
        margin: '15px auto',
        '@media (min-width: 626px)': {
          width: '80%',
        },
      },
      toolBarStyle: {
        background: white,
      },
    };
  	const { event, eventExists } = this.props;
  	// if (!eventExists) {
  	// 	return <h1>not found</h1>
  	// }
    return (
      <StyleRoot>
      <Paper zDepth={0} style={styles.container}>
        <div style={styles.blockquote}>
        <Card>
          <CardTitle  title={event.title} subtitle={this.getResult()}/>
        </Card>
        </div>
        <Card zDepth={2}>
          <CardMedia>
            <img src={event.pic} />
          </CardMedia>
        </Card>
        <div style={styles.blockquote}>
        <Card>
          <CardText color={secondary_text}>{event.text}</CardText>
        </Card>
        </div>
        <div style={styles.answers}>
        <Card rounded={false}>
          <CardActions>
            {this.renderAnswers()}  
          </CardActions>
        </Card>
        </div>
        <div style={styles.comments}>
          <CommentsList comments={this.props.comments}/>
        </div>
        <div style={styles.editor}>
        {this.props.isPreview ? '' : <MarkdownEditor toolBarStyle={styles.toolBarStyle} event={event} currentUser={this.props.currentUser}/>}
        </div>
      </Paper>
      </StyleRoot>
    );
  }
}

EventDetail.propTypes = {
  event: PropTypes.object,
  eventExists: PropTypes.bool.isRequired,
};