// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// type Course = {
//     _id: string;
//     name: string;
//     description?: string;
// };

// export default function CourseManagementPage() {
//     const [courses, setCourses] = useState<Course[]>([]);
//     const [loading, setLoading] = useState(false);

//     const [formData, setFormData] = useState({
//         name: "",
//         description: "",
//     });

//     /* ---------------- FETCH COURSES ---------------- */
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

//     useEffect(() => {
//         fetchCourses();
//     }, []);

//     /* ---------------- CREATE COURSE ---------------- */
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             await axios.post(
//                 "http://localhost:5000/api/v1/courses/create-course",
//                 formData
//             );

//             toast.success("Course created successfully 🎉");
//             setFormData({ name: "", description: "" });
//             fetchCourses();
//         } catch (error: any) {
//             toast.error(error?.response?.data?.message || "Creation failed");
//         }

//         setLoading(false);
//     };

//     /* ---------------- DELETE COURSE ---------------- */
//     const handleDelete = async (id: string) => {
//         if (!confirm("Are you sure you want to delete this course?")) return;

//         try {
//             await axios.delete(
//                 `http://localhost:5000/api/v1/courses/${id}`
//             );

//             toast.success("Course deleted");
//             setCourses((prev) =>
//                 prev.filter((course) => course._id !== id)
//             );
//         } catch (error: any) {
//             toast.error("Delete failed");
//         }
//     };

//     return (
//         <div className="bg-gray-100 min-h-screen p-8">
//             <div className="max-w-5xl mx-auto space-y-8">

//                 {/* PAGE TITLE */}
//                 <div className="bg-white shadow rounded-xl p-6">
//                     <h1 className="text-3xl font-bold">Course Management</h1>
//                     <p className="text-gray-500">
//                         Create and manage training courses
//                     </p>
//                 </div>

//                 {/* CREATE COURSE */}
//                 <div className="bg-white shadow rounded-xl p-6">
//                     <h2 className="text-xl font-semibold mb-4">
//                         Create New Course
//                     </h2>

//                     <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

//                         <div className="flex flex-col">
//                             <label className="mb-1 font-medium">Course Name</label>
//                             <input
//                                 type="text"
//                                 value={formData.name}
//                                 onChange={(e) =>
//                                     setFormData({ ...formData, name: e.target.value })
//                                 }
//                                 required
//                                 className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>

//                         <div className="flex flex-col">
//                             <label className="mb-1 font-medium">Description</label>
//                             <input
//                                 type="text"
//                                 value={formData.description}
//                                 onChange={(e) =>
//                                     setFormData({ ...formData, description: e.target.value })
//                                 }
//                                 className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>

//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="col-span-2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
//                         >
//                             {loading ? "Creating..." : "Create Course"}
//                         </button>
//                     </form>
//                 </div>

//                 {/* COURSE TABLE */}
//                 <div className="bg-white shadow rounded-xl p-6">
//                     <h2 className="text-xl font-semibold mb-4">
//                         Existing Courses
//                     </h2>

//                     <div className="overflow-x-auto">
//                         <table className="w-full border border-gray-200">
//                             <thead className="bg-gray-100">
//                                 <tr>
//                                     <th className="p-3 border">Course Name</th>
//                                     <th className="p-3 border">Description</th>
//                                     <th className="p-3 border text-center">Actions</th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 {courses.map((course) => (
//                                     <tr key={course._id} className="hover:bg-gray-50">
//                                         <td className="p-3 border font-medium">
//                                             {course.name}
//                                         </td>
//                                         <td className="p-3 border">
//                                             {course.description}
//                                         </td>
//                                         <td className="p-3 border text-center">
//                                             <button
//                                                 onClick={() => handleDelete(course._id)}
//                                                 className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
//                                             >
//                                                 Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>

//                         {courses.length === 0 && (
//                             <p className="text-center text-gray-500 mt-4">
//                                 No courses found
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
    description?: string;
};

