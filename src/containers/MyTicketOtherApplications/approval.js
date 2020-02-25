import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Lists, {
    ListItem,
    ListItemText,
    ListItemSecondaryAction
  } from "../../../src/components/uielements/lists";
import { connect } from "react-redux";
import ticketActions from "../../redux/ticket/actions";
import compose from 'recompose/compose';
import Loader from 'react-loader-spinner';
import Icon from "../../../src/components/uielements/icon/index.js";
import Typography from '../../../src/components/uielements/typography/index.js';
import { FullScreenDialogs } from './dialogs.style';
import Toolbar from '../../../src/components/uielements/toolbar';
import Button from '../../../src/components/uielements/button';
import Slide from '@material-ui/core/Slide';
import IconButton from '../../../src/components/uielements/iconbutton/';
import StarRatings from 'react-star-ratings';
import Grid from '@material-ui/core/Grid';
import AppBar from '../../../src/components/uielements/appbar';
import { Form, TextField } from '../CreateTicketOtherApplications/textfield.style';

import Setting from '../../../src/settings'; 
import axios from 'axios';
import Snackbar from './styleSnackbar';
import { Base64 } from 'js-base64';
import moment from 'moment';

function Transition(props) {
    return <Slide direction="up" {...props} />;
  }

function TabContainer(props) {
  return <div style={{ padding: 8 * 3 }}>{props.children}</div>;
}

function TransitionUp(props) {
  return <Slide direction="up" {...props} />;
}

const { TICKET_LIST_REQUEST, TICKET_APPROVAL} = ticketActions;

const { apiUrlLoginIT138 } = Setting;

class ApprovalLeaveRequest extends Component {

  state={
    datax:[],
    open: false,
    rating: 0,
    openReTicket:false,
    closeTicket:false,
    trx: false,
    status: 0,
    message: "",
    comments: "",
    contactId: "",
    friendlyName: "",
    dataSubmit: [],
    mail: "",
    contact_Id: "",
    empno: "",
    openDialog: false,
    transition: '',
    pesanSnackbar:'',
    loading: true
  }

  componentWillReceiveProps(nextProps){

    if(nextProps.data.result.acknowledge){
      this.setState({
        datax: nextProps.data,
        loading:nextProps.data.loading
      })
    }


    this.setState({
        dataSubmit: nextProps.data
    })

  }

  handleClickOpen = (v) => {
    this.setState({ open: true, datax:v });
  };

  handleRequestClose = () => {
    this.setState({ open: false, trx: false });
  };

  handleClickOpenReTicket = (status) => {

    if(status < 1){

      this.setState({ status: status, trx: true, message: (status < 1) ? "reject" : "approve"});

    }else{

      const {datax} = this.state;
      let payload = {
          "approve":status,
          "contactId":this.state.contactId,
          "friendlyName":this.state.friendlyName,
          "message":(status < 1) ? "reject" : "approve",
          "noTicket":datax.friendlyname,
          "requestId":datax.id,
          "status":status,
          "token": localStorage.getItem("id_token")
      }
  
      this.props.TICKET_APPROVAL(payload)
      this.finishers();

    }

  };

  handleRequestCloseReTicket = () => {
    this.setState({ openReTicket: false });
  };

  handleClickOpenCloseTicket = () => {
    this.setState({ closeTicket: true });
  };

  handleRequestCloseTicket = () => {
    this.setState({ closeTicket: false });
  };


  handleClick = (transition) => {

    this.setState({ openDialog: true, transition });
    setTimeout(() => this.handleSnackbarClose(), 3000);
  };

  handleRequestClose = () => {
    // this.setState({ openDialog: false });
    this.setState({ open: false });
  };

  handleSnackbarClose = () => {
    this.setState({
      transition:'',
      pesanSnackbar:''
    });

    this.handleRequestClose();
  }

