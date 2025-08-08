import React from "react";
import { CustomTagWrapper } from "./styled";

type CustomTagProps = {
  color: string;
  title: string;
};

const CustomTag: React.FC<CustomTagProps> = ({ color, title }) => {
  return (
    <CustomTagWrapper color={color} bordered={false}>
      {title}
    </CustomTagWrapper>
  );
};

export default CustomTag;
