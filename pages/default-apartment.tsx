import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import { useSession } from "next-auth/react";

const API_BASE_URL = process.env.NEXTAUTH_URL || "http://localhost:3001/api";

const DefaultApartment = () => {
  const router = useRouter();
  const [apartmentName, setApartmentName] = useState<string>("");
  const [apartmentAddress, setApartmentAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [businessType, setBusinessType] = useState<string>("");
  const [billDate, setBillDate] = useState<string>("");
  const [paymentDueDate, setPaymentDueDate] = useState<string>("");
  const [error, setError] = useState<string>("");
  // const { isLoaded, userId, getToken } = useAuth();
  const { data: session, status, update } = useSession();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status !== "authenticated" || !session?.accessToken) return;

    const checkApartment = async () => {
      setIsLoading(true);
      try {
        // const token = await getToken();
        const response = await fetch(`${API_BASE_URL}/apartments/check`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.accessToken}`, // Include the token
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to check apartment status");
        }

        const { haveApartments } = await response.json();
        console.log("test", haveApartments);

        if (haveApartments) {
          router.push("/dashboard");
        } else {
          console.log("User does not have an apartment");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkApartment();
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>กำลังโหลด...</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const apartmentData = {
      apartment_name: apartmentName,
      apartment_address: apartmentAddress,
      phone_number: phoneNumber,
      email_address: emailAddress,
      business_type: businessType,
      bill_date: billDate,
      paymentDue_date: paymentDueDate,
    };

    try {
      // Sending POST request to backend
      //

      // const token = await getToken();
      const ownerRes = await fetch(`${API_BASE_URL}/owners/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`, // Include the token
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      const apartmentRes = await fetch(`${API_BASE_URL}/apartments/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`, // Include the token
          "Content-type": "application/json",
        },
        body: JSON.stringify(apartmentData),
        credentials: "include",
      });

      if (!ownerRes.ok || !apartmentRes.ok) {
        throw new Error("One or more network response were not ok");
      }

      // Here you could add validation if needed
      console.log("Saving form data:");
      // Navigate to /owner after saving
      router.push("/dashboard");
    } catch (error) {
      // Handle error (e.g., invalid input, server error)
      setError("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#01BCB4]">
      {/* <div className="h-1"></div> */}
      <div className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto text-white-500 flex justify-between px-24 items-center">
        <Image
          src="/assets/Logo_white.png"
          alt="Icon"
          width={200}
          height={50}
        />
        <div className="flex-col mt-8">
          <div className="text-2xl">เพิ่มที่พัก</div>
          <MoveRight size={48} className="mx-auto" />
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 bg-[#01BCB4]">
        <div className="bg-white rounded-3xl shadow-lg p-5 mt-4 bg-white-500">
          <div className="space-y-6 mx-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-1">
                ชื่อหอพัก <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="กรอกชื่อหอพัก"
                value={apartmentName}
                onChange={(e) => setApartmentName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ที่อยู่หอพัก <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="กรอกที่อยู่หอพัก"
                value={apartmentAddress}
                onChange={(e) => setApartmentAddress(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                เบอร์โทรติดต่อหอพัก <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  className="flex-1 px-3 py-2 border rounded-md"
                  placeholder="กรอกเบอร์โทร"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {/* <button
                                    type="button"
                                    className="px-4 py-2 bg-[#01BCB4] text-white-500 rounded-lg hover:bg-[#018983] transition-colors"
                                >
                                    + เพิ่มเบอร์โทรศัพท์
                                </button> */}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                อีเมลติดต่อหอพัก
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="กรอกอีเมล"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ประเภทธุรกิจ <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
              >
                <option value="">-- เลือก --</option>
                <option value="personal">บุคคลธรรมดา</option>
                <option value="company">บริษัท</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ทำบิลทุกวันที่
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="กรอกวันที่"
                  value={billDate}
                  onChange={(e) => setBillDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  กำหนดวันสุดท้ายของการชำระเงิน
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="กรอกวันที่"
                  value={paymentDueDate}
                  onChange={(e) => setPaymentDueDate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-evenly gap-8 mt-8">
            <button
              type="button"
              onClick={handleCancel}
              className="w-1/3 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-1/3 px-6 py-3 bg-black-600 text-white-500 rounded-lg hover:bg-gray-600 transition-colors"
            >
              บันทึกข้อมูล
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultApartment;
