import React from 'react';
import PropTypes from 'prop-types';
import Lists, {
  ListItem,
  ListItemAvatar,
} from '../../../src/components/uielements/lists';
import Grids from '../../../src/components/uielements/grid/';
import Slide from '@material-ui/core/Slide';
import Setting from '../../settings';
import { SimpleImg } from 'react-simple-img';
import { Base64 } from 'js-base64';

//Scroll
import Scrollbars from '../../components/utility/customScrollBar';
import {
  Contactbox,
  Content,
  FormControl,
  InputSearch,
  InputLabel,
  Button,
  Icon,
} from './listnewsStyle';
import { BlockPicker } from 'react-color';
//
const { apiUrl } = Setting;

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
  width: '100%'
};

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

  handleClickOpen = (params) => {
    let paramIdBerita = Base64.encode("dexan-life/"+params.POST_ID);
    this.props.history.push({
      pathname: "/dashboard/detail-news/dexan-life/"+paramIdBerita,     
    });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, life } = this.props;
    const { dense, secondary, detailLifes, setJumlahTeks } = this.state;

    const {
      contacts,
      contactGroup,
      seletedContact,
      searchText,
      setSelectedContact,
      updateContacts,
      setSearch,
      height,
      widgetHeight,
      title,
      stretched,
    } = this.props;

    const scrollHeight = widgetHeight || height - 280;
    return (
        <div >
          {/* <Grids item xs={12} md={6}></Grids> */}
          <Grids>
            <div>
              <Scrollbars style={{ height: scrollHeight }}>
              <Lists dense={dense} style={flexContainer}>
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
                                {/* <div className='dashboard_life_div_text'>
                                  <h1 className='dashboard_life_div_text_title'>{v.NAME}</h1>
                                  <p className='dashboard_life_div_text_description'>{ ReactHtmlParser(v.PREVIEW_TEXT.slice(0, setJumlahTeks)+" ...") }</p> */}
                                  {/* <p className='dashboard_life_div_text_description'>{v.PREVIEW_TEXT.slice(0, setJumlahTeks)+" ..."}</p> */}
                                {/* </div> */}
                            </div>
                        </ListItemAvatar>
                        
                      </ListItem> 
                    ))
                    : null
                }
              </Lists>

              </Scrollbars>
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
