import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import appActions from '../../../redux/app/actions';

import { withStyles } from '@material-ui/core/styles';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import Papersheet, {
  DemoWrapper
} from '../../../components/utility/papersheet';
import { Row,FullColumn } from '../../../components/utility/rowColumn';
import BottomNavigation from './bottomNavigation';
import BottomNavigationLabel from './bottomNavigationLabel';

const styles = {
  root: {
    width: 500,
  },
};

// const { toggleCollapsed } = appActions;

class BottomNavigationExample extends Component {
  render() {
    const { toggleCollapsed} = this.props;
    const { props } = this;
    return (
      <LayoutWrapper>
        <Row>
          <FullColumn>
            <Papersheet
              title="Bottom Navigation"
              codeBlock="UiElements/BottomNavigation/bottomNavigation.js"
            >
            <p>
              When there are only three actions, display both icons and text labels at all times.
            </p>
            <DemoWrapper>
              <BottomNavigation {...props} />
            </DemoWrapper>
            </Papersheet>
          </FullColumn>
          </Row>
          {/* <Row>
            <FullColumn>
              <Papersheet
                title="Bottom Navigation with no label"
                codeBlock="UiElements/BottomNavigation/bottomNavigationLabel.js"
              >
              <p>
                If there are four or five actions, display inactive views as icons only.
              </p>
              <DemoWrapper>
                <BottomNavigationLabel {...props} />
              </DemoWrapper>
              </Papersheet>
            </FullColumn>
            </Row> */}
      </LayoutWrapper>
    );
  }
}
export default withStyles(styles)(BottomNavigationExample);

// export default connect(
// 	state => ({
// 		...state.App,
// 		locale: state.LanguageSwitcher.language.locale,
// 		customizedTheme: state.ThemeSwitcher.topbarTheme,
// 	}),
// 	{ toggleCollapsed }
// )(Topbar);
