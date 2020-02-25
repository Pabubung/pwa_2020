import React, { Component } from 'react';
import { connect } from 'react-redux';
import SecondarySidebars from './secondarySidebar.style';
import actions from '../../redux/themeSwitcher/actions';

class SecondarySidebar extends Component {
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  setWrapperRef = node => {
    if (node) {
      this.wrapperRef = node;
    }
  };
  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      const { isActivated, currentActiveKey, switchActivation } = this.props;
      if (isActivated === currentActiveKey) {
        setTimeout(() => switchActivation(false), 50);
      }
    }
  };
  render() {
    const { isActivated, currentActiveKey, InnerComponent } = this.props;
    const SidebarClassName = `${
      isActivated === currentActiveKey ? 'active' : ''
    }`;
    if (!InnerComponent) {
      return <div />;
    }
    return (
      <div ref={this.setWrapperRef}>
        <SecondarySidebars className={SidebarClassName}>
          <InnerComponent {...this.props} />
        </SecondarySidebars>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    ...state.ThemeSwitcher,
    ...state.App,
  };
}
export default connect(mapStateToProps, actions)(SecondarySidebar);
