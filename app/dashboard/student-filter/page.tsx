"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Filter,
  Users,
  Eye,
  Check,
  Trash2,
  X,
  Calendar,
  BookOpen,
  RefreshCw,
} from "lucide-react";

export default function AdminAdmissionFilterPage() {
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [batches, setBatches] = useState<any[]>([]);

  // ফিল্টারিং স্টেটসমূহ
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedFeeStatus, setSelectedFeeStatus] = useState("");

  const [selected, setSelected] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  /* ---------------- FETCH DATA ---------------- */
  const fetchData = async () => {
    try {
      const [admissionRes, courseRes, batchRes] = await Promise.all([
        axios.get("http://localhost:5000/api/v1/admissions"),
        axios.get("http://localhost:5000/api/v1/courses"),
        axios.get("http://localhost:5000/api/v1/batches"), // আপনার এপিআই পাথ নিশ্চিত করুন
      ]);

      setAdmissions(admissionRes.data.data || []);
      setCourses(courseRes.data.data || []);
      setBatches(batchRes.data.data || []);
    } catch (error) {
      toast.error("Failed to load data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ---------------- RESET FILTERS ---------------- */
  const resetFilters = () => {
    setSearch("");
    setSelectedCourse("");
    setSelectedBatch("");
    setSelectedFeeStatus("");
    setCurrentPage(1);
  };

  /* ---------------- ADVANCED FILTERING LOGIC ---------------- */
  const filtered = admissions.filter((a) => {
    const matchesSearch =
      a.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      a.mobileNumber?.includes(search);

    const matchesCourse = selectedCourse
      ? a.course?._id === selectedCourse
      : true;

    // আপনার স্কিমা অনুযায়ী ব্যাচ preferredBatch ফিল্ডে থাকতে পারে
    // preferredBatch সরাসরি স্ট্রিং আইডি হলে সেটির সাথে ড্রপডাউনের আইডি চেক করবে
    const matchesBatch = selectedBatch
      ? a.preferredBatch?._id === selectedBatch ||
        a.preferredBatch === selectedBatch
      : true;

    const matchesFee = selectedFeeStatus
      ? a.feeStatus === selectedFeeStatus
      : true;

    return matchesSearch && matchesCourse && matchesBatch && matchesFee;
  });

  /* ---------------- PAGINATION ---------------- */
  const indexLast = currentPage * rowsPerPage;
  const indexFirst = indexLast - rowsPerPage;
  const currentData = filtered.slice(indexFirst, indexLast);
  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  /* ---------------- UPDATE ---------------- */
  const updateAdmission = async (id: string, data: any) => {
    try {
      await axios.patch(`http://localhost:5000/api/v1/admissions/${id}`, data);
      toast.success("Updated successfully");
      fetchData();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  /* ---------------- DELETE ---------------- */
  const deleteAdmission = async (id: string) => {
    if (!confirm("Delete this admission?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/v1/admissions/${id}`);
      toast.success("Deleted successfully");
      fetchData();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8 bg-white shadow-sm rounded-2xl border border-gray-100">
      {/* TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-6 mb-6 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
            <Filter className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Advanced Admission Filter
            </h1>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
              <Users className="w-4 h-4" /> Filtered Total: {filtered.length}
            </p>
          </div>
        </div>
      </div>

      {/* ================= FILTER PANEL ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 p-5 bg-gray-50/50 border border-gray-100 rounded-2xl">
        {/* Name / Mobile Search */}
        <div>
          <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
            Search Student
          </label>
          <input
            placeholder="Name or Mobile..."
            className="w-full border border-gray-200 bg-white px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Course Filter */}
        <div>
          <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
            By Course
          </label>
          <select
            className="w-full border border-gray-200 bg-white px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
            value={selectedCourse}
            onChange={(e) => {
              setSelectedCourse(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Courses</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Batch Filter */}
        <div>
          <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
            By Batch
          </label>
          <select
            className="w-full border border-gray-200 bg-white px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
            value={selectedBatch}
            onChange={(e) => {
              setSelectedBatch(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Batches</option>
            {batches.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name || b.batchName || `Batch ${b._id.slice(-4)}`}
              </option>
            ))}
          </select>
        </div>

        {/* Fee Status Filter */}
        <div>
          <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
            Fee Status
          </label>
          <select
            className="w-full border border-gray-200 bg-white px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
            value={selectedFeeStatus}
            onChange={(e) => {
              setSelectedFeeStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Status</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>

        {/* Reset Button */}
        <div className="flex items-end">
          <button
            onClick={resetFilters}
            className="w-full inline-flex items-center justify-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-xl text-sm transition-all cursor-pointer active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* ================= DATA TABLE ================= */}
      <div className="overflow-hidden border border-gray-100 rounded-xl shadow-sm bg-gray-50/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 text-sm font-semibold text-gray-600 tracking-wider">
                Student Info
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600 tracking-wider">
                Course & Batch
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600 tracking-wider">
                Fee Details
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600 tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {currentData.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center text-gray-400 text-sm"
                >
                  No admissions matched your query.
                </td>
              </tr>
            ) : (
              currentData.map((a) => (
                <tr
                  key={a._id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {/* Name & Mobile */}
                  <td className="p-4">
                    <p className="font-semibold text-gray-900 text-sm md:text-base">
                      {a.fullName}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {a.mobileNumber}
                    </p>
                  </td>

                  {/* Course & Batch info */}
                  
<td className="p-4">
  <div className="flex items-center space-x-1 text-sm font-medium text-gray-700">
    <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
    <span>{a.course?.name || "N/A"}</span>
  </div>
  <div className="flex items-center space-x-1 text-xs text-gray-400 mt-0.5">
    <Calendar className="w-3.5 h-3.5" />
    <span className="font-semibold text-gray-600">
      
      {a.preferredBatch?.name || 
       a.preferredBatch?.batchName || 
       (a.preferredBatch ? `Batch (${a.preferredBatch.toString().slice(-4)})` : "No Batch Assigned")}
    </span>
  </div>
</td>

                  {/* Fee amount and badge */}
                  <td className="p-4">
                    <p className="text-sm font-bold text-gray-800">
                      ৳{a.feeAmount || 0}
                    </p>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold mt-1 uppercase tracking-wider
                      ${a.feeStatus === "paid" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-rose-50 text-rose-700 border border-rose-100"}`}
                    >
                      {a.feeStatus}
                    </span>
                  </td>

                  {/* Operational Buttons */}
                  <td className="p-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => setSelected(a)}
                      className="p-2 text-gray-500 hover:text-indigo-600 bg-gray-50 hover:bg-indigo-50 rounded-xl border border-gray-100 transition-all cursor-pointer inline-flex items-center"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {a.feeStatus !== "paid" && (
                      <button
                        onClick={() =>
                          updateAdmission(a._id, {
                            feeStatus: "paid",
                            feeAmount: 10000,
                          })
                        }
                        className="p-2 text-gray-500 hover:text-emerald-600 bg-gray-50 hover:bg-emerald-50 rounded-xl border border-gray-100 transition-all cursor-pointer inline-flex items-center"
                        title="Approve"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => deleteAdmission(a._id)}
                      className="p-2 text-gray-500 hover:text-rose-600 bg-gray-50 hover:bg-rose-50 rounded-xl border border-gray-100 transition-all cursor-pointer inline-flex items-center"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-1.5">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3.5 py-1.5 border rounded-xl text-sm font-semibold transition-all cursor-pointer
                ${currentPage === i + 1 ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* ================= MODAL DETAILED VIEW ================= */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 w-full max-w-lg shadow-xl overflow-hidden animate-fadeIn">
            <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Admission Sheet
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  ID: {selected._id}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <b>Full Name:</b> {selected.fullName}
              </p>
              <p>
                <b>Email:</b> {selected.email}
              </p>
              <p>
                <b>Mobile:</b> {selected.mobileNumber}
              </p>
              <p>
                <b>Address:</b> {selected.presentAddress}
              </p>
              <p>
                <b>Course:</b> {selected.course?.name || "N/A"}
              </p>
              <p>
                <b>Batch:</b> {selected.preferredBatch?.name ||
                  selected.preferredBatch?.batchName ||
                  (selected.preferredBatch ? `Batch (${selected.preferredBatch.toString().slice(-4)})` : "No Batch Assigned")}
              </p>
            </div>

            {/* UPDATE SYSTEM */}
            <div className="mt-5 pt-4 border-t border-gray-100 space-y-3">
              <label className="block text-xs font-bold text-gray-500 uppercase">
                Modify Fee Structure
              </label>
              <input
                placeholder="Fee Amount"
                type="number"
                value={selected.feeAmount || ""}
                onChange={(e) =>
                  setSelected({
                    ...selected,
                    feeAmount: Number(e.target.value),
                  })
                }
                className="w-full border border-gray-200 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />

              <select
                value={selected.feeStatus || "unpaid"}
                onChange={(e) =>
                  setSelected({ ...selected, feeStatus: e.target.value })
                }
                className="w-full border border-gray-200 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
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
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl text-sm shadow-md cursor-pointer transition-all active:scale-95"
              >
                Update Ledger
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
