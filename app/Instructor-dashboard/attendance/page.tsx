"use client";

import axios from "axios";
import { useEffect, useState } from "react";

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
  const saveAttendance = async () => {
    if (!date) return alert("Select date");

    const payload = students.map((s) => ({
      student: s._id,
      status: attendance[s._id] ?? 1,
      date,
    }));

    await axios.post(
      "http://localhost:5000/api/v1/instructor/attendance",
      payload,
    );

    alert("Attendance Saved");
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Attendance</h1>

      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 mb-4"
      />

      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.fullName}</td>

              <td>
                <select
                  value={attendance[s._id] ?? 1}
                  onChange={(e) =>
                    setAttendance({
                      ...attendance,
                      [s._id]: Number(e.target.value),
                    })
                  }
                >
                  <option value={1}>Present</option>
                  <option value={0}>Absent</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={saveAttendance}
        className="bg-green-600 text-white px-4 py-2 mt-4"
      >
        Save Attendance
      </button>
    </div>
  );
}
