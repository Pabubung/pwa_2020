import React from "react";
import PropTypes from "prop-types";
import Icon from "../../../components/uielements/icon/index.js";
import BottomNavigation, {
  BottomNavigationAction
} from "../../../components/uielements/bottomNavigation";

import { connect } from 'react-redux';
import appActions from '../../../redux/app/actions';

const { toggleCollapsed2 } = appActions;

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const { toggleCollapsed2} = this.props;
    return (
      console.log("Tess", value),
      <BottomNavigation value={value} onChange={this.handleChange} showLabels>
        <BottomNavigationAction
          label="Home" 
          icon={<Icon>home</Icon>} 
        />
        <BottomNavigationAction
          label="Chat"
          icon={<Icon>forum</Icon>}
          id="topbarCollapsed2"
					aria-label="open chat"
					onClick={toggleCollapsed2}
        />

        <BottomNavigationAction
          label="Profile"
          icon={<Icon>person</Icon>}
        />
      </BottomNavigation>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default SimpleBottomNavigation ;

// export default connect(
// 	state => ({
// 		...state.App,
// 		locale: state.LanguageSwitcher.language.locale,
// 		customizedTheme: state.ThemeSwitcher.topbarTheme,
// 	}),
// 	{ toggleCollapsed2 }
// )(SimpleBottomNavigation);
