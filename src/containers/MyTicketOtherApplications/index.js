import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import BasicTabs from './basicTabs';
import { connect } from "react-redux";
import ticketActions from "../../redux/ticket/actions";
import compose from 'recompose/compose';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import { Base64 } from 'js-base64';
import moment from 'moment';
import Snackbar from './styleSnackbar';
import Slide from '@material-ui/core/Slide';
import Setting from '../../../src/settings'; 
const { apiUrlLoginIT138 } = Setting;

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
  iconRoot: {
    flexGrow: 1,
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
  scrollRoot: {
    flexGrow: 1,
    width: 'auto',
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
});

const { TICKET_LIST_REQUEST } = ticketActions;

function TransitionUp(props) {
  return <Slide direction="up" {...props} />;
}

class TabsExamples extends Component {

  state={
    data:[],
    open: false,
    transition: '',
    pesanSnackbar:'',
    loading: true
  }

  componentWillReceiveProps(nextProps){

    if(nextProps.data.result.acknowledge){
      this.setState({
        data: nextProps.data,
        loading:nextProps.data.loading
      })
    }
  }

  componentDidMount(){


    let data = localStorage.getItem("data");

    if(data !== "undefined"){
      const { it138, userLogin } = JSON.parse(data) 

      // Insert activity log //
      this.inserLog(userLogin.username);

      // console.log("myleave request length", it138);
      
      if(it138 !== ''){
        // console.log("disini");
        this.props.TICKET_LIST_REQUEST(
          {
            "email":it138.mail,
            "emp_no":it138.empno,
            "last_update": "2016-01-01 00:00:00",
            "contact_Id": it138.contactid
          }
        );

      }else{

        // console.log("disana");
        // console.log("userLogin", userLogin);
        
        var postData = {
          username : userLogin.username,
          password : userLogin.password
        };
        
  
        const request = axios.post(apiUrlLoginIT138, postData, {
        // headers: { 'Authorization': 123456 }
        })
        request
        .then(response => {
            // -Save the JWT token
            // console.log(response);

            if(response.data.acknowledge == true){


              var asd = JSON.parse(localStorage.getItem('data'));
              asd.it138 = response.data.result
              localStorage.setItem('data', JSON.stringify(asd));

              this.props.TICKET_LIST_REQUEST(
                {
                  "email":response.data.result.mail,
                  "emp_no":response.data.result.empno,
                  "last_update": "2016-01-01 00:00:00",
                  "contact_Id": response.data.result.contactid
                }
              );


            }else{

              this.setState({
                pesanSnackbar:"Parse logn IT138 failed"
              })

              this.handleClick(TransitionUp);

            }



        })
        .catch((err) => {
          //  dispatch(authError('bad login info'))
          // console.log("AXIOS ERROR: ", err);

          this.setState({
            pesanSnackbar:"Parse logn IT138 failed"
          })

          this.handleClick(TransitionUp);


        });
        
        



      }


    }


    // let data = localStorage.getItem("data")
    // if(data !== "undefined"){
    //   const { it138 } = JSON.parse(data) 
    //   this.props.TICKET_LIST_REQUEST(
    //     {
    //       "email":it138.mail,
    //       "emp_no":it138.empno,
    //       "last_update": "2016-01-01 00:00:00",
    //       "contact_Id": it138.contactid
    //     }
    //   );
    // }




  }

  inserLog(paramEmail){


    let request_date = moment().format("YYYY-MM-DD");
    let request_time = moment().format("h:mm:ss a");
    let email = paramEmail;
    let activity = 'dashboard/other-applications-my-ticket';

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


  handleClick = (transition) => {

    this.setState({ open: true, transition });
    setTimeout(() => this.handleSnackbarClose(), 3000);
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleSnackbarClose = () => {
    this.setState({
      transition:'',
      pesanSnackbar:''
    });

    this.handleRequestClose();
  }

  
  render() {
    const { props } = this;
    const {data} =this.state; 
    if(this.state.loading !== true ){
      return (
        <div>
          <BasicTabs {...props} />
          <Snackbar
            open={this.state.open}
            onClose={this.handleRequestClose}
            transition={this.state.transition}
            className="snackbarTextAlign"
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<div id="message-id"><div className="snackbarTextAlign" >{this.state.pesanSnackbar}</div></div>}
          />
        </div>
      );
    }

    return(

      <div className="my_Loading_div">
      <div>
      <Loader type="Circles" color="#somecolor" height={30} width={30} /> </div>
      <div><h1 style={{fontSize:'1em', marginLeft:'0.5em'}}>Loading ...</h1></div>

      <Snackbar
          open={this.state.open}
          onClose={this.handleRequestClose}
          transition={this.state.transition}
          className="snackbarTextAlign"
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<div id="message-id"><div className="snackbarTextAlign" >{this.state.pesanSnackbar}</div></div>}
      />

      </div>

    )

  
  }
}
export default compose(connect(
  state => ({
    data:state.Ticketing
  }),
  {TICKET_LIST_REQUEST }
),withStyles())(TabsExamples);
