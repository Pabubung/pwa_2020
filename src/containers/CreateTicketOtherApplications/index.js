import React from "react";
import PropTypes from "prop-types";
import Button from "../../../src/components/uielements/button";
import Grid from '@material-ui/core/Grid';
import Lists, {
  ListItem,
  ListItemText,
  ListItemIcon
} from "../../../src/components/uielements/lists";
import Dialog, { DialogTitle } from "../../../src/components/uielements/dialogs";
import Icon from "../../../src/components/uielements/icon/index.js";
import Divider from '@material-ui/core/Divider';
import { 
    // Form, 
    TextField } from './textfield.style';
// import { MenuItem } from '../../../src/components/uielements/menus';
// import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
// import { FullScreenDialogs } from './dialogs.style';
import Slide from '@material-ui/core/Slide';
// import AppBar from '../../../src/components/uielements/appbar';
// import Toolbar from '../../../src/components/uielements/toolbar';
// import IconButton from '../../../src/components/uielements/iconbutton/';
import Loader from 'react-loader-spinner';
import { connect } from "react-redux";
import ticketActions from "../../redux/ticket/actions";
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Typography from '../../../src/components/uielements/typography';
import Stepper, {
  Step,
  StepLabel,
} from '../../../src/components/uielements/stepper';
import {
  Root,
  ButtonWrapper,
  StepperContent,
//   ButtonContainer,
} from './stepper.style';
// import spacing from "@material-ui/core/styles/spacing";
import axios from 'axios';
import { Base64 } from 'js-base64';
import moment from 'moment';
import Snackbar from './styleSnackbar';
import Setting from '../../../src/settings'; 
 

const { TICKET_LIST_REQUEST, TICKET_SUBMIT } = ticketActions;

const emails = ["Take from camera", "Choose from gallery"];
const { apiUrlLoginIT138 } = Setting;

function Transition(props) {
return <Slide direction="up" {...props} />;
}  

function TransitionUp(props) {
    return <Slide direction="up" {...props} />;
}

class SimpleDialog extends React.Component {
  handleRequestClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const {
      classes,
      onClose,
      staticContext,
      selectedValue,
      ...other
    } = this.props;
    return (
      <Dialog onClose={this.handleRequestClose} {...other}>
        <DialogTitle>Attach Image</DialogTitle>
        <div>
          <Lists>
            {emails.map(email => (
              <ListItem
                button
                onClick={() => this.handleListItemClick(email)}
                key={email}
              >
                {/* <ListItemAvatar>
                  <Avatar>
                    <Icon>camera</Icon>
                  </Avatar>
                </ListItemAvatar> */}
                <ListItemText primary={email} />
              </ListItem>
            ))}
          </Lists>
        </div>
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string
};

const SimpleDialogWrapped = SimpleDialog;

class SimpleDialogDemo extends React.Component {
    state = {
        open: false,
        selectedValue: '',
        typetiket:'Please Choose one',
        title:'',
        data:[],
        activeStep: 0,
        serviceFamily: [],
        categoryFamily:[],
        subcategoryFamily:[],
        activeCat:[],
        activeSubCat:[],
        token: '',
        orgId: '',
        contactId: '',
        origin: 'web',
        description: '',
        serviceId: '',
        servicesubcategoryId: '',
        urgencyId: '',
        impactId: '',
        friendlyName: '',
        servicefriendlyName: '',
        requestType: '',
        base64encoded: '',
        selectedSvc: {
            id: '',
            name: ''
        },
        selectedSubSvc: {
            id: '',
            name: ''
        },
        loading: true,
        loadingSubmit: false,
        urgency: [],
        impact: [],
        activeImp:"",
        activeUrg:"",
        errorSubmit: false
    };
    
    componentWillReceiveProps(nextProps){
        this.setState({
            loadingSubmit: nextProps.data.loadingSubmit,
            errorSubmit: nextProps.data.error,
            loading:nextProps.data.loading
        })
        if(nextProps.data.result.acknowledge){
            let {dbResultService,dbResultServiceSubcategory,dbResultUrgency,dbResultImpact,dbResultPerson} = nextProps.data.result;
            const result = [];
            const map = new Map();
            for (const item of dbResultService) {
                if(!map.has(item.servicefamily_id)){
                    map.set(item.servicefamily_id, true);    // set any value to Map
                    result.push({
                        id: item.servicefamily_id,
                        name: item.servicefamily_id_friendlyname
                    });
                }
            }
            this.setState({
                data: nextProps.data,
                categoryFamily: dbResultService,
                serviceFamily: result,
                subcategoryFamily: dbResultServiceSubcategory,
                urgency: dbResultUrgency,
                impact: dbResultImpact,
                orgId: dbResultPerson.org_id
            })
        }
    }

