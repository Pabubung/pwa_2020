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
import iattendAgendaActions from "../../redux/iattendAgenda/actions";
import AgendaList from '../../../src/components/agendaList';

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

const { IATTENDAGENDA_LIST_REQUEST } = iattendAgendaActions;

class BottomNavigationExample extends Component {

  constructor(props) {
		super(props);
		this.state = {

        eventCreated_by: '',
        eventDate: '',
        eventDate_created: '',
        eventDate_end: '',
        eventDate_updated: '',
        eventDescription: '',
        eventId: '',
        eventImage: '',
        eventLat_long: '',
        eventLocation: '',
        eventName:''
	  	}
	
  }
  

  onclickAgenda = (v) => {
    console.log("sdsds");

    // this.props.navs.history.push({
    //   pathname: "/dashboard/eventlist-dashboard",
    //   state: { 
    //     eventname: "asd",eventId: 123
    //   }
    // })

  };

  onclickBack = () => {

    window.history.back();

  };


  componentWillReceiveProps(nextProps){

    if(nextProps.data.result.length === undefined){

      // console.log("sss",nextProps);
      // console.log("ini", nextProps.data.result.byDate);
      this.setState({
        dataAgenda:nextProps.data.result.byDate,
        loading:nextProps.data.loading
      })
    }
  
  }

	componentDidMount(){

    // console.log("this props agenda", this.props);

    this.setState({
      eventCreated_by: this.props.location.state.eventCreated_by,
      eventDate: this.props.location.state.eventDate,
      eventDate_created: this.props.location.state.eventDate_created,
      eventDate_end: this.props.location.state.eventDate_end,
      eventDate_updated: this.props.location.state.eventDate_updated,
      eventDescription: this.props.location.state.eventDescription,
      eventId: this.props.location.state.eventId,
      eventImage: this.props.location.state.eventImage,
      eventLat_long: this.props.location.state.eventLat_long,
      eventLocation: this.props.location.state.eventLocation,
      eventName: this.props.location.state.eventName
    })

    this.props.IATTENDAGENDA_LIST_REQUEST(
			{
			  "eventId":this.props.location.state.eventId
			}
		);


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
  
  render() {
    const { props } = this;
    const { classes } = this.props;
    const { dataAgenda } = this.state;
 
    // console.log("dataAgenda", dataAgenda);
    return (

      <div className={classes.root} className="other_applications_my_ticket_div" >

          <div className="eventBackgroundHeaderAgenda">
          <Icon className="eventJudulAgendaIcon" onClick={() => this.onclickBack()}>arrow_back</Icon> <h1 className="eventJudulAgenda">Agenda</h1>
          <div className="break"></div>
          </div>

          <div className="eventlist_dashboard_div">
          <Lists>

            {
              (dataAgenda !== undefined) ?
              
              Object.keys(this.getMappedData(dataAgenda)).map((data, i) => (
              <AgendaList eventList={this.getMappedData(dataAgenda)[data]} date={data} jumlah={dataAgenda[dataAgenda.length - 1].id} nav={this.props.navigation} {...this.props} />
              ))

              : null
            }

          </Lists>
          </div>

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
	  data:state.IattendAgendaRequest
	}),
	{IATTENDAGENDA_LIST_REQUEST}
  ),withStyles())(BottomNavigationExample);
