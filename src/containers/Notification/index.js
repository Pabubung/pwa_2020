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
      <div className="other_applications_my_ticket_div" >
          {/* <FullScreenDialogs
                  fullScreen
                  open={this.state.closeTicket}
                  onClose={this.handleRequestCloseTicket}
                  transition={Transition}
                > */}
                  <AppBar >
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
                  <div  >
                    <div className="other_applications_my_ticket_dialog_div" >
                      <ul className="other_applications_my_ticket_dialog_detail_ul_close_ticket">
                      <li className="other_applications_my_ticket_dialog_detail_li_close_ticket">
                        <Typography type="title" color="inherit" className="dashboard_dialog_typograph">
                          Page Login 
                        </Typography>
                        <Typography>
                          <b>{this.state.noTicket}</b>
                        </Typography>
                      </li>
                      </ul>
                    </div>
                  </div>
                {/* </FullScreenDialogs> */}
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
                