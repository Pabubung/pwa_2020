import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Redirect, Link } from 'react-router-dom'

import { clearToken, getToken, getData } from '../../src/helpers/utility';

class logoutPage extends Component {


  componentDidMount(){
	clearToken();
	setTimeout(
		function() {
			window.location.reload();
		}
		.bind(this),
		3
	);

  }

  render() {
    const { props } = this;
    return (
		<div><p></p></div>
    );
  }
}
export default logoutPage;
