import React, { Component, PureComponent  } from 'react';
import PropTypes from 'prop-types';
import throttle from "lodash.throttle";
import AppBar from '../../components/uielements/appbar';
import Tabs, { Tab } from '../../components/uielements/tabs';
// import Lists, {
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   ListItemSecondaryAction
// } from "../../components/uielements/lists";
import Avatar from "../../components/uielements/avatars";
import Icon from "../../components/uielements/icon/index.js";
import Typography from '../../components/uielements/typography/index.js';
import { FullScreenDialogs } from './dialogs.style';
import Toolbar from '../../components/uielements/toolbar';
import ButtonCore from '@material-ui/core/Button';
import vegetables from '../../../src/images/vegetables.jpg';
import Slide from '@material-ui/core/Slide';
import IconButton from '../../components/uielements/iconbutton';
import StarRatings from 'react-star-ratings';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import moment from 'moment';
import Divider from '../../components/uielements/dividers';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import { Document, Page, pdfjs } from "react-pdf";
 pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const fullScreen = 100;

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

class BasicTabs extends PureComponent  {

	constructor(props) {
		super(props);
		this.state = {
      loading: false,
      numPages: null,
      pageNumber: 0,
      width:null,
      agendaDescription:'',
      agendaFileName:'',
      agendaFilePath:'',
      agendaId:'',
      agendaLatlong:'',
      agendaLocation:'',
      agendaSpeakerName:'',
      agendaTime:'',
      agendaTimeFinished:'',
      agendaTitle:'',
      eventId:'',
      setOpen:false,
      dataoption:[],
      renderSukses:false,
      pageRender:0

      }
      
      this.countryData = this.state.dataoption;
	
	}

  toggle = () =>  {
    this.setState({
      setOpen: !this.state.setOpen
    })

  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ 
      numPages:parseInt(numPages) - 1,
      renderSukses:true,
      pageRender: parseInt(this.state.pageRender) + 1
    });

    this.createSelectItems(numPages);

    console.log("sukses", this.state.pageRender);
  }

  onLoadSuccess = () => {
    alert("sukses");
  }

  createSelectItems(numPages) {
       
    for (let i = 0; i < numPages; i++) {             
         this.state.dataoption.push(''+i+'');   
         //here I will be creating my options dynamically based on
         //what props are currently passed to the parent component
    }
    // return items;
  }  

  generatedPage(width,agendaFilePath,numPages){

    var list = [];
    list.push(<li><PdfComponent wrapperDivSize={width} filesPdf={agendaFilePath} pageNumber={0} numPages={numPages} onDocumentLoadSuccess={this.onDocumentLoadSuccess} onLoadSuccess={this.onLoadSuccess}/></li>)

    for (let i = 1; i < numPages; i++) {             
      // list.push(<li>sdsds</li>);
      list.push(<li><PdfComponent wrapperDivSize={width} filesPdf={agendaFilePath} pageNumber={i} numPages={10} onDocumentLoadSuccess={this.onDocumentLoadSuccess}/></li>)
      //here I will be creating my options dynamically based on
      //what props are currently passed to the parent component
    }

    
    return list;
  }

  componentWillReceiveProps(nextProps){
  
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }


  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }


  changePageNumber(value){
    // console.log("valuenya"+ value);
    this.setState({
      pageNumber:value,
      setOpen: !this.state.setOpen
    })
  }


	componentDidMount(){

    this.updateWindowDimensions();

    // console.log("agenda menu files", this.props.location.state);

    this.setState({
      agendaDescription:this.props.location.state.agendaDescription,
      agendaFileName:this.props.location.state.agendaFileName,
      agendaFilePath:this.props.location.state.agendaFilePath,
      agendaId:this.props.location.state.agendaId,
      agendaLatlong:this.props.location.state.agendaLatlong,
      agendaLocation:this.props.location.state.agendaLocation,
      agendaSpeakerName:this.props.location.state.agendaSpeakerName,
      agendaTime:this.props.location.state.agendaTime,
      agendaTimeFinished:this.props.location.state.agendaTimeFinished,
      agendaTitle:this.props.location.state.agendaTitle,
      eventId:this.props.location.state.eventId,
    })

  } 

  onclickBack = () => {

    window.history.back();

  };


  render() {
    const { classes } = this.props;
    // const { value, dataCurrent, dataPass, dataMonthCurrent } = this.state;

    // console.log("dataMonthCurrent", dataMonthCurrent);
    const { pageNumber, numPages, setOpen } = this.state;

    return (
      <div className={classes.root} className="other_applications_my_ticket_div" >

          <div className="stickyHeader">

            <div className="eventBackgroundHeaderAgenda">

              <div className="headerkiri">
                <Icon className="eventJudulAgendaIcon" onClick={() => this.onclickBack()}>arrow_back</Icon> 
                <h1 className="eventJudulAgenda">Files</h1>
              </div>

              <div className="headerkanan">
                {
                  this.state.renderSukses == true ? 
                  <Button color="danger" className="buttonPDFChange" onClick={() => this.toggle()}>
                  Change Page
                  </Button> :

                  null

                }

                <div className="eventJudulAgenda" >Page {this.state.pageNumber} From {numPages}</div>
                
              </div>

              <div className="break"></div>

            </div>

          </div>

          <div style={{marginTop: "50px"}}>
          <div id="row" style={{minheight: "100vh", width: "100vw", display: "flex", overflow: "hidden"}}>
          <ul className="ulListPDFAgendaFiles">
            {this.generatedPage(this.state.width,this.state.agendaFilePath,numPages)}
            {/* <li><PdfComponent wrapperDivSize={this.state.width} filesPdf={this.state.agendaFilePath} pageNumber={this.state.pageNumber} numPages={numPages} onDocumentLoadSuccess={this.onDocumentLoadSuccess}/></li>
            <li><PdfComponent wrapperDivSize={this.state.width} filesPdf={this.state.agendaFilePath} pageNumber={2} numPages={numPages} onDocumentLoadSuccess={this.onDocumentLoadSuccess}/></li> */}
          </ul>
          <div className="listPdf"></div>
          </div>
          <div className="break"></div>
          <br/><br/>
          </div>

          <Modal isOpen={this.state.setOpen} toggle={() => this.toggle()} className={this.props.className} centered={true}>
          <ModalHeader toggle={() => this.toggle()}>Please choose one : </ModalHeader>
          <ModalBody>
          <div className="listDialog">
          <List>
          {this.state.dataoption.map(option => (
            <ListItem button  className={option == this.state.numPages ? "deviderListDialogLast" : "deviderListDialog"} onClick={() => this.changePageNumber(option)}>
            <ListItemText primary={`Page ` + option + ` From ` + numPages}/>
            </ListItem>
          ))}
        </List>
          </div>

          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.toggle()}>Cancel</Button>
          </ModalFooter>
        </Modal>


      </div>
    );
  }
} 

BasicTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default BasicTabs;

export default compose(connect(
	// state => ({
	//   data:state.IattendHomeRequest
	// }),
	// {IATTENDHOME_LIST_REQUEST}
),withStyles())(BasicTabs);


class PdfComponent extends PureComponent {
  render() {
    return (
      <div>
        <Document
          file={this.props.filesPdf}
          onLoadSuccess={this.props.onDocumentLoadSuccess}
        >
          <Page pageIndex={parseInt(this.props.pageNumber)} width={this.props.wrapperDivSize} />
          {/* <p>Page {this.props.pageNumber} of {this.props.numPages}</p> */}
        </Document>
      </div>
    )
  }
}