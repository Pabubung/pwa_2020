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
import Slide from '@material-ui/core/Slide';
import axios from 'axios';
import {isIOSDevice} from 'ios-detector';
import { messaging } from "../../../src/init-fcm";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; 
import { Base64 } from 'js-base64';

var moment = require('moment');

function TransitionUp(props) {
  return <Slide direction="up" {...props} />;
}


export default class extends Component {

    constructor(props) {
		super(props);
		this.state = {
            transition:'',
            open:false,
            setOpenNews:false,
            setOpen:false,
            titleNotif:'Need Approve',
            bodyNotif:'Anya telah mengajukan untuk leave request pada tanggal 13-08-2019. Apakah anda mau mengunjunginya sekarang?',
            linkNotif:'#',
            setOpenUpdateVersion:false,
            email:'',
            fcmtoken:''
	  }
	 
	}


    checkPush(title,body,click_action){

        switch (title) {
          case "Need Approve":
    
            this.setState({
              setOpen:true,
              titleNotif:title,
              bodyNotif:body,
              linkNotif:click_action
            });
    
            break;
    
          case "Status Approve":
    
            this.setState({
              setOpen:true,
              titleNotif:title,
              bodyNotif:body,
              linkNotif:click_action
            });
    
            break;
    
          case "News Update":
    
            this.setState({
              setOpenNews:true,
              titleNotif:title,
              bodyNotif:body,
              linkNotif:click_action
            });
    
            break;
    
          case "Update Version":
    
            this.setState({
              setOpenUpdateVersion:true,
              titleNotif:title,
              bodyNotif:body,
              linkNotif:click_action
            });
    
        }
    
      }
    
      toggleLeaveRequest = () =>  {
        this.setState({
          setOpen: !this.state.setOpen
        })
    
      }
    
      toggleUpdateVersion = () =>  {
        this.setState({
          setOpenUpdateVersion: !this.state.setOpenUpdateVersion
        })
    
      }
    
      toggleLinkLeaveRequest = () =>  {
        this.setState({
          setOpen: !this.state.setOpen
        });
    
        if(this.state.titleNotif == 'Need Approve'){
          this.props.props.history.push({
            pathname: "/dashboard/leave-request-approval"
            // state: { 
            //   description: v.description,
            //   education: v.education,
            //   education: v.education,
            //   experience: v.experience,
            //   image: v.image,
            //   name: v.name,
            //   skills:  v.skills
            // }
          })
        }else{
          this.props.props.history.push({
            pathname: "/dashboard/leave-request-approval-history"
            // state: { 
            //   description: v.description,
            //   education: v.education,
            //   education: v.education,
            //   experience: v.experience,
            //   image: v.image,
            //   name: v.name,
            //   skills:  v.skills
            // }
          })
        }
    
      }  
    
      toggleLinkUpdateVersion = () =>  {
        this.setState({
          setOpenUpdateVersion: !this.state.setOpenUpdateVersion
        });
    
        this.props.props.history.push({
          pathname: "/dashboard/logout"
          // state: { 
          //   description: v.description,
          //   education: v.education,
          //   education: v.education,
          //   experience: v.experience,
          //   image: v.image,
          //   name: v.name,
          //   skills:  v.skills
          // }
        })
    
      }
    
      toggleNewsNotNow = () =>  {
        this.setState({
          setOpenNews: !this.state.setOpenNews
        })
    
      }
    
      toggleNewsNow = () =>  {
        this.setState({
          setOpenNews: !this.state.setOpenNews
        });
    
        // console.log("this props", this.props);
        this.props.props.history.push({
          pathname: this.state.linkNotif
          // pathname:"/dashboard/detail-news/dexan-life/"+this.state.linkNotif
          // pathname: "/dashboard/"
          // state: { 
          //   description: v.description,
          //   education: v.education,
          //   education: v.education,
          //   experience: v.experience,
          //   image: v.image,
          //   name: v.name,
          //   skills:  v.skills
          // }
        })

        // if (isIOSDevice()) {
        //     console.log('The browser is running on Apple iOS.');
        //     let url = "https://elearning.dexagroup.com/login/ssologin.php?token="+this.state.userToken;
        //     // window.location.assign(url, '_blank');
        //     window.location.href = "https://portalmobile.dexagroup.com/dashboard/";

        // }else{
        //     window.location.href = "https://portalmobile.dexagroup.com/dashboard/";
        //     // window.open("https://elearning.dexagroup.com/login/ssologin.php?token="+this.state.userToken, '_blank');
        
        // }
    
      }


