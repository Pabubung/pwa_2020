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


import iattendlistActions from "../../redux/iattendList/actions";
import compose from 'recompose/compose';
import Loader from 'react-loader-spinner';
import Typography from '../../../src/components/uielements/typography';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import Icon from "../../components/uielements/icon/index.js";
import { isAbsolute } from 'path';

const { IATTENDLIST_LIST_REQUEST } = iattendlistActions;

class GitSearch extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data:[],
			loading: false,
			searchText:'',
			authorIdLogin:'',
			eventid:'',
			dateTimeEvent:'',
			agendaName:'',
			venue:'',
			setOpen:''
	  	}
	
	}

	componentDidMount(){

		// console.log("eventid", this.props);
		let data = localStorage.getItem("data")
		if(data !== "undefined"){
		  const { bitrix } = JSON.parse(data) 

		  this.setState({
			dateTimeEvent: this.props.location.state.eventDate,
			agendaName: this.props.location.state.eventName,
			venue: this.props.location.state.eventLocation
		  });

		  // console.log("getitem", bitrix);
		  this.props.IATTENDLIST_LIST_REQUEST(
			{
			  "eventid":this.props.location.state.eventId
			  // "emp_no":"IU016060058",
			  // "last_update": "2016-01-01 00:00:00",
			  // "contact_Id": "8174"
			}
		  );
		}

	} 



	componentWillReceiveProps(nextProps){


	// console.log("list", nextProps.result.result);
	// console.log("list", nextProps);

	if(nextProps.result.result.length !== undefined){


		// console.log("ini", nextProps.data.result.result);
		this.setState({
			data: nextProps.result.result,
			databackup: nextProps.result.result,
			loading:nextProps.result.loading
			})

		}

	}

	handleChangeSearch(value){

	this.setState({ searchText: value });

	if(this.state.searchText.length > 0){
		const newData = this.state.databackup.filter(function(item){
		const itemData = item.audience_name.toUpperCase()
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

	converDate(param){

		if(param !=''){
		  var a = moment(param).format('DD MMMM YYYY') + " Time " + moment(param).format('h:mm A');
		  return a;
		}else{
		  var a = '-';
		  return a;
		}
	
	}

	onclickBack = () => {

		window.history.back();
	
	};

  toggle = () =>  {
    this.setState({
      setOpen: !this.state.setOpen
    })

  }

	body(){

		return(

			this.state.data.map((item, index, key)=>(
				// console.log("Looping datanya : "+ index),

				<ListItem 
				key={index}
				className="eventlist_ul">
					<Avatar className="eventlist_ul_avatar_number">
            <ul className="other_applications_my_ticket_ul_avatar_number">
              <li><span className="other_applications_my_ticket_ul_avatar_tgl">{index + 1}</span></li>
            </ul>
          </Avatar>
					<ListItemText className="borderList">
					<Typography className="my_approval_leaverequest">{item.audience_name}</Typography>
					<Typography className="other_applications_my_ticket_description">{item.email}</Typography>

					<ListItemSecondaryAction>
						<Typography className="my_approval_leaverequest">{moment(item.waktubarcode, "HH:mm:ss").format("hh:mm A")}</Typography>
					</ListItemSecondaryAction>

				</ListItemText>
				</ListItem>


			))
			

		)

	}



	render() {
		const { searchText } = this.state;

		return (

			!this.state.loading ?

			<div>

			<div className="eventBackgroundHeaderIattend">
            <Icon className="eventJudulAgendaIcon" onClick={() => this.onclickBack()}>arrow_back</Icon> <h1 className="eventJudulAgenda">Attendee List</h1>

            <div className="headerkanan">

                  <div>
                  <Button color="danger" className="buttonPDFChange" onClick={() => this.toggle()}>
                  Event Detail
                  </Button> 
                  </div>
                
            </div>

            <div className="break"></div>

      </div>
			<div className="eventBackgroundHeaderListAttendSearch">

						<Papersheet className="borderradis">
							<FormControl>
								<InputLabel htmlFor="githubSearch" className={"searchTextLabel"}>
									Search Name Audience
								</InputLabel>
								<InputFullWidth
									id="githubSearch"
									onChange={this.handleChangeSearch.bind(this)}
									defaultValue={searchText}
								/>
							</FormControl>
						</Papersheet>
			</div>

			<LayoutWrapper>

			<Row style={{ marginTop: 150 }}>
				<FullColumn>
				<Papersheet>
					{this.body()}
				</Papersheet>
				</FullColumn>
			</Row>
			</LayoutWrapper>

			<Modal isOpen={this.state.setOpen} toggle={() => this.toggle()} className={this.props.className} centered={true}>
          <ModalHeader toggle={() => this.toggle()}>Information </ModalHeader>
          <ModalBody>
					<div className="subheaderAttendlist">
						<ul className="ulattendlist">
							<li className="liattendlist">
							<h1 className="attendlistDateTime">Date Time Event :</h1>
							<Typography>{this.state.dateTimeEvent}</Typography>
							</li>
							<li className="liattendlist">
							<h1 className="attendlistDateTime">Event Name :</h1>
							<Typography>{this.state.agendaName}</Typography>
							</li>
							<li className="liattendlist">
							<h1 className="attendlistDateTime">Venue :</h1>
							<Typography>{this.state.venue}</Typography>
							</li>
						</ul>
					<div className="break"></div>
					</div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.toggle()}>Close</Button>
          </ModalFooter>
      </Modal>

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
	  result:state.IattendListRequest
	}),
	{IATTENDLIST_LIST_REQUEST}
  ),withStyles())(GitSearch); 