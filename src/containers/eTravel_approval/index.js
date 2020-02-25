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


import etravelapprovalActions from "../../redux/eTravelApproval/actions";
import compose from 'recompose/compose';
import Loader from 'react-loader-spinner';
import Typography from '../../../src/components/uielements/typography';
import Button from '@material-ui/core/Button';
import Toolbar from '../../components/uielements/toolbar';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';
import { Base64 } from 'js-base64';
import moment from 'moment';
import { 
	Button as ButtonReact,
	Form, FormGroup, Label, Input, FormText,
	 Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; 

import Slide from '@material-ui/core/Slide';
import { FullScreenDialogs } from './dialogs.style';
import AppBar from '../../components/uielements/appbar';	 
import IconButton from '../../components/uielements/iconbutton'; 
import Icon from "../../components/uielements/icon/index.js";


const { ETRAVELAPPROVAL_LIST_REQUEST, ETRAVELAPPROVAL_LIST_BUTTONAPPROVAL_REQUEST } = etravelapprovalActions;

function TransitionUp(props) {
  return <Slide direction="up" {...props} />;
}

function Transition(props) {
	return <Slide direction="up" {...props} />;
  }


class GitSearch extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data:[],
			loading: false,
			searchText:'',
			authorIdLogin:'',
			setOpenReject:false,
			titleNotif:'Need Approve',
			bodyNotif:'Anya telah mengajukan untuk leave request pada tanggal 13-08-2019. Apakah anda mau mengunjunginya sekarang?',
			workflowId:'',
			remarks:'tidak ada',
			open: false,
			transition: '',
			openDetail: false,
			detailItem:[],
			SOURCE_ID:'',
			btnPil:false
	  	}
	
	}

	componentDidMount(){

		// console.log("tesss");

		let data = localStorage.getItem("data")
		if(data !== "undefined"){
		  const { bitrix, userLogin } = JSON.parse(data) 

			// Insert log //
			this.inserLog(userLogin.username);

		  this.setState({
			authorIdLogin : bitrix.result.data.ID
		  });

		  // console.log("getitem", bitrix);
		  this.props.ETRAVELAPPROVAL_LIST_REQUEST(
			{
			  "offset":"1",
			  "userId":bitrix.result.data.ID
			  // "emp_no":"IU016060058",
			  // "last_update": "2016-01-01 00:00:00",
			  // "contact_Id": "8174"
			}
		  );
		}

	} 



	componentWillReceiveProps(nextProps){

	// console.log("list", nextProps.data.result);
	// console.log("list", nextProps.data);

	// if(nextProps.data.result.length !== undefined){


	// //   console.log("ini", nextProps.data.result.result);
	// 	this.setState({
	// 	data: nextProps.data.result,
	// 	databackup: nextProps.data.result,
	// 	loading:nextProps.data.loading
	// 	})

	// }

	if(nextProps.data.button){

		// console.log("prossnya", nextProps);

		let data = localStorage.getItem("data")
		if(data !== "undefined"){
		  const { bitrix } = JSON.parse(data) 

		//   this.setState({
		// 	authorIdLogin : bitrix.result.data.ID,
		// 	loading:nextProps.data.loading
		//   });

		  // console.log("getitem", bitrix);
		  this.props.ETRAVELAPPROVAL_LIST_REQUEST(
			{
			  "offset":"1",
			  "userId":bitrix.result.data.ID
			  // "emp_no":"IU016060058",
			  // "last_update": "2016-01-01 00:00:00",
			  // "contact_Id": "8174"
			}
		  );
		}

	}else{
		this.setState({
			data: nextProps.data.result,
			databackup: nextProps.data.result,
			loading:nextProps.data.loading
		})
	}

	}

	handleChangeSearch(value){

	this.setState({ searchText: value });

	if(this.state.searchText.length > 0){
		const newData = this.state.databackup.filter(function(item){
		const itemData = item.DATA.AUTHOR.NAME.toUpperCase()
		const textData = value.toUpperCase()
		// console.log("searchEvaluation dua",item, value, itemData, textData);
		return itemData.indexOf(textData) > -1
		})
		this.setState({
			data: newData,
		})
	}else if(this.state.searchText.length == 0){

		this.setState({
			data:this.state.databackup
		})

	}



	}


	handleClickDetail = (datanya,SOURCE_ID,btn) => {
		this.setState({ openDetail: true, detailItem: datanya, SOURCE_ID: SOURCE_ID, btnPil:btn });
	  };


	handleApprove (value){

		// alert("approve" + value);

		// this.setState({
		// 	workflowId: value
		// });

		let data = localStorage.getItem("data")
		if(data !== "undefined"){
		  const { bitrix } = JSON.parse(data) 
		  // console.log("getitem handleApprove", bitrix);
		  this.props.ETRAVELAPPROVAL_LIST_BUTTONAPPROVAL_REQUEST(
			{
			  "workflowId":value,
				"userId":bitrix.result.data.ID,
				"remarks":'tidak ada',
			  // "userId":'1817',
			  "buttonId":'1',
			  "offset":"1"
			  // "emp_no":"IU016060058",
			  // "last_update": "2016-01-01 00:00:00",
			  // "contact_Id": "8174"
			}
		  );

		  this.setState({ openDetail: false });

		}

	}


	handleReject (value) {

		// alert("reject" + value);

		this.setState({
			workflowId: value
		});

		this.handleClick();
		
		
		// let data = localStorage.getItem("data")
		// if(data !== "undefined"){
		//   const { bitrix } = JSON.parse(data) 
		//   // console.log("getitem handleApprove", bitrix);
		//   this.props.ETRAVELAPPROVAL_LIST_BUTTONAPPROVAL_REQUEST(
		// 	{
		// 	  "workflowId":value,
		// 	  "remarks":"tidak ada",
		// 	  "userId":bitrix.result.data.ID,
		// 	  // "userId":'1817',
		// 	  "buttonId":'2',
		// 	  "offset":"1"
		// 	  // "emp_no":"IU016060058",
		// 	  // "last_update": "2016-01-01 00:00:00",
		// 	  // "contact_Id": "8174"
		// 	}
		//   );
		// }
		

	}

	handleRejectSubmit (){


		if(this.state.remarks !== ''){

			this.setState({
				setOpenReject:false,
				transition:''
			});

		}else{

			alert("Please fille the reason");


		}




		let data = localStorage.getItem("data")
		if(data !== "undefined"){
		  const { bitrix } = JSON.parse(data) 
		  // console.log("getitem handleApprove", bitrix);
		  this.props.ETRAVELAPPROVAL_LIST_BUTTONAPPROVAL_REQUEST(
			{
			  "workflowId":this.state.workflowId,
			  "remarks":this.state.remarks,
			  "userId":bitrix.result.data.ID,
			  // "userId":'1817',
			  "buttonId":'2',
			  "offset":"1"
			  // "emp_no":"IU016060058",
			  // "last_update": "2016-01-01 00:00:00",
			  // "contact_Id": "8174"
			}
		  );

		  this.setState({ openDetail: false });

		}

	}


	handleClick = () => {

    this.setState({ 
		openDetail:false,
		setOpenReject: true
	});
	  };
	  
	handleClickCloseDetail= () => {

		this.setState({ 
		openDetail:false
		});
	};


  handleClickClose = () => {
    this.setState({
		openDetail:true,	
      	setOpenReject:false,
      	transition:''
    });
  }


	handleLoadMore = value => {

		// alert("loadmore");

		this.props.ETRAVELAPPROVAL_LIST_REQUEST(
			  {
				"offset":"10",
				// "emp_no":"IU016060058",
				// "last_update": "2016-01-01 00:00:00",
				// "contact_Id": "8174"
			  }
			);

	}

	loadMoreButton(){

		return(
			<Button size="small" variant="contained" color="primary" className="my_approval_leaverequest_loadmore" onClick={this.handleLoadMore}> Loadmore </Button>
		)

	}

  onChangeRemarks = (event) => {
    const {value} = event.target;

	// console.log("value reason" + value);
    this.setState({ 
      remarks: value
		});
		
  }

  listdetail(param){

	return (
		<Typography className="my_approval_leaverequest">Name : </Typography>
	)

  }


	body(){

		return(

			this.state.data.map((item, index, key)=>(
				// console.log("Looping datanya : "+ index),

				item.DATA.AUTHOR.ID !== this.state.authorIdLogin ?  


				<ListItem 
				key={index}
				className="eventlist_ul">
					<ListItemText className="borderList">
					<Typography>Dear <b>{item.DATA.TO.replace("To >", "")}</b></Typography>
					<Typography className="my_approval_leaverequest"><b>{item.DATA.AUTHOR.NAME}</b> has made a request <b>{item.DATA.CONTENT.TEXT.ID_CASE}</b> for e-Travel request on {item.DATE}. Please do action here :</Typography>
					{/* <Typography className="other_applications_my_ticket_description">Valid to o</Typography> */}
				
					<div style={{ marginBottom: 10, backgroundColor:'#ececec', padding:15, marginTop:20, height:"150px" }}>
					<Grid item xs={4} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
					<Typography className="my_approval_leaverequest">Name </Typography>
					</Grid>
					<Grid item xs={8} className="other_applications_my_ticket_dialog_closeticket_grid">
					<Typography className="my_approval_leaverequest">: {item.DATA.CONTENT.TEXT.IDENTITY_NAME} </Typography>
					</Grid>

					<Grid item xs={4} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
					<Typography className="my_approval_leaverequest">Company </Typography>
					</Grid>
					<Grid item xs={8} className="other_applications_my_ticket_dialog_closeticket_grid">
					<Typography className="my_approval_leaverequest">: {item.DATA.CONTENT.TEXT.COMPANY}</Typography>
					</Grid>

					<Grid item xs={4} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
					<Typography className="my_approval_leaverequest">Title </Typography>
					</Grid>
					<Grid item xs={8} className="other_applications_my_ticket_dialog_closeticket_grid">
					<Typography className="my_approval_leaverequest">: {item.DATA.CONTENT.TEXT.JOB_TITLE}</Typography>
					</Grid>
					
					<Grid item xs={4} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
					<Typography className="my_approval_leaverequest">Departement </Typography>
					</Grid>
					<Grid item xs={8} className="other_applications_my_ticket_dialog_closeticket_grid">
					<Typography className="my_approval_leaverequest">: {item.DATA.CONTENT.TEXT.DEPARTMENT}</Typography>
					</Grid>
					
					<Grid item xs={4} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
					<Typography className="my_approval_leaverequest">Purpose </Typography>
					</Grid>
					<Grid item xs={8} className="other_applications_my_ticket_dialog_closeticket_grid">
					<Typography className="my_approval_leaverequest">: {item.DATA.CONTENT.TEXT.TRAVELLING_PURPOSE}</Typography>
					</Grid>

					</div>

					{item.DATA.CONTENT.TEXT_DUA.DETAIL_COUNT !== 0 ? 
					
						<Button size="small"  color="default" className="detailButton" style={{width:'100%', marginTop:'0px'}} onClick={() => {this.handleClickDetail(item.DATA.CONTENT.TEXT_DUA.DETAIL, item.DATA.SOURCE_ID, true)}}> Detail </Button>					
					 	: null 
					}

					
				</ListItemText>
				{/* <Typography className="eventlist_div_body_description">Max Taken = 12</Typography> */}

				</ListItem>

				:

				<ListItem
				key={index}
				className="eventlist_ul">
					<ListItemText className="borderList">
					<Typography>Dear <b>{item.DATA.TO.replace("To >", "")}</b></Typography>
					<Typography className="my_approval_leaverequest"><b>{item.DATA.AUTHOR.NAME}</b> has made a request <b>{item.DATA.CONTENT.TEXT.ID_CASE}</b> for e-Travel request on {item.DATE}. Please do action here :</Typography>
					{/* <Typography className="other_applications_my_ticket_description">Valid to o</Typography> */}
				
					<div style={{ marginBottom: 20, backgroundColor:'#ececec', padding:15, marginTop:20, height:"150px" }}>

					<Grid item xs={4} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
					<Typography className="my_approval_leaverequest">Name </Typography>
					</Grid>
					<Grid item xs={8} className="other_applications_my_ticket_dialog_closeticket_grid">
					<Typography className="my_approval_leaverequest">: {item.DATA.CONTENT.TEXT.IDENTITY_NAME} </Typography>
					</Grid>

					<Grid item xs={4} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
					<Typography className="my_approval_leaverequest">Company </Typography>
					</Grid>
					<Grid item xs={8} className="other_applications_my_ticket_dialog_closeticket_grid">
					<Typography className="my_approval_leaverequest">: {item.DATA.CONTENT.TEXT.COMPANY}</Typography>
					</Grid>

					<Grid item xs={4} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
					<Typography className="my_approval_leaverequest">Title </Typography>
					</Grid>
					<Grid item xs={8} className="other_applications_my_ticket_dialog_closeticket_grid">
					<Typography className="my_approval_leaverequest">: {item.DATA.CONTENT.TEXT.JOB_TITLE}</Typography>
					</Grid>
					
					<Grid item xs={4} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
					<Typography className="my_approval_leaverequest">Departement </Typography>
					</Grid>
					<Grid item xs={8} className="other_applications_my_ticket_dialog_closeticket_grid">
					<Typography className="my_approval_leaverequest">: {item.DATA.CONTENT.TEXT.DEPARTMENT}</Typography>
					</Grid>
					
					<Grid item xs={4} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
					<Typography className="my_approval_leaverequest">Purpose </Typography>
					</Grid>
					<Grid item xs={8} className="other_applications_my_ticket_dialog_closeticket_grid">
					<Typography className="my_approval_leaverequest">: {item.DATA.CONTENT.TEXT.TRAVELLING_PURPOSE}</Typography>
					</Grid>
					
					</div>

					{item.DATA.CONTENT.TEXT_DUA.DETAIL_COUNT !== 0 ? 
					
					<Button size="small"  color="default" className="detailButton" style={{width:'100%', marginTop:'0px'}} onClick={() => {this.handleClickDetail(item.DATA.CONTENT.TEXT_DUA.DETAIL, item.DATA.SOURCE_ID, false)}}> Detail </Button>					
					 : null 
					}
					
					
				</ListItemText>
				{/* <Typography className="eventlist_div_body_description">Max Taken = 12</Typography> */}

				</ListItem>


			))
			

		)

	}

	handleCloseDetail = () => {
		this.setState({ openDetail: false });
	};


	inserLog(paramEmail){


    let request_date = moment().format("YYYY-MM-DD");
    let request_time = moment().format("h:mm:ss a");
    let email = paramEmail;
    let activity = 'dashboard/leave-request-approval';

    let token = Base64.encode(request_date)+':'+Base64.encode(request_time)+':'+Base64.encode(email)+':'+Base64.encode(activity);
    let tokenKedua = Base64.encode(token);

    let payload3 = {
      userToken: tokenKedua

    };

    let urlIattend = "https://portalmobile.dexagroup.com/api/statistik/mobile/v1/insertLogActivity";

    const request = axios.post(urlIattend, payload3, {
    // headers: { 'Authorization': 123456 }
    })
    request
    .then(response => {
        // -Save the JWT token
        // console.log("balikan statistik",response);

    })
    .catch((err) => {
      //  dispatch(authError('bad login info'))
      console.log("AXIOS ERROR: ", err);

    });

}

