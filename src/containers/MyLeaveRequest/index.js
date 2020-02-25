import React from 'react';
import PropTypes from 'prop-types';
import Typography from '../../../src/components/uielements/typography';
import Icon from '../../../src/components/uielements/icon/index.js';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '../../../src/components/uielements/expansionPanel';
import { connect } from "react-redux";
import leaveActions from "../../redux/leaveRequest/actions";
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Loader from 'react-loader-spinner';
import Avatar from "../../../src/components/uielements/avatars/";
import Lists, {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction
} from "../../../src/components/uielements/lists";

import { Button } from "./button.style";
import Setting from '../../../src/settings'; 
import axios from 'axios';
import { Base64 } from 'js-base64';
import moment from 'moment';
import Snackbar from './styleSnackbar';
import Slide from '@material-ui/core/Slide'; 

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; 
import { messaging } from "../../../src/init-fcm";
import {isIOSDevice} from 'ios-detector';

const { LEAVE_LIST_REQUEST } = leaveActions;
const { apiUrlLoginIT138 } = Setting;

function TransitionUp(props) {
  return <Slide direction="up" {...props} />;
}

class ControlledExpansionPanels extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
      data:[],
      annual_balance:'',
      annual_limit:'',
      annual_valid:'',
      patternity_balance:'',
      patternity_limit:'',
      patternity_valid:'',
      marriage2_balance:'',
      marriage2_limit:'',
      marriage2_valid:'',
      death_balance:'',
      death_limit:'',
      death_valid:'',
      death2_balance:'',
      death2_limit:'',
      death2_valid:'',
      circumcise_balance:'',
      circumcise_limit:'',
      circumcise_valid:'',
      hajj_balance:'',
      hajj_limit:'',
      hajj_valid:'',
      open: false,
      transition: '',
      pesanSnackbar:'',
      loading: true,
      setOpen:false,
      titleNotif:'Need Approve',
      bodyNotif:'Anya telah mengajukan untuk leave request pada tanggal 13-08-2019. Apakah anda mau mengunjunginya sekarang?',
      linkNotif:'#',
      setOpenUpdateVersion:false
  
    };

    this.routeChange = this.routeChange.bind(this);
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
      transition:'',
      pesanSnackbar:''
    });

    this.handleRequestClose();
  }

  routeChange = () => {
    // console.log(this.state.balance)
    let path = `leave-request-create`;

    this.props.history.push({
      pathname: path,
      state: { 
        sisa_annual: this.state.balance[0],
        sisa_circumcise: this.state.balance[1],
        sisa_death : this.state.balance[2],
        sisa_death2 : this.state.balance[3],
        sisa_hajj: this.state.balance[4],
        sisa_marriage2: this.state.balance[5],
        sisa_patternity: this.state.balance[6]
      }
    });

  }

  componentWillReceiveProps(nextProps){

    let data_balance = [];

    if(nextProps.data.result !== undefined){

      this.setState({
        data: nextProps.data.result.dbResultLeaveInfo,
        loading:nextProps.data.loading
      })

    }

    if(nextProps.data.result.dbResultLeaveInfo !== undefined){
      
      nextProps.data.result.dbResultLeaveInfo.map((item, index, key)=>(
        // console.log("Looping datanya : "+ index),
        // console.log("traceloading", item.LEAVE_BALANCE)
        data_balance.push(item.LEAVE_BALANCE)
        // this.setState({
        //   annual_balance:item.LEAVE_BALANCE[0],
        // })
        // <ListItem 
        // key={index}
        // className="eventlist_ul">
        //   <Avatar className="eventlist_ul_avatar">
        //   <ul className="other_applications_my_ticket_ul_avatar">
        //     <li><span className="other_applications_my_ticket_ul_avatar_tgl">{item.LEAVE_NAME.charAt(0)}</span></li>
        //   </ul>
        //   </Avatar>
        //     <ListItemText className="borderList">
        //     <Typography><b>{item.LEAVE_NAME}</b></Typography>
        //     <Typography className="other_applications_my_ticket_description_balance">Leave Balance = {item.LEAVE_BALANCE}</Typography>
        //     <Typography className="other_applications_my_ticket_description">Valid to {item.VALID_TO}</Typography>
        //   </ListItemText>
        //   <Typography className="eventlist_div_body_description">Max Taken = {item.INCIDENTAL_LIMIT}</Typography>
        // </ListItem>


        )
      )
      

    }

    this.setState({balance:data_balance});
 
  }

  componentDidMount(){

    let data = localStorage.getItem("data");

    if(data !== "undefined"){
      const { it138, userLogin } = JSON.parse(data) 

      // insert log 
      this.inserLog(userLogin.username);

      // console.log("myleave request length", it138.length);
      
      if(it138 !== ''){
        // console.log("disini");
        this.props.LEAVE_LIST_REQUEST(
          {
            "email":it138.mail,
            "emp_no":it138.empno,
            "last_update": "2016-01-01 00:00:00",
            "contact_Id": it138.contactid
          }
        );
      }else{

        // console.log("disana");
        // console.log("userLogin", userLogin);
        
        var postData = {
          username : userLogin.username,
          password : userLogin.password
        };
        
  
        const request = axios.post(apiUrlLoginIT138, postData, {
        // headers: { 'Authorization': 123456 }
        })
        request
        .then(response => {
            // -Save the JWT token
            // console.log("login it138"+ response);

            if(response.data.acknowledge == true){




              var asd = JSON.parse(localStorage.getItem('data'));
              asd.it138 = response.data.result
              localStorage.setItem('data', JSON.stringify(asd));

              this.props.LEAVE_LIST_REQUEST(
                {
                  "email":response.data.result.mail,
                  "emp_no":response.data.result.empno,
                  "last_update": "2016-01-01 00:00:00",
                  "contact_Id": response.data.result.contactid
                }
              );


            }else{

              this.setState({
                pesanSnackbar:"Parse logn IT138 failed"
              })

              this.handleClick(TransitionUp);

            }



        })
        .catch((err) => {
          //  dispatch(authError('bad login info'))
          // console.log("AXIOS ERROR: ", err);

          this.setState({
            pesanSnackbar:"Parse logn IT138 failed"
          })

          this.handleClick(TransitionUp);


        });
        
        



      }

      // this.props.LEAVE_LIST_REQUEST(
      //   {
      //     "email":it138.mail,
      //     "emp_no":it138.empno,
      //     "last_update": "2016-01-01 00:00:00",
      //     "contact_Id": it138.contactid
      //   }
      // );
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
          // console.log('have permission');
          return messaging.getToken();
        })
        .then((token) => {
          // console.log("tokennya : "+ token);
          this.setState({
            fcmtoken:token
          })
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

    this.props.history.push({
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

  }  

  toggleLinkUpdateVersion = () =>  {
    this.setState({
      setOpenUpdateVersion: !this.state.setOpenUpdateVersion
    });

    this.props.history.push({
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


  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  floating(){
    if(this.state.loading !== true ){
      return (
        <div className="eventlist_floating_button">
        <Button variant="fab" color="primary" aria-label="add" className="eventlist_floating_button_inset" onClick={() =>this.routeChange()}>
          <Icon>add</Icon>
        </Button>
        </div>
      )
    }

  }

  body(classes,expanded){
    if(this.state.loading !== true ){

      return(

        this.state.data.map((item, index, key)=>(
          // console.log("Looping datanya : "+ index),

          <ListItem 
          key={index}
          className="eventlist_ul">
            <Avatar className="eventlist_ul_avatar">
            <ul className="other_applications_my_ticket_ul_avatar">
              <li><span className="other_applications_my_ticket_ul_avatar_tgl">{item.LEAVE_NAME.charAt(0)}</span></li>
            </ul>
            </Avatar>
              <ListItemText className="borderList">
              <Typography><b>{item.LEAVE_NAME}</b></Typography>
              <Typography className="other_applications_my_ticket_description_balance">Leave Balance = {item.LEAVE_BALANCE}</Typography>
              <Typography className="other_applications_my_ticket_description">Valid to {item.VALID_TO}</Typography>
            </ListItemText>
            <Typography className="eventlist_div_body_description">Max Taken = {item.INCIDENTAL_LIMIT}</Typography>
          </ListItem>


          )
        )


      )
    }else{
      return (
        <div className="my_Loading_div">
        <div>
        <Loader type="Circles" color="#somecolor" height={30} width={30} /> </div>
        <div><h1 style={{fontSize:'1em', marginLeft:'0.5em'}}>Loading ...</h1></div>
        </div>
      );
    }
  }

  inserLog(paramEmail){


    let request_date = moment().format("YYYY-MM-DD");
    let request_time = moment().format("h:mm:ss a");
    let email = paramEmail;
    let activity = 'dashboard/leave-request-list';

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
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className="eventlist_div_body">
        {this.body(classes,expanded)}
        {this.floating()}

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

      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(connect(
  state => ({
    data:state.LeaveRequest
  }),
  {
    LEAVE_LIST_REQUEST
   }
),withStyles())(ControlledExpansionPanels);
