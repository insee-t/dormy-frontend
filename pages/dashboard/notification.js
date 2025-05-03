"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, RotateCcw } from 'lucide-react';
import { HeroUIProvider } from "@heroui/react";
import App from "../../components/Sidebar/App";
import ReportList from "../../components/Notification/ReportList";

export default function MeterDashboard() {
    const [reports, setReports] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState(""); // Track selected filter for typeOfReport

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const response = await axios.get("http://localhost:3002/reports", {
                withCredentials: true,
            });
            setReports(response.data);
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
    };

    const updateReportStatus = async (id, status) => {
        try {
            console.log("Sending status update:", { status }); // Log the status being sent
            const response = await axios.put(`http://localhost:3002/report/${id}`, { status }, {
                withCredentials: true 
            });
            console.log("Report status updated:", response.data);
            fetchReports(); // Refresh the list after updating
        } catch (error) {
            console.error("Error updating report status:", error.response?.data || error);
        }
    };

    // Filter reports based on the selected filter type
    const filteredReports = selectedFilter
        ? reports.filter(report =>
            report.typeOfReport.toLowerCase().includes(selectedFilter.toLowerCase())
          )
        : reports;

    return (
        <HeroUIProvider>
            <App title="สรุปการแจ้ง">
                <div className="max-w-6xl mx-auto p-6 bg-white-500 rounded-md">
                    <h1 className="text-2xl font-bold text-center mb-6">การแจ้ง</h1>

                    {/* Search & Filters Section */}
                    <div className="bg-white rounded-lg shadow p-4 mb-2">
                        <div className="flex gap-4 mb-6">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="ค้นหาตามประเภทการแจ้ง"
                                    className="w-full p-2 border rounded-lg pl-10"
                                />
                                <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                            </div>
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex gap-3 mb-2 text-white-500">
                            {[
                                { text: "ทั้งหมด", value: "" },
                                { text: "แจ้งซ่อม", value: "repair" },
                                { text: "แจ้งทำความสะอาด", value: "cleaning" },
                                { text: "แจ้งย้ายออก", value: "moving-out" },
                                { text: "แจ้งฉุกเฉิน", value: "emergency" },
                                { text: "แจ้งอื่นๆ", value: "other" },
                            ].map(({ text, value }, index) => (
                                <button
                                    key={index}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${selectedFilter === value ? "bg-[#01a29c] text-white" : "bg-custom-what text-white"} hover:bg-blue-500`}
                                    onClick={() => setSelectedFilter(value)} // Set filter or reset if 'ทั้งหมด'
                                >
                                    {text}
                                </button>
                            ))}
                        </div>

                        <div>
                            <label className="flex items-center gap-2 px-2 mt-6 py-2 text-white rounded-lg font-bold">กรอง</label>
                        </div>

                        {/* Additional Filters */}
                        <div className="flex gap-3 mb-2 my-2">
                            <div className="flex w-full gap-3">
                                {["กรองตามห้อง", "กรองตามสถานะ", "กรองตามวันที่แจ้ง", "กรองตามวันที่นัดหมาย", "กรองตามผู้ดำเนินการ"].map((text, index) => (
                                    <button key={index} className="flex items-center gap-2 bg-custom-what text-white-500 px-4 py-2 rounded-lg hover:bg-blue-500">
                                        {text}
                                    </button>
                                ))}
                            </div>
                            <div className="justify-end gap-6">
                                <button className="flex items-center bg-red-500 text-white-500 px-4 py-2 rounded-lg hover:bg-red-600">
                                    <RotateCcw className="h-4 w-4 mr-2" />
                                    รีเซ็ต
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Reports List */}
                    <div className="bg-white rounded-lg shadow p-4 mt-6">
                        <div className="flex justify-between">
                            <h2 className="text-xl font-bold mb-4">รายการแจ้ง</h2>
                            <button
                                className="flex items-center gap-2 bg-green-500 text-white-500 px-4 py-2 rounded-lg hover:bg-green-600"
                                onClick={() => updateReportStatus(report.id, 1)}
                            >
                                ดาวน์โหลด excel
                            </button>
                        </div>
                        {/* Display filtered reports */}
                        <ReportList reports={[...filteredReports].reverse()} updateReportStatus={updateReportStatus} />
                    </div>
                </div>
            </App>
        </HeroUIProvider>
    );
}
