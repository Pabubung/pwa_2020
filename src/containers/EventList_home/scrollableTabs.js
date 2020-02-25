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

class ScrollableTabsButtonForce extends React.Component {
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
      <div className={classes.scrollRoot}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            scrollable
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Item One" icon={<Icon>phone</Icon>} />
            <Tab label="Item Two" icon={<Icon>favorite</Icon>} />
            <Tab label="Item Three" icon={<Icon>person_pin</Icon>} />
            <Tab label="Item Four" icon={<Icon>help</Icon>} />
            <Tab label="Item Five" icon={<Icon>shopping_busket</Icon>} />
            <Tab label="Item Six" icon={<Icon>thumb_down</Icon>} />
            <Tab label="Item Seven" icon={<Icon>thumb_up</Icon>} />
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

ScrollableTabsButtonForce.propTypes = {
  classes: PropTypes.object.isRequired
};

export default ScrollableTabsButtonForce;
