import React from 'react';
import Paper from 'material-ui/Paper';
import Radium, { StyleRoot } from 'radium';

// a common layout wrapper for auth pages
const styles = {
	container: {
		'@media (min-width: 626px)': {
        marginTop: 15,
    },
	},
	paper: {
		padding: 15,
	}
}
const AuthPage = ({ content, link }) => (
	<StyleRoot>
  <div style={styles.container}>
    <Paper zDepth={1} style={styles.paper}>
    <div className="content-scrollable">
      {content}
      {link}
    </div>
    </Paper>
  </div>
  </StyleRoot>
);

AuthPage.propTypes = {
  content: React.PropTypes.element,
  link: React.PropTypes.element,
};

export default AuthPage;
