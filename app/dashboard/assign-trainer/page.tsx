// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function AssignTrainerPage() {

//     const [categories, setCategories] = useState([]);
//     const [courses, setCourses] = useState([]);
//     const [batches, setBatches] = useState([]);
//     const [trainers, setTrainers] = useState([]);
//     const [assignments, setAssignments] = useState([]);

//     const [form, setForm] = useState({
//         category: "",
//         course: "",
//         batch: "",
//         trainer: "",
//         assignDate: ""
//     });



//     const fetchCategories = async () => {
//         const res = await axios.get("http://localhost:5000/api/v1/categories");
//         setCategories(res.data.data);
//     }

//     const fetchCourses = async () => {
//         const res = await axios.get("http://localhost:5000/api/v1/courses");
//         setCourses(res.data.data);
//     }

//     const fetchBatches = async () => {
//         const res = await axios.get("http://localhost:5000/api/v1/batches");
//         setBatches(res.data.data);
//     }

//     const fetchTrainers = async () => {
//         const res = await axios.get("http://localhost:5000/api/v1/employees");
//         setTrainers(res.data.data);
//     }

//     useEffect(() => {

//         fetchCategories();
//         fetchCourses();
//         fetchBatches();
//         fetchTrainers();
//         fetchAssignments();

//     }, [])

//     const fetchAssignments = async () => {
//         const res = await axios.get("http://localhost:5000/api/v1/assign-trainer");
//         setAssignments(res.data.data);
//     }

//     const handleSubmit = async (e: any) => {
//         e.preventDefault();

//         try {

//             await axios.post(
//                 "http://localhost:5000/api/v1/assign-trainer/create-assign-trainer",
//                 form
//             )

//             toast.success("Trainer assigned successfully")

//             fetchAssignments()

//         } catch (err) {
//             toast.error("Assignment failed")
//         }

//     }

//     const removeAssignment = async (id: string) => {
//         await axios.delete(`http://localhost:5000/api/v1/assign-trainer/${id}`)
//         fetchAssignments()
//     }

//     return (

//         <div className="max-w-5xl mx-auto bg-white shadow p-8 rounded-lg">

//             <h1 className="text-2xl font-bold text-center mb-6">Assign Trainer</h1>

//             <form onSubmit={handleSubmit} className="space-y-4">

//                 <select
//                     className="w-full border p-2"
//                     onChange={(e) => setForm({ ...form, category: e.target.value })}
//                 >
//                     <option>Select Training Category</option>
//                     {categories.map((c: any) => (
//                         <option key={c._id} value={c._id}>{c.name}</option>
//                     ))}
//                 </select>

//                 <select
//                     className="w-full border p-2"
//                     onChange={(e) => setForm({ ...form, course: e.target.value })}
//                 >
//                     <option>Select Course</option>
//                     {courses.map((c: any) => (
//                         <option key={c._id} value={c._id}>{c.name}</option>
//                     ))}
//                 </select>

//                 <select
//                     className="w-full border p-2"
//                     onChange={(e) => setForm({ ...form, batch: e.target.value })}
//                 >
//                     <option>Select Batch</option>
//                     {batches.map((b: any) => (
//                         <option key={b._id} value={b._id}>{b.batchName}</option>
//                     ))}
//                 </select>

//                 <select
//                     className="w-full border p-2"
//                     onChange={(e) => setForm({ ...form, trainer: e.target.value })}
//                 >
//                     <option>Select Trainer</option>
//                     {trainers.map((t: any) => (
//                         <option key={t._id} value={t._id}>{t.fullName}</option>
//                     ))}
//                 </select>

//                 <input
//                     type="date"
//                     className="w-full border p-2"
//                     onChange={(e) => setForm({ ...form, assignDate: e.target.value })}
//                 />

//                 <button
//                     className="bg-green-600 text-white px-6 py-2 rounded"
//                 >
//                     Assign Trainer
//                 </button>

//             </form>

//             {/* TABLE */}

//             <h2 className="text-xl font-semibold mt-8 mb-4">Assigned Trainer List</h2>

//             <table className="w-full border">

//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Batch</th>
//                         <th>Course</th>
//                         <th>Category</th>
//                         <th>Trainer</th>
//                         <th>Date</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>

//                 <tbody>

//                     {assignments.map((a: any, i: number) => (
//                         <tr key={a._id} className="text-center border">

//                             <td>{i + 1}</td>
//                             <td>{a.batch?.batchName}</td>
//                             <td>{a.course?.name}</td>
//                             <td>{a.category?.name}</td>
//                             <td>{a.trainer?.fullName}</td>
//                             <td>{new Date(a.assignDate).toLocaleDateString()}</td>
//                             <td>
//                                 <button
//                                     onClick={() => removeAssignment(a._id)}
//                                     className="bg-red-500 text-white px-3 py-1"
//                                 >
//                                     Remove
//                                 </button>
//                             </td>

//                         </tr>
//                     ))}

//                 </tbody>

//             </table>

//         </div>

//     );
// }



