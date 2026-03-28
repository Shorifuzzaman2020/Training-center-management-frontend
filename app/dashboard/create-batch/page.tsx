// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// type Course = {
//     _id: string;
//     name: string;
// };

// type Batch = {
//     _id: string;
//     batchName: string;
//     course: Course;
//     startDate: string;
//     endDate: string;
//     capacity: number;
//     status: string;
// };

// export default function BatchManagementPage() {
//     const [courses, setCourses] = useState<Course[]>([]);
//     const [batches, setBatches] = useState<Batch[]>([]);
//     const [loading, setLoading] = useState(false);

//     const [formData, setFormData] = useState({
//         batchName: "",
//         course: "",
//         startDate: "",
//         endDate: "",
//         capacity: "",
//         status: "Upcoming",
//     });

//     /* FETCH COURSES */
//     const fetchCourses = async () => {
//         try {
//             const res = await axios.get(
//                 "http://localhost:5000/api/v1/courses"
//             );
//             setCourses(res.data.data);
//         } catch (error) {
//             toast.error("Failed to load courses");
//         }
//     };

//     /* FETCH BATCHES*/
//     const fetchBatches = async () => {
//         try {
//             const res = await axios.get(
//                 "http://localhost:5000/api/v1/batches"
//             );
//             setBatches(res.data.data);
//         } catch (error) {
//             toast.error("Failed to load batches");
//         }
//     };

//     useEffect(() => {
//         fetchCourses();
//         fetchBatches();
//     }, []);

//     /*  CREATE BATCH */
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             await axios.post(
//                 "http://localhost:5000/api/v1/batches/create-batch",
//                 {
//                     ...formData,
//                     capacity: Number(formData.capacity),
//                 }
//             );

//             toast.success("Batch created successfully 🎉");

//             setFormData({
//                 batchName: "",
//                 course: "",
//                 startDate: "",
//                 endDate: "",
//                 capacity: "",
//                 status: "Upcoming",
//             });

//             fetchBatches();

//         } catch (error: any) {
//             toast.error(error?.response?.data?.message || "Creation failed");
//         }

//         setLoading(false);
//     };

//     /* DELETE BATCH */
//     const handleDelete = async (id: string) => {
//         if (!confirm("Are you sure you want to delete this batch?")) return;

//         try {
//             await axios.delete(
//                 `http://localhost:5000/api/v1/batches/${id}`
//             );

//             toast.success("Batch deleted");
//             setBatches(prev => prev.filter(b => b._id !== id));

//         } catch (error) {
//             toast.error("Delete failed");
//         }
//     };

//     return (
//         <div className="bg-gray-100 min-h-screen p-8">
//             <div className="max-w-6xl mx-auto space-y-8">

//                 {/*  FORM SECTION  */}
//                 <div className="bg-white shadow rounded-xl p-6">
//                     <h1 className="text-3xl font-bold mb-6">
//                         Batch Management
//                     </h1>

//                     <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">

//                         {/* Batch Name */}
//                         <div className="flex flex-col">
//                             <label className="mb-1 font-medium">Batch Name</label>
//                             <input
//                                 type="text"
//                                 value={formData.batchName}
//                                 onChange={(e) =>
//                                     setFormData({ ...formData, batchName: e.target.value })
//                                 }
//                                 required
//                                 className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>

//                         {/* Course Dropdown */}
//                         <div className="flex flex-col">
//                             <label className="mb-1 font-medium">Course</label>
//                             <select
//                                 value={formData.course}
//                                 onChange={(e) =>
//                                     setFormData({ ...formData, course: e.target.value })
//                                 }
//                                 required
//                                 className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
//                             >
//                                 <option value="">Select Course</option>
//                                 {courses.map((course) => (
//                                     <option key={course._id} value={course._id}>
//                                         {course.name}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         {/* Start Date */}
//                         <div className="flex flex-col">
//                             <label className="mb-1 font-medium">Start Date</label>
//                             <input
//                                 type="date"
//                                 value={formData.startDate}
//                                 onChange={(e) =>
//                                     setFormData({ ...formData, startDate: e.target.value })
//                                 }
//                                 required
//                                 className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>

//                         {/* End Date */}
//                         <div className="flex flex-col">
//                             <label className="mb-1 font-medium">End Date</label>
//                             <input
//                                 type="date"
//                                 value={formData.endDate}
//                                 onChange={(e) =>
//                                     setFormData({ ...formData, endDate: e.target.value })
//                                 }
//                                 required
//                                 className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>

//                         {/* Capacity */}
//                         <div className="flex flex-col">
//                             <label className="mb-1 font-medium">Capacity</label>
//                             <input
//                                 type="number"
//                                 value={formData.capacity}
//                                 onChange={(e) =>
//                                     setFormData({ ...formData, capacity: e.target.value })
//                                 }
//                                 required
//                                 className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>

//                         {/* Status */}
//                         <div className="flex flex-col">
//                             <label className="mb-1 font-medium">Status</label>
//                             <select
//                                 value={formData.status}
//                                 onChange={(e) =>
//                                     setFormData({ ...formData, status: e.target.value })
//                                 }
//                                 className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
//                             >
//                                 <option value="Upcoming">Upcoming</option>
//                                 <option value="Running">Running</option>
//                                 <option value="Completed">Completed</option>
//                             </select>
//                         </div>

//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="col-span-2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
//                         >
//                             {loading ? "Creating..." : "Create Batch"}
//                         </button>

//                     </form>
//                 </div>

//                 {/* TABLE SECTION */}
//                 <div className="bg-white shadow rounded-xl p-6">
//                     <h2 className="text-xl font-semibold mb-4">
//                         Batch List
//                     </h2>

//                     <div className="overflow-x-auto">
//                         <table className="w-full border border-gray-200">
//                             <thead className="bg-gray-100">
//                                 <tr>
//                                     <th className="p-3 border">Batch</th>
//                                     <th className="p-3 border">Course</th>
//                                     <th className="p-3 border">Start</th>
//                                     <th className="p-3 border">End</th>
//                                     <th className="p-3 border">Capacity</th>
//                                     <th className="p-3 border">Status</th>
//                                     <th className="p-3 border text-center">Action</th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 {batches.map((batch) => (
//                                     <tr key={batch._id} className="hover:bg-gray-50">
//                                         <td className="p-3 border font-medium">
//                                             {batch.batchName}
//                                         </td>
//                                         <td className="p-3 border">
//                                             {batch.course?.name}
//                                         </td>
//                                         <td className="p-3 border">
//                                             {new Date(batch.startDate).toLocaleDateString()}
//                                         </td>
//                                         <td className="p-3 border">
//                                             {new Date(batch.endDate).toLocaleDateString()}
//                                         </td>
//                                         <td className="p-3 border">
//                                             {batch.capacity}
//                                         </td>
//                                         <td className="p-3 border">
//                                             {batch.status}
//                                         </td>
//                                         <td className="p-3 border text-center">
//                                             <button
//                                                 onClick={() => handleDelete(batch._id)}
//                                                 className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
//                                             >
//                                                 Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>

//                         {batches.length === 0 && (
//                             <p className="text-center text-gray-500 mt-4">
//                                 No batches found
//                             </p>
//                         )}
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// }


"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type Course = {
    _id: string;
    name: string;
};

