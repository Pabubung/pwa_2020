import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '../../../src/components/uielements/typography/index.js';
import { Form, TextField } from './textfield.style';
import { MenuItem } from '../../../src/components/uielements/menus';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { Button, Input } from './button.style';
import {
  TimePicker,
  DatePicker,
} from '../../../src/components/uielements/materialUiPicker';
import moment from 'moment';
import { connect } from "react-redux";
import createleaveactions from "../../redux/leaveCreateRequest/actions";
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from './styleSnackbar';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';
import { Base64 } from 'js-base64';

const { CREATE_LEAVE_LIST_REQUEST } = createleaveactions;

const absencetypeArray = [];

// const absencetypeArray = [
//     {
//         value: '0',
//         label: 'Not Set',
//     },
//     {
//         value: '1263',
//         label: 'Annual',
//     },
//     {
//       value: '1264',
//       label: 'Marriage',
//     },
//     {
//       value: '1265',
//       label: 'Death',
//     },
//     {
//       value: '1266',
//       label: 'Death2',
//     },
//     {
//       value: '1267',
//       label: 'Sick',
//     },
//     {
//       value: '1268',
//       label: 'Hajj',
//     },
//     {
//       value: '1269',
//       label: 'Training',
//     },
//     {
//       value: '1270',
//       label: 'Dinas Luar',
//     },
//     {
//       value: '1454',
//       label: 'Keluar Kantor'
//     },
//     {
//       value: '2234',
//       label: 'CIRCUMCISE'
//     },
//     {
//       value: '2235',
//       label: 'MATERNITY'
//     },
//     {
//       value: '2236',
//       label: 'BAPTISM'
//     },
//     {
//       value: '2237',
//       label: 'PATERNITY'
//     },
//     {
//       value: '2238',
//       label: 'MISCARRIAGE'
//     } 
//   ];

  const halfdayArray = [
    // {
    //   value: '0',
    //   label: 'Not Set',
    // },
    // {
    //     value: '1452',
    //     label: 'No',
    // },
    // {
    //     value: '1451',
    //     label: 'Yes',
    // }
    {
      value: 'No',
      label: 'No',
    },
    {
        value: 'Yes',
        label: 'Yes',
    }
  ];

  const ampmArray = [
    // {
    //   value: '0',
    //   label: 'Not Set',
    // },
    {
        value: 'AM',
        label: 'AM',
    },
    {
        value: 'PM',
        label: 'PM',
    }
  ];

  const starttimeArray = [
    {
      value: 0,
      label: 'Not Set',
    },
    {
      value: '08:00',
      label: '08:00',
    },
    {
      value: '09:00',
      label: '09:00',
    },
    {
      value: '10:00',
      label: '10:00',
    },
    {
      value: '11:00',
      label: '11:00',
    },
    {
      value: '12:00',
      label: '12:00',
    },
    {
      value: '13:00',
      label: '13:00',
    },
    {
      value: '14:00',
      label: '14:00',
    },
    {
      value: '15:00',
      label: '15:00',
    },
    {
      value: '16:00',
      label: '16:00',
    },
    {
      value: '17:00',
      label: '17:00',
    },
  ];


  function TransitionUp(props) {
    return <Slide direction="up" {...props} />;
  }

class BasicTabs extends React.Component {

    constructor (props, context) {
        super(props, context);
        this.state = {
            absencetype:'0',
            halfday:'No',
            starttime:'0',
            ampm:'AM',
            title:'',
            selectedDate: null,
            // selectedDateEnd: moment().format('MM/DD/YYYY'),
            selectedDateEnd: null,
            minDate: moment().toDate(),
            halfday_div:false,
            starttime_div:false,
            ampm_div:false,
            btnValue:0,
            reason:'',
            open: false,
            transition: '',
            loading:false,
            employeenum:'',
            email:'',
            userid:'',
            cemp_no:'',
            ccompany_id:'',
            disabledEndDate:true,
            sisacuti:'0',
            pesansnackbar:'Sukses'
        };

    }
    

  
    componentDidMount(){

      // console.log("didmount" + JSON.stringify(this.props.location.state));
      absencetypeArray.length = 0;

      let data = localStorage.getItem("data");
      if(data !== "undefined"){
        const { bitrix, userLogin } = JSON.parse(data);
        // console.log("bitrixdidmount",bitrix.result.data);
        this.setState({
          employeenum: bitrix.result.data.CPERSON_ID,
          email: bitrix.result.data.EMAIL,
          userid: bitrix.result.data.ID,
          cemp_no: bitrix.result.data.CEMP_NO,
          ccompany_id: bitrix.result.data.CCOMPANY_ID,
          spv_name: bitrix.result.data.SUPERVISOR_NAME,
          spv_id: bitrix.result.data.SUPERVISOR_ID,
          spv_email: bitrix.result.data.SUPERVISOR_EMAIL
        });

        // console.log(bitrix.result.data.LEAVE_TYPE.KEY);

        absencetypeArray.push({ value : '0', label : 'NOT SET' });


        var str = bitrix.result.data.LEAVE_TYPE.KEY;
        var str_array = str.split(',');

        for(var i = 0; i < str_array.length; i++) {
          // Trim the excess whitespace.
          // str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
          // Add additional code here, such as:
          if(str_array[i] !=""){
            absencetypeArray.push({ value :  str_array[i], label :  str_array[i] });
          }
          
        }

        absencetypeArray.push({ value : 'KELUAR KANTOR', label : 'KELUAR KANTOR' });


        this.inserLog(userLogin.username);

      }

    }

    componentWillReceiveProps(nextProps){

      // console.log("balikan post", nextProps.data.loading);

      this.setState({
        loading:nextProps.data.loading
      })

      if(!nextProps.data.loading){
  
        // console.log("balikan post result", nextProps.data.result);

        if(nextProps.data.result){

          this.setState({
            pesansnackbar:'Pengajuan berhasil dilakukan',
          })
          this.handleClickSukses(TransitionUp);

        }
  
      }
  
    }


