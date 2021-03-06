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


import eesapprovalActions from "../../redux/essApproval/actions";
import compose from 'recompose/compose';
import Loader from 'react-loader-spinner';
import Typography from '../../../src/components/uielements/typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';
import { Base64 } from 'js-base64';
import moment from 'moment';
import { 
	Button as ButtonReact,
	Form, FormGroup, Label, Input, FormText,
	 Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; 

import Slide from '@material-ui/core/Slide';
import { Link } from 'react-router-dom';	 
import Setting from '../../settings';

const { apiUrl } = Setting;
const { EESAPPROVAL_LIST_REQUEST, EESAPPROVAL_LIST_BUTTONAPPROVAL_REQUEST } = eesapprovalActions;

function TransitionUp(props) {
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
			remarks:'tidak ada'
	  	}
	
	}

	componentDidMount(){

		let data = localStorage.getItem("data")
		if(data !== "undefined"){
		  const { bitrix, userLogin } = JSON.parse(data) 

			// Insert log //
			this.inserLog(userLogin.username);

		//   this.setState({
		// 	authorIdLogin : bitrix.result.data.ID
		//   });

		//   // console.log("getitem", bitrix);
		//   this.props.EESAPPROVAL_LIST_REQUEST(
		// 	{
		// 	  "offset":"1",
		// 	  "userId":bitrix.result.data.ID
		// 	  // "emp_no":"IU016060058",
		// 	  // "last_update": "2016-01-01 00:00:00",
		// 	  // "contact_Id": "8174"
		// 	}
		//   );

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

	// if(nextProps.data.button){

	// 	// console.log("prossnya", nextProps);

	// 	let data = localStorage.getItem("data")
	// 	if(data !== "undefined"){
	// 	  const { bitrix } = JSON.parse(data) 

	// 	//   this.setState({
	// 	// 	authorIdLogin : bitrix.result.data.ID,
	// 	// 	loading:nextProps.data.loading
	// 	//   });

	// 	  // console.log("getitem", bitrix);
	// 	  this.props.EESAPPROVAL_LIST_REQUEST(
	// 		{
	// 		  "offset":"1",
	// 		  "userId":bitrix.result.data.ID
	// 		  // "emp_no":"IU016060058",
	// 		  // "last_update": "2016-01-01 00:00:00",
	// 		  // "contact_Id": "8174"
	// 		}
	// 	  );
	// 	}

	// }else{
	// 	this.setState({
	// 		data: nextProps.data.result,
	// 		databackup: nextProps.data.result,
	// 		loading:nextProps.data.loading
	// 	})
	// }

	}

	// handleChangeSearch(value){

	// this.setState({ searchText: value });

	// if(this.state.searchText.length > 0){
	// 	const newData = this.state.databackup.filter(function(item){
	// 	const itemData = item.DATA.AUTHOR.NAME.toUpperCase()
	// 	const textData = value.toUpperCase()
	// 	// console.log("searchEvaluation dua",item, value, itemData, textData);
	// 	return itemData.indexOf(textData) > -1
	// 	})
	// 	this.setState({
	// 		data: newData,
	// 	})
	// }else if(this.state.searchText.length == 0){

	// 	this.setState({
	// 		data:this.state.databackup
	// 	})

	// }



	// }


	handleRedirect (value){

		// alert("approve" + value);

		let data = localStorage.getItem("data")
		if(data !== "undefined"){
			
		  const { bitrix } = JSON.parse(data);
		  switch(value) {

			case "approval_leave_request":
				alert("approval_leave_request");
			  	// code block
			  	break;
			case "approval_e_travel":
				alert("approval_e_travel");
			  	// code block
			  	break;
			case "approval_spkl":
				alert("approval_spkl");
				break;
			case "approval_it138":
				alert("approval_it138");

			  // code block
		  }

		  // console.log("getitem handleApprove", bitrix);
		//   this.props.EESAPPROVAL_LIST_BUTTONAPPROVAL_REQUEST(
		// 	{
		// 	  "workflowId":value,
		// 		"userId":bitrix.result.data.ID,
		// 		"remarks":'tidak ada',
		// 	  // "userId":'1817',
		// 	  "buttonId":'1',
		// 	  "offset":"1"
		// 	  // "emp_no":"IU016060058",
		// 	  // "last_update": "2016-01-01 00:00:00",
		// 	  // "contact_Id": "8174"
		// 	}
		//   );
		}

	}


	// handleApprove (value){

	// 	// alert("approve" + value);

	// 	// this.setState({
	// 	// 	workflowId: value
	// 	// });

	// 	let data = localStorage.getItem("data")
	// 	if(data !== "undefined"){
	// 	  const { bitrix } = JSON.parse(data) 
	// 	  // console.log("getitem handleApprove", bitrix);
	// 	  this.props.EESAPPROVAL_LIST_BUTTONAPPROVAL_REQUEST(
	// 		{
	// 		  "workflowId":value,
	// 			"userId":bitrix.result.data.ID,
	// 			"remarks":'tidak ada',
	// 		  // "userId":'1817',
	// 		  "buttonId":'1',
	// 		  "offset":"1"
	// 		  // "emp_no":"IU016060058",
	// 		  // "last_update": "2016-01-01 00:00:00",
	// 		  // "contact_Id": "8174"
	// 		}
	// 	  );
	// 	}

	// }


	// handleReject (value) {

	// 	// alert("reject" + value);

	// 	// this.setState({
	// 		// workflowId: value
	// 	// });

	// 	// this.handleClick(TransitionUp);
		
		
	// 			let data = localStorage.getItem("data")
	// 	if(data !== "undefined"){
	// 	  const { bitrix } = JSON.parse(data) 
	// 	  // console.log("getitem handleApprove", bitrix);
	// 	  this.props.EESAPPROVAL_LIST_BUTTONAPPROVAL_REQUEST(
	// 		{
	// 		  "workflowId":value,
	// 		  "remarks":"tidak ada",
	// 		  "userId":bitrix.result.data.ID,
	// 		  // "userId":'1817',
	// 		  "buttonId":'2',
	// 		  "offset":"1"
	// 		  // "emp_no":"IU016060058",
	// 		  // "last_update": "2016-01-01 00:00:00",
	// 		  // "contact_Id": "8174"
	// 		}
	// 	  );
	// 	}
		

	// }

	// handleRejectSubmit (){


	// 	// if(this.state.remarks !== ''){

	// 		// this.setState({
	// 			// setOpenReject:false,
	// 			// transition:''
	// 		// });

	// 	// }else{

	// 		// alert("Please fille the reason");


	// 	// }




	// 			// let data = localStorage.getItem("data")
	// 	// if(data !== "undefined"){
	// 	//   const { bitrix } = JSON.parse(data) 
	// 	//   // console.log("getitem handleApprove", bitrix);
	// 	//   this.props.EESAPPROVAL_LIST_BUTTONAPPROVAL_REQUEST(
	// 	// 	{
	// 	// 	  "workflowId":this.state.workflowId,
	// 	// 	  "remarks":this.state.remarks,
	// 	// 	  "userId":bitrix.result.data.ID,
	// 	// 	  // "userId":'1817',
	// 	// 	  "buttonId":'2',
	// 	// 	  "offset":"1"
	// 	// 	  // "emp_no":"IU016060058",
	// 	// 	  // "last_update": "2016-01-01 00:00:00",
	// 	// 	  // "contact_Id": "8174"
	// 	// 	}
	// 	//   );
	// 	// }

	// }


// 	handleClick = (transition) => {

//     this.setState({ setOpenReject: true, transition });
//   };

//   handleClickClose = () => {
//     this.setState({
//       setOpenReject:false,
//       transition:''
//     });
//   }


	// handleLoadMore = value => {

	// 	// alert("loadmore");

	// 	this.props.EESAPPROVAL_LIST_REQUEST(
	// 		  {
	// 			"offset":"10",
	// 			// "emp_no":"IU016060058",
	// 			// "last_update": "2016-01-01 00:00:00",
	// 			// "contact_Id": "8174"
	// 		  }
	// 		);

	// }

	// loadMoreButton(){

	// 	return(
	// 		<Button size="small" variant="contained" color="primary" className="my_approval_leaverequest_loadmore" onClick={this.handleLoadMore}> Loadmore </Button>
	// 	)

	// }

//   onChangeRemarks = (event) => {
//     const {value} = event.target;

// 		console.log("value reason" + value);
//     this.setState({ 
//       remarks: value
// 		});
		
//   }

	body(){

		return(


			<div>
				<Grid item xs={6} className="my_button_list_approval_grid">
				<Button size="small" variant="contained" color="default" className="my_button_list_approval" style={{backgroundColor:'#ffffff', border: "1px dotted #e9e9e9"}}> 
				<Link style={{ textDecoration: 'none'}} to={{
					pathname: 'leave-request-approval'
					// pathname: 'leave-request-approval',
					// state: {
					// detailname : this.state.detailname,
					// detailemail : this.state.detailemail,
					// detailorgName : this.state.detailorgName,
					// detailprofession : this.state.detailprofession,
					// detailempno  : this.state.detailempno,
					// detailimage : this.state.detailimage
					// }
				}}>
				<ul style={{listStyleType:'none', padding:'0px', margin:'0px'}}>
					<li>
						<img src={apiUrl+'/api/static/images/approval_leave_request.png'} alt="Approval Leave Request" width="40" height="40" style={{marginBottom:'10px'}} />
					</li>
					<li><span style={{color:'#666666'}}>Approval <br/>Leave Request</span> </li>
				</ul>
				</Link>				
				</Button>
				</Grid>

				<Grid item xs={6} className="my_button_list_approval_grid">
				<Button size="small" variant="contained" color="default" className="my_button_list_approval" style={{backgroundColor:'#ffffff', border: "1px dotted #e9e9e9"}} > 
				<Link style={{ textDecoration: 'none'}} to={{
					pathname: 'etravel_approval'
					// pathname: 'leave-request-approval',
					// state: {
					// detailname : this.state.detailname,
					// detailemail : this.state.detailemail,
					// detailorgName : this.state.detailorgName,
					// detailprofession : this.state.detailprofession,
					// detailempno  : this.state.detailempno,
					// detailimage : this.state.detailimage
					// }
				}}>
				<ul style={{listStyleType:'none', padding:'0px', margin:'0px'}}>
					<li><img src={apiUrl+'/api/static/images/approval_etravel.png'} alt="Approval e-Travel" width="40" height="40" style={{marginBottom:'10px'}} /></li>
					<li><span style={{color:'#666666'}}>Approval <br/>e-Travel</span></li>
				</ul>
				</Link>	
				</Button>
				</Grid>

				<Grid item xs={6} className="my_button_list_approval_grid">
				<Button size="small" variant="contained" color="default" className="my_button_list_approval" style={{backgroundColor:'#ffffff', border: "1px dotted #e9e9e9"}} > 
				<Link style={{ textDecoration: 'none'}} to={{
					pathname: 'approval-ticket'
					// pathname: 'leave-request-approval',
					// state: {
					// detailname : this.state.detailname,
					// detailemail : this.state.detailemail,
					// detailorgName : this.state.detailorgName,
					// detailprofession : this.state.detailprofession,
					// detailempno  : this.state.detailempno,
					// detailimage : this.state.detailimage
					// }
				}}>
				<ul style={{listStyleType:'none', padding:'0px', margin:'0px'}}>
					<li><img src={apiUrl+'/api/static/images/approval_it138.png'} alt="Approval e-Travel" width="40" height="40" style={{marginBottom:'10px'}} /></li>
					<li><span style={{color:'#666666'}}>Approval <br/>IT 138</span></li>
				</ul>
				</Link>
				</Button>
				</Grid>

				<Grid item xs={6} className="my_button_list_approval_grid">
				<Button size="small" variant="contained" color="default" className="my_button_list_approval" style={{backgroundColor:'#ffffff', border: "1px dotted #e9e9e9"}} > 
				<Link style={{ textDecoration: 'none'}} to={{
					pathname: 'spkl_approval'
					// pathname: 'leave-request-approval',
					// state: {
					// detailname : this.state.detailname,
					// detailemail : this.state.detailemail,
					// detailorgName : this.state.detailorgName,
					// detailprofession : this.state.detailprofession,
					// detailempno  : this.state.detailempno,
					// detailimage : this.state.detailimage
					// }
				}}>
				<ul style={{listStyleType:'none', padding:'0px', margin:'0px'}}>
					<li><img src={apiUrl+'/api/static/images/approval_spkl.png'} alt="Approval e-Travel" width="40" height="40" style={{marginBottom:'10px'}} /></li>
					<li><span style={{color:'#666666'}}>Approval <br/>SPKL</span></li>
				</ul>
				</Link>
				</Button>
				</Grid>

			</div>			

		)

	}


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


	render() {
		const { searchText } = this.state;

		return (

		<div>
			<div className="backtolist_div">
			<h1 className="backtolist_tanpa_icon">List Approval</h1>
			<div className="break"></div>
			</div>

			<LayoutWrapper>
				<Row>
					<FullColumn>
						<Root>
						<div style={{clear:'both'}}>
							{this.body()}
							<div style={{clear:'both'}}></div>
						</div>
						</Root>
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
	  data:state.EesapprovalRequest
	}),
	{EESAPPROVAL_LIST_REQUEST, EESAPPROVAL_LIST_BUTTONAPPROVAL_REQUEST}
  ),withStyles())(GitSearch); 