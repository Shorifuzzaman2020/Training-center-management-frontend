// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function SalaryPage() {
//   const [employees, setEmployees] = useState([]);
//   const [employeeId, setEmployeeId] = useState("");
//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState("");
//   const [result, setResult] = useState<any>(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/v1/employees")
//       .then((res) => setEmployees(res.data.data));
//   }, []);

//   const handleGenerate = async () => {
//     const res = await axios.post(
//       "http://localhost:5000/api/v1/salary/generate",
//       { employeeId, month, year },
//     );

//     setResult(res.data.data);
//   };

//   return (
//     <div className="max-w-xl mx-auto p-10">
//       <h1 className="text-xl font-bold mb-5">Salary Generator</h1>

//       <select
//         onChange={(e) => setEmployeeId(e.target.value)}
//         className="border p-2 w-full mb-3"
//       >
//         <option>Select Employee</option>
//         {employees.map((emp: any) => (
//           <option key={emp._id} value={emp._id}>
//             {emp.fullName}
//           </option>
//         ))}
//       </select>

//       <input
//         type="number"
//         placeholder="Month (1-12)"
//         onChange={(e) => setMonth(e.target.value)}
//         className="border p-2 w-full mb-3"
//       />
//       <input
//         type="number"
//         placeholder="Year"
//         onChange={(e) => setYear(e.target.value)}
//         className="border p-2 w-full mb-3"
//       />

//       <button
//         onClick={handleGenerate}
//         className="bg-indigo-600 text-white px-5 py-2"
//       >
//         Generate Salary
//       </button>
//       {result && (
//         <button
//           onClick={() =>
//             window.open(
//               `http://localhost:5000/api/v1/salary/slip/${result._id}`,
//             )
//           }
//           className="bg-green-600 text-white px-4 py-2 mt-3 rounded"
//         >
//           Download Salary Slip
//         </button>
//       )}

//       {result && (
//         <div className="mt-5 border p-4">
//           <p>Present: {result.presentDays}</p>
//           <p>Absent: {result.absentDays}</p>
//           <p>Weekend: {result.weekendDays}</p>

//           <p className="font-bold mt-3">Net Salary: {result.netSalary}৳</p>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function SalaryPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [employeeId, setEmployeeId] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  /* LOAD EMPLOYEES */
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/employees")
      .then((res) => setEmployees(res.data.data))
      .catch(() => alert("Failed to load employees"));
  }, []);

  /* GENERATE SALARY */
  const handleGenerate = async () => {

    if (!employeeId || !month || !year) {
      return alert("All fields required ❗");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/v1/salary/generate",
        {
          employeeId,
          month: Number(month),
          year: Number(year),
        }
      );

      setResult(res.data.data);

    } catch (err: any) {
      // 🔥 backend error show করবে
      alert(err.response?.data?.message || "Salary generation failed");
    } finally {
      setLoading(false);
    }
  };

  /* DOWNLOAD SLIP */
  const downloadSlip = () => {
    if (!result?._id) return;

    window.open(
      `http://localhost:5000/api/v1/salary/slip/${result._id}`,
      "_blank"
    );
  };

  return (
    <div className="max-w-xl mx-auto p-10">

      <h1 className="text-xl font-bold mb-5">
        Salary Generator
      </h1>

      {/* EMPLOYEE SELECT */}
      <select
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        className="border p-2 w-full mb-3"
      >
        <option value="">Select Employee</option>
        {employees.map((emp: any) => (
          <option key={emp._id} value={emp._id}>
            {emp.fullName}
          </option>
        ))}
      </select>

      {/* MONTH */}
      <input
        type="number"
        placeholder="Month (1-12)"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      {/* YEAR */}
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      {/* GENERATE BUTTON */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-indigo-600 text-white px-5 py-2 w-full"
      >
        {loading ? "Generating..." : "Generate Salary"}
      </button>

      {/* RESULT */}
      {result && (
        <div className="mt-5 border p-4 rounded bg-white shadow">

          <h2 className="font-bold mb-3">Salary Summary</h2>

          <p>Present: {result.presentDays}</p>
          <p>Absent: {result.absentDays}</p>
          <p>Weekend: {result.weekendDays}</p>

          <p className="mt-2">Base Salary: ৳{result.baseSalary}</p>
          <p>Deduction: ৳{result.deduction}</p>

          <p className="font-bold mt-3 text-green-600">
            Net Salary: ৳{result.netSalary}
          </p>

          {/* DOWNLOAD BUTTON */}
          <button
            onClick={downloadSlip}
            className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
          >
            Download Salary Slip
          </button>

        </div>
      )}

    </div>
  );
}