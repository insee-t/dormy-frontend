"use client";

import React from "react";
import { Button, Input, TableColumn } from "@heroui/react";
import { HeroUIProvider } from "@heroui/react";
import App from "../../components/Sidebar/App";

import { useState } from "react";

import { Checkbox, CheckboxGroup, Panel } from "rsuite";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

//////////////////////////// Data for the totals table/////////////
const transactionSum = [
  { label: "รายรับทั้งหมด", value: 7000 },
  { label: "รายจ่ายทั้งหมด", value: 1500 },
  { label: "รวมทั้งหมด", value: 5500 },
];
///////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////xample data for main table ////////////////
const columns = [
  "วันที่",
  "เลขที่ใบเสร็จ",
  "รายละเอียด",
  "ห้อง",
  "หมวดหมู่",
  "จำนวนเงิน",
];

const transactionTable = [
  {
    date: "2025-02-01",
    billNumber: "BN001",
    detail: "Electricity",
    room: "A101",
    category: "Utility",
    amount: 1200,
  },
  {
    date: "2025-02-02",
    billNumber: "BN002",
    detail: "Water",
    room: "A102",
    category: "Utility",
    amount: 300,
  },
  {
    date: "2025-02-03",
    billNumber: "BN003",
    detail: "Internet",
    room: "A103",
    category: "Service",
    amount: 800,
  },
  {
    date: "2025-01-01",
    billNumber: "BN001",
    detail: "Electricity",
    room: "A101",
    category: "Utility",
    amount: 1200,
  },
  {
    date: "2025-01-02",
    billNumber: "BN002",
    detail: "Water",
    room: "A102",
    category: "Utility",
    amount: 300,
  },
  {
    date: "2025-01-03",
    billNumber: "BN003",
    detail: "Internet",
    room: "A103",
    category: "Service",
    amount: 800,
  },
  {
    date: "2025-01-04",
    billNumber: "BN004",
    detail: "Cleaning",
    room: "A104",
    category: "Service",
    amount: 500,
  },
  {
    date: "2025-01-05",
    billNumber: "BN005",
    detail: "Maintenance",
    room: "A105",
    category: "Repair",
    amount: 1500,
  },
  {
    date: "2025-01-06",
    billNumber: "BN006",
    detail: "Furniture",
    room: "A106",
    category: "Asset",
    amount: 2500,
  },
  {
    date: "2025-01-07",
    billNumber: "BN007",
    detail: "Security",
    room: "A107",
    category: "Service",
    amount: 900,
  },
  {
    date: "2025-01-08",
    billNumber: "BN008",
    detail: "Electricity",
    room: "A108",
    category: "Utility",
    amount: 1300,
  },
  {
    date: "2025-01-09",
    billNumber: "BN009",
    detail: "Water",
    room: "A109",
    category: "Utility",
    amount: 350,
  },
  {
    date: "2025-01-10",
    billNumber: "BN010",
    detail: "Internet",
    room: "A110",
    category: "Service",
    amount: 750,
  },
  {
    date: "2025-01-11",
    billNumber: "BN011",
    detail: "Cleaning",
    room: "A111",
    category: "Service",
    amount: 600,
  },
  {
    date: "2025-01-12",
    billNumber: "BN012",
    detail: "Maintenance",
    room: "A112",
    category: "Repair",
    amount: 1800,
  },
  {
    date: "2025-01-13",
    billNumber: "BN013",
    detail: "Furniture",
    room: "A113",
    category: "Asset",
    amount: 2400,
  },
  {
    date: "2025-01-14",
    billNumber: "BN014",
    detail: "Security",
    room: "A114",
    category: "Service",
    amount: 950,
  },
  {
    date: "2025-01-15",
    billNumber: "BN015",
    detail: "Electricity",
    room: "A115",
    category: "Utility",
    amount: 1250,
  },
  {
    date: "2025-01-16",
    billNumber: "BN016",
    detail: "Water",
    room: "A116",
    category: "Utility",
    amount: 280,
  },
  {
    date: "2025-01-17",
    billNumber: "BN017",
    detail: "Internet",
    room: "A117",
    category: "Service",
    amount: 820,
  },
  {
    date: "2025-01-18",
    billNumber: "BN018",
    detail: "Cleaning",
    room: "A118",
    category: "Service",
    amount: 550,
  },
  {
    date: "2025-01-19",
    billNumber: "BN019",
    detail: "Maintenance",
    room: "A119",
    category: "Repair",
    amount: 1750,
  },
  {
    date: "2025-01-20",
    billNumber: "BN020",
    detail: "Furniture",
    room: "A120",
    category: "Asset",
    amount: 2600,
  },
];

////////////////////////////////////////////////////////////////////////////////////////////

