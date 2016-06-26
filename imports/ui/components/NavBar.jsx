import React, { Component } from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

import FlatButton from 'material-ui/FlatButton';
import AssignmentTurnedIn from '../styles/icons/assignment-turned-in';
import HomeIcon from '../styles/icons/home'
import SupervisorAccount from '../styles/icons/supervisor-account'
import {divider_color,secondary_text,primary_color,primary_text} from '../styles/colors'

export default class NavBar extends Component {
  handleClick(e) {
    e.preventDefault();
    const isButton = e.target.parentElement; 
    let path = isButton.value ? isButton.value : 
              isButton.parentElement.value ? isButton.parentElement.value :
              isButton.parentElement.parentElement.value ? isButton.parentElement.parentElement.value :
              '/';
    this.setState({
      selectedValue: path,
    });
    this.context.router.push(path);
  }

  getSelectedValue() {
    return this.context.router.isActive('/', true) ? '/' :
      this.context.router.isActive('/done') ? '/done' :
      this.context.router.isActive('/admin') ? '/admin' :
      this.context.router.isActive('/login') ? '/login' : '';
  }

  getIconColor(value) {
    return value == this.getSelectedValue() ? primary_color : secondary_text;
  }
  getLabelStyle(value) {
    return value == this.getSelectedValue() ? {color: primary_color} : {color: primary_text};
  }
  componentDidMount() {
    this.setState({
      selectedValue: this.getSelectedValue(),
    })
  }

  componentWillReceiveProps() {
    this.setState({
      selectedValue: this.getSelectedValue(),
    })
  }
  render() {
    let styles = {
      button: {
        textAlign: 'left',
        width: '170px',
        height: '46px',
      },
      icon: {
        height: '19px',
        marginLeft: '12px',
        marginRight: '7px',
        verticalAlign: 'middle',
      },
    };
    return (
      <div style={this.props.style}>
        <FlatButton label='事件大厅' value='/' labelStyle={this.getLabelStyle('/')} icon={<HomeIcon mystyles={styles.icon} mycolor={this.getIconColor('/')} />}  onClick={this.handleClick.bind(this)} style={styles.button}/>
        <FlatButton label='我的预测' value='/done' labelStyle={this.getLabelStyle('/done')} icon={<AssignmentTurnedIn mystyles={styles.icon} mycolor={this.getIconColor('/done')} />} onClick={this.handleClick.bind(this)} style={styles.button}/>
        { this.props.isAdmin ?
          <FlatButton label='管理' value='/admin' labelStyle={this.getLabelStyle('/admin')} icon={<SupervisorAccount mystyles={styles.icon} mycolor={this.getIconColor('/admin')} />} onClick={this.handleClick.bind(this)} style={styles.button}/>
          : ''
        }
      </div>
    );
  }
}

NavBar.contextTypes = {
  router: React.PropTypes.object.isRequired
};