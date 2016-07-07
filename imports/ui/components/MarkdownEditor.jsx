import React, { Component, PropTypes } from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from 'material-ui/Snackbar';
import marked from 'marked';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import CommunicationImportContacts from 'material-ui/svg-icons/communication/import-contacts';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import {findName} from '../../api/utils';
import {primary_color} from '../styles/colors';
 
// Envent component - represents a single todo item
export default class MarkdownEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: marked(this.props.defaultText || ''),
      iconStates: {mode: 0},
      towColor: ['Gray', primary_color],
      iconsColor: {write: primary_color, preview: 'Gray', writePreview: 'Gray'},
      snackbarOpen: false,
    };
  }
  // componentDidMount() {
  //   // cache dom node
  //   this.editorControl = React.findDOMNode(this.refs.editor);
  //   this.previewControl = React.findDOMNode(this.refs.preview);
  // }
  editorChange(e) {
    if (this.isWriting) clearTimeout(this.isWriting)
    this.isWriting = setTimeout(() => {
      const unmarkResult = this.refs.editor.input.refs.input.value;
      const mark = marked(unmarkResult);
      this.setState({ result:  mark, unmarkResult: unmarkResult}); // change state
    }, 300)
  }
  renderIconColor() {

  }
  render() {
    const props = this.props;
    const state = this.state;
    let styles = {
      main: {
        display: 'flex',
        flexDirection: 'row',
      },
      editor: {
        display: state.iconStates.mode == 0 || state.iconStates.mode == 2 ? 'block' : 'none',
        flex: '1',
        padding: '0px 5px',
      },
      preview: {
        display: state.iconStates.mode == 1 || state.iconStates.mode == 2 ? 'block' : 'none',
        background: '#f5f9fc',
        padding: '0px 5px',
        flex: '1',
        minHeight: 100,
      },
      toolbar: {
        background: 'LightGray',
      },
      icon: {
        width: 24,
        height: 24,
      },
      button: {
        width: 48,
        height: 48,
        padding: 10,
      }
    }
    return (
      <div style={props.style}> 
        <Toolbar style={props.toolBarStyle ? props.toolBarStyle : styles.toolbar}>
          <ToolbarGroup>
            <FlatButton label="回复" primary={true} onClick={this.reply.bind(this)}/>
            <ToolbarSeparator />
            <IconButton name={'write'} tooltip="SVG Icon" onClick={this.handleClick.bind(this)} /*iconStyle={styles.icon} style={styles.button}*/>
              <EditorModeEdit color={state.iconsColor.write} />
            </IconButton>
            <IconButton name={'writePreview'}   tooltip="SVG Icon" onClick={this.handleClick.bind(this)}>
              <CommunicationImportContacts color={state.iconsColor.writePreview}/>
            </IconButton>
            <IconButton name={'preview'} tooltip="SVG Icon" onClick={this.handleClick.bind(this)}>
              <ActionVisibility color={state.iconsColor.preview}/>
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <Paper style={styles.main} rounded={false}>
          <TextField name={'editor'} style={styles.editor} ref={'editor'}
            underlineShow={false} rows={props.rows || 3}  defaultValue={props.defaultValue || ''} 
            fullWidth={true} multiLine={true} onChange={this.editorChange.bind(this)}/>
          <div style={styles.preview} ref={'preview'} dangerouslySetInnerHTML={{ __html: this.state.result }}>
          </div>
        </Paper>
        <Snackbar
          open={this.state.snackbarOpen}
          message="请添加评论！"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose.bind(this)}
        />
      </div>
    );
  }
  handleClick(e) {
    const name = findName(e.target, 'name');
    let state = this.state;
    switch (name) {
      case "write":
        state.iconStates.mode = 0;
        state.iconsColor.write = primary_color;
        state.iconsColor.preview = 'Gray';
        state.iconsColor.writePreview = 'Gray';
        break;
      case "preview":
        state.iconStates.mode = 1;
        state.iconsColor.preview= primary_color;
        state.iconsColor.write = 'Gray';
        state.iconsColor.writePreview = 'Gray';
        break;
      case "writePreview":
        state.iconStates.mode = 2;
        state.iconsColor.writePreview = primary_color;
        state.iconsColor.preview = 'Gray';
        state.iconsColor.write = 'Gray';
        break;
    }
    this.setState(state);
  }
  reply() {
    const input = this.refs.editor.input.refs.input;
    const markInput = this.refs.preview;
    const unmark = input.value.trim();
    if (unmark == '') {
      this.handleTouchTap();
    } else {
      input.value = '';
      markInput.textContent = '';
      Meteor.call('comments.insert', this.props.event, unmark); 
    }
    // const path = "/admin";
    // browserHistory.push(path);
  }
  handleTouchTap() {
    this.setState({
      snackbarOpen: true,
    });
  };

  handleRequestClose() {
    this.setState({
      snackbarOpen: false,
    });
  };
}
 
MarkdownEditor.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  event: PropTypes.object,
  userEvent: PropTypes.object,
};