import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Paper from 'material-ui/Paper';
import Comment from '../components/Comment.jsx';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import {secondary_text,divider_color,white,accent_color,primary_color} from '../styles/colors';
 
// App component - represents the whole app
export default class CommentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0,
      pageNum: 20,
    };
  }
  renderComments() {
    const cardStyle = {
      // width: '60%',
      // margin: '0 auto'
    }
    let comments = this.props.comments && this.props.comments.map((comment) => {
                      return <Comment key={comment._id} comment={comment} style={cardStyle}/>
                    });
    const state = this.state;
    state.pageMax = comments ? Math.ceil(comments.length / state.pageNum) - 1 : 0;
    return comments ? comments.slice(state.pageIndex * state.pageNum, state.pageIndex * state.pageNum + state.pageNum) : '';
  }
  next() {
    const state = this.state;
    this.setState({pageIndex: state.pageIndex >= state.pageMax ? state.pageMax : state.pageIndex + 1});
  }
  previous() {
    const state = this.state;
    this.setState({pageIndex: state.pageIndex <= 0 ? 0 : state.pageIndex - 1});
  }
  render() {
    const styles = {
      card: {
        margin: '0 auto',
      },
      toolbar: {
        background: white,
      },
      toolbarGroup: {
      },
    };
    return (
        <Paper zDepth={1} style={styles.card}>
          {this.renderComments()}
          {this.state.pageMax > 0 ?
          <Toolbar style={styles.toolbar}>
            <ToolbarGroup style={styles.toolbarGroup} float='right' lastChild={true}>
              <FlatButton label="上一页" primary={true} onClick={this.previous.bind(this)}/>
              <FlatButton label="下一页" primary={true} onClick={this.next.bind(this)}/>
            </ToolbarGroup>
          </Toolbar> : ''
          }
        </Paper>
    );
  }
}

CommentsList.PropTypes = {
  currentUser: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  usersEvents: PropTypes.array,
};