"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminAdmissionPage() {
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5;

  /* ---------------- FETCH ---------------- */

  const fetchAdmissions = async () => {
    const res = await axios.get("http://localhost:5000/api/v1/admissions");

    setAdmissions(res.data.data);
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  /* ---------------- SEARCH ---------------- */

  const filtered = admissions.filter(
    (a) =>
      a.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      a.mobileNumber?.includes(search),
  );

  /* ---------------- PAGINATION ---------------- */

  const indexLast = currentPage * rowsPerPage;
  const indexFirst = indexLast - rowsPerPage;

  const currentData = filtered.slice(indexFirst, indexLast);
  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  /* ---------------- UPDATE ---------------- */

  const updateAdmission = async (id: string, data: any) => {
    await axios.patch(`http://localhost:5000/api/v1/admissions/${id}`, data);

    toast.success("Updated successfully");
    fetchAdmissions();
  };

  /* ---------------- DELETE ---------------- */

  const deleteAdmission = async (id: string) => {
    if (!confirm("Delete this admission?")) return;

    await axios.delete(`http://localhost:5000/api/v1/admissions/${id}`);

    toast.success("Deleted");
    fetchAdmissions();
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
        {/* HEADER */}

        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Admission Management</h1>

          <input
            placeholder="Search..."
            className="border p-2 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* TABLE */}

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Mobile</th>
              <th className="p-2 border">Course</th>
              <th className="p-2 border">Fee</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((a) => (
              <tr key={a._id} className="text-center">
                <td className="border p-2">{a.fullName}</td>
                <td className="border p-2">{a.mobileNumber}</td>
                <td className="border p-2">{a.course?.name}</td>

                <td className="border p-2">
                  {a.feeAmount} ({a.feeStatus})
                </td>

                <td className="border p-2">
                  <span className="px-2 py-1 bg-yellow-200 rounded">
                    Pending
                  </span>
                </td>

                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => setSelected(a)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      updateAdmission(a._id, {
                        feeStatus: "paid",
                        feeAmount: 10000,
                      })
                    }
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => deleteAdmission(a._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}

        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border ${
                currentPage === i + 1 ? "bg-indigo-600 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* MODAL */}

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-[500px]">
            <h2 className="text-xl font-bold mb-4">Admission Details</h2>

            <p>
              <b>Name:</b> {selected.fullName}
            </p>
            <p>
              <b>Email:</b> {selected.email}
            </p>
            <p>
              <b>Phone:</b> {selected.mobileNumber}
            </p>
            <p>
              <b>Address:</b> {selected.presentAddress}
            </p>
            <p>
              <b>Course:</b> {selected.course?.name}
            </p>

            {/* UPDATE FEE */}

            <div className="mt-4 space-y-2">
              <input
                placeholder="Fee Amount"
                type="number"
                onChange={(e) =>
                  setSelected({
                    ...selected,
                    feeAmount: e.target.value,
                  })
                }
                className="border p-2 w-full"
              />

              <select
                onChange={(e) =>
                  setSelected({
                    ...selected,
                    feeStatus: e.target.value,
                  })
                }
                className="border p-2 w-full"
              >
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
              </select>

              <button
                onClick={() => {
                  updateAdmission(selected._id, {
                    feeAmount: selected.feeAmount,
                    feeStatus: selected.feeStatus,
                  });
                  setSelected(null);
                }}
                className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
              >
                Update Fee
              </button>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-4 text-red-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