  componentDidMount(){
    // let data = localStorage.getItem("data")
    // if(data !== "undefined"){
    //   const { it138 } = JSON.parse(data) 
    //   this.setState({
    //     contactId: it138.contactid,
    //     friendlyName: it138.cn,
    //     mail: it138.mail,
    //     contact_Id: it138.contactid,
    //     emp_no: it138.empno
    // })
    //   this.props.TICKET_LIST_REQUEST(
    //     {
    //       "email":it138.mail,
    //       "emp_no":it138.empno,
    //       "last_update": "2016-01-01 00:00:00",
    //       "contact_Id": it138.contactid
    //     }
    //   );
    // }


    let data = localStorage.getItem("data");

    if(data !== "undefined"){
      const { it138, userLogin } = JSON.parse(data) 

      // insert log //
      this.inserLog(userLogin.username);

      // console.log("myleave request length", it138.length);
      
      if(it138 !== ''){
        // console.log("disini");

        this.setState({
          contactId: it138.contactid,
          friendlyName: it138.cn,
          mail: it138.mail,
          contact_Id: it138.contactid,
          emp_no: it138.empno
        })

        this.props.TICKET_LIST_REQUEST(
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
            // console.log(response);

            if(response.data.acknowledge == true){


              var asd = JSON.parse(localStorage.getItem('data'));
              asd.it138 = response.data.result
              localStorage.setItem('data', JSON.stringify(asd));

              this.setState({
                contactId: response.data.result.contactid,
                friendlyName: response.data.result.cn,
                mail: response.data.result.mail,
                contact_Id: response.data.result.contactid,
                emp_no: response.data.result.empno
              })

              this.props.TICKET_LIST_REQUEST(
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

    }




  }

  submits = () => {
    const {datax} = this.state;
    let payload = {
        "approve":this.state.status,
        "contactId":this.state.contactId,
        "friendlyName":this.state.friendlyName,
        "message":this.state.message,
        "noTicket":datax.friendlyname,
        "requestId":datax.id,
        "status":this.state.status,
        "token": localStorage.getItem("id_token")
    }

    this.props.TICKET_APPROVAL(payload)
    this.finishers()
  }

  finishers = () => {
    let data = localStorage.getItem("data")
    if(data !== "undefined"){
      const { it138 } = JSON.parse(data) 
      this.setState({
        contactId: it138.contactid,
        friendlyName: it138.cn,
        mail: it138.mail,
        emp_no: it138.empno,
        datax:[],
        open: false,
        rating: 0,
        openReTicket:false,
        closeTicket:false,
        trx: false,
        status: 0,
        message: "",
        comments: "",
    })
      this.props.TICKET_LIST_REQUEST(
        {
          "email":it138.mail,
          "emp_no":it138.empno,
          "last_update": "2016-01-01 00:00:00",
          "contact_Id": it138.contactid
        }
      );
    }
  }


  inserLog(paramEmail){


    let request_date = moment().format("YYYY-MM-DD");
    let request_time = moment().format("h:mm:ss a");
    let email = paramEmail;
    let activity = 'dashboard/approval-ticket';

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

  onclickBack = () => {
	  window.history.back();
	};
  
  render() {
    const { classes, data } = this.props;
    const { value, datax, dataSubmit } = this.state;
    if(this.state.loading !== true){
      return (
        <div>
          <div className="backtolist_div">
          <Icon className="eventJudulAgendaIcon" onClick={() => this.onclickBack()}>arrow_back</Icon> <h1 className="backtolist">Back</h1>
          <div className="break"></div>
          </div>

        <div className={classes.root} style={{ padding: 8 * 3 }} className="other_applications_my_ticket_div" >
            <Lists>
            {
              (data.result.dbResultApproval !== undefined) ?
                data.result.dbResultApproval.map((v,i) => 
                  <ListItem button onClick={() => this.handleClickOpen(v)} className="other_applications_my_ticket_ul" key={i}>
                  {/* <Avatar className="other_applications_my_ticket_avatar_satu">
                    <ul className="other_applications_my_ticket_ul_avatar">
                      <li><span className="other_applications_my_ticket_ul_avatar_tgl">12</span></li>
                      <li><span className="other_applications_my_ticket_ul_avatar_month">May</span></li>
                    </ul>
                  </Avatar> */}
                  <ListItemText className="borderList">
                    <Typography><b>{v.friendlyname}/ {v.title}</b></Typography>
                    <Typography className="other_applications_my_ticket_subtitle">{v.servicesubcategory_name}</Typography>
                    <Typography className="other_applications_my_ticket_description">{v.start_date}</Typography>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <StarRatings
                      rating={parseInt(v.user_satisfaction)}
                      starRatedColor="#fc311d"
                      starDimension="10px"
                      starSpacing="1px"
                      numberOfStars={4}
                    />
                      <Typography className="other_applications_my_ticket_right_description">{v.status}</Typography>
                    </ListItemSecondaryAction>
                </ListItem>
                )

              : null
            }

            <FullScreenDialogs
                  fullScreen
                  open={this.state.open}
                  onClose={this.handleRequestClose}
                  transition={Transition}
                >
                  <AppBar className={classes.appBar}>
                    <Toolbar
                    className="other_applications_my_ticket_dialog_header"
                    >
                      <IconButton
                        color="contrast"
                        onClick={this.handleRequestClose}
                        aria-label="Close"
                        className="dashboard_detail_page_button_close"
                      >
                      <Icon>close</Icon>
                      </IconButton>
                      <Typography type="title" color="inherit" className="dashboard_dialog_close">
                        Detail
                      </Typography>
                      <Button color="contrast" className="dashboard_dialog_save" onClick={this.handleRequestClose}>
                        Close
                      </Button>
                    </Toolbar>
                  </AppBar>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <div className={classes.root} >
                    <div className="other_applications_my_ticket_dialog_div" >
                      <h1 className="other_applications_my_ticket_dialog_detail_header">General Information</h1>
                      <ul className="other_applications_my_ticket_dialog_ul">
                        <li>
                          <Typography>No Ticket:</Typography>
                          <Typography><b>{(datax !== "") ? datax.friendlyname : ''}</b></Typography>
                        </li>
                        <li>
                          <Typography>Category:</Typography>
                          <Typography><b>{(datax !== "") ? datax.service_id_friendlyname : ''}</b></Typography>
                        </li>
                        <li>
                          <Typography>Sub Category:</Typography>
                          <Typography><b>{(datax !== "") ? datax.servicesubcategory_name : ''}</b></Typography>
                        </li>
                        <li>
                          <Typography>Title:</Typography>
                          <Typography><b>{(datax !== "") ? datax.title : ''}</b></Typography>
                        </li>   
                        <li>
                          <Typography>Description:</Typography>
                          <Typography><b>{(datax !== "") ? datax.description : ''}</b></Typography>
                        </li>
                        <li>
                          <Typography>Caller:</Typography>
                          <Typography><b>{(datax !== "") ? datax.caller_id_friendlyname : ''}</b></Typography>
                        </li> 
                        <li>
                          <Typography>Status:</Typography>
                          <Typography><b>{(datax !== "") ? datax.status : ''}</b></Typography>
                        </li>     
                        <li>
                          <Typography>Organization:</Typography>
                          <Typography><b>{(datax !== "") ? datax.org_id_friendlyname : ''}</b></Typography>
                        </li>                                                    
                      </ul>
                      
                        {
                            (this.state.trx === false) ?
                            <div>
                                <h1 className="other_applications_my_ticket_dialog_detail_header">Qualification</h1>
                                    <ul className="other_applications_my_ticket_dialog_ul">
                                        <li>
                                        <Typography>Impact:</Typography>
                                        <Typography><b>{(datax !== "") ? datax.impact : ''}</b></Typography>
                                        </li>
                                        <li>
                                        <Typography>Urgency:</Typography>
                                        <Typography><b>{(datax !== "") ? datax.urgency : ''}</b></Typography>
                                        </li> 
                                        <li>
                                        <Typography>Priority:</Typography>
                                        <StarRatings
                                            rating={(datax !== "") ? parseInt(datax.priority) : 0}
                                            starRatedColor="#fc311d"
                                            starDimension="12px"
                                            starSpacing="2px"
                                            numberOfStars={4}
                                        />
                                        </li>                       
                                    </ul>
                                    <h1 className="other_applications_my_ticket_dialog_detail_header">Dates</h1>
                                    <ul className="other_applications_my_ticket_dialog_ul">
                                        <li>
                                        <Typography>Start Date:</Typography>
                                        <Typography><b>{(datax !== "") ? datax.start_date : ''}</b></Typography>
                                        </li>
                                        <li>
                                        <Typography>Last Update:</Typography>
                                        <Typography><b>{(datax !== "") ? datax.last_update : ''}</b></Typography>
                                        </li>                   
                                        <li>
                                        <Typography>TTR Deadline:</Typography>
                                        <Typography><b>{(datax !== "") ? datax.ttr_escalation_deadline : ''}</b></Typography>
                                        </li>                             
                                    </ul>
                                    <h1 className="other_applications_my_ticket_dialog_detail_header">Contacts</h1>
                                    <ul className="other_applications_my_ticket_dialog_ul">
                                        <li>
                                        <Typography>Team:</Typography>
                                        <Typography><b>{(datax !== "") ? datax.team_id_friendlyname : '-'}</b></Typography>
                                        </li>
                                        <li>
                                        <Typography>Agent:</Typography>
                                        <Typography><b>{(datax !== "") ? datax.agent_id_friendlyname : '-'}</b></Typography>
                                        </li>
                                    </ul>
                                </div>
                            : 
                            <div>
                                <form 
                                    style={{
                                        container: {
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                        },
                                        dense: {
                                            marginTop: 19,
                                        },
                                        menu: {
                                            width: 200,
                                        }
                                    }} 
                                    noValidate autoComplete="off">
                                    <h1 className="other_applications_my_ticket_dialog_detail_header">{this.state.message.toUpperCase()}</h1>
                                    <Grid item xs={12} lg={12}>
                                        <TextField
                                            label="COMMENT"
                                            style={{ width: "100%", fontWeight: "bold" }}
                                            placeholder="Placeholder"
                                            fullWidth
                                            margin="normal"
                                            value={this.state.comments}
                                            multiline
                                            onChange={(e)=>this.setState({ comments: e.target.value })}
                                        />
                                    </Grid>
                                </form>
                            </div>

                        }
 
                      
                    </div>
                  </div>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <div className="other_applications_my_ticket_dialog_footer">
                    {
                        (this.state.trx === false) ? 
                            <div>
                                <Grid item xs={6} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
                                    <Button variant="contained" className="other_applications_my_ticket_dialog_button_reopenticket" onClick={() => this.handleClickOpenReTicket(0)}>
                                        REJECT
                                    </Button>
                                </Grid>
                                <Grid item xs={6} className="other_applications_my_ticket_dialog_closeticket_grid">
                                    <Button variant="contained" className="other_applications_my_ticket_dialog_closeticket" onClick={() => this.handleClickOpenReTicket(1)}>
                                        APPROVE
                                    </Button>
                                </Grid>
                            </div>
                        
                        : 
                        (this.state.dataSubmit.loadingSubmit === false) ?
                        <div>
                            
                            <Grid item xs={6} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
                                <Button variant="contained"  className="other_applications_my_ticket_dialog_button_reopenticket" onClick={() => this.setState({trx:false})}>
                                    CANCEL
                                </Button>
                            </Grid>
                            <Grid item xs={6} className="other_applications_my_ticket_dialog_closeticket_grid">
                                <Button variant="contained"  className="other_applications_my_ticket_dialog_closeticket" onClick={() => this.submits()}>
                                    SUBMIT
                                </Button>
                            </Grid>
                        </div>:
                        <div>
                            {console.log(this.state.dataSubmit)}
                            <Grid item xs={12} className="other_applications_my_ticket_dialog_closeticket_grid">
                                <Button variant="contained"  className="other_applications_my_ticket_dialog_closeticket" onClick={() => this.finishers()}>
                                    {
                                        (this.state.dataSubmit.loadingSubmit === true) ? "LOADING" : 
                                        (this.state.dataSubmit.acknowledge === true) ? "FINISH" : "RETRY"
                                    }
                                </Button>
                            </Grid>
                        </div>
                    }


                    </div>

                </FullScreenDialogs>


          </Lists>
          <Snackbar
              open={this.state.openDialog}
              onClose={this.handleRequestClose}
              transition={this.state.transition}
              className="snackbarTextAlign"
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<div id="message-id"><div className="snackbarTextAlign" >{this.state.pesanSnackbar}</div></div>}
            />
        </div>

        </div>
      );
    }

    return(

      <div className="my_Loading_div">
			<div>
			<Loader type="Circles" color="#somecolor" height={30} width={30} /> </div>
			<div><h1 style={{fontSize:'1em', marginLeft:'0.5em'}}>Loading ...</h1></div>

      <Snackbar
          open={this.state.openDialog}
          onClose={this.handleRequestClose}
          transition={this.state.transition}
          className="snackbarTextAlign"
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<div id="message-id"><div className="snackbarTextAlign" >{this.state.pesanSnackbar}</div></div>}
      />
			</div>
    )

  
  }
}
export default compose(connect(
  state => ({
    data:state.Ticketing
  }),
  {TICKET_LIST_REQUEST,TICKET_APPROVAL }
),withStyles())(ApprovalLeaveRequest);
