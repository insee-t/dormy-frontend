"use client";

import React, { useState } from 'react';
import {
  Search, Clock5, CircleX, RotateCcw, Plus, User, ChartNoAxesColumn, Package, SquarePen, CircleCheck, BookOpen, Copy,
  FileX, Eye, CircleMinus, CirclePlus, ChevronsDown
} from 'lucide-react';
import Image from 'next/image';
import { HeroUIProvider } from "@heroui/react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../../components/lib/utils";
import App from "../../components/Sidebar/App";
import { Button } from "../../components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "../../components/ui/command";
import { Popover, PopoverContent, PopoverTrigger, } from "../../components/ui/popover";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination"

const frameworksTitle = [
  { value: "กำลังดำเนินการ", label: "กำลังดำเนินการ" },
  { value: "ดำเนินการเสร็จสิ้น", label: "ดำเนินการเสร็จสิ้น" },
  { value: "รอวัสดุ อุปกรณ์", label: "รอวัสดุ อุปกรณ์" },
];

const frameworksRow = [
  { value: "25", label: "25" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
  { value: "ทั้งหมด", label: "ทั้งหมด" },
];

export default function Notification() {

  const [openFirst, setOpenFirst] = useState(false);
  const [valueFirst, setValueFirst] = useState("");
  const [openSecond, setOpenSecond] = useState(false);
  const [valueSecond, setValueSecond] = useState("");

  return (
    <HeroUIProvider className="bg-gray-100 min-h-screen overflow-y-auto">
      <App title="สรุปการแจ้ง">
        <div className="bg-gray-100 min-h-screen mb-28">
          <div className="flex justify-center w-full bg-white-500 p-4 mb-4 text-center shadow">
            <h1 className="text-2xl ">การแจ้ง</h1>
          </div>
          <div className="bg-white-500  rounded-lg shadow p-4 mb-2">
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ค้นหาตามหมายเลขห้อง"
                    className="w-full p-2 border rounded-lg pl-10"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mb-2">
              <button className="flex items-center gap-2 bg-sky-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white-300">
                ทั้งหมด
              </button>
              <button className="flex items-center gap-2 bg-sky-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white-300">
                แจ้งซ่อม
              </button>
              <button className="flex items-center gap-2 bg-sky-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white-300">
                แจ้งทำความสะอาด
              </button>
              <button className="flex items-center gap-2 bg-sky-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white-300">
                แจ้งย้ายออก
              </button>
              <button className="flex items-center gap-2 bg-sky-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white-300">
                แจ้งอื่นๆ/ฉุกเฉิน
              </button>
            </div>

            <div>
              <label className="flex items-center gap-2 px-2 mt-6 py-2 text-white rounded-lg font-bold">กรอง</label>
            </div>

            <div className="flex gap-3 mb-2 my-2">
              <div className="flex w-full gap-3">
                <button className="flex items-center gap-2 bg-sky-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white-300">
                  กรองตามห้อง
                </button>
                <button className="flex items-center gap-2 bg-sky-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white-300">
                  กรองตามสถานะ
                </button>
                <button className="flex items-center gap-2 bg-sky-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white-300">
                  กรองตามวันที่แจ้ง
                </button>
                <button className="flex items-center gap-2 bg-sky-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white-300">
                  กรองตามวันที่นัดหมาย
                </button>
                <button className="flex items-center gap-2 bg-sky-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white-300">
                  กรองตามผู้ดำเนินการ
                </button>
              </div>
              <div className="justify-end gap-6">
                <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white-300" >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  รีเซ็ต
                </button>
              </div>
            </div>
          </div>

          <button className="my-3 text-white-500 hover:bg-green-700 w-full bg-green-400 p-4 flex justify-center text-center gap-2">
            <Plus />
            เพิ่มรายการ
          </button>

          <div className="py-2 px-4 pr-7 w-full bg-blue-300 flex items-center">
            <div className="text-center ">
              ระบบแจ้งซ่อมออนไลน์
            </div>
            <div className="ml-auto flex space-x-3">
              <button className="p-2 bg-yellow-300 rounded-lg hover:bg-yellow-600 hover:text-white-500 flex gap-1"><SquarePen /> ลงทะเบียนแจ้งซ่อมออนไลน์</button>
              <div className="justify-center items-center flex">
                <Popover open={openFirst} onOpenChange={setOpenFirst}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openFirst}
                      className="w-fit justify-evenly flex items-center shadow-md"
                    >
                      {valueFirst ? frameworksTitle.find(framework => framework.value === valueFirst)?.label : "กรุณาเลือกสถานะ"}
                      <ChevronsUpDown className="ml-2 w-4 opacity-100" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className=" bg-blue-50 m-auto p-1 w-fit">
                    <Command>
                      <CommandList>
                        <CommandEmpty className="">No framework found.</CommandEmpty>
                        <CommandGroup>
                          {frameworksTitle.map(framework => (
                            <CommandItem
                              className="hover:bg-gray-400 hover:text-white-500"
                              key={framework.value}
                              value={framework.value}
                              onSelect={(currentValue) => {
                                setValueFirst(currentValue === valueFirst ? "" : currentValue);
                                setOpenFirst(false);
                              }}
                            >
                              <Check className={cn("h-3 w-auto", valueFirst === framework.value ? "opacity-0" : "opacity-0")} />
                              {framework.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <button className="p-2 bg-red-400 rounded-lg hover:bg-red-600 hover:text-white-500 flex gap-1"><ChartNoAxesColumn /> สถานะ</button>
              <button className="rounded-lg p-2 bg-green-400 hover:bg-green-600 hover:text-white-500 flex gap-1"><Package /> ตรวจสอบสถานะพัสดุ</button>
              <button className="bg-yellow-300 p-2 rounded-lg hover:bg-yellow-600 hover:text-white-500"><User /></button>
            </div>
          </div>

          <div className="mt-3 flex p-3  items-center justify-between mx-8 gap-4">
            <div className="py-3 px-8 flex bg-blue-400 w-full rounded-lg items-center justify-center gap-10">
              <div className="flex flex-col text-xl text-white-500">
                <div className="whitespace-nowrap">รายการทั้งหมด</div>
                <div className="flex gap-2 items-baseline whitespace-nowrap"><p className="text-3xl font-bold text-white-500">185</p> รายการ</div>
                <div className="flex gap-1 text-sm items-center"><CircleCheck className="bg-green-400 rounded-full size-fit" /> สถานะปัจจุบัน</div>
              </div>
              <div className="text-blue-500 bg-gray-100 p-2 rounded-lg">
                <BookOpen className="w-8 h-8" />
              </div>
            </div>
            <div className="py-3 px-8 flex bg-green-500 w-full rounded-lg items-center justify-center gap-8">
              <div className="flex flex-col text-xl text-white-500">
                <div className="whitespace-nowrap">ดำเนินการเรียบร้อย</div>
                <div className="flex gap-2 items-baseline"><p className="text-3xl font-bold text-white-500">164</p> รายการ</div>
                <div className="flex gap-1 text-sm items-center"><CircleCheck className="bg-green-400 rounded-full size-fit" /> สถานะปัจจุบัน</div>
              </div>
              <div className="text-green-500 bg-gray-100 p-2 rounded-lg">
                <CircleCheck className="w-8 h-8" />
              </div>
            </div>
            <div className="py-3 px-8 flex bg-yellow-400 w-full rounded-lg items-center justify-center gap-10">
              <div className="flex flex-col text-xl text-white-500">
                <div className="whitespace-nowrap">กำลังดำเนินการ</div>
                <div className="flex gap-2 items-baseline"><p className="text-3xl font-bold text-white-500">11</p> รายการ</div>
                <div className="flex gap-1 text-sm items-center"><CircleCheck className="bg-green-400 rounded-full size-fit" /> สถานะปัจจุบัน</div>
              </div>
              <div className="text-yellow-500 bg-gray-100 p-2 rounded-lg">
                <Clock5 className="w-8 h-8" />
              </div>
            </div>
            <div className="py-3 px-8 flex bg-red-400 w-full rounded-lg items-center justify-center gap-10">
              <div className="flex flex-col text-xl text-white-500">
                <div className="whitespace-nowrap">รอวัสดุ อุปกรณ์</div>
                <div className="flex gap-2 items-baseline"><p className="text-3xl font-bold text-white-500">10</p> รายการ</div>
                <div className="flex gap-1 text-sm items-center"><CircleCheck className="bg-green-400 rounded-full size-fit" /> สถานะปัจจุบัน</div>
              </div>
              <div className="text-red-500 bg-gray-100 p-2 rounded-lg">
                <CircleX className="w-8 h-8" />
              </div>
            </div>
          </div>

          <div className="mt-10 shadow w-full bg-white-500 p-1">
            <div className="flex gap-4">
              <button className="py-1 px-2 border-1 border-gray-600 hover:bg-yellow-600 flex gap-1 hover:text-white-500 bg-yellow-300"><Copy />คัดลอก</button>
              <button className="p-1 px-2 border-1 border-gray-600 hover:bg-green-600 flex gap-1 hover:text-white-500 bg-green-400"><FileX />Excel</button>
              <Popover open={openSecond} onOpenChange={setOpenSecond}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openFirst}
                    className="w-fit justify-evenly flex items-center shadow-md p-1"
                  >
                    {valueSecond ? frameworksTitle.find(framework => framework.value === valueSecond)?.label : "แสดงแถว"}
                    <ChevronsUpDown className="ml-2 w-4 opacity-100" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className=" bg-blue-50 m-auto p-1 w-fit">
                  <Command>
                    <CommandList>
                      <CommandEmpty className="">No framework found.</CommandEmpty>
                      <CommandGroup>
                        {frameworksRow.map(framework => (
                          <CommandItem
                            className="hover:bg-gray-400 hover:text-white-500"
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setValueSecond(currentValue === valueSecond ? "" : currentValue);
                              setOpenSecond(false);
                            }}
                          >
                            <Check className={cn("h-3 w-auto", valueSecond === framework.value ? "opacity-0" : "opacity-0")} />
                            {framework.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <div className="ml-auto flex gap-1 items-center"><Search />ค้นหา:<input className="border-2 p-1 hover:border-gray-600"></input></div>
            </div>

            <div className="w-full text-sm mt-2">
              คลิกที่หัวข้อเพื่อเรียงการแสดงผล (Sort)
            </div>

            <table className="w-full mt-1 shadow">
              <thead className="bg-blue-400 text-white-500">
                <tr>
                  <th className="hover:bg-blue-800 w-24 p-2 tracking-wide text-left"><button>ลำดับที่</button></th>
                  <th className="hover:bg-blue-800 p-2 tracking-wide text-left"><button>ประทับเวลา</button></th>
                  <th className="hover:bg-blue-800 w-34 p-2 tracking-wide text-left"><button>สถานะ</button></th>
                  <th className="hover:bg-blue-800 w-30 p-2 tracking-wide text-left"><button>สถานะผู้แจ้งซ่อม</button></th>
                  <th className="hover:bg-blue-800 w-34 p-2 tracking-wide text-left"><button>บริเวณ</button></th>
                  <th className="hover:bg-blue-800 w-30  p-2 tracking-wide text-left"><button>ห้องผู้แจ้งซ่อม</button></th>
                  <th className="hover:bg-blue-800 w-30 p-2 tracking-wide text-left"><button>ประเภทงานซ่อม</button></th>
                </tr>
              </thead>
              <tbody className="divde-y divide-black-500">
                <tr className="bg-white-500">
                  <button className="size-full hover:bg-gray-400"><td className="p-2 text-sm whitespace-nowrap flex gap-1 items-center">
                    <CircleMinus className="bg-red-400 rounded-full size-1/4" />
                    001
                  </td></button>
                  <td className="p-2 text-sm whitespace-nowrap">25 กุมภาพันธ์ 2568</td>
                  <td className="p-2 text-sm whitespace-nowrap text-green-500 flex gap-1 items-center"><CircleCheck />ดำเนินการเรียบร้อย</td>
                  <td className="p-2 text-sm whitespace-nowrap">เจ้าของหอพัก</td>
                  <td className="p-2 text-sm whitespace-nowrap">ทางเดินชั้น 9</td>
                  <td className="p-2 text-sm whitespace-nowrap">314</td>
                  <td className="p-2 text-sm whitespace-nowrap">งานไม้ / งานปูน</td>
                </tr>

                <tr>
                  <td colSpan={7} className="px-2 py-3 text-sm border-1 shadow">
                    <span className="font-bold">ลักษณะการชำรุด / สถานที่ชำรุด</span> เปลี่ยนเครื่องกรองนํ้า หอ 7 ชั้น 4 (เครื่องที่จะนำไปเปลี่ยนอยู่ที่หอ 9 ห้องควบคุมไฟฟ้า ชั้น 1)
                  </td>
                </tr>
                <tr>
                  <td colSpan={7} className="px-2 py-3 text-sm border-1 shadow">
                    <span className="font-bold">ช่างผู้รับผิดชอบ</span> ภูวดล
                  </td>
                </tr>

                <tr className="bg-gray-100">
                  <button className="size-full hover:bg-gray-400"><td className="p-2 text-sm whitespace-nowrap flex gap-1 items-center">
                    <CirclePlus className="bg-green-400 rounded-full size-1/4" />
                    001
                  </td></button>
                  <td className="p-2 text-sm whitespace-nowrap">26 กุมภาพันธ์ 2568</td>
                  <td className="p-2 text-sm whitespace-nowrap text-blue-400 flex gap-1 items-center"><Clock5 />กำลังดำเนินการ</td>
                  <td className="p-2 text-sm whitespace-nowrap">ลูกหอ</td>
                  <td className="p-2 text-sm whitespace-nowrap">ห้องน้ำ</td>
                  <td className="p-2 text-sm whitespace-nowrap">111</td>
                  <td className="p-2 text-sm whitespace-nowrap">งานประปา</td>
                </tr>
                <tr className="bg-white-500">
                  <button className="size-full hover:bg-gray-400"><td className="p-2 text-sm whitespace-nowrap flex gap-1 items-center">
                    <CirclePlus className="bg-green-400 rounded-full size-1/4" />
                    002
                  </td></button>
                  <td className="p-2 text-sm whitespace-nowrap">27 กุมภาพันธ์ 2568</td>
                  <td className="p-2 text-sm whitespace-nowrap text-red-400 flex gap-1 items-center"><CircleX />รอวัสดุ อุปกรณ์</td>
                  <td className="p-2 text-sm whitespace-nowrap">ลูกหอ</td>
                  <td className="p-2 text-sm whitespace-nowrap">ห้องน้ำ</td>
                  <td className="p-2 text-sm whitespace-nowrap">112</td>
                  <td className="p-2 text-sm whitespace-nowrap">อื่นๆ</td>
                </tr>
                <tr className="bg-gray-100">
                  <button className="size-full hover:bg-gray-400"><td className="p-2 text-sm whitespace-nowrap flex gap-1 items-center">
                    <CirclePlus className="bg-green-400 rounded-full size-1/4" />
                    003
                  </td></button>
                  <td className="p-2 text-sm whitespace-nowrap">28 กุมภาพันธ์ 2568</td>
                  <td className="p-2 text-sm whitespace-nowrap text-green-500 flex gap-1 items-center"><CircleCheck />ดำเนินการเรียบร้อย</td>
                  <td className="p-2 text-sm whitespace-nowrap">ลูกหอ</td>
                  <td className="p-2 text-sm whitespace-nowrap">ห้องน้ำ</td>
                  <td className="p-2 text-sm whitespace-nowrap">113</td>
                  <td className="p-2 text-sm whitespace-nowrap">งานไฟฟ้า</td>
                </tr>
                <tr className="bg-white-500">
                  <button className="size-full hover:bg-gray-400"><td className="p-2 text-sm whitespace-nowrap flex gap-1 items-center">
                    <CirclePlus className="bg-green-400 rounded-full size-1/4" />
                    004
                  </td></button>
                  <td className="p-2 text-sm whitespace-nowrap">29 กุมภาพันธ์ 2568</td>
                  <td className="p-2 text-sm whitespace-nowrap text-green-500 flex gap-1 items-center"><CircleCheck />ดำเนินการเรียบร้อย</td>
                  <td className="p-2 text-sm whitespace-nowrap">ลูกหอ</td>
                  <td className="p-2 text-sm whitespace-nowrap">ห้องน้ำ</td>
                  <td className="p-2 text-sm whitespace-nowrap">114</td>
                  <td className="p-2 text-sm whitespace-nowrap">งานไฟฟ้า</td>
                </tr>
                <tr className="bg-gray-100">
                  <button className="size-full hover:bg-gray-400"><td className="p-2 text-sm whitespace-nowrap flex gap-1 items-center">
                    <CirclePlus className="bg-green-400 rounded-full size-1/4" />
                    005
                  </td></button>
                  <td className="p-2 text-sm whitespace-nowrap">1 มีนาคม 2568</td>
                  <td className="p-2 text-sm whitespace-nowrap text-green-500 flex gap-1 items-center"><CircleCheck />ดำเนินการเรียบร้อย</td>
                  <td className="p-2 text-sm whitespace-nowrap">ลูกหอ</td>
                  <td className="p-2 text-sm whitespace-nowrap">ห้องน้ำ</td>
                  <td className="p-2 text-sm whitespace-nowrap">115</td>
                  <td className="p-2 text-sm whitespace-nowrap">งานไฟฟา</td>
                </tr>
                <tr className="bg-white-500">
                  <button className="size-full hover:bg-gray-400"><td className="p-2 text-sm whitespace-nowrap flex gap-1 items-center">
                    <CirclePlus className="bg-green-400 rounded-full size-1/4" />
                    006
                  </td></button>
                  <td className="p-2 text-sm whitespace-nowrap">2 มีนาคม 2568</td>
                  <td className="p-2 text-sm whitespace-nowrap text-green-500 flex gap-1 items-center"><CircleCheck />ดำเนินการเรียบร้อย</td>
                  <td className="p-2 text-sm whitespace-nowrap">ลูกหอ</td>
                  <td className="p-2 text-sm whitespace-nowrap">ห้องน้ำ</td>
                  <td className="p-2 text-sm whitespace-nowrap">116</td>
                  <td className="p-2 text-sm whitespace-nowrap">งานประป่</td>
                </tr>
                <tr className="bg-gray-100">
                  <button className="size-full hover:bg-gray-400"><td className="p-2 text-sm whitespace-nowrap flex gap-1 items-center">
                    <CirclePlus className="bg-green-400 rounded-full size-1/4" />
                    007
                  </td></button>
                  <td className="p-2 text-sm whitespace-nowrap">3 มีนาคม 2568</td>
                  <td className="p-2 text-sm whitespace-nowrap text-green-500 flex gap-1 items-center"><CircleCheck />ดำเนินการเรียบร้อย</td>
                  <td className="p-2 text-sm whitespace-nowrap">ลูกหอ</td>
                  <td className="p-2 text-sm whitespace-nowrap">ห้องน้ำ</td>
                  <td className="p-2 text-sm whitespace-nowrap">117</td>
                  <td className="p-2 text-sm whitespace-nowrap">อื่นๆ</td>
                </tr>
                <tr className="bg-white-500">
                  <button className="size-full hover:bg-gray-400"><td className="p-2 text-sm whitespace-nowrap flex gap-1 items-center">
                    <CirclePlus className="bg-green-400 rounded-full size-1/4" />
                    008
                  </td></button>
                  <td className="p-2 text-sm whitespace-nowrap">27 กุมภาพันธ์ 2568</td>
                  <td className="p-2 text-sm whitespace-nowrap text-red-400 flex gap-1 items-center"><CircleX />รอวัสดุ อุปกรณ์</td>
                  <td className="p-2 text-sm whitespace-nowrap">ลูกหอ</td>
                  <td className="p-2 text-sm whitespace-nowrap">ห้องน้ำ</td>
                  <td className="p-2 text-sm whitespace-nowrap">112</td>
                  <td className="p-2 text-sm whitespace-nowrap">อื่นๆ</td>
                </tr>
              </tbody>
            </table>

            <div className="flex w-full">
              <Pagination className="my-auto">
                <PaginationContent className=" mt-2 w-full flex justify-end">
                  <PaginationItem className="hover:bg-gray-300">
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem className="hover:bg-gray-400">
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem className="hover:bg-gray-400">
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem className="hover:bg-gray-400">
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem className="hover:bg-gray-400">
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

          </div>
        </div>
      </App>
    </HeroUIProvider>
  );
}
