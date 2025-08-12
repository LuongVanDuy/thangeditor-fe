"use client";
import { Input } from "antd";
import type { InputProps, TextAreaProps } from "antd/es/input";
import cx from "classnames";
import Image from "next/image";
import { type ReactNode, useEffect, useRef, useState, forwardRef } from "react";

import { InputStyled } from "./styled";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

export const CustomInput = forwardRef<
  any,
  InputProps & {
    withStepper?: boolean;
    className?: string;
    bordered?: boolean;
    placeholder?: string;
    prefixIcon?: ReactNode;
    suffixIcon?: ReactNode;
    wrapClassName?: string;
    onChange: (value: any) => void;
    onClick?: () => void;
    type?: "text" | "password" | "number";
    blurAfterClick?: boolean;
    hideArrow?: boolean;
    value?: any;
    defaultValue?: any;
    forceValue?: any;
    allowDecimal?: boolean;
  }
>(
  (
    {
      className,
      bordered = true,
      placeholder,
      prefixIcon,
      wrapClassName,
      suffixIcon,
      type = "text",
      blurAfterClick = false,
      onChange,
      onClick,
      hideArrow = false,
      value,
      defaultValue,
      forceValue,
      withStepper = false,
      allowDecimal = false,
      ...rest
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState<number>(typeof value === "number" ? value : 0);
    const [label, setLabel] = useState<string>("");

    // Đồng bộ giá trị từ prop value vào internal state
    useEffect(() => {
      if (typeof value === "number" && value !== internalValue) {
        setInternalValue(value);
      }
    }, [value]);

    // Xử lý tăng
    const handlePlus = () => {
      const newValue = internalValue + 1;
      setInternalValue(newValue);
      onChange(newValue);
    };

    // Xử lý giảm
    const handleMinus = () => {
      const newValue = internalValue > 0 ? internalValue - 1 : 0;
      setInternalValue(newValue);
      onChange(newValue);
    };

    // Xử lý nhập liệu
    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputVal = e.target.value;

      if (withStepper) {
        // Chỉ cho phép số, nếu allowDecimal thì cho số thập phân
        let regex = /^[0-9]*$/;
        if (allowDecimal) {
          regex = /^[0-9]*\.?[0-9]*$/;
        }

        if (inputVal === "" || regex.test(inputVal)) {
          // Chuyển thành số hoặc 0 nếu rỗng
          const num = inputVal === "" ? 0 : Number(inputVal);
          setInternalValue(num);
          onChange(num);
          setLabel(inputVal);
        }
      } else {
        onChange(inputVal);
        setLabel(inputVal);
      }
    };

    // Đồng bộ label hiển thị với giá trị số
    useEffect(() => {
      if (withStepper) {
        setLabel(internalValue.toString());
      } else {
        setLabel(value ?? "");
      }
    }, [internalValue, value, withStepper]);

    const onClickInput = () => {
      if (blurAfterClick && ref && typeof ref === "object" && ref.current) {
        ref.current.blur();
      }
      if (onClick) {
        onClick();
      }
    };

    return (
      <div className={`${wrapClassName ?? ""} flex items-center gap-2`}>
        {withStepper && (
          <div
            className="flex items-center justify-center cursor-pointer select-none p-1 w-14 h-12 bg-[#fdc101] text-black rounded hover:bg-[#e6b800]"
            onClick={handleMinus}
            aria-label="Decrease value"
          >
            <MinusOutlined style={{ fontSize: 16 }} />
          </div>
        )}

        <Input
          className={cx("text-[#666666] leading-normal focus:shadow-none focus-within:shadow-none", className, {
            "border-b border-t-0 border-l-0 border-r-0 border-[#B2B2B2] rounded-none": !bordered,
            "hide-arrow": hideArrow,
          })}
          type={type === "number" || withStepper ? "text" : type}
          placeholder={placeholder}
          prefix={prefixIcon}
          suffix={suffixIcon}
          onChange={onChangeValue}
          onClick={onClickInput}
          ref={ref}
          value={forceValue ?? label}
          {...rest}
        />

        {withStepper && (
          <div
            className="flex items-center justify-center cursor-pointer select-none p-1 w-14 h-12 bg-[#fdc101] text-black rounded hover:bg-[#e6b800]"
            onClick={handlePlus}
            aria-label="Increase value"
          >
            <PlusOutlined style={{ fontSize: 16 }} />
          </div>
        )}
      </div>
    );
  },
);

CustomInput.displayName = "CustomInput";

const { TextArea } = Input;

export function CustomTextarea(props: TextAreaProps & { rows?: number }) {
  const { className, rows = 3, ...rest } = props;

  return (
    <TextArea
      className={cx("rounded-lg px-4 py-2 border-[#DEE2E6] placeholder-[#ADB5BD]", className)}
      rows={rows}
      {...rest}
    />
  );
}
