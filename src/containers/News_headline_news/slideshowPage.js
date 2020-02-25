import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import Setting from '../../settings';

import ReactHtmlParser from 'react-html-parser';
import Slide from '@material-ui/core/Slide';
import { FullScreenDialogs } from './dialogs.style';
import AppBar from '../../../src/components/uielements/appbar';
import Toolbar from '../../../src/components/uielements/toolbar';
import IconButton from "../../components/uielements/iconbutton";
import Typography from '../../../src/components/uielements/typography/index.js';
import {Icon} from "./grid.style";
import Button from '../../../src/components/uielements/button';
import vegetables from '../../../src/images/mateadmin.png';

const { apiUrl } = Setting;
const urlApi = apiUrl+"/rest/1/yslc0xngd82nofw7/v1.dexa.mobile.dashboard";

function splitters(string){
  var srcWithQuotes = string.match(/src\=([^\s]*)\s/)[1];
  // var src = apiUrl + srcWithQuotes.substring(1,srcWithQuotes.length - 1); 

  // var str = srcWithQuotes.substring(1,srcWithQuotes.length - 1);
  // var res = str.replace("upload/medialibrary/", "");

  // var filename = str.replace(/^.*[\\\/]/, '');


  // var srcStatic = apiUrl+"/api/static/images/slideshow/" + srcWithQuotes.substring(1,srcWithQuotes.length - 1)
  var src = apiUrl + "/api/static/images/slideshow/temp_slideshow.jpg"; 

  return src
}

class DemoCarousel extends Component {


    state = {
      dense: false,
      secondary: false,
      open: false,
      detailLifes: ""
    };

    Transition() {
      return <Slide direction="up" {...this.props} />;
    }
  
    handleClickOpen = (params) => {
      this.setState({ open: true, detailLifes: params });
    };
  
    handleRequestClose = () => {
      this.setState({ open: false });
    };


    render() {

      const {slides, classes} = this.props;
      const { dense, secondary, detailLifes } = this.state;

      
        return (

          <div>

          <Carousel
            // showThumbs={false}
            swipeable={true}
            // useKeyboardArrows={false}
            // showIndicators={false}
            showStatus={false}
            autoPlay={true}
            >

                {
                  (typeof slides !== "undefined") ?
                    slides.map((article, index) => 

                      <div
                      key={index}
                      onClick={() => this.handleClickOpen(article)}
                      >
                    <img src={article.imgSlide} />
                    <p className="legend">{article.title}</p>
                </div>


                    )
                  : null
                }

            </Carousel>

            <FullScreenDialogs
              fullScreen
              open={this.state.open}
              onClose={this.handleRequestClose}
              transition={this.Transition}
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
              {/* <img className={'dashboard_detail_page_img'} src={(typeof detailLifes === "object") ? splitters(detailLifes.imgSlide) : vegetables} alt="Logo" /> */}
              <div className="dashboard_detail_page_img">
                  <img className={'dashboard_detail_page_img'} src={(typeof detailLifes === "object") ? detailLifes.imgSlide : vegetables} alt="Logo" />
              </div>
              <div className="dashboard_detail_page" >
                {/* <h1 className="dashboard_detail_page_title" >
                  {
                    (typeof detailLifes === "object") ?
                    detailLifes.NAME : null
                  }
                </h1> */}
                <br/>
                <p className="dashboard_detail_page_title">
                  {
                    (typeof detailLifes === "object") ?
                    ReactHtmlParser(detailLifes.DETAIL_TEXT) : null
                  }
                </p>
              </div>
            </FullScreenDialogs>

          </div>
            
        );
    }
}

export default DemoCarousel;
 
// Don't forget to include the css in your page
 
// Using webpack
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
 
// Using html tag:
// <link rel="stylesheet" href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"/>
 