onclickBack = () => {
    window.history.back();
  };


	render() {
		const { searchText } = this.state;
		const { classes, data } = this.props;

		return (

			!this.state.loading ?

			<div>

			<div className="backtolist_div">
			<Icon className="eventJudulAgendaIcon" onClick={() => this.onclickBack()}>arrow_back</Icon> <h1 className="backtolist">Back</h1>
			<div className="break"></div>
			</div>

			<LayoutWrapper>
				<Row>
					<FullColumn>
						<Papersheet style={{ marginBottom: 20 }}>
							<FormControl>
								<InputLabel htmlFor="githubSearch" className={"searchTextLabel"}>
									Search Name Request
								</InputLabel>
								<InputFullWidth
									id="githubSearch"
									onChange={this.handleChangeSearch.bind(this)}
									defaultValue={searchText}
								/>
							</FormControl>
						</Papersheet>
						<Root>

						{this.body()}
						{/* {this.loadMoreButton()} */}

							<Modal isOpen={this.state.setOpenReject} className={this.props.className} centered={true}>
								<ModalHeader className="headerDialogNotification" onClick={() => this.handleClickClose()}>Remarks </ModalHeader>
								<ModalBody>
								<div className="listDialogNotification">

									<div className="divbodyDialogNotification">

									<FormGroup>
										<Input onChange={this.onChangeRemarks} type="textarea" name="text" id="exampleText" className="textareaBtnRejectApproval"  />
									</FormGroup>

										{/* <h1 className="judulDialogNotification">{this.state.titleNotif}</h1>
										<p className="bodyDialogNotification">{this.state.bodyNotif}</p> */}
									</div>

								</div>

								</ModalBody>
								<ModalFooter>
									<ButtonReact color="success" onClick={() => this.handleRejectSubmit()}>Submit</ButtonReact>
									<ButtonReact color="secondary" onClick={() => this.handleClickClose()}>Cancel</ButtonReact>
								</ModalFooter>
							</Modal>


							<FullScreenDialogs
							fullScreen
							open={this.state.openDetail}
							onClose={this.handleCloseDetail}
							transition={Transition}
							>

							<AppBar className={classes.appBar}>
							<Toolbar
							className="other_applications_my_ticket_dialog_header"
							>

							<Typography type="title" color="inherit" className="icon_detail_information">
								Detail Information
							</Typography>
							<Button color="contrast" className="dashboard_dialog_save" onClick={this.handleClickCloseDetail}>
								Close
							</Button>
							</Toolbar>
							</AppBar>

							<br/>
							<div>
								<div className="other_applications_my_ticket_dialog_div" >
								<ul style={{listStyleType:'none', padding:0, margin:0}}>
										{
								this.state.detailItem.map((value, index) => {
								return <li key={index}>
								
								<div style={{ marginBottom: 10, paddingBottom:10, paddingTop:10, borderBottom: "2px dotted #ececec", height: "150px" }}>
								

										<Grid item xs={4} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
										<Typography className="my_approval_leaverequest">TYPE </Typography>
										</Grid>
										<Grid item xs={8} className="other_applications_my_ticket_dialog_closeticket_grid">
										<Typography className="my_approval_leaverequest">: {value['TYPE']}</Typography>
										</Grid>
								{
									value['TYPE'] == 'HOTEL' ? 
									<div>

										<Grid item xs={4} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
										<Typography className="my_approval_leaverequest">Hotel Name </Typography>
										</Grid>
										<Grid item xs={8} className="other_applications_my_ticket_dialog_closeticket_grid">
										<Typography className="my_approval_leaverequest">: {value['CF_1']}</Typography>
										</Grid>

										<Grid item xs={4} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
										<Typography className="my_approval_leaverequest">Room Type </Typography>
										</Grid>
										<Grid item xs={8} className="other_applications_my_ticket_dialog_closeticket_grid">
										<Typography className="my_approval_leaverequest">: {value['CF_2']}</Typography>
										</Grid>
										
										<Grid item xs={4} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
										<Typography className="my_approval_leaverequest">Payment </Typography>
										</Grid>
										<Grid item xs={8} className="other_applications_my_ticket_dialog_closeticket_grid">
										<Typography className="my_approval_leaverequest">: {value['CF_3']}</Typography>
										</Grid>

										<Grid item xs={4} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
										<Typography className="my_approval_leaverequest">City </Typography>
										</Grid>
										<Grid item xs={8} className="other_applications_my_ticket_dialog_closeticket_grid">
										<Typography className="my_approval_leaverequest">: {value['CF_4']}</Typography>
										</Grid>

										<Grid item xs={4} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
										<Typography className="my_approval_leaverequest">Check In </Typography>
										</Grid>
										<Grid item xs={8} className="other_applications_my_ticket_dialog_closeticket_grid">
										<Typography className="my_approval_leaverequest">: {value['CF_5']}</Typography>
										</Grid>
										
										<Grid item xs={4} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
										<Typography className="my_approval_leaverequest">Check Out </Typography>
										</Grid>
										<Grid item xs={8} className="other_applications_my_ticket_dialog_closeticket_grid">
										<Typography className="my_approval_leaverequest">: {value['CF_6']}</Typography>
										</Grid>
										
										<Grid item xs={4} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
										<Typography className="my_approval_leaverequest">Hotel Rate </Typography>
										</Grid>
										<Grid item xs={8} className="other_applications_my_ticket_dialog_closeticket_grid">
										<Typography className="my_approval_leaverequest">: {value['CF_7']}</Typography>
										</Grid>
										
										
									</div>
									: 

									<div>

										<Grid item xs={4} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
										<Typography className="my_approval_leaverequest">From </Typography>
										</Grid>
										<Grid item xs={8} className="other_applications_my_ticket_dialog_closeticket_grid">
										<Typography className="my_approval_leaverequest">: {value['CF_1']}</Typography>
										</Grid>

										<Grid item xs={4} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
										<Typography className="my_approval_leaverequest">To </Typography>
										</Grid>
										<Grid item xs={8} className="other_applications_my_ticket_dialog_closeticket_grid">
										<Typography className="my_approval_leaverequest">: {value['CF_2']}</Typography>
										</Grid>

										<Grid item xs={4} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
										<Typography className="my_approval_leaverequest">Date </Typography>
										</Grid>
										<Grid item xs={8} className="other_applications_my_ticket_dialog_closeticket_grid">
										<Typography className="my_approval_leaverequest">: {value['CF_3']}</Typography>
										</Grid>
										
										<Grid item xs={4} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
										<Typography className="my_approval_leaverequest">Airlanes </Typography>
										</Grid>
										<Grid item xs={8} className="other_applications_my_ticket_dialog_closeticket_grid">
										<Typography className="my_approval_leaverequest">: {value['CF_4']}</Typography>
										</Grid>
										
										<Grid item xs={4} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
										<Typography className="my_approval_leaverequest">Class </Typography>
										</Grid>
										<Grid item xs={8} className="other_applications_my_ticket_dialog_closeticket_grid">
										<Typography className="my_approval_leaverequest">: {value['CF_5']}</Typography>
										</Grid>
										
										<Grid item xs={4} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
										<Typography className="my_approval_leaverequest">Flight Number </Typography>
										</Grid>
										<Grid item xs={8} className="other_applications_my_ticket_dialog_closeticket_grid">
										<Typography className="my_approval_leaverequest">: {value['CF_6']}</Typography>
										</Grid>
										
										<Grid item xs={4} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
										<Typography className="my_approval_leaverequest">Rate </Typography>
										</Grid>
										<Grid item xs={8} className="other_applications_my_ticket_dialog_closeticket_grid">
										<Typography className="my_approval_leaverequest">: {value['CF_7']}</Typography>
										</Grid>
										
									</div>
								}
								</div>
								</li>
								})
								}
								</ul>

								{
									this.state.btnPil === true ?

									<div>
									<Grid item xs={6} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
									<Button size="small" variant="contained" color="default" className="my_approval_leaverequest_approve" onClick={() => {this.handleApprove(this.state.SOURCE_ID)}}> Approve </Button>
									</Grid>
									<Grid item xs={6} className="other_applications_my_ticket_dialog_closeticket_grid">
									<Button size="small" variant="contained" color="default" className="my_approval_leaverequest_reject" onClick={() => {this.handleReject(this.state.SOURCE_ID)}}> Reject </Button>
									</Grid>
									</div>

								: null 

								}
						
								</div>
							</div>

							</FullScreenDialogs>


						</Root>
					</FullColumn>
				</Row>
			</LayoutWrapper>

			</div>

			: 

			<div className="my_Loading_div">
			<div>
			<Loader type="Circles" color="#somecolor" height={30} width={30} /> </div>
			<div><h1 style={{fontSize:'1em', marginLeft:'0.5em'}}>Loading ...</h1></div>
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
	  data:state.EtravelapprovalRequest
	}),
	{ETRAVELAPPROVAL_LIST_REQUEST, ETRAVELAPPROVAL_LIST_BUTTONAPPROVAL_REQUEST}
  ),withStyles())(GitSearch); 