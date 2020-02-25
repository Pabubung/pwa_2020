import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import LayoutWrapper from '../../../src/components/utility/layoutWrapper';
import Papersheet, {
  DemoWrapper
} from '../../../src/components/utility/papersheet';
// import { Row,FullColumn } from '../../../src/components/utility/rowColumn';
import BottomNavigation from './bottomNavigation';
import BottomNavigationLabel from './bottomNavigationLabel';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import Icon from "../../../src/components/uielements/icon/index.js";
import iattendPollingActions from "../../redux/iattendPolling/actions";
import AgendaList from '../../../src/components/agendaList';
import Typography from '../../../src/components/uielements/typography';
import axios from 'axios';
import Snackbar from './styleSnackbar';
import Slide from '@material-ui/core/Slide';

import Lists, {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction
} from "../../../src/components/uielements/lists";
import moment from 'moment';

const styles = {
  root: {
    width: 500
  },
};

const { IATTENDPOLLING_LIST_REQUEST } = iattendPollingActions;

function TransitionUp(props) {
	return <Slide direction="up" {...props} />;
}

class BottomNavigationExample extends Component {

  constructor(props) {
		super(props);
		this.state = {
        audienceid:'',
        pesanSnackbar:'',
        transition: '',
        open:false,
        result:''
	  	}
	
  }
  

  handleClickOpen = (v) => {

    // console.log("handleClickOpen", v);
		// console.log("handleClickOpen", this.props);


    // Kita check dulu pollingnya udah pernah diisi atau belum

    var postData = {
      audienceId: this.state.audienceid,
      agendaId : v.agendaId,
      eventId : v.eventId,
      pollingNumber:v.pollingNumber
    };


    const request = axios.post("https://eventapp.dexagroup.com/apipwa_polling_cek", postData, {
    headers: { 'Authorization': 123456 }
    })
    request
    .then(response => {
      // -Save the JWT token
      // console.log("balikannya",response.data.statusPolling);

      if(response.data.statusPolling == 'tidak ada'){

        this.props.history.push({
          pathname: "/dashboard/eventlist-agenda-menu-polling-detail",
          state: { 
            agendaId: v.agendaId,
            eventId: v.eventId,
            pollingNumber: v.pollingNumber,
            pollingQuestion:v.pollingQuestion
          }
        })

      }else{
        
        this.handleClick(TransitionUp,"Maaf, Sebelumnya Anda sudah pernah melakukan submit untuk polling ini");

      }


    })
    .catch((err) => {
      //  dispatch(authError('bad login info'))
      console.log("AXIOS ERROR: ", err);
    });


  };


  onclickBack = () => {

    window.history.back();

  };

  componentWillReceiveProps(nextProps){

    if(nextProps.data.result.length === undefined){

      // console.log("sss",nextProps);
      // console.log("ini", nextProps.data.result.byDate);
      this.setState({
        dataPolling:nextProps.data.result.datanya.byListPolling,
        loading:nextProps.data.loading
      })
    }
  
  }

	componentDidMount(){

    // console.log("this props polling", this.props); 

    let data = localStorage.getItem("data");
		if(data !== "undefined"){
			  const { audienceid } = JSON.parse(data) 


        this.setState({
          audienceid:audienceid
        })
    
        this.props.IATTENDPOLLING_LIST_REQUEST(
          {
            "eventId":this.props.location.state.eventId,
            "agendaId":this.props.location.state.agendaId
          }
        );
		  
		}




  } 

  getMappedData(data){

    // console.log("getMappedagendaData", data);
    let arr={};
    // monthNames = ["January", "February", "March", "April", "May", "June",
    // "July", "August", "September", "October", "November", "December"
    // ];  
    data.forEach(function(each) {

      // let d=each.eventDescription;
      // let key=monthNames[parseInt(d.slice(5,7))-1]+'-'+d.slice(0,4);
      let key = moment(each.time).format('h:mm A'); 
      // console.log("trace anya", arr[key]);
      if(!arr[key]) arr[key]=[];
      arr[key].push(each);
      }); 

      
    return arr;
  }

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
    const { props } = this;
    const { classes } = this.props;
    const { dataPolling } = this.state;
 
    // console.log("dataAgenda", dataAgenda);
    return (

      <div className={classes.root} className="other_applications_my_ticket_div" >

          <div className="eventBackgroundHeaderAgenda">
          <Icon className="eventJudulAgendaIcon" onClick={() => this.onclickBack()}>arrow_back</Icon> <h1 className="eventJudulAgenda">Polling</h1>
          <div className="break"></div>
          </div>

          <div className="eventlist_dashboard_div">
          <Lists>

            {
              (dataPolling !== undefined) ?
              
                dataPolling.map((item, index, key)=>(
                // console.log("Looping datanya : "+ index),

                <ListItem 
                key={index}
                className="eventlist_ul"
                button onClick={() => this.handleClickOpen(item)} 
                >
                  <ListItemText className="borderList">
                  <Typography className="my_approval_leaverequest">Polling {index + 1}.</Typography>
                  <Typography className="other_applications_my_ticket_description">{item.pollingQuestion}</Typography>

                </ListItemText>
                </ListItem>


                ))

              : null
            }

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

// export default withStyles(styles)(BottomNavigationExample);

BottomNavigationExample.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default BottomNavigationExample;

export default compose(connect(
	state => ({
	  data:state.IattendPollingRequest
	}),
	{IATTENDPOLLING_LIST_REQUEST}
  ),withStyles())(BottomNavigationExample);
