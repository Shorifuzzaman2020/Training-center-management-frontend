// // "use client";

// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { toast } from "react-toastify";

// // const statuses = ["present", "late", "absent", "leave", "half"];

// // export default function AttendanceTablePage() {
// //   const [employees, setEmployees] = useState<any[]>([]);
// //   const [attendance, setAttendance] = useState<any>({});
// //   const [date, setDate] = useState("");

// //   /* FETCH EMPLOYEES */

// //   useEffect(() => {
// //     axios
// //       .get("http://localhost:5000/api/v1/employees")
// //       .then((res) => setEmployees(res.data.data));
// //   }, []);

// //   /* HANDLE CHANGE */

// //   const handleChange = (empId: string, value: string) => {
// //     setAttendance({
// //       ...attendance,
// //       [empId]: value,
// //     });
// //   };

// //   /* SUBMIT ALL */

// //   const handleSubmit = async () => {
// //     if (!date) {
// //       toast.error("Select date first");
// //       return;
// //     }

// //     const payload = employees.map((emp) => ({
// //       employee: emp._id,
// //       status: attendance[emp._id] || "present",
// //       date: new Date(date), // FIX
// //     }));

// //     try {
// //       await axios.post(
// //         "http://localhost:5000/api/v1/attendance/bulk-attendance",
// //         payload,
// //       );

// //       toast.success("Attendance saved successfully");
// //     } catch (error: any) {
// //       console.log("FULL ERROR:", error);
// //       console.log("SERVER:", error.response?.data);

// //       toast.error(error?.response?.data?.message || "Failed");
// //     }
// //   };

// //   return (
// //     <div className="max-w-6xl mx-auto p-10">
// //       <h1 className="text-2xl font-bold mb-6">Daily Attendance</h1>

// //       {/* DATE PICKER */}

// //       <input
// //         type="date"
// //         className="border p-2 mb-4"
// //         onChange={(e) => setDate(e.target.value)}
// //       />

// //       {/* TABLE */}

// //       <table className="w-full border text-center">
// //         <thead className="bg-gray-100">
// //           <tr>
// //             <th className="p-2 border">Employee</th>
// //             <th className="p-2 border">Attendance</th>
// //           </tr>
// //         </thead>

// //         <tbody>
// //           {employees.map((emp) => (
// //             <tr key={emp._id}>
// //               <td className="border p-2">{emp.fullName}</td>

// //               <td className="border p-2">
// //                 <select
// //                   value={attendance[emp._id] || "present"}
// //                   onChange={(e) => handleChange(emp._id, e.target.value)}
// //                   className="border p-1"
// //                 >
// //                   {statuses.map((s) => (
// //                     <option key={s} value={s}>
// //                       {s}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       {/* SUBMIT BUTTON */}

// //       <button
// //         onClick={handleSubmit}
// //         className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded"
// //       >
// //         Submit Full Attendance
// //       </button>
// //     </div>
// //   );
// // }

// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function AttendanceTablePage() {
//   const [employees, setEmployees] = useState<any[]>([]);
//   const [attendance, setAttendance] = useState<{ [key: string]: 0 | 1 }>({});
//   const [date, setDate] = useState("");

//   /* ================= FETCH EMPLOYEES ================= */

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/v1/employees")
//       .then((res) => setEmployees(res.data.data))
//       .catch(() => toast.error("Failed to load employees"));
//   }, []);

//   /* ================= HANDLE CHANGE ================= */

//   const handleChange = (empId: string, value: number) => {
//     setAttendance((prev) => ({
//       ...prev,
//       [empId]: value as 0 | 1,
//     }));
//   };

//   /* ================= SUBMIT ALL ================= */

//   const handleSubmit = async () => {
//     if (!date) {
//       toast.error("Select date first");
//       return;
//     }

//     const payload = employees.map((emp) => ({
//       employee: emp._id,
//       status: attendance[emp._id] ?? 1, // default present
//       date: new Date(date),
//     }));

//     try {
//       await axios.post(
//         "http://localhost:5000/api/v1/attendance/bulk-attendance",
//         payload,
//       );

//       toast.success("Attendance saved successfully");

//       // optional reset
//       setAttendance({});
//     } catch (error: any) {
//       console.log("FULL ERROR:", error);
//       console.log("SERVER:", error.response?.data);

