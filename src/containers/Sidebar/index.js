import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';
import Scrollbars from '../../components/utility/customScrollBar';
import IntlMessages from '../../components/utility/intlMessages';
import appActions from '../../redux/app/actions';
// import Logo from '../../images/logo.png';
import options from './options';
import Drawer, {
  LogoWrapper,
  Lists,
  ListItem,
  ListItemIcon,
  ListItemText,
  ExpandLessIcon,
  ExpandMoreIcon,
} from './style';
import axios from 'axios';
import { Base64 } from 'js-base64';
import moment from 'moment';
import {isIOSDevice} from 'ios-detector';

const { toggleCollapsed, changeOpenKeys, changeCurrent } = appActions;

let selectedTheme = {};

const ListLabel = ({ label }) => (
  <ListItemText
    // style={{ color: selectedTheme.textColor }}
    style={{ color: '#000000' }}
    inset
    primary={<IntlMessages id={label} />}
  />
);
const ListElement = ({
  leftIcon,
  label,
  children,
  optionCollapsed,
  isOpened,
  isNavTab,
}) => {
  return (
    <div className="ListItemWrapper">
      {leftIcon ? (
        <ListItemIcon 
          // style={{ color: selectedTheme.textColor }}
          style={{ color: '#000000' }}
          >
          {leftIcon}
        </ListItemIcon>
      ) : null}
      <ListLabel label={label} />
      {children && !isNavTab ? (
        optionCollapsed ? (
          <ExpandLessIcon 
          // style={{ color: selectedTheme.textColor }}
          style={{ color: '#000000' }}
          
          >
            expand_less
          </ExpandLessIcon>
        ) : (
          <ExpandMoreIcon 
          // style={{ color: selectedTheme.textColor }}
          style={{ color: '#000000' }}
          >
            expand_more
          </ExpandMoreIcon>
        )
      ) : (
        ''
      )}
    </div>
  );
};

const LogoElem = ({ onLogo }) => {
  return (
    // <Link className="linkTitle" to="/dashboard" onClick={onLogo}>
    //   {/* <img src={Logo} alt="Logo" /> */}
    //   <h1 className="judulsidebarTitle">Portal Mobile DXG</h1>
    //   <span className="judulsidebarSubTitle">Version 1.1.9</span>
    // </Link>
    <div>
      <h1 className="judulsidebarTitle">Portal Mobile DXG</h1>
      <span className="judulsidebarSubTitle">Version 1.1.9</span>
    </div>
  );
};

const stripTrailingSlash = str => {
  if (str.substr(-1) === '/') {
    return str.substr(0, str.length - 1);
  }
  return str;
};

class Sidebar extends Component {


  constructor(props) {
		super(props);
		this.state = {
      userToken:''
	  }
	
	}

  componentDidMount(){

    let data = localStorage.getItem("data");
    const { userLogin, bitrix } = JSON.parse(data) ;

    // console.log("learn",userLogin);
    var requestdate = moment().format("YYYY-MM-DD");

    let dateNow = Base64.encode(requestdate);
    let password = Base64.encode(userLogin.password);
    let name = Base64.encode(bitrix.result.data.NAME);
    let email = Base64.encode(bitrix.result.data.EMAIL);

    let asliToken = dateNow+':'+password+':'+name+':'+email;
    let token = Base64.encode(asliToken);

    this.setState({
      userToken:token,
      userEmail:userLogin.username
    })

  }


