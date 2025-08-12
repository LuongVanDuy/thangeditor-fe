import React, { useState, useEffect } from "react";
import { CustomInput } from "@/components/Form/CustomInput";
import { LinkOutlined } from "@ant-design/icons";
import { Radio } from "antd";
import { jsonServiceData } from "@/lib/constants"; // import dữ liệu thật

interface FirstProps {
  setData: React.Dispatch<React.SetStateAction<any>>;
  data: any;
  setServiceData: React.Dispatch<React.SetStateAction<any>>;
  serviceData: any;
}

const First: React.FC<FirstProps> = ({ setData, data, setServiceData, serviceData }) => {
  const quantity = data.quantity;
  const url = data.uploadImage;

  // Dùng jsonServiceData trực tiếp cho danh sách dịch vụ
  const services = jsonServiceData.map((service) => ({
    value: service.title,
    label: service.title,
  }));

  const [service, setService] = useState<string | null>(null);

  const subService = serviceData?.subServices ?? [];

  useEffect(() => {
    if (data && data.service) {
      setService(data.service);
    }
  }, [data]);

  useEffect(() => {
    if (!serviceData?.subServices?.length) {
      setData((prev: any) => ({
        ...prev,
        subService: "",
      }));
    }
  }, [serviceData, setData]);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setService(value);

    const matchedService = jsonServiceData.find((s) => s.title === value);

    setServiceData(matchedService);

    setData((prev: any) => ({
      ...prev,
      service: value || null,
      subService: matchedService?.subServices?.length ? "" : "", // reset subService khi chuyển service mới
      addOnService: "",
      servicePrice: matchedService?.subServices?.length ? null : matchedService?.price || null,
      additionalServicePrice: 0,
    }));
  };

  const handleSubServiceChange = (e: any) => {
    if (!subService.length) return;
    const value = e.target.value;
    const matchedSubService = serviceData?.subServices?.find((sub: any) => sub.title === value);

    setData((prev: any) => ({
      ...prev,
      subService: value || null,
      servicePrice: matchedSubService?.price,
    }));
  };

  const handleInputChange = (value: string) => {
    setData((prevData: any) => ({
      ...prevData,
      uploadImage: value,
      status: "AWAITING",
    }));
  };

  const handleQuantityChange = (value: string) => {
    setData((prevData: any) => ({
      ...prevData,
      quantity: value,
      status: "AWAITING",
    }));
  };

  return (
    <>
      <div className="order-card">
        <h1 className="text-[#212529] text-[16px] font-bold mb-4">Choose your service*</h1>
        <Radio.Group onChange={handleChange} value={service} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {services.map((serviceOption, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  service === serviceOption.value ? "border-primary border-[2px] bg-[#FFFEEA]" : "bg-[#fbfbfb]"
                }`}
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <Radio value={serviceOption.value} />
                  <span className="font-medium text-[16px] ml-2">{serviceOption.label}</span>
                </label>
              </div>
            ))}
          </div>
        </Radio.Group>
      </div>

      {subService.length > 0 && (
        <div className="order-card">
          <h1 className="text-[#212529] text-[16px] font-bold mb-4">Choose your sub service*</h1>
          <Radio.Group onChange={handleSubServiceChange} value={data.subService} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {subService.map((serviceOption: any, index: number) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    data.subService === serviceOption.title
                      ? "border-primary border-[2px] bg-[#FFFEEA]"
                      : "bg-[#fbfbfb]"
                  }`}
                >
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Radio value={serviceOption.title} />
                    <span className="font-medium text-[16px]">{serviceOption.title}</span>
                  </label>
                </div>
              ))}
            </div>
          </Radio.Group>
        </div>
      )}

      <div className="order-card mb-4">
        <h1 className="text-[#212529] text-[16px] font-bold  mb-4">Upload some photos of your property*</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomInput
            onChange={(value: any) => {
              handleInputChange(value);
            }}
            placeholder="Paste your link here"
            className="h-12 "
            suffix={<LinkOutlined />}
            value={url ?? ""}
          />

          <CustomInput
            onChange={(value: any) => {
              handleQuantityChange(value);
            }}
            placeholder="Enter your images quantity"
            className="h-12 "
            type="number"
            value={quantity ?? ""}
          />
        </div>
      </div>
    </>
  );
};

export default First;
