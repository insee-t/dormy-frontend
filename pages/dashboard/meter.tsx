"use client";

import React from "react";
import { HeroUIProvider, Input } from "@heroui/react";
import App from "../../components/Sidebar/App";

import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
} from "@mui/material";
import { ChevronDown, Droplets, Receipt, SearchIcon, Zap } from "lucide-react";

import { Button } from "@heroui/button";
import { color } from "framer-motion";
import SettingNav from "../../components/settingnav";
// import DatePickerComponent from "../../components/DatePickerComponent";

//sample data of setting of tariff rate /////////////////////////
const initialExpenses = [
  {
    floor: 1,
    rooms: [
      { roomNumber: 101, waterRate: 300, electricTariffRate: 450, status: "ยังไม่ชำระ" },
      { roomNumber: 102, waterRate: 280, electricTariffRate: 420, status: "ยังไม่ชำระ" },
    ],
  },
  {
    floor: 2,
    rooms: [
      { roomNumber: 201, waterRate: 310, electricTariffRate: 460, status: "ยังไม่ชำระ" },
      { roomNumber: 202, waterRate: 290, electricTariffRate: 430, status: "ยังไม่ชำระ" },
    ],
  },
];

////////////////////////////////////
const transaction = () => {
  /////////////////////////////////to hadle tariff resolved val/////////////////////////////
  const [expenses, setExpenses] = useState(initialExpenses);

  const [allWaterRate, setAllWaterRate] = useState("");
  const [allElectricRate, setAllElectricRate] = useState("");

  const [selectedMonth, setSelectedMonth] = useState('02');
  const [selectedYear, setSelectedYear] = useState('2568');

  const months = [
    { value: '01', label: 'มกราคม' },
    { value: '02', label: 'กุมภาพันธ์' },
    { value: '03', label: 'มีนาคม' },
    { value: '04', label: 'เมษายน' },
    { value: '05', label: 'พฤษภาคม' },
    { value: '06', label: 'มิถุนายน' },
    { value: '07', label: 'กรกฎาคม' },
    { value: '08', label: 'สิงหาคม' },
    { value: '09', label: 'กันยายน' },
    { value: '10', label: 'ตุลาคม' },
    { value: '11', label: 'พฤศจิกายน' },
    { value: '12', label: 'ธันวาคม' }
  ];

  const years = [
    { value: '2568', label: '2568' },
    { value: '2567', label: '2567' },
    { value: '2566', label: '2566' },
    { value: '2565', label: '2565' }
  ];

  const initialFormState = {
    roomNumber: '101',
    billingPeriod: 'กุมภาพันธ์ 2568',
    rent: '3000',
    waterStartMeter: '550',
    waterEndMeter: '525',
    waterUnitsUsed: '25',
    waterRate: '25',
    waterTotal: '625',
    electricityStartMeter: '9000',
    electricityEndMeter: '8000',
    electricityUnitsUsed: '1000',
    electricityRate: '7',
    electricityTotal: '7000',
    total: '10625'
  };
  
  const [formData, setFormData] = useState(initialFormState);

  const getMonthName = (monthValue) => {
    return months.find(month => month.value === monthValue)?.label || '';
  };

  const handleDateChange = (type, value) => {
    if (type === 'month') {
      setSelectedMonth(value);
    } else {
      setSelectedYear(value);
    }

    const monthName = type === 'month' ?
      getMonthName(value) :
      getMonthName(selectedMonth);

    const year = type === 'year' ? value : selectedYear;

    setFormData(prev => ({
      ...prev,
      billingPeriod: `${monthName} ${year}`
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setSelectedMonth('02');
    setSelectedYear('2568');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };

      if (name === 'waterStartMeter' || name === 'waterEndMeter') {
        const start = parseFloat(newData.waterStartMeter) || 0;
        const end = parseFloat(newData.waterEndMeter) || 0;
        const unitsUsed = Math.max(0, start - end);
        const total = unitsUsed * parseFloat(prev.waterRate);

        newData.waterUnitsUsed = unitsUsed.toString();
        newData.waterTotal = total.toString();
      }

      if (name === 'electricityStartMeter' || name === 'electricityEndMeter') {
        const start = parseFloat(newData.electricityStartMeter) || 0;
        const end = parseFloat(newData.electricityEndMeter) || 0;
        const unitsUsed = Math.max(0, start - end);
        const total = unitsUsed * parseFloat(prev.electricityRate);

        newData.electricityUnitsUsed = unitsUsed.toString();
        newData.electricityTotal = total.toString();
      }

      const rentTotal = parseFloat(newData.rent) || 0;
      const waterTotal = parseFloat(newData.waterTotal) || 0;
      const electricityTotal = parseFloat(newData.electricityTotal) || 0;
      newData.total = (rentTotal + waterTotal + electricityTotal).toString();

      return newData;
    });
  };

  const handleChange = (floorIndex, roomIndex, field, value) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[floorIndex].rooms[roomIndex][field] = Number(value);
    setExpenses(updatedExpenses);
  };

  const updateAllRates = (field, value) => {
    const updatedExpenses = expenses.map((floor) => ({
      ...floor,
      rooms: floor.rooms.map((room) => ({
        ...room,
        [field]: Number(value),
      })),
    }));
    setExpenses(updatedExpenses);
  };

  ////////////////////////////////////////////////////////////////////////
  return (
    <HeroUIProvider>
      <App title="ส่งบิลค่าน้ำ-ค่าไฟ">

        {/* header */}
        <div className="flex justify-center items-center text-2xl font-bold mb-4 rounded-md shadow-md p-4 bg-white-500">
          <Receipt className="text-[#FFAC3E] m-3"> </Receipt>
          <div>ส่งบิลค่าน้ำ-ค่าไฟ</div>
        </div>

        {/* main table content */}
        <div className="rounded-md shadow-md mb-4 p-2 sm:p-4 bg-white-500">

                    <div className="bg-white border rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-center gap-4">
                            <div className="relative">
                                <select
                                    value={selectedMonth}
                                    onChange={(e) => handleDateChange('month', e.target.value)}
                                    className="appearance-none bg-white border rounded-lg px-4 py-2 pr-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400"
                                >
                                    {months.map((month) => (
                                        <option key={month.value} value={month.value}>
                                            {month.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                            </div>
                            <div className="relative">
                                <select
                                    value={selectedYear}
                                    onChange={(e) => handleDateChange('year', e.target.value)}
                                    className="appearance-none bg-white border rounded-lg px-4 py-2 pr-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400"
                                >
                                    {years.map((year) => (
                                        <option key={year.value} value={year.value}>
                                            {year.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                            </div>
                        </div>
                    </div>
          {/* head */}
          <div className="flex flex-col justify-between mr-2  md:flex-row ">
            <div className="flex flex-row gap-4 mb-6 mr-1 ">
              <Input
                className="flex-1 min-w-30"
                placeholder="ค้นหมายเลขห้อง"
                startContent={<SearchIcon className="text-gray-400" />}
              />
            </div>

            <div className="flex flex-row mb-2 mr-1">
              <Input
                className="flex-1 max-w-40 min-w-20 mr-2"
                onChange={(e) => setAllWaterRate(e.target.value)}
                type="number"
                placeholder="ค่าน้ำ"
                value={allWaterRate}

                //onKeyPress={() => updateAllRates("waterRate", allWaterRate)}
              />
              <Button
                variant="flat"
                onClick={() => updateAllRates("waterRate", allWaterRate)}
                className="bg-[#01BCB4] text-white-500"
              >
                ใช้กับทุกห้อง
              </Button>
            </div>
            <div className="flex flex-row mb-6">
              <Input
                className="flex-1 max-w-40 min-w-20 mr-2"
                onChange={(e) => setAllElectricRate(e.target.value)}
                type="number"
                placeholder="ค่าไฟ"
                value={allElectricRate}

                //onKeyPress={() => updateAllRates("waterRate", allWaterRate)}
              ></Input>
              <Button
                variant="flat"
                onClick={() =>
                  updateAllRates("electricTariffRate", allElectricRate)
                }
                className="bg-[#01BCB4] text-white-500"
              >
                ใช้กับทุกห้อง
              </Button>
            </div>
          </div>
          {/* table */}
          <div className="overflow-x-auto w-full max-w-full sm:min-w-full sm:w-full ">
            <TableContainer component={Paper} sx={{ minWidth: 300 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ชั้น</TableCell>
                    <TableCell>ห้อง</TableCell>

                    <TableCell>
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <Droplets className="text-[#01BCB4]"></Droplets>
                        <div className="m-1 ">ค่าน้ำ เลขมิเตอร์ครั้งนี้</div>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">ครั้งก่อน</TableCell>
                    <TableCell>
                      <div className="flex flex-col  sm:flex-row sm:items-center">
                        <Zap className="text-[#f6c445]"></Zap>
                        <div className="m-1">ค่าไฟ เลขมิเตอร์ครั้งนี้</div>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">ครั้งก่อน</TableCell>
                    <TableCell>ส่งบิล</TableCell>
                    <TableCell>ปริ้นท์บิล</TableCell>

                    <TableCell>สถานะ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expenses.map((floorData, floorIndex) =>
                    floorData.rooms.map((room, roomIndex) => (
                      <TableRow key={room.roomNumber}>
                        <TableCell>{floorData.floor}</TableCell>
                        <TableCell>{room.roomNumber}</TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            value={room.waterRate}
                            onChange={(e) =>
                              handleChange(
                                floorIndex,
                                roomIndex,
                                "waterRate",
                                e.target.value
                              )
                            }
                            variant="outlined"
                            size="small"
                            // className="w-1/2"
                          />
                        </TableCell>
                        <TableCell>
                        </TableCell>

                        <TableCell>
                          <TextField
                            type="number"
                            value={room.waterRate}
                            onChange={(e) =>
                              handleChange(
                                floorIndex,
                                roomIndex,
                                "waterRate",
                                e.target.value
                              )
                            }
                            variant="outlined"
                            size="small"
                            // className="w-1/2"
                          />
                        </TableCell>
                        <TableCell>
                        </TableCell>
                        

                        <TableCell>
                          <div className="justify-start">
                            <Button className="bg-custom-what hover:bg-blue-500 text-white-500 ">
                              ส่ง
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="justify-start">
                            <Button className="bg-custom-is hover:bg-custom-is text-white-500 ">
                            พิมพ์
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>{room.status}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </App>
    </HeroUIProvider>
  );
};

export default transaction;