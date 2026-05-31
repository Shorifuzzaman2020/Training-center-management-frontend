

"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Calendar, UserCheck, Save, Users } from "lucide-react"; 

export default function AttendancePage() {
  const [students, setStudents] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any>({});
  const [date, setDate] = useState("");

  const instructorId = localStorage.getItem("userId");

  /* LOAD STUDENTS */
  useEffect(() => {
    if (!instructorId) return;

    axios
      .get(
        `http://localhost:5000/api/v1/instructor/students?instructorId=${instructorId}`,
      )
      .then((res) => setStudents(res.data.data));
  }, [instructorId]);

  /* LOAD ATTENDANCE */
  useEffect(() => {
    if (!date) return;

    axios
      .get(`http://localhost:5000/api/v1/instructor/attendance?date=${date}`)
      .then((res) => {
        const map: any = {};
        res.data.data.forEach((d: any) => {
          map[d.student] = d.status;
        });
        setAttendance(map);
      });
  }, [date]);

  /* SAVE */
  // const saveAttendance = async () => {
  //   if (!date) return alert("Select date");

  //   const payload = students.map((s) => ({
  //     student: s._id,
  //     status: attendance[s._id] ?? 1,
  //     date,
  //   }));

  //   await axios.post(
  //     "http://localhost:5000/api/v1/instructor/attendance",
  //     payload,
  //   );

  //   alert("Attendance Saved");
  // };

  /* ATTENDANCE ENTRY PAGE */
const saveAttendance = async () => {
  if (!date) return alert("Select date");

  const payload = students.map((s) => ({
    student: s._id,
    status: attendance[s._id] ?? 1,
    date,
    instructor: instructorId, 
  }));

  await axios.post(
    "http://localhost:5000/api/v1/instructor/attendance",
    payload,
  );

  alert("Attendance Saved");
};
  return (
    <div className="max-w-5xl mx-auto p-6 md:p-8 bg-white shadow-sm rounded-2xl border border-gray-100">
      
      {/* TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-6 mb-6 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Student Attendance</h1>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
              <Users className="w-4 h-4" /> Total Students: {students.length}
            </p>
          </div>
        </div>

        {/* DATE PICKER */}
        <div className="relative flex items-center">
          <Calendar className="w-5 h-5 text-gray-400 absolute left-3 pointer-events-none" />
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all cursor-pointer bg-gray-50/50 hover:bg-gray-50"
          />
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <div className="overflow-hidden border border-gray-100 rounded-xl shadow-sm bg-gray-50/20">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 text-sm font-semibold text-gray-600 tracking-wider">Student Name</th>
              <th className="p-4 text-sm font-semibold text-gray-600 tracking-wider text-right sm:text-left">Attendance Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {students.length === 0 ? (
              <tr>
                <td colSpan={2} className="p-8 text-center text-gray-400 text-sm">
                  No students assigned to this instructor.
                </td>
              </tr>
            ) : (
              students.map((s) => {
                const currentStatus = attendance[s._id] ?? 1; // Default present (1)
                
                return (
                  <tr key={s._id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4 font-medium text-gray-800 text-sm md:text-base">
                      {s.fullName}
                    </td>

                    <td className="p-4 text-right sm:text-left">
                      {/* DYNAMIC BACKGROUND COLOR FOR DROPDOWN ACCORDING TO STATUS */}
                      <div className="inline-block relative">
                        <select
                          value={currentStatus}
                          onChange={(e) =>
                            setAttendance({
                              ...attendance,
                              [s._id]: Number(e.target.value),
                            })
                          }
                          className={`appearance-none pl-3 pr-8 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all border shadow-sm cursor-pointer outline-none focus:ring-2 focus:ring-offset-1
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
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex justify-end mt-6">
        <button
          onClick={saveAttendance}
          className="flex items-center space-x-2 bg-indigo-600 text-white font-medium px-6 py-3 rounded-xl shadow-md hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Attendance</span>
        </button>
      </div>

    </div>
  );
}