import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '../../../src/components/uielements/appbar';
import Tabs, { Tab } from '../../../src/components/uielements/tabs';

import Lists, {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction
} from "../../../src/components/uielements/lists";
import Avatar from "../../../src/components/uielements/avatars/";
import Icon from "../../../src/components/uielements/icon/index.js";
import Typography from '../../../src/components/uielements/typography/index.js';
import { FullScreenDialogs } from './dialogs.style';
import Toolbar from '../../../src/components/uielements/toolbar';
import Button from '../../../src/components/uielements/button';
import vegetables from '../../../src/images/vegetables.jpg';
import Slide from '@material-ui/core/Slide';
import IconButton from '../../../src/components/uielements/iconbutton/';
import StarRatings from 'react-star-ratings';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
 
import iattendActions from "../../redux/iattend/actions";
import EventList from '../../../src/components/eventList';
import axios from 'axios';
import { Base64 } from 'js-base64';
import moment from 'moment';
import Snackbar from './styleSnackbar';
import Select from 'react-select';

const { IATTENDHOME_LIST_REQUEST } = iattendActions;

const techCompanies = [];

function TabContainer(props) {
  return <div style={{ padding: 8 * 3 }}>{props.children}</div>;
}

function TransitionUp(props) {
  return <Slide direction="up" {...props} />;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

let arrMonth=[];

class BasicTabs extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data:[],
      loading: true,
      value: 0,
      open: false,
      titleCurrentJan:'',
      titleCurrentFeb:'',
      titleCurrentMar:'',
      titleCurrentApr:'',
      titleCurrentMei:'',
      titleCurrentJun:'',
      titleCurrentJul:'',
      titleCurrentAgu:'',
      titleCurrentSep:'',
      titleCurrentOkt:'',
      titleCurrentNov:'',
      titleCurrentDes:'',

      dataCurrentJan:'',
      dataCurrentFeb:'',
      dataCurrentMar:'',
      dataCurrentApr:'',
      dataCurrentMei:'',
      dataCurrentJun:'',
      dataCurrentJul:'',
      dataCurrentAgu:'',
      dataCurrentSep:'',
      dataCurrentOkt:'',
      dataCurrentNov:'',
      dataCurrentDes:'',
      transition: '',
      pesanSnackbar:'',
      datakategori:[],
      valueKategori:[],
      namelocation:''
      }
      

      this.reloadEvents = this.reloadEvents.bind(this);
      this.handleChangeNameLocation = this.handleChangeNameLocation.bind(this);
	
	}



  
  componentWillReceiveProps(nextProps){

    if(nextProps.data.result.length === undefined){

      // console.log("sss",nextProps);
      // console.log("ini", nextProps.data.result);
      this.setState({
      dataCurrent: nextProps.data.result.current,
      dataMonthCurrent:this.getMappedData(nextProps.data.result.current),
      dataPass: nextProps.data.result.past,
      loading:nextProps.data.loading
      })

    }
  
    
  }

	componentDidMount(){

    this.reloadEvents();

		let data = localStorage.getItem("data")
		// if(data !== "undefined"){
		//   const { bitrix } = JSON.parse(data) 

    //   // console.log("trac", bitrix);

		//   // this.setState({
		// 	// authorIdLogin : bitrix.result.data.ID
		//   // });

		//   // console.log("getitem", bitrix);
		//   this.props.IATTENDHOME_LIST_REQUEST(
		// 	{
		// 	  "email":bitrix.result.data.EMAIL
		// 	  // "emp_no":"IU016060058",
		// 	  // "last_update": "2016-01-01 00:00:00",
		// 	  // "contact_Id": "8174"
		// 	}
		//   );
    // }
    

    if(data !== "undefined"){

      const { audienceid, bitrix, userLogin } = JSON.parse(data) 

      // Insert log //
      this.inserLog(userLogin.username);

      // console.log("myleave request length", audienceid);
      
      if(audienceid !== ''){
        // console.log("disini");

        this.props.IATTENDHOME_LIST_REQUEST(
        {
          "email":bitrix.result.data.EMAIL
        });

      }else{

        // console.log("disana", userLogin);
        // console.log("userLogin", userLogin);
        
        let payload3 = {
          userPassword: userLogin.password,
          userEmail: userLogin.username,
          userName: bitrix.result.data.NAME,
          userCompany: bitrix.result.data.CCOMPANY_ID,
          userPhone: bitrix.result.data.PERSONAL_MOBILE,
          userJabatan: bitrix.result.data.PERSONAL_PROFESSION

        };
        
        let urlIattend = "https://eventapp.dexagroup.com/apipwaIattend_registerevent";
  
        const request = axios.post(urlIattend, payload3, {
        // headers: { 'Authorization': 123456 }
        })
        request
        .then(response => {
            // -Save the JWT token
            // console.log("balikan",response);

            if(response.data.acknowledge){


              var asd = JSON.parse(localStorage.getItem('data'));
              asd.audienceid = response.data.datanya[0].id
              localStorage.setItem('data', JSON.stringify(asd));

              this.props.IATTENDHOME_LIST_REQUEST(
              {
                  "email":bitrix.result.data.EMAIL
              });


            }else{

              this.setState({
                pesanSnackbar:"Parse login iattend failed"
              })

              this.handleClick(TransitionUp);

            }



        })
        .catch((err) => {
          //  dispatch(authError('bad login info'))
          // console.log("AXIOS ERROR: ", err);

          this.setState({
            pesanSnackbar:"Parse login iattend failed", err
          })

          this.handleClick(TransitionUp);


        });
        


      }


    }



  } 

  handleChange = (event, value) => {
    this.setState({ value });
    let data = localStorage.getItem("eventKategori");



    // setTimeout(
    //   function() {
    //       this.reloadEvents(2)
    //       this.setState({valueKategori: data});
    //   }
    //   .bind(this),
    //   3000
    // );

    
    // alert(data);

  };




  getMappedData(data){
    let arr={};
    let monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];  
    data.forEach(function(each) {
      let d=each.date;
      let key=monthNames[parseInt(d.slice(5,7))-1]+'-'+d.slice(0,4);
      if(!arr[key]) arr[key]=[];
      arr[key].push(each);
      }); 
    return arr;
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

  inserLog(paramEmail){


    let request_date = moment().format("YYYY-MM-DD");
    let request_time = moment().format("h:mm:ss a");
    let email = paramEmail;
    let activity = 'dashboard/eventlist-home';

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


 handleSearchLocation= value => {

    let kategori_awal = this.state.valueKategori;
    let jumlah_kategori_awal = Object.keys(kategori_awal).length;

    // console.log("inputanya",jumlah_kategori_awal);

    if(jumlah_kategori_awal == 0){
      
      let kategori = 5;
      let location = this.state.namelocation;
  
    
      let payload3 = {
        idkategori: kategori,
        location:location
      };
  
  
      let urlIattend = "https://eventapp.dexagroup.com/apieventkategoriInput";
  
      const request = axios.post(urlIattend, payload3, {
      // headers: { 'Authorization': 123456 }
      })
      request
      .then(response => {
          // -Save the JWT token
          // console.log("balikan statistik kategori",response.data.all);
  
          this.setState({
            dataCurrent: response.data.all,
            dataMonthCurrent:this.getMappedData(response.data.all),
            })
  
          // response.data.all.forEach(function(element) {
          //   console.log(element);
          //   techCompanies.push({ label: element.nama_kategori, value: element.id })
          // });
  
  
      })
      .catch((err) => {
        //  dispatch(authError('bad login info'))
        console.log("AXIOS ERROR: ", err);
  
      });

    }else{


      console.log("inputanya bawah",kategori_awal.value);
      let kategori = kategori_awal.value;
      let location = this.state.namelocation;
  
      // console.log("inputnya",kategori[0].value);
    
      let payload3 = {
        idkategori: kategori,
        location:location
      };
  
  
      let urlIattend = "https://eventapp.dexagroup.com/apieventkategoriInput";
  
      const request = axios.post(urlIattend, payload3, {
      // headers: { 'Authorization': 123456 }
      })
      request
      .then(response => {
          // -Save the JWT token
          console.log("balikan statistik kategori",response.data.all);
  
          this.setState({
            dataCurrent: response.data.all,
            dataMonthCurrent:this.getMappedData(response.data.all),
            })
  
          // response.data.all.forEach(function(element) {
          //   console.log(element);
          //   techCompanies.push({ label: element.nama_kategori, value: element.id })
          // });
  
  
      })
      .catch((err) => {
        //  dispatch(authError('bad login info'))
        console.log("AXIOS ERROR: ", err);
  
      });

    }


 }

 handleChangeNameLocation(event) {

  console.log("name loca",event.target.value);
  this.setState({namelocation: event.target.value});
 }


 reloadEvents(paramEmail){

  // console.log("param email" + paramEmail.value);

  if(paramEmail == undefined ){
    paramEmail = 'all';

    let payload3 = {
      idkategori: paramEmail
    };

    // let request_date = moment().format("YYYY-MM-DD");
    // let request_time = moment().format("h:mm:ss a");
    // let email = paramEmail;
    // let activity = 'dashboard/eventlist-home';

    // let token = Base64.encode(request_date)+':'+Base64.encode(request_time)+':'+Base64.encode(email)+':'+Base64.encode(activity);



    let urlIattend = "https://eventapp.dexagroup.com/apieventkategori";

    const request = axios.post(urlIattend, payload3, {
    // headers: { 'Authorization': 123456 }
    })
    request
    .then(response => {
        // -Save the JWT token
        // console.log("balikan statistik",response.data.all);

        response.data.all.forEach(function(element) {
          console.log(element);
          techCompanies.push({ label: element.nama_kategori, value: element.id })
        });


    })
    .catch((err) => {
      //  dispatch(authError('bad login info'))
      console.log("AXIOS ERROR: ", err);

    });


  }else{

    // console.log("param email" + JSON.stringify(paramEmail));

    localStorage.setItem("eventKategori",paramEmail.label);

    this.setState({
      valueKategori:paramEmail
    })


    let payload3 = {
      idkategori: paramEmail.value
    };

    // let request_date = moment().format("YYYY-MM-DD");
    // let request_time = moment().format("h:mm:ss a");
    // let email = paramEmail;
    // let activity = 'dashboard/eventlist-home';

    // let token = Base64.encode(request_date)+':'+Base64.encode(request_time)+':'+Base64.encode(email)+':'+Base64.encode(activity);



    let urlIattend = "https://eventapp.dexagroup.com/apigetlisteventkategori";

    const request = axios.post(urlIattend, payload3, {
    // headers: { 'Authorization': 123456 }
    })
    request
    .then(response => {
        // -Save the JWT token
        // console.log("balikan statistik kategori",response.data.all);

        this.setState({
          dataCurrent: response.data.all,
          dataMonthCurrent:this.getMappedData(response.data.all),
          })

        // response.data.all.forEach(function(element) {
        //   console.log(element);
        //   techCompanies.push({ label: element.nama_kategori, value: element.id })
        // });


    })
    .catch((err) => {
      //  dispatch(authError('bad login info'))
      console.log("AXIOS ERROR: ", err);

    });


  }

} 


  render() {
    const { classes } = this.props;
    const { value, dataCurrent, dataPass, dataMonthCurrent } = this.state;

    // console.log("dataMonthCurrent", dataMonthCurrent);

    return (
      <div className={classes.root} className="other_applications_my_ticket_div" >
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} className="other_applications_my_ticket_header_tab">
            <Tab label="Current & Upcoming" className="MuiPrivateTabIndicatorcolorSecondary" />
            <Tab label="Past" />
          </Tabs>
        </AppBar>

        {value === 0 && <TabContainer>
          <span>Kategori event : </span> <br/>
          <Select 
          defaultValue={this.state.valueKategori}
          className="listkategoriEvents"
          onChange={this.reloadEvents}
          options={ techCompanies }
          >
          </Select> 
          <span>Location : </span> <br/>
          <input type="text" name="namelocation" style={{width:"100%", padding:"5px", paddingLeft:"10px", marginBottom:"10px"}} onChange={this.handleChangeNameLocation}/>
          <Button variant="contained" className="create_leave_request_button_cancel" onClick={this.handleSearchLocation}>
                Search
          </Button>
          <br/><br/>
          <Lists>

            {
              (dataCurrent !== undefined) ?
              
              Object.keys(this.getMappedData(this.state.dataCurrent)).map((data, i) => (
              <EventList eventList={this.getMappedData(this.state.dataCurrent)[data]} date={data} jumBaris="12" nav={this.props.navigation} {...this.props} scrolldata="current"/>
              ))

              : null
            }

          </Lists>



        </TabContainer>}
        {value === 1 && <TabContainer>

          <Lists>
            {
              (dataPass !== undefined) ?
              
              Object.keys(this.getMappedData(this.state.dataPass)).map((data, i) => (
              <EventList eventList={this.getMappedData(this.state.dataPass)[data]} date={data} jumBaris="12" nav={this.props.navigation} {...this.props} scrolldata="past"/>
              ))

              : null
            }
          </Lists>

        </TabContainer>}

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
} 

BasicTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default BasicTabs;

export default compose(connect(
	state => ({
	  data:state.IattendHomeRequest
	}),
	{IATTENDHOME_LIST_REQUEST}
  ),withStyles())(BasicTabs);