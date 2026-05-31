

"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { BarChart3, Users, Eye, X, Calendar, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";

export default function EmployeeAttendanceReportPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [monthlyRecords, setMonthlyRecords] = useState<any[]>([]);
  const [reportData, setReportData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null); 

  
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // Modal 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [employeeDetails, setEmployeeDetails] = useState<any[]>([]);

  const monthsList = [
    { value: 1, name: "January" },
    { value: 2, name: "February" },
    { value: 3, name: "March" },
    { value: 4, name: "April" },
    { value: 5, name: "May" },
    { value: 6, name: "June" },
    { value: 7, name: "July" },
    { value: 8, name: "August" },
    { value: 9, name: "September" },
    { value: 10, name: "October" },
    { value: 11, name: "November" },
    { value: 12, name: "December" },
  ];

  const yearsList = [2025, 2026, 2027, 2028];

  /* ================= FETCH MONTHLY REPORT ================= */
  const fetchMonthlyReport = async (showSilent = false) => {
    if (!showSilent) setLoading(true);
    try {
      const empRes = await axios.get("http://localhost:5000/api/v1/employees");
      const employeesList = empRes.data.data || [];
      setEmployees(employeesList);

      const attendanceRes = await axios.get(
        `http://localhost:5000/api/v1/attendance/monthly?month=${selectedMonth}&year=${selectedYear}`
      );
      
      const monthlyAttendance = attendanceRes.data.data || [];
      setMonthlyRecords(monthlyAttendance);

    
      if (isModalOpen && selectedEmployee) {
        const updatedHistory = monthlyAttendance
          .filter((record: any) => {
            const recordEmpId = record.employee && typeof record.employee === "object" ? record.employee._id : record.employee;
            return recordEmpId === selectedEmployee._id;
          })
          .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setEmployeeDetails(updatedHistory);
      }

      const report: any = {};
      monthlyAttendance.forEach((record: any) => {
        const empId = record.employee && typeof record.employee === "object" ? record.employee._id : record.employee;
        
        if (!empId) return;

        if (!report[empId]) {
          report[empId] = { present: 0, total: 0 };
        }

        report[empId].total += 1;
        if (record.status === 1 || record.status === "present") {
          report[empId].present += 1;
        }
      });

      setReportData(report);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching monthly report:", err);
      toast.error("Failed to load monthly attendance report");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthlyReport();
  }, [selectedMonth, selectedYear]);

  // See Details (Modal)
  const handleSeeDetails = (employee: any) => {
    setSelectedEmployee(employee);
    
    const filteredHistory = monthlyRecords
      .filter((record) => {
        const recordEmpId = record.employee && typeof record.employee === "object" ? record.employee._id : record.employee;
        return recordEmpId === employee._id;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setEmployeeDetails(filteredHistory);
    setIsModalOpen(true);
  };

  /* ================= IN-MODAL STATUS UPDATE FUNCTION ================= */
  const handleStatusUpdate = async (record: any, newStatus: number) => {
    const uniqueRowId = record._id || record.date;
    setUpdatingId(uniqueRowId);

    const empId = record.employee && typeof record.employee === "object" ? record.employee._id : record.employee;

   
    const payload = [
      {
        employee: empId,
        status: newStatus,
        date: record.date, 
      }
    ];

    try {
      await axios.post("http://localhost:5000/api/v1/attendance/bulk-attendance", payload);
      toast.success("Attendance status updated successfully");
      
      
      await fetchMonthlyReport(true);
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update attendance status");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8 bg-white shadow-sm rounded-2xl border border-gray-100 relative">
      
      {/* TOP HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between border-b border-gray-100 pb-6 mb-6 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Monthly Attendance Report</h1>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
              <Users className="w-4 h-4" /> Total Employees: {employees.length}
            </p>
          </div>
        </div>

        {/* MONTH & YEAR FILTER DROPDOWNS */}
        <div className="flex flex-wrap items-center gap-3 bg-gray-50 p-2.5 rounded-xl border border-gray-100 self-start lg:self-center">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="bg-white border border-gray-200 px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            {monthsList.map((m) => (
              <option key={m.value} value={m.value}>{m.name}</option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="bg-white border border-gray-200 px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            {yearsList.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {/* LOADING SPINNER */}
      {loading ? (
        <div className="min-h-[300px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
        </div>
      ) : (
        /* REPORT TABLE */
        <div className="overflow-hidden border border-gray-100 rounded-xl shadow-sm bg-gray-50/20 animate-fadeIn">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-sm font-semibold text-gray-600 tracking-wider">Employee Name</th>
                <th className="p-4 text-sm font-semibold text-gray-600 tracking-wider text-center">Duty Days (This Month)</th>
                <th className="p-4 text-sm font-semibold text-gray-600 tracking-wider">Attendance Rate</th>
                <th className="p-4 text-sm font-semibold text-gray-600 tracking-wider text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white">
              {employees.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-400 text-sm">
                    No employees found to generate report.
                  </td>
                </tr>
              ) : (
                employees.map((emp) => {
                  const empStats = reportData[emp._id] || { present: 0, total: 0 };
                  const presentDays = empStats.present;
                  const totalDays = empStats.total;
                  
                  const percentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
                  
                  let barColor = "bg-rose-500";
                  let textColor = "text-rose-700 bg-rose-50";
                  if (percentage >= 85) {
                    barColor = "bg-emerald-500";
                    textColor = "text-emerald-700 bg-emerald-50";
                  } else if (percentage >= 70) {
                    barColor = "bg-amber-500";
                    textColor = "text-amber-700 bg-amber-50";
                  }

                  return (
                    <tr key={emp._id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4 font-medium text-gray-800 text-sm md:text-base">
                        {emp.fullName}
                      </td>

                      <td className="p-4 text-sm font-semibold text-gray-700 text-center">
                        <span className="text-indigo-600 text-base">{presentDays} Days Present</span>
                        <span className="text-gray-400 font-normal mx-1.5">out of</span>
                        <span className="text-gray-500 font-medium">{totalDays} Entries</span>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-full max-w-[160px] bg-gray-100 rounded-full h-2.5 overflow-hidden">
                            <div 
                              className={`h-2.5 rounded-full transition-all duration-500 ${barColor}`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold min-w-[55px] justify-center ${textColor}`}>
                            {percentage}%
                          </span>
                        </div>
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleSeeDetails(emp)}
                          className="inline-flex items-center space-x-1.5 bg-gray-100 hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 font-medium px-4 py-2 rounded-xl text-xs md:text-sm border border-gray-200 hover:border-indigo-100 transition-all cursor-pointer active:scale-95 shadow-sm"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Monthly Sheet</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= DETAILS MODAL WITH EDITABLE DROPDOWN ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div>
                <h2 className="text-lg font-bold text-gray-900">{selectedEmployee?.fullName}</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Editable Sheet for {monthsList.find(m => m.value === selectedMonth)?.name}, {selectedYear}
                </p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto flex-1 space-y-3 min-h-0">
              {employeeDetails.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm">
                  No attendance records found for this month.
                </div>
              ) : (
                employeeDetails.map((record, index) => {
                  const currentStatus = record.status;
                  const rowId = record._id || record.date;
                  const isRowUpdating = updatingId === rowId;

                  return (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 py-2.5 rounded-xl border border-gray-100 bg-gray-50/30 hover:bg-gray-50/60 transition-colors"
                    >
                      {/* Date Block */}
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                          {new Date(record.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      {/* Interactive Actions Dropdown */}
                      <div className="flex items-center space-x-2">
                        {isRowUpdating ? (
                          <div className="flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Saving...</span>
                          </div>
                        ) : (
                          <div className="relative inline-block">
                            <select
                              value={currentStatus}
                              disabled={loading}
                              onChange={(e) => handleStatusUpdate(record, Number(e.target.value))}
                              className={`appearance-none pl-3 pr-8 py-1.5 rounded-lg text-xs font-bold border shadow-sm cursor-pointer outline-none focus:ring-2 focus:ring-offset-1 transition-all
                                ${
                                  currentStatus === 1
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 focus:ring-emerald-500"
                                    : "bg-rose-50 text-rose-700 border-rose-200 focus:ring-rose-500"
                                }`}
                            >
                              <option value={1} className="bg-white text-gray-800">Present</option>
                              <option value={0} className="bg-white text-gray-800">Absent</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                              <svg className="fill-current h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-800 hover:bg-gray-900 text-white font-medium px-5 py-2 rounded-xl text-sm transition-all cursor-pointer shadow-sm"
              >
                Close Sheet
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}