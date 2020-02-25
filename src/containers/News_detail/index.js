import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, FullColumn } from '../../../src/components/utility/rowColumn';
import Papersheet from '../../../src/components/utility/papersheet';
import LayoutWrapper from '../../../src/components/utility/layoutWrapper';
import GitResult from '../../../src/components/github/githubResult';
import { withStyles } from '@material-ui/core/styles';


import taskActions from "../../redux/taskApproval/actions";
import compose from 'recompose/compose';
import Loader from 'react-loader-spinner';
import Typography from '../../../src/components/uielements/typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';
import { Base64 } from 'js-base64';
import moment from 'moment';
import Icon from "../../components/uielements/icon/index.js";
// import ReactHtmlParser from 'react-html-parser';
import ReactHtmlParser, {
  convertNodeToElement,
  processNodes
} from "react-html-parser";

function transform(node, index) {
  // return null to block certain elements
  // don't allow <span> elements
  // if (node.type === "tag" && node.name === "span") {
  //   return null;
  // }

  // // Transform <ul> into <ol>
  // // A node can be modified and passed to the convertNodeToElement function which will continue to render it and it's children
  // if (node.type === "tag" && node.name === "ul") {
  //   node.name = "ol";
  //   return convertNodeToElement(node, index, transform);
  // }

  // // return an <i> element for every <b>
  // // a key must be included for all elements
  // if (node.type === "tag" && node.name === "b") {
  //   return <i key={index}>{processNodes(node.children, transform)}</i>;
  // }

  // // all links must open in a new window
  // if (node.type === "tag" && node.name === "a") {
  //   node.attribs.target = "_blank";
  //   // console.log(node);
  //   // console.log(index);
  //   return convertNodeToElement(node, index, transform);
  // }

  // if (node.type === "tag" && node.name === "button") {
  //   return (
  //     <Button variant="contained" color="primary" key={index}>
  //       {processNodes(node.children, transform)}
  //     </Button>
  //   );
	// }

	if (node.type === "tag" && node.name === "img") {
		node.attribs.width = "100%";
		node.attribs.height = "auto";
		node.attribs.style = "margin-bottom:15px;";
    // console.log("ssss" + JSON.stringify(node));
    // console.log(index);
    return convertNodeToElement(node, index, transform);
  }
	

}

const { TASK_LIST_REQUEST } = taskActions;

const options = {
  decodeEntities: true,
  transform
};

