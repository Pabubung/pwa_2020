import styled from "styled-components";
import { palette } from "styled-theme";
import Papersheet from "../../components/utility/papersheet";
import InputSearches from "../../components/uielements/inputSearch";
import { FormControl as FormControls } from "../../components/uielements/form";
import { InputLabel as InputLabels } from "../../components/uielements/input";
import Buttons from "../../components/uielements/button";
import Icons from "../../components/uielements/icon/index.js";

const InputLabel = styled(InputLabels)``;
const Icon = styled(Icons)``;

const FormControl = styled(FormControls)`
  width: 100%;
`;

const Contactbox = styled(Papersheet)``;

const InputSearch = styled(InputSearches)`
  width: 100%;
  margin-bottom: 40px;
`;

const Button = styled(Buttons)`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 100;
`;

const Content = styled.div`
  flex-direction: column;
  position: relative;

  .widgetTitle {
    font-size: 18px;
    font-weight: 400;
    color: ${palette("grey", 9)};
    margin: 0 0 15px;
  }
`;

export {
  Contactbox,
  Content,
  InputSearch,
  InputLabel,
  Button,
  FormControl,
  Icon
};