export default function CourseManagementPage() {

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const rowsPerPage = 5;

    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    /* ---------------- FETCH COURSES ---------------- */

    const fetchCourses = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/v1/courses"
            );

            setCourses(res.data.data);

        } catch {

            toast.error("Failed to load courses");

        }

    };

    useEffect(() => {
        fetchCourses();
    }, []);

    /* ---------------- SEARCH ---------------- */

    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(search.toLowerCase())
    );

    /* ---------------- PAGINATION ---------------- */

    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;

    const currentCourses = filteredCourses.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(filteredCourses.length / rowsPerPage);

    /* ---------------- OPEN CREATE FORM ---------------- */

    const openCreateForm = () => {

        setEditId(null);

        setFormData({
            name: "",
            description: "",
        });

        setShowForm(true);

    };

    /* ---------------- EDIT COURSE ---------------- */

    const handleEdit = (course: Course) => {

        setEditId(course._id);

        setFormData({
            name: course.name,
            description: course.description || "",
        });

        setShowForm(true);

    };

    /* ---------------- SUBMIT ---------------- */

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        setLoading(true);

        try {

            if (editId) {

                await axios.patch(
                    `http://localhost:5000/api/v1/courses/${editId}`,
                    formData
                );

                toast.success("Course updated successfully");

            } else {

                await axios.post(
                    "http://localhost:5000/api/v1/courses/create-course",
                    formData
                );

                toast.success("Course created successfully 🎉");

            }

            setFormData({ name: "", description: "" });

            setShowForm(false);

            fetchCourses();

        } catch (error: any) {

            toast.error(
                error?.response?.data?.message || "Creation failed"
            );

        }

        setLoading(false);

    };

    /* ---------------- DELETE COURSE ---------------- */

    const handleDelete = async (id: string) => {

        if (!confirm("Are you sure you want to delete this course?")) return;

        try {

            await axios.delete(
                `http://localhost:5000/api/v1/courses/${id}`
            );

            toast.success("Course deleted");

            fetchCourses();

        } catch {

            toast.error("Delete failed");

        }

    };

    /* ================= UI ================= */

    return (

        <div className="bg-gray-100 min-h-screen p-8">

            <div className="max-w-5xl mx-auto">

                {/* ================= TABLE VIEW ================= */}

                {!showForm && (

                    <div className="bg-white shadow rounded-xl p-6">

                        <div className="flex justify-between mb-4">

                            <h1 className="text-2xl font-bold">
                                Course Management
                            </h1>

                            <button
                                onClick={openCreateForm}
                                className="bg-indigo-600 text-white px-6 py-2 rounded"
                            >
                                Create Course
                            </button>

                        </div>

                        {/* SEARCH */}

                        <input
                            type="text"
                            placeholder="Search course..."
                            className="border p-2 w-full mb-4 rounded"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <table className="w-full border border-gray-200">

                            <thead className="bg-gray-100">

                                <tr>

                                    <th className="p-3 border">Course Name</th>

                                    <th className="p-3 border">Description</th>

                                    <th className="p-3 border text-center">Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {currentCourses.map((course) => (

                                    <tr key={course._id} className="hover:bg-gray-50">

                                        <td className="p-3 border font-medium">
                                            {course.name}
                                        </td>

                                        <td className="p-3 border">
                                            {course.description}
                                        </td>

                                        <td className="p-3 border text-center space-x-2">

                                            <button
                                                onClick={() => handleEdit(course)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(course._id)}
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
                  ${currentPage === i + 1
                                            ? "bg-indigo-600 text-white"
                                            : ""
                                        }`}
                                >
                                    {i + 1}
                                </button>

                            ))}

                        </div>

                    </div>

                )}

                {/* ================= FORM VIEW ================= */}

                {showForm && (

                    <div className="bg-white shadow rounded-xl p-6">

                        <h2 className="text-xl font-semibold mb-4">

                            {editId ? "Edit Course" : "Create New Course"}

                        </h2>

                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-2 gap-4"
                        >

                            <div className="flex flex-col">

                                <label className="mb-1 font-medium">
                                    Course Name
                                </label>

                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    required
                                    className="border rounded-lg px-3 py-2"
                                />

                            </div>

                            <div className="flex flex-col">

                                <label className="mb-1 font-medium">
                                    Description
                                </label>

                                <input
                                    type="text"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                    className="border rounded-lg px-3 py-2"
                                />

                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="col-span-2 bg-indigo-600 text-white py-2 rounded-lg"
                            >

                                {loading
                                    ? "Saving..."
                                    : editId
                                        ? "Update Course"
                                        : "Create Course"}

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