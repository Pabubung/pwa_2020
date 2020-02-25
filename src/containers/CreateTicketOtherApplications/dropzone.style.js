import styled from 'styled-components';
import { palette } from 'styled-theme';
import {
  borderRadius,
  boxShadow,
  transition,
} from '../../../src/settings/style-util';
import WithDirection from '../../../src/settings/withDirection';

const DropzoneWrapperContent = styled.div`
  .filepicker {
    width: 100%;
    min-height: 320px;
    padding: 35px 0px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    border: 1px dashed ${palette('border', 0)};
    position: relative;
    overflow: hidden;
    cursor: pointer;
    text-align: center;
    ${borderRadius('0')};

    .closeBtn {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      padding: 0;
      margin-right: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'auto')};
      margin-left: ${props => (props['data-rtl'] === 'rtl' ? 'auto' : '0')};
      background-color: transparent;
      outline: 0;
      border: 0;
      position: absolute;
      top: 0;
      right: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'auto')};
      left: ${props => (props['data-rtl'] === 'rtl' ? 'auto' : '0')};
      ${borderRadius('50%')};
      ${boxShadow('none')};
      ${transition()};

      &:hover {
        &:before {
          color: ${palette('text', 0)};
        }
      }
    }

    .dz-message {
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      margin: 0;

      span {
        font-size: 14px;
        color: ${palette('grey', 5)};
        font-weight: 700;
        margin-top: 6px;
      }
    }

    .dz-progress {
      width: 100%;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      position: absolute;
      top: 0;
      left: ${props => (props['data-rtl'] === 'rtl' ? 'auto' : '0')};
      right: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'auto')};
      background: none;
      background-color: rgba(255, 255, 255, 0.8);
      ${borderRadius('0')};
    }

    .dz-preview {
      width: 100px;
      height: 127px;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      overflow: hidden;
      float: ${props => (props['data-rtl'] === 'rtl' ? 'right' : 'left')};
      position: relative;
      margin: 0;
      margin-left: ${props => (props['data-rtl'] === 'rtl' ? 'auto' : '2px')};
      margin-right: ${props => (props['data-rtl'] === 'rtl' ? '2px' : 'auto')};
      margin-bottom: 2px;

      .dz-progress {
        display: none;
      }

      .dz-image {
        width: 100%;
        height: 100px;
        margin-bottom: 2px;
        display: block;
        flex-shrink: 0;
        overflow-y: hidden;
        position: relative;
        background: none;
        background-color: ${palette('secondary', 6)};
        ${borderRadius('0')};

        img {
          max-width: 100%;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
        }
      }

      .dz-details {
        width: 100%;
        height: 25px;
        padding: 0 8px;
        flex-shrink: 0;
        opacity: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        cursor: default;
        background-color: ${palette('indigo', 5)};

        .dz-size {
          display: none;
        }
        .dz-filename {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;

          span {
            font-size: 14px;
            color: #ffffff;
            white-space: nowrap;
            background-color: transparent;
          }

          &:not(:hover) {
            span {
              border: 0;
            }
          }

          &:hover {
            span {
              border: 0;
              background-color: transparent;
            }
          }
        }
      }

      .dz-success-mark {
        display: none;
      }

      .dz-remove {
        font-size: 14px;
        font-weight: 400;
        background-color: ${palette('error', 0)};
        width: 100%;
        height: 25px;
        color: #fff;
        line-height: 25px;
        display: inline-block;
        text-align: center;
        position: absolute;
        bottom: -25px;
        left: ${props => (props['data-rtl'] === 'rtl' ? 'auto' : '0px')};
        right: ${props => (props['data-rtl'] === 'rtl' ? '0px' : 'auto')};
        cursor: pointer;
        border: 0;
        outline: 0;
        padding: 0;
        ${transition()};
      }

      &:hover {
        .dz-remove {
          bottom: 0;
        }
      }
    }

    &.dz-started {
      .dz-message {
        display: none;
      }
    }
  }
`;

const DropzoneWrapper = WithDirection(DropzoneWrapperContent);

export default DropzoneWrapper;
