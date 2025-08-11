"use client";
import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { message, Divider, Drawer } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

// Components
import CustomStep from "@/components/Form/CustomSteps";
import { CustomInput } from "@/components/Form/CustomInput";
import First from "@/components/Dashboard/Order/CreateOrder/First";
import DeleteModal from "@/components/Dashboard/Order/DeleteModal";

// Assets
import pen from "@/assets/pen-line.svg";
import pinkLeft from "@/assets/pink-left.svg";
import whiteRight from "@/assets/white-right.svg";
import pinkEye from "@/assets/pinkEye.svg";
import close from "@/assets/pinkClose.svg";

// API & Utils
import { createOrder, getOrderDetail } from "@/lib/api/order.api";
import { profileState } from "@/lib/store/state";
import { formatCurrency } from "@/lib/helpers";
import { jsonServiceData } from "@/lib/constants";

// Types
interface OrderData {
  id: string | null;
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
  id: null,
  projectName: "",
  service: "",
  subService: "",
  uploadImage: "",
  servicePrice: null,
  designStyle: "",
  quantity: "",
  styleDetail: "",
  photoDetail: "",
  additionalService: "",
  addOnService: "",
  additionalServicePrice: 0,
  orderTotal: 0,
  isAgreed: 0,
  status: "AWAITING",
};

const itemsPC = [
  { key: "1", title: "Upload images" },
  { key: "2", title: "Design style" },
  { key: "3", title: "Photo details" },
  { key: "4", title: "Add extras" },
];

const itemsMB = [
  { key: "1", title: "Upload images" },
  { key: "2", title: "Design style" },
  { key: "3", title: "Photo details" },
  { key: "4", title: "Add extras" },
];

const CreateOrder = () => {
  // Hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  const profile = useRecoilValue(profileState);

  // URL params
  const oid = searchParams.get("oid");
  const service = searchParams.get("service");
  const decodeService = service ? decodeURI(service) : "";

  // State
  const [current, setCurrent] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [order, setOrder] = useState<OrderData>({
    ...INITIAL_ORDER_STATE,
    id: oid,
    service: decodeService,
  });

  const [serviceData, setServiceData] = useState<any | null>(null);

  const isDiscount = useMemo(() => profile?.data?.newPerson === 1, [profile]);
  const isVideoService = useMemo(() => serviceData?.id === 10, [serviceData]);

  const { mutate: createOrderMutation, isPending: isCreating } = useMutation({
    mutationFn: (data: any) => createOrder(data),
    onSuccess: () => {
      setIsCreated(true);
      router.push(`/dashboard/order/${oid}?step=2`);
    },
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
            message.warning("Please enter a valid image link");
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
        default:
          return true;
      }
    },
    [order, serviceData],
  );

  // Handlers
  const handleCreateOrder = useCallback(() => {
    const data = {
      id: oid,
      projectName: order.projectName,
      service: order.service,
      subService: order.subService,
      uploadImage: order.uploadImage,
      quantity: order.quantity,
      servicePrice: order.servicePrice,
      designStyle: "Natural",
      additionalService: "Normal Delivery",
      orderTotal: order.orderTotal,
    };
    createOrderMutation(data);
  }, [order, oid, createOrderMutation]);

  const next = useCallback(() => {
    if (!validateStep(current)) return;

    const stepActions = {
      0: () => {
        if (!isCreated) {
          handleCreateOrder();
        }
      },
    };

    stepActions[current as keyof typeof stepActions]?.();
  }, [current, order, isCreated, handleCreateOrder, validateStep]);

  const handleCancelOrder = useCallback(() => {
    if (isCreated) {
      setOpenDeleteModal(true);
    } else {
      router.back();
    }
  }, [isCreated, router]);

  const handleInputChange = useCallback((value: any) => {
    const inputValue = typeof value === "string" ? value : value?.target?.value || "";
    setOrder((prevOrder) => ({ ...prevOrder, projectName: inputValue }));
  }, []);

  const steps = useMemo(
    () => [
      {
        title: "Upload images",
        content: <First setData={setOrder} data={order} serviceData={serviceData} setServiceData={setServiceData} />,
      },
    ],
    [order, serviceData, isVideoService, isDiscount],
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
        <h2 className="text-primary m-1">{order.orderTotal !== 0 ? formatCurrency(order.orderTotal) : "---"}</h2>
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
        <h1 className="text-[#6C757D] font-medium text-[24px] mt-1 flex gap-1 items-center">
          {order.projectName || "Project name"}
          <Image src={pen} alt="icon" />
        </h1>
      )}
      <h2 className="text-[#6C757D]">Order ID: {oid}</h2>
    </div>
  );

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
                  className="text-[#212529] font-medium text-[16px] flex gap-1 items-center"
                >
                  {order.projectName || "Project name"}
                  <Image src={pen} alt="icon" className="h-[18px] w-[18px]" />
                </h1>
              )}

              {current === 3 ? (
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

            <div className="border-l-[1px] border-[#fbfbfb] pl-4">
              <h1 className="text-primary text-[12px] uppercase">Order total</h1>
              <h2 className="text-primary">{order.orderTotal !== 0 ? formatCurrency(order.orderTotal) : "---"}</h2>
            </div>
          </div>

          <div>{steps[current].content}</div>
        </div>

        {/* Footer Navigation */}
        <div className="bg-[#fff] px-6 py-4 -mx-6 flex gap-2 md:gap-5 items-center justify-between">
          {/* Cancel button */}
          <div className="btn-five" onClick={handleCancelOrder}>
            <span className="hidden md:block">Cancel</span>
            <span className="block md:hidden">
              <Image src={pinkLeft} alt="icon" />
            </span>
          </div>

          <div className="w-full hidden md:block">
            <CustomStep current={0} items={itemsPC} />
          </div>

          <div className="w-full block md:hidden">
            <CustomStep current={0} items={itemsMB} />
          </div>

          {/* Next button */}
          <div className="btn-six flex items-center" onClick={next}>
            <span className="hidden md:block mr-2">{steps[current + 1]?.title || "Next"}</span>
            <Image src={whiteRight} alt="icon" />
          </div>
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

      <DeleteModal isOpen={openDeleteModal} onCancel={() => setOpenDeleteModal(false)} oid={oid} />
    </>
  );
};

export default CreateOrder;
