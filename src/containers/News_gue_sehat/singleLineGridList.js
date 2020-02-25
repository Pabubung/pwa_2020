import React, {Component} from "react";
import Lists, {
  ListItem,
  ListItemAvatar,
} from '../../../src/components/uielements/lists';
import { Root, GridListSingle, Icon } from "../Home/grid.style";
import IconButton from '../../../src/components/uielements/iconbutton/';
import Typography from '../../../src/components/uielements/typography/index.js';
import vegetables from '../../../src/images/mateadmin.png';
import { FullScreenDialogs } from './dialogs.style';
import Button from '../../../src/components/uielements/button';
import AppBar from '../../../src/components/uielements/appbar';
import Toolbar from '../../../src/components/uielements/toolbar';
import Grids from '../../../src/components/uielements/grid/';
import Slide from '@material-ui/core/Slide';
import {Lazy} from 'react-lazy';
import ReactHtmlParser from 'react-html-parser';
import Image from 'react-image-resizer';
import { SimpleImg } from 'react-simple-img';

import axios from 'axios';
import { Base64 } from 'js-base64';
import moment from 'moment';


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class SingleLineGridList extends Component{
  state = {
    dense: false,
    secondary: false,
    open: false,
    detailLifes: [],
    content:''
  };


  componentDidMount(){
    let data = localStorage.getItem("data");
    if(data !== "undefined"){

    const { audienceid, bitrix, userLogin } = JSON.parse(data) 

    this.setState({
      userEmail:userLogin.username
    })

    }

  }

  componentWillReceiveProps(nextProps){
    if(typeof nextProps.data.detailSehat !== "undefined"){
      this.setState({
        detailLifes: nextProps.data.detailSehat
      })
    }
  }

  handleClickOpen = (params) => {
    // console.log("test", params.content);
    // let slugs = this.slugRemover(params);
    // console.log(slugs);
    // this.props.HOME_DETAIL_SEHAT_REQUEST({slugs:slugs})
    this.setState({ open: true, content:params });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  slugRemover =(params) => {
    let slug = params.toLowerCase().replace("https://www.guesehat.com/", "");
    return slug;
  }

  bodyCategory(param){

    switch (param) {
      case "Medis":
        return(
          <span className="categorysehat_medis">{param}</span>
        )
        break;
      case "Wanita":
          return(
            <span className="categorysehat_wanita">{param}</span>
          )
        break;
      case "Sex & Love":
          return(
            <span className="categorysehat_sex">{param}</span>
          )
        break;
      case "Lifestyle":
        return(
          <span className="categorysehat_lifestyle">{param}</span>
        )
        
    }

  }

  clickGoToUrl(kategori,link){

    
    let username = this.state.userEmail;
    let request_date = moment().format("YYYY-MM-DD");
    let request_time = moment().format("h:mm:ss a");
    let email = username;
    let category = kategori;

    let token = Base64.encode(request_date)+':'+Base64.encode(request_time)+':'+Base64.encode(email)+':'+Base64.encode(category);
    let tokenKedua = Base64.encode(token);

    let payload3 = {
      userToken: tokenKedua

    };

    let urlIattend = "https://portalmobile.dexagroup.com/api/statistik/mobile/v1/insertLogGuesehat";

    const request = axios.post(urlIattend, payload3, {
    // headers: { 'Authorization': 123456 }
    })
    request
    .then(response => {
        // -Save the JWT token
        // console.log("balikan statistik",response);

        if(response.data == 'ok'){
          window.open(link, '_blank');
        }

    })
    .catch((err) => {
      //  dispatch(authError('bad login info'))
      console.log("AXIOS ERROR: ", err);

    });



  }

  render(){
    const { classes, sehat } = this.props;
    const { dense, secondary, detailLifes } = this.state;
    return (
      <div className="dexanlife_div">
        <Grids item xs={12} md={6}>
          <div className={classes.demo}>
            <Lists dense={dense} >
              {
                (typeof sehat !== "undefined") ?
                  sehat.map(tile => (
                    <ListItem onClick={()=> this.clickGoToUrl(tile.category,tile.link["0"])} className="dashboard_guesehat_ul" key={tile.id}>
                      <div className='dashboard_life_div_text'>
                        <h1 className='dashboard_guesehat_div_text_title'>{tile.title["0"]}</h1>
                        {this.bodyCategory(tile.category)}
                      </div>
                      <ListItemAvatar>
                          <div className='dashboard_life_div'>
                            
                              {/* <img className={'dashboard_life_img'} src={v.img} alt={v.title} /> */}
                              {/* <img className={'dashboard_life_img'} src={apiUrl + "/api/static/images/slideshow/temp_slideshow.jpg"} alt={v.title} /> */}
                              {/* <img className={'dashboard_life_img'} src={tile.thumbnail["0"]} alt={tile.title["0"]} /> */}
                              <SimpleImg
                                  height={70}
                                  width={100}
                                  className={'dashboard_guesehat_img'} 
                                  placeholder="linear-gradient(rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%)"
                                  src={tile.thumbnail["0"]}
                                />
                            
                          </div>
                      </ListItemAvatar>
                    </ListItem> 
                  ))
                  : null
              }


            </Lists>
          </div>
        </Grids>
      </div>
    );
  }
}


export default SingleLineGridList;
