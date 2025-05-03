import { HeroUIProvider } from "@heroui/react";
import App from "../../components/Sidebar/App";

export default function BillingTable() {
  const data = {
    room: 101,
    month: "สิงหาคม", // August in Thai
    items: [
      { name: "ค่าน้ำ", prev: 7532, current: 7543, units: 11, rate: 25, price: 275 },
      { name: "ค่าไฟ", prev: 5532, current: 5692, units: 160, rate: 8, price: 1280 },
    ],
    rent: 4500,
  };

  const total = data.items.reduce((sum, item) => sum + item.price, data.rent);

  return (
    <HeroUIProvider className="bg-gray-100">
      <App title="สรุปการแจ้ง">
        {/* <div className="max-w-lg mx-auto bg-white-500 p-6 rounded-lg shadow-md"> */}
        <div className="w-full mx-auto bg-white-500 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-sky-800">บิลค่าเช่าห้อง</h2>
          <h3 className="text-center text-lg">ห้องที่ {data.room}</h3>
          <h4 className="text-center text-gray-600">เดือน {data.month}</h4>

          <table className="w-full mt-4 border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-black-600 p-3">รายการ</th>
                <th className="border border-black-600 p-3">เลขเดือนที่แล้ว</th>
                <th className="border border-black-600 p-3">เลขเดือนนี้</th>
                <th className="border border-black-600 p-3">จำนวนหน่วยที่ใช้</th>
                <th className="border border-black-600 p-3">หน่วยละ</th>
                <th className="border border-black-600 p-3">ราคา</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-black-600 p-3">{item.name}</td>
                  <td className="border border-black-600 p-3">{item.prev}</td>
                  <td className="border border-black-600 p-3">{item.current}</td>
                  <td className="border border-black-600 p-3">{item.units}</td>
                  <td className="border border-black-600 p-3">{item.rate}</td>
                  <td className="border border-black-600 p-3">{item.price}</td>
                </tr>
              ))}
              <tr className="text-center">
                <td className="border border-black-600 p-3" colSpan="5">ค่าเช่า</td>
                <td className="border border-black-600 p-3">{data.rent}</td>
              </tr>
              <tr className="bg-gray-200 font-bold text-center">
                <td className="border border-black-600 p-3" colSpan="5">รวม</td>
                <td className="border border-black-600 p-3">{total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </App>
    </HeroUIProvider>
  );
}