//       toast.error(error?.response?.data?.message || "Failed");
//     }
//   };

//   /* ================= UI ================= */

//   return (
//     <div className="max-w-6xl mx-auto p-10">
//       <h1 className="text-2xl font-bold mb-6">Daily Attendance</h1>

//       {/* DATE PICKER */}

//       <input
//         type="date"
//         className="border p-2 mb-4"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//       />

//       {/* TABLE */}

//       <table className="w-full border text-center">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-2 border">Employee</th>
//             <th className="p-2 border">Attendance</th>
//           </tr>
//         </thead>

//         <tbody>
//           {employees.map((emp) => (
//             <tr key={emp._id}>
//               <td className="border p-2 font-medium">{emp.fullName}</td>

//               <td className="border p-2">
//                 <select
//                   value={attendance[emp._id] ?? 1}
//                   onChange={(e) =>
//                     handleChange(emp._id, Number(e.target.value))
//                   }
//                   className="border p-2 rounded"
//                 >
//                   <option value={1}>Present</option>
//                   <option value={0}>Absent</option>
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* SUBMIT BUTTON */}

//       <button
//         onClick={handleSubmit}
//         className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded"
//       >
//         Submit Full Attendance
//       </button>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Calendar, UserCheck, Save, Users } from "lucide-react";

export default function AttendanceTablePage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<{ [key: string]: 0 | 1 }>({});
  const [date, setDate] = useState("");

  /* ================= FETCH EMPLOYEES ================= */
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/employees")
      .then((res) => setEmployees(res.data.data))
      .catch(() => toast.error("Failed to load employees"));
  }, []);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (empId: string, value: number) => {
    setAttendance((prev) => ({
      ...prev,
      [empId]: value as 0 | 1,
    }));
  };

  /* ================= SUBMIT ALL ================= */
  const handleSubmit = async () => {
    if (!date) {
      toast.error("Select date first");
      return;
    }

    const payload = employees.map((emp) => ({
      employee: emp._id,
      status: attendance[emp._id] ?? 1, // default present
      date: new Date(date),
    }));

    try {
      await axios.post(
        "http://localhost:5000/api/v1/attendance/bulk-attendance",
        payload,
      );

      toast.success("Attendance saved successfully");

      // optional reset
      setAttendance({});
    } catch (error: any) {
      console.log("FULL ERROR:", error);
      console.log("SERVER:", error.response?.data);

      toast.error(error?.response?.data?.message || "Failed");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="max-w-5xl mx-auto p-6 md:p-8 bg-white shadow-sm rounded-2xl border border-gray-100">
      
      {/* TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-6 mb-6 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Daily Employee Attendance</h1>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
              <Users className="w-4 h-4" /> Total Employees: {employees.length}
            </p>
          </div>
        </div>

        {/* DATE PICKER */}
        <div className="relative flex items-center">
          <Calendar className="w-5 h-5 text-gray-400 absolute left-3 pointer-events-none" />
          <input
            type="date"
            value={date}
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
              <th className="p-4 text-sm font-semibold text-gray-600 tracking-wider">Employee Name</th>
              <th className="p-4 text-sm font-semibold text-gray-600 tracking-wider text-right sm:text-left">Attendance Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {employees.length === 0 ? (
              <tr>
                <td colSpan={2} className="p-8 text-center text-gray-400 text-sm">
                  No employees found.
                </td>
              </tr>
            ) : (
              employees.map((emp) => {
                const currentStatus = attendance[emp._id] ?? 1; // Default present (1)
                
                return (
                  <tr key={emp._id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4 font-medium text-gray-800 text-sm md:text-base">
                      {emp.fullName}
                    </td>

                    <td className="p-4 text-right sm:text-left">
                      {/* DYNAMIC BACKGROUND COLOR FOR DROPDOWN ACCORDING TO STATUS */}
                      <div className="inline-block relative">
                        <select
                          value={currentStatus}
                          onChange={(e) =>
                            handleChange(emp._id, Number(e.target.value))
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
          onClick={handleSubmit}
          className="flex items-center space-x-2 bg-indigo-600 text-white font-medium px-6 py-3 rounded-xl shadow-md hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Submit Full Attendance</span>
        </button>
      </div>

    </div>
  );
}