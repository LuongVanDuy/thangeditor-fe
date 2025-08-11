"use client";
import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { message, Divider, Drawer } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

// Components
import CustomStep from "@/components/Form/CustomSteps";
import { CustomInput } from "@/components/Form/CustomInput";
import First from "@/components/Dashboard/Order/DetailOrder/First";
import Second from "@/components/Dashboard/Order/DetailOrder/Second";
import Third from "@/components/Dashboard/Order/DetailOrder/Third";
import Four from "@/components/Dashboard/Order/DetailOrder/Four";
import DeleteModal from "@/components/Dashboard/Order/DeleteModal";

// Assets
import pen from "@/assets/pen-line.svg";
import pinkLeft from "@/assets/pink-left.svg";
import whiteRight from "@/assets/white-right.svg";
import pinkEye from "@/assets/pinkEye.svg";
import close from "@/assets/pinkClose.svg";

// API & Utils
import { updateOrder, getOrderDetail } from "@/lib/api/order.api";
import { formatCurrency } from "@/lib/helpers";
import { profileState } from "@/lib/store/state";
import { jsonServiceData } from "@/lib/constants";
import DisableWrapper from "@/components/Form/DisableWrapper";
import { sendOrderMail } from "@/lib/api/auth.api";

// Types
interface OrderData {
  id: string;
  projectName: string;
  service: string;
  subService: string;
  uploadImage: string;
  servicePrice: number | null;
  designStyle: string;
  quantity: string;
  styleDetail: string;
  photoDetail: string;
  additionalService: string;
  addOnService: string;
  additionalServicePrice: number;
  orderTotal: number;
  isAgreed: number;
  status: string;
}

// Styled Components
const StyledDrawer = styled(Drawer)`
  .ant-drawer .ant-drawer-content-wrapper {
    z-index: 7 !important;
  }

  .ant-drawer-top > .ant-drawer-content-wrapper {
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05) !important;
    top: 128px !important;
  }
`;

// Constants
const INITIAL_ORDER_STATE: OrderData = {
  id: "",
  projectName: "",
  service: "",
  subService: "",
  uploadImage: "",
  servicePrice: null,
  designStyle: "",
  quantity: "",
  styleDetail: "",
  photoDetail: "",
  additionalService: "Normal Delivery",
  addOnService: "",
  additionalServicePrice: 0,
  orderTotal: 0,
  isAgreed: 0,
  status: "AWAITING",
};

