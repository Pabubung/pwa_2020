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
import axios from 'axios';
import renderHTML from 'react-render-html';
// import { Map, Marker, GoogleApiWrapper, GoogleMapReact } from 'google-maps-react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div className="markerBuilding"><h1 className="markerBuildingText">{text}</h1></div>;

class BarcodeMenu extends Component {


  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

	constructor(props) {
		super(props);
		this.state = {
      loading: false,
      result: 'No result',
      description:'',
      height:parseInt(window.innerWidth),
      lat:'',
      lng:''
	  	}
	
	}

  
  componentWillReceiveProps(nextProps){
  
    
  }

	componentDidMount(){

    // console.log("didmount about", this.props.location.state.eventLat_long);

    var array = this.props.location.state.eventLat_long.split(',');

    // console.log("didmount about", this.props.location.state.eventLat_long + ":" + array[0]);

    this.setState({
      eventLocation:this.props.location.state.eventLocation,
      lat:array[0],
      lng:array[1]
    })
    

  } 

  onclickBack = () => {

    window.history.back();

  };

  body(){

    if(this.state.lat !== '' & this.state.lng !==''){

      return (
        <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDEt36zof2ud_EM0HYN7RGtzFBkt4nIi3k' }}
        defaultCenter={{ lat:parseInt(this.state.lat), lng: parseInt(this.state.lng) }}
        defaultZoom={this.props.zoom}
      >
        <AnyReactComponent
          lat={this.state.lat}
          lng={this.state.lng}
          text={this.state.eventLocation}
        />
      </GoogleMapReact>
      )
    }else{
      return(
        null
      )
    }

  }


  render() {
    const { classes } = this.props;
    const style = { width: '300px', height: '300px'}
    // const { value, dataCurrent, dataPass, dataMonthCurrent } = this.state;

    // console.log("dataMonthCurrent", dataMonthCurrent);

    return (

      <div className={classes.root} className="barcode_background" >

      <div className="eventBackgroundHeaderAgenda">
        <Icon className="eventJudulAgendaIcon" onClick={() => this.onclickBack()}>arrow_back</Icon> <h1 className="eventJudulAgenda">Maps</h1>

        <div className="break"></div>
      </div>

      <div style={{ height: this.state.height, padding: '2em' }}>

      {this.body()}
      
      <h1 className="spanLatLang"><b>Lat : </b>{this.state.lat} <b>Lang : </b>{this.state.lng} </h1>

      </div>

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