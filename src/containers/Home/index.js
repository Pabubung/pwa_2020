import React, { Component, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import LayoutWrapper from '../../../src/components/utility/layoutWrapper';
import Papersheet from '../../../src/components/utility/papersheet';
import {
  Row,
  FullColumn,
} from '../../../src/components/utility/rowColumn';
import Dexanlifepage from '../Home/dexanlifepage';
import SlideshowPage from '../Home/slideshowPage';
import { connect } from "react-redux";
import homeActions from "../../redux/home/actions";
import compose from 'recompose/compose';
import Loader from 'react-loader-spinner';
import Setting from '../../settings';

import axios from 'axios';
import { Base64 } from 'js-base64';
import moment from 'moment';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; 

// Bottom Nav
import BottomNavigations from '../UiElements/BottomNavigation/bottomNavigation';
import BasicTabsGS from '../TabGS/basicTabs';
import BasicTabsNews from '../TabNews/basicTabs';
import IntlMessages from '../../components/utility/intlMessages';
import ListNews from '../Home/listnews';
import Icon from "../../../src/components/uielements/icon/index.js";
import BottomNavigation, {
  BottomNavigationAction
} from "../../../src/components/uielements/bottomNavigation";
// Bottom Nav

// Basic Tabs
import PropTypes from 'prop-types';
import AppBar from '../../components/uielements/appbar';
import Tabs, { Tab } from '../../components/uielements/tabs';

import Corousel from './corousel';

function TabContainer(props) {
  return <div style={{ padding: 8 * 3 }}>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const { HOME_GET, HOME_DETAIL_LIFE_REQUEST, HOME_DETAIL_SEHAT_REQUEST } = homeActions;
const { apiUrl } = Setting;
const jwt = require('jsonwebtoken');


// const [tabs, setTabs]=useState(0);
// function randerView(){
//   switch (tabs) {
//     case 0:
//       return <div>{this.body(props)}</div>
//     case 1:
//       return <div>{this.chat(props)}</div>
//     case 2: 
//       return <div>{this.profile(props)}</div>
//     default:
//       break;
//   }
// }
class GridListExamples extends Component {
  state={
    value: 0,
    value2: 0,
    data: {},
    gs: [],
    promo: [],
    life: [],
    slideShow:[],
    loading: false
  }

  handleChange = (event, value,value2) => {
    this.setState({ value, value2 });
  };

  componentWillReceiveProps(nextProps){
    // console.log("trace here", nextProps.data.result.slideshow);
    this.setState({
      data: nextProps.data,
      loading: nextProps.data.loading,
      gs: nextProps.data.result.guesehat,
      promo: nextProps.data.result.promo,
      // life: nextProps.data.result.life,
      life: nextProps.data.result.life,
      slideShow: nextProps.data.result.slideshow
    })
  }

  componentDidMount(){
    this.props.HOME_GET();
    let data = localStorage.getItem("data");
    if(data !== "undefined"){
      const { audienceid, bitrix, userLogin } = JSON.parse(data) 
      // console.log("myleave request length", audienceid);
      this.setState({
        bannerGoApotik: apiUrl+'/api/static/images/goapotik.gif',
        emailPrivate:bitrix.result.data.PRIVATE_EMAIL,
        email:userLogin.username,
        fullname: bitrix.result.data.NAME
      });

      this.inserLog(userLogin.username);
    }
  }

  inserLog(paramEmail){
    let request_date = moment().format("YYYY-MM-DD");
    let request_time = moment().format("h:mm:ss a");
    let email = paramEmail;
    let activity = 'dashboard';
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

  ///////////////// HOME ////////////////////
  home(props){
    const { classes } = this.props;
    const { value } = this.state;
    if(this.state.life !== undefined ){
      return (
        <LayoutWrapper className="LayoutWrapper_2020">
        <Row>
          <FullColumn>
            {/* <Papersheet
              className={"dashboard_slideshow_header"} > */}
              <div>
                <h1>Ini buat selamat pagi</h1>
              </div>
            {/* </Papersheet> */}
          </FullColumn>
        </Row>

        <Row>
          <FullColumn>
            <Papersheet
              className={"dashboard_slideshow_header"} >
              <SlideshowPage slides={this.state.slideShow} {...props} />
            </Papersheet>
          </FullColumn>
        </Row>

        <Row>
          <FullColumn>
            {/* <AppBar position="static"> */}
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Coorporate" />
            <Tab label="Dexan Life" />
            <Tab label="Social" />
          </Tabs>
        {/* </AppBar> */}
        {value === 0 && <TabContainer><ListNews life={this.state.life} {...props}/></TabContainer>}
        {value === 1 && <TabContainer><ListNews life={this.state.life} {...props}/></TabContainer>}
        {value === 2 && <TabContainer><ListNews life={this.state.life} {...props}/></TabContainer>}
          </FullColumn>
        </Row>
        <Row>
          <FullColumn>
            {/* <Papersheet title={<IntlMessages id="sidebar.basictabs" />}> */}
              <h1 className="dashboard_slideshow_header_text" >Artikel GUE SEHAT</h1>
              <BasicTabsGS {...props} />
            {/* </Papersheet> */}
          </FullColumn>
        </Row>
        </LayoutWrapper>
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

  //////////////////hoMEEEEE//////////////////

  ////////////////////  chAAATTTT///////////////
  chat(props){
    const { classes } = this.props;
    const { value } = this.state;
    if(this.state.life !== undefined ){
      return (
        <LayoutWrapper className="LayoutWrapper_2020">
        <Row>
          <FullColumn>
            {/* <Papersheet
              className={"dashboard_slideshow_header"} > */}
              <div>
                <h1>Chatttttt</h1>
              </div>
            {/* </Papersheet> */}
          </FullColumn>
        </Row>
        
        </LayoutWrapper>
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
  ////////////////CHAAATTTTT//////////////////////////////

  /////////////////profileee //////////////////////
  profile(props){
    const { classes } = this.props;
    const { value } = this.state;
    if(this.state.life !== undefined ){
      return (
        <LayoutWrapper className="LayoutWrapper_2020">
        <Row>
          <FullColumn>
            {/* <Papersheet
              className={"dashboard_slideshow_header"} > */}
              <div>
                <h1>Profileeeeee</h1>
              </div>
            {/* </Papersheet> */}
          </FullColumn>
        </Row>
        </LayoutWrapper>
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
  ///////////////////////profile//////////////////////////

  ///////////////randerrrr//////////////////////////////////
  rander(props){
    const { classes } = this.props;
    const { value2 } = this.state;

    // function randerView(){
    //   switch (tabs) {
    //     case 0:
    //       return <div>{this.body(props)}</div>
    //     case 1:
    //       return <div>{this.chat(props)}</div>
    //     case 2: 
    //       return <div>{this.profile(props)}</div>
    //     default:
    //       break;
    //   }
    // }
    if(this.state.life !== undefined ){
      return (
        <div>
        {this.body(props)}
        {/* <BottomNavigation value2 ={value2} onChange={this.handleChange} showLabels>
        <BottomNavigationAction
          label="Home" 
          icon={<Icon>home</Icon>} 
        />
        <BottomNavigationAction
          label="Chat"
          icon={<Icon>forum</Icon>}
        />

        <BottomNavigationAction
          label="Profile"
          icon={<Icon>person</Icon>}
        />
      </BottomNavigation>

      {value2 === 0 && <div>{this.body(props)}</div>}
      {value2 === 1 && <TabContainer>{this.chat(props)}</TabContainer>}
      {value2 === 2 && <TabContainer>{this.profile(props)}</TabContainer>} */}
        </div>
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
  ///////////////////randerrrr./////////////////////////

  body(props){
    const { classes } = this.props;
    const { value } = this.state;

    if(this.state.life !== undefined ){

      return (
        <LayoutWrapper className="LayoutWrapper_2020">
        
        <Row>
          <FullColumn>
            {/* <Papersheet
              className={"dashboard_slideshow_header"} > */}
              <div>
                <h1>Ini buat selamat pagi</h1>
              </div>
            {/* </Papersheet> */}
          </FullColumn>
        </Row>

        {/* <Row>
          <FullColumn>
            <Papersheet
              className={"dashboard_slideshow_header"} >
              <SlideshowPage slides={this.state.slideShow} {...props} />
            </Papersheet>
          </FullColumn>
        </Row> */}

        <Row>
          <FullColumn>
            <Corousel/>
            {/* <Papersheet
              className={"dashboard_slideshow_header"} >
              <SlideshowPage slides={this.state.slideShow} {...props} />
            </Papersheet> */}
          </FullColumn>
        </Row>

        {/* <Row>
          <FullColumn>
            <Papersheet>
              <h1 className="dashboard_slideshow_header_text">Dexan Life</h1>
              <ListNews life={this.state.life} {...props} />
            </Papersheet>
          </FullColumn>
        </Row> */}

        <Row>
          <FullColumn>
            {/* <AppBar position="static"> */}
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Coorporate" />
            <Tab label="Dexan Life" />
            <Tab label="Social" />
          </Tabs>
        {/* </AppBar> */}
        {value === 0 && <TabContainer><ListNews life={this.state.life} {...props}/></TabContainer>}
        {value === 1 && <TabContainer><ListNews life={this.state.life} {...props}/></TabContainer>}
        {value === 2 && <TabContainer><ListNews life={this.state.life} {...props}/></TabContainer>}
          </FullColumn>
        </Row>

        <Row>
          <FullColumn>
            {/* <Papersheet title={<IntlMessages id="sidebar.basictabs" />}> */}
              <h1 className="dashboard_slideshow_header_text" >Artikel GUE SEHAT</h1>
              <BasicTabsGS {...props} />
            {/* </Papersheet> */}
          </FullColumn>
        </Row>

        {/* <div className="divBottom_Nav_2020">
        <BottomNavigation {...props} />
        </div> */}

        {/* <Row>
          <FullColumn>
            <Papersheet
              className={"dashboard_slideshow_header"} >
              <BottomNavigationLabel {...props} />
            </Papersheet>
          </FullColumn>
        </Row> */}

        </LayoutWrapper>
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

  bannerGoApotik = () => {

    let paramEmail = this.state.email;
    let private_paramEmail = this.state.emailPrivate;
    let request_date = moment().format("YYYY-MM-DD");
    let request_time = moment().format("h:mm:ss a");
    let email = paramEmail;
    let activity = private_paramEmail;
    let token = Base64.encode(request_date)+':'+Base64.encode(request_time)+':'+Base64.encode(email)+':'+Base64.encode(activity);
    let tokenKedua = Base64.encode(token);
    let payload3 = {
      userToken: tokenKedua
    };
  
    let urlIattend = "https://portalmobile.dexagroup.com/api/statistik/mobile/v1/insertLogGoapotik";
    const request = axios.post(urlIattend, payload3, {
    // headers: { 'Authorization': 123456 }
    })
    request
    .then(response => {
        // -Save the JWT token
        // console.log("balikan statistik",response);
        if(response.data == 'ok'){
        const ssotoken = jwt.sign({
          "email": this.state.emailPrivate,
          "fullname": this.state.fullname,
          "social_token": "portal_dexagroup",
          "login_source": "portal_dexagroup"
          }, "173X4G120UP", { expiresIn: '60d' })
          //console.log('ssotoken', ssotoken)
          let base64token = Buffer.from(ssotoken).toString('base64');
          // console.log('b64sso', base64token)
          window.open("https://www.goapotik.com/authenticated/sso/"+base64token, '_blank');
          // alert("test");
        }
  
    })
    .catch((err) => {
      //  dispatch(authError('bad login info'))
      console.log("AXIOS ERROR: ", err);
    });

  }


  render() {
    const { props } = this;
    return (
      <div className="eventlist_div_body_2020">
      {this.body(props)}

      {/* <BottomNavigation value2={value2} onChange={this.handleChange} showLabels>
        <BottomNavigationAction
          label="Home" 
          icon={<Icon>home</Icon>} 
        />
        <BottomNavigationAction
          label="Chat"
          icon={<Icon>forum</Icon>}
        />

        <BottomNavigationAction
          label="Profile"
          icon={<Icon>person</Icon>}
        />
      </BottomNavigation> */}

      {/* {value2 === 0 && <TabContainer><ListNews life={this.state.life} {...props}/></TabContainer>}
      {value2 === 1 && <TabContainer><ListNews life={this.state.life} {...props}/></TabContainer>}
      {value2 === 2 && <TabContainer><ListNews life={this.state.life} {...props}/></TabContainer>} */}

      <div className="divBottom_Nav_2020">
        <BottomNavigations {...props} />  
      </div>
      {/* {this.rander(props)} */}
      </div>
      
    );
  }
}
export default compose(connect(
  state => ({
    data:state.Home
  }),
  { HOME_GET, HOME_DETAIL_LIFE_REQUEST, HOME_DETAIL_SEHAT_REQUEST }
),withStyles())(GridListExamples);