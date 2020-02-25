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
      agendaId:'',
      eventId:'',
      audienceid:'',
      userQuestion:'',
      open: false,
      transition: '',
      pesanSnackbar:''
	  	}
	
	}


  componentWillReceiveProps(nextProps){
  
    
  }

	componentDidMount(){

    let data = localStorage.getItem("data")
		if(data !== "undefined"){
		  const { bitrix, audienceid } = JSON.parse(data) 

      // console.log("didmount question", this.props);

      this.setState({
        agendaId:this.props.location.state.agendaId,
        eventId:this.props.location.state.eventId,
        audienceid: audienceid
      })

		}



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
      userQuestion:'',
      transition:'',
      pesanSnackbar:''
    });

    this.handleRequestClose();
  }

  onclickBack = () => {

    window.history.back();

  };

  handleChangeReason(value){
    this.setState({ userQuestion: value.target.value });
  };

  handleSubmit = ()=> {
 
    if(this.state.userQuestion !=''){

      var postData = {
        audienceid : this.state.audienceid,
        eventId : this.state.eventId,
        agendaId : this.state.agendaId,
        anserwer_value : this.state.userQuestion,
      };
      

      const request = axios.post("https://eventapp.dexagroup.com/apimobileIattend_question_insert", postData, {
        headers: { 'Authorization': 123456 }
      })
      request
        .then(response => {
          // -Save the JWT token
          // console.log(response);

          if(response.data.insert == true){
            this.setState({
              pesanSnackbar:'Question success to submit'
            })
            this.handleClick(TransitionUp);
            setTimeout(() => window.history.back(), 4000);
          }else{
            this.setState({
              pesanSnackbar:"Question failed to submit"
            })

            this.handleClick(TransitionUp);
          }



        })
        .catch((err) => {
          //  dispatch(authError('bad login info'))
          console.log("AXIOS ERROR: ", err);
        })

    }else{
        this.setState({
          pesanSnackbar:"Please insert question first"
        });
        this.handleClick(TransitionUp);

    }


  }


  render() {
    const { classes } = this.props;
    // const { value, dataCurrent, dataPass, dataMonthCurrent } = this.state;

    // console.log("dataMonthCurrent", dataMonthCurrent);

    return (
      <div className={classes.root} className="other_applications_my_ticket_div" >

          <div className="eventBackgroundHeaderAgenda">
            <Icon className="eventJudulAgendaIcon" onClick={() => this.onclickBack()}>arrow_back</Icon> <h1 className="eventJudulAgenda">Question</h1>
            <div className="break"></div>
          </div>

          <div className="eventlist_dashboard_div">


          <textarea 
            rows="10"
            className="grid_textarea_question"
            value={this.state.userQuestion}
            onChange={this.handleChangeReason.bind(this)}
          >

          </textarea>

          </div>

          <div>

            <Grid item xs={6} className="question_left_grid">
            <Button variant="contained" className="create_leave_request_button_cancel" onClick={() => this.onclickBack()}>
            Cancel
            </Button>
            </Grid>
            <Grid item xs={6} className="question_right_grid">
            <Button variant="contained" color="primary" className="create_leave_request_button_submit" onClick={this.handleSubmit}>
            {
              (this.state.loading) ? "LOADING" : "SUBMIT" 
            }
            </Button>
            </Grid>

          </div>

          <Snackbar
              open={this.state.open}
              onClose={this.handleRequestClose}
              transition={this.state.transition}
              className="snackbarTextAlign"
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<div id="message-id"><div className="snackbarTextAlign" >{this.state.pesanSnackbar}</div></div>}
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