  gotoDexanLearn = () => {

      // console.log("learn token",this.state.userToken);


      let request_date = moment().format("YYYY-MM-DD");
      let request_time = moment().format("h:mm:ss a");
      let email = this.state.userEmail;
      let activity = 'Dexanlearn';

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


        if(response.data == 'ok'){

            let payload3 = {
              userToken: this.state.userToken
        
            };
            
            let urlIattend = "https://portalmobile.dexagroup.com/api/sso/v1/insertElearning";
        
            const request = axios.post(urlIattend, payload3, {
            // headers: { 'Authorization': 123456 }
            })
            request
            .then(response => {
                // -Save the JWT token
                // console.log("balikan",response);
        
                if(response.data == 'ok'){

                  if (isIOSDevice()) {
                    console.log('The browser is running on Apple iOS.');
                    let url = "https://elearning.dexagroup.com/login/ssologin.php?token="+this.state.userToken;
                    window.location.assign(url, '_blank');

                  }else{

                    window.open("https://elearning.dexagroup.com/login/ssologin.php?token="+this.state.userToken, '_blank');
                  
                  }

                  // window.location.href = "https://elearning.dexagroup.com/fpp/login/ssologin.php?token="+this.state.userToken;
                }else{
                  console.log("respon tidak oke");
                }
        
        
        
            })
            .catch((err) => {
              //  dispatch(authError('bad login info'))
              console.log("AXIOS ERROR: ");
        
              // this.setState({
              //   pesanSnackbar:"Parse login iattend failed", err
              // })
        
        
        
            });
        
        
            // // alert("sss");
            // window.location.href = "http://elearning.dexagroup.com/login/ssologin.php";

        }else{
            console.log("Error insert log");
        }


      })
      .catch((err) => {
        //  dispatch(authError('bad login info'))
        console.log("AXIOS ERROR: ", err);

      });



  };


  handleClick = () => {};
  onLogo = () => {
    const { changeOpenKeys, changeCurrent, toggleCollapsed } = this.props;
    changeOpenKeys({});
    changeCurrent({});
    toggleCollapsed();
  };
  render() {
    const {
      changeOpenKeys,
      openKeys,
      collapsed,
      changeCurrent,
      current,
      anchor,
      height,
      customizedTheme,
      toggleCollapsed,
      fixedNavbar,
      view,
    } = this.props;
    selectedTheme = customizedTheme;
    const scrollheight = height;
    const url = stripTrailingSlash(this.props.url);
    const menuItem = option => {
      // console.log(option)
      const { key, children, isNavTab } = option;
      const optionCollapsed = children && openKeys[key] === true;
      const isOpened = openKeys[key] === true;
      const linkTo = option.withoutDashboard ? `/${key}` : `${url}/${key}`;
      const collapsedClick = () => {
        if (children && !isNavTab) {
          changeOpenKeys({ [key]: !optionCollapsed });
        } else {
          changeCurrent({ [key]: !optionCollapsed });
        }
      };

      return (

        <div key={key}>
          {children && !isNavTab ? (
            <ListItem
              button
              onClick={collapsedClick}
              className={optionCollapsed ? 'expands' : ''}
            >
              <ListElement
                {...option}
                isOpened={isOpened}
                optionCollapsed={optionCollapsed}
              />
            </ListItem>
          ) : (

            <ListItem
              className={current[key] ? 'selected' : ''}
              onClick={collapsedClick}
            >

              {linkTo !== '/dashboard/dexan-learn' ? 
              
              <Link to={linkTo} onClick={toggleCollapsed}>
                <ListElement
                  {...option}
                  isOpened={isOpened}
                  optionCollapsed={optionCollapsed}
                />
              </Link>
              
               : 

               <a onClick={() => this.gotoDexanLearn()}>
                <ListElement
                  {...option}
                  isOpened={isOpened}
                  optionCollapsed={optionCollapsed}
                />
              </a>
               
               }
               

            </ListItem>
          )}
          {optionCollapsed && !isNavTab ? (
            <Collapse in={true} timeout={200} unmountOnExit>
              {children.map(menuItem)}
            </Collapse>
          ) : (
            ''
          )}
        </div>
      );
    };
    return (
      <Drawer
        variant={
          view !== 'TabLandView' && view !== 'DesktopView'
            ? undefined
            : fixedNavbar
              ? 'permanent'
              : undefined
        }
        open={!collapsed}
        onClose={toggleCollapsed}
        anchor={anchor}
        transitionDuration={100}
        className={`${collapsed && 'collapsed'} ${fixedNavbar && 'f1x3dnAV'}`}
      >
        <div
          className="drawerInner"
          style={{ background: "#ffffff" }}
        >
          <LogoWrapper style={{backgroundColor:'#ffffff', boxShadow:'none', borderBottom:'1px solid #cccccc'}}>
            <LogoElem onLogo={this.onLogo} />
          </LogoWrapper>
          <Scrollbars style={{ height: scrollheight - 64 }}>
            <Lists>{options.map(menuItem)}</Lists>
          </Scrollbars>
        </div>
      </Drawer>
    );
  }
}

export default connect(
  state => ({
    ...state.App,
    customizedTheme: state.ThemeSwitcher.sidebarTheme,
  }),
  { toggleCollapsed, changeOpenKeys, changeCurrent }
)(Sidebar);
