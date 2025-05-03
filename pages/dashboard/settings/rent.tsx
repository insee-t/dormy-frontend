"use client";

import React from "react";
import { HeroUIProvider, Input } from "@heroui/react";
import App from "../../../components/Sidebar/App";

import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField
} from "@mui/material";
import { CircleDollarSign, Droplets, Receipt, SearchIcon, Zap } from "lucide-react";

import { Button } from "@heroui/button";
import SettingNav from "components/settingnav";

//sample data of setting of tariff rate /////////////////////////
const initialExpenses = [
  {
    floor: 1,
    rooms: [
      { roomNumber: 101, rentRate: 300},
      { roomNumber: 102, rentRate: 280},    
    ],
  },
  {
    floor: 2,
    rooms: [
      { roomNumber: 201, rentRate: 310},
      { roomNumber: 202, rentRate: 290},
    ],
  },
];

////////////////////////////////////
const transaction = () => {
  /////////////////////////////////to hadle tariff resolved val/////////////////////////////
  const [expenses, setExpenses] = useState(initialExpenses);

  const [allRentRate, setAllRentRate] = useState("");

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
      <App title="ค่าเช่าห้อง">

        <SettingNav/>
        {/* header */}
        <div className="flex justify-center items-center text-2xl font-bold mb-4 rounded-md shadow-md p-4 bg-white-500">
          <Receipt className="text-[#FFAC3E] m-3"> </Receipt>
          <div>ค่าเช่าห้อง</div>
        </div>

        {/* main table content */}
        <div className="rounded-md shadow-md mb-4 p-2 sm:p-4 bg-white-500">
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
                onChange={(e) => setAllRentRate(e.target.value)}
                type="number"
                placeholder="ค่าเช่าห้อง"
                value={allRentRate}

                //onKeyPress={() => updateAllRates("waterRate", allWaterRate)}
              />
              <Button
                variant="flat"
                onClick={() => updateAllRates("rentRate", allRentRate)}
                className="bg-[#01BCB4]"
              >
                ใช้กับทุกห้อง
              </Button>
            </div>
          </div>

          {/* table */}
          <div className=" flexoverflow-x-auto w-full max-w-full sm:min-w-full sm:w-full ">
            <TableContainer component={Paper} sx={{ minWidth: 400 }}>
              <Table className="">

                <TableHead>
                  <TableRow >
                    <TableCell>ชั้น</TableCell>
                    <TableCell>ห้อง</TableCell>
                    <TableCell >
                      <div className="flex flex-row  items-center ">
                        <CircleDollarSign className="text-[#FFAC3E]"></CircleDollarSign>
                        <div className="m-1 flex">ค่าเช่าห้อง (บาท/เดือน)</div>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {expenses.map((floorData, floorIndex) =>
                    floorData.rooms.map((room, roomIndex) => (
                      <TableRow key={room.roomNumber} >
                        <TableCell>{floorData.floor}</TableCell>
                        <TableCell>{room.roomNumber}</TableCell>
                        <TableCell>
                          <TextField    
                            type="number"
                            value={room.rentRate}
                            onChange={(e) =>
                              handleChange(
                                floorIndex,
                                roomIndex,
                                "rentRate",
                                e.target.value
                              )
                            }
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
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