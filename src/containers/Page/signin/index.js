import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import signinImg from "../../../images/signup.svg";
import Button from "../../../components/uielements/button";
import authAction from "../../../redux/auth/actions";
import TextField from "../../../components/uielements/textfield";
import Scrollbars from "../../../components/utility/customScrollBar";
import SignInStyleWrapper from "./signin.style";
import { Base64 } from 'js-base64';
import { messaging } from "../../../../src/init-fcm";
import {isIOSDevice} from 'ios-detector';
import {
  //  Button, 
   Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; 

const { login } = authAction;
class SignIn extends Component {
  state = {
    redirectToReferrer: false,
    email: "",
    password: "",
    errorUsername: false,
    errorUM: "",
    errorPassword: false,
    errorPS: "",
    loading: false, 
    errorLogin: "",
    token:'',
    fcmtoken:'',
    setOpen:false,
    titleNotif:'Need Approve',
    bodyNotif:'Anya telah mengajukan untuk leave request pada tanggal 13-08-2019. Apakah anda mau mengunjunginya sekarang?',
    linkNotif:'#',
    setOpenUpdateVersion:false,
    setOpenNews:false
  };

  async componentDidMount() {

    var asliToken = "130609dankogai0BhN%671298423"
    var token = Base64.encode(asliToken);

    if (this.props.isLoggedIn ) {
      this.setState({ redirectToReferrer: true });
    }

    this.setState({
      token: token
    });

    if (isIOSDevice()) {
      console.log('The browser is running on Apple iOS.');
    
    }else{

      // Ini untuk notification foreground //

      messaging.requestPermission()
        // .then(async function() {
        //   const token = await messaging.getToken();
        //   console.log(token);
        // })
        // .catch(function(err) {
        //   console.log("Unable to get permission to notify.", err);
        // });

        .then(() =>{
          // console.log('have permission');
          return messaging.getToken();
        })
        .then((token) => {
          // console.log("tokennya : "+ token);
          this.setState({
            fcmtoken:token
          })
        })
        .catch((err) =>{
          console.log("error");
        });

        messaging.onMessage((payload) => 
          // console.log('Message received. ', payload.notification.title)

          this.checkPush(payload.notification.title,payload.notification.body,payload.notification.click_action)

          // this.setState({
          //   setOpen:true,
          //   titleNotif:payload.notification.title,
          //   bodyNotif:payload.notification.body,
          //   linkNotif:payload.notification.click_action
          // })

          )
        // navigator.serviceWorker.addEventListener("message", (message) => console.log(message));

      // Ini untuk notification foreground //

    }
  }

  componentWillReceiveProps(nextProps) { 
    // console.log("datanya",nextProps);
    this.setState({ loading: nextProps.loading, errorLogin: "" });
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true, loading: nextProps.loading });
    }

    if(nextProps.isLoggedIn === false && nextProps.loading=== false){
      this.setState({ errorLogin: "Incorrect Email Or Password", loading: nextProps.loading });
    }
  }

  checkPush(title,body,click_action){

    switch (title) {
      case "Need Approve":

        this.setState({
          setOpen:true,
          titleNotif:title,
          bodyNotif:body,
          linkNotif:click_action
        });

        break;

      case "Status Approve":

        this.setState({
          setOpen:true,
          titleNotif:title,
          bodyNotif:body,
          linkNotif:click_action
        });

        break;

      case "News Update":

        this.setState({
          setOpenNews:true,
          titleNotif:title,
          bodyNotif:body,
          linkNotif:click_action
        });

        break;

      case "Update Version":

        this.setState({
          setOpenUpdateVersion:true,
          titleNotif:title,
          bodyNotif:body,
          linkNotif:click_action
        });

    }

  }

  toggleLeaveRequest = () =>  {
    this.setState({
      setOpen: !this.state.setOpen
    })

  }

  toggleUpdateVersion = () =>  {
    this.setState({
      setOpenUpdateVersion: !this.state.setOpenUpdateVersion
    })

  }

  toggleLinkLeaveRequest = () =>  {
    this.setState({
      setOpen: !this.state.setOpen
    });

    if(this.state.titleNotif == 'Need Approve'){
      this.props.history.push({
        pathname: "/dashboard/leave-request-approval"
        // state: { 
        //   description: v.description,
        //   education: v.education,
        //   education: v.education,
        //   experience: v.experience,
        //   image: v.image,
        //   name: v.name,
        //   skills:  v.skills
        // }
      })
    }else{
      this.props.history.push({
        pathname: "/dashboard/leave-request-approval-history"
        // state: { 
        //   description: v.description,
        //   education: v.education,
        //   education: v.education,
        //   experience: v.experience,
        //   image: v.image,
        //   name: v.name,
        //   skills:  v.skills
        // }
      })
    }

  }  

  toggleLinkUpdateVersion = () =>  {
    this.setState({
      setOpenUpdateVersion: !this.state.setOpenUpdateVersion
    });

    this.props.history.push({
      pathname: "/dashboard/logout"
      // state: { 
      //   description: v.description,
      //   education: v.education,
      //   education: v.education,
      //   experience: v.experience,
      //   image: v.image,
      //   name: v.name,
      //   skills:  v.skills
      // }
    })

  }

  toggleNewsNotNow = () =>  {
    this.setState({
      setOpenNews: !this.state.setOpenNews
    })

  }

  toggleNewsNow = () =>  {
    this.setState({
      setOpenNews: !this.state.setOpenNews
    });

    this.props.history.push({
      pathname: "/dashboard/"
      // state: { 
      //   description: v.description,
      //   education: v.education,
      //   education: v.education,
      //   experience: v.experience,
      //   image: v.image,
      //   name: v.name,
      //   skills:  v.skills
      // }
    })

  }

  handleLogin = () => {

    const { login } = this.props;

    const { email, password,errorUsername,errorPS,errorPassword,errorUM, token, fcmtoken } = this.state;
    if(errorUsername === false){
      this.setState({
        loading: true
      })
      if(errorPassword === false){
        // console.log("tokennya",token);
        login({ email, password, token, fcmtoken });
      }else{
        this.setState({ 
          errorPassword: true,
          errorPS: "Invalid Password"
        });
      }
      // this.props.history.push("/dashboard");
    }else{
      this.setState({ 
        errorUsername: true,
        errorUM: "Invalid Email"
      });
    }
  };

  onChangeUsername = (event) => {
    const {value} = event.target;
    let error = false;
    let errorMessage = "";
    if(value.length < 5){
      error = true;
      errorMessage = "Invalid Email"
    } 

    this.setState({ 
      email: event.target.value,
      errorUsername: error,
      errorUM: errorMessage
    });
  }

  onChangePassword = (event) => {
    const {value} = event.target;
    let error = false;
    let errorMessage = "";

    if(value.length < 5){
      error = true;
      errorMessage = "Invalid Password"
    } 

    this.setState({ 
      password: event.target.value,
      errorPassword: error,
      errorPS: errorMessage
    });
  }

  render() {
    const from = { pathname: "/dashboard" };
    const { redirectToReferrer, email, password, errorUsername,errorPS,errorPassword,errorUM,loading } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="mateSignInPage">
        <div className="mateSignInPageImgPart">
          <div className="mateSignInPageImg">
            <img src={signinImg} alt="Kiwi standing on oval" />
          </div>
        </div>

        <div className="mateSignInPageContent">
          <Scrollbars style={{ height: "100%" }}>
            <div className="mateSignInPageGreet">
              <h1 className="judulHiDexan">Hi Dexan,</h1>
              <p>
              Selamat datang di Portal Mobile Dexagroup, silahkan masuk dengan akun email kantor anda di form login ini.
              </p>
            </div>
            <div className="mateSignInPageForm">
              <div className="mateInputWrapper">
                <TextField
                  label="Email"
                  placeholder="Email"
                  margin="normal"
                  value={email}
                  onChange={this.onChangeUsername}
                  error={errorUsername}
                  helperText={errorUM}
                />
              </div>
              <div className="mateInputWrapper">
                <TextField
                  label="Password"
                  placeholder="Password"
                  margin="normal"
                  type="Password"
                  value={password}
                  onChange={this.onChangePassword}
                  error={errorPassword}
                  helperText={errorPS}
                />
              </div>
              <div className="mateLoginSubmit">
                {
                  (loading) ? 
                  <Button type="primary" disabled>
                    Loading
                  </Button>
                  : 
                  <Button type="primary" onClick={this.handleLogin}>
                    Login
                  </Button>
                }
                
              </div>
              <p style={{ textAlign: "center", color: "red" }}>{this.state.errorLogin}</p>
            </div>
          </Scrollbars>

          <Modal isOpen={this.state.setOpen} className={this.props.className} centered={true}>
          {/* <ModalHeader className="headerDialogNotification" toggle={() => this.toggle()}>Notification </ModalHeader> */}
          <ModalBody>
          <div className="listDialogNotification">
            <div className="divImgDialogNotification">
              <img className="imgDialogNotification" src="https://portalmobile.dexagroup.com/api/static/images/email.gif"></img>
            </div>

            <div className="divbodyDialogNotification">
              <h1 className="judulDialogNotification">{this.state.titleNotif}</h1>
              <p className="bodyDialogNotification">{this.state.bodyNotif}</p>
            </div>

            <div className="divulistnotification">
              <ul className="ulistnotification">
                <li className="lilistnotification_kiri"><Button className="btnNotificationkiri" onClick={() => this.toggleLeaveRequest()}>Not Now</Button></li>
                <li className="lilistnotification_kanan"><Button className="btnNotificationkanan" onClick={() => this.toggleLinkLeaveRequest()}>Go Now</Button></li>
              </ul>
            </div>

          </div>

          </ModalBody>
          {/* <ModalFooter>
            <Button color="secondary" onClick={() => this.toggle()}>Cancel</Button>
          </ModalFooter> */}
        </Modal>


        <Modal isOpen={this.state.setOpenUpdateVersion} className={this.props.className} centered={true}>
          {/* <ModalHeader className="headerDialogNotification" toggle={() => this.toggle()}>Notification </ModalHeader> */}
          <ModalBody>
          <div className="listDialogNotification">
            <div className="divImgDialogNotificationUpdateVersion">

              <div className="divImgDialogNotification">
                <img className="imgDialogNotification" src="https://portalmobile.dexagroup.com/api/static/images/notifupdate.gif"></img>
              </div>

            </div>

            <div className="divbodyDialogNotification">
              <h1 className="judulDialogNotification">{this.state.titleNotif}</h1>
              <p className="bodyDialogNotification">{this.state.bodyNotif}</p>
            </div>

            <div className="divulistnotification">
              <Button className="btnNotificationkanan" onClick={() => this.toggleLinkUpdateVersion()}>Close</Button>
            </div>

          </div>

          </ModalBody>
          {/* <ModalFooter>
            <Button color="secondary" onClick={() => this.toggle()}>Cancel</Button>
          </ModalFooter> */}
        </Modal>

        <Modal isOpen={this.state.setOpenNews} className={this.props.className} centered={true}>
          {/* <ModalHeader className="headerDialogNotification" toggle={() => this.toggle()}>Notification </ModalHeader> */}
          <ModalBody>
          <div className="listDialogNotification">
            <div className="divImgDialogNotification">
              <img className="imgDialogNotification" src="https://portalmobile.dexagroup.com/api/static/images/email.gif"></img>
            </div>

            <div className="divbodyDialogNotification">
              <h1 className="judulDialogNotification">{this.state.titleNotif}</h1>
              <p className="bodyDialogNotification">{this.state.bodyNotif}</p>
            </div>

            <div className="divulistnotification">
              <ul className="ulistnotification">
                <li className="lilistnotification_kiri"><Button className="btnNotificationkiri" onClick={() => this.toggleNewsNotNow()}>Not Now</Button></li>
                <li className="lilistnotification_kanan"><Button className="btnNotificationkanan" onClick={() => this.toggleNewsNow()}>Go Now</Button></li>
              </ul>
            </div>

          </div>

          </ModalBody>
          {/* <ModalFooter>
            <Button color="secondary" onClick={() => this.toggle()}>Cancel</Button>
          </ModalFooter> */}
        </Modal>


        </div>
      </SignInStyleWrapper>
    );
  }
}
export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null ? true : false,
    loading:state.Auth.loading
  }),
  { login }
)(SignIn);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     