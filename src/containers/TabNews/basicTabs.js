import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '../../components/uielements/appbar';
import Tabs, { Tab } from '../../components/uielements/tabs';
import ListNews from '../Home/listnews';
import SimpleMediaCard from './simpleMediaCard';

function TabContainer(props) {
  return <div style={{ padding: 8 * 3 }}>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class BasicTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        {/* <AppBar position="static"> */}
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Coorporate" />
            <Tab label="Dexan Life" />
            <Tab label="Social" />
          </Tabs>
        {/* </AppBar> */}
        {value === 0 && <TabContainer><SimpleMediaCard/></TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
      </div>
    );
  }
}

BasicTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default BasicTabs;