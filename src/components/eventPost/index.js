import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lists, {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Left,
  Thumbnail
} from "../../../src/components/uielements/lists";

import { Link } from 'react-router-dom';
import Icon from "../../../src/components/uielements/icon/index.js";
import Typography from '../../../src/components/uielements/typography/index.js';
import Snackbar from './styleSnackbar';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';

var moment = require('moment');

function TransitionUp(props) {
  return <Slide direction="up" {...props} />;
}


export default class extends Component {

  constructor(props) {
		super(props);
		this.state = {
      transition:'',
      open:false
	  }
	 
	}


  handleClickOpen = (v) => {
    // console.log("sdsds", this.state);

    this.props.navs.history.push({
      pathname: "/dashboard/eventlist-dashboard",
      state: { 
        eventCreated_by: v.eventCreated_by,
        eventDate: v.eventDate,
        eventDate_created: v.eventDate_created,
        eventDate_end: v.eventDate_end,
        eventDate_updated: v.eventDate_updated,
        eventDescription: v.eventDescription,
        eventId: v.eventId,
        eventImage: v.eventImage,
        eventLat_long: v.eventLat_long,
        eventLocation: v.eventLocation,
        eventName:v.eventName,

        userName:'',
        userEmail:'',
        userCompany:'',
        userPassword:'',
        userPhone:''
      }
    })

  };

  
  onPressTiga = (props) => {

    var today = moment();
    var dateCreated = moment(props.eventDate_created).format('DD-MMMM-YYYY');
    var deadline = moment(new Date(dateCreated)).add(14,'days').format('DD-MMMM-YYYY');
  
    // console.log("onPressTiga",moment(this.props.eventDate_created).format('DD-MMMM-YYYY'), "today : " + today + "deadlineDay : " + deadline + " : " + moment(this.props.eventDate_created) + ":" + moment(new Date(dateCreated)).add(14,'days'));
  
  
  
    if( moment() > moment(new Date(dateCreated)).add(14,'days') ){
      this.handleClick(TransitionUp);
    }else{
      // props.onTitleClick(true, props);
      this.handleClickOpen(props);
    }
  
    // props.onTitleClick(true, props);
  
  }

  handleClick = (transition) => {

    this.setState({ open: true, transition });
    setTimeout(() => this.handleSnackbarClose(), 3000);
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleSnackbarClose = () => {
    this.setState({
      open:false,
      transition:''
    });

    this.handleRequestClose();
  }

  componentDidMount(){
    // console.log("propsnya", this.props);
    

  }


  render() {


    return (
      <div>

        <Lists>
            { this.props.barisId == this.props.jumBaris - 1 ? 
             
                  this.props.scrolldata == 'current' ? 

                    <ListItem button className="eventlist_ul" onClick={() => this.handleClickOpen(this.props)}>
                    <ListItemIcon className="eventlist_div_icon">
                      <Icon>calendar_today</Icon>
                    </ListItemIcon>
                    <ListItemText className="borderList">
                      <Typography><b>{this.props.eventName}</b></Typography>
                      <Typography className="eventlist_subtitle">{this.props.eventLocation}</Typography>
                    </ListItemText>
                    </ListItem>
                  

                  :


              
                  <ListItem button className="eventlist_ul" onClick={() => this.onPressTiga(this.props)} >
                  <ListItemIcon className="eventlist_div_icon">
                    <Icon>calendar_today</Icon>
                  </ListItemIcon>
                  <ListItemText className="borderList">
                      <Typography><b>{this.props.eventName}</b></Typography>
                      <Typography className="eventlist_subtitle">{this.props.eventLocation}</Typography>
                  </ListItemText>
                  </ListItem>



             
              : 

                  this.props.scrolldata == 'current' ? 
                  
                  <ListItem button className="eventlist_ul" onClick={() => this.handleClickOpen(this.props)}>
                  <ListItemIcon className="eventlist_div_icon">
                    <Icon>calendar_today</Icon>
                  </ListItemIcon>
                  <ListItemText className="borderList">
                      <Typography><b>{this.props.eventName}</b></Typography>
                      <Typography className="eventlist_subtitle">{this.props.eventLocation}</Typography>
                  </ListItemText>
                  </ListItem>

                  :
                  
                  <ListItem button className="eventlist_ul" onClick={() => this.onPressTiga(this.props)}>
                  <ListItemIcon className="eventlist_div_icon">
                    <Icon>calendar_today</Icon>
                  </ListItemIcon>
                  <ListItemText className="borderList">
                      <Typography><b>{this.props.eventName}</b></Typography>
                      <Typography className="eventlist_subtitle">{this.props.eventLocation}</Typography>
                  </ListItemText>
                  </ListItem>
          
          
            }
  


        </Lists>

        
        <Snackbar
              open={this.state.open}
              onClose={this.handleRequestClose}
              transition={this.state.transition}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">Sorry, this event is over</span>}
            />

      </div>
    );
  }
}
