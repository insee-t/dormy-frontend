"use client";

import React, { useEffect, useState } from "react";
import { Button, Input } from "@heroui/react";
import { HeroUIProvider } from "@heroui/react";
import { User, SearchIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import App from "../../components/Sidebar/App";

export default function RoomLayout() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session, status, update } = useSession();

  const API_BASE_URL = process.env.NEXTAUTH_URL || "http://localhost:3000/api";

  const summaryData = [
    {
      label: "ห้องว่าง",
      count: apartments.filter((room) => room.availability_status === "vacant")
        .length,
      color: "bg-gray-400",
    },
    {
      label: "ห้องมีผู้เช่า",
      count: apartments.filter(
        (room) => room.availability_status === "occupied",
      ).length,
      color: "bg-green-500",
    },
    {
      label: "ห้องปิดปรับปรุง",
      count: apartments.filter(
        (room) => room.availability_status === "under_maintenance",
      ).length,
      color: "bg-red-500",
    },
  ];

  useEffect(() => {
    if (status !== "authenticated" || !session?.accessToken) return;

    const fetchData = async () => {
      try {
        // const token = await getToken(); // Get the Clerk token
        const response = await fetch(`${API_BASE_URL}/apartments`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.accessToken}`, // Include the token
          },
          credentials: "include", // Sends cookies and authentication headers
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        setApartments(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [status, session]); // Add dependencies

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>กำลังโหลด...</p>
      </div>
    );
  }

  // Filter apartments based on search query
  const filteredApartments = apartments.filter((room) =>
    room.apartment_number.toString().includes(searchQuery),
  );

  // Group rooms by floor
  const floorData: Record<
    number,
    { id: number; status: string; color: string }[]
  > = filteredApartments.reduce(
    (acc, room) => {
      const floor = room.floor_number || 1;
      if (!acc[floor]) acc[floor] = [];
      acc[floor].push({
        id: room.apartment_number,
        status: room.availability_status,
        color:
          room.availability_status === "occupied"
            ? "bg-green-500"
            : room.availability_status === "vacant"
              ? "bg-gray-400"
              : "bg-red-500",
      });
      return acc;
    },
    {} as Record<number, { id: number; status: string; color: string }[]>,
  );

  return (
    <App title="ผังห้อง">
      <div className="w-full">
        {/* Loading Indicator */}
        {loading ? <p>Loading...</p> : null}

        {/* สรุปข้อมูลห้องพัก */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {summaryData.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-white-500 rounded-lg shadow"
            >
              <div
                className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center`}
              >
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-lg font-semibold">{item.count} ห้อง</div>
                <div className="text-sm text-gray-600">{item.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ส่วนค้นหาและฟิลเตอร์ */}
        <div className="flex gap-4 mb-6">
          <Input
            className="flex-1"
            placeholder="ค้นหาตามหมายเลขห้อง"
            startContent={<SearchIcon className="text-gray-400" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="flat">ฟิลเตอร์ห้อง</Button>
          <Button variant="flat">ตั้งค่าการแสดงผล</Button>
        </div>

        {/* แสดงห้องพักแต่ละชั้น */}
        <div className="space-y-6 max-w-5xl mx-auto">
          {Object.entries(floorData).map(([floor, rooms]) => (
            <div key={floor} className="bg-white-500 rounded-lg shadow w-full">
              <div className="p-4 bg-sky-blue-500 text-white-500 rounded-t-lg">
                ชั้นที่ {floor}
              </div>
              <div className="flex gap-6 p-6 overflow-x-auto">
                {rooms.map((room) => (
                  <div key={room.id} className="aspect-square">
                    <div
                      className={`${room.color} w-full h-full rounded-lg flex items-center justify-center`}
                    >
                      <div className="w-24 h-24 bg-white-500/90 rounded-lg flex flex-col items-center justify-center">
                        <div className="text-lg font-semibold">{room.id}</div>
                        <User className="w-12 h-12 mt-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </App>
  );
}
