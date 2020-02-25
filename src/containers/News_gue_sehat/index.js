import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import LayoutWrapper from '../../../src/components/utility/layoutWrapper';
import Papersheet from '../../../src/components/utility/papersheet';
import {
  Row,
  FullColumn,
} from '../../../src/components/utility/rowColumn';
import SingleLineGridList from '../News_gue_sehat/singleLineGridList';
import { connect } from "react-redux";
import gueSehatActions from "../../redux/gueSehat/actions";
import compose from 'recompose/compose';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import { Base64 } from 'js-base64';
import moment from 'moment'; 

const { GUESEHAT_GET } = gueSehatActions;

class GridListExamples extends Component {
  state={
    data: {},
    gs: [],
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
      gs: nextProps.data.result.guesehat,
      promo: nextProps.data.result.promo,
      life: nextProps.data.result.life,
      slideShow: nextProps.data.result.slideshow
    })
  }

  componentDidMount(){
    this.props.GUESEHAT_GET();

    let data = localStorage.getItem("data");
    if(data !== "undefined"){

      const { audienceid, bitrix, userLogin } = JSON.parse(data) 
      // console.log("myleave request length", audienceid);
      this.inserLog(userLogin.username);
    }


  }

  inserLog(paramEmail){


    let request_date = moment().format("YYYY-MM-DD");
    let request_time = moment().format("h:mm:ss a");
    let email = paramEmail;
    let activity = 'dashboard/news-gue-sehat';

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

  body(props){

    if(this.state.gs !== undefined ){

      return (
        <LayoutWrapper>
  
        <Row>
          <FullColumn>
          <h1 className="pop-title">Gue Sehat</h1>
            <Papersheet>
              <SingleLineGridList sehat={this.state.gs} {...props} />
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
    data:state.Guesehat
  }),
  { GUESEHAT_GET
    // HOME_DETAIL_LIFE_REQUEST, HOME_DETAIL_SEHAT_REQUEST 
  }
),withStyles())(GridListExamples);
