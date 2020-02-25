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
			name:'',
			description:'',
			logo:''
	  	}
	
	}

	componentDidMount(){

		// console.log("eventid", this.props);
		this.setState({
			name:this.props.location.state.name,
			description:this.props.location.state.description,
			logo:this.props.location.state.logo
		})

	} 


	onclickBack = () => {

		window.history.back();
	
	};



	body(){

		return(

			<div className="borderradis">

			<div className="divAvatarDetail">
				<img className="avatarDetail" src={'https://eventapp.dexagroup.com/apiget_file?fd='+this.state.logo} />
			</div>

			<div className="divListAvatarDetail">

				<ul className="ulAvatarDetailList">
					<li className="ulliAvatarDetailList"><b>Name :</b> <br/>{this.state.name}</li>
					<li className="ulliAvatarDetailList"><b>Description :</b> <br/> <br/> {this.state.description} <br/><br/></li>
				</ul>

				<div className="break"></div>

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
						<Icon className="eventJudulAgendaIcon" onClick={() => this.onclickBack()}>arrow_back</Icon> <h1 className="eventJudulAgenda">Sponsor Detail</h1>
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