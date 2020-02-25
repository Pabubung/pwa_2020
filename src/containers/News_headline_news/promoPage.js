import React from "react";
import PropTypes from "prop-types";
import {
  GridListTile,
  GridListTileBar
} from "../../../src/components/uielements/gridlist";
import { Root, GridListSingle, Icon } from "../Home/grid.style";
import {Lazy} from 'react-lazy';
import Setting from '../../settings';

const { apiUrl } = Setting;
const urlApi = apiUrl+"/rest/1/yslc0xngd82nofw7/v1.dexa.mobile.dashboard";

function SingleLineGridList(props) {
  return (
    <Root>
      {
        (typeof props.promo !== "undefined") ? 
          <GridListSingle cols={2.5}>
            {props.promo.map(tile => (
              <Lazy ltIE9>
                <GridListTile key={tile.id}>
                  <img src={apiUrl+"/api/static/images/promo/"+tile.path} alt={tile.title} />
                </GridListTile>
              </Lazy>
              
            ))}
          </GridListSingle>
          : null
      }
      
    </Root>
  );
}

SingleLineGridList.propTypes = {
  classes: PropTypes.array.isRequired
};

export default SingleLineGridList;
