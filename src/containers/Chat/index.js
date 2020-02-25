import React, { Component } from 'react';
import LayoutWrapper from '../../../src/components/utility/layoutWrapper';
import {
  Row,
  FullColumn,
} from '../../../src/components/utility/rowColumn';
import homeActions from "../../redux/home/actions";
import Setting from '../../settings';

// Bottom Nav
import BottomNavigation from '../UiElements/BottomNavigation/bottomNavigation';
// Bottom Nav

// Basic Tabs
import PropTypes from 'prop-types';

function TabContainer(props) {
  return <div style={{ padding: 8 * 3 }}>{props.children}</div>;
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
//Basic Tabs



const { HOME_GET, HOME_DETAIL_LIFE_REQUEST, HOME_DETAIL_SEHAT_REQUEST } = homeActions;
const { apiUrl } = Setting;
const jwt = require('jsonwebtoken');

export default class GridListExamples extends Component {
  body(props){
      return (
        <LayoutWrapper className="LayoutWrapper_2020">
        <Row>
          <FullColumn>
            {/* <Papersheet
              className={"dashboard_slideshow_header"} > */}
              <div>
                <h1>Ini buat selamat pagi</h1>
              </div>
            {/* </Papersheet> */}
          </FullColumn>
        </Row>
        <div className="divBottom_Nav_2020">
        <BottomNavigation {...props} />
        </div>
        </LayoutWrapper>
      )
  }
  render() {
    const { props } = this;
    return (
      <div className="eventlist_div_body_2020">
      {this.body(props)}
      </div>
    );
  }
}
