import React, {Component} from 'react';
import SvgIcon from 'material-ui/SvgIcon';

export default class HomeIcon extends Component {
	render() {
		const mycolor = this.props.mycolor;
		const mystyles = this.props.mystyles;
		const HomeIcon = (props) => (
		  <SvgIcon {...props}>
		    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
		  </SvgIcon>
		);
		return (
		    <HomeIcon style={mystyles} color={mycolor} />
		);
	};
}