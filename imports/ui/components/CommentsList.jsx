import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Paper from 'material-ui/Paper';
import Comment from '../components/Comment.jsx';
 
// App component - represents the whole app
export default class CommentsList extends Component {
  renderComments() {
    const cardStyle = {
      // width: '60%',
      // margin: '0 auto'
    }
    return this.props.comments.map((comment) => {
    return <Comment key={comment._id} comment={comment} style={cardStyle}/>
    });
  }
  render() {
    const styles = {
      card: {
        width: '80%',
        margin: '0 auto',
      },
    };
    return (
        <Paper zDepth={1} style={styles.card}>
          {this.renderComments()}
        </Paper>
    );
  }
}

CommentsList.PropTypes = {
  currentUser: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  usersEvents: PropTypes.array,
};