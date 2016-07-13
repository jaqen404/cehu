import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

import {Events} from '../../api/events.js';
import TextField from 'material-ui/TextField';
import {Card} from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Chip from 'material-ui/Chip';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import EventDetail from './EventDetail'
import {dateFormat} from '../../api/utils';
import {findName} from '../../api/utils';

export default class NewEvent extends Component {
  constructor(props) {
    super(props);
    const minDate = new Date();
    const publishDate = new Date();
    publishDate.setDate(publishDate.getDate() + 1);
    publishDate.setHours(0,0);
    const closingDate = new Date();
    closingDate.setDate(closingDate.getDate() + 1);
    closingDate.setHours(0,0);
    this.state = {
      minDate: minDate,
      autoOk: false,
      disableYearSelection: false,
      event: {rightIndex: '-1', answers: [], publishDate: publishDate, closingDate: closingDate},
      isUpdate: false,
      dialogOpen: false,
      tags: new Set(),
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
      oldRightIndex = `${this.props.event.rightIndex}`;
    } 
    this.state.event.tags = Array.from(this.state.tags);
    Meteor.call('events.insert', this.state.event, oldRightIndex); 
    const path = "/admin";
    browserHistory.push(path);
  }
  renderMenuItems() {
    return this.state.event.answers.map((answer,index) => (
      <MenuItem key={index} value={index} primaryText={answer} />
    ));
    
  }
  handleTextChange(e) {
    if (this.isWriting) clearTimeout(this.isWriting);
    this.state.target = e.target;
    this.isWriting = setTimeout(this.timeoutChange.bind(this), 300);
  }
  timeoutChange() {
      const name = this.state.target.name;
      const value = this.state.target.value;
      const state = this.state;
      const event = this.state.event;
      if (name == 'answers') {
        event[name] = value.trim().split(',').filter((item)=>(!!item));
      } else {
        event[name] = value.trim();
      }
      this.setState({event: event}); // change state
  }
  handleDateChange(e, date) {
    let event = this.state.event;
    switch (this.state.focus) {
      case 'closingDate' :
        event.closingDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
        break;
      case 'closingTime' :
        event.closingDate.setHours(date.getHours(), date.getMinutes());
        break;
      case 'publishDate' :
        event.publishDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
        break;
      case 'publishTime' :
        event.publishDate.setHours(date.getHours(), date.getMinutes());
        break;
    }
    this.setState({event: event});
  }
  handleFocus(e) {
    this.state.focus = e.target.name;
  }
  //答案变化
  handleChange(e, index, rightIndex) {
    let event = this.state.event;
    event.rightIndex = rightIndex;
    event.rightAnswer = event.answers[rightIndex];
    this.setState({event: event});
  } 
  handleOpen() {
    this.setState({dialogOpen: true});
  };

