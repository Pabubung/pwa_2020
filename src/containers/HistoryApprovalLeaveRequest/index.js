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


import eesapprovalHistoryActions from "../../redux/essApprovalHistory/actions";
import compose from 'recompose/compose';
import Loader from 'react-loader-spinner';
import Typography from '../../../src/components/uielements/typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';
import { Base64 } from 'js-base64';
import moment from 'moment';

const { EESAPPROVAL_LIST_HISTORY_REQUEST, EESAPPROVAL_LIST_BUTTONAPPROVAL_HISTORY_REQUEST } = eesapprovalHistoryActions;


class GitSearch extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data:[],
			loading: false,
			searchText:'',
			authorIdLogin:''
	  	}
	
	}

	componentDidMount(){

		let data = localStorage.getItem("data")
		if(data !== "undefined"){
		  const { bitrix, userLogin } = JSON.parse(data) 

			// Insert log //
			this.inserLog(userLogin.username);

		  this.setState({
			authorIdLogin : bitrix.result.data.ID
		  });

		  // console.log("getitem", bitrix);
		  this.props.EESAPPROVAL_LIST_HISTORY_REQUEST(
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
		  this.props.EESAPPROVAL_LIST_HISTORY_REQUEST(
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


	handleApprove (value){

		// alert("approve" + value);

		let data = localStorage.getItem("data")
		if(data !== "undefined"){
		  const { bitrix } = JSON.parse(data) 
		  // console.log("getitem handleApprove", bitrix);
		  this.props.EESAPPROVAL_LIST_BUTTONAPPROVAL_HISTORY_REQUEST(
			{
			  "workflowId":value,
			  "userId":bitrix.result.data.ID,
			  // "userId":'1817',
			  "buttonId":'1',
			  "offset":"1"
			  // "emp_no":"IU016060058",
			  // "last_update": "2016-01-01 00:00:00",
			  // "contact_Id": "8174"
			}
		  );
		}

	}


	handleReject (value) {

		// alert("reject");

		let data = localStorage.getItem("data")
		if(data !== "undefined"){
		  const { bitrix } = JSON.parse(data) 
		  // console.log("getitem handleApprove", bitrix);
		  this.props.EESAPPROVAL_LIST_BUTTONAPPROVAL_HISTORY_REQUEST(
			{
			  "workflowId":value,
			  "userId":bitrix.result.data.ID,
			  // "userId":'1817',
			  "buttonId":'2',
			  "offset":"1"
			  // "emp_no":"IU016060058",
			  // "last_update": "2016-01-01 00:00:00",
			  // "contact_Id": "8174"
			}
		  );
		}

	}

	handleLoadMore = value => {

		// alert("loadmore");

		this.props.EESAPPROVAL_LIST_HISTORY_REQUEST(
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

	body(){

		return(

			this.state.data.map((item, index, key)=>(
				// console.log("Looping datanya : "+ index),

				<ListItem 
				key={index}
				className="eventlist_ul">
					<ListItemText className="borderList">
					<Typography>Dear <b>{item.DATA.AUTHOR.NAME}</b></Typography>
					<Typography className="my_approval_leaverequest">Your request made on {item.DATE} has been <b>{item.DATA.CONTENT.TEXT.STATUS_PENGAJUAN}</b> by <b>{item.DATA.TO.replace("To >", "")}</b> The following are the details of the submission. </Typography>

					<div className="latarketeranganleaverequest">
					<Typography className="my_approval_leaverequest"><b>Leave request type :</b> {item.DATA.CONTENT.TEXT.ABSENCE_TYPE} </Typography>
					<Typography className="my_approval_leaverequest"><b>Start Date :</b> {item.DATA.CONTENT.TEXT.START_DATE}</Typography>
					<Typography className="my_approval_leaverequest"><b>End Date :</b> {item.DATA.CONTENT.TEXT.END_DATE}</Typography>
					<Typography className="my_approval_leaverequest"><b>Reason :</b> {item.DATA.CONTENT.TEXT.REASON}</Typography>
					</div>


					{/* <ul className="my_approval_leaverequest_ul">
						<li><Button size="small" variant="contained" color="default" className="my_approval_leaverequest_approve" onClick={() => {this.handleApprove(item.DATA.SOURCE_ID)}}> Approve </Button></li>
						<li><Button size="small" variant="contained" color="default" className="my_approval_leaverequest_reject" onClick={() => {this.handleReject(item.DATA.SOURCE_ID)}}> Reject </Button></li>

					</ul> */}
				</ListItemText>
				{/* <Typography className="eventlist_div_body_description">Max Taken = 12</Typography> */}

				</ListItem>


			))
			

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

			!this.state.loading ?

			<LayoutWrapper>
				<Row>
					<FullColumn>
						{/* <Papersheet style={{ marginBottom: 20 }}>
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
						</Papersheet> */}
						<Root>

						{this.body()}
						{/* {this.loadMoreButton()} */}

						</Root>
					</FullColumn>
				</Row>
			</LayoutWrapper>

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
	  data:state.EesapprovalhistoryRequest
	}),
	{EESAPPROVAL_LIST_HISTORY_REQUEST, EESAPPROVAL_LIST_BUTTONAPPROVAL_HISTORY_REQUEST}
  ),withStyles())(GitSearch); 