const DetailOrder = () => {
  // Hooks
  const router = useRouter();
  const { oid } = useParams();
  const profile = useRecoilValue(profileState);

  // State
  const [current, setCurrent] = useState(0);
  const searchParams = useSearchParams();

  const [isDisabled, setIsDisabled] = React.useState(false);

  useEffect(() => {
    const step = searchParams.get("step");
    if (step === "2") {
      setCurrent(1);
      const params = new URLSearchParams(searchParams.toString());
      params.delete("step");

      const basePath = window.location.pathname;
      const newUrl = params.toString() ? `${basePath}?${params.toString()}` : basePath;

      router.replace(newUrl, { scroll: false });
    }
  }, [searchParams]);

  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [order, setOrder] = useState<OrderData>({
    ...INITIAL_ORDER_STATE,
    id: oid as string,
  });

  const prevOrderRef = useRef(order);
  const [serviceData, setServiceData] = useState<any | null>(null);

  // Computed values
  const isDiscount = useMemo(() => profile?.data?.newPerson === 1, [profile]);
  const isVideoService = useMemo(() => serviceData?.id === 10, [serviceData]);

  // API queries
  const { data, refetch } = useQuery({
    queryKey: ["ORDER", oid],
    queryFn: () => getOrderDetail(oid),
  });

  const { mutate: updateMutation, isPending: isUpdating } = useMutation({
    mutationFn: (data: any) => updateOrder(data, oid),
    onSuccess: () => refetch(),
    onError: (err: any) => {
      message.error(err.response?.data?.message);
      console.error(err.response?.data?.message);
    },
  });

  // Calculate order total
  const calculateOrderTotal = useCallback(() => {
    const { quantity, servicePrice, additionalServicePrice } = order;

    const parsedQuantity = Number(quantity) || 0;
    const parsedServicePrice = servicePrice || 0;
    const parsedAdditionalServicePrice = additionalServicePrice || 0;

    const deliveryPrice = parsedAdditionalServicePrice * parsedQuantity;
    const servicePriceTotal = parsedServicePrice * parsedQuantity;
    const subTotal = deliveryPrice + servicePriceTotal;

    const discount = isDiscount ? 10 : 0;
    let finalPrice = Math.max(subTotal - discount, 0);
    finalPrice = Math.max(finalPrice, 1);

    return finalPrice;
  }, [order.quantity, order.servicePrice, order.additionalServicePrice, isDiscount]);

  // Change detection utility
  const hasChanged = useCallback((prev: any, current: any): boolean => {
    const changes: any = {};
    for (let key in current) {
      if (current[key] !== prev[key]) {
        changes[key] = {
          previous: prev[key],
          current: current[key],
        };
      }
    }
    return Object.keys(changes).length > 0;
  }, []);

  // Effects
  useEffect(() => {
    if (data?.data) {
      const orderData = data.data;
      setOrder({
        id: oid as string,
        projectName: orderData.projectName,
        service: orderData.service,
        subService: orderData.subService,
        uploadImage: orderData.uploadImage,
        servicePrice: orderData.servicePrice,
        designStyle: orderData.designStyle,
        quantity: orderData.quantity,
        styleDetail: orderData.styleDetail,
        photoDetail: orderData.photoDetail,
        additionalService: orderData.additionalService,
        addOnService: orderData.addOnService,
        additionalServicePrice: orderData.additionalServicePrice,
        orderTotal: orderData.orderTotal,
        isAgreed: orderData.isAgreed,
        status: orderData.status,
      });

      setIsDisabled(orderData.status === "DONE");
    }
  }, [data, oid]);

  useEffect(() => {
    const orderTotal = calculateOrderTotal();
    setOrder((prevOrder) => ({ ...prevOrder, orderTotal }));
  }, [calculateOrderTotal]);

  useEffect(() => {
    if (order?.service) {
      const foundService = jsonServiceData.find((service: any) => service.title === order.service);
      setServiceData(foundService || null);
    }
  }, [order.service]);

  // Validation functions
  const validateStep = useCallback(
    (step: number): boolean => {
      switch (step) {
        case 0:
          if (!order.projectName) {
            message.warning("Please enter a project name.");
            return false;
          }
          if (!order.uploadImage) {
            message.warning("Please enter an image link.");
            return false;
          }
          if (!order.uploadImage.includes("http")) {
            message.warning("Please enter a valid image link.");
            return false;
          }
          if (!order.service) {
            message.warning("Please select a service.");
            return false;
          }
          if (serviceData?.subServices?.length > 0 && !order.subService) {
            message.warning("Please select a sub-service.");
            return false;
          }
          if (!order.quantity) {
            message.warning("Please enter images quantity.");
            return false;
          }
          return true;

        case 3:
          if (!order.isAgreed) {
            message.warning("Please agree to the terms and conditions before proceeding.");
            return false;
          }
          return true;

        default:
          return true;
      }
    },
    [order, serviceData],
  );

  // Handlers
  const handleUpdate = useCallback(
    (extraData = {}, options = {}) => {
      const data = {
        projectName: order.projectName,
        service: order.service,
        quantity: order.quantity,
        servicePrice: order.servicePrice,
        uploadImage: order.uploadImage,
        photoDetail: order.photoDetail,
        designStyle: order.designStyle,
        additionalService: order.additionalService,
        additionalServicePrice: order.additionalServicePrice,
        orderTotal: order.orderTotal,
        isAgreed: order.isAgreed,
        subService: order.subService,
        styleDetail: order.styleDetail,
        addOnService: order.addOnService,
        ...extraData,
      };

      const isChanged = hasChanged(prevOrderRef.current, order);
      if (isChanged) {
        updateMutation(data, options);
        prevOrderRef.current = order;
      }
    },
    [order, hasChanged, updateMutation],
  );

  const next = useCallback(() => {
    if (!validateStep(current)) return;

    if (isDisabled) {
      setCurrent((prev) => prev + 1);
      return;
    }

    // Còn lại, làm như bình thường
    const stepActions = {
      0: () => handleUpdate({ status: "AWAITING" }),
      1: () => {
        if (!order.designStyle) {
          const newData = { ...order, designStyle: "Natural" };
          setOrder(newData);
          updateMutation(newData);
        } else {
          handleUpdate({ status: "AWAITING" });
        }
      },
      2: () => handleUpdate({ status: "AWAITING" }),
      3: () => {
        if (!order.additionalService) {
          const newData = {
            ...order,
            additionalService: "Normal Delivery",
            additionalServicePrice: 0,
          };
          setOrder(newData);
          updateMutation(newData);
        } else {
          handleUpdate({ status: "AWAITING" });
        }
      },
    };

    stepActions[current as keyof typeof stepActions]?.();
    setCurrent((prev) => prev + 1);
  }, [current, order, handleUpdate, validateStep, updateMutation, isDisabled]);

  const prev = useCallback(() => {
    setCurrent((prev) => prev - 1);
  }, []);

  const handleInputChange = useCallback((value: any) => {
    const inputValue = typeof value === "string" ? value : value?.target?.value || "";
    setOrder((prevOrder) => ({ ...prevOrder, projectName: inputValue }));
  }, []);

  const handlePayment = useCallback(async () => {
    if (!order.isAgreed) {
      message.warning("Please agree to the terms and conditions.");
      return;
    }

    await updateMutation(
      {
        ...order,
        status: "PENDING_PAYMENT",
      },
      {
        onSuccess: async () => {
          message.success("Your order has been submitted.");

          await sendOrderMail({
            orderId: order.id,
            service: order.service,
            designStyle: order.designStyle,
            additionalService: order.additionalService,
            orderTotal: order.orderTotal,
            createdTime: new Date().toISOString(),
            email: profile?.data?.email ?? "",
          });

          router.push("/dashboard/order");
        },
      },
    );
  }, [order, updateMutation, router, profile]);

  // Step configuration
  const steps = useMemo(
    () => [
      {
        title: "Upload images",
        content: (
          <First
            setData={setOrder}
            data={order}
            serviceList={jsonServiceData}
            serviceData={serviceData}
            setServiceData={setServiceData}
          />
        ),
      },
      {
        title: "Design style",
        content: <Second setData={setOrder} data={order} />,
      },
      {
        title: "Photo details",
        content: (
          <Third
            setData={setOrder}
            photoDetail={order.photoDetail}
            serviceData={serviceData}
            checkedValue={order.addOnService}
          />
        ),
      },
      {
        title: "Add extras",
        content: (
          <Four
            setData={setOrder}
            data={order}
            serviceData={serviceData}
            isVideoService={isVideoService}
            isDiscount={isDiscount}
            onPay={handlePayment}
          />
        ),
      },
    ],
    [order, serviceData, isVideoService, isDiscount],
  );

  const items = useMemo(
    () =>
      steps.map((item) => ({
        key: item.title,
        title: item.title,
      })),
    [steps],
  );

  const items2 = useMemo(
    () =>
      steps.map((item) => ({
        key: item.title,
        title: "",
      })),
    [steps],
  );

  // Responsive handler
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && open) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  // Render helpers
  const renderOrderSummary = () => (
    <div className="flex gap-12">
      {[
        { label: "Service", value: order.service },
        { label: "Total images", value: order.quantity },
        { label: "Design style", value: order.designStyle },
      ].map(({ label, value }) => (
        <div key={label}>
          <h1 className="text-[#6C757D] text-[12px] uppercase">{label}</h1>
          <h2 className="text-[#343A40] mt-1">{value || "---"}</h2>
        </div>
      ))}
      <div>
        <h1 className="text-primary text-[12px] uppercase">Order total</h1>
        <h2 className="text-primary mt-1">{order.orderTotal !== 0 ? formatCurrency(order.orderTotal) : "---"}</h2>
      </div>
    </div>
  );

  const renderProjectHeader = () => (
    <div onClick={() => setIsEditing(true)} className="cursor-pointer">
      {isEditing ? (
        <CustomInput
          value={order.projectName ?? ""}
          onChange={handleInputChange}
          onBlur={() => setIsEditing(false)}
          className="h-9"
          autoFocus
        />
      ) : (
        <h1 className="text-[#6C757D] font-medium text-[24px] flex gap-1 items-center">
          {order.projectName || "Project name"}
          <Image src={pen} alt="icon" />
        </h1>
      )}
      <h2 className="text-[#6C757D]">Order ID: {oid}</h2>
    </div>
  );

  const renderMobileProjectHeader = () => (
    <div className="cursor-pointer">
      {isEditing ? (
        <CustomInput
          value={order.projectName ?? ""}
          onChange={handleInputChange}
          onBlur={() => setIsEditing(false)}
          className="h-7"
          autoFocus
        />
      ) : (
        <h1
          onClick={() => setIsEditing(true)}
          className="text-[#212529] font-medium text-[18px] flex gap-1 items-center"
        >
          {order.projectName || "Project name"}
          <Image src={pen} alt="icon" className="h-[18px] w-[18px]" />
        </h1>
      )}

      {current === 4 ? (
        <div className="flex gap-1 items-center">
          <h1 className="text-primary text-[16px] font-medium">View order summary</h1>
          <div onClick={() => setOpen(!open)}>
            <Image src={open ? close : pinkEye} alt="icon" />
          </div>
        </div>
      ) : (
        <div className="flex gap-1 items-end">
          <h1 className="text-[#6C757D] text-[12px] uppercase">Service</h1>
          <h2 className="text-[#343A40] text-[14px]">{order.service}</h2>
        </div>
      )}
    </div>
  );

  const handlePlaceOrderClick = () => {
    if (isDisabled) {
      router.push("/dashboard/order");
    } else {
      handlePayment();
    }
  };

  return (
    <>
      <div className="create-order w-full px-4 md:px-6 relative flex flex-col flex-grow">
        <div className="flex-grow">
          {/* Desktop Header */}
          <div className="px-6 py-4 hidden md:flex gap-12 items-center bg-[#fff] -mt-3 -mx-6">
            {renderProjectHeader()}
            <Divider type="vertical" style={{ backgroundColor: "#000", height: "100%" }} />
            {renderOrderSummary()}
          </div>

          {/* Mobile Header */}
          <div className="px-4 pb-3 pt-6 flex md:hidden items-center bg-[#fff] -mt-3 -mx-6 justify-between relative z-10">
            {renderMobileProjectHeader()}

            <div className="border-l-[1px] border-[#fbfbfb] pl-4">
              <h1 className="text-primary text-[12px] uppercase">Order total</h1>
              <h2 className="text-primary">{order.orderTotal !== 0 ? formatCurrency(order.orderTotal) : "---"}</h2>
            </div>
          </div>

          <DisableWrapper disabled={isDisabled}>
            <div>{steps[current].content}</div>
          </DisableWrapper>
        </div>

        {/* Footer Navigation */}
        <div className="bg-[#fff] px-6 py-4 -mx-6 flex gap-2 md:gap-5 items-center justify-between">
          {current === 0 ? (
            <div
              className="btn-five"
              onClick={() => {
                if (!isDisabled) {
                  setOpenDeleteModal(true);
                }
              }}
              style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
            >
              <span className="hidden md:block">{isDisabled ? "Can't Cancel" : "Cancel"}</span>
              <span className="block md:hidden">
                <Image src={pinkLeft} alt="icon" />
              </span>
            </div>
          ) : (
            <div className="btn-five flex items-center" onClick={prev}>
              <Image src={pinkLeft} alt="icon" />
              <span className="ml-2 hidden lg:block">{steps[current - 1].title}</span>
            </div>
          )}

          <div className="w-full hidden md:block">
            <CustomStep current={current} items={items} />
          </div>

          <div className="w-full block md:hidden">
            <CustomStep current={current} items={items2} />
          </div>

          {current < steps.length - 1 ? (
            <div className="btn-six flex items-center" onClick={next}>
              <span className="hidden md:block mr-2">{steps[current + 1].title}</span>
              <Image src={whiteRight} alt="icon" />
            </div>
          ) : (
            <div className="btn-six" onClick={handlePlaceOrderClick}>
              {isDisabled ? "Back to List" : "Place Order"}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      <StyledDrawer
        placement="top"
        closable={false}
        onClose={() => setOpen(false)}
        open={open}
        mask={false}
        style={{ padding: "16px" }}
      >
        <div className="flex gap-4 flex-col">
          <h1 className="text-[#212529] text-[18px] text-medium">Order Summary</h1>

          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Order Id", value: order.id },
              { label: "Service", value: order.service },
              { label: "Design style", value: order.designStyle },
              { label: "Additional Service", value: order.additionalService },
            ].map(({ label, value }) => (
              <div key={label}>
                <h1 className="uppercase text-[#6C757D] text-[12px]">{label}</h1>
                <h2 className="text-[#343A40] text-[16px]">{value}</h2>
              </div>
            ))}
          </div>

          <h1 className="text-primary font-medium text-[20px]">{formatCurrency(order.orderTotal)}</h1>
        </div>
      </StyledDrawer>

      <DeleteModal isOpen={openDeleteModal} onCancel={() => setOpenDeleteModal(false)} oid={oid as string} />
    </>
  );
};

export default DetailOrder;
