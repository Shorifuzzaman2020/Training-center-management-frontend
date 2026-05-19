// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function NoticePage() {

//     const [notices, setNotices] = useState<any[]>([]);
//     const [showForm, setShowForm] = useState(false);
//     const [editId, setEditId] = useState<string | null>(null);

//     const [formData, setFormData] = useState({
//         title: "",
//         description: "",
//         publishDate: "",
//     });

//     const [file, setFile] = useState<File | null>(null);

//     const fetchNotices = async () => {

//         const res = await axios.get(
//             "http://localhost:5000/api/v1/notices"
//         );

//         setNotices(res.data.data);

//     };

//     useEffect(() => {
//         fetchNotices();
//     }, []);

//     const handleSubmit = async (e: any) => {

//         e.preventDefault();

//         const data = new FormData();

//         data.append("title", formData.title);
//         data.append("description", formData.description);
//         data.append("publishDate", formData.publishDate);

//         if (file) data.append("file", file);

//         try {

//             if (editId) {

//                 await axios.patch(
//                     `http://localhost:5000/api/v1/notices/${editId}`,
//                     formData
//                 );

//                 toast.success("Notice updated");

//             } else {

//                 await axios.post(
//                     "http://localhost:5000/api/v1/notices/create-notice",
//                     data
//                 );

//                 toast.success("Notice published");

//             }

//             setShowForm(false);

//             fetchNotices();

//         } catch (error: any) {

//             console.log("FULL ERROR:", error);

//             console.log("SERVER ERROR:", error.response?.data);

//             toast.error(
//                 error?.response?.data?.message || "Operation failed"
//             );

//         }

//     };

//     const deleteNotice = async (id: string) => {

//         if (!confirm("Delete notice?")) return;

//         await axios.delete(
//             `http://localhost:5000/api/v1/notices/${id}`
//         );

//         fetchNotices();

//     };

//     return (

//         <div className="max-w-6xl mx-auto p-10">

//             {!showForm && (

//                 <div>

//                     <div className="flex justify-between mb-5">

//                         <h1 className="text-2xl font-bold">
//                             Notice Management
//                         </h1>

//                         <button
//                             onClick={() => setShowForm(true)}
//                             className="bg-indigo-600 text-white px-6 py-2 rounded"
//                         >
//                             Publish Notice
//                         </button>

//                     </div>

//                     <table className="w-full border">

//                         <thead>

//                             <tr>
//                                 <th>Title</th>
//                                 <th>Publish Date</th>
//                                 <th>Action</th>
//                             </tr>

//                         </thead>

//                         <tbody>

//                             {notices.map((n) => (

//                                 <tr key={n._id}>

//                                     <td>{n.title}</td>

//                                     <td>
//                                         {new Date(n.publishDate).toLocaleString()}
//                                     </td>

//                                     <td>

//                                         <button
//                                             onClick={() => {
//                                                 setEditId(n._id);
//                                                 setShowForm(true);
//                                                 setFormData(n);
//                                             }}
//                                         >
//                                             Edit
//                                         </button>

//                                         <button
//                                             onClick={() => deleteNotice(n._id)}
//                                         >
//                                             Delete
//                                         </button>

//                                     </td>

//                                 </tr>

//                             ))}

//                         </tbody>

//                     </table>

//                 </div>

//             )}

//             {showForm && (

//                 <form
//                     onSubmit={handleSubmit}
//                     className="space-y-4"
//                 >

//                     <input
//                         placeholder="Notice Title"
//                         value={formData.title}
//                         onChange={(e) =>
//                             setFormData({
//                                 ...formData,
//                                 title: e.target.value,
//                             })
//                         }
//                     />

//                     <textarea
//                         placeholder="Description"
//                         value={formData.description}
//                         onChange={(e) =>
//                             setFormData({
//                                 ...formData,
//                                 description: e.target.value,
//                             })
//                         }
//                     />

//                     <input
//                         type="datetime-local"
//                         value={formData.publishDate}
//                         onChange={(e) =>
//                             setFormData({
//                                 ...formData,
//                                 publishDate: e.target.value,
//                             })
//                         }
//                     />

//                     <input
//                         type="file"
//                         onChange={(e) =>
//                             setFile(e.target.files?.[0] || null)
//                         }
//                     />

//                     <button className="bg-green-600 text-white px-6 py-2 rounded">
//                         Save Notice
//                     </button>

