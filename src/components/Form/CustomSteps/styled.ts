import styled from "styled-components";

// interface StyledStepProps {
//   isActive: boolean;
// }

// export const StyleWrapper = styled.div<StyledStepProps>`
//     display: flex;
//     flex-direction: column;
//     align-items: center;

//     .step-number {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       width: 32px;
//       height: 32px;
//       border-radius: 50%;
//       font-size: 16px;
//       background-color: ${({ isActive }) => (isActive ? "#FDC101" : "#f4f4f4")};
//       color: ${({ isActive }) => (isActive ? "#fff" : "#495057")};
//       font-weight: 400;
//     }

//     .step-title {
//       font-size: 14px;
//       color: ${({ isActive }) => (isActive ? "#FDC101" : "#6C757D")};
//       text-align: center;
//     }
// `;

export const StyleWrapper = styled.div<any>`
  .ant-steps-item-active .ant-steps-item-icon {
    background-color: #fdc101;
    border-color: #fdc101;
  }

  .ant-steps-item-active .ant-steps-item-content .ant-steps-item-title {
    color: #fdc101 !important;
  }

  .ant-steps-item-finish .ant-steps-item-icon {
    background-color: #fffeea;
    border-color: #fff046;
  }

  .ant-steps-item-finish .ant-steps-item-content .ant-steps-item-title {
    color: #495057 !important;
  }

  .ant-steps .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-tail::after {
    background-color: #fff046 !important;
  }

  .ant-steps .ant-steps-item-tail::after {
    height: 2px;
  }

  .ant-steps-item-finish .ant-steps-item-icon .ant-steps-icon {
    color: #fdc101;
  }

  .ant-steps-item-content .ant-steps-item-title {
    color: #6c757d !important;
  }

  .ant-steps .ant-steps-item-wait .ant-steps-item-icon {
    background-color: #f4f4f4;
  }

  .ant-steps.ant-steps-label-vertical .ant-steps-item-content {
    margin-top: 0 !important;
  }
`;