export default function transaction() {
  /////////////////////////////////////check box part///////////////////////////////////////////
  // State to track checked values for each year
  const [checkedValues, setCheckedValues] = useState({
    "2023": [],
    "2024": [],
    "2025": [],
    "2026": [],
  });

  // Define years and their corresponding months
  const years = ["2023", "2024", "2025", "2026"];
  const months = {
    "2023": [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ],
    "2024": [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ],
    "2025": [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ],
    "2026": ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย."],
  };

  // Handle parent checkbox change (year)
  const handleParentChange = (year, checked) => {
    if (checked) {
      // If parent is checked, check all children
      setCheckedValues((prev) => ({
        ...prev,
        [year]: months[year],
      }));
    } else {
      // If parent is unchecked, uncheck all children
      setCheckedValues((prev) => ({
        ...prev,
        [year]: [],
      }));
    }
  };

  // Handle child checkbox change (month)
  const handleChildChange = (year, month, checked) => {
    let updatedMonths;
    if (checked) {
      // Add the month to the checked list
      updatedMonths = [...checkedValues[year], month];
    } else {
      // Remove the month from the checked list
      updatedMonths = checkedValues[year].filter((m) => m !== month);
    }

    // Update the state with the new checked months
    setCheckedValues((prev) => ({
      ...prev,
      [year]: updatedMonths,
    }));
  };

  // Check if all children are checked for a given year
  const isAllChildrenChecked = (year) => {
    return checkedValues[year].length === months[year].length;
  };

  // Check if some but not all children are checked for a given year
  const isSomeChildrenChecked = (year) => {
    return (
      checkedValues[year].length > 0 &&
      checkedValues[year].length < months[year].length
    );
  };

  // Method to get selected years and months
  const getSelectedData = () => {
    const selectedData = {};
    for (const year of years) {
      if (checkedValues[year].length > 0) {
        selectedData[year] = checkedValues[year];
      }
    }
    return selectedData;
  };

  // Log selected data to the console (for demonstration)
  const logSelectedData = () => {
    const selectedData = getSelectedData();
    console.log("Selected Years and Months:", selectedData);
  };

  /////////////////////////////////////check box part///////////////////////////////////////////

  return (
    <HeroUIProvider>
      <App title="รายรับ-รายจ่าย">
        {/* header */}
        <div className="flex items-center justify-center w-full shadow-md mb-2 bg-white-500 rounded-md">
          <span className="text-2xl p-4 ">รายรับ-รายจ่าย</span>
        </div>

        {/* custom check box */}
        <div className="flex-col w-full  shadow-md p-0.5 sm:p-2 mb-2 bg-white-500 rounded-md">
          <div className="flex justify-center mb-2 ">
            <h1 className="text-large">เลือกเดือน/ปี</h1>
          </div>

          <div className=" p-0.5 flex flex-col">
            {years.map((year) => (
              <div key={year} className=" m-1">
                {/* Parent Checkbox (Year) */}
                <Checkbox
                  indeterminate={isSomeChildrenChecked(year)}
                  checked={isAllChildrenChecked(year)}
                  onChange={(value, checked) =>
                    handleParentChange(year, checked)
                  }
                  className="font-(family-name:'Noto Sans Thai, serif') "
                >
                  <strong>{year}</strong>
                </Checkbox>

                {/* Child Checkboxes (Months) */}
                <CheckboxGroup
                  name={year}
                  value={checkedValues[year]}
                  onChange={(value) => {
                    setCheckedValues((prev) => ({
                      ...prev,
                      [year]: value,
                    }));
                  }}
                  className="ml-2 flex flex-wrap"
                >
                  {months[year].map((month) => (
                    <Checkbox
                      key={month}
                      value={month}
                      onChange={(value, checked) =>
                        handleChildChange(year, month, checked)
                      }
                      className="m-0.5"
                    >
                      {month}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </div>
            ))}
          </div>
        </div>

        {/* sum table */}
        <div className="w-full mb-2 bg-white-500 shadow-md rounded-md ">
          <TableContainer component={Paper} sx={{ minWidth: 300 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontFamily: "Noto Sans Thai, serif" }}>
                    <strong>สรุป</strong>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontFamily: "Noto Sans Thai, serif" }}
                  >
                    <strong>บาท</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionSum.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontFamily: "Noto Sans Thai, serif" }}>
                      {row.label}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontFamily: "Noto Sans Thai, serif" }}
                    >
                      {row.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {/* expense table */}
        <div className="flex-col w-full p-0.5 sm:p-2 justify-center shadow-md  rounded-sm bg-white-500">
          <div className="flex p-0.5 flex-row justify-between sm:justify-center items-center sm:relative m-2">
            <div className="flex m-1">
              <h1 className="text-large">มิถุนายน 1992</h1>
            </div>

            <div className="sm:absolute sm:right-0 m-1">
              <Button className="flex">ดาวน์โหลด Excel</Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row  justify-between m-2 p-0.5">
            <div className="flex flex-wrap sm:flex-col ">
              <div>
                <Button variant="flat" className=" m-1 bg-blue-600">
                  พิมพ์ใบสรุปรายรับ-จ่าย
                </Button>
              </div>
              <div>
                <Button variant="flat" className=" m-1">
                  แสดงข้อมูลตามวันที่ได้รับเงิน
                </Button>
              </div>
            </div>

            <div className=" flex flex-wrap sm:flex-row  ">
              <Button variant="flat" className="bg-blue-500 m-1">
                เพิ่มรายจ่าย
              </Button>
              <Button variant="flat" className=" bg-green-500 m-1">
                เพิ่มรายรับ
              </Button>
            </div>
          </div>

          <div className="max-w-[414px] sm:max-w-full overflow-x-auto">
            <TableContainer component={Paper} sx={{ minWidth: 600 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((col, index) => (
                      <TableCell
                        key={index}
                        sx={{ fontFamily: "Noto Sans Thai, serif" }}
                      >
                        <strong>{col}</strong>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactionTable.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ fontFamily: "Noto Sans Thai, serif" }}>
                        {row.date}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Noto Sans Thai, serif" }}>
                        {row.billNumber}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Noto Sans Thai, serif" }}>
                        {row.detail}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Noto Sans Thai, serif" }}>
                        {row.room}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Noto Sans Thai, serif" }}>
                        {row.category}
                      </TableCell>
                      <TableCell
                        sx={{ fontFamily: "Noto Sans Thai, serif" }}
                        align="right"
                      >
                        {row.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </App>
    </HeroUIProvider>
  );
}