class GitSearch extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data:[],
			loading: true,
			searchText:'',
			authorIdLogin:'',
			token:'',
			email:'',
			fullname:'',
			error:'',
			img:'',
			content:''
	  	}
	
	}

	componentDidMount(){

		let data = localStorage.getItem("data");
		if(data !== "undefined"){
			const { bitrix, userLogin, token } = JSON.parse(data) 
			
			// console.log("tokennya : " + token)

		  this.setState({
			authorIdLogin : bitrix.result.data.ID,
			token: token,
			email:userLogin.username,
			fullname: bitrix.result.data.NAME,
			kategori: this.props.match.params.kategori
			});
			
			// Insert log //
			this.inserLog(userLogin.username,this.props.match.params.id);
			this.getDetailNews(this.props.match.params.id,this.props.match.params.kategori,token);

		}


		// console.log(this.props.match.params);

		// let idBerita = this.props.match.params.id;
		// let token = this.state.token;

    // let payload3 = {
		// 	userToken: token,
		// 	idBerita: idBerita
    // };

    // let urlIattend = "https://portalmobile.dexagroup.com/api/statistik/mobile/v1/insertLogActivity";

    // const request = axios.post(urlIattend, payload3, {
    // // headers: { 'Authorization': 123456 }
    // })
    // request
    // .then(response => {
    //     // -Save the JWT token
    //     console.log("balikan statistik",response);

    // })
    // .catch((err) => {
    //   //  dispatch(authError('bad login info'))
    //   console.log("AXIOS ERROR: ", err);

    // });



	} 


	getDetailNews(paramIdBerita,paramKategori,token){


    let payload3 = {
			userToken: token,
			userBeritaId: paramIdBerita,
			userBeritaKategori:paramKategori

    };

    let urlIattend = "https://portalmobile.dexagroup.com/api/other/mobile/v1.1.5/getDetailNews";

    const request = axios.post(urlIattend, payload3, {
    // headers: { 'Authorization': 123456 }
    })
    request
    .then(response => {
        // -Save the JWT token
				// console.log("balikan getDetailNews",response.data.data);
				
				if(response.data.result){

					this.setState({
						name: response.data.data[0].NAME,
						img: response.data.data[0].DETAIL_PICTURE,
						content: response.data.data[0].DETAIL_TEXT,
						loading: false
					})

				} else {

						this.props.history.push({
							pathname: "/dashboard"
						});

						// this.setState({
						// 	error: 'Maaf Artikel ini tidak ada didalam sistem kami'
						// })

					}

    })
    .catch((err) => {
      //  dispatch(authError('bad login info'))
      console.log("AXIOS ERROR: ", err);

    });

	}


	inserLog(paramEmail,paramIdBerita){


    let request_date = moment().format("YYYY-MM-DD");
    let request_time = moment().format("h:mm:ss a");
		let email = paramEmail;

		let activity = "dashboard/detail-news/"+Base64.decode(paramIdBerita);
		// console.log(activity);

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



	componentWillReceiveProps(nextProps){


	}

	onclickBack = () => {

		// console.log("onclickBack : "+ JSON.stringify(this.props));

		this.props.history.push({
      pathname: "/dashboard"
    });

		// window.history.back();
	
	};


	body(){

		return(

			<div className="borderradis">

			<nav className="breadcrumbs">
							<li><a href="" >Home</a></li>
							<li><a>Detail News</a></li>
							<li>{this.state.kategori.replace(/#|-/g,' ')}</li>
			</nav>

			<div className="divListAvatarDetail">

				<h1 className="h1juduldetailpage">{this.state.name}</h1>
				<ul className="ulListDetailPage">
					<li className="ulliAvatarDetailListPage">Reporter : <span className="nameColorDetailPage">Corporate Communication </span></li>
					<li className="ulliAvatarDetailListPage">Editor : <span className="nameColorDetailPage">Administrator </span></li>
				</ul>

				<div className="dashboard_detail_page_img_news_div">
            <img className={'dashboard_detail_page_img_news'} src={this.state.img} alt="Logo" />
        </div>

				<div className="dashboard_detail_page_img_news_div_content">
				{ReactHtmlParser(this.state.content, options)}
				</div>

				<div className="break"></div>

			</div>
			<div className="break"></div>
			</div>
			

		)

	}


	render() {
		const { searchText } = this.state;

		return (

			!this.state.loading ?

			<div>

			<div className="eventBackgroundHeaderIattend">
						<Icon className="eventJudulAgendaIcon" onClick={() => this.onclickBack()}>arrow_back</Icon> <h1 className="eventJudulAgenda">Back to home</h1>
						<div className="break"></div>
			</div>

			<LayoutWrapper>

			<Row style={{ marginTop: 23 }}>
				<FullColumn>
				<Papersheet>
					{this.body()}
				</Papersheet>
				</FullColumn>
			</Row>
			</LayoutWrapper>

			</div>

			: 

			<div className="my_Loading_div">
			<div>
			<Loader type="Circles" color="#somecolor" height={30} width={30} /> </div>
			<div><h1 style={{fontSize:'1em', marginLeft:'0.5em'}}>Loading ...</h1></div>
			</div>

		);
	}
}

// function mapStateToProps(state) {
// 	return { GitSearch: state.GithubSearch };
// }
// export default connect(mapStateToProps, { gitSearch, onPageChange })(GitSearch);

export default compose(connect(
	state => ({
	  data:state.TaskRequest
	}),
	{TASK_LIST_REQUEST}
  ),withStyles())(GitSearch); 