import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { Link } from 'react-router-dom';
import IntlMessages from '../../components/utility/intlMessages';
import TopbarDropdownWrapper from './topbarDropdown.style';
import {
  IconButtons,
  TopbarDropdown,
  UserInformation,
  SettingsList,
  Icon,
} from './topbarDropdown.style';
import authAction from '../../redux/auth/actions';
import Image from '../../images/user.png';
import Setting from '../../settings';
import axios from 'axios';
import { Base64 } from 'js-base64';
import moment from 'moment';

const jwt = require('jsonwebtoken');
const { logout } = authAction;
const { apiUrl } = Setting;

const theme = createMuiTheme({
  overrides: {
    MuiModal: {
      root: {
        zIndex: 1800,
      },
    },
    MuiPopover: {
      paper: {
        maxWidth: 290,
      },
    },
  },
});

class TopbarUser extends Component {
  
  state = {
    visible: false,
    anchorEl: null,
    fullname: "",
    email: "",
    position: ""
  };

  componentDidMount(){
    let data = localStorage.getItem("data")
    if(data !== "undefined"){
      const { bitrix, userLogin } = JSON.parse(data);
      
      // console.log("didmount topbar", bitrix.result.data.PRIVATE_EMAIL);
      
      this.setState({
        fullname: bitrix.result.data.NAME,
        email: bitrix.result.data.EMAIL,
        position: bitrix.result.data.PERSONAL_PROFESSION,
        // image: apiUrl+'/api/static/images/profile'+bitrix.result.data.img
        image: bitrix.result.data.img,
        logoGoApotik: apiUrl+'/api/static/images/logoObat.png',
        emailPrivate:bitrix.result.data.PRIVATE_EMAIL,
        detailname : bitrix.result.data.NAME,
        detailemail : bitrix.result.data.EMAIL,
        detailorgName : bitrix.result.data.CORG_NAME,
        detailprofession : bitrix.result.data.PERSONAL_PROFESSION,
        detailempno  : bitrix.result.data.CEMP_NO,
        detailimage : bitrix.result.data.img
      })

      // console.log("disini" + bitrix.result.data.NAME +" : "+ bitrix.result.data.PRIVATE_EMAIL);

    }


  }
  
  hide = () => {
    this.setState({ visible: false });
  };
  
  handleVisibleChange = () => {
    this.setState({
      visible: !this.state.visible,
      anchorEl: findDOMNode(this.button),
    });
  };

  detailProfile = () => {
    this.setState({
      visible: !this.state.visible,
      anchorEl: findDOMNode(this.button),
    });
  }

  bannerGoApotik = () => {

    // alert("test");

    let private_email = this.state.emailPrivate;
    let emailUser = this.state.email;

    let request_date = moment().format("YYYY-MM-DD");
    let request_time = moment().format("h:mm:ss a");
    let email = emailUser;
    let activity = private_email;

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
        }

    })
    .catch((err) => {
      //  dispatch(authError('bad login info'))
      console.log("AXIOS ERROR: ", err);

    });


  }

  render() {
    const {fullname,position} = this.state;
    const content = (
      <TopbarDropdown>

        <UserInformation>
          <div className="userImage">
            <img src={this.state.image} alt="user" />
          </div>

          <div className="userDetails">
            <h3>{fullname}</h3>
            <p>{position}</p>
          </div>
        </UserInformation>

        <SettingsList>
          {/* <a href="#!" className="dropdownLink">
            <Icon>settings</Icon>
            <IntlMessages id="themeSwitcher.settings" />
          </a>
          <a href="#!" className="dropdownLink">
            <Icon>help</Icon>
            <IntlMessages id="sidebar.feedback" />
          </a>
          <a href="#!" className="dropdownLink">
            <Icon>feedback</Icon>
            <IntlMessages id="topbar.help" />
          </a> */}
          <Link className="dropdownLink borderbawah" onClick={this.detailProfile} to={{
            pathname: '/dashboard/profile',
            state: {
              detailname : this.state.detailname,
              detailemail : this.state.detailemail,
              detailorgName : this.state.detailorgName,
              detailprofession : this.state.detailprofession,
              detailempno  : this.state.detailempno,
              detailimage : this.state.detailimage
            }
          }}>
            <Icon>account_circle</Icon>
            <IntlMessages id="Profile" />
          </Link>
          <Link className="dropdownLink borderbawah" onClick={this.detailProfile} to={{
            pathname: '/dashboard/qrcode',
            state: {
              detailname : this.state.detailname,
              detailemail : this.state.detailemail,
              detailorgName : this.state.detailorgName,
              detailprofession : this.state.detailprofession,
              detailempno  : this.state.detailempno,
              detailimage : this.state.detailimage
            }
          }}>
            <Icon>aspect_ratio</Icon>
            <IntlMessages id="QR Code" />
          </Link>
          <Link to="/" onClick={this.props.logout} className="dropdownLink">
            <Icon>input</Icon>
            <IntlMessages id="topbar.logout" />
          </Link>
        </SettingsList>
      </TopbarDropdown>
    );
    return (
      <div id="topbarUserIcon">

        <div className="divgbrGoApotik" onClick={this.bannerGoApotik}>
            <img src={this.state.logoGoApotik} alt="user" className="gbrGoApotik" />
        </div>

        <IconButtons
          ref={node => {
            this.button = node;
          }}
          onClick={this.handleVisibleChange}
        >
          <div className="userImgWrapper">
            <img src={this.state.image} alt="user" />
          </div>
        </IconButtons>

        <MuiThemeProvider theme={theme}>
          <TopbarDropdownWrapper
            open={this.state.visible}
            anchorEl={this.state.anchorEl}
            onClose={this.hide}
            // marginThreshold={66}
            className="userPopover"
            anchorOrigin={{
              horizontal: 'right',
              vertical: 'top',
            }}
            transformOrigin={{
              horizontal: 'right',
              vertical: 'bottom',
            }}
          >
            {content}
          </TopbarDropdownWrapper>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default connect(
  state => ({
    ...state.App,
    customizedTheme: state.ThemeSwitcher.topbarTheme,
  }),
  { logout }
)(TopbarUser);
