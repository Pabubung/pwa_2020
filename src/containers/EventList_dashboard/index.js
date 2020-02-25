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
import Icon from "../../../src/components/uielements/icon/index.js";

const styles = {
  root: {
    width: 500
  },
};


class BottomNavigationExample extends Component {

  constructor(props) {
		super(props);
		this.state = {
        judul:'',
        place:'',
        time:'',

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
    // console.log("onclickAgenda", v);

    this.props.history.push({
      pathname: "/dashboard/eventlist-agenda",
      state: { 
        eventCreated_by: v.location.state.eventCreated_by,
        eventDate: v.location.state.eventDate,
        eventDate_created: v.location.state.eventDate_created,
        eventDate_end: v.location.state.eventDate_end,
        eventDate_updated: v.location.state.eventDate_updated,
        eventDescription: v.location.state.eventDescription,
        eventId: v.location.state.eventId,
        eventImage: v.location.state.eventImage,
        eventLat_long: v.location.state.eventLat_long,
        eventLocation: v.location.state.eventLocation,
        eventName:v.location.state.eventName
      }
    })

  };

  onclickSpeaker = (v) => {
    // console.log("sdsds");

    this.props.history.push({
      pathname: "/dashboard/eventlist-speaker",
      state: { 
        eventCreated_by: v.location.state.eventCreated_by,
        eventDate: v.location.state.eventDate,
        eventDate_created: v.location.state.eventDate_created,
        eventDate_end: v.location.state.eventDate_end,
        eventDate_updated: v.location.state.eventDate_updated,
        eventDescription: v.location.state.eventDescription,
        eventId: v.location.state.eventId,
        eventImage: v.location.state.eventImage,
        eventLat_long: v.location.state.eventLat_long,
        eventLocation: v.location.state.eventLocation,
        eventName:v.location.state.eventName
      }
    });

  }

  onclickSponsor = (v) => {
    // console.log("sdsds",v);

    this.props.history.push({
      pathname: "/dashboard/eventlist-sponsor",
      state: { 
        eventCreated_by: v.location.state.eventCreated_by,
        eventDate: v.location.state.eventDate,
        eventDate_created: v.location.state.eventDate_created,
        eventDate_end: v.location.state.eventDate_end,
        eventDate_updated: v.location.state.eventDate_updated,
        eventDescription: v.location.state.eventDescription,
        eventId: v.location.state.eventId,
        eventImage: v.location.state.eventImage,
        eventLat_long: v.location.state.eventLat_long,
        eventLocation: v.location.state.eventLocation,
        eventName:v.location.state.eventName
      }
    });

  }

  onclickAbout = (v) => {
    // console.log("sdsds");

    this.props.history.push({
      pathname: "/dashboard/eventlist-about",
      state: { 
        eventCreated_by: v.location.state.eventCreated_by,
        eventDate: v.location.state.eventDate,
        eventDate_created: v.location.state.eventDate_created,
        eventDate_end: v.location.state.eventDate_end,
        eventDate_updated: v.location.state.eventDate_updated,
        eventDescription: v.location.state.eventDescription,
        eventId: v.location.state.eventId,
        eventImage: v.location.state.eventImage,
        eventLat_long: v.location.state.eventLat_long,
        eventLocation: v.location.state.eventLocation,
        eventName:v.location.state.eventName
      }
    })

  }

  onclickBarcode = (v) => {
    // console.log("sdsds");

    this.props.history.push({
      pathname: "/dashboard/eventlist-barcode",
      state: { 
        eventCreated_by: v.location.state.eventCreated_by,
        eventDate: v.location.state.eventDate,
        eventDate_created: v.location.state.eventDate_created,
        eventDate_end: v.location.state.eventDate_end,
        eventDate_updated: v.location.state.eventDate_updated,
        eventDescription: v.location.state.eventDescription,
        eventId: v.location.state.eventId,
        eventImage: v.location.state.eventImage,
        eventLat_long: v.location.state.eventLat_long,
        eventLocation: v.location.state.eventLocation,
        eventName:v.location.state.eventName
      }
    });


  }

  onclickAttend = (v) => {
    // console.log("sdsds");

    this.props.history.push({
      pathname: "/dashboard/eventlist-attend",
      state: { 
        eventCreated_by: v.location.state.eventCreated_by,
        eventDate: v.location.state.eventDate,
        eventDate_created: v.location.state.eventDate_created,
        eventDate_end: v.location.state.eventDate_end,
        eventDate_updated: v.location.state.eventDate_updated,
        eventDescription: v.location.state.eventDescription,
        eventId: v.location.state.eventId,
        eventImage: v.location.state.eventImage,
        eventLat_long: v.location.state.eventLat_long,
        eventLocation: v.location.state.eventLocation,
        eventName:v.location.state.eventName
      }
    });
  }

  onclickMaps = (v) => {
    // console.log("onclickMaps", v );

    this.props.history.push({
      pathname: "/dashboard/eventlist-maps",
      state: { 
        eventCreated_by: v.location.state.eventCreated_by,
        eventDate: v.location.state.eventDate,
        eventDate_created: v.location.state.eventDate_created,
        eventDate_end: v.location.state.eventDate_end,
        eventDate_updated: v.location.state.eventDate_updated,
        eventDescription: v.location.state.eventDescription,
        eventId: v.location.state.eventId,
        eventImage: v.location.state.eventImage,
        eventLat_long: v.location.state.eventLat_long,
        eventLocation: v.location.state.eventLocation,
        eventName:v.location.state.eventName
      }
    })

  }

	componentDidMount(){

    // console.log("this props", this.props);

    this.setState({
      judul: this.props.location.state.eventName,
      place: this.props.location.state.eventLocation,
      time: this.props.location.state.eventDate,
    })


  } 
  
  render() {
    const { props } = this;
    return (

      <div>
          <div className="eventBackgroundHeader">
            <h1 className="eventJudulAtas">{this.state.judul}</h1>
            <h1 className="eventPlaceAtas">{this.state.place}</h1>
            <h1 className="eventTimeAtas">{this.state.time}</h1>
          </div>

          <div className="eventlist_dashboard_div">
          <Container>
              <Row>
              <Col className="colGrid" onClick={() => this.onclickAgenda(this.props)}>
                <Icon>calendar_today</Icon><br/>
                Agenda
              </Col>
              <Col className="colGrid" onClick={() => this.onclickSpeaker(this.props)}>
                <Icon>account_box</Icon><br/>
                Speaker
              </Col>
              <Col className="colGrid" onClick={() => this.onclickSponsor(this.props)}>
                <Icon>card_giftcard</Icon><br/>
                Sponsor
              </Col>
              </Row>        

              <Row>
              <Col className="colGrid" onClick={() => this.onclickAbout(this.props)}>
                <Icon>announcement</Icon><br/>
                About
              </Col>
              <Col className="colGrid" onClick={() => this.onclickBarcode(this.props)}>
                <Icon>chrome_reader_mode</Icon><br/>
                Barcode Scan
              </Col>
              <Col className="colGrid" onClick={() => this.onclickAttend(this.props)}>
                <Icon>vertical_split</Icon><br/>
                Attend List
              </Col>
              </Row>

              <Row>
              <Col className="colGrid" onClick={() => this.onclickMaps(this.props)}>
                <Icon>touch_app</Icon><br/>
                Maps
              </Col>
              <Col>

              </Col>
              <Col>

              </Col>
              </Row>
          </Container>
          </div>
      </div>
      
    );
  }
}
export default withStyles(styles)(BottomNavigationExample);
