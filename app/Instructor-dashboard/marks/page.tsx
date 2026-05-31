

"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Award, Save, Users, Lock, Unlock } from "lucide-react"; // আইকন ইমপোর্ট করা হয়েছে

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
    <div className="max-w-5xl mx-auto p-6 md:p-8 bg-white shadow-sm rounded-2xl border border-gray-100">
      
      {/* TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-6 mb-6 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Final Exam Marks</h1>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
              <Users className="w-4 h-4" /> Total Students: {students.length}
            </p>
          </div>
        </div>

        {/* BADGE SHOWING EXAM TYPE */}
        <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 self-start sm:self-center uppercase tracking-wider">
          Exam Type: Final
        </span>
      </div>

      {/* TABLE CONTAINER */}
      <div className="overflow-hidden border border-gray-100 rounded-xl shadow-sm bg-gray-50/20">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 text-sm font-semibold text-gray-600 tracking-wider">Student Name</th>
              <th className="p-4 text-sm font-semibold text-gray-600 tracking-wider w-48 text-right sm:text-left">Obtained Marks</th>
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
                const isItemLocked = locked[s._id];
                
                return (
                  <tr key={s._id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4 font-medium text-gray-800 text-sm md:text-base">
                      {s.fullName}
                    </td>

                    <td className="p-4 text-right sm:text-left">
                      <div className="relative inline-flex items-center max-w-[160px] w-full">
                        <input
                          type="number"
                          value={marks[s._id] || ""}
                          disabled={isItemLocked}
                          placeholder={isItemLocked ? "Locked" : "Enter marks"}
                          onChange={(e) =>
                            setMarks({
                              ...marks,
                              [s._id]: Number(e.target.value),
                            })
                          }
                          className={`w-full pl-4 pr-10 py-2 border rounded-xl text-sm font-medium transition-all text-gray-800 focus:outline-none focus:ring-2
                            ${
                              isItemLocked
                                ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed select-none"
                                : "bg-white border-gray-200 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300"
                            }`}
                        />
                        {/* INPUT INNER ICON BASED ON LOCK STATUS */}
                        <div className="absolute right-3 pointer-events-none text-gray-400">
                          {isItemLocked ? (
                            <Lock className="w-4 h-4 text-rose-400" />
                          ) : (
                            <Unlock className="w-4 h-4 text-emerald-400" />
                          )}
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
          onClick={saveMarks}
          className="flex items-center space-x-2 bg-blue-600 text-white font-medium px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 active:scale-95 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Submit Marks</span>
        </button>
      </div>

    </div>
  );
}