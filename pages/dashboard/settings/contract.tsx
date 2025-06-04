"use client";
/*flag:
  date format is yyyy-mm-dd. if you change it please change how it was implemented on doc template in server packgage
 */
import React, { useEffect, useState } from "react";
import { HeroUIProvider } from "@heroui/react";
import App from "../../../components/Sidebar/App";
import { Button, Input } from "@heroui/react";
import { Form } from "rsuite";
import SettingNav from "components/settingnav";
import { Textarea } from "@heroui/input";
import { Plus } from "lucide-react";

const BASE_URL = 'http://localhost:3001/api/pdf/';

export default function rentalContract() {
  const [isLoading, setIsLoading] = useState(false);
  const [contranctPdfUrl, setContractPdfUrl] = useState(null);
  const [disabledForm, setDisabledForm] = useState(false);
  const [mockData, setMockData] = useState({
    contractCreationPlace: "",
    contractCreationDate: "",
    dormName: "",
    dormAddress: {
      houseNumber: "",
      alley: "",
      road: "",
      subDistrict: "",
      district: "",
      province: "",
    },
    tenantName: "",
    tenantAddress: {
      houseNumber: "",
      alley: "",
      road: "",
      subDistrict: "",
      district: "",
      province: "",
    },
    tenantNationalId: "",
    tenantPhoneNumber: "",

    roomNumber: "",
    floorNumber: "",
    contractDuration: "",

    monthlyRent: "",
    monthlyRentTextThai: "",
    contractStartDate: "",
    paymentDueDate: "",
    roomDeposit: "",
    roomDepositTextThai: "",
    latePaymentFee: "",
    returnRoomPeriod: "",
    additionalCondition: [""],
  });

  const form = [
    {
      name: "สถานที่ทำสัญญา",
      field: "contractCreationPlace",
      type: "text",
      options: {
        maxLength: 256,
      },
    },
    {
      name: "วันที่ทำสัญญา",
      field: "contractCreationDate",
      type: "date",
    },
    {
      name: "ชื่อหอพัก",
      field: "dormName",
      type: "text",
      options: {
        maxLength: 256,
      },
    },
    {
      name: "ที่อยู่หอพัก",
      field: "dormAddress",
      type: "object",
      subFields: [
        { name: "บ้านเลขที่", field: "houseNumber", type: "text" },
        { name: "ซอย", field: "alley", type: "text" },
        { name: "ถนน", field: "road", type: "text" },
        { name: "ตำบล/แขวง", field: "subDistrict", type: "text" },
        { name: "อำเภอ/เขต", field: "district", type: "text" },
        { name: "จังหวัด", field: "province", type: "text" },
      ],
    },
    {
      name: "ชื่อผู้เช่า",
      field: "tenantName",
      type: "text",
      options: {
        maxLength: 256,
      },
    },
    {
      name: "ที่อยู่ผู้เช่า",
      field: "tenantAddress",
      type: "object",
      subFields: [
        { name: "บ้านเลขที่", field: "houseNumber", type: "text" },
        { name: "ซอย", field: "alley", type: "text" },
        { name: "ถนน", field: "road", type: "text" },
        { name: "ตำบล/แขวง", field: "subDistrict", type: "text" },
        { name: "อำเภอ/เขต", field: "district", type: "text" },
        { name: "จังหวัด", field: "province", type: "text" },
      ],
    },
    {
      name: "เลขบัตรประชาชนผู้เช่า",
      field: "tenantNationalId",
      type: "text",
      options: {
        maxLength: 13,
        minLength: 13,
      },
    },
    {
      name: "เบอร์โทรศัพท์ผู้เช่า",
      field: "tenantPhoneNumber",
      type: "text",
      options: {
        maxLength: 9999999999,
      },
    },
    {
      name: "หมายเลขห้อง",
      field: "roomNumber",
      type: "text",
      options: {
        maxLength: 256,
      },
    },
    {
      name: "ชั้น",
      field: "floorNumber",
      type: "number",
      options: {
        max: 999,
      },
    },
    {
      name: "ค่าเช่ารายเดือน",
      field: "monthlyRent",
      type: "number",
      options: {
        min: 0,
      },
    },
    {
      name: "ค่าเช่ารายเดือน (คำอ่านไทย)",
      field: "monthlyRentTextThai",
      type: "text",
      options: {
        maxLength: 256,
      },
    },
    {
      name: "ชำระค่าเช่าภายในวันที่ (ของทุกเดือน)",
      field: "paymentDueDate",
      type: "number",
      options: {
        max: 31,
        min: 1,
      },
    },
    {
      name: "วันที่เริ่มสัญญา",
      field: "contractStartDate",
      type: "date",
    },
    {
      name: "ระยะเวลาสัญญา",
      field: "contractDuration",
      type: "number",
      options: {
        min: 0,
      },
    },
    {
      name: "ค่าประกันห้อง",
      field: "roomDeposit",
      type: "number",
      options: {
        min: 0,
      },
    },
    {
      name: "ค่าประกันห้อง (คำอ่านไทย)",
      field: "roomDepositTextThai",
      type: "text",
      options: {
        maxLength: 256,
      },
    },
    {
      name: "ระยะเวลาคืนห้องหลังครบกำหนดสัญญา (วัน)",
      field: "returnRoomPeriod",
      type: "number",
      options: {
        min: 0,
      },
    },
    {
      name: "ดอกเบี้ยชำระเงินล่าช้า (ร้อยละ/ปี)",
      field: "latePaymentFee",
      type: "number",
      options: {
        min: 0,
      },
    },
    {
      name: "เงื่อนไขเพิ่มเติม",
      field: "additionalCondition",
      type: "list",
    },
  ];

  const getPdf = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${BASE_URL}contract`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mockData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch PDF from server");
      }
      await previewPdf(await response.blob());
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("ไม่สามารถสร้างไฟล์ PDF ได้");
    } finally {
      setIsLoading(false);
    }
  };

  async function previewPdf(blob) {
    if (!blob) return alert("ไม่สามารถดูไฟล์ PDF ได้");
    const url = await URL.createObjectURL(blob);
    await setContractPdfUrl(`${url}`);
    // window.open(url);
  }

  const saveForm = () => {
    setDisabledForm(!disabledForm);
  };

  useEffect(() => {
    // fetchData();
  }, []);

  return (
    <HeroUIProvider>
      <App title="บัญชีธนาคาร">
        <SettingNav />
        {/* Header */}
        <div className="flex flex-row justify-between items-center sm:justify-center w-full relative p-1 sm:p-4 mb-2 bg-white-500 shadow-md rounded-md ">
          <div className="flex font-bold text-2xl">สัญญาเช่า</div>
        </div>

        {/* Form */}
        <div className="flex flex-col w-full bg-white-500 shadow-md rounded-md p-4">
          <Form
            className="flex flex-col gap-4"
            // onChange={(value) => setMockData(value)}
            onSubmit={(e) => {
              // e.preventDefault()
              saveForm();
            }}
            // disabled={disabledForm}
          >
            {form.map((field, index) => (
              <div key={index} className="flex flex-col mb-2">
                <label className="text-sm font-semibold mb-1">
                  {field.name}
                </label>
                {field.type === "text" ? (
                  <Input
                    key={`${field.field}.${index}-input`}
                    disabled={disabledForm}
                    required
                    type="text"
                    name={field.field}
                    placeholder={`กรอก${field.name}`}
                    value={mockData[field.field]}
                    maxLength={
                      field.options ? field.options.maxLength || 256 : 256
                    }
                    onChange={(e) =>
                      setMockData({
                        ...mockData,
                        [field.field]: e.target.value,
                      })
                    }
                  />
                ) : field.type === "number" ? (
                  <Input
                    key={`${field.field}.${index}-input`}
                    disabled={disabledForm}
                    required
                    type="number"
                    name={field.field}
                    placeholder={`กรอก${field.name}`}
                    value={mockData[field.field]}
                    // maxLength={
                    //   field.options ? field.options.maxLength || 256 : 256
                    // }
                    max={field.options ? field.options.max : null}
                    min={field.options ? field.options.min : null}
                    onChange={(e) =>
                      setMockData({
                        ...mockData,
                        [field.field]: e.target.value,
                      })
                    }
                  />
                ) : field.type === "date" ? (
                  <Input
                    key={`${field.field}.${index}-input`}
                    disabled={disabledForm}
                    required
                    type="date"
                    name={field.field}
                    value={mockData[field.field]}
                    onChange={(e) =>
                      setMockData({
                        ...mockData,
                        [field.field]: e.target.value,
                      })
                    }
                  />
                ) : field.type === "object" ? (
                  <div
                    className="flex flex-col gap-2"
                    key={`${field.field}.${index}-div`}
                  >
                    {field.subFields.map((subField, subIndex) => (
                      <Input
                        key={`${field.field}.${subField.field}.${index}-input`}
                        disabled={disabledForm}
                        required
                        name={`${field.field}.${subField.field}`}
                        placeholder={`กรอก${subField.name}`}
                        maxLength={256}
                        value={
                          mockData[field.field]
                            ? mockData[field.field][subField.field] || ""
                            : ""
                        }
                        onChange={(e) =>
                          setMockData({
                            ...mockData,
                            [field.field]: {
                              ...mockData[field.field],
                              [subField.field]: e.target.value,
                            },
                          })
                        }
                      />
                    ))}
                  </div>
                ) : field.type === "list" ? (
                  <div
                    className="flex flex-col gap-2"
                    key={`${field.field}.${index}-div`}
                  >
                    {mockData[field.field]?.map((condition, subIndex) => (
                      <div
                        className="flex flex-row gap-2"
                        key={`${field.field}-${subIndex}-div`}
                      >
                        <Textarea
                          key={`${field.field}-${subIndex}-input`}
                          disabled={disabledForm}
                          required
                          name={field.field}
                          placeholder={`กรอก${field.name}`}
                          value={condition}
                          maxLength={field.options?.maxLength ?? 4999}
                          minRows={1}
                          onChange={(e) =>
                            setMockData((prev) => {
                              const prevList = [...prev[field.field]];
                              prevList[subIndex] = e.target.value;
                              return {
                                ...prev,
                                [field.field]: prevList,
                              };
                            })
                          }
                        />
                        <Button
                          key={`${field.field}-${subIndex}-delete-button`}
                          variant="solid"
                          color="primary"
                          className={`${disabledForm ? "hidden" : ""}
                        bg-[#ff5757] hover:bg-[#ff5757]/50`}
                          disabled={disabledForm}
                          onClick={(e) =>
                            setMockData((prev) => {
                              const updatedList = [...prev[field.field]];
                              updatedList.splice(subIndex, 1);
                              return { ...prev, [field.field]: updatedList };
                              // return { ...prev, [field.field]: [ ...prev[field.field]].splice(subIndex, 1) }
                            })
                          }
                        >
                          delete
                        </Button>
                      </div>
                    ))}
                    <div
                      className={`
                      ${disabledForm ? "hidden" : ""}
                      flex items-center mt-2`}
                    >
                      <Button
                        key={`${field.field}.${index}-add-button`}
                        variant="solid"
                        color="primary"
                        className="bg-[#01bcb4] text-center hover:bg-[#01bcb4]/50 transition-colors duration "
                        disabled={disabledForm}
                        onClick={(e) =>
                          setMockData((prev) => {
                            return { ...prev, [field.field]: [ ...prev[field.field], ""] };
                          })
                        }
                      >
                        <Plus size="20px" />
                        เพิ่ม
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
            <button
              // onClick={saveForm}
              className={`${
                disabledForm
                  ? "bg-[#01bcb4] hover:bg-[#01bcb4]/50"
                  : "bg-[#00bf63] hover:bg-[#00bf63]/50"
              } text-white px-4 py-2 rounded-md  transition-colors duration-200`}
            >
              {disabledForm ? "แก้ไข" : "บันทึก"}
            </button>
          </Form>
        </div>

        {/* generate pdf */}
        <div className="flex flex-col w-full bg-white-500 shadow-md rounded-md p-4 mt-4 ">
          <Button
            variant="solid"
            color="primary"
            className="bg-[#ffa31e] hover:bg-[#ffa31e]/50 transition-colors duration-200 w-full mb-4"
            onClick={() => getPdf()}
            disabled={!disabledForm}
          >
            สร้างสัญญาเช่า
          </Button>
          {isLoading ? (
            <div>
              <p className="text-center text-gray-500 mt-2">
                กำลังสร้าง PDF สัญญาเช่า...
              </p>
            </div>
          ) : contranctPdfUrl ? (
            <div className="flex h-[21cm] w-auto">
              <iframe src={contranctPdfUrl} height="100%" width="100%"></iframe>
            </div>
          ) : null}
        </div>
      </App>
    </HeroUIProvider>
  );
}