  handleClickOpen = (v) => {
    // console.log("sdsds", this.state);

    this.props.props.navs.history.push({
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

  async componentDidMount(){

    // console.log("sssss" + JSON.stringify(this.props));

    let data = localStorage.getItem("data");
    if(data !== "undefined"){
      const { bitrix, userLogin, token } = JSON.parse(data);
      console.log("bitrixdidmount",bitrix.result.data);
      this.setState({
        employeenum: bitrix.result.data.CPERSON_ID,
        email: bitrix.result.data.EMAIL,
        userid: bitrix.result.data.ID,
        cemp_no: bitrix.result.data.CEMP_NO,
        ccompany_id: bitrix.result.data.CCOMPANY_ID,
        spv_name: bitrix.result.data.SUPERVISOR_NAME,
        spv_id: bitrix.result.data.SUPERVISOR_ID,
        spv_email: bitrix.result.data.SUPERVISOR_EMAIL
      });


    }




    if (isIOSDevice()) {
      console.log('The browser is running on Apple iOS.');
    
    }else{

      // Ini untuk notification foreground //

      messaging.requestPermission()
        // .then(async function() {
        //   const token = await messaging.getToken();
        //   console.log(token);
        // })
        // .catch(function(err) {
        //   console.log("Unable to get permission to notify.", err);
        // });

        .then(() =>{
          console.log('have permission');
          return messaging.getToken();
        })
        .then((token) => {
          console.log("tokennya : "+ token);
          this.setState({
            fcmtoken:token
          });


          this.updateToken(token);



        })
        .catch((err) =>{
          console.log("error");
        });

        messaging.onMessage((payload) => 
          // console.log('Message received. ', payload.notification.title)

          this.checkPush(payload.notification.title,payload.notification.body,payload.notification.click_action)

          // this.setState({
          //   setOpen:true,
          //   titleNotif:payload.notification.title,
          //   bodyNotif:payload.notification.body,
          //   linkNotif:payload.notification.click_action
          // })

          )
        // navigator.serviceWorker.addEventListener("message", (message) => console.log(message));

      // Ini untuk notification foreground //

    }


  }


  updateToken(param,jwtToken){

    // alert(param);

    let request_date = moment().format("YYYY-MM-DD");
    let request_time = moment().format("h:mm:ss a");
    let email = this.state.email;
    let activity = param;

    let token = Base64.encode(request_date)+':'+Base64.encode(request_time)+':'+Base64.encode(email)+':'+Base64.encode(activity)+ ':' + Base64.encode(jwtToken);
    let tokenKedua = Base64.encode(token);

    let payload3 = {
      userToken: tokenKedua
    };

    let urlIattend = "https://portalmobiletest.dexagroup.com/api/token/v1.1.6/updateToken";

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


    return (
      <div>

        <Modal isOpen={this.state.setOpen} className={this.props.className} centered={true}>
          {/* <ModalHeader className="headerDialogNotification" toggle={() => this.toggle()}>Notification </ModalHeader> */}
          <ModalBody>
          <div className="listDialogNotification">
            <div className="divImgDialogNotification">
              <img className="imgDialogNotification" src="https://portalmobile.dexagroup.com/api/static/images/email.gif"></img>
            </div>

            <div className="divbodyDialogNotification">
              <h1 className="judulDialogNotification">{this.state.titleNotif}</h1>
              <p className="bodyDialogNotification">{this.state.bodyNotif}</p>
            </div>

            <div className="divulistnotification">
              <ul className="ulistnotification">
                <li className="lilistnotification_kiri"><Button className="btnNotificationkiri" onClick={() => this.toggleLeaveRequest()}>Not Now</Button></li>
                <li className="lilistnotification_kanan"><Button className="btnNotificationkanan" onClick={() => this.toggleLinkLeaveRequest()}>Go Now</Button></li>
              </ul>
            </div>

          </div>

          </ModalBody>
          {/* <ModalFooter>
            <Button color="secondary" onClick={() => this.toggle()}>Cancel</Button>
          </ModalFooter> */}
        </Modal>


        <Modal isOpen={this.state.setOpenUpdateVersion} className={this.props.className} centered={true}>
          {/* <ModalHeader className="headerDialogNotification" toggle={() => this.toggle()}>Notification </ModalHeader> */}
          <ModalBody>
          <div className="listDialogNotification">
            <div className="divImgDialogNotificationUpdateVersion">

              <div className="divImgDialogNotification">
                <img className="imgDialogNotification" src="https://portalmobile.dexagroup.com/api/static/images/notifupdate.gif"></img>
              </div>

            </div>

            <div className="divbodyDialogNotification">
              <h1 className="judulDialogNotification">{this.state.titleNotif}</h1>
              <p className="bodyDialogNotification">{this.state.bodyNotif}</p>
            </div>

            <div className="divulistnotification">
              <Button className="btnNotificationkanan" onClick={() => this.toggleLinkUpdateVersion()}>Sign Out Now</Button>
            </div>

          </div>

          </ModalBody>
          {/* <ModalFooter>
            <Button color="secondary" onClick={() => this.toggle()}>Cancel</Button>
          </ModalFooter> */}
        </Modal>


        <Modal isOpen={this.state.setOpenNews} className={this.props.className} centered={true}>
          {/* <ModalHeader className="headerDialogNotification" toggle={() => this.toggle()}>Notification </ModalHeader> */}
          <ModalBody>
          <div className="listDialogNotification">
            <div className="divImgDialogNotification">
              <img className="imgDialogNotification" src="https://i.pinimg.com/originals/30/3e/f1/303ef12fdda83daaff43f8460d27c053.gif"></img>
            </div>

            <div className="divbodyDialogNotification">
              <h1 className="judulDialogNotification">{this.state.titleNotif}</h1>
              <p className="bodyDialogNotification">{this.state.bodyNotif}</p>
            </div>

            <div className="divulistnotification">
              <ul className="ulistnotification">
                <li className="lilistnotification_kiri"><Button className="btnNotificationkiri" onClick={() => this.toggleNewsNotNow()}>Not Now</Button></li>
                <li className="lilistnotification_kanan"><Button className="btnNotificationkanan" onClick={() => this.toggleNewsNow()}>Go Now</Button></li>

              </ul>
            </div>

          </div>

          </ModalBody>
          {/* <ModalFooter>
            <Button color="secondary" onClick={() => this.toggle()}>Cancel</Button>
          </ModalFooter> */}
        </Modal>

      </div>
    );
  }
}