    componentDidMount(){
        
        let data = localStorage.getItem("data");
        let token = localStorage.getItem("id_token");
        
        this.setState({
            token: token
        });

        if(data !== "undefined"){

            // const { it138 } = JSON.parse(data) 
            // this.setState({
            //     contactId: it138.contactid,
            //     friendlyName: it138.cn
            // })
            // this.props.TICKET_LIST_REQUEST(
            // {
            //     "email":it138.mail,
            //     "emp_no":it138.empno,
            //     "last_update": "2016-01-01 00:00:00",
            //     "contact_Id": it138.contactid
            // }
            // );

            const { it138, userLogin } = JSON.parse(data) 

            // insert log //
            
            this.inserLog(userLogin.username);

            // console.log("myleave request length", it138.length);
            
            if(it138 !== ''){
              // console.log("disini");

                this.setState({
                    contactId: it138.contactid,
                    friendlyName: it138.cn
                });

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

                    this.setState({
                        contactId: response.data.result.contactid,
                        friendlyName: response.data.result.cn
                    });
      
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
    }

    callers(){
        let data = localStorage.getItem("data");
        let token = localStorage.getItem("id_token");
        
        this.setState({
            token: token,
            open: false,
            selectedValue: '',
            typetiket:'Please Choose one',
            title:'',
            data:[],
            activeStep: 0,
            serviceFamily: [],
            categoryFamily:[],
            subcategoryFamily:[],
            activeCat:[],
            activeSubCat:[],
            orgId: '',
            contactId: '',
            origin: 'web',
            description: '',
            serviceId: '',
            servicesubcategoryId: '',
            urgencyId: '',
            impactId: '',
            friendlyName: '',
            servicefriendlyName: '',
            requestType: '',
            base64encoded: '',
            selectedSvc: {
                id: '',
                name: ''
            },
            selectedSubSvc: {
                id: '',
                name: ''
            },
            loading: true,
            loadingSubmit: false,
            urgency: [],
            impact: [],
            activeImp:"",
            activeUrg:"",
            errorSubmit: false,
            openDialog: false,
            transition: '',
            pesanSnackbar:'',
        });

        if(data !== "undefined"){



            // const { it138 } = JSON.parse(data) 
            // this.setState({
            //     contactId: it138.contactid,
            //     friendlyName: it138.cn
            // })
            // this.props.TICKET_LIST_REQUEST(
            // {
            //     "email":it138.mail,
            //     "emp_no":it138.empno,
            //     "last_update": "2016-01-01 00:00:00",
            //     "contact_Id": it138.contactid
            // }
            // );



            const { it138, userLogin } = JSON.parse(data) 

            // console.log("myleave request length", it138.length);
            
            if(it138 !== ''){
              // console.log("disini");

              this.setState({
                contactId: it138.contactid,
                friendlyName: it138.cn
              });

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


                    this.setState({
                        contactId: response.data.result.contactid,
                        friendlyName: response.data.result.cn
                    });
      
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
    }

    handleClick = (transition) => {

    this.setState({ openDialog: true, transition });
    setTimeout(() => this.handleSnackbarClose(), 3000);
    };

    handleRequestClose = () => {
    this.setState({ openDialog: false });
    };

    handleSnackbarClose = () => {
    this.setState({
        transition:'',
        pesanSnackbar:''
    });

    this.handleRequestClose();
    }

    handleNext = (payload) => {
        const { activeStep, categoryFamily,subcategoryFamily} = this.state;
        let nexts = activeStep + 1;
        if(nexts === 1){
            this.setState({
                servicefriendlyName: payload.name,
                activeStep: nexts,
                activeCat: categoryFamily.filter((v) => v.servicefamily_id === payload.id),
                selectedSvc: {
                    id: payload.id,
                    name: payload.name
                },
            });
        }
        else if(nexts === 2){
            this.setState({
                activeStep: nexts,
                activeSubCat: subcategoryFamily.filter((v) => v.service_id === payload.id),
                selectedSvc: {
                    id: payload.id,
                    name: payload.name
                },
            });
        }
        else if(nexts === 3){
            this.setState({
                activeStep: nexts,
                selectedSubSvc: {
                    id: payload.id,
                    name: payload.friendlyname
                },
            });
        }
        else{
            this.setState({
                activeStep: nexts,
            });
        }

    };
    
    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1,
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };
    

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    };

    handleRequestClose = value => {

        if(value =='Choose from gallery'){
            this.setState({ 
                selectedValue: value, 
                open: false
            });
        }else{
            this.setState({ 
                selectedValue: value, 
                open: false,
                attachimage:true
            });
        }
    };

    handleChange = name => event => {
        this.setState({
            ...this.state,
            [name]: event.target.value,
        });
    };

    handleSubmit = () => {

        if(this.state.title !=='' && this.state.description !=='' && this.state.activeImp !=='' && this.state.activeUrg !=''){

            let payload = {
                token: this.state.token,
                orgId: this.state.orgId,
                contactId: this.state.contactId,
                title: this.state.title,
                description: this.state.description,
                serviceFamilyName: this.state.servicefriendlyName,
                serviceId: this.state.selectedSvc.id,
                serviceName: this.state.selectedSvc.name,
                servicesubcategoryId: this.state.selectedSubSvc.id,
                serviceSubcategoryName: this.state.selectedSubSvc.name,
                urgencyId: this.state.activeUrg,
                impactId: this.state.activeImp,
                origin: 'web',
                friendlyName: this.state.friendlyName,
                requestType: 'UserRequest',
                base64encoded: ''
            }
            this.setState({ activeStep: this.state.activeStep + 1 })
            this.props.TICKET_SUBMIT(payload);

        }else{

            alert('Gagal submit tiket, pastikan semua field diisi');

        }



        
    }

    onTakePhoto (dataUri) {
        console.log('takePhoto');
    }
    
    onCameraError (error) {
        console.error('onCameraError', error);
    }
    
    onCameraStart (stream) {
        console.log('onCameraStart');
    }
    
    onCameraStop () {
        console.log('onCameraStop');
    }   

    handleRequestAttachImageClose = () => {
        this.setState({ attachimage: false });
    };

    getSteps() {
        return [
          'Create Ticket',
          'Select Category',
          'Select Subcategory',
          'Input Form Request',
          'Finish'
        ];
      }
      
    getStepContent(stepIndex) {
        const {props} = this;
        switch (stepIndex) {
            case 0:
                return (
                    <Lists>
                        <Divider />
                        {
                            (this.state.serviceFamily !== undefined) ?
                                this.state.serviceFamily.map((v,i) => 
                                    <div>
                                        <ListItem button  onClick={() => this.handleNext(v)}>
                                            <ListItemIcon>
                                                <Icon>arrow_forward_ios</Icon>
                                            </ListItemIcon>
                                            <ListItemText primary={v.name} />
                                            
                                        </ListItem>
                                        <Divider />
                                    </div>
                                    
                                ) : null
                        }
                        
                    </Lists>
                );
            case 1:
                return (
                    <Lists>
                        <Divider />
                        {
                            (this.state.activeCat !== undefined) ?
                                this.state.activeCat.map((v,i) => 
                                <div>
                                    <ListItem button  onClick={() => this.handleNext(v)}>
                                        <ListItemIcon>
                                            <Icon>arrow_forward_ios</Icon>
                                        </ListItemIcon>
                                        <ListItemText primary={v.name} />
                                        
                                    </ListItem>
                                    <Divider />
                                </div>
                                ) : null
                        }
                        
                    </Lists>
                );
            case 2: 
                return (
                    <Lists>
                        <Divider />
                        {
                            (this.state.activeSubCat !== undefined) ?
                                this.state.activeSubCat.map((v,i) => 
                                <div>
                                    <ListItem button  onClick={() => this.handleNext(v)}>
                                        <ListItemIcon>
                                            <Icon>arrow_forward_ios</Icon>
                                        </ListItemIcon>
                                        <ListItemText primary={v.friendlyname} />
                                        
                                    </ListItem>
                                    <Divider />
                                </div>
                                    
                                    
                                ) : null
                        }
                        
                    </Lists>
                );
            case 3:
            
                return(
                    
                    <form 
                        style={{
                            container: {
                                display: 'flex',
                                flexWrap: 'wrap',
                            },
                            dense: {
                                marginTop: 19,
                            },
                            menu: {
                                width: 200,
                            }
                        }} 
                        noValidate autoComplete="off">
                        <Grid container spacing={3} style={{ backgroundColor: "#fff" }}>
                            <Grid item xs={12} lg={12}>
                                <TextField
                                    label="Service"
                                    style={{ width: "100%", fontWeight: "bold" }}
                                    placeholder="Placeholder"
                                    fullWidth
                                    margin="normal"
                                    value={this.state.selectedSvc.name}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} lg={12}>
                                <TextField
                                    label="Service Subcategory"
                                    style={{ width: "100%", fontWeight: "bold" }}
                                    placeholder="Placeholder"
                                    fullWidth
                                    margin="normal"
                                    value={this.state.selectedSubSvc.name}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} lg={12}>
                                <TextField
                                    label="Title"
                                    style={{ width: "100%", fontWeight: "bold" }}
                                    placeholder="Placeholder"
                                    fullWidth
                                    margin="normal"
                                    value={this.state.title}
                                    onChange={this.handleChange('title')}
                                />
                            </Grid>
                            <Grid item xs={12} lg={12}>
                                <TextField
                                    label="Description"
                                    style={{ width: "100%", fontWeight: "bold" }}
                                    placeholder="Placeholder"
                                    fullWidth
                                    margin="normal"
                                    value={this.state.description}
                                    multiline
                                    onChange={this.handleChange('description')}
                                />
                            </Grid>
                            <Grid item xs={12} lg={12}>
                                <TextField
                                    select
                                    label="Impact"
                                    style={{ width: "100%", fontWeight: "bold"}}
                                    fullWidth
                                    margin="normal"
                                    value={this.state.activeImp}
                                    onChange={this.handleChange('activeImp')}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    margin="normal"
                                >
                                    <option value=""></option>
                                    {
                                        this.state.impact.map((v,i) => 
                                            <option key={i} value={v.id}>{v.name}</option>
                                        )
                                    }

                                </TextField>
                            </Grid>
                            <Grid item xs={12} lg={12}>
                                <TextField
                                    select
                                    label="Urgency"
                                    style={{ width: "100%", fontWeight: "bold"}}
                                    fullWidth
                                    margin="normal"
                                    value={this.state.activeUrg}
                                    onChange={this.handleChange('activeUrg')}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    margin="normal"
                                >
                                    <option value=""></option>
                                    {
                                        this.state.urgency.map((v,i) => 
                                            <option key={i} value={v.id}>{v.name}</option>
                                        )
                                    }

                                </TextField>
                            </Grid>
                            <Grid item xs={12} lg={12}>
                                {
                                    (this.state.activeStep <4) ?
                                    <Button variant="contained" color="primary" style={{ width: "100%" }} onClick={this.handleSubmit}>
                                        {
                                            (this.state.loadingSubmit) ? "LOADING" : "SUBMIT"
                                        }
                                    </Button>
                                    : null

                                }
                                
                            </Grid>
                            
                        </Grid>
                          
                    </form>

                );
            case 4:
                return (
                    <div>
                        <h1 style={{ textAlign: "center" }}>Finish</h1>
                        <Grid>
                            <Grid item xs={12} lg={12}>
                                <Button variant="contained" color="primary" style={{ width: "100%" }} onClick={() => this.callers()}>
                                    FINISH
                                </Button>
                            </Grid>
                        </Grid>

                    </div>
                    
                );
            default:
                return 'Uknown stepIndex';
        }
    }

