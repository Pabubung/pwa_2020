import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lists, { ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Left,
  Thumbnail
} from "../../../src/components/uielements/lists";

import { Link } from 'react-router-dom';
import Icon from "../../../src/components/uielements/icon/index.js";
import Typography from '../../../src/components/uielements/typography/index.js';

import Slide from '@material-ui/core/Slide';

var moment = require('moment');
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
    // console.log("agendapost", v);

    this.props.navs.history.push({
      pathname: "/dashboard/eventlist-agenda-menu",
      state: { 
        agendaDescription: v.agendaDescription,
        agendaFileName: v.agendaFileName,
        agendaFilePath: v.agendaFilePath,
        agendaId: v.agendaId,
        agendaLatlong: v.agendaLatlong,
        agendaLocation: v.agendaLocation,
        agendaSpeakerName: v.agendaSpeakerName,
        agendaTime: v.agendaTime,
        agendaTimeFinished: v.agendaTimeFinished,
        agendaTitle: v.agendaTitle,
        eventId:v.eventId
      }
    })

  };

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
             
              <ListItem button className="eventlist_ul" onClick={() => this.handleClickOpen(this.props)} >
                  <div className="eventlist_div_icon">
                    <Typography className="timeAgendaList">{this.props.agendaTime}</Typography>
                    <Typography className="timeFinishedAgendaList">{this.props.agendaTimeFinished}</Typography>
                  </div>
                  <ListItemText className="borderList">
                      <Typography><b>{this.props.agendaTitle}</b></Typography>
                      <Typography className="eventlist_subtitle">Speakers : {this.props.agendaSpeakerName}</Typography>
                  </ListItemText>
                  </ListItem>

              : 

              <ListItem button className="eventlist_ul" onClick={() => this.handleClickOpen(this.props)} >
                  <div className="eventlist_div_icon">
                    {this.props.agendaTime}
                  </div>
                  <ListItemText className="borderList">
                      <Typography><b>{this.props.agendaTitle}</b></Typography>
                      <Typography className="eventlist_subtitle">Speakers : {this.props.agendaSpeakerName}</Typography>
                  </ListItemText>
                  </ListItem>
          
            }

        </Lists>

      </div>
    );
  }
}