    inserLog(paramEmail){


      let request_date = moment().format("YYYY-MM-DD");
      let request_time = moment().format("h:mm:ss a");
      let email = paramEmail;
      let activity = 'dashboard/leave-request-create';
  
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

    handleClickSukses = (transition) => {

    this.setState({ open: true, transition });
    setTimeout(() => this.handleSnackbarClose(), 3000);
    };

    handleClick = (transition) => {

      this.setState({ open: true, transition });
      setTimeout(() => this.handleSnackbarStartDateClose(), 3000);
    };

    handleSnackbarStartDateClose = () => {
      this.setState({
        // selectedDate: null,
        transition:''
      });

      this.handleRequestClose();
    } 

    handleClickEndDate = (transition) => {

      this.setState({ open: true, transition });
      setTimeout(() => this.handleSnackbarEndDateClose(), 3000);
    };

    handleSnackbarEndDateClose = () => {
      this.setState({
        // selectedDateEnd: null,
        transition:''
      });

      this.handleRequestClose();
    } 
  
    handleRequestClose = () => {
      this.setState({ open: false });
    };   

    handleSnackbarClose = () => {
      this.setState({
        btnValue: '0',
        absencetype:'0',
        halfday:'No',
        starttime:'0',
        ampm:'AM',
        // selectedDate: moment().format('MM/DD/YYYY'),
        selectedDate: null,
        selectedDateEnd: null,
        minDate: moment().toDate(),
        halfday_div:false,
        starttime_div:false,
        ampm_div:false,
        reason:'',
        transition:'',
        sisacuti:0
      });

      this.handleRequestClose();
    }

    handleDateChange = date => {
  
      let payload3 = {
        email: this.state.email,
        startDate: moment(date).format("YYYY-MM-DD")
        
  
      };
  
      let urlIattend = "https://portalmobile.dexagroup.com/api/ees/v1.1.4/cekStartDateLeaveRequest";
  
      const request = axios.post(urlIattend, payload3, {
      // headers: { 'Authorization': 123456 }
      })
      request
      .then(response => {
          // -Save the JWT token
          // console.log("balikan datechange",response.data.data.result.data);

          if(response.data.data.result.data !== false){

            this.setState({
              selectedDate:null,
              pesansnackbar:'Pengajuan sudah pernah dilakukan',
              disabledEndDate:true
            })
            this.handleClick(TransitionUp);

          }else{



              // console.log(moment(date).format("YYYY-MM-DD") + " : " + moment(this.state.selectedDate).format("YYYY-MM-DD"));
              var dateStart = moment(date).format('DD-MMMM-YYYY');
              var dateEnd = moment(this.state.selectedDateEnd).format('DD-MMMM-YYYY');

              // console.log(moment(date) + " : " + moment(this.state.selectedDate));
              // if( moment(date).format("YYYY-MM-DD") >= moment(this.state.selectedDate).format("YYYY-MM-DD") ){
              if( moment(new Date(dateStart)) > moment(new Date(dateEnd))){

              // console.log("kesini");

                this.setState({
                  selectedDate:null,
                  selectedDateEnd:null,
                  disabledEndDate:true,
                  pesansnackbar:'Start Date tidak boleh lebih besar dari End Date',
                  halfday_div: false
                })
                this.handleClick(TransitionUp);

              }else{

                // console.log("kesitu");
                this.setState({
                  selectedDate:date,
                  selectedDateEnd: null,
                  disabledEndDate:false,
                  absencetype : 0,
                  halfday_div: false,
                  halfday: 'No',
                  ampm_div: false,
                  ampm: 'AM',
                  starttime_div: false
                  
                })

              }





              // this.setState({
              //   selectedDate:date,
              //   disabledEndDate:false
              // })






          }



  
      })
      .catch((err) => {
        //  dispatch(authError('bad login info'))
        console.log("AXIOS ERROR: ", err);
  
      });


    };  

    handleDateEndChange = date => {

      let payload3 = {
        email: this.state.email,
        startDate: moment(date).format("YYYY-MM-DD")
        
  
      };
  
      let urlIattend = "https://portalmobile.dexagroup.com/api/ees/v1.1.4/cekStartDateLeaveRequest";
  
      const request = axios.post(urlIattend, payload3, {
      // headers: { 'Authorization': 123456 }
      })
      request
      .then(response => {
          // -Save the JWT token
          // console.log("balikan datechange",response.data.data.result.data);

          if(response.data.data.result.data !== false){

            this.setState({
              selectedDateEnd:null,
              pesansnackbar:'Pengajuan sudah pernah dilakukan',
              halfday_div: false
            })
            this.handleClickEndDate(TransitionUp);

          }else{


              // console.log(moment(date).format("YYYY-MM-DD") + " : " + moment(this.state.selectedDate).format("YYYY-MM-DD"));
              var dateStart = moment(this.state.selectedDate).format('DD-MMMM-YYYY');
              var dateEnd = moment(date).format('DD-MMMM-YYYY');

              // console.log(moment(date) + " : " + moment(this.state.selectedDate));
              // if( moment(date).format("YYYY-MM-DD") >= moment(this.state.selectedDate).format("YYYY-MM-DD") ){
              if( moment(new Date(dateEnd)) < moment(new Date(dateStart))){

              // console.log("kesini");

                this.setState({
                  selectedDateEnd:null,
                  pesansnackbar:'End Date tidak boleh lebih kecil dari Start Date',
                  halfday_div: false
                })
                this.handleClickEndDate(TransitionUp);

              }else{

                // console.log("kesitu");
                this.setState({
                  selectedDateEnd:date,
                  absencetype : 0,
                  halfday_div: false,
                  halfday: 'No',
                  ampm_div: false,
                  ampm: 'AM',
                  starttime_div: false


                })

              }

          }



  
      })
      .catch((err) => {
        //  dispatch(authError('bad login info'))
        console.log("AXIOS ERROR: ", err);
  
      });

    }

    handleChange_starttime = name => event => {

      if(event.target.value !== 0){
        alert("Permission to leave the office is only 2 hours");
      }
      
      this.setState({
        [name]: event.target.value
      });

    };

    handleChange_ampm = name => event => {


      if(event.target.value == 'AM'){
        alert("AM : Half-day leave from 08:00 to 12:00");
      }
      
      if(event.target.value == 'PM'){
        alert("PM : Half-day leave from 13:00 to 17:00");
      }else{

      }

      this.setState({
        [name]: event.target.value
      });
    };    

    handleChange_half = name => event => {

      if(event.target.value == 'Yes'){
        this.setState({
          ampm_div:true
        });
      }else{
        this.setState({
          ampm_div:false
        });
      }

      this.setState({
        [name]: event.target.value
      });
    };

    handleChange_absence = name => event => {

      switch (event.target.value) {
        case '0':
          //

          this.setState({
            halfday_div:false,
            starttime_div:false,
            ampm_div:false,
            disabledEndDate:false,
            sisacuti:0,
            starttime:0,
            halfday:'No',
            ampm:'AM'
          })

          break;
        case 'ANNUAL':


          let payload3 = {
            empNo: this.state.cemp_no,
            endDate: moment(this.state.selectedDateEnd).format("YYYY-MM-DD")
            
      
          };
      
          let urlIattend = "https://portalmobile.dexagroup.com/api/ees/v1.1.4/cekAnnualLeaveRequest";
      
          const request = axios.post(urlIattend, payload3, {
          // headers: { 'Authorization': 123456 }
          })
          request
          .then(response => {
              // -Save the JWT token
              // console.log("balikan cekAnnualLeaveRequest",response.data.data.result.data);
    

              if(response.data.data.result.data == "Bisa diajukan"){

                this.setState({
                  halfday_div:true,
                  starttime_div:false,
                  disabledEndDate:false,
                  sisacuti:this.props.location.state.sisa_annual,
                  starttime:0
                });

              }else{

                this.setState({
                  halfday_div:false,
                  starttime_div:false,
                  disabledEndDate:true,
                  sisacuti:this.props.location.state.sisa_annual,
                  starttime:0,
                  // selectedDate:null,
                  absencetype:0,
                  selectedDate:null,
                  selectedDateEnd:null,
                  pesansnackbar:'Pengajuan cuti harus dipisah sesuai dengan periode hak cuti'
                });

                this.handleClickEndDate(TransitionUp);


              }
    
    
    
      
          })
          .catch((err) => {
            //  dispatch(authError('bad login info'))
            console.log("AXIOS ERROR: ", err);
      
          });




          // this.setState({
          //   halfday_div:true,
          //   starttime_div:false,
          //   disabledEndDate:false,
          //   sisacuti:this.props.location.state.sisa_annual,
          //   starttime:0
          // });

          break;
        case 'MARRIAGE':
          alert("Marriage leave for only 3 days");

          this.setState({
            halfday_div:false,
            starttime_div:false,
            ampm_div:false,
            disabledEndDate:false,
            sisacuti:this.props.location.state.sisa_marriage2,
            starttime:0,
            halfday:'No',
            ampm:'AM'
          })
          break;
        case 'MARRIAGE2':
          alert("Marriage leave for only 3 days");

          this.setState({
            halfday_div:false,
            starttime_div:false,
            ampm_div:false,
            disabledEndDate:false,
            sisacuti:this.props.location.state.sisa_marriage2,
            starttime:0,
            halfday:'No',
            ampm:'AM'
          })
          break;
        case 'DEATH':
          this.setState({
            halfday_div:false,
            starttime_div:false,
            ampm_div:false,
            disabledEndDate:false,
            sisacuti:this.props.location.state.sisa_death,
            starttime:0,
            halfday:'No',
            ampm:'AM'
          })

          break;
        case 'DEATH2':
          this.setState({
            halfday_div:false,
            starttime_div:false,
            ampm_div:false,
            disabledEndDate:false,
            sisacuti:this.props.location.state.sisa_death2,
            starttime:0,
            halfday:'No',
            ampm:'AM'
          })
          break;
        case 'SICK':
          this.setState({
            halfday_div:false,
            starttime_div:false,
            ampm_div:false,
            disabledEndDate:false,
            starttime:0,
            halfday:'No',
            ampm:'AM'
          })
          break;
        case 'HAJJ':
          this.setState({
            halfday_div:false,
            starttime_div:false,
            ampm_div:false,
            disabledEndDate:false,
            sisacuti:this.props.location.state.sisa_hajj,
            starttime:0,
            halfday:'No',
            ampm:'AM'
          })
          break;
        case 'TRAINING':
          this.setState({
            halfday_div:false,
            starttime_div:false,
            ampm_div:false,
            disabledEndDate:false,
            starttime:0,
            halfday:'No',
            ampm:'AM'
          })
          break;
        case 'DINAS LUAR':
          this.setState({
            halfday_div:false,
            starttime_div:false,
            ampm_div:false,
            disabledEndDate:false,
            starttime:0,
            halfday:'No',
            ampm:'AM'
          })
          break;
        case 'KELUAR KANTOR':
          this.setState({
            halfday_div:false,
            starttime_div:true,
            ampm_div:false,
            disabledEndDate:false,
            starttime:0,
            halfday:'No',
            ampm:'AM'
          })
          break;
        case 'CIRCUMCISE':
          this.setState({
            halfday_div:false,
            starttime_div:false,
            ampm_div:false,
            disabledEndDate:false,
            sisacuti:this.props.location.state.sisa_circumcise,
            starttime:0,
            halfday:'No',
            ampm:'AM'
          })
          break;
        case 'MATERNITY':
          var tigabln = moment(new Date(this.state.selectedDate)).add(3,'months');
          var tglnya = moment(tigabln).format("MM/DD/YYYY")

          alert("MATERNITY leave for only 3 month");

          this.setState({
            halfday_div:false,
            starttime_div:false,
            ampm_div:false,
            selectedDateEnd:tglnya,
            disabledEndDate:true,
            starttime:0,
            halfday:'No',
            ampm:'AM'
          })

          break;
        case 'BAPTISM':
          this.setState({
            halfday_div:false,
            starttime_div:false,
            ampm_div:false,
            disabledEndDate:false,
            starttime:0,
            halfday:'No',
            ampm:'AM'
          })
          break;
        case 'PATERNITY':
          this.setState({
            halfday_div:false,
            starttime_div:false,
            ampm_div:false,
            disabledEndDate:false,
            sisacuti:this.props.location.state.sisa_patternity,
            starttime:0,
            halfday:'No',
            ampm:'AM'
          })
          break;
        case 'MISCARRIAGE':
          this.setState({
            halfday_div:false,
            starttime_div:false,
            ampm_div:false,
            disabledEndDate:false,
            starttime:0,
            halfday:'No',
            ampm:'AM'
          })
          
      }

      this.setState({
        [name]: event.target.value
      });
    };


    setMinDate = () => {

      this.setState({
        minDate: this.state.selectedDate
      });

    }

    handleChangeReason(value){
      this.setState({ reason: value.target.value });
    };    


    body_absence_type(){
      if(this.state.selectedDate !== null && this.state.selectedDateEnd !== null){
        return (
          <li>
          <Typography><b>Absence Type</b></Typography>
          <TextField
              className="other_applications_create_ticket_select"
              // id="select-currency"
              select
              // label="Absence Type:"
              value={this.state.absencetype}
              onChange={this.handleChange_absence('absencetype')}
              SelectProps={{
                  MenuProps: {
                  className: 'menu'
                  }
              }}
              // helperText="Please select absence type"
              margin="normal"
              >
              {absencetypeArray.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                  {option.label}
                  </MenuItem>
              ))}
          </TextField>
          </li>
        )
      }
    }

    body_starttime(){
      if(this.state.starttime_div){
        return (
          <li> 
            <Typography><b>Start Time</b></Typography>
            <TextField
                className="other_applications_create_ticket_select"
                // id="select-currency"
                select
                // label="Absence Type:"
                value={this.state.starttime}
                onChange={this.handleChange_starttime('starttime')}
                SelectProps={{
                    MenuProps: {
                    className: 'menu'
                    }
                }}
                // helperText="Please select absence type"
                margin="normal"
                >
                {starttimeArray.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>
          </li>
        )
      }
    }


    body_ampm(){
      if(this.state.ampm_div){
        return (
          <li> 
            <Typography><b>AM / PM</b></Typography>
            <TextField
                className="other_applications_create_ticket_select"
                // id="select-currency"
                select
                // label="Absence Type:"
                value={this.state.ampm}
                onChange={this.handleChange_ampm('ampm')}
                SelectProps={{
                    MenuProps: {
                    className: 'menu'
                    }
                }}
                // helperText="Please select absence type"
                margin="normal"
                >
                {ampmArray.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>
          </li>
        )
      }
    }    

    body_reason(){

      if(this.state.absencetype !== '0'){

        if(this.state.absencetype !== 'ANNUAL'){

          if(this.state.selectedDate !== null && this.state.selectedDateEnd !== null){
            return (
              <li>
              <Typography className="create_leave_request_absence_type_label"><b>Reason For Leave</b></Typography>
              <textarea 
              rows="5"
              className="create_leave_request_reason_leave"
              value={this.state.reason}
              onChange={this.handleChangeReason.bind(this)}
              >
    
              </textarea>
              </li>
            )
          }

        }else{

          if(this.state.selectedDate !== null && this.state.selectedDateEnd !== null && this.state.halfday !== ''){
            return (
              <li>
              <Typography className="create_leave_request_absence_type_label"><b>Reason For Leave</b></Typography>
              <textarea 
              rows="5"
              className="create_leave_request_reason_leave"
              value={this.state.reason}
              onChange={this.handleChangeReason.bind(this)}
              >
    
              </textarea>
              </li>
            )
          }

        }

      }


    }

    handleCancel = value => {
      this.setState({ 
        btnValue: value,
        absencetype:'0',
        halfday:'No',
        starttime:'0',
        ampm:'AM',
        selectedDate: null,
        selectedDateEnd: null,
        disabledEndDate: true,
        halfday_div:false,
        starttime_div:false,
        ampm_div:false,
        reason:''
       });
    }

    handleSubmit = value => {
      this.setState({ btnValue: value });

      if(this.state.selectedDate !== null && this.state.selectedDateEnd !== null && this.state.absencetype !== 0){

        switch (this.state.absencetype) {
          case 'ANNUAL' :

              if(this.state.halfday !== 0){

                // Jika yes
                if(this.state.halfday == 'Yes'){
    
                  if(this.state.ampm !== 0){
    
                    if(this.state.reason !==''){
                      
                      this.props.CREATE_LEAVE_LIST_REQUEST(
                        {
                            "BPNAME":"Leave Request",
                            "NAME": "leave request",
                            "PROPERTY_399": moment(this.state.selectedDate).format("MM/DD/YYYY"),
                            "PROPERTY_398": moment(this.state.selectedDateEnd).format("MM/DD/YYYY"),
                            "PROPERTY_1049": this.state.absencetype,
                            "PROPERTY_464": this.state.halfday,
                            "PROPERTY_495": this.state.ampm,
                            "PROPERTY_462": this.state.starttime,
                            "PROPERTY_463": "0",
                            "PREVIEW_TEXT": this.state.reason,
                            "PROPERTY_538": this.state.employeenum,
                            "PROPERTY_551": this.state.ccompany_id,
                            "PROPERTY_552": this.state.cemp_no,
                            "PROPERTY_965": this.state.spv_id,
                            "PROPERTY_966": this.state.spv_name,
                            "PROPERTY_967": this.state.sisacuti,
                            "userid": this.state.userid,
                            "email": this.state.email,
                            "PROPERTY_1062" : this.state.spv_email
                        }
                      );
    
                    }else{
                      alert("Error, please type reason");
                    }
    
        
                  }else{
                    alert("Error, please choose the am / pm");
                  }
    
                }else{
    
                  if(this.state.reason !==''){
                      
                    this.props.CREATE_LEAVE_LIST_REQUEST(
                      {
                          "BPNAME":"Leave Request",
                          "NAME": "leave request",
                          "PROPERTY_399": moment(this.state.selectedDate).format("MM/DD/YYYY"),
                          "PROPERTY_398": moment(this.state.selectedDateEnd).format("MM/DD/YYYY"),
                          "PROPERTY_1049": this.state.absencetype,
                          "PROPERTY_464": this.state.halfday,
                          "PROPERTY_495": this.state.ampm,
                          "PROPERTY_462": this.state.starttime,
                          "PROPERTY_463": "0",
                          "PREVIEW_TEXT": this.state.reason,
                          "PROPERTY_538": this.state.employeenum,
                          "PROPERTY_551": this.state.ccompany_id,
                          "PROPERTY_552": this.state.cemp_no,
                          "PROPERTY_965": this.state.spv_id,
                          "PROPERTY_966": this.state.spv_name,
                          "PROPERTY_967": this.state.sisacuti,
                          "userid": this.state.userid,
                          "email": this.state.email,
                          "PROPERTY_1062" : this.state.spv_email
                      }
                    );
    
                  }else{
                    alert("Error, please type reason");
                  }
    
                }
    
    
      
              }else{
                alert("Error, please choose the half day");
              }

            break;
          case 'MARRIAGE':
            // Meriage 
            if(this.state.reason !==''){
                      
              this.props.CREATE_LEAVE_LIST_REQUEST(
                {
                    "BPNAME":"Leave Request",
                    "NAME": "leave request",
                    "PROPERTY_399": moment(this.state.selectedDate).format("MM/DD/YYYY"),
                    "PROPERTY_398": moment(this.state.selectedDateEnd).format("MM/DD/YYYY"),
                    "PROPERTY_1049": this.state.absencetype,
                    "PROPERTY_464": this.state.halfday,
                    "PROPERTY_495": this.state.ampm,
                    "PROPERTY_462": this.state.starttime,
                    "PROPERTY_463": "0",
                    "PREVIEW_TEXT": this.state.reason,
                    "PROPERTY_538": this.state.employeenum,
                    "PROPERTY_551": this.state.ccompany_id,
                    "PROPERTY_552": this.state.cemp_no,
                    "PROPERTY_965": this.state.spv_id,
                    "PROPERTY_966": this.state.spv_name,
                    "PROPERTY_967": this.state.sisacuti,
                    "userid": this.state.userid,
                    "email": this.state.email,
                    "PROPERTY_1062" : this.state.spv_email
                }
              );

            }else{
              alert("Error, please type reason");
            }
            break;
          case 'MARRIAGE2':
            // Meriage2
            if(this.state.reason !==''){
                      
              this.props.CREATE_LEAVE_LIST_REQUEST(
                {
                    "BPNAME":"Leave Request",
                    "NAME": "leave request",
                    "PROPERTY_399": moment(this.state.selectedDate).format("MM/DD/YYYY"),
                    "PROPERTY_398": moment(this.state.selectedDateEnd).format("MM/DD/YYYY"),
                    "PROPERTY_1049": this.state.absencetype,
                    "PROPERTY_464": this.state.halfday,
                    "PROPERTY_495": this.state.ampm,
                    "PROPERTY_462": this.state.starttime,
                    "PROPERTY_463": "0",
                    "PREVIEW_TEXT": this.state.reason,
                    "PROPERTY_538": this.state.employeenum,
                    "PROPERTY_551": this.state.ccompany_id,
                    "PROPERTY_552": this.state.cemp_no,
                    "PROPERTY_965": this.state.spv_id,
                    "PROPERTY_966": this.state.spv_name,
                    "PROPERTY_967": this.state.sisacuti,
                    "userid": this.state.userid,
                    "email": this.state.email,
                    "PROPERTY_1062" : this.state.spv_email
                }
              );

            }else{
              alert("Error, please type reason");
            }
            break;
          case 'DEATH':
            // Death 
            if(this.state.reason !==''){
                      
              this.props.CREATE_LEAVE_LIST_REQUEST(
                {
                    "BPNAME":"Leave Request",
                    "NAME": "leave request",
                    "PROPERTY_399": moment(this.state.selectedDate).format("MM/DD/YYYY"),
                    "PROPERTY_398": moment(this.state.selectedDateEnd).format("MM/DD/YYYY"),
                    "PROPERTY_1049": this.state.absencetype,
                    "PROPERTY_464": this.state.halfday,
                    "PROPERTY_495": this.state.ampm,
                    "PROPERTY_462": this.state.starttime,
                    "PROPERTY_463": "0",
                    "PREVIEW_TEXT": this.state.reason,
                    "PROPERTY_538": this.state.employeenum,
                    "PROPERTY_551": this.state.ccompany_id,
                    "PROPERTY_552": this.state.cemp_no,
                    "PROPERTY_965": this.state.spv_id,
                    "PROPERTY_966": this.state.spv_name,
                    "PROPERTY_967": this.state.sisacuti,
                    "userid": this.state.userid,
                    "email": this.state.email,
                    "PROPERTY_1062" : this.state.spv_email
                }
              );

            }else{
              alert("Error, please type reason");
            }
            break;
          case 'DEATH2':
            // Death2 
            if(this.state.reason !==''){
                      
              this.props.CREATE_LEAVE_LIST_REQUEST(
                {
                    "BPNAME":"Leave Request",
                    "NAME": "leave request",
                    "PROPERTY_399": moment(this.state.selectedDate).format("MM/DD/YYYY"),
                    "PROPERTY_398": moment(this.state.selectedDateEnd).format("MM/DD/YYYY"),
                    "PROPERTY_1049": this.state.absencetype,
                    "PROPERTY_464": this.state.halfday,
                    "PROPERTY_495": this.state.ampm,
                    "PROPERTY_462": this.state.starttime,
                    "PROPERTY_463": "0",
                    "PREVIEW_TEXT": this.state.reason,
                    "PROPERTY_538": this.state.employeenum,
                    "PROPERTY_551": this.state.ccompany_id,
                    "PROPERTY_552": this.state.cemp_no,
                    "PROPERTY_965": this.state.spv_id,
                    "PROPERTY_966": this.state.spv_name,
                    "PROPERTY_967": this.state.sisacuti,
                    "userid": this.state.userid,
                    "email": this.state.email,
                    "PROPERTY_1062" : this.state.spv_email
                }
              );

            }else{
              alert("Error, please type reason");
            }
            break;
          case 'SICK':
            // Sick 
            if(this.state.reason !==''){
                      
              this.props.CREATE_LEAVE_LIST_REQUEST(
                {
                    "BPNAME":"Leave Request",
                    "NAME": "leave request",
                    "PROPERTY_399": moment(this.state.selectedDate).format("MM/DD/YYYY"),
                    "PROPERTY_398": moment(this.state.selectedDateEnd).format("MM/DD/YYYY"),
                    "PROPERTY_1049": this.state.absencetype,
                    "PROPERTY_464": this.state.halfday,
                    "PROPERTY_495": this.state.ampm,
                    "PROPERTY_462": this.state.starttime,
                    "PROPERTY_463": "0",
                    "PREVIEW_TEXT": this.state.reason,
                    "PROPERTY_538": this.state.employeenum,
                    "PROPERTY_551": this.state.ccompany_id,
                    "PROPERTY_552": this.state.cemp_no,
                    "PROPERTY_965": this.state.spv_id,
                    "PROPERTY_966": this.state.spv_name,
                    "PROPERTY_967": this.state.sisacuti,
                    "userid": this.state.userid,
                    "email": this.state.email,
                    "PROPERTY_1062" : this.state.spv_email
                }
              );

            }else{
              alert("Error, please type reason");
            }
            break;
          case 'HAJJ':
            // Hajj 
            if(this.state.reason !==''){
                      
              this.props.CREATE_LEAVE_LIST_REQUEST(
                {
                    "BPNAME":"Leave Request",
                    "NAME": "leave request",
                    "PROPERTY_399": moment(this.state.selectedDate).format("MM/DD/YYYY"),
                    "PROPERTY_398": moment(this.state.selectedDateEnd).format("MM/DD/YYYY"),
                    "PROPERTY_1049": this.state.absencetype,
                    "PROPERTY_464": this.state.halfday,
                    "PROPERTY_495": this.state.ampm,
                    "PROPERTY_462": this.state.starttime,
                    "PROPERTY_463": "0",
                    "PREVIEW_TEXT": this.state.reason,
                    "PROPERTY_538": this.state.employeenum,
                    "PROPERTY_551": this.state.ccompany_id,
                    "PROPERTY_552": this.state.cemp_no,
                    "PROPERTY_965": this.state.spv_id,
                    "PROPERTY_966": this.state.spv_name,
                    "PROPERTY_967": this.state.sisacuti,
                    "userid": this.state.userid,
                    "email": this.state.email,
                    "PROPERTY_1062" : this.state.spv_email
                }
              );

            }else{
              alert("Error, please type reason");
            }
            break;
          case 'TRAINING':
            // Training 
            if(this.state.reason !==''){
                      
              this.props.CREATE_LEAVE_LIST_REQUEST(
                {
                    "BPNAME":"Leave Request",
                    "NAME": "leave request",
                    "PROPERTY_399": moment(this.state.selectedDate).format("MM/DD/YYYY"),
                    "PROPERTY_398": moment(this.state.selectedDateEnd).format("MM/DD/YYYY"),
                    "PROPERTY_1049": this.state.absencetype,
                    "PROPERTY_464": this.state.halfday,
                    "PROPERTY_495": this.state.ampm,
                    "PROPERTY_462": this.state.starttime,
                    "PROPERTY_463": "0",
                    "PREVIEW_TEXT": this.state.reason,
                    "PROPERTY_538": this.state.employeenum,
                    "PROPERTY_551": this.state.ccompany_id,
                    "PROPERTY_552": this.state.cemp_no,
                    "PROPERTY_965": this.state.spv_id,
                    "PROPERTY_966": this.state.spv_name,
                    "PROPERTY_967": this.state.sisacuti,
                    "userid": this.state.userid,
                    "email": this.state.email,
                    "PROPERTY_1062" : this.state.spv_email
                }
              );

            }else{
              alert("Error, please type reason");
            }
            break;
          case 'DINAS LUAR':
            // Dinas luar 
            if(this.state.reason !==''){
                      
              this.props.CREATE_LEAVE_LIST_REQUEST(
                {
                    "BPNAME":"Leave Request",
                    "NAME": "leave request",
                    "PROPERTY_399": moment(this.state.selectedDate).format("MM/DD/YYYY"),
                    "PROPERTY_398": moment(this.state.selectedDateEnd).format("MM/DD/YYYY"),
                    "PROPERTY_1049": this.state.absencetype,
                    "PROPERTY_464": this.state.halfday,
                    "PROPERTY_495": this.state.ampm,
                    "PROPERTY_462": this.state.starttime,
                    "PROPERTY_463": "0",
                    "PREVIEW_TEXT": this.state.reason,
                    "PROPERTY_538": this.state.employeenum,
                    "PROPERTY_551": this.state.ccompany_id,
                    "PROPERTY_552": this.state.cemp_no,
                    "PROPERTY_965": this.state.spv_id,
                    "PROPERTY_966": this.state.spv_name,
                    "PROPERTY_967": this.state.sisacuti,
                    "userid": this.state.userid,
                    "email": this.state.email,
                    "PROPERTY_1062" : this.state.spv_email
                }
              );

            }else{
              alert("Error, please type reason");
            }
            break;
          case 'KELUAR KANTOR':
            // Keluar kantor 

            // alert(this.state.starttime);
            
            if(this.state.starttime !== 0){

              if(this.state.reason !==''){
                      
                this.props.CREATE_LEAVE_LIST_REQUEST(
                  {
                      "BPNAME":"Leave Request",
                      "NAME": "leave request",
                      "PROPERTY_399": moment(this.state.selectedDate).format("MM/DD/YYYY"),
                      "PROPERTY_398": moment(this.state.selectedDateEnd).format("MM/DD/YYYY"),
                      "PROPERTY_1049": this.state.absencetype,
                      "PROPERTY_464": this.state.halfday,
                      "PROPERTY_495": this.state.ampm,
                      "PROPERTY_462": this.state.starttime,
                      "PROPERTY_463": "0",
                      "PREVIEW_TEXT": this.state.reason,
                      "PROPERTY_538": this.state.employeenum,
                      "PROPERTY_551": this.state.ccompany_id,
                      "PROPERTY_552": this.state.cemp_no,
                      "PROPERTY_965": this.state.spv_id,
                      "PROPERTY_966": this.state.spv_name,
                      "PROPERTY_967": this.state.sisacuti,
                      "userid": this.state.userid,
                      "email": this.state.email,
                      "PROPERTY_1062" : this.state.spv_email
                  }
                );
  
              }else{
                alert("Error, please type reason");
              }

            }else{
              alert("Error, please choose start time");
              
            }
            break;
          case 'CIRCUMCISE':
            // CIRCUMCISE 
            if(this.state.reason !==''){
                      
              this.props.CREATE_LEAVE_LIST_REQUEST(
                {
                    "BPNAME":"Leave Request",
                    "NAME": "leave request",
                    "PROPERTY_399": moment(this.state.selectedDate).format("MM/DD/YYYY"),
                    "PROPERTY_398": moment(this.state.selectedDateEnd).format("MM/DD/YYYY"),
                    "PROPERTY_1049": this.state.absencetype,
                    "PROPERTY_464": this.state.halfday,
                    "PROPERTY_495": this.state.ampm,
                    "PROPERTY_462": this.state.starttime,
                    "PROPERTY_463": "0",
                    "PREVIEW_TEXT": this.state.reason,
                    "PROPERTY_538": this.state.employeenum,
                    "PROPERTY_551": this.state.ccompany_id,
                    "PROPERTY_552": this.state.cemp_no,
                    "PROPERTY_965": this.state.spv_id,
                    "PROPERTY_966": this.state.spv_name,
                    "PROPERTY_967": this.state.sisacuti,
                    "userid": this.state.userid,
                    "email": this.state.email,
                    "PROPERTY_1062" : this.state.spv_email
                }
              );

            }else{
              alert("Error, please type reason");
            }
            break;

          case 'MATERNITY':
            // MATERNITY 
            if(this.state.reason !==''){
                      
              this.props.CREATE_LEAVE_LIST_REQUEST(
                {
                    "BPNAME":"Leave Request",
                    "NAME": "leave request",
                    "PROPERTY_399": moment(this.state.selectedDate).format("MM/DD/YYYY"),
                    "PROPERTY_398": moment(this.state.selectedDateEnd).format("MM/DD/YYYY"),
                    "PROPERTY_1049": this.state.absencetype,
                    "PROPERTY_464": this.state.halfday,
                    "PROPERTY_495": this.state.ampm,
                    "PROPERTY_462": this.state.starttime,
                    "PROPERTY_463": "0",
                    "PREVIEW_TEXT": this.state.reason,
                    "PROPERTY_538": this.state.employeenum,
                    "PROPERTY_551": this.state.ccompany_id,
                    "PROPERTY_552": this.state.cemp_no,
                    "PROPERTY_965": this.state.spv_id,
                    "PROPERTY_966": this.state.spv_name,
                    "PROPERTY_967": this.state.sisacuti,
                    "userid": this.state.userid,
                    "email": this.state.email,
                    "PROPERTY_1062" : this.state.spv_email
                }
              );

            }else{
              alert("Error, please type reason");
            }
            break;

          case 'BAPTISM':
            // BAPTISM 
            if(this.state.reason !==''){
                      
              this.props.CREATE_LEAVE_LIST_REQUEST(
                {
                    "BPNAME":"Leave Request",
                    "NAME": "leave request",
                    "PROPERTY_399": moment(this.state.selectedDate).format("MM/DD/YYYY"),
                    "PROPERTY_398": moment(this.state.selectedDateEnd).format("MM/DD/YYYY"),
                    "PROPERTY_1049": this.state.absencetype,
                    "PROPERTY_464": this.state.halfday,
                    "PROPERTY_495": this.state.ampm,
                    "PROPERTY_462": this.state.starttime,
                    "PROPERTY_463": "0",
                    "PREVIEW_TEXT": this.state.reason,
                    "PROPERTY_538": this.state.employeenum,
                    "PROPERTY_551": this.state.ccompany_id,
                    "PROPERTY_552": this.state.cemp_no,
                    "PROPERTY_965": this.state.spv_id,
                    "PROPERTY_966": this.state.spv_name,
                    "PROPERTY_967": this.state.sisacuti,
                    "userid": this.state.userid,
                    "email": this.state.email,
                    "PROPERTY_1062" : this.state.spv_email
                }
              );

            }else{
              alert("Error, please type reason");
            }
            break;

          case 'PATERNITY':
            // PATERNITY 
            if(this.state.reason !==''){
                      
              this.props.CREATE_LEAVE_LIST_REQUEST(
                {
                    "BPNAME":"Leave Request",
                    "NAME": "leave request",
                    "PROPERTY_399": moment(this.state.selectedDate).format("MM/DD/YYYY"),
                    "PROPERTY_398": moment(this.state.selectedDateEnd).format("MM/DD/YYYY"),
                    "PROPERTY_1049": this.state.absencetype,
                    "PROPERTY_464": this.state.halfday,
                    "PROPERTY_495": this.state.ampm,
                    "PROPERTY_462": this.state.starttime,
                    "PROPERTY_463": "0",
                    "PREVIEW_TEXT": this.state.reason,
                    "PROPERTY_538": this.state.employeenum,
                    "PROPERTY_551": this.state.ccompany_id,
                    "PROPERTY_552": this.state.cemp_no,
                    "PROPERTY_965": this.state.spv_id,
                    "PROPERTY_966": this.state.spv_name,
                    "PROPERTY_967": this.state.sisacuti,
                    "userid": this.state.userid,
                    "email": this.state.email,
                    "PROPERTY_1062" : this.state.spv_email
                }
              );

            }else{
              alert("Error, please type reason");
            }
            break;

          case 'MISCARRIAGE':
            // MISCARRIAGE 
            if(this.state.reason !==''){
                      
              this.props.CREATE_LEAVE_LIST_REQUEST(
                {
                    "BPNAME":"Leave Request",
                    "NAME": "leave request",
                    "PROPERTY_399": moment(this.state.selectedDate).format("MM/DD/YYYY"),
                    "PROPERTY_398": moment(this.state.selectedDateEnd).format("MM/DD/YYYY"),
                    "PROPERTY_1049": this.state.absencetype,
                    "PROPERTY_464": this.state.halfday,
                    "PROPERTY_495": this.state.ampm,
                    "PROPERTY_462": this.state.starttime,
                    "PROPERTY_463": "0",
                    "PREVIEW_TEXT": this.state.reason,
                    "PROPERTY_538": this.state.employeenum,
                    "PROPERTY_551": this.state.ccompany_id,
                    "PROPERTY_552": this.state.cemp_no,
                    "PROPERTY_965": this.state.spv_id,
                    "PROPERTY_966": this.state.spv_name,
                    "PROPERTY_967": this.state.sisacuti,
                    "userid": this.state.userid,
                    "email": this.state.email,
                    "PROPERTY_1062" : this.state.spv_email
                }
              );

            }else{
              alert("Error, please type reason");
            }
            
            
        }
        

      }else{
        alert("Error, Please fill all requirement");
      }


    }

    render() {

        const { selectedDate, selectedDateEnd, halfday_div, minDate } = this.state;
        
  
        return (
            <div>
            <div className="other_applications_create_ticket">
            <ul className="leave_request_create_ticket_ul">
                <li>
                <Grid item xs={6} className="create_leave_request_start_date_label_grid">
                    <Typography><b>Start Date</b></Typography>
                    <DatePicker
                      className="create_leave_request_start_date"
                      value={selectedDate}
                      onChange={this.handleDateChange}
                      animateYearScrolling={false}
                      format="MM/DD/YYYY"
                    />
                </Grid>

                <Grid item xs={6} className="create_leave_request_end_date_label_grid">
                    <Typography><b>End Date</b></Typography>
                    <DatePicker
                      className="create_leave_request_end_date"
                      value={selectedDateEnd}
                      minDate={minDate}
                      onChange={this.handleDateEndChange.bind(this)}
                      animateYearScrolling={false}
                      disabled={this.state.disabledEndDate}
                      format="MM/DD/YYYY"
                    />
                </Grid>
                </li>
                <li>
                  {this.body_absence_type()}
                </li>
                {
                  halfday_div ?

                  <li>
                    <Typography><b>Half Day</b></Typography>
                    <TextField
                        className="other_applications_create_ticket_select"
                        // id="select-currency"
                        select
                        // label="Absence Type:"
                        value={this.state.halfday}
                        onChange={this.handleChange_half('halfday')}
                        SelectProps={{
                            MenuProps: {
                            className: 'menu'
                            }
                        }}
                        // helperText="Please select absence type"
                        margin="normal"
                        >
                        {halfdayArray.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </li>

                : null

                }
                <li>
                {this.body_starttime()}
                </li>
                <li>
                {this.body_ampm()}
                </li>
                <li>
                  {this.body_reason()}
                </li>
                
            </ul>
            </div>
            <div className="create_leave_request_my_ticket_dialog_footer">

                <Grid item xs={6} className="other_applications_my_ticket_dialog_button_reopenticket_grid">
                <Button variant="contained" className="create_leave_request_button_cancel" onClick={this.handleCancel}>
                Reset
                </Button>
                </Grid>
                <Grid item xs={6} className="other_applications_my_ticket_dialog_closeticket_grid">
                <Button variant="contained" color="primary" className="create_leave_request_button_submit" onClick={this.handleSubmit}>
                {
                  (this.state.loading) ? "LOADING" : "SUBMIT" 
                }
                </Button>
                </Grid>

            </div>

            <Snackbar
              open={this.state.open}
              onClose={this.handleRequestClose}
              transition={this.state.transition}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id" style={{textAlign:"center"}}>{this.state.pesansnackbar}</span>}
            />

            </div>
        );
    }
}

  BasicTabs.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default compose(connect(
    // harus sesuai dengan global reducernya //

    state => ({
      data:state.LeaveCreateRequest
    }),
    {CREATE_LEAVE_LIST_REQUEST }
  ),withStyles())(BasicTabs);