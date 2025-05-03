"use client";

import React, { useEffect, useState } from "react";
import { HeroUIProvider } from "@heroui/react";
import App from "../../../components/Sidebar/App";
import { Button, Input } from "@heroui/react"; // Ensure you import the correct Button and Input components
import { Form } from "rsuite";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ClassNames } from "@emotion/react";
import SettingNav from "components/settingnav";
import { useAuth } from '@clerk/nextjs';

interface PromptPay {
  promptpay_id: number,
  phone: string,
  name: string,
}

export default function Bank() {
	  const { isLoaded, userId, getToken } = useAuth();
  const [formData, setFormData] = useState({
    accountType: '', // 'promptpay' or 'bank'
    bank: '', // Selected bank index
    bankNumber: '',
    name: '',
  });
  const [error, setError] = useState("");
  const API_BASE_URL = 'http://localhost:3000/api';
  //bank available//
  const availableBank = [
    { name: "ธนาคารกรุงเทพ", bankId: 0 }, //คืองี้เว้ย bank id มันคือไอดีรูป ง่วง
    { name: "ธนาคารกสิกรไทย", bankId: 1 },
    { name: "ธนาคารกรุงไทย", bankId: 2 },
    { name: "ธนาคารกรุงศรี", bankId: 3 },
    { name: "ธนาคารไทยพาณิชย์", bankId: 4 },
    { name: "ธนาคาร ธกส", bankId: 5 },
    { name: "ธนาคารออมสิน", bankId: 6 },
    { name: "ธนาคารอิสลาม", bankId: 7 },
  ]; //available bank for this session , use for selection list
  //to handle selection list
  const [bank, setBank] = React.useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle change in the first dropdown (PromptPay/Bank)
  const handleAccountTypeChange = (e) => {
    const selectedValue = e.target.value;
    setFormData({ ...formData, accountType: selectedValue });
    setIsSelectBank(selectedValue === 'bank');
  };

  ////////////////////////display account /
  //sample datat
  // const account = [
  //   {
  //     bank: "ธนาคารกรุงเทพ",
  //     name: "ฟรีเลน ออเดอะไทม์",
  //     ID: "1990348089",
  //     bankId: 0,
  //   },
  //   {
  //     bank: "ธนาคารกสิกรไทย",
  //     name: "อิมเพิลเมนต์ ดีลีทบัทเทิลด้วย",
  //     ID: "1290348089",
  //     bankId: 1,
  //   },
  // ];

  const bankLogo = [
    { name: "ธนาคารกรุงเทพ", path: "./../../assets/bankLogo/กรุงเทพ.png" },
    { name: "ธนาคารกสิกรไทย", path: "./../../assets/bankLogo/กสิกร.png" },
    { name: "ธนาคารกรุงไทย", path: "./../../assets/bankLogo/กรุงไทย2.png" },
    { name: "ธนาคารกรุงศรี", path: "./../../assets/bankLogo/กรุงศรี 2.png" },
    { name: "ธนาคารไทยพาณิชย์", path: "./../../assets/bankLogo/ไทยพาณิชย์.png" },
    { name: "ธนาคาร ธกส", path: "./../../assets/bankLogo/ธนาคาร ธกส.png" },
    { name: "ธนาคารออมสิน", path: "./../../assets/bankLogo/ออมสิน2.png" },
    { name: "ธนาคารอิสลาม", path: "./../:./assets/bankLogo/ธนาคารอิสลาม.png" },
  ];
  
  const promptpayLogo = { name: "พร้อมเพย์", path: "./../../assets/bankLogo/พร้อมเพย์ 4.png" }

  const [isNewBankOpen, setNewBankOpen] = useState(false);
  const [isSelectBank, setIsSelectBank] = useState(false);
  const [loadingBankAccounts, setLoadingBankAccount] = useState(true);
  const [promptpays, setPromptpays] = useState<{ [key: number]: PromptPay }>({});

  const handleDeleteAccount = (index) => {
    if (window.confirm("Are you sure you want to delete this account?")) {
    }
  } // handle confirm modal when delete button is clicked
  // 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
        const token = await getToken(); // Get the Clerk token
      const result = await fetch(`${API_BASE_URL}/banks/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token
        },
        body: JSON.stringify({ formData }),
        credentials: 'include',
      });

      console.log('Bank account created successfully');
      // alert('Tenant created and linked successfully!');
      setNewBankOpen(false);

    } catch (error) {
      console.error('Error adding bank account:', error);
      alert('Failed to add bank account. Please try again.');
    }
  };
  
  useEffect(() => {
    const fetchBanks = async () => {
      (true);
      try {
        const token = await getToken(); // Get the Clerk token
        const promptpaysRes = await fetch(`${API_BASE_URL}/banks`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token
          },
          credentials: 'include',
        });
        const promptpaysData = await promptpaysRes.json();
        const promptpaysMap = promptpaysData.reduce((acc, promptpay) => {
          acc[promptpay.id] = promptpay;
          return acc;
        }, {} as { [key: number]: PromptPay });

        setPromptpays(promptpaysMap); // Set rooms as a map
        const promptpaysArray = Object.values(promptpaysMap);

      } catch (error) {
        setError("ไม่สามารถโหลดข้อมูลที่พัก");
      } finally {
        setLoadingBankAccount(false);
      }
    };

    fetchBanks();
  }, [getToken]);
  
  const promptpaysArray = Object.values(promptpays);

  return (
    <HeroUIProvider>
      <App title="บัญชีธนาคาร" >

        <SettingNav/>
        {/* Header */}
        <div className="flex flex-row justify-between items-center sm:justify-center w-full relative p-1 sm:p-4 mb-2 bg-white-500 shadow-md rounded-md ">
          <div className="flex text-2xl">บัญชีธนาคาร</div>
          <div className="flex sm:absolute sm:right-2 ">
            <Button
              onClick={() => setNewBankOpen(true)}
              className="bg-custom-what hover:bg-blue-600 text-white-500"
            >
              เพิ่มบัญชี
            </Button>
          </div>
        </div>

        {/* New Bank Form Modal */}
        {isNewBankOpen && (
          <div className="fixed flex left-0 top-0 w-full h-full bg-black-600 bg-opacity-50 justify-center items-center z-10">
            <div className="flex flex-col bg-white-500 p-4 rounded-md w-1/2 min-w-[377px]  h-auto sm:items-center">
              <form onSubmit={handleSubmit} className=" font-noto-sans-thai w-full p-4">
                <div className="flex mb-2 w-full">ประเภทบัญชี</div>
                <select
                  name='bank'
                  // id="demo-simple-select"
                  value={formData.accountType}
                  onChange={handleAccountTypeChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md bg-white/90 mb-4"
                  required
                >
                  <option value="" className="fontFamily: 'noto-sans-thai, sans-serif'">-- เลือกประเภทบัญชี --</option>

                  <option value="promptpay" className="fontFamily: 'noto-sans-thai, sans-serif'">
                    พร้อมเพย์
                  </option>

                  <option value="bank" className="fontFamily: 'noto-sans-thai, sans-serif'">
                    ธนาคาร
                  </option>
                </select>
                {isSelectBank && (
                  <div>
                    <div className="flex mb-2 w-full">ธนาคาร</div>
                    <select
                      name='bank'
                      // id="demo-simple-select"
                      value={formData.bank}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border rounded-md bg-white/90 mb-4"
                      required
                    >
                      <option value="">-- เลือกธนาคาร --</option>
                      {availableBank.map((item, index) => (
                        <option key={item.bankId} value={index} className="fontFamily: 'noto-sans-thai, sans-serif'">
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex flex-col mb-2 w-full">
                  <div className="flex mb-2">ชื่อบัญชี</div>

                  <label className="mb-4">
                    {/*I do not know what is the control ID */}
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="px-3 border-1 border-gray-400 h-14 rounded-md w-full"
                      required
                    />
                  </label>
                </div>

                <div className="flex flex-col mb-2 w-full ">
                  <div className="flex mb-2">เบอร์โทรศัพท์</div>

                  <label className="mb-4">
                    <input
                      name="bankNumber"
                      type="text"
                      value={formData.bankNumber}
                      onChange={handleChange}
                      className="px-3 border-1 border-gray-400 h-14 rounded-md w-full"
                      required
                    />
                  </label>
                </div>

                <div className="flex flex-row justify-center gap-2">
                  <button 
                    type="submit"
                    className="m-1 w-full py-2 rounded-md bg-custom-what hover:bg-custom-hell text-white-500">
                    บันทึก
                  </button>
                  <button className="m-1 w-full py-2 rounded-md bg-gray-300" onClick={() => setNewBankOpen(false)}>
                    ยกเลิก
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* display account */}
        {promptpaysArray.map((promptpay) => (
          <div
            key={promptpay.promptpay_id}
            className="flex w-full flex-row bg-white-500 p-1 sm:p-2 rounded-md mt-2 items-center justify-between shadow-md"
          >
            <div className="flex m-2 mr-4">
              <img
                // src={bankLogo[promptpay.bankId].path}
                src='./../../assets/bankLogo/พร้อมเพย์ 4.png'
                alt="bank brand"
                className="max-w-32 h-auto"
              />
            </div>

            <div className="self-start w-full flex flex-col m-2">
              {/* <div>{account.bank}</div> */}
              <div>พร้อมเพย์</div>
              <div >{promptpay.name}</div>
              <div>{promptpay.phone}</div>
            </div>

            <div className="flex self-end">
              <button
                
                className="bg-[#e45f2b] flex p-1 pr-4 pl-4 rounded-lg text-white-500"
                key={promptpay.promptpay_id}
                onClick={() => handleDeleteAccount(promptpay.promptpay_id)}
              >
                ลบ
              </button>
            </div>
          </div>
        ))}
      </App>
    </HeroUIProvider>
  );
}

