import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

import {Events} from '../../api/events.js';
import TextField from 'material-ui/TextField';
import {Card} from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import EventDetail from './EventDetail'
import {dateFormat} from '../../api/utils';

export default class NewEvent extends Component {
  constructor(props) {
    super(props);

    const minDate = new Date();

    this.state = {
      minDate: minDate,
      autoOk: false,
      disableYearSelection: false,
      event: {rightIndex: '-1',answers: []},
      isUpdate: false,
    };
  }
  componentWillMount() {
    if (this.props.event) {
      let event = this.state.event; 
      for(let p in this.props.event) { 
        let name = p;//属性名称 
        let value = this.props.event[p];//属性对应的值 
        event[name] = value; 
      } 
      this.setState({event: event,isUpdate: this.context.router.isActive(`/edit/${this.props.event._id}`)});
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    let oldRightIndex = '-1';
    if (this.props.event) {
      oldRightIndex = this.props.event.rightIndex;
    } 
    Meteor.call('events.insert', this.state.event, oldRightIndex); 
    const path = "/admin";
    browserHistory.push(path);
  }
  renderMenuItems() {
    return this.state.event.answers.map((answer,index) => (
      <MenuItem key={index} value={index} primaryText={answer} />
    ));
    
  }
  formChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    const state = this.state;
    const event = this.state.event;
    if (name == 'answers') {
      event[name] = value.trim().split(',').filter((item)=>(!!item));
    } else {
      event[name] = value.trim();
    }
    this.setState({event: event});
  }
  handleDateChange(e, date) {
    let event = this.state.event;
    event.publishDate = date;
    this.setState({event: event});
  }
  handleTimeChange(e, time) {
    const event = this.state.event;
    event.publishTime = time;
    this.setState({event: event});
  }
  handleChange(e, index, rightIndex) {
    let event = this.state.event;
    event.rightIndex = rightIndex;
    event.rightAnswer = event.answers[rightIndex];
    this.setState({event: event});
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
      },
      selectField: {
        marginBottom: 50,
        marginTop: 50,
      }
    };
    const event = this.state.event;
    return (
      <div>
      <Card style={styles.card}>
      <form onSubmit={this.handleSubmit.bind(this)} onChange={this.formChange.bind(this)}>
        <TextField
          hintText="event title"
          floatingLabelText="标题"
          multiLine={true}
          rows={2}
          defaultValue={event.title}
          name="title"
        /><br />
        <TextField
          hintText="event dddtext"
          floatingLabelText="简介"
          multiLine={true}
          rows={2}
          defaultValue={event.text}
          name="text"
        /><br />
        <TextField
          hintText="event answers"
          floatingLabelText="选项（注意用英文逗号分隔）"
          multiLine={true}
          rows={2}
          defaultValue={event.answers ? event.answers.join() : ''}
          name="answers"
        />
        <DatePicker
          floatingLabelText="揭晓日期"
          autoOk={this.state.autoOk}
          minDate={this.state.minDate}
          disableYearSelection={this.state.disableYearSelection}
          name="publishDate"
          onChange={this.handleDateChange.bind(this)}
          defaultDate={event.publishDate ? event.publishDate : new Date()}
        />
        <TimePicker
          format="24hr"
          hintText="24hr Format"
          floatingLabelText="揭晓时间"
          name="publishTime"
          onChange={this.handleTimeChange.bind(this)}
          value={event.publishTime ? event.publishTime : new Date()}
        />
        <SelectField
          value={this.state.event.rightIndex}
          onChange={this.handleChange.bind(this)}
          autoWidth={false}
          style={styles.selectField}
          name="rightIndex"
          floatingLabelText="揭晓预测答案"
        >
          <MenuItem value="-1" primaryText="未揭晓" />
          {this.renderMenuItems()}
        </SelectField><br /><br /><br />
        {this.state.isUpdate ? 
          <RaisedButton type="submit" label="保存" primary={true} style={styles.button} /> :
          <RaisedButton type="submit" label="新建" primary={true} style={styles.button} />
        }
      </form>
      </Card>
      <EventDetail eventExists={true} event={this.state.event} isPreview={true}/>
      <br /> <br /> <br /> <br /><br /> <br /> <br /> <br /><br /> <br /> <br /> <br />
      </div>
    );
  }
}

NewEvent.propTypes = {
  event: PropTypes.object,
  eventExists: PropTypes.bool,
};

NewEvent.contextTypes = {
  router: React.PropTypes.object.isRequired,
};