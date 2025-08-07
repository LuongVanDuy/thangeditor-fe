import React, { useState, useEffect } from "react";
import { CustomInput } from "@/components/Form/CustomInput";
import { LinkOutlined } from "@ant-design/icons";
import { Radio } from "antd";

const services = [
  { value: "Image Enhancement", label: "Image Enhancement" },
  { value: "Virtual Staging", label: "Virtual Staging" },
  { value: "Day to Dusk", label: "Day to Dusk" },
  { value: "Day to Twilight", label: "Day to Twilight" },
  { value: "Object Removal", label: "Object Removal" },
  { value: "Changing Seasons", label: "Changing Seasons" },
  { value: "Water in Pool", label: "Water in Pool" },
  { value: "Lawn Replacement", label: "Lawn Replacement" },
  { value: "Rain to Shine", label: "Rain to Shine" },
  { value: "Property Videos", label: "Property Videos" },
];

interface FirstProps {
  setData: React.Dispatch<React.SetStateAction<any>>;
  data: any;
  serviceList: any[];
  setServiceData: React.Dispatch<React.SetStateAction<any>>;
  serviceData: any;
}

const First: React.FC<FirstProps> = ({ setData, data, serviceList, setServiceData, serviceData }) => {
  const quantity = data.quantity;
  const url = data.uploadImage;

  const [service, setService] = useState(null);
  const [subServiceData, setSubServiceData] = useState(null);

  const subService = serviceData?.subServices ?? [];

  useEffect(() => {
    if (data && data.service) {
      setService(data.service);
    }

    if (data && data.subService) {
      setSubServiceData(data.subService);
    }
  }, [data]);

  console.log("serviceList", serviceList);
  const handleChange = (e: any) => {
    const value = e.target.value;
    const matchedService = serviceList.find((service: any) => service.serviceName === value);
    setService(value);
    setData((prev: any) => ({
      ...prev,
      service: value || null,
      subService: "",
      addOnService: "",
      servicePrice: matchedService?.subServices?.length ? null : matchedService?.price || null,
      additionalServicePrice: 0,
    }));

    if (matchedService) {
      setServiceData(matchedService);
    }
  };

  const handleSubServiceChange = (e: any) => {
    if (!subService.length) return;
    const value = e.target.value;
    const matchedSubService = serviceData?.subServices?.find((sub: any) => sub.serviceName === value);

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
        <h1 className="text-[#212529] text-[18px] font-medium mb-4">Choose your service*</h1>
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
                  <span className="font-medium text-[18px] ml-2">{serviceOption.label}</span>
                </label>
              </div>
            ))}
          </div>
        </Radio.Group>
      </div>

      {subService.length > 0 && (
        <div className="order-card">
          <h1 className="text-[#212529] text-[18px] font-medium mb-4">Choose your sub service*</h1>
          <Radio.Group onChange={handleSubServiceChange} value={data.subService} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {subService.map((serviceOption: any, index: number) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    subServiceData === serviceOption.serviceName
                      ? "border-primary border-[2px] bg-[#FFFEEA]"
                      : "bg-[#fbfbfb]"
                  }`}
                >
                  <div className="flex justify-between mb-4">
                    <Radio value={serviceOption.serviceName} />
                  </div>
                  <h1 className="font-medium text-[18px]">{serviceOption.serviceName}</h1>
                </div>
              ))}
            </div>
          </Radio.Group>
        </div>
      )}

      <div className="order-card mb-4">
        <h1 className="text-[#212529] text-[18px] font-medium mb-4">Upload some photos of your property*</h1>
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