    inserLog(paramEmail){


        let request_date = moment().format("YYYY-MM-DD");
        let request_time = moment().format("h:mm:ss a");
        let email = paramEmail;
        let activity = 'dashboard/other-applications-create-ticket';
    
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
    
    render() {
        const { props } = this;
        const steps = this.getSteps();
        const { activeStep } = this.state;

        if(this.state.loading !== true){
            return (
            <div>
                <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => {
                    return (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    );
                })}
                </Stepper>
                <StepperContent>
                {this.state.activeStep === steps.length ? (
                    <div>
                    <Typography className="instructions">
                        All steps completed - you&quot;re finished
                    </Typography>
                    <ButtonWrapper>
                        <Button onClick={this.handleReset}>Reset</Button>
                    </ButtonWrapper>
                    </div>
                ) : (
                    <Grid container spacing={3} style={{ backgroundColor: "#fff" }}>
                        <Grid item xs={12} lg={12}>
                            <Typography className="instructions">
                                {this.getStepContent(activeStep)}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} lg={12}>
                        {
                            (this.state.activeStep <4 || this.state.activeStep <1) ?
                            <Button variant="contained" disabled={activeStep === 0} style={{ width: "100%" }} onClick={this.handleBack}>
                                Back
                            </Button>
                            : null
                        }
                        </Grid>
                    </Grid>
                        
                )}
                </StepperContent>
                <Snackbar
                open={this.state.openDialog}
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
                open={this.state.openDialog}
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
    {TICKET_LIST_REQUEST, TICKET_SUBMIT }
  ),withStyles())(SimpleDialogDemo);