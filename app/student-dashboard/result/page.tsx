"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ResultPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    if (!email) return;

    fetchResults(email);
  }, []);

  const fetchResults = async (email: string) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/student/results?email=${email}`
      );

      setResults(res.data.data || []);
    } catch (err) {
      console.error("Result Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Results</h1>

      {results.length === 0 && <p>No results found</p>}

      {results.map((r) => (
        <div key={r._id} className="bg-white p-5 mb-4 shadow rounded">

          <h2 className="font-bold text-lg">
            Exam: {r.examType}
          </h2>

          <div className="mt-3">
            <p>Marks: {r.marks}</p>
            <p>Grade: {r.grade}</p>

            {/* PASS / FAIL */}
            <p
              className={`font-bold ${
                r.grade === "F" ? "text-red-600" : "text-green-600"
              }`}
            >
              {r.grade === "F" ? "Fail ❌" : "Pass ✅"}
            </p>
          </div>

        </div>
      ))}
    </div>
  );
}