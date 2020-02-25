import React from "react";
import PropTypes from "prop-types";
import AppBar from "../../../src/components/uielements/appbar";
import Tabs, { Tab } from "../../../src/components/uielements/tabs";
import Icon from "../../../src/components/uielements/icon/index.js";

function TabContainer(props) {
  return <div style={{ padding: 8 * 3 }}>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

class ScrollableTabsButtonPrevent extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.iconRoot}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={this.handleChange}
            scrollable
            scrollButtons="off"
          >
            <Tab icon={<Icon>phone</Icon>} />
            <Tab icon={<Icon>favorite</Icon>} />
            <Tab icon={<Icon>person_pin</Icon>} />
            <Tab icon={<Icon>help</Icon>} />
            <Tab icon={<Icon>shopping_busket</Icon>} />
            <Tab icon={<Icon>thumb_down</Icon>} />
            <Tab icon={<Icon>thumb_up</Icon>} />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>Item One</TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
        {value === 3 && <TabContainer>Item Four</TabContainer>}
        {value === 4 && <TabContainer>Item Five</TabContainer>}
        {value === 5 && <TabContainer>Item Six</TabContainer>}
        {value === 6 && <TabContainer>Item Seven</TabContainer>}
      </div>
    );
  }
}

ScrollableTabsButtonPrevent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default ScrollableTabsButtonPrevent;
