import React from 'react';
import PropTypes from 'prop-types';
import Lists, {
  ListItem,
  ListItemAvatar,
} from '../../../src/components/uielements/lists';
import IconButton from '../../../src/components/uielements/iconbutton/';
import Grids from '../../../src/components/uielements/grid/';
import Typography from '../../../src/components/uielements/typography/index.js';
import Icon from '../../../src/components/uielements/icon/index.js';
import vegetables from '../../../src/images/mateadmin.png';
import { FullScreenDialogs } from './dialogs.style';
import Button from '../../../src/components/uielements/button';
import AppBar from '../../../src/components/uielements/appbar';
import Toolbar from '../../../src/components/uielements/toolbar';
import Slide from '@material-ui/core/Slide';
import {Lazy} from 'react-lazy';
import ReactHtmlParser from 'react-html-parser';
import Image from 'react-image-resizer';
import Setting from '../../settings';
import { SimpleImg } from 'react-simple-img';
import { Base64 } from 'js-base64';

const { apiUrl } = Setting;

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class InteractiveList extends React.Component {
  state = {
    dense: false,
    secondary: false,
    open: false,
    detailLifes: [],
    content:'',
    // setJumlahTeks:parseInt(window.innerWidth) / 5 - 10
    setJumlahTeks:parseInt(window.innerWidth) / 2 - 50
  };

  componentWillReceiveProps(nextProps){

    if(typeof nextProps.data.detailLife !== "undefined"){
      
      this.setState({
        detailLifes: nextProps.data.detailLife
      })
    }
  }

  handleClickOpen = (params) => {
    // console.log("test", params.POST_ID)
    // console.log("test", this.props)
    // this.props.HOME_DETAIL_LIFE_REQUEST({idLife:params})

    // http://localhost:3000/dashboard/detail-news/dexan-life/ZGV4YW4tbGlmZS8zODMxMQ==

    // this.setState({ open: true, content: params });

    // // Base64.decode(paramIdBerita)

    let paramIdBerita = Base64.encode("dexan-life/"+params.POST_ID);

    this.props.history.push({
      pathname: "/dashboard/detail-news/dexan-life/"+paramIdBerita,
      // state: { 
      //   eventCreated_by: v.location.state.eventCreated_by,
      //   eventDate: v.location.state.eventDate,
      //   eventDate_created: v.location.state.eventDate_created,
      //   eventDate_end: v.location.state.eventDate_end,
      //   eventDate_updated: v.location.state.eventDate_updated,
      //   eventDescription: v.location.state.eventDescription,
      //   eventId: v.location.state.eventId,
      //   eventImage: v.location.state.eventImage,
      //   eventLat_long: v.location.state.eventLat_long,
      //   eventLocation: v.location.state.eventLocation,
      //   eventName:v.location.state.eventName
      // }
    });


  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, life } = this.props;
    const { dense, secondary, detailLifes, setJumlahTeks } = this.state;

    return (
        <div className="dexanlife_div">
          <Grids item xs={12} md={6}>
            <div className={classes.demo}>
              <Lists dense={dense} >
                {
                  (typeof life !== "undefined") ?
                    life.map(v => (
                      <ListItem onClick={() => this.handleClickOpen(v)} className="dashboard_life_ul" key={v.id}>
                        <ListItemAvatar>
                            <div className='dashboard_life_div'>
                              
                                {/* <img className={'dashboard_life_img'} src={v.img} alt={v.title} /> */}
                                {/* <img className={'dashboard_life_img'} src={apiUrl + "/api/static/images/slideshow/temp_slideshow.jpg"} alt={v.title} /> */}
                                <SimpleImg
                                  height={70}
                                  width={100}
                                  className={'dashboard_life_img'} 
                                  placeholder="linear-gradient(rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%)"
                                  src={v.PREVIEW_PICTURE} 
                                />
                                {/* <img className={'dashboard_life_img'} src={v.image} alt={v.title} /> */}
                              
                            </div>
                        </ListItemAvatar>
                        <div className='dashboard_life_div_text'>
                          <h1 className='dashboard_life_div_text_title'>{v.NAME}</h1>
                          <p className='dashboard_life_div_text_description'>{ ReactHtmlParser(v.PREVIEW_TEXT.slice(0, setJumlahTeks)+" ...") }</p>
                          {/* <p className='dashboard_life_div_text_description'>{v.PREVIEW_TEXT.slice(0, setJumlahTeks)+" ..."}</p> */}
                        </div>

                      </ListItem> 
                    ))
                    : null
                }

                <FullScreenDialogs
                  fullScreen
                  open={this.state.open}
                  onClose={this.handleRequestClose}
                  transition={Transition}
                >
                  <AppBar className={classes.appBar}>
                    <Toolbar>
                      <IconButton
                        color="contrast"
                        onClick={this.handleRequestClose}
                        aria-label="Close"
                        className="dashboard_detail_page_button_close"
                      >
                      <Icon>close</Icon>
                      </IconButton>
                      <Typography type="title" color="inherit" className="dashboard_dialog_close">
                        Detail
                      </Typography>
                      <Button color="contrast" className="dashboard_dialog_save" onClick={this.handleRequestClose}>
                        Close
                      </Button>
                    </Toolbar>
                  </AppBar>
                  <div className="dashboard_detail_page_img">
                  <img className={'dashboard_detail_page_img'} src={(typeof this.state.content === "object") ? this.state.content.DETAIL_PICTURE : vegetables} alt="Logo" />
                  {/* <img className={'dashboard_detail_page_img'} src={(typeof this.state.content === "object") ? this.state.content.img : vegetables} alt="Logo" /> */}
                  {/* <Image
                    // src={(typeof this.state.content === "object") ? this.state.content.img : vegetables}
                    src={apiUrl + "/api/static/images/slideshow/temp_slideshow.jpg"}
                    width={window.width}
                    height={240}
                  /> */}
                  </div>


                  <div className="dashboard_detail_page" >
                    <h1 className="dashboard_detail_page_title" >
                      {
                        (typeof this.state.content === "object") ?
                        this.state.content.NAME: null
                      }
                    </h1>
                    <p>
                      {
                        (typeof this.state.content === "object") ?
                        <small>{this.state.content.date}</small> : null
                      }
                    </p>
                    <p className="dashboard_detail_page_title">
                    {
                    (typeof this.state.content === "object") ?
                    ReactHtmlParser(this.state.content.DETAIL_TEXT) : null
                  }
                </p>
                  </div>
                </FullScreenDialogs>
              </Lists>
            </div>
          </Grids>
          <br/>
        </div>
    );
  }
}

InteractiveList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default InteractiveList;
