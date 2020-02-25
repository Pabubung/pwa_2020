import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import LayoutWrapper from '../../../src/components/utility/layoutWrapper';
import Papersheet from '../../../src/components/utility/papersheet';
import {
  Row,
  HalfColumn,
  FullColumn,
} from '../../../src/components/utility/rowColumn';
import Dexanlifepage from '../News_headline_news/dexanlifepage';
import SingleLineGridList from '../News_gue_sehat/singleLineGridList';
import PromoPage from '../Home/promoPage';
import SlideshowPage from '../Home/slideshowPage';
import { connect } from "react-redux";
import homeActions from "../../redux/home/actions";
import compose from 'recompose/compose';
import Loader from 'react-loader-spinner';

const { 
  HOME_GET, 
  // HOME_DETAIL_LIFE_REQUEST, HOME_DETAIL_SEHAT_REQUEST 
} = homeActions;

class GridListExamples extends Component {
  state={
    data: {},
    // gs: [],
    promo: [],
    life: [],
    slideShow:[],
    loading: false
  }


  componentWillReceiveProps(nextProps){
    // console.log("trace here", nextProps.data.result.slideshowEmbed);
    this.setState({
      data: nextProps.data,
      loading: nextProps.data.loading,
      // gs: nextProps.data.result.guesehat,
      promo: nextProps.data.result.promo,
      life: nextProps.data.result.life,
      slideShow: nextProps.data.result.slideshow
    })
  }

  componentDidMount(){
    this.props.HOME_GET();
  }

  body(props){

    if(this.state.life !== undefined ){

      return (
        <LayoutWrapper>

        {/* <Row>
          <FullColumn>
            <Papersheet
              className={"dashboard_slideshow_header"}
            >
              <SlideshowPage slides={this.state.slideShow} {...props} />
            </Papersheet>
          </FullColumn>
        </Row> */}

        <Row>
          <FullColumn>
            <Papersheet>
              <h1 className="dashboard_slideshow_header_text">Dexan Life</h1>
              <Dexanlifepage life={this.state.life} {...props} />
            </Papersheet>
          </FullColumn>
        </Row>

        <Row>
          <FullColumn>
            <Papersheet>
              <h1 className="dashboard_slideshow_header_text">Dexan Promo</h1>
              <PromoPage promo={this.state.promo} {...props}/>
            </Papersheet>
          </FullColumn>
        </Row>
  
      </LayoutWrapper>
      )

    }else{
      return (
        <div className="my_Loading_div">
        <div>
        <Loader type="Circles" color="#somecolor" height={30} width={30} /> </div>
        <div><h1 style={{fontSize:'1em', marginLeft:'0.5em'}}>Loading ...</h1></div>
        </div>
      );
    }



  }

  render() {
    const { props } = this;

    return (
      <div className="eventlist_div_body">
        {this.body(props)}
      </div>
    );
  }
}
export default compose(connect(
  state => ({
    data:state.Home
  }),
  { HOME_GET
    // HOME_DETAIL_LIFE_REQUEST, HOME_DETAIL_SEHAT_REQUEST 
  }
),withStyles())(GridListExamples);