type Batch = {
    _id: string;
    batchName: string;
    course: Course;
    startDate: string;
    endDate: string;
    capacity: number;
    status: string;
};

export default function BatchManagementPage() {

    const [courses, setCourses] = useState<Course[]>([]);
    const [batches, setBatches] = useState<Batch[]>([]);
    const [loading, setLoading] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const rowsPerPage = 5;

    const [formData, setFormData] = useState({
        batchName: "",
        course: "",
        startDate: "",
        endDate: "",
        capacity: "",
        status: "Upcoming",
    });

    /* FETCH COURSES */

    const fetchCourses = async () => {
        const res = await axios.get(
            "http://localhost:5000/api/v1/courses"
        );
        setCourses(res.data.data);
    };

    /* FETCH BATCHES */

    const fetchBatches = async () => {
        const res = await axios.get(
            "http://localhost:5000/api/v1/batches"
        );
        setBatches(res.data.data);
    };

    useEffect(() => {
        fetchCourses();
        fetchBatches();
    }, []);

    /* SEARCH */

    const filteredBatches = batches.filter((b) =>
        b.batchName.toLowerCase().includes(search.toLowerCase())
    );

    /* PAGINATION */

    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;

    const currentBatches = filteredBatches.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(filteredBatches.length / rowsPerPage);

    /* OPEN FORM */

    const openCreateForm = () => {

        setEditId(null);

        setFormData({
            batchName: "",
            course: "",
            startDate: "",
            endDate: "",
            capacity: "",
            status: "Upcoming",
        });

        setShowForm(true);

    };

    /* EDIT */

    const handleEdit = (batch: Batch) => {

        setEditId(batch._id);

        setFormData({
            batchName: batch.batchName,
            course: batch.course?._id || "",
            startDate: batch.startDate.slice(0, 10),
            endDate: batch.endDate.slice(0, 10),
            capacity: batch.capacity.toString(),
            status: batch.status,
        });

        setShowForm(true);

    };

    /* CREATE / UPDATE */

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        setLoading(true);

        try {

            if (editId) {

                await axios.patch(
                    `http://localhost:5000/api/v1/batches/${editId}`,
                    {
                        ...formData,
                        capacity: Number(formData.capacity),
                    }
                );

                toast.success("Batch updated");

            } else {

                await axios.post(
                    "http://localhost:5000/api/v1/batches/create-batch",
                    {
                        ...formData,
                        capacity: Number(formData.capacity),
                    }
                );

                toast.success("Batch created successfully 🎉");

            }

            setShowForm(false);

            fetchBatches();

        } catch (error: any) {

            toast.error(
                error?.response?.data?.message || "Operation failed"
            );

        }

        setLoading(false);

    };

    /* DELETE */

    const handleDelete = async (id: string) => {

        if (!confirm("Are you sure you want to delete this batch?"))
            return;

        await axios.delete(
            `http://localhost:5000/api/v1/batches/${id}`
        );

        toast.success("Batch deleted");

        fetchBatches();

    };

    return (

        <div className="bg-gray-100 min-h-screen p-8">

            <div className="max-w-6xl mx-auto">

                {/* TABLE VIEW */}

                {!showForm && (

                    <div className="bg-white shadow rounded-xl p-6">

                        <div className="flex justify-between mb-4">

                            <h1 className="text-2xl font-bold">
                                Batch Management
                            </h1>

                            <button
                                onClick={openCreateForm}
                                className="bg-indigo-600 text-white px-6 py-2 rounded"
                            >
                                Create Batch
                            </button>

                        </div>

                        {/* SEARCH */}

                        <input
                            type="text"
                            placeholder="Search batch..."
                            className="border p-2 w-full mb-4 rounded"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <table className="w-full border border-gray-200">

                            <thead className="bg-gray-100">

                                <tr>

                                    <th className="p-3 border">Batch</th>

                                    <th className="p-3 border">Course</th>

                                    <th className="p-3 border">Start</th>

                                    <th className="p-3 border">End</th>

                                    <th className="p-3 border">Capacity</th>

                                    <th className="p-3 border">Status</th>

                                    <th className="p-3 border text-center">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {currentBatches.map((batch) => (

                                    <tr key={batch._id} className="hover:bg-gray-50">

                                        <td className="p-3 border font-medium">
                                            {batch.batchName}
                                        </td>

                                        <td className="p-3 border">
                                            {batch.course?.name}
                                        </td>

                                        <td className="p-3 border">
                                            {new Date(batch.startDate).toLocaleDateString()}
                                        </td>

                                        <td className="p-3 border">
                                            {new Date(batch.endDate).toLocaleDateString()}
                                        </td>

                                        <td className="p-3 border">
                                            {batch.capacity}
                                        </td>

                                        <td className="p-3 border">
                                            {batch.status}
                                        </td>

                                        <td className="p-3 border text-center space-x-2">

                                            <button
                                                onClick={() => handleEdit(batch)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(batch._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                        {/* PAGINATION */}

                        <div className="flex justify-center gap-2 mt-4">

                            {Array.from({ length: totalPages }, (_, i) => (

                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-1 border rounded 
                  ${currentPage === i + 1 ? "bg-indigo-600 text-white" : ""}`}
                                >
                                    {i + 1}
                                </button>

                            ))}

                        </div>

                    </div>

                )}

                {/* FORM VIEW */}

                {showForm && (

                    <div className="bg-white shadow rounded-xl p-6">

                        <h2 className="text-xl font-semibold mb-4">
                            {editId ? "Edit Batch" : "Create Batch"}
                        </h2>

                        {/* ORIGINAL FORM */}

                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-2 gap-5"
                        >

                            <div className="flex flex-col">
                                <label className="mb-1 font-medium">Batch Name</label>
                                <input
                                    type="text"
                                    value={formData.batchName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, batchName: e.target.value })
                                    }
                                    required
                                    className="border rounded-lg px-3 py-2"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="mb-1 font-medium">Course</label>
                                <select
                                    value={formData.course}
                                    onChange={(e) =>
                                        setFormData({ ...formData, course: e.target.value })
                                    }
                                    required
                                    className="border rounded-lg px-3 py-2"
                                >
                                    <option value="">Select Course</option>
                                    {courses.map((course) => (
                                        <option key={course._id} value={course._id}>
                                            {course.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label className="mb-1 font-medium">Start Date</label>
                                <input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) =>
                                        setFormData({ ...formData, startDate: e.target.value })
                                    }
                                    required
                                    className="border rounded-lg px-3 py-2"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="mb-1 font-medium">End Date</label>
                                <input
                                    type="date"
                                    value={formData.endDate}
                                    onChange={(e) =>
                                        setFormData({ ...formData, endDate: e.target.value })
                                    }
                                    required
                                    className="border rounded-lg px-3 py-2"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="mb-1 font-medium">Capacity</label>
                                <input
                                    type="number"
                                    value={formData.capacity}
                                    onChange={(e) =>
                                        setFormData({ ...formData, capacity: e.target.value })
                                    }
                                    required
                                    className="border rounded-lg px-3 py-2"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="mb-1 font-medium">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) =>
                                        setFormData({ ...formData, status: e.target.value })
                                    }
                                    className="border rounded-lg px-3 py-2"
                                >
                                    <option value="Upcoming">Upcoming</option>
                                    <option value="Running">Running</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="col-span-2 bg-indigo-600 text-white py-2 rounded-lg"
                            >
                                {loading
                                    ? "Saving..."
                                    : editId
                                        ? "Update Batch"
                                        : "Create Batch"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="col-span-2 bg-gray-500 text-white py-2 rounded-lg"
                            >
                                Cancel
                            </button>

                        </form>

                    </div>

                )}

            </div>

        </div>

    );

}