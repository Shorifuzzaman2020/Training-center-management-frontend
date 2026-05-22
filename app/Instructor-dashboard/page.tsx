// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function InstructorDashboard() {
//   const [students, setStudents] = useState<any[]>([]);
//   const [attendance, setAttendance] = useState<any>({});
//   const [marks, setMarks] = useState<any>({});
//   const [date, setDate] = useState("");
//   const [activeTab, setActiveTab] = useState("attendance");

//   /* LOAD STUDENTS */
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/v1/instructor/students")
//       .then((res) => setStudents(res.data.data));
//   }, []);

//   /* LOAD EXISTING ATTENDANCE */
//   useEffect(() => {
//     if (!date) return;

//     axios
//       .get(
//         `http://localhost:5000/api/v1/instructor/attendance-by-date?date=${date}`,
//       )
//       .then((res) => {
//         const data: any = {};
//         res.data.data.forEach((item: any) => {
//           data[item.student._id] = item.status;
//         });
//         setAttendance(data);
//       });
//   }, [date]);

//   /* HANDLERS */
//   const handleAttendance = (id: string, val: number) => {
//     setAttendance({ ...attendance, [id]: val });
//   };

//   const handleMarks = (id: string, val: number) => {
//     setMarks({ ...marks, [id]: val });
//   };

//   /* SUBMIT ATTENDANCE */
//   const submitAttendance = async () => {
//     const payload = students.map((s) => ({
//       student: s._id,
//       status: attendance[s._id] ?? 1,
//       date,
//       instructor: "YOUR_ID",
//     }));

//     await axios.post(
//       "http://localhost:5000/api/v1/instructor/attendance",
//       payload,
//     );

//     alert("Attendance Saved");
//   };

//   /* SUBMIT MARKS */
//   const submitMarks = async () => {
//     const payload = students.map((s) => ({
//       student: s._id,
//       marks: marks[s._id] ?? 0,
//       examType: "final",
//       instructor: "YOUR_ID",
//     }));

//     await axios.post("http://localhost:5000/api/v1/instructor/marks", payload);

//     alert("Marks Saved");
//   };

//   /* CALCULATE */
//   const total = students.length;
//   const present = Object.values(attendance).filter((v) => v === 1).length;
//   const absent = total - present;

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">Instructor Dashboard</h1>

//       {/* CARDS */}
//       <div className="grid grid-cols-3 gap-4 mb-6">
//         <div className="bg-green-500 text-white p-4 rounded">
//           Total Students: {total}
//         </div>
//         <div className="bg-blue-500 text-white p-4 rounded">
//           Present: {present}
//         </div>
//         <div className="bg-red-500 text-white p-4 rounded">
//           Absent: {absent}
//         </div>
//       </div>

//       {/* TABS */}
//       <div className="flex gap-4 mb-4">
//         <button onClick={() => setActiveTab("attendance")}>Attendance</button>
//         <button onClick={() => setActiveTab("marks")}>Marks</button>
//       </div>

//       {/* DATE */}
//       <input
//         type="date"
//         onChange={(e) => setDate(e.target.value)}
//         className="border p-2 mb-4"
//       />

//       {/* TABLE */}
//       <table className="w-full border">
//         <thead>
//           <tr>
//             <th>Name</th>
//             {activeTab === "attendance" && <th>Attendance</th>}
//             {activeTab === "marks" && <th>Marks</th>}
//           </tr>
//         </thead>

//         <tbody>
//           {students.map((s) => (
//             <tr key={s._id}>
//               <td>{s.fullName}</td>

//               {activeTab === "attendance" && (
//                 <td>
//                   <select
//                     value={attendance[s._id] ?? 1}
//                     onChange={(e) =>
//                       handleAttendance(s._id, Number(e.target.value))
//                     }
//                   >
//                     <option value={1}>Present</option>
//                     <option value={0}>Absent</option>
//                   </select>
//                 </td>
//               )}

//               {activeTab === "marks" && (
//                 <td>
//                   <input
//                     type="number"
//                     onChange={(e) => handleMarks(s._id, Number(e.target.value))}
//                   />
//                 </td>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* BUTTONS */}
//       {activeTab === "attendance" && (
//         <button
//           onClick={submitAttendance}
//           className="bg-green-600 text-white px-4 py-2 mt-4"
//         >
//           Save Attendance
//         </button>
//       )}

//       {activeTab === "marks" && (
//         <button
//           onClick={submitMarks}
//           className="bg-blue-600 text-white px-4 py-2 mt-4"
//         >
//           Submit Marks
//         </button>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function InstructorDashboard() {
//   const [students, setStudents] = useState<any[]>([]);
//   const [attendance, setAttendance] = useState<any>({});
//   const [marks, setMarks] = useState<any>({});
//   const [date, setDate] = useState("");
//   const [tab, setTab] = useState("attendance");
//   const [locked, setLocked] = useState<any>({});
//   /* LOAD STUDENTS */
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/v1/instructor/students")
//       .then((res) => setStudents(res.data.data));
//   }, []);

//   useEffect(() => {
//   axios
//     .get("http://localhost:5000/api/v1/instructor/marks")
//     .then((res) => {
//       const data: any = {};
//       const locked: any = {};

