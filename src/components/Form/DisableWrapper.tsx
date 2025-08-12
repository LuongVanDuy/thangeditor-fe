import React from "react";

const DisableWrapper: React.FC<{ disabled: boolean; children: React.ReactNode }> = ({ disabled, children }) => {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      // Nếu child là text hoặc số, trả về nguyên bản
      return child;
    }

    // Kiểm tra nếu child nhận prop disabled (dựa vào loại element)
    const type = child.type;
    const isDomElement = typeof type === "string"; // vd: 'div', 'h2', 'span'

    if (isDomElement) {
      // Với element HTML, không có prop disabled
      // Nên ta có thể bọc nó trong 1 div với style pointerEvents:none khi disabled
      if (disabled) {
        return <div style={{ pointerEvents: "none", opacity: 0.6 }}>{child}</div>;
      }
      return child;
    }

    // Với component React (function/class), ta thử clone prop disabled
    // Để an toàn, chỉ clone nếu prop disabled có trong propTypes (nếu bạn dùng)
    // Hoặc bạn có thể cứ clone, component nào không dùng prop disabled thì không ảnh hưởng

    return React.cloneElement(child, {
      disabled,
      children: <DisableWrapper disabled={disabled}>{child.props.children}</DisableWrapper>,
    });
  });
};

export default DisableWrapper;
