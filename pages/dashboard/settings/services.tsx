"use client";

import React from "react";
import { HeroUIProvider, Input, TableColumn } from "@heroui/react";
import App from "../../../components/Sidebar/App";
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';

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
} from "@mui/material";
import { CircleDollarSign, Droplets, Receipt, SearchIcon } from "lucide-react";
import SettingNav from "components/settingnav";

//sample data of setting of tariff rate /////////////////////////

const initialSurviceRate = [
  { type: "ค่าที่จอดรถ", rate: 100 },
  { type: "ค่าอินเตอร์เน็ต", rate: 100 },
  { type: "ค่าบริการทำความสะอาด", rate: 100 },
  { type: "ค่าบริการอื่นๆ", rate: 100 },
];

////////////////////////////////////
const transaction = () => {
  /////////////////////////////////hadle rate input by CHAT G(phupha)T/////////////////////////////
  const [serviceRate, setSurviceRate] = useState(initialSurviceRate);
  const handleChange = (serviceIndex, value) => {
    const updatedServiceRate = [...serviceRate];
    updatedServiceRate[serviceIndex].rate = Number(value);
    setSurviceRate(updatedServiceRate);
  };
  ////////////////////////////////////////////////////////////////////////
  return (
    <HeroUIProvider>
      <App title="ค่าบริการ">

        <SettingNav/>
        {/* header */}
        <div className="flex justify-center items-center text-2xl font-bold mb-4 rounded-md shadow-md p-4 bg-white-500">
          <CleaningServicesOutlinedIcon className="text-[#FFAC3E] m-3 size-8">
            {" "}
          </CleaningServicesOutlinedIcon>
          <div>ค่าบริการ</div>
        </div>

        {/* main table content */}
        <div className="rounded-md shadow-md mb-4 p-2 sm:p-4 bg-white-500">
          <div className="flex w-ful text-white-500 bg-custom-what -m-2 sm:-m-4 mb-4 sm:mb-4 rounded-t-md p-2">
            ค่าบริการ
          </div>
          {/* head */}

          {/* table */}
          <div className="overflow-x-auto rounded-md shadow-sm ">
            <TableContainer
              component={Paper}
              sx={{ minWidth: 300, fontFamily: "noto-sans-thai, sans-serif" }}
            >
              <Table className="">
                <TableHead>
                  <TableRow className="">
                    <TableCell className=" font-noto-sans-thai">
                      <div className="flex flex-row  items-center ">
                        <div className="m-1 flex font-bold">บริการ</div>
                      </div>
                    </TableCell>
                    <TableCell className=" font-noto-sans-thai">
                      <div className="flex flex-row  items-center ">
                        <CircleDollarSign className="text-[#FFAC3E]"></CircleDollarSign>
                        <div className="m-1 flex font-bold">อัตรา (บาท/เดือน)</div>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {serviceRate.map((service, index) => (
                    <TableRow>
                      <TableCell className=" font-noto-sans-thai">
                        {service.type}
                      </TableCell>
                      <TableCell className=" font-noto-sans-thai">
                        <div className="">
                          {/*I dunno how can I change this shit font style */}
                          <TextField
                            type="number"
                            value={service.rate}
                            onChange={(e) =>
                              handleChange(index, e.target.value)
                            }
                            variant="outlined"
                            size="small"
                            sx={{ fontFamily: "noto-sans-thai, sans-serif" }}
                          />
                        </div>
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
};

export default transaction;