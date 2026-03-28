// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Image from "next/image";

// type Category = {
//     _id: string;
//     name: string;
//     description?: string;
//     iconUrl?: string;
// };

// export default function CategoryManagementPage() {
//     const [categories, setCategories] = useState<Category[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [preview, setPreview] = useState<string | null>(null);

//     const [formData, setFormData] = useState({
//         name: "",
//         description: "",
//         icon: null as File | null,
//     });

//     /* FETCH CATEGORIES */
//     const fetchCategories = async () => {
//         try {
//             const res = await axios.get(
//                 "http://localhost:5000/api/v1/categories"
//             );
//             setCategories(res.data.data);
//         } catch (error) {
//             toast.error("Failed to load categories");
//         }
//     };

//     useEffect(() => {
//         fetchCategories();
//     }, []);

//     /* HANDLE IMAGE */
//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         setFormData({ ...formData, icon: file });
//         setPreview(URL.createObjectURL(file));
//     };

//     /*  CREATE CATEGORY */
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!formData.icon) {
//             toast.error("Icon is required");
//             return;
//         }

//         setLoading(true);

//         const data = new FormData();
//         data.append("name", formData.name);
//         data.append("description", formData.description);
//         data.append("icon", formData.icon);

//         try {
//             await axios.post(
//                 "http://localhost:5000/api/v1/categories/create-category",
//                 data
//             );

//             toast.success("Category created successfully 🎉");

//             setFormData({ name: "", description: "", icon: null });
//             setPreview(null);

//             fetchCategories();

//         } catch (error: any) {
//             toast.error(error?.response?.data?.message || "Creation failed");
//         }

//         setLoading(false);
//     };

//     /*  DELETE CATEGORY  */
//     const handleDelete = async (id: string) => {
//         if (!confirm("Are you sure you want to delete this category?")) return;

//         try {
//             await axios.delete(
//                 `http://localhost:5000/api/v1/categories/${id}`
//             );

//             toast.success("Category deleted");
//             setCategories(prev => prev.filter(cat => cat._id !== id));

//         } catch (error) {
//             toast.error("Delete failed");
//         }
//     };

//     /*  RESET */
//     const handleReset = () => {
//         setFormData({ name: "", description: "", icon: null });
//         setPreview(null);
//     };

//     return (
//         <div className="bg-gray-100 min-h-screen p-8">
//             <div className="max-w-6xl mx-auto space-y-8">

//                 {/*FORM CARD  */}
//                 <div className="bg-white shadow rounded-lg">

//                     <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg">
//                         <h1 className="text-xl font-semibold">
//                             Create Training Category
//                         </h1>
//                     </div>

//                     <form onSubmit={handleSubmit} className="p-6 space-y-6">

//                         {/* Category Name */}
//                         <div>
//                             <label className="block mb-2 font-medium">
//                                 Category Name
//                             </label>
//                             <input
//                                 type="text"
//                                 placeholder="Enter category name"
//                                 value={formData.name}
//                                 onChange={(e) =>
//                                     setFormData({ ...formData, name: e.target.value })
//                                 }
//                                 required
//                                 className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>

//                         {/* Description */}
//                         <div>
//                             <label className="block mb-2 font-medium">
//                                 Description
//                             </label>
//                             <textarea
//                                 rows={4}
//                                 value={formData.description}
//                                 onChange={(e) =>
//                                     setFormData({ ...formData, description: e.target.value })
//                                 }
//                                 className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>

//                         {/* Icon Upload */}
//                         <div>
//                             <label className="block mb-2 font-medium">
//                                 Category Icon
//                             </label>

//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={handleImageChange}
//                                 className="w-full border rounded-md p-2"
//                             />

//                             {preview && (
//                                 <Image
//                                     src={preview}
//                                     alt="Preview"
//                                     width={120}
//                                     height={120}
//                                     className="mt-4 rounded-md border"
//                                 />
//                             )}
//                         </div>

//                         {/* Buttons */}
//                         <div className="flex gap-4">
//                             <button
//                                 type="submit"
//                                 disabled={loading}
//                                 className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
//                             >
//                                 {loading ? "Saving..." : "Save Category"}
//                             </button>

//                             <button
//                                 type="button"
//                                 onClick={handleReset}
//                                 className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
//                             >
//                                 Reset
//                             </button>
//                         </div>

//                     </form>
//                 </div>

//                 {/* CATEGORY TABLE  */}
//                 <div className="bg-white shadow rounded-lg p-6">
//                     <h2 className="text-xl font-semibold mb-4">
//                         Category List
//                     </h2>

//                     <div className="overflow-x-auto">
//                         <table className="w-full border border-gray-200">
//                             <thead className="bg-gray-100">
//                                 <tr>
//                                     {/* <th className="p-3 border">Icon</th> */}
//                                     <th className="p-3 border">Name</th>
//                                     <th className="p-3 border">Description</th>
//                                     <th className="p-3 border text-center">Action</th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 {categories.map((cat) => (
//                                     <tr key={cat._id} className="hover:bg-gray-50">
//                                         {/* <td className="p-3 border">
//                                             {cat.iconUrl && (
//                                                 <Image
//                                                     src={cat.iconUrl}
//                                                     alt={cat.name}
//                                                     width={50}
//                                                     height={50}
//                                                     className="rounded"
//                                                 />
//                                             )}
//                                         </td> */}

//                                         <td className="p-3 border font-medium">
//                                             {cat.name}
//                                         </td>

//                                         <td className="p-3 border">
//                                             {cat.description}
//                                         </td>

//                                         <td className="p-3 border text-center">
//                                             <button
//                                                 onClick={() => handleDelete(cat._id)}
//                                                 className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
//                                             >
//                                                 Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>

//                         {categories.length === 0 && (
//                             <p className="text-center text-gray-500 mt-4">
//                                 No categories found
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
import Image from "next/image";

type Category = {
    _id: string;
    name: string;
    description?: string;
    iconUrl?: string;
};

export default function CategoryManagementPage() {

    const [categories, setCategories] = useState<Category[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState("");

    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        icon: null as File | null
    });

    /* ---------------- FETCH ---------------- */

    const fetchCategories = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/v1/categories"
            );

            setCategories(res.data.data);

        } catch {

            toast.error("Failed to load categories");

        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    /* ---------------- OPEN CREATE ---------------- */

    const openCreateForm = () => {

        setEditId("");

        setFormData({
            name: "",
            description: "",
            icon: null
        });

        setPreview(null);

        setShowForm(true);
    };

    /* ---------------- EDIT ---------------- */

    const handleEdit = (cat: Category) => {

        setEditId(cat._id);

        setFormData({
            name: cat.name,
            description: cat.description || "",
            icon: null
        });

        setPreview(cat.iconUrl || null);

        setShowForm(true);
    };

    /* ---------------- IMAGE ---------------- */

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];
        if (!file) return;

        setFormData({ ...formData, icon: file });
        setPreview(URL.createObjectURL(file));
    };

    /* ---------------- SUBMIT ---------------- */

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        const data = new FormData();

        data.append("name", formData.name);
        data.append("description", formData.description);

        if (formData.icon) {
            data.append("icon", formData.icon);
        }

        try {

            if (editId) {

                await axios.patch(
                    `http://localhost:5000/api/v1/categories/${editId}`,
                    data
                );

                toast.success("Category updated");

            } else {

                await axios.post(
                    "http://localhost:5000/api/v1/categories/create-category",
                    data
                );

                toast.success("Category created");

            }

            setShowForm(false);

            fetchCategories();

        } catch (error: any) {

            toast.error(error?.response?.data?.message || "Operation failed");

        }
    };

    /* ---------------- DELETE ---------------- */

    const handleDelete = async (id: string) => {

        if (!confirm("Delete this category?")) return;

        await axios.delete(
            `http://localhost:5000/api/v1/categories/${id}`
        );

        toast.success("Category deleted");

        fetchCategories();
    };

    return (

        <div className="bg-gray-100 min-h-screen p-8">

            <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-8">

                {/* HEADER */}

                <div className="flex justify-between items-center mb-6">

                    <h1 className="text-2xl font-bold">
                        Category List
                    </h1>

                    {!showForm && (
                        <button
                            onClick={openCreateForm}
                            className="bg-blue-600 text-white px-5 py-2 rounded"
                        >
                            Create Category
                        </button>
                    )}

                </div>


                {/* ================= TABLE ================= */}

                {!showForm && (

                    <table className="w-full border">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="p-3 border">Name</th>
                                <th className="p-3 border">Description</th>
                                <th className="p-3 border text-center">Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {categories.map((cat) => (

                                <tr key={cat._id} className="hover:bg-gray-50">

                                    <td className="p-3 border font-medium">
                                        {cat.name}
                                    </td>

                                    <td className="p-3 border">
                                        {cat.description}
                                    </td>

                                    <td className="p-3 border text-center space-x-2">

                                        <button
                                            onClick={() => handleEdit(cat)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(cat._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}


                {/* ================= FORM ================= */}

                {showForm && (

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <h2 className="text-xl font-semibold">
                            {editId ? "Edit Category" : "Create Category"}
                        </h2>


                        {/* NAME */}

                        <div>

                            <label className="block mb-2 font-medium">
                                Category Name
                            </label>

                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                className="w-full border p-3 rounded"
                                required
                            />

                        </div>


                        {/* DESCRIPTION */}

                        <div>

                            <label className="block mb-2 font-medium">
                                Description
                            </label>

                            <textarea
                                rows={4}
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                className="w-full border p-3 rounded"
                            />

                        </div>


                        {/* ICON */}

                        <div>

                            <label className="block mb-2 font-medium">
                                Category Icon
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="border p-2 rounded w-full"
                            />

                            {preview && (
                                <Image
                                    src={preview}
                                    alt="preview"
                                    width={120}
                                    height={120}
                                    className="mt-3 border rounded"
                                />
                            )}

                        </div>


                        {/* BUTTONS */}

                        <div className="flex gap-3">

                            <button
                                className="bg-green-600 text-white px-6 py-2 rounded"
                            >
                                {editId ? "Update Category" : "Save Category"}
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="bg-gray-500 text-white px-6 py-2 rounded"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                )}

            </div>

        </div>
    );
}