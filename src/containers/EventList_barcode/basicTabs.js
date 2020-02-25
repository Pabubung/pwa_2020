import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '../../components/uielements/appbar';
import Tabs, { Tab } from '../../components/uielements/tabs';

import Lists, {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction
} from "../../components/uielements/lists";
import Avatar from "../../components/uielements/avatars";
import Icon from "../../components/uielements/icon/index.js";
import Typography from '../../components/uielements/typography/index.js';
import { FullScreenDialogs } from './dialogs.style';
import Toolbar from '../../components/uielements/toolbar';
// import Button from '../../components/uielements/button';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import vegetables from '../../../src/images/vegetables.jpg';
import Slide from '@material-ui/core/Slide';
import IconButton from '../../components/uielements/iconbutton';
import StarRatings from 'react-star-ratings';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
// import iattendQuestionActions from "../../redux/iattendQuestion/actions";
import moment from 'moment';
import Divider from '../../components/uielements/dividers';
import QrReader from 'react-qr-reader'
import axios from 'axios';
import Snackbar from './styleSnackbar';

// const { IATTENDQUESTION_LIST_REQUEST } = iattendQuestionActions;

function TransitionUp(props) {
  return <Slide direction="up" {...props} />;
}


class BarcodeMenu extends Component {

	constructor(props) {
		super(props);
		this.state = {
      loading: false,
      result: 'No result',
      audienceid:'',
      eventId:'',
      email:'',
      name:'',
      namaEvent:'',
      setOpen:false,
      userHastag:'',
      pesanSnackbar:'',
      transition: '',
      open:''
	  	}
	
	}


  handleScan = data => {
    if (data) {
      // this.setState({
      //   result: data
      // })

      const displit = data.split(",");
      var eventIdPrint = displit[0];
      // var namaEvent = displit[1];
      var namaEvent = this.state.namaEvent;

      // console.log("barcodeReceived split",displit.length,displit[0],displit[1]);

      if(displit.length == 2){

        if(eventIdPrint == this.state.eventId){

          var postData = {
            audienceid : this.state.audienceid,
            eventId : this.state.eventId,
            email : this.state.email,
            name : this.state.name,
          };
          
    
          const request = axios.post("https://eventapp.dexagroup.com/apimobileIattend_insertattendees", postData, {
            headers: { 'Authorization': 123456 }
          })
          request
            .then(response => {
              // -Save the JWT token
              // console.log(response);
    
              this.setState({
                result: response.data.pesan + namaEvent
              });

              this.handleClick(TransitionUp);
    
    
            })
            .catch((err) => {
              //  dispatch(authError('bad login info'))
              // console.log("AXIOS ERROR: ", err);
            })


        }else{

            this.setState({
              result: "You cannot do attendance at this event"
            });

        }



      }

    }
  }
  handleError = err => {
    console.error(err)
  }

  
  componentWillReceiveProps(nextProps){
  
    
  }

	componentDidMount(){

    // console.log("didmount barcode", this.props);

    let data = localStorage.getItem("data")
		if(data !== "undefined"){
		  const { bitrix, audienceid } = JSON.parse(data) 

      // console.log("didmount question", bitrix.result.data.EMAIL);

      this.setState({
        eventId:this.props.location.state.eventId,
        audienceid: audienceid,
        name:bitrix.result.data.NAME,
        email:bitrix.result.data.EMAIL,
        namaEvent:this.props.location.state.eventName
      })

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


  submitOtherIattend = () => {

    if(this.state.userHastag !==''){


      var data = this.state.userHastag;
      const displit = data.split("-");
      var hastag = data.charAt(0)
      var eventIdPrint = displit[0].substring(1);
      var lastSplit = displit[1];
      var namaEvent = this.state.namaEvent;

      // console.log("barcodeReceived split",displit.length,displit[0],displit[1]);

      if(hastag == '#' && displit.length == 2 && lastSplit == 'DXG'){

        if(eventIdPrint == this.state.eventId){

          var postData = {
            audienceid : this.state.audienceid,
            eventId : this.state.eventId,
            email : this.state.email,
            name : this.state.name,
          };
          
    
          const request = axios.post("https://eventapp.dexagroup.com/apimobileIattend_insertattendees", postData, {
            headers: { 'Authorization': 123456 }
          })
          request
            .then(response => {
              // -Save the JWT token
              // console.log(response);
    
              this.toggle();

              this.setState({
                result: response.data.pesan + namaEvent,
                userHastag:''
              })

              this.handleClick(TransitionUp);
    
    
            })
            .catch((err) => {
              //  dispatch(authError('bad login info'))
              console.log("AXIOS ERROR: ", err);
            })


        }else{

            this.toggle();
            this.setState({
              result: "You cannot do attendance at this event"
            });

            this.handleClick(TransitionUp);

        }

        // this.toggle();

      }else{

        this.toggle();
        this.setState({
          result: "Error, please type correct input"
        });

        this.handleClick(TransitionUp);

      }

      


    }else{

      this.toggle();
      this.setState({
        result: "Please fill input"
      });

      this.handleClick(TransitionUp);

    }
    
  }

  handleChangeHastag(value){
    this.setState({ userHastag: value.target.value });
  };


  render() {
    const { classes } = this.props;
    // const { value, dataCurrent, dataPass, dataMonthCurrent } = this.state;

    // console.log("dataMonthCurrent", dataMonthCurrent);

    return (
      <div className={classes.root} className="barcode_background" >

          <div className="eventBackgroundHeaderAgenda">
            <Icon className="eventJudulAgendaIcon" onClick={() => this.onclickBack()}>arrow_back</Icon> <h1 className="eventJudulAgenda">Barcode Scan</h1>

            <div className="headerkanan">

                  <div>
                  <Button color="danger" className="buttonPDFChange" onClick={() => this.toggle()}>
                  Attend
                  </Button> 
                  </div>
                
            </div>

            <div className="break"></div>
          </div>

          <div className="eventlist_dashboard_div">


          <QrReader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: '100%' }}
          />
          <br/>
          <p className="styleParagrafScan">{this.state.result}</p>

          </div>

          <Modal isOpen={this.state.setOpen} toggle={() => this.toggle()} className={this.props.className} centered={true}>
          <ModalHeader toggle={() => this.toggle()}>Information </ModalHeader>
          <ModalBody>
          <div className="baganDialog">
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Type with hastag (#) diawalan inputan</Label>
              <Input 
              value={this.state.userHastag}
              onChange={this.handleChangeHastag.bind(this)}
              type="text" placeholder="#123-DXG" />
            </FormGroup>
          </Form>
          </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.toggle()}>Cancel</Button>
            <Button color="primary" onClick={() => this.submitOtherIattend()}>Submit</Button>
          </ModalFooter>
        </Modal>

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

BarcodeMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default BasicTabs;

export default compose(connect(
	state => ({
	  // data:state.IattendQuestionRequest
	}),
	// {IATTENDQUESTION_LIST_REQUEST}
  ),withStyles())(BarcodeMenu);