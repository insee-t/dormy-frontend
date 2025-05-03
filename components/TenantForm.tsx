// client/src/components/TenantForm.js
import React, { useState } from 'react';
import { createTenant, insertTenant, linkRoom } from '../pages/api/tenantApi';

const TenantForm = ({ apartmentId }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    room: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await createTenant(formData);
      const insertRes = await insertTenant(newUser, formData, apartmentId);
      const { tenantId } = await insertRes.json();
      const linkRes = await linkRoom(formData, tenantId);
      
      if (!linkRes.ok) {
        throw new Error('Failed to link tenant to room');
      }

      console.log('Tenant created and linked successfully');
      alert('Tenant created and linked successfully!');

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        room: '',
      });
    } catch (error) {
      console.error('Error creating tenant:', error);
      alert('Failed to create tenant. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">เพิ่มผู้เช่า</h2>
      <div className="space-y-4">
        <label className="block">
          <span className="text-gray-700">ชื่อ</span>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">นามสกุล</span>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">อีเมล</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">ห้อง</span>
          <input
            type="text"
            name="room"
            value={formData.room}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        {/* วันย้ายเข้า */}
        {/* เบอร์ */}
        {/* สัญญาเริ่ม */}
        {/* ระยะเวลาสัญญา */}
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
      >
        Save Tenant
      </button>
    </form>
  )
}
export default TenantForm;