"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AssignTrainerPage() {

    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);
    const [batches, setBatches] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [assignments, setAssignments] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState("");

    const [form, setForm] = useState({
        category: "",
        course: "",
        batch: "",
        trainer: "",
        assignDate: ""
    });

    /* ---------------- FETCH DATA ---------------- */

    const fetchCategories = async () => {
        const res = await axios.get("http://localhost:5000/api/v1/categories");
        setCategories(res.data.data);
    };

    const fetchCourses = async () => {
        const res = await axios.get("http://localhost:5000/api/v1/courses");
        setCourses(res.data.data);
    };

    const fetchBatches = async () => {
        const res = await axios.get("http://localhost:5000/api/v1/batches");
        setBatches(res.data.data);
    };

    const fetchTrainers = async () => {
        const res = await axios.get("http://localhost:5000/api/v1/employees");
        setTrainers(res.data.data);
    };

    const fetchAssignments = async () => {
        const res = await axios.get("http://localhost:5000/api/v1/assign-trainer");
        setAssignments(res.data.data);
    };

    useEffect(() => {
        fetchCategories();
        fetchCourses();
        fetchBatches();
        fetchTrainers();
        fetchAssignments();
    }, []);

    /* ---------------- OPEN CREATE FORM ---------------- */

    const openCreateForm = () => {

        setEditId("");

        setForm({
            category: "",
            course: "",
            batch: "",
            trainer: "",
            assignDate: ""
        });

        setShowForm(true);
    };

    /* ---------------- EDIT ---------------- */

    const handleEdit = (data: any) => {

        setEditId(data._id);

        setForm({
            category: data.category?._id,
            course: data.course?._id,
            batch: data.batch?._id,
            trainer: data.trainer?._id,
            assignDate: data.assignDate?.slice(0, 10)
        });

        setShowForm(true);
    };

    /* ---------------- SUBMIT ---------------- */

    const handleSubmit = async (e: any) => {

        e.preventDefault();

        try {

            if (editId) {

                await axios.patch(
                    `http://localhost:5000/api/v1/assign-trainer/${editId}`,
                    form
                );

                toast.success("Assignment updated");

            } else {

                await axios.post(
                    "http://localhost:5000/api/v1/assign-trainer/create-assign-trainer",
                    form
                );

                toast.success("Trainer assigned");

            }

            setShowForm(false);
            fetchAssignments();

        } catch {

            toast.error("Operation failed");

        }

    };

    /* ---------------- DELETE ---------------- */

    const removeAssignment = async (id: string) => {

        await axios.delete(
            `http://localhost:5000/api/v1/assign-trainer/${id}`
        );

        fetchAssignments();
    };

    return (

        <div className="max-w-6xl mx-auto bg-white shadow p-8 rounded-lg">

            {/* HEADER */}

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-2xl font-bold">
                    Assigned Trainer List
                </h1>

                {!showForm && (
                    <button
                        onClick={openCreateForm}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
                    >
                        Assign Trainer
                    </button>
                )}

            </div>


            {/* ================= TABLE ================= */}

            {!showForm && (

                <table className="w-full border">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Batch</th>
                            <th>Course</th>
                            <th>Category</th>
                            <th>Trainer</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {assignments.map((a: any, i) => (

                            <tr key={a._id} className="text-center border">

                                <td>{i + 1}</td>

                                <td>{a.batch?.batchName}</td>

                                <td>{a.course?.name}</td>

                                <td>{a.category?.name}</td>

                                <td>{a.trainer?.fullName}</td>

                                <td>
                                    {new Date(a.assignDate).toLocaleDateString()}
                                </td>

                                <td className="space-x-2">

                                    <button
                                        onClick={() => handleEdit(a)}
                                        className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-700 transition"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => removeAssignment(a._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-600 transition"
                                    >
                                        Remove
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}


            {/* ================= FORM ================= */}

            {showForm && (

                <form onSubmit={handleSubmit} className="space-y-4">

                    <h2 className="text-xl font-semibold">
                        {editId ? "Edit Assignment" : "Assign Trainer"}
                    </h2>

                    <select
                        className="w-full border p-2"
                        value={form.category}
                        onChange={(e) =>
                            setForm({ ...form, category: e.target.value })
                        }
                    >
                        <option>Select Category</option>

                        {categories.map((c: any) => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}

                    </select>


                    <select
                        className="w-full border p-2"
                        value={form.course}
                        onChange={(e) =>
                            setForm({ ...form, course: e.target.value })
                        }
                    >
                        <option>Select Course</option>

                        {courses.map((c: any) => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}

                    </select>


                    <select
                        className="w-full border p-2"
                        value={form.batch}
                        onChange={(e) =>
                            setForm({ ...form, batch: e.target.value })
                        }
                    >
                        <option>Select Batch</option>

                        {batches.map((b: any) => (
                            <option key={b._id} value={b._id}>
                                {b.batchName}
                            </option>
                        ))}

                    </select>


                    <select
                        className="w-full border p-2"
                        value={form.trainer}
                        onChange={(e) =>
                            setForm({ ...form, trainer: e.target.value })
                        }
                    >
                        <option>Select Trainer</option>

                        {trainers.map((t: any) => (
                            <option key={t._id} value={t._id}>
                                {t.fullName}
                            </option>
                        ))}

                    </select>


                    <input
                        type="date"
                        className="w-full border p-2"
                        value={form.assignDate}
                        onChange={(e) =>
                            setForm({ ...form, assignDate: e.target.value })
                        }
                    />


                    <div className="flex gap-3">

                        <button className="bg-green-600 text-white px-6 py-2 rounded">
                            {editId ? "Update" : "Assign"}
                        </button>

                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="bg-gray-500 text-white px-6 py-2 rounded cursor-pointer hover:bg-gray-600 transition"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            )}

        </div>

    );
}