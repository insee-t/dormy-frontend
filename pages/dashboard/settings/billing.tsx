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
  TextField,
  Box,
} from "@mui/material";
import { Droplets, Receipt, SearchIcon, Zap } from "lucide-react";

import { Button } from "@heroui/button";
import { color } from "framer-motion";
import SettingNav from "components/settingnav";

//sample data of setting of tariff rate /////////////////////////
const initialExpenses = [
  {
    floor: 1,
    rooms: [
      { roomNumber: 101, waterRate: 300, electricTariffRate: 450 },
      { roomNumber: 102, waterRate: 280, electricTariffRate: 420 },
    ],
  },
  {
    floor: 2,
    rooms: [
      { roomNumber: 201, waterRate: 310, electricTariffRate: 460 },
      { roomNumber: 202, waterRate: 290, electricTariffRate: 430 },
    ],
  },
];

////////////////////////////////////
const transaction = () => {
  /////////////////////////////////to hadle tariff resolved val/////////////////////////////
  const [expenses, setExpenses] = useState(initialExpenses);

  const [allWaterRate, setAllWaterRate] = useState("");
  const [allElectricRate, setAllElectricRate] = useState("");

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
      <App title="ค่าน้ำ-ค่าไฟ">

        <SettingNav/>
        {/* header */}
        <div className="flex justify-center items-center text-2xl font-bold mb-4 rounded-md shadow-md p-4 bg-white-500">
          <Receipt className="text-[#FFAC3E] m-3"> </Receipt>
          <div>ค่าน้ำ-ค่าไฟ</div>
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
                onChange={(e) => setAllWaterRate(e.target.value)}
                type="number"
                placeholder="ค่าน้ำ"
                value={allWaterRate}

                //onKeyPress={() => updateAllRates("waterRate", allWaterRate)}
              />
              <Button
                variant="flat"
                onClick={() => updateAllRates("waterRate", allWaterRate)}
                className="bg-[#01BCB4]"
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
                className="bg-[#01BCB4]"
              >
                ใช้กับทุกห้อง
              </Button>
            </div>
          </div>
          {/* table */}
          <div className="overflow-x-auto w-full max-w-full sm:min-w-full sm:w-full ">
            <TableContainer component={Paper} sx={{ minWidth: 400 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ชั้น</TableCell>
                    <TableCell>ห้อง</TableCell>
                    <TableCell>
                      <div className="flex flex-row  sm:items-center">
                        <Droplets className="text-[#01BCB4]"></Droplets>
                        <div className="m-1">ค่าน้ำ (บาทต่อหน่วย)</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-row  sm:items-center">
                        <Zap className="text-[#f6c445]"></Zap>
                        <div className="m-1">ค่าไฟ (บาทต่อหน่วย)</div>
                      </div>
                    </TableCell>
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
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            value={room.electricTariffRate}
                            onChange={(e) =>
                              handleChange(
                                floorIndex,
                                roomIndex,
                                "electricTariffRate",
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