import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import App from "../../components/Sidebar/App";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "../../components/ui/pagination";
import {
  ChevronDown,
  CircleDollarSign,
  Receipt,
  SearchIcon,
} from "lucide-react";
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
import { Button, Input } from "@heroui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = process.env.NEXTAUTH_URL || "http://localhost:3001/api";
//
interface PromptPay {
  promptpay_id: number;
  phone: string;
  name: string;
}

interface Apartment {
  apartment_id: number;
  apartment_name: string;
  apartment_address: string;
  is_default: boolean;
}

interface Room {
  id: number;
  apartment_id: number;
  room_number: string;
  availability_status: string;
  floor_number: number;

  rent_amount: number;
  rent_is_paid: boolean;
  rent_sent: boolean;
  tenants: Tenant[];
}

interface Tenant {
  tenant_id: number;
  // tenant_id: number;
  first_name: string;
  last_name: string;
  apartment_id: number;
  room_number: string;
  // rent_amount: number;
  // rent_is_paid: boolean;
  // rent_sent: boolean;
}

const PAGE_SIZE = 10;

const ApartmentsRooms = () => {
  const [allElectricRate, setAllElectricRate] = useState("");
  // const { isLoaded, userId, getToken } = useAuth();
  const { data: session, status, update } = useSession();
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [rooms, setRooms] = useState<{ [key: number]: Room }>({});
  const [selectedApartmentId, setSelectedApartmentId] = useState<number | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [defaultApartmentId, setDefaultApartmentId] = useState<number | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isSent, setIsSent] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);
  const [rentValue, setRentValue] = useState<number | string>("");
  const [rentChanges, setRentChanges] = useState<{ [key: number]: number }>({});
  const [sendingStatusChanges, setSendingStatusChanges] = useState<{
    [key: number]: boolean;
  }>({});
  const [isSaving, setIsSaving] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [promptpays, setPromptpays] = useState<{ [key: number]: PromptPay }>(
    {},
  );
  const [error, setError] = useState("");
  const [loadingBankAccounts, setLoadingBankAccount] = useState(true);

  const handleRentChange = (roomId: number, value: number) => {
    setRentChanges((prev) => ({
      ...prev,
      [roomId]: value,
    }));
  };

  const handleSendingStatusChange = (roomId: number, value: boolean) => {
    setSendingStatusChanges((prev) => ({
      ...prev,
      [roomId]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const yearAndMonth = `${Number(selectedYear) - 543}-${selectedMonth}`;

      // Prepare rent updates
      const rentUpdates = Object.keys(rentChanges).map((roomId) => ({
        id: Number(roomId),
        rentValue: rentChanges[roomId],
      }));

      // Prepare bills for tenants
      const createBills = Object.keys(sendingStatusChanges).flatMap(
        (roomId) => {
          const room = rooms[roomId]; // Access room directly by ID
          if (!room) return []; // Skip if room not found

          const rentValue =
            (rentChanges[roomId] ?? room.rent_amount) / room.tenants.length;

          return room.tenants.map((tenant) => ({
            tenantId: tenant.tenant_id,
            rentValue,
          }));
        },
      );

      // Send rent updates
      // const token = await getToken();
      const roomRes = await fetch(`${API_BASE_URL}/rooms/bulk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`, // Include the token
        },
        body: JSON.stringify({ updates: rentUpdates }),
        credentials: "include",
      });
      if (!roomRes.ok) {
        throw new Error(
          `Change rooms rent failed with status ${roomRes.status}`,
        );
      }
      await roomRes.json(); // Parse response if needed

      // Send bills
      const billRes = await fetch(`${API_BASE_URL}/bills/bulk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`, // Include the token
        },
        body: JSON.stringify({
          bills: createBills,
          apartmentId: selectedApartmentId,
          billPeriod: yearAndMonth,
        }),
        credentials: "include",
      });
      if (!billRes.ok) {
        throw new Error(`Send bills failed with status ${billRes.status}`);
      }
      await billRes.json(); // Parse response if needed

      toast.success("บันทึกสำเร็จ");
      setRentChanges({});
      setSendingStatusChanges({});
    } catch (error) {
      console.error("Save error:", error);
      toast.error(`เกิดข้อผิดพลาดในการบันทึก: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRentChangeSelected = (rentValue: number) => {
    // Update rentChanges for selected rooms
    try {
      const updates = selectedRooms.reduce(
        (acc, roomId) => {
          acc[roomId] = rentValue;
          return acc;
        },
        {} as { [key: number]: number },
      );

      setRentChanges((prev) => ({ ...prev, ...updates }));
    } catch (error) {
      console.error("Error updating rent:", error);
    }
  };

  const currentDate = new Date();

  // Get current month (zero-indexed, so add 1)
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0"); // e.g., '01' for January

  // Get current year in Thai format (Gregorian year + 543)
  const currentYear = String(currentDate.getFullYear() + 543); // e.g., '2567'

  // Dynamically generate months
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2023, i, 1); // Use any year (e.g., 2023)
    return {
      value: String(i + 1).padStart(2, "0"), // Ensure two digits (e.g., '01')
      label: new Intl.DateTimeFormat("th-TH", { month: "long" }).format(date), // Thai month names
    };
  });

  // Dynamically generate years (e.g., last 10 years to current year)
  const years = Array.from({ length: 11 }, (_, i) => {
    const year = currentDate.getFullYear() + 543 - 10 + i; // Generate years from 10 years ago to current year.
    return {
      value: String(year),
      label: String(year),
    };
  });

  // State for selected month and year (default to current month and year)
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // Handle month and year change
  const handleDateChange = (type, value) => {
    if (type === "month") {
      setSelectedMonth(value);
    } else {
      setSelectedYear(value);
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm(
      "คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการเปลี่ยนแปลง?",
    );
    if (confirmCancel) {
      setRentChanges([]);
      setSendingStatusChanges([]);
      toast.success("ยกเลิกการเปลี่ยนแปลงเรียบร้อย");
    }
  };

  const handleSendingStatusSelected = (sendingStatus: boolean) => {
    try {
      const updates = selectedRooms.reduce(
        (acc, roomId) => {
          const room = rooms[roomId]; // Access room directly by ID
          if (room && !room.rent_sent) {
            acc[roomId] = sendingStatus;
          }
          return acc;
        },
        {} as { [key: number]: boolean },
      );

      setSendingStatusChanges((prev) => ({ ...prev, ...updates }));
    } catch (error) {
      console.error("Error updating sending status:", error);
    }
  };

  const extractFloorNumber = (roomNumber) => {
    const match = roomNumber.match(/\d+/);
    return match ? parseInt(match[0].charAt(0)) : 0;
  };

  const groupByFloor = (rooms) => {
    return rooms.reduce((acc, room) => {
      const floor = extractFloorNumber(room.roomNumber);
      const floorData = acc.find((f) => f.floor === floor) || {
        floor,
        rooms: [],
      };
      floorData.rooms.push(room);
      return [...acc.filter((f) => f.floor !== floor), floorData];
    }, []);
  };

  const sortRoomsByNumber = (rooms: Room[]) => {
    return rooms.sort((a, b) => {
      // Assuming room_number is a string, convert to integer for numeric sorting
      return parseInt(a.room_number, 10) - parseInt(b.room_number, 10);
    });
  };

  useEffect(() => {
    const fetchBanks = async () => {
      true;
      try {
        // const token = await getToken();
        const promptpaysRes = await fetch(`${API_BASE_URL}/banks`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`, // Include the token
          },
          credentials: "include",
        });
        const promptpaysData = await promptpaysRes.json();
        const promptpaysMap = promptpaysData.reduce(
          (acc, promptpay) => {
            acc[promptpay.id] = promptpay;
            return acc;
          },
          {} as { [key: number]: PromptPay },
        );

        setPromptpays(promptpaysMap); // Set rooms as a map
        const promptpaysArray = Object.values(promptpaysMap);
      } catch (error) {
        setError("ไม่สามารถโหลดข้อมูลที่พัก");
      } finally {
        setLoadingBankAccount(false);
      }
    };

    if (status === "authenticated") {
      fetchBanks();
      fetchData();
    }

    const handleBeforeUnload = (e) => {
      if (
        Object.keys(rentChanges).length > 0 ||
        Object.keys(sendingStatusChanges).length > 0
      ) {
        e.preventDefault();
        e.returnValue =
          "คุณมีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก ต้องการออกจากหน้านี้หรือไม่?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [status, rentChanges, sendingStatusChanges, session]);

  const fetchData = async () => {
    try {
      // const token = await getToken();
      const [apartmentsRes, roomsRes, defaultRes] = await Promise.all([
        fetch(`${API_BASE_URL}/apartments/my-apartments`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`, // Include the token
          },
          credentials: "include",
        }),
        fetch(`${API_BASE_URL}/rooms/get-rooms-with-tenants`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`, // Include the token
          },
          credentials: "include",
        }),
        fetch(`${API_BASE_URL}/apartments/default-apartment`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`, // Include the token
          },
          credentials: "include",
        }),
      ]);

      if (!apartmentsRes.ok || !roomsRes.ok || !defaultRes.ok) {
        throw new Error("One or more network responses were not ok");
      }

      const apartmentsData = await apartmentsRes.json();
      const roomsData = await roomsRes.json();
      const defaultData = await defaultRes.json();

      // Convert rooms array to a map
      const roomsMap = roomsData.reduce(
        (acc, room) => {
          acc[room.id] = room;
          return acc;
        },
        {} as { [key: number]: Room },
      );

      setApartments(apartmentsData);
      setRooms(roomsMap); // Set rooms as a map
      setDefaultApartmentId(defaultData.default_apartment_id);

      if (apartmentsData.length > 0) {
        setSelectedApartmentId(
          defaultData.default_apartment_id || apartmentsData[0].apartment_id,
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetDefault = async () => {
    if (!selectedApartmentId) return;
    try {
      await axios.post(
        `${API_BASE_URL}/api/set-default-apartment`,
        {
          apartment_id: selectedApartmentId,
        },
        { withCredentials: true },
      );

      setDefaultApartmentId(selectedApartmentId);
      alert("Default apartment set successfully!");
    } catch (error) {
      console.error("Error setting default apartment:", error);
      alert("Failed to set default apartment");
    }
  };

  if (loading)
    return (
      <App title="บิลค่าเช่า">
        <div className="flex justify-center">กำลังโหลด...</div>
      </App>
    );
  if (apartments.length === 0)
    return (
      <App title="บิลค่าเช่า">
        <div className="flex justify-center">ไม่เจอที่พัก</div>
      </App>
    );

  const selectedApartment = apartments.find(
    (a) => a.apartment_id === selectedApartmentId,
  );
  const apartmentRooms = Object.values(rooms).filter(
    (room) => room.apartment_id === selectedApartmentId,
  );
  const sortedRooms = sortRoomsByNumber(apartmentRooms);
  const totalPages = Math.ceil(sortedRooms.length / PAGE_SIZE);
  const paginatedRooms = sortedRooms.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const promptpaysArray = Object.values(promptpays);

  return (
    <App title="บิลค่าเช่า">
      {/* header */}

      {/* main table content */}
      <ToastContainer position="bottom-right" autoClose={3000} />
      {Object.keys(rentChanges).length > 0 ||
      Object.keys(sendingStatusChanges).length > 0 ? (
        <div className="fixed bottom-4 right-4 bg-yellow-100 p-4 rounded-lg shadow-md flex items-center gap-4 z-10">
          <span className="text-yellow-800">
            คุณมีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก
          </span>
          <Button
            onClick={handleSave}
            className="bg-[#01BCB4] text-white-500 hover:bg-[#01afa8]"
          >
            บันทึก
          </Button>
        </div>
      ) : null}
      <div className="rounded-md shadow-md mb-4 p-2 sm:p-4 bg-white-500">
        {/* <div className="flex justify-center items-center text-2xl font-bold mb-4 border-b-2 p-4">
          <Receipt className="text-[#FFAC3E] m-3"> </Receipt>
          <div>บิลค่าเช่าห้อง</div>
        </div> */}

        <div className="bg-white-500 container mx-auto p-6 rounded-md">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex gap-4">
              <select
                value={selectedApartmentId || ""}
                onChange={(e) => setSelectedApartmentId(Number(e.target.value))}
                className="p-2 border rounded-lg w-96"
              >
                {apartments.map((apartment) => (
                  <option
                    key={apartment.apartment_id}
                    value={apartment.apartment_id}
                  >
                    {apartment.apartment_name} - {apartment.apartment_address}
                    {/* {selectedApartment.apartment_address} */}
                    {apartment.apartment_id === defaultApartmentId &&
                      " (ค่าเริ่มต้น)"}
                  </option>
                ))}
              </select>
              <Button
                variant="flat"
                onClick={handleSetDefault}
                className="bg-[#01BCB4] text-white-500"
              >
                ตั้งเป็นค่าเริ่มต้น
              </Button>
            </div>
            {/* <select
              value={selectedApartmentId || ''}
              onChange={(e) => setSelectedApartmentId(Number(e.target.value))}
              className="p-2 border rounded-lg w-96"
            >
            <option value="">-- เลือกบัญชีธนาคารสำหรับอพาร์ทเมนท์ --</option>
              {promptpaysArray.map(promptpay => (
                <option key={promptpay.promptpay_id} value={promptpay.promptpay_id}>
                  พร้อมเพย์ - {selectedApartment.}{apartment.apartment_id === defaultApartmentId && ' (ค่าเริ่มต้น)'}
                </option>
              ))}
            </select> */}
          </div>

          <div className="flex items-center gap-4 mt-10 justify-between justify-center">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-center gap-4">
                <div className="relative">
                  <select
                    value={selectedMonth}
                    onChange={(e) => handleDateChange("month", e.target.value)}
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
                    onChange={(e) => handleDateChange("year", e.target.value)}
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
              {/* <div className="flex flex-col justify-between mr-2  md:flex-row "> */}
              {/* <div className="flex flex-row gap-4 mb-6 mr-1 "> */}
              <Input
                className="flex-1 min-w-30"
                placeholder="ค้นหมายเลขห้อง"
                startContent={<SearchIcon className="text-gray-400" />}
              />
              {/* </div> */}
              {/* </div> */}
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <Button
                  onClick={handleSave}
                  disabled={
                    isSaving ||
                    (Object.keys(rentChanges).length === 0 &&
                      Object.keys(sendingStatusChanges).length === 0)
                  }
                  className="bg-[#01BCB4] text-white-500 hover:bg-[#01afa8]"
                >
                  {isSaving ? "กำลังบันทึก..." : "บันทึก"}
                </Button>

                <Button
                  variant="flat"
                  onClick={handleCancel}
                  className="bg-red-500 text-white-500 py-2"
                >
                  ยกเลิก
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => setShowSummary(true)}
                  className="bg-[#01BCB4] text-white-500"
                >
                  ดูการเปลี่ยนแปลงทั้งหมด
                </Button>

                {showSummary && (
                  <div className="fixed inset-0 bg-black-500 bg-opacity-50 flex items-center justify-center z-10">
                    <div className="bg-white-500 p-6 rounded-lg w-96">
                      <h2 className="text-lg font-bold mb-4 text-center">
                        การเปลี่ยนแปลงที่ยังไม่ได้บันทึก
                      </h2>
                      <ul>
                        {Object.keys(rentChanges).map((roomId) => {
                          const room = Object.values(rooms).find(
                            (r) => r.id === Number(roomId),
                          ); // Convert rooms object to an array using Object.values
                          return (
                            <li key={roomId} className="mb-2">
                              ห้อง {room ? room.room_number : roomId}: ค่าเช่า{" "}
                              {rentChanges[roomId]} บาท
                            </li>
                          );
                        })}
                        {Object.keys(sendingStatusChanges).map((roomId) => {
                          const room = Object.values(rooms).find(
                            (r) => r.id === Number(roomId),
                          ); // Fix here
                          return (
                            <li key={roomId} className="mb-2">
                              ห้อง {room ? room.room_number : roomId}:
                              สถานะการส่ง{" "}
                              {sendingStatusChanges[roomId]
                                ? "ส่งแล้ว"
                                : "ยังไม่ส่ง"}
                            </li>
                          );
                        })}
                      </ul>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button
                          onClick={() => setShowSummary(false)}
                          className="bg-gray-500 text-white-500 hover:bg-gray-600"
                        >
                          ปิด
                        </Button>
                        <Button
                          onClick={handleSave}
                          className="bg-[#01BCB4] text-white-500 hover:bg-[#01afa8]"
                        >
                          {isSaving ? "กำลังบันทึก..." : "บันทึก"}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* <br /> */}

          <form>
            <label className="flex items-center space-x-2 mt-4">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5"
                checked={selectedRooms.length === sortedRooms.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRooms(sortedRooms.map((room) => room.id));
                  } else {
                    setSelectedRooms([]);
                  }
                }}
              />
              <span>เลือกผู้เช่าทั้งหมด</span>
            </label>
          </form>

          {selectedApartment && (
            <div className="bg-white rounded-lg p-6">
              <div className="overflow-x-auto">
                <TableContainer component={Paper} sx={{ minWidth: 300 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            width: 125,
                            border: "1px solid rgba(224, 224, 224, 1)",
                          }}
                          style={{ verticalAlign: "top" }}
                        >
                          <label className="flex flex-col items-center space-x-2 gap-2">
                            <span>เลือกทั้งตาราง</span>
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5"
                              checked={
                                selectedRooms.length === paginatedRooms.length
                              }
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedRooms(
                                    paginatedRooms.map((room) => room.id),
                                  );
                                } else {
                                  setSelectedRooms([]);
                                }
                              }}
                            />
                          </label>
                        </TableCell>
                        <TableCell
                          sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                          style={{ verticalAlign: "top" }}
                        >
                          <div className="flex justify-center">ห้อง</div>
                        </TableCell>
                        <TableCell
                          sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                          style={{ verticalAlign: "top" }}
                        >
                          <div className="flex justify-center">ชื่อ</div>
                        </TableCell>
                        <TableCell
                          sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                          style={{ verticalAlign: "top" }}
                        >
                          <div className="flex justify-center">นามสกุล</div>
                        </TableCell>
                        <TableCell
                          style={{ verticalAlign: "top" }}
                          sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                        >
                          <div className="flex flex-col items-center">
                            ค่าเข่า/คน
                          </div>
                        </TableCell>
                        <TableCell
                          sx={{
                            width: 313,
                            border: "1px solid rgba(224, 224, 224, 1)",
                          }}
                          style={{ verticalAlign: "top" }}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <div className="flex flex-row  items-center justify-center">
                              <CircleDollarSign className="text-[#FFAC3E]"></CircleDollarSign>
                              <div className="mx-1 flex">ค่าเช่า/ห้อง</div>
                            </div>
                            <div className="flex flex-row">
                              <Input
                                className="flex-1 max-w-28 min-w-16 mr-2"
                                type="number"
                                placeholder="ค่าเช่า"
                                value={rentValue.toString()} // Fix here
                                onChange={(e) => setRentValue(e.target.value)}
                              />
                              <Button
                                variant="flat"
                                onClick={() => {
                                  if (selectedRooms.length === 0) {
                                    alert("กรุณาเลือกห้องก่อน");
                                    return;
                                  }
                                  handleRentChangeSelected(Number(rentValue));
                                }}
                                className="bg-[#01BCB4] text-white-500 hover:bg-[#01afa8]"
                              >
                                ใช้กับที่เลือก
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell
                          style={{ verticalAlign: "top" }}
                          sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                        >
                          <div className="flex flex-col items-center">
                            สถานะ
                          </div>
                        </TableCell>
                        <TableCell
                          sx={{
                            width: 200,
                            border: "1px solid rgba(224, 224, 224, 1)",
                          }}
                          style={{ verticalAlign: "top" }}
                        >
                          <div className="flex">
                            <div className="flex flex-col items-center gap-2">
                              <h4>ส่งบิล</h4>
                              <Button
                                variant="flat"
                                onClick={() =>
                                  handleSendingStatusSelected(true)
                                }
                                className="w-fit bg-[#01BCB4] text-white-500 hover:bg-[#01afa8]"
                              >
                                ใช้กับที่เลือก
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell
                          sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                          component="th"
                          scope="row"
                        >
                          <div className="flex flex-col items-center gap-2 ">
                            <h4>ดาวน์โหลดบิล</h4>
                            <Button
                              variant="flat"
                              onClick={() => {
                                // Remove the call to updateAllRates
                                console.log("Button clicked");
                              }}
                              className="w-fit bg-custom-is hover:bg-custom-is  text-white-500"
                            >
                              ใช้กับที่เลือก
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedRooms.map((room) => (
                        <TableRow
                          key={room.id}
                          sx={{
                            "&:hover": { backgroundColor: "action.hover" }, // Highlight row on hover
                          }}
                        >
                          <TableCell
                            sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                            component="th"
                            scope="row"
                          >
                            <label className="flex justify-center">
                              <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5"
                                checked={selectedRooms.includes(room.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedRooms((prev) => [
                                      ...prev,
                                      room.id,
                                    ]);
                                  } else {
                                    setSelectedRooms((prev) =>
                                      prev.filter((id) => id !== room.id),
                                    );
                                  }
                                }}
                              />
                            </label>
                          </TableCell>
                          <TableCell
                            sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                            component="th"
                            scope="row"
                          >
                            <div className="flex justify-center">
                              {room.room_number}
                            </div>
                          </TableCell>
                          <TableCell
                            sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                            component="th"
                            scope="row"
                          >
                            <ul className="mt-1 space-y-1">
                              {room.tenants.map((tenant) => (
                                <li key={tenant.tenant_id} className="text-sm">
                                  {tenant.first_name}
                                </li>
                              ))}
                            </ul>
                          </TableCell>
                          <TableCell
                            sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                            component="th"
                            scope="row"
                          >
                            <ul className="mt-1 space-y-1">
                              {room.tenants.map((tenant) => (
                                <li key={tenant.tenant_id} className="text-sm">
                                  {tenant.last_name}
                                </li>
                              ))}
                            </ul>
                          </TableCell>
                          <TableCell
                            sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                            component="th"
                            scope="row"
                          >
                            <ul className="mt-1 space-y-1">
                              {room.tenants.map((tenant) => (
                                <li key={tenant.tenant_id} className="text-sm">
                                  {(
                                    room.rent_amount / room.tenants.length
                                  ).toFixed(2)}
                                </li>
                              ))}
                            </ul>
                          </TableCell>
                          <TableCell
                            sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                            component="th"
                            scope="row"
                          >
                            <div className="flex items-center">
                              <Input
                                className="flex-1 max-w-52 min-w-20 mr-2"
                                type="number"
                                placeholder="ค่าเช่า"
                                value={(
                                  rentChanges[room.id] ?? room.rent_amount
                                ).toString()} // Convert to string
                                onChange={(e) =>
                                  handleRentChange(
                                    room.id,
                                    Number(e.target.value),
                                  )
                                }
                              />
                              {rentChanges[room.id] !== undefined && (
                                <span className="text-sm text-yellow-600">
                                  ยังไม่บันทึก
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell
                            sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                            component="th"
                            scope="row"
                          >
                            <div className="flex justify-center">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full whitespace-nowrap ${room.rent_is_paid ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                              >
                                {room.rent_is_paid ? "จ่ายแล้ว" : "ยังไม่จ่าย"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell
                            sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                            component="th"
                            scope="row"
                          >
                            <div className="flex items-center gap-1">
                              <Button
                                className={`${room.rent_sent ? "bg-green-500" : "bg-custom-what hover:bg-blue-500"} text-white-500`}
                                onClick={() =>
                                  handleSendingStatusChange(room.id, true)
                                }
                              >
                                {room.rent_sent ? "ส่งแล้ว" : "ส่ง"}
                              </Button>
                              {sendingStatusChanges[room.id] !== undefined && (
                                <div className="text-sm text-yellow-600">
                                  ยังไม่บันทึก
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell
                            sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                            component="th"
                            scope="row"
                          >
                            <div className="flex justify-center">
                              <Button className="bg-custom-is hover:bg-custom-is text-white-500 ">
                                ดาวน์โหลด
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Pagination className="mt-2">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage((prev) => Math.max(prev - 1, 1));
                        }}
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(index + 1);
                          }}
                          isActive={currentPage === index + 1} // Apply isActive logic here
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages),
                          );
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          )}
        </div>
      </div>
    </App>
  );
};

export default ApartmentsRooms;
