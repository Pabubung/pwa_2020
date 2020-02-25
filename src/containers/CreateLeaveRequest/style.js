import styled from 'styled-components';
import { palette } from 'styled-theme';
import Typographyes from '@material-ui/core/Typography';

const Typography = styled(Typographyes)`
  font-size: 16px;
  font-weight: 500;
  color: ${palette('grey', 8)};
  margin-bottom: 10px;
`;

const AlignLeft = styled.div`
  text-align: left;
`;

export default AlignLeft;
export { Typography };
