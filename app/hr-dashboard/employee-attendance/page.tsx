// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const statuses = ["present", "late", "absent", "leave", "half"];

// export default function AttendanceTablePage() {
//   const [employees, setEmployees] = useState<any[]>([]);
//   const [attendance, setAttendance] = useState<any>({});
//   const [date, setDate] = useState("");

//   /* FETCH EMPLOYEES */

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/v1/employees")
//       .then((res) => setEmployees(res.data.data));
//   }, []);

//   /* HANDLE CHANGE */

//   const handleChange = (empId: string, value: string) => {
//     setAttendance({
//       ...attendance,
//       [empId]: value,
//     });
//   };

//   /* SUBMIT ALL */

//   const handleSubmit = async () => {
//     if (!date) {
//       toast.error("Select date first");
//       return;
//     }

//     const payload = employees.map((emp) => ({
//       employee: emp._id,
//       status: attendance[emp._id] || "present",
//       date: new Date(date), // FIX
//     }));

//     try {
//       await axios.post(
//         "http://localhost:5000/api/v1/attendance/bulk-attendance",
//         payload,
//       );

//       toast.success("Attendance saved successfully");
//     } catch (error: any) {
//       console.log("FULL ERROR:", error);
//       console.log("SERVER:", error.response?.data);

//       toast.error(error?.response?.data?.message || "Failed");
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-10">
//       <h1 className="text-2xl font-bold mb-6">Daily Attendance</h1>

//       {/* DATE PICKER */}

//       <input
//         type="date"
//         className="border p-2 mb-4"
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
//               <td className="border p-2">{emp.fullName}</td>

//               <td className="border p-2">
//                 <select
//                   value={attendance[emp._id] || "present"}
//                   onChange={(e) => handleChange(emp._id, e.target.value)}
//                   className="border p-1"
//                 >
//                   {statuses.map((s) => (
//                     <option key={s} value={s}>
//                       {s}
//                     </option>
//                   ))}
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* SUBMIT BUTTON */}

//       <button
//         onClick={handleSubmit}
//         className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded"
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
    <div className="max-w-6xl mx-auto p-10">
      <h1 className="text-2xl font-bold mb-6">Daily Attendance</h1>

      {/* DATE PICKER */}

      <input
        type="date"
        className="border p-2 mb-4"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* TABLE */}

      <table className="w-full border text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Employee</th>
            <th className="p-2 border">Attendance</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td className="border p-2 font-medium">{emp.fullName}</td>

              <td className="border p-2">
                <select
                  value={attendance[emp._id] ?? 1}
                  onChange={(e) =>
                    handleChange(emp._id, Number(e.target.value))
                  }
                  className="border p-2 rounded"
                >
                  <option value={1}>Present</option>
                  <option value={0}>Absent</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* SUBMIT BUTTON */}

      <button
        onClick={handleSubmit}
        className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded"
      >
        Submit Full Attendance
      </button>
    </div>
  );
}
