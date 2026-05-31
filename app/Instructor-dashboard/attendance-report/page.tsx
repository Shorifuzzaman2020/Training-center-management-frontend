
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { BarChart3, Users, Eye, X, Calendar, CheckCircle2, XCircle } from "lucide-react";

export default function AttendanceReportPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [reportData, setReportData] = useState<any>({});
  const [allAttendanceRecords, setAllAttendanceRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [studentDetails, setStudentDetails] = useState<any[]>([]);

  const instructorId = localStorage.getItem("userId");

  useEffect(() => {
    if (!instructorId) return;

    setLoading(true);
    
    
    axios
      .get(`http://localhost:5000/api/v1/instructor/students?instructorId=${instructorId}`)
      .then((res) => {
        setStudents(res.data.data || []);
        
       
        return axios.get(`http://localhost:5000/api/v1/instructor/attendance?instructorId=${instructorId}`);
      })
      .then((res) => {
        const allAttendance = res.data.data || [];
        setAllAttendanceRecords(allAttendance);
        const report: any = {};

        allAttendance.forEach((record: any) => {
          
          const studentId = record.student && typeof record.student === "object" ? record.student._id : record.student;
          
          if (!studentId) return;
          
          if (!report[studentId]) {
            report[studentId] = { present: 0, total: 0 };
          }
          
          report[studentId].total += 1;
          if (record.status === 1) {
            report[studentId].present += 1;
          }
        });

        setReportData(report);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching report data:", err);
        setLoading(false);
      });
  }, [instructorId]);

  
  const handleSeeDetails = (student: any) => {
    setSelectedStudent(student);
    
    
    const filteredHistory = allAttendanceRecords
      .filter((record) => {
        const recordStudentId = record.student && typeof record.student === "object" ? record.student._id : record.student;
        return recordStudentId === student._id;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setStudentDetails(filteredHistory);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8 bg-white shadow-sm rounded-2xl border border-gray-100 relative">
      
      {/* TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-6 mb-6 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Attendance Report</h1>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
              <Users className="w-4 h-4" /> Total Monitored Students: {students.length}
            </p>
          </div>
        </div>
      </div>

      {/* REPORT TABLE */}
      <div className="overflow-hidden border border-gray-100 rounded-xl shadow-sm bg-gray-50/20">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 text-sm font-semibold text-gray-600 tracking-wider">Student Name</th>
              <th className="p-4 text-sm font-semibold text-gray-600 tracking-wider text-center">Present / Total Days</th>
              <th className="p-4 text-sm font-semibold text-gray-600 tracking-wider">Attendance Rate</th>
              <th className="p-4 text-sm font-semibold text-gray-600 tracking-wider text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {students.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-400 text-sm">
                  No students found to generate report.
                </td>
              </tr>
            ) : (
              students.map((s) => {
                const studentStats = reportData[s._id] || { present: 0, total: 0 };
                const presentDays = studentStats.present;
                const totalDays = studentStats.total;
                
                const percentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
                
                let barColor = "bg-rose-500";
                let textColor = "text-rose-700 bg-rose-50";
                if (percentage >= 75) {
                  barColor = "bg-emerald-500";
                  textColor = "text-emerald-700 bg-emerald-50";
                } else if (percentage >= 50) {
                  barColor = "bg-amber-500";
                  textColor = "text-amber-700 bg-amber-50";
                }

                return (
                  <tr key={s._id} className="hover:bg-gray-50/80 transition-colors">
                    {/* Student Name */}
                    <td className="p-4 font-medium text-gray-800 text-sm md:text-base">
                      {s.fullName}
                    </td>

                    {/* Present / Total Count */}
                    <td className="p-4 text-sm font-semibold text-gray-700 text-center">
                      <span className="text-indigo-600 text-base">{presentDays}</span>
                      <span className="text-gray-400 font-normal mx-1">/</span>
                      <span className="text-gray-500">{totalDays}</span>
                    </td>

                    {/* Progress Bar & Percentage */}
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

                    {/* Action Button */}
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleSeeDetails(s)}
                        className="inline-flex items-center space-x-1.5 bg-gray-100 hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 font-medium px-3 py-1.5 rounded-xl text-xs md:text-sm border border-gray-200 hover:border-indigo-100 transition-all cursor-pointer active:scale-95"
                      >
                        <Eye className="w-4 h-4" />
                        <span>See Details</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ================= DETAILS MODAL (POP-UP) ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div>
                <h2 className="text-lg font-bold text-gray-900">{selectedStudent?.fullName}</h2>
                <p className="text-xs text-gray-500 mt-0.5">Full Attendance History</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable History List) */}
            <div className="p-5 overflow-y-auto flex-1 space-y-3 min-h-0">
              {studentDetails.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm">
                  No daily records found for this student.
                </div>
              ) : (
                studentDetails.map((record, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3.5 rounded-xl border border-gray-50 bg-gray-50/30 hover:bg-gray-50/60 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-500">
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

                    {/* Status Badge */}
                    {record.status === 1 ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Present
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-50 text-rose-700 border border-rose-100">
                        <XCircle className="w-3.5 h-3.5" /> Absent
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-800 hover:bg-gray-900 text-white font-medium px-4 py-2 rounded-xl text-sm transition-all cursor-pointer shadow-sm"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}