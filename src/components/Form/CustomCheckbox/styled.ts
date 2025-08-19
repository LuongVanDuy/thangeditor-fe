import { Checkbox } from "antd";
import styled from "styled-components";

export const CheckboxStyled = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #00bc7d !important;
    border-color: #00bc7d !important;
  }

  .ant-checkbox-wrapper {
    margin-top: 5px !important;
  }
`;
