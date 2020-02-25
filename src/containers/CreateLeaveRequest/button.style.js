import styled from 'styled-components';
import Buttons from '../../../src/components/uielements/button';
import WithDirection from '../../../src/settings/withDirection';

const ButtonStyle = styled(Buttons)`
  margin: 8px;

  .leftIcon {
    margin-right: ${props => (props['data-rtl'] === 'rtl' ? 'auto' : '8px')};
    margin-left: ${props => (props['data-rtl'] === 'rtl' ? '8px' : 'auto')};
  }

  .rightIcon {
    margin-left: ${props => (props['data-rtl'] === 'rtl' ? 'auto' : '8px')};
    margin-right: ${props => (props['data-rtl'] === 'rtl' ? '8px' : 'auto')};
  }
`;

const Input = styled.input`display: none;`;

const Button = WithDirection(ButtonStyle);


export { Button, Input };
