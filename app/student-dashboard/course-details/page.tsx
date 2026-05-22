// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function CourseDetailsPage() {
//   const [admissions, setAdmissions] = useState<any[]>([]);

//   const email = localStorage.getItem("userEmail");

//   useEffect(() => {
//     if (!email) return;
//     fetchAdmissions();
//   }, [email]);

//   const fetchAdmissions = async () => {
//     const res = await axios.get(
//       `http://localhost:5000/api/v1/admissions/my-admissions?email=${email}`
//     );

//     setAdmissions(res.data.data);
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">My Courses</h1>

//       {admissions.length === 0 && <p>No data found</p>}

//       {admissions.map((a) => (
//         <div key={a._id} className="bg-white p-5 mb-4 shadow rounded">

//           <h2 className="font-bold text-lg">{a.fullName}</h2>

//           {/* 🔥 COURSE DETAILS */}
//           <div className="mt-3">
//             <h3 className="font-semibold">Course Info</h3>
//             <p>Name: {a.course?.name}</p>
//             <p>Description: {a.course?.description}</p>
//           </div>

//           {/* 🔥 BATCH DETAILS */}
//           <div className="mt-3">
//             <h3 className="font-semibold">Batch Info</h3>
//             <p>Batch: {a.preferredBatch?.batchName}</p>
//             <p>Start Date: {a.preferredBatch?.startDate}</p>
//           </div>

//         </div>
//       ))}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function CourseDetailsPage() {
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    if (!email) {
      console.log("No email found");
      return;
    }

    fetchAdmissions(email);
  }, []);

  const fetchAdmissions = async (email: string) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/admissions/my-admissions?email=${email}`
      );

      console.log("API DATA:", res.data); // 🔥 DEBUG

      setAdmissions(res.data.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Courses</h1>

      {admissions.length === 0 && <p>No data found</p>}

      {admissions.map((a) => (
        <div key={a._id} className="bg-white p-5 mb-4 shadow rounded">

          <h2 className="font-bold text-lg">{a.fullName}</h2>

          {/* 🔥 COURSE DETAILS */}
          <div className="mt-3">
            <h3 className="font-semibold">Course Info</h3>
            <p>Name: {a.course?.name || "N/A"}</p>
            <p>Description: {a.course?.description || "N/A"}</p>
          </div>

          {/* 🔥 BATCH DETAILS */}
          <div className="mt-3">
            <h3 className="font-semibold">Batch Info</h3>
            <p>Batch: {a.preferredBatch?.batchName || "N/A"}</p>
            <p>
              Start Date:{" "}
              {a.preferredBatch?.startDate
                ? new Date(a.preferredBatch.startDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

        </div>
      ))}
    </div>
  );
}