//       res.data.data.forEach((item: any) => {
//         data[item.student._id] = item.marks;
//         locked[item.student._id] = item.isLocked;
//       });

//       setMarks(data);
//       setLocked(locked);
//     });
// }, []);

//   /* HANDLE */
//   const handleAttendance = (id: string, val: number) => {
//     setAttendance({ ...attendance, [id]: val });
//   };

//   const handleMarks = (id: string, val: number) => {
//     setMarks({ ...marks, [id]: val });
//   };

//   /* SUBMIT ATTENDANCE */
//   const submitAttendance = async () => {
//     if (!date) {
//       alert("Select date first");
//       return;
//     }

//     const payload = students.map((s) => ({
//       student: s._id,
//       status: attendance[s._id] ?? 1,
//       date,
//     }));

//     try {
//       await axios.post(
//         "http://localhost:5000/api/v1/instructor/attendance",
//         payload,
//       );
//       alert("Attendance Saved");
//     } catch (err: any) {
//       console.log(err.response?.data);
//       alert("Error");
//     }
//   };

//   /* SUBMIT MARKS */
//   const submitMarks = async () => {
//     const payload = students.map((s) => ({
//       student: s._id,
//       marks: marks[s._id] ?? 0,
//       examType: "final",
//     }));

//     try {
//       await axios.post(
//         "http://localhost:5000/api/v1/instructor/marks",
//         payload,
//       );
//       alert("Marks Saved");
//     } catch (err) {
//       alert("Error");
//     }
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">Instructor Panel</h1>

//       {/* DATE */}
//       <input
//         type="date"
//         onChange={(e) => setDate(e.target.value)}
//         className="border p-2 mb-4"
//       />

//       {/* TABS */}
//       <div className="flex gap-4 mb-4">
//         <button onClick={() => setTab("attendance")}>Attendance</button>
//         <button onClick={() => setTab("marks")}>Marks</button>
//       </div>

//       {/* TABLE */}
//       <table className="w-full border">
//         <thead>
//           <tr>
//             <th>Name</th>
//             {tab === "attendance" && <th>Status</th>}
//             {tab === "marks" && <th>Marks</th>}
//           </tr>
//         </thead>

//         <tbody>
//           {students.map((s) => (
//             <tr key={s._id}>
//               <td>{s.fullName || s.name}</td>

//               {tab === "attendance" && (
//                 <td>
//                   <select
//                     onChange={(e) =>
//                       handleAttendance(s._id, Number(e.target.value))
//                     }
//                   >
//                     <option value={1}>Present</option>
//                     <option value={0}>Absent</option>
//                   </select>
//                 </td>
//               )}

//               {tab === "marks" && (
//                 <td>
//                   <input
//                     type="number"
//                     value={marks[s._id] ?? ""}
//                     disabled={s.isLocked} // 🔥 DISABLE
//                     onChange={(e) => handleMarks(s._id, Number(e.target.value))}
//                     className={`border p-1 ${
//                       s.isLocked ? "bg-gray-300 cursor-not-allowed" : ""
//                     }`}
//                   />
//                 </td>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* BUTTON */}
//       {tab === "attendance" && (
//         <button
//           onClick={submitAttendance}
//           className="bg-green-600 text-white px-4 py-2 mt-4"
//         >
//           Save Attendance
//         </button>
//       )}

//       {tab === "marks" && (
//         <button
//           onClick={submitMarks}
//           className="bg-blue-600 text-white px-4 py-2 mt-4"
//         >
//           Submit Marks
//         </button>
//       )}
//     </div>
//   );
// }

"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function InstructorPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any>({});
  const [marks, setMarks] = useState<any>({});
  const [locked, setLocked] = useState<any>({});
  const [date, setDate] = useState("");
  const [tab, setTab] = useState("attendance");

  const instructorId = localStorage.getItem("userId");
  // const instructorId = "69aface813b8e1a6d2384fdde"; // MongoDB থেকে trainer id

  /* LOAD STUDENTS */
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/v1/instructor/students?instructorId=${instructorId}`,
      )
      .then((res) => setStudents(res.data.data));
  }, []);

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

  /* LOAD MARKS */
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/instructor/marks?examType=final`)
      .then((res) => {
        const m: any = {};
        const lock: any = {};

        res.data.data.forEach((r: any) => {
          if (!r.student || !r.student._id) return;

          m[r.student._id] = r.marks;
          lock[r.student._id] = r.isLocked;
        });

        setMarks(m);
        setLocked(lock);
      });
  }, []);

  /* SAVE ATTENDANCE */
  const saveAttendance = async () => {
    const payload = students.map((s) => ({
      student: s._id,
      status: attendance[s._id] ?? 1,
      date,
    }));

    await axios.post(
      "http://localhost:5000/api/v1/instructor/attendance",
      payload,
    );

    alert("Saved");
  };

  /* SAVE MARKS */
  const saveMarks = async () => {
    const payload = students.map((s) => ({
      student: s._id,
      marks: marks[s._id] ?? 0,
      examType: "final",
    }));

    await axios.post("http://localhost:5000/api/v1/instructor/marks", payload);

    alert("Submitted");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Instructor Panel</h1>
    </div>
  );
}
