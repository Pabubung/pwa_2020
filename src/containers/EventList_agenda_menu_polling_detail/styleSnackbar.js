import styled from "styled-components";
import Snackbar from "../../../src/components/uielements/snackbar";
import Icons from "../../../src/components/uielements/icon/index.js";

const Icon = styled(Icons)`
  font-size: 18px;
`;

const Snackbars = styled(Snackbar)`
  > div {
    @media only screen and (max-width: 959.95px) {
      flex-grow: 0;
      min-width: 288px;
      max-width: 568px;
      border-radius: 2px;
    }
  }
`;

export { Icon };
export default Snackbars;