//                 </form>

//             )}

//         </div>

//     );
// }


"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function NoticePage() {

    const [notices, setNotices] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        publishDate: "",
    });

    const [file, setFile] = useState<File | null>(null);

    const fetchNotices = async () => {
        const res = await axios.get(
            "http://localhost:5000/api/v1/notices"
        );
        setNotices(res.data.data);
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    const handleSubmit = async (e: any) => {

        e.preventDefault();

        const data = new FormData();

        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("publishDate", formData.publishDate);

        if (file) data.append("file", file);

        try {

            if (editId) {

                await axios.patch(
                    `http://localhost:5000/api/v1/notices/${editId}`,
                    formData
                );

                toast.success("Notice updated");

            } else {

                await axios.post(
                    "http://localhost:5000/api/v1/notices/create-notice",
                    data
                );

                toast.success("Notice published");

            }

            setShowForm(false);
            setEditId(null);
            setFormData({
                title: "",
                description: "",
                publishDate: "",
            });

            fetchNotices();

        } catch (error: any) {

            console.log("FULL ERROR:", error);
            console.log("SERVER ERROR:", error.response?.data);

            toast.error(
                error?.response?.data?.message || "Operation failed"
            );

        }

    };

    const deleteNotice = async (id: string) => {

        if (!confirm("Delete notice?")) return;

        await axios.delete(
            `http://localhost:5000/api/v1/notices/${id}`
        );

        toast.success("Notice deleted");
        fetchNotices();

    };

    return (

        <div className="max-w-7xl mx-auto p-8">

            {/* ================= HEADER ================= */}

            {!showForm && (

                <div className="bg-white shadow-md rounded-xl p-6">

                    <div className="flex justify-between items-center mb-6">

                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                Notice Management
                            </h1>
                            <p className="text-gray-500 text-sm">
                                Publish and manage all notices
                            </p>
                        </div>

                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow"
                        >
                            + Publish Notice
                        </button>

                    </div>

                    {/* ================= TABLE ================= */}

                    <div className="overflow-x-auto">

                        <table className="w-full border rounded-lg overflow-hidden">

                            <thead className="bg-indigo-50">

                                <tr className="text-left">

                                    <th className="p-4 font-semibold">Title</th>
                                    <th className="p-4 font-semibold">Publish Date</th>
                                    <th className="p-4 font-semibold text-center">Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {notices.map((n) => (

                                    <tr
                                        key={n._id}
                                        className="border-t hover:bg-gray-50 transition"
                                    >

                                        <td className="p-4 font-medium text-gray-700">
                                            {n.title}
                                        </td>

                                        <td className="p-4 text-gray-500">
                                            {new Date(n.publishDate).toLocaleString()}
                                        </td>

                                        <td className="p-4 flex justify-center gap-3">

                                            <button
                                                onClick={() => {
                                                    setEditId(n._id);
                                                    setShowForm(true);
                                                    setFormData(n);
                                                }}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => deleteNotice(n._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md"
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                        {notices.length === 0 && (
                            <p className="text-center text-gray-500 mt-6">
                                No notices published yet
                            </p>
                        )}

                    </div>

                </div>

            )}

            {/* ================= FORM ================= */}

            {showForm && (

                <div className="bg-white shadow-md rounded-xl p-8 max-w-3xl mx-auto">

                    <h2 className="text-2xl font-bold mb-6 text-gray-800">

                        {editId ? "Edit Notice" : "Publish New Notice"}

                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div>

                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Notice Title
                            </label>

                            <input
                                type="text"
                                placeholder="Enter notice title"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        title: e.target.value,
                                    })
                                }
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                required
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Description
                            </label>

                            <textarea
                                rows={4}
                                placeholder="Enter notice description"
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Publish Date & Time
                            </label>

                            <input
                                type="datetime-local"
                                value={formData.publishDate}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        publishDate: e.target.value,
                                    })
                                }
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                required
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Upload File (Optional)
                            </label>

                            <input
                                type="file"
                                onChange={(e) =>
                                    setFile(e.target.files?.[0] || null)
                                }
                                className="w-full border rounded-lg p-2"
                            />

                        </div>

                        <div className="flex gap-4 pt-2">

                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                            >
                                {editId ? "Update Notice" : "Publish Notice"}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setEditId(null);
                                }}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            )}

        </div>

    );

}