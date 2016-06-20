import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

import {Events} from '../../api/events.js';
import TextField from 'material-ui/TextField';
import {Card} from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import EventDetail from './EventDetail'

export default class NewEvent extends Component {
  constructor(props) {
    super(props);

    const minDate = new Date();

    this.state = {
      minDate: minDate,
      autoOk: false,
      disableYearSelection: false,
      event: {},
      isPreview: false,
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    const event = {title,text,answers,publishDate,publishTime} = this.getData(e);
    if (this.state.isPreview) {
      this.setState({event: event});
      this.setState({isPreview: false});
    } else {
      Meteor.call('events.insert', title, text, answers,publishDate,publishTime);
      const path = "/admin";
      browserHistory.push(path);
    }
  }
  preview() {
    this.setState({isPreview: true});
  }
  getData(e) {
    const title = e.target.elements[0].value.trim();
    const text = e.target.elements[2].value;
    const answers = e.target.elements[4].value.trim().split(',').filter((item)=>(!!item));
    const publishDate = e.target.elements[6].value;
    const publishTime = e.target.elements[7].value;
    return {title,text,answers,publishDate,publishTime};
  }
  render() {
    const styles = {
      card: {
        marginRight: 50,
        marginTop: 15,
        padding: 20,
      },
      button: {
        margin: 12,
      }
    };
    return (
      <div>
      <Card style={styles.card}>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <TextField
          hintText="event title"
          floatingLabelText="标题"
          multiLine={true}
          rows={2}
        /><br />
        <TextField
          hintText="event text"
          floatingLabelText="简介"
          multiLine={true}
          rows={2}
        /><br />
        <TextField
          hintText="event answers"
          floatingLabelText="选项（注意用英文逗号分隔）"
          multiLine={true}
          rows={2}
        />
        <DatePicker
          floatingLabelText="揭晓日期"
          autoOk={this.state.autoOk}
          minDate={this.state.minDate}
          disableYearSelection={this.state.disableYearSelection}
        />
        <TimePicker
          format="24hr"
          hintText="24hr Format"
          floatingLabelText="揭晓时间"
        /><br /><br /><br /><br />
        <RaisedButton type="submit" label="提交" primary={true} style={styles.button} />
        <RaisedButton type="submit" label="预览" secondary={true} style={styles.button} onTouchTap={this.preview.bind(this)}/>
      </form>
      </Card>
      <EventDetail eventExists={true} event={this.state.event} isPreview={true}/>
      </div>
    );
  }
}