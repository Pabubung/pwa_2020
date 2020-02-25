import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, FullColumn } from '../../../src/components/utility/rowColumn';
import Papersheet from '../../../src/components/utility/papersheet';
import LayoutWrapper from '../../../src/components/utility/layoutWrapper';
import GitResult from '../../../src/components/github/githubResult';
import { withStyles } from '@material-ui/core/styles';
import Lists, {
	ListItem,
	ListItemText,
	ListItemIcon,
	ListItemSecondaryAction
  } from "../../../src/components/uielements/lists";

import Avatar from "../../../src/components/uielements/avatars/";

import {
	Root,
	InputFullWidth,
	InputLabel,
	FormControl,
} from './githubSearch.style.js';

import compose from 'recompose/compose';
import Loader from 'react-loader-spinner';
import Typography from '../../../src/components/uielements/typography';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import Icon from "../../components/uielements/icon/index.js";
import { isAbsolute } from 'path';


class GitSearch extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data:[],
			loading: false,
			detailemail: '',
			detailempno: '',
			detailimage: '',
			detailname: '',
			detailorgName: '',
			detailprofession: ''
	  	}
	
	}

	componentDidMount(){

		// console.log("eventid", this.props.history.location.state);
		this.setState({
			detailemail: this.props.history.location.state.detailemail,
			detailempno: this.props.history.location.state.detailempno,
			detailimage: this.props.history.location.state.detailimage,
			detailname: this.props.history.location.state.detailname,
			detailorgName: this.props.history.location.state.detailorgName,
			detailprofession: this.props.history.location.state.detailprofession
		})

	} 


	onclickBack = () => {

		window.history.back();
	
	};



	body(){

		var QRCode = require('qrcode.react');

		return(

			<div className="borderradis">

			<div className="divListAvatarDetail">

				<div className="break"></div>

				<div className="divAvatarDetail">
				<QRCode 
					// size="200"
					value={this.state.detailempno} />
				</div>

			</div>
			<div className="break"></div>
			</div>
			

		)

	}



	render() {
		const { searchText } = this.state;

		return (

			<div>

			<div className="eventBackgroundHeaderIattend">
						<Icon className="eventJudulAgendaIcon" onClick={() => this.onclickBack()}>arrow_back</Icon> <h1 className="eventJudulAgenda">QR Code</h1>
						<div className="break"></div>
			</div>

			<LayoutWrapper>

			<Row style={{ marginTop: 23 }}>
				<FullColumn>
				<Papersheet>
					{this.body()}
				</Papersheet>
				</FullColumn>
			</Row>
			</LayoutWrapper>

			</div>

		);
	}
}

// function mapStateToProps(state) {
// 	return { GitSearch: state.GithubSearch };
// }
// export default connect(mapStateToProps, { gitSearch, onPageChange })(GitSearch);

export default compose(connect(
	state => ({
	  // result:state.IattendSpeakerRequest
	}),
	// {IATTENDSPEAKER_SPEAKER_REQUEST}
  ),withStyles())(GitSearch); 