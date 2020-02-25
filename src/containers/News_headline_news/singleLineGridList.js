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
                    <ListItem onClick={()=> window.open(tile.link["0"], "_blank")} className="dashboard_life_ul" key={tile.id}>
                      <ListItemAvatar>
                          <div className='dashboard_life_div'>
                            
                              {/* <img className={'dashboard_life_img'} src={v.img} alt={v.title} /> */}
                              {/* <img className={'dashboard_life_img'} src={apiUrl + "/api/static/images/slideshow/temp_slideshow.jpg"} alt={v.title} /> */}
                              <img className={'dashboard_life_img'} src={tile.thumbnail["0"]} alt={tile.title["0"]} />
                            
                          </div>
                      </ListItemAvatar>
                      <div className='dashboard_life_div_text'>
                        <h1 className='dashboard_life_div_text_title'>{tile.title["0"]}</h1>
                      </div>

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
