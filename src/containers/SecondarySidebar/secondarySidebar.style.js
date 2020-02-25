import styled from 'styled-components';
import { palette } from 'styled-theme';
import Icons from '../../components/uielements/icon';
import { transition, boxShadow } from '../../settings/style-util';
import WithDirection from '../../settings/withDirection';

const Icon = styled(Icons)`
  font-size: 21px;
  color: ${palette('indigo', 3)};
`;

const SecondarySidebars = styled.div`
  background-color: ${palette('grey', 0)};
  width: 340px;
  height: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: fixed;
  top: 0;
  box-sizing: border-box;
  right: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '-360px')};
  left: ${props => (props['data-rtl'] === 'rtl' ? '-360px' : 'inherit')};
  z-index: 9999;
  ${transition()};
  ${boxShadow('0 0 9px rgba(0,0,0,0.4)')};

  > div {
  }

  * {
    box-sizing: border-box;
  }

  @media only screen and (max-width: 767px) {
    width: 300px;
    right: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '-310px')};
    left: ${props => (props['data-rtl'] === 'rtl' ? '-310px' : 'inherit')};
  }

  &.active {
    right: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '0')};
    left: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'inherit')};
  }

  .switcher {
    right: ${props => (props['data-rtl'] === 'rtl' ? '-98px' : 'inherit')};
    left: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '-98px')};
  }

  .switcherToggleBtn {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: ${palette('grey', 0)};
    outline: 0;
    border: 0;
    position: absolute;
    text-align: center;
    top: 200px;
    left: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '-50px')};
    right: ${props => (props['data-rtl'] === 'rtl' ? '-50px' : 'inherit')};
    cursor: pointer;
    border-radius: ${props =>
      props['data-rtl'] === 'rtl' ? '0 3px 3px 0' : '3px 0 0 3px'};
    border: 1px solid ${palette('grey', 3)};
    border-right-width: ${props => (props['data-rtl'] === 'rtl' ? '1px' : '0')};
    border-left-width: ${props => (props['data-rtl'] === 'rtl' ? '0' : '1px')};
    box-shadow: ${props =>
      props['data-rtl'] === 'rtl'
        ? '1px 1px 2px rgba(191,191,191,0.26)'
        : '-1px 1px 2px rgba(191,191,191,0.26)'};

    img {
      width: 23px;
    }
  }

  .purchaseBtnWrapper {
    width: 100%;
    padding: 25px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    border-top: 1px solid ${palette('grey', 2)};
  }

  @-webkit-keyframes selectedAnimation {
    0% {
      -webkit-transform: scale(0.8);
      transform: scale(0.8);
      opacity: 0.5;
    }
    100% {
      -webkit-transform: scale(2.4);
      transform: scale(2.4);
      opacity: 0;
    }
  }
  @keyframes selectedAnimation {
    0% {
      -webkit-transform: scale(0.8);
      transform: scale(0.8);
      opacity: 0.5;
    }
    100% {
      -webkit-transform: scale(2.4);
      transform: scale(2.4);
      opacity: 0;
    }
  }
`;

export { Icon };
export default WithDirection(SecondarySidebars);
