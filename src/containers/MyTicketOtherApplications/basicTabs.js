import React from 'react';
import PropTypes, { string } from 'prop-types';
import AppBar from '../../components/uielements/appbar';
import Tabs, { Tab } from '../../components/uielements/tabs';

import Lists, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "../../components/uielements/lists";
import { connect } from "react-redux";
import ticketActions from "../../redux/ticket/actions";
import Icon from "../../components/uielements/icon/index.js";
import Typography from '../../components/uielements/typography/index.js';
import { FullScreenDialogs } from './dialogs.style';
import Toolbar from '../../components/uielements/toolbar';
import Button from '../../components/uielements/button';
import Slide from '@material-ui/core/Slide';
import IconButton from '../../components/uielements/iconbutton';
import StarRatings from 'react-star-ratings';
import Grid from '@material-ui/core/Grid';
 
function TabContainer(props) {
  return <div style={{ padding: 8 * 3 }}>{props.children}</div>;
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
const { TICKET_OPEN_TICKET, TICKET_OPEN, TICKET_LIST_REQUEST, TICKET_CLOSE } = ticketActions;

class BasicTabs extends React.Component {
  state = {
    value: 0,
    open: false,
    openReTicket:false,
    closeTicket:false,
    datax:'',
    message: '',
    actives:{},
    token:'',
    "contactId":'',
    "friendlyName":'',
    "message":"",
    "noTicket":"",
    "requestId":'',
    "requestType":"incident",
    rating: 1
  };

  componentDidMount(){
    let data = localStorage.getItem("data")
    let token = localStorage.getItem("token")
    this.setState({
      token: token
    })
    if(data !== "undefined"){
        const { it138 } = JSON.parse(data) 
        // console.log(it138);
        this.setState({
          contactId: it138.contactid,
          friendlyName: it138.cn,
          mail: it138.mail,
          contact_Id: it138.contactid,
          emp_no: it138.empno
      })
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleClickOpen = (v) => {
    this.setState({ open: true, datax:v });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleClickOpenReTicket = (datax) => {
    this.setState({
      "noTicket":datax.friendlyname,
      "requestId":datax.id,
      "requestType":"incident",
      openReTicket: true
    })

  };

  handleRequestCloseReTicket = () => {
    this.setState({ openReTicket: false });
  };

  onStarClick(nextValue, prevValue, name) {
    // console.log(nextValue)
    this.setState({rating: nextValue});
  }

  handleRequestSubmitReTicket = () => {
    let payload={
      "contactId":this.state.contactId,
      "friendlyName":this.state.friendlyName,
      "message":this.state.message,
      "noTicket":this.state.noTicket,
      "requestId":this.state.requestId,
      "requestType":"incident",
      "token":localStorage.getItem("id_token")
    }

    this.props.TICKET_OPEN(payload)

    let data = localStorage.getItem("data")

    if(data !== "undefined"){
        const { it138 } = JSON.parse(data) 
        this.props.TICKET_LIST_REQUEST(
          {
            "email":it138.mail,
            "emp_no":it138.empno,
            "last_update": "2016-01-01 00:00:00",
            "contact_Id": it138.contactid
          }
        );
    }

  };


  handleClickOpenCloseTicket = (datax) => {
    this.setState({
      "noTicket":datax.friendlyname,
      "requestId":datax.id,
      "requestType":"incident",
      closeTicket: true
    })
  };

  handleRequestCloseTicket = () => {
    this.setState({ closeTicket: false });
  };

  handleRequestSubmitCloseTicket = () => {
    let payload={
      "contactId":this.state.contactId,
      "friendlyName":this.state.friendlyName,
      "user_comment":this.state.message,
      "noTicket":this.state.noTicket,
      "requestId":this.state.requestId,
      "user_satisfaction": this.state.rating,
      "requestType":"incident",
      "token":localStorage.getItem("id_token")
    }

    this.props.TICKET_CLOSE(payload)

    let data = localStorage.getItem("data")

    if(data !== "undefined"){
        const { it138 } = JSON.parse(data) 
        this.props.TICKET_LIST_REQUEST(
          {
            "email":it138.mail,
            "emp_no":it138.empno,
            "last_update": "2016-01-01 00:00:00",
            "contact_Id": it138.contactid
          }
        );
    }

  };

  changeRating = ( newRating, name ) => {
    // console.log(newRating)
    this.setState({
      rating: newRating
    });
  }

  render() {
    const { classes, data } = this.props;
    const { value, datax } = this.state;
    return (
      <div className={classes.root} className="other_applications_my_ticket_div" >
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} className="other_applications_my_ticket_header_tab">
            <Tab label="User Request" className="MuiPrivateTabIndicatorcolorSecondary" />
            <Tab label="Incident" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>
          <Lists>
            {
              (data.result.dbResultUrf !== undefined) ?
                data.result.dbResultUrf.map((v,i) => 
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
                  <ListItemSecondaryAction className="liststrat_othermyticket">
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
                  </div>



                </FullScreenDialogs>


          </Lists>



        </TabContainer>}
        {value === 1 && <TabContainer>

          <Lists>
  
          {
              (data.result.dbResultIncident !== undefined) ?
                data.result.dbResultIncident.map((v,i) => 
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
                      rating={v.user_satisfaction !== null ? parseInt(v.user_satisfaction) : 0 }
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
                      <h1 className="other_applications_my_ticket_dialog_detail_header">Dates</h1>
                      <ul className="other_applications_my_ticket_dialog_ul">
                        <li>
                          <Typography>Start Date:</Typography>
                          <Typography><b>{(datax !== "") ? datax.start_date : ''}</b></Typography>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <div className="other_applications_my_ticket_dialog_footer" >
                    {
                      datax.status !== "pending" ?
                      <div>
                        <Grid item xs={6} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
                          <Button variant="contained" className="other_applications_my_ticket_dialog_button_reopenticket" onClick={() => this.handleClickOpenReTicket(datax)}>
                            Reopen Ticket
                          </Button>
                        </Grid>
                        <Grid item xs={6} className="other_applications_my_ticket_dialog_closeticket_grid">
                          <Button variant="contained" className="other_applications_my_ticket_dialog_closeticket" onClick={() => this.handleClickOpenCloseTicket(datax)}>
                            Close Ticket
                          </Button>
                        </Grid>
                      </div>
                    : null
                    }

 
                  </div>

                </FullScreenDialogs>



                {/* Ini untuk open ticket fullscreendialogs */}


                <FullScreenDialogs
                  fullScreen
                  open={this.state.openReTicket}
                  onClose={this.handleRequestCloseReTicket}
                  transition={Transition}
                >
                  <AppBar className={classes.appBar}>
                    <Toolbar
                    className="other_applications_my_ticket_dialog_header"
                    >
                      <IconButton
                        color="contrast"
                        onClick={this.handleRequestCloseReTicket}
                        aria-label="Close"
                        className="dashboard_detail_page_button_close"
                      >
                      <Icon>close</Icon>
                      </IconButton>
                      <Typography type="title" color="inherit" className="dashboard_dialog_close">
                        Reopen Ticket
                      </Typography>
                      <Button color="contrast" className="dashboard_dialog_save" onClick={this.handleRequestSubmitReTicket}>
                        <Icon className="rightIcon">send</Icon>
                      </Button>
                    </Toolbar>
                  </AppBar>
                  <br/>
                  <br/>
                  {/* <br/> */}
                  <div className={classes.root} >
                    <div className="other_applications_my_ticket_dialog_div" >
                      <h1 className="other_applications_my_ticket_dialog_detail_header_reopen">No Ticket : <b>{this.state.noTicket}</b></h1>
                      <textarea 
                            rows="4"
                            placeholder="Please type comment here ..."
                            className="other_applications_my_ticket_dialog_comment_box"
                            onChange={(e) => this.setState({ message: e.target.value })}
                        >

                      </textarea>

                    </div>
                  </div>

                </FullScreenDialogs>


                {/* Ini untuk akhir opent ticket fullscreendialogs */}


                {/* Ini untuk close ticket fullscreendialogs */}


                <FullScreenDialogs
                  fullScreen
                  open={this.state.closeTicket}
                  onClose={this.handleRequestCloseTicket}
                  transition={Transition}
                >
                  <AppBar className={classes.appBar}>
                    <Toolbar
                    className="other_applications_my_ticket_dialog_header"
                    >
                      <IconButton
                        color="contrast"
                        onClick={this.handleRequestCloseTicket}
                        aria-label="Close"
                        className="dashboard_detail_page_button_close"
                      >
                      <Icon>close</Icon>
                      </IconButton>
                      <Typography type="title" color="inherit" className="dashboard_dialog_close">
                        Close Ticket
                      </Typography>
                      <Button color="contrast" className="dashboard_dialog_save" onClick={this.handleRequestSubmitCloseTicket}>
                        <Icon className="rightIcon">send</Icon>
                      </Button>
                    </Toolbar>
                  </AppBar>
                  <br/>
                  <br/>
                  {/* <br/> */}
                  <div className={classes.root} >
                    <div className="other_applications_my_ticket_dialog_div" >
                      <ul className="other_applications_my_ticket_dialog_detail_ul_close_ticket">
                      <li className="other_applications_my_ticket_dialog_detail_li_close_ticket">
                        <Typography type="title" color="inherit" className="dashboard_dialog_typograph">
                          No Ticket : 
                        </Typography>
                        <Typography>
                          <b>{this.state.noTicket}</b>
                        </Typography>
                      </li>
                        <li className="other_applications_my_ticket_dialog_detail_li_close_ticket">
                          <Typography type="title" color="inherit" className="dashboard_dialog_typograph">
                            Please set <b>Rating</b> for this ticket :
                          </Typography>
                          <StarRatings
                            rating={this.state.rating}
                            starRatedColor="#fc311d"
                            starDimension="15px"
                            starSpacing="2px"
                            numberOfStars={4}
                            
                            changeRating={this.changeRating}
                          />
                        </li>
                        <li>
                          <Typography type="title" color="inherit" className="dashboard_dialog_typograph">
                          Comment :
                          </Typography>
                          <textarea 
                              rows="4"
                              placeholder="Please type comment here ..."
                              className="other_applications_my_ticket_dialog_comment_box"
                              onChange={(e) => this.setState({ message: e.target.value })}>
                              
                          </textarea>
                        </li>
                      </ul>

                    </div>
                  </div>

                </FullScreenDialogs>


                {/* Ini untuk akhir close ticket fullscreendialogs */}



          </Lists>

        </TabContainer>}
      </div>
    );
  }
}

BasicTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  state => ({
    data:state.Ticketing
  }),
  { TICKET_OPEN, TICKET_LIST_REQUEST, TICKET_CLOSE}
)(BasicTabs);
                