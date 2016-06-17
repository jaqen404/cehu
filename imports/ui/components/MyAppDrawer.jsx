import React, { Component } from 'react';

import Drawer from 'material-ui/Drawer';
import { List, ListItem, MakeSelectable } from 'material-ui/List';
const SelectableList = MakeSelectable(List);
import AppBar from 'material-ui/AppBar';

import { white, primary_color, accent_color } from '../styles/colors';
import typography from '../styles/typography';

export default class MyAppDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      listIndex: ''
    };
  }

  componentDidMount() {
    this.setState({
      listIndex: this.getSelectedIndex()
    })
  }

  componentWillReceiveProps() {
    this.setState({
      listIndex: this.getSelectedIndex()
    })
  }

  getSelectedIndex() {
    return this.context.router.isActive('/', true) ? '/' :
      this.context.router.isActive('/done') ? '/done' :
      this.context.router.isActive('/admin') ? '/admin' :
      this.context.router.isActive('/login') ? '/login' : '';
  }

  render() {
    let styles = {
      header: {
        fontFamily: typography.fontFamily,
        fontSize: typography.fontMiddleSize,
        color: white,
        lineHeight: '64px',
        fontWeight: typography.fontWeightNormal,
        backgroundColor: primary_color,
        paddingLeft: '24px',
        paddingTop: '0px',
        marginBottom: '8px',
      },
      selectedList: {
        color: primary_color,
        backgroundColor: 'rgba(0, 0, 0, 0.03)',
      }
    };
    const currentUser = this.props.currentUser;
    return (
      <Drawer open={this.state.open}
               docked={false}
               onRequestChange={this.handleRequestChange.bind(this)}>
        <AppBar title="测乎" onLeftIconButtonTouchTap={this.handleToggle.bind(this)}/>
        <SelectableList
          selectedItemStyle={styles.selectedList}
          value={this.state.listIndex}
          onChange={this.handleChange.bind(this)}
          >
          <ListItem value='/' primaryText='大厅' 
          onTouchTap={this.handleToggle.bind(this)}/>
          <ListItem
            value={ '/done' }
            primaryText={ '我的预测' } 
            onTouchTap={this.handleToggle.bind(this)}/>
          <ListItem
            value={ '/admin'  }
            primaryText={ '管理' } 
            onTouchTap={this.handleToggle.bind(this)}/>
        </SelectableList>
      </Drawer>
    );
  }

  handleChange(e, index) {
    this.setState({
      listIndex: index,
    });
    this.context.router.push(index);
  }

  handleRequestChange(open) {
    this.setState({open: open});
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }
}

MyAppDrawer.contextTypes = {
  router: React.PropTypes.object.isRequired
};
