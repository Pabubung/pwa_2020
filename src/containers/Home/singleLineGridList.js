import React, {Component} from "react";
import {
  GridListTile,
  GridListTileBar
} from "../../../src/components/uielements/gridlist";
import { Root, GridListSingle, Icon } from "../Home/grid.style";
import IconButton from '../../../src/components/uielements/iconbutton/';
import Typography from '../../../src/components/uielements/typography/index.js';
import vegetables from '../../../src/images/mateadmin.png';
import { FullScreenDialogs } from './dialogs.style';
import Button from '../../../src/components/uielements/button';
import AppBar from '../../../src/components/uielements/appbar';
import Toolbar from '../../../src/components/uielements/toolbar';
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
      <Root>
        {
          (typeof sehat !== "undefined") ? 
            <GridListSingle cols={2.5}>
              {sehat.map(tile => (
                <GridListTile  
                // onClick={() => this.handleClickOpen(tile.link["0"])} key={tile.id}
                // onClick={() => this.handleClickOpen(tile)} key={tile.id}
                onClick={()=> window.open(tile.link["0"], "_blank")}
                >
                  <Lazy ltIE9>
                    <img src={tile.thumbnail["0"]} alt={tile.title["0"]} />
                  </Lazy>
                  <div className='dashboard_sehat_div_title' >
                    <h1 className="dashboard_sehat_title" >{tile.title["0"]}</h1>
                  </div>
                </GridListTile>
              ))}
            </GridListSingle> : null
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
              {/* <img className={'dashboard_detail_page_img'} src={(typeof this.state.content === "object") ? this.state.content.thumbnail[0] : vegetables} alt="Logo" /> */}
              <div className="dashboard_detail_page_img">
                  <Image
                    src={(typeof this.state.content === "object") ? this.state.content.thumbnail[0] : vegetables}
                    width={window.width}
                    height={240}
                  />
              </div>

              <div className="dashboard_detail_page" >
                <h1 className="dashboard_detail_page_title" >
                  {
                    (typeof this.state.content === "object") ?
                    this.state.content.title["0"] : null
                  }
                </h1>
                <p>
                  {
                    (typeof this.state.content === "object") ?
                    ReactHtmlParser(this.state.content.content) : null
                  }
                </p>
              </div>
            </FullScreenDialogs>
      </Root>
    );
  }
}


export default SingleLineGridList;