  handleClose() {
    this.setState({dialogOpen: false});
  };
  deleteThisEvent() {
    Meteor.call('events.remove',this.props.event._id);
    this.handleClose();
    this.context.router.push('/admin');
  }
  handleChipTouchTap(e) {
    let tags = this.state.tags;
    tags.add(e.target.textContent);
    this.setState({tags});
  }
  handleChipDelete(e) {
    let tags = this.state.tags;
    tags.delete(findName(e.target,"textContent"));
    this.setState({tags});
  }
  handleSysChipDelete() {

  }
  newTag(e) {
    e.preventDefault();
    const name = this.refs.newTag.input.value;
    Meteor.call('tags.insert', name); 
    this.refs.newTag.input.value = '';
  }
  renderSysTags() {
    const styles = {
      chip: {
        margin: 4,
      },
    }
    return this.props.tags && this.props.tags.map((tag,index) => 
      <Chip
        onRequestDelete={this.handleSysChipDelete.bind(this)}
        onTouchTap={this.handleChipTouchTap.bind(this)}
        style={styles.chip}
        key={index}
      >
        {tag.name}
      </Chip>
    );
  }
  renderSelectedTags() {
    const tags = Array.from(this.state.tags);
    return tags.map((tag,index) => 
      <Chip
        onRequestDelete={this.handleChipDelete.bind(this)}
        style={{margin: 4}}
        key={index}
      >
        {tag}
      </Chip>
    );
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
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      tagToolbar: {
        display: 'flex',
        flexDirection: 'raw',
      }
    };
    const actions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="删除"
        primary={true}
        onTouchTap={this.deleteThisEvent.bind(this)}
      />,
    ];
    const event = this.state.event;
    return (
      <div>
      <Card style={styles.card}>
      <form onSubmit={this.handleSubmit.bind(this)} /*onChange={this.formChange.bind(this)}*/>
        <TextField
          hintText="event title"
          floatingLabelText="标题"
          multiLine={true}
          rows={2}
          onChange={this.handleTextChange.bind(this)}
          defaultValue={event.title}
          name="title"
        /><br />
        <TextField
          hintText="event dddtext"
          floatingLabelText="简介"
          multiLine={true}
          rows={2}
          onChange={this.handleTextChange.bind(this)}
          defaultValue={event.text}
          name="text"
        /><br />
        <TextField
          hintText="event answers"
          floatingLabelText="选项（注意用英文逗号分隔）"
          multiLine={true}
          rows={2}
          defaultValue={event.answers ? event.answers.join() : ''}
          onChange={this.handleTextChange.bind(this)}
          name="answers"
        /><br />
        <TextField
          hintText="图片url"
          floatingLabelText="图片url（注意不要加引号）"
          multiLine={true}
          rows={2}
          defaultValue={event.pic}
          onChange={this.handleTextChange.bind(this)}
          name="pic"
        /><br />
        <DatePicker
          floatingLabelText="截止日期"
          autoOk={this.state.autoOk}
          minDate={this.state.minDate}
          disableYearSelection={this.state.disableYearSelection}
          name="closingDate"
          onChange={this.handleDateChange.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          defaultDate={event.publishDate}
        />
        <TimePicker
          format="24hr"
          hintText="24hr Format"
          floatingLabelText="截止时间"
          name="closingTime"
          onChange={this.handleDateChange.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          value={event.closingDate}
        />
        <DatePicker
          floatingLabelText="揭晓日期"
          autoOk={this.state.autoOk}
          minDate={this.state.minDate}
          disableYearSelection={this.state.disableYearSelection}
          name="publishDate"
          onChange={this.handleDateChange.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          defaultDate={event.publishDate}
        />
        <TimePicker
          format="24hr"
          hintText="24hr Format"
          floatingLabelText="揭晓时间"
          name="publishTime"
          onChange={this.handleDateChange.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          value={event.publishDate}
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
        </SelectField>
        <div style={styles.tagToolbar}>
          <h4>可选标签</h4>
          <FlatButton label="新建标签" primary={true} onClick={this.newTag.bind(this)}/>
          <TextField
            hintText="填写标签名字，再点击左侧新建标签"
            floatingLabelText="填写完成，点击左侧新建按钮"
            rows={1}
            ref="newTag"
          />
        </div>  
        <div style={styles.wrapper}>
          {this.renderSysTags()}
        </div>
        <h4>已选标签</h4>
        <div style={styles.wrapper}>
          {this.renderSelectedTags()}
        </div>
        <br /><br /><br />
        {this.state.isUpdate ? 
          <div><RaisedButton type="submit" label="保存" primary={true} style={styles.button} /><RaisedButton label="删除" secondary={true} onTouchTap={this.handleOpen.bind(this)}/></div> :
          <RaisedButton type="submit" label="新建" primary={true} style={styles.button} />
        }
      </form>
      </Card>
      <EventDetail eventExists={true} event={this.state.event} isPreview={true}/>
      <br /> <br /> <br /> <br /><br /> <br /> <br /> <br />
        <Dialog
            actions={actions}
            modal={false}
            open={this.state.dialogOpen}
            onRequestClose={this.handleClose}
          >
            Discard draft?
        </Dialog>
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