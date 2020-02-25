import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '../../../src/components/uielements/appbar';
import Tabs, { Tab } from '../../../src/components/uielements/tabs';

import Lists, {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction
} from "../../../src/components/uielements/lists";
import Avatar from "../../../src/components/uielements/avatars/";
import Icon from "../../../src/components/uielements/icon/index.js";
import Typography from '../../../src/components/uielements/typography/index.js';
import { FullScreenDialogs } from './dialogs.style';
import Toolbar from '../../../src/components/uielements/toolbar';
import Button from '../../../src/components/uielements/button';
import vegetables from '../../../src/images/vegetables.jpg';
import Slide from '@material-ui/core/Slide';
import IconButton from '../../../src/components/uielements/iconbutton/';
import StarRatings from 'react-star-ratings';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import iattendQuestionActions from "../../redux/iattendQuestion/actions";
import moment from 'moment';
import Divider from '../../../src/components/uielements/dividers';
import axios from 'axios';
import Snackbar from './styleSnackbar';


const { IATTENDQUESTION_LIST_REQUEST } = iattendQuestionActions;

function TransitionUp(props) {
  return <Slide direction="up" {...props} />;
}

class AgendaMenu extends Component {

	constructor(props) {
		super(props);
		this.state = {
      loading: false,
      open: false,
      transition: '',
      result:'',
      agendaId: '',
      eventId: '',
      audienceid: ''
	  	}
	
	}


  handleClickOpen = (value) => {
    // console.log("sdsds", this.props.history.location);

    switch (value) {
      case 'files':
        this.props.history.push({
          pathname: "/dashboard/eventlist-agenda-menu-files",
          state: { 
            agendaDescription: this.props.history.location.state.agendaDescription,
            agendaFileName: this.props.history.location.state.agendaFileName,
            agendaFilePath: this.props.history.location.state.agendaFilePath,
            agendaId: this.props.history.location.state.agendaId,
            agendaLatlong: this.props.history.location.state.agendaLatlong,
            agendaLocation: this.props.history.location.state.agendaLocation,
            agendaSpeakerName: this.props.history.location.state.agendaSpeakerName,
            agendaTime: this.props.history.location.state.agendaTime,
            agendaTimeFinished: this.props.history.location.state.agendaTimeFinished,
            agendaTitle: this.props.history.location.state.agendaTitle,
            eventId:this.props.history.location.state.eventId,
          }
        });
        break;
      case 'polling':

          // alert("polling");


          var postData = {
            audienceId: this.state.audienceid,
            agendaId : this.state.agendaId,
            eventId : this.state.eventId
          };
      
      
          const request = axios.post("https://eventapp.dexagroup.com/apipwa_polling_cek_statusadatidak", postData, {
          headers: { 'Authorization': 123456 }
          })
          request
          .then(response => {
            // -Save the JWT token
            // console.log("balikannya",response.data.statusPolling);
      
            if(response.data.statusPolling !== 'tidak ada'){
      
              this.props.history.push({
                pathname: "/dashboard/eventlist-agenda-menu-polling",
                state: { 
                  agendaDescription: this.props.history.location.state.agendaDescription,
                  agendaFileName: this.props.history.location.state.agendaFileName,
                  agendaFilePath: this.props.history.location.state.agendaFilePath,
                  agendaId: this.props.history.location.state.agendaId,
                  agendaLatlong: this.props.history.location.state.agendaLatlong,
                  agendaLocation: this.props.history.location.state.agendaLocation,
                  agendaSpeakerName: this.props.history.location.state.agendaSpeakerName,
                  agendaTime: this.props.history.location.state.agendaTime,
                  agendaTimeFinished: this.props.history.location.state.agendaTimeFinished,
                  agendaTitle: this.props.history.location.state.agendaTitle,
                  eventId:this.props.history.location.state.eventId,
                }
              });
      
            }else{
              
              this.handleClick(TransitionUp,"Maaf, untuk saat ini polling di agenda ini belum ada di sistem");
      
            }
      
      
          })
          .catch((err) => {
            //  dispatch(authError('bad login info'))
            console.log("AXIOS ERROR: ", err);
          });


        break;
      case 'question':

        this.props.history.push({
          pathname: "/dashboard/eventlist-agenda-menu-question",
          state: { 
            agendaDescription: this.props.history.location.state.agendaDescription,
            agendaFileName: this.props.history.location.state.agendaFileName,
            agendaFilePath: this.props.history.location.state.agendaFilePath,
            agendaId: this.props.history.location.state.agendaId,
            agendaLatlong: this.props.history.location.state.agendaLatlong,
            agendaLocation: this.props.history.location.state.agendaLocation,
            agendaSpeakerName: this.props.history.location.state.agendaSpeakerName,
            agendaTime: this.props.history.location.state.agendaTime,
            agendaTimeFinished: this.props.history.location.state.agendaTimeFinished,
            agendaTitle: this.props.history.location.state.agendaTitle,
            eventId:this.props.history.location.state.eventId,
          }
        })
        
    }

  };


  
  componentWillReceiveProps(nextProps){
  
    
  }

	componentDidMount(){

    // console.log("didmount agenda menu", this.props);
    
    let data = localStorage.getItem("data")
    if(data !== "undefined"){
      const { bitrix, audienceid } = JSON.parse(data) 

      // console.log("didmount question", this.props);

      this.setState({
        agendaId: this.props.history.location.state.agendaId,
        eventId: this.props.history.location.state.eventId,
        audienceid: audienceid
      })

    }

  } 

  onclickBack = () => {

    window.history.back();

  };


	handleClick = (transition,text) => {

		this.setState({ 
			open: true, 
			result: text,
			transition });
		setTimeout(() => this.handleSnackbarClose(), 3000);
	};

	handleRequestClose = () => {
		this.setState({ open: false });
	};

	handleSnackbarClose = () => {
		this.setState({
			result:'',
			transition:''
		});

		this.handleRequestClose();
	}


  render() {
    const { classes } = this.props;
    // const { value, dataCurrent, dataPass, dataMonthCurrent } = this.state;

    // console.log("dataMonthCurrent", dataMonthCurrent);

    return (
      <div className={classes.root} className="other_applications_my_ticket_div" >

          <div className="eventBackgroundHeaderAgenda">
            <Icon className="eventJudulAgendaIcon" onClick={() => this.onclickBack()}>arrow_back</Icon> <h1 className="eventJudulAgenda">Agenda Menu</h1>
            <div className="break"></div>
          </div>

          <div className="eventlist_dashboard_div">
            <Lists>
            <ListItem className="ListAgendaMenu" button onClick={() => this.handleClickOpen('files')}>
            <ListItemText primary="Files" />
            </ListItem>
            <Divider />
            <ListItem className="ListAgendaMenu" button onClick={() => this.handleClickOpen('polling')}>
            <ListItemText primary="Polling" />
            </ListItem>
            <Divider />
            <ListItem className="ListAgendaMenu" button onClick={() => this.handleClickOpen('question')}>
            <ListItemText primary="Question" />
            </ListItem>
            </Lists>
          </div>


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

AgendaMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default BasicTabs;

export default compose(connect(
	state => ({
	  data:state.IattendQuestionRequest
	}),
	{IATTENDQUESTION_LIST_REQUEST}
  ),withStyles())(AgendaMenu);