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


class BarcodeMenu extends Component {

	constructor(props) {
		super(props);
		this.state = {
      loading: false,
      result: 'No result',
      description:''
	  	}
	
	}

  
  componentWillReceiveProps(nextProps){
  
    
  }

	componentDidMount(){

    // console.log("didmount about", this.props);

    this.setState({
      description:this.props.location.state.eventDescription
    })
    

  } 

  onclickBack = () => {

    window.history.back();

  };



  render() {
    const { classes } = this.props;
    // const { value, dataCurrent, dataPass, dataMonthCurrent } = this.state;

    // console.log("dataMonthCurrent", dataMonthCurrent);

    return (
      <div className={classes.root} className="barcode_background" >

          <div className="eventBackgroundHeaderAgenda">
            <Icon className="eventJudulAgendaIcon" onClick={() => this.onclickBack()}>arrow_back</Icon> <h1 className="eventJudulAgenda">About</h1>

            <div className="break"></div>
          </div>

          <div className="eventlist_dashboard_div">
            {renderHTML(this.state.description)}
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