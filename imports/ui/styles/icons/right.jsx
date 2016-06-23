import React, {Component} from 'react';
import SvgIcon from 'material-ui/SvgIcon';

export default class RightIcon extends Component {
	render() {
		const mycolor = this.props.mycolor;
		const mystyles = this.props.mystyles;
		const RightIcon = (props) => (
		  <SvgIcon {...props}>
		    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
		  </SvgIcon>
		);
		return (
		    <RightIcon style={mystyles} color={mycolor} />
		);
	};
}