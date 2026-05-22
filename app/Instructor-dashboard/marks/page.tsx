"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function MarksPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [marks, setMarks] = useState<any>({});
  const [locked, setLocked] = useState<any>({});

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

  /* SAVE */
  const saveMarks = async () => {
    const payload = students.map((s) => ({
      student: s._id,
      marks: marks[s._id] ?? 0,
      examType: "final",
    }));

    await axios.post("http://localhost:5000/api/v1/instructor/marks", payload);

    alert("Marks Submitted");
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Marks</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Marks</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.fullName}</td>

              <td>
                <input
                  type="number"
                  value={marks[s._id] || ""}
                  disabled={locked[s._id]}
                  onChange={(e) =>
                    setMarks({
                      ...marks,
                      [s._id]: Number(e.target.value),
                    })
                  }
                  className={`border p-1 ${locked[s._id] ? "bg-gray-300" : ""}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={saveMarks}
        className="bg-blue-600 text-white px-4 py-2 mt-4"
      >
        Submit Marks
      </button>
    </div>
  );
}
