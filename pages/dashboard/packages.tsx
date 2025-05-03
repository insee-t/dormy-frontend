import React, { useState, useEffect } from "react";
import { Button, Input } from "@heroui/react";
import { HeroUIProvider } from "@heroui/react";
import { SearchIcon, Plus, Package } from "lucide-react";
import App from "../../components/Sidebar/App";
import axios from "axios";

// Modal Component for Adding Package
function AddPackageModal({ isOpen, onClose, onPackageAdded }) {
  const [roomNumber, setRoomNumber] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [trackingCode, setTrackingCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Data to send to the backend
    const packageData = {
      room_number: roomNumber,
      owner_name: ownerName,
      tracking_code: trackingCode,
    };

    try {
      // Sending POST request to backend
      const response = await axios.post("http://localhost:3002/api/packages", packageData, {
        withCredentials: true,
      });

      // Assuming success, close modal and notify parent component
      onPackageAdded(response.data);
      onClose();
    } catch (err) {
      // Handle error (e.g., invalid input, server error)
      setError("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white-500 p-6 rounded-md shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">เพิ่มพัสดุใหม่</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="room_number" className="block text-sm font-medium text-gray-700">
              เลขห้อง
            </label>
            <Input
              id="room_number"
              name="room_number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              placeholder="เลขห้อง"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="owner_name" className="block text-sm font-medium text-gray-700">
              ชื่อเจ้าของพัสดุ
            </label>
            <Input
              id="owner_name"
              name="owner_name"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              placeholder="ชื่อเจ้าของ"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tracking_code" className="block text-sm font-medium text-gray-700">
              รหัสพัสดุ
            </label>
            <Input
              id="tracking_code"
              name="tracking_code"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder="รหัสพัสดุ"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-between">
            <Button variant="flat" onClick={onClose} disabled={isSubmitting}>
              ปิด
            </Button>
            <Button
              variant="flat"
              className="bg-green-500 text-white"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "กำลังบันทึก..." : "บันทึก"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function RoomLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packages, setPackages] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handlePackageAdded = (newPackage) => {
    setPackages((prevPackages) => [newPackage, ...prevPackages]); // Add the new package at the beginning
  };

  // Fetch existing packages from the backend when the component loads
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/packages", {
          withCredentials:true,
        });
        setPackages(response.data.reverse());  // Reversing the array after fetching
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <HeroUIProvider>
      <App title="พัสดุ">
        <div className="max-w-6xl mx-auto p-6 bg-white-500 rounded-md">
          <h1 className="text-2xl font-bold text-center mb-6">พัสดุ</h1>
          <div className="content-center">
            <div className="flex-auto w-full h-auto shadow-md p-3 rounded-md mb-2">
              <div className="flex mb-4 gap-2">
                {/* <Button variant="flat">พัสดุค้างนำจ่าย (0)</Button> */}
                <Button variant="flat">พัสดุค้างนำจ่าย</Button>
                <Button variant="flat">พัสดุนำจ่ายแล้ว</Button>
                <Button variant="flat">ทั้งหมด</Button>
              </div>

              <div className="sm:inline flex gap-4 mb-6">
                <span>ค้นหาพัสดุ</span>
                <div className="flex mt-3 gap-4">
                  <Input
                    className="flex-1"
                    placeholder="ค้นหา เลขห้อง/ชื่อพัสดุ/รหัสพัสดุ"
                    startContent={<SearchIcon className="text-gray-400" />}
                  />
                  <div className="inline">
                    <Button variant="flat" className="bg-green-500 text-white-500" onClick={openModal}>
                      <Plus />
                      เพิ่มพัสดุ
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Display list of packages */}
            {packages.map((pkg, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg p-4 shadow-md">
                <div className="flex gap-12 mx-8">
                  <Package size={75} />
                  <div className="flex items-center">
                    <div>
                      <div className="text-lg font-bold">{pkg.room_number}</div>
                      <div>{pkg.owner_name}</div>
                      <div>รหัสพัสดุ : {pkg.tracking_code}</div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  {/* Conditional rendering based on delivery_status */}
                  {pkg.delivery_status === "done" ? (
                    <div className="bg-lime-200 text-black px-3 py-1 rounded-md text-sm text-center">
                      นำจ่ายแล้ว
                    </div>
                  ) : (
                    <div className="bg-yellow-200 text-black px-3 py-1 rounded-md text-sm text-center">
                      รอดำเนินการ
                    </div>
                  )}
                  <div className="mt-2 text-gray-500">dd/mm/yyyy xx:xx</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Adding Package */}
        <AddPackageModal isOpen={isModalOpen} onClose={closeModal} onPackageAdded={handlePackageAdded} />
      </App>
    </HeroUIProvider>
  );
}
