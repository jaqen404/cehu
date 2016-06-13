import React, { Component } from 'react';
import { Link } from 'react-router';

class NavBar extends Component {
  render() {
    return (
      <div>
        <Link to='/'>Home</Link>
        <Link to='/admin'>Admin</Link>
      </div>
    );
  }
}

export default NavBar;