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
import iattendPollingChooseActions from "../../redux/iattendPollingChoose/actions";
import { isAbsolute } from 'path';
import axios from 'axios';
import Snackbar from './styleSnackbar';
import Slide from '@material-ui/core/Slide';

const { IATTENDPOLLINGCHOOSE_LIST_REQUEST } = iattendPollingChooseActions;

function TransitionUp(props) {
	return <Slide direction="up" {...props} />;
  }

class GitSearch extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data:[],
			loading: false,
			polling_title:'',
			dataPollingQuestion:'',
			valueradio:'',
			audienceId:'',
			eventId:'',
			agendaId:'',
			pollingNumber:'',
			transition: '',
			open:false,
			result:''
	  	}
	
	}

	componentDidMount(){

		// console.log("polling detail", this.props);
		let data = localStorage.getItem("data");
		if(data !== "undefined"){
			  	const { audienceid } = JSON.parse(data) 


				this.setState({
					polling_title:this.props.location.state.pollingQuestion,
					audienceId:audienceid,
					eventId:this.props.location.state.eventId,
					agendaId:this.props.location.state.agendaId,
					pollingNumber:this.props.location.state.pollingNumber
				})

			  	this.props.IATTENDPOLLINGCHOOSE_LIST_REQUEST(
				{
				  	"eventId":this.props.location.state.eventId,
				  	"agendaId":this.props.location.state.agendaId,
				  	"audienceId": audienceid,
					"pollingNumber":this.props.location.state.pollingNumber
				}
		  );
		  
		}


	} 


	componentWillReceiveProps(nextProps){

		// console.log("sss",nextProps.data.result.datanya);

		if(nextProps.data.result.datanya !== undefined){
	
			// console.log("sss",nextProps);
			// console.log("ini", nextProps.data.result.datanya.byListChoose);
			this.setState({
				dataPollingQuestion:nextProps.data.result.datanya.byListChoose,
				loading:nextProps.data.loading
			})
		}
	  
	  }

	onclickBack = () => {

		window.history.back();
	
	};

	onChangeRadio = (v) => {

		// console.log("onchangeradio", v.id)

		this.setState({
			valueradio:v.id
		})

	
	};

	handleSubmit = () => {


			if(this.state.valueradio !== ''){

						var postData = {
							agenda_id : this.state.agendaId,
							event_id : this.state.eventId,
							audience_id : this.state.audienceId,
							anserwer_value : this.state.valueradio,
							polling_id: this.state.pollingNumber
						};
			
						const request = axios.post("https://eventapp.dexagroup.com/apimobileIattend_polling_register", postData, {
							headers: { 'Authorization': 123456 }
						})
						request
							.then(response => {
							// -Save the JWT token
							// console.log("balikannya",response.data.insert);
					
									if(response.data.insert){
										this.handleClick(TransitionUp,"Polling telah berhasil disubmit");
									}else{
										this.handleClick(TransitionUp,"Polling tidak berhasil disubmit");
									}
				
							})
								.catch((err) => {
									//  dispatch(authError('bad login info'))
									console.log("AXIOS ERROR: ", err);
					});

			}else{

					this.handleClickError(TransitionUp,"Please choose your answer");

			}


	};

	handleClose = () => {

		window.history.back();
	
	};

	handleClick = (transition,text) => {

		this.setState({ 
			open: true, 
			result: text,
			transition });
		setTimeout(() => this.handleSnackbarClose(), 800);
	};

	handleRequestClose = () => {
		this.setState({ open: false });
		window.history.back();
	};

	handleSnackbarClose = () => {
		this.setState({
			result:'',
			transition:''
		});

		this.handleRequestClose();
	}

	handleClickError = (transition,text) => {

		this.setState({ 
			open: true, 
			result: text,
			transition });
		setTimeout(() => this.handleSnackbarCloseError(), 800);
	};

	handleRequestCloseError = () => {
		this.setState({ open: false });
	};

	handleSnackbarCloseError = () => {
		this.setState({
			result:'',
			transition:''
		});

		this.handleRequestCloseError();
	}

	body(){

		return(

			<div className="borderradis">

			<div className="divpollingTitle">
				<h1 className="pollingTitle">{this.state.polling_title}</h1>
			</div>

			<div className="divListAvatarDetail">

				<Lists>

				{
					(this.state.dataPollingQuestion !== '') ?
					
						this.state.dataPollingQuestion.map((item, index, key)=>(
						// console.log("Looping datanya : "+ index),

						<ListItem 
						key={index}
						className="eventlist_ul"
						>
						<ListItemText className="borderList">
						<Typography className="my_approval_leaverequest"><input className="radioClass" type="radio" onChange={() => this.onChangeRadio(item)} name="jawabanpolling" value={this.state.valueradio}></input>
						<span className="titleOption">{item.answer_text}</span>
						</Typography>

						</ListItemText>
						</ListItem>


						))

					: null
				}

				</Lists>

				<div>

				<Grid item xs={6} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
				<Button size="sm" variant="contained" className="create_leave_request_button_cancel" onClick={() => this.handleClose()}>
				Close
				</Button>
				</Grid>
				<Grid item xs={6} className="other_applications_my_ticket_dialog_closeticket_grid">
				<Button size="sm" variant="contained" color="primary" className="create_leave_request_button_submit" onClick={() => this.handleSubmit()}>
				{
				(this.state.loading) ? "LOADING" : "SUBMIT" 
				}
				</Button>
				</Grid>

				</div>

				<div className="break"></div>

			</div>
			<div className="break"></div>
			</div>
			

		)

	}



	render() {

		return (

			<div>

			<div className="eventBackgroundHeaderIattend">
						<Icon className="eventJudulAgendaIcon" onClick={() => this.onclickBack()}>arrow_back</Icon> <h1 className="eventJudulAgenda">Polling Detail</h1>
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

			<Snackbar
              open={this.state.open}
              onClose={this.handleRequestClose}
              transition={this.state.transition}
              className="snackbarTextAlign"
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<div id="message-id"><div className="snackbarTextAlign" >{this.state.result}</div></div>}
            />

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
	  data:state.IattendPollingChooseRequest
	}),
	{IATTENDPOLLINGCHOOSE_LIST_REQUEST}
  ),withStyles())(GitSearch); 