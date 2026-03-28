// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// type Role = {
//     _id: string;
//     name: string;
//     description?: string;
//     createdBy: string;
// };

// export default function RoleManagementPage() {
//     const [roles, setRoles] = useState<Role[]>([]);
//     const [loading, setLoading] = useState(false);

//     const [formData, setFormData] = useState({
//         name: "",
//         description: "",
//         createdBy: "SUPER_ADMIN_ID", // Replace later with logged in user ID
//     });

//     /* ---------------- FETCH ROLES ---------------- */
//     const fetchRoles = async () => {
//         try {
//             const res = await axios.get("http://localhost:5000/api/v1/roles");
//             setRoles(res.data.data);
//         } catch (error) {
//             toast.error("Failed to load roles");
//         }
//     };

//     useEffect(() => {
//         fetchRoles();
//     }, []);

//     /* ---------------- CREATE ROLE ---------------- */
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             await axios.post(
//                 "http://localhost:5000/api/v1/roles/create-role",
//                 formData
//             );

//             toast.success("Role created successfully 🎉");
//             setFormData({ name: "", description: "", createdBy: "SUPER_ADMIN_ID" });
//             fetchRoles();

//         } catch (error: any) {
//             toast.error(error?.response?.data?.message || "Creation failed");
//         }

//         setLoading(false);
//     };

//     /* ---------------- DELETE ROLE ---------------- */
//     const handleDelete = async (id: string) => {
//         if (!confirm("Are you sure you want to delete this role?")) return;

//         try {
//             await axios.delete(
//                 `http://localhost:5000/api/v1/roles/${id}`
//             );

//             toast.success("Role deleted");
//             setRoles(prev => prev.filter(role => role._id !== id));

//         } catch (error: any) {
//             toast.error("Delete failed");
//         }
//     };

//     return (
//         <div className="bg-gray-100 min-h-screen p-8">
//             <div className="max-w-5xl mx-auto space-y-8">

//                 {/* PAGE TITLE */}
//                 <div className="bg-white shadow rounded-xl p-6">
//                     <h1 className="text-3xl font-bold">Role Management</h1>
//                     <p className="text-gray-500">Super Admin can create and manage roles</p>
//                 </div>

//                 {/* CREATE ROLE CARD */}
//                 <div className="bg-white shadow rounded-xl p-6">
//                     <h2 className="text-xl font-semibold mb-4">Create New Role</h2>

//                     <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

//                         <div className="flex flex-col">
//                             <label className="mb-1 font-medium">Role Name</label>
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
//                             {loading ? "Creating..." : "Create Role"}
//                         </button>
//                     </form>
//                 </div>

//                 {/* ROLE TABLE */}
//                 <div className="bg-white shadow rounded-xl p-6">
//                     <h2 className="text-xl font-semibold mb-4">Existing Roles</h2>

//                     <div className="overflow-x-auto">
//                         <table className="w-full border border-gray-200">
//                             <thead className="bg-gray-100">
//                                 <tr>
//                                     <th className="p-3 border">Role Name</th>
//                                     <th className="p-3 border">Description</th>
//                                     <th className="p-3 border text-center">Actions</th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 {roles.map((role) => (
//                                     <tr key={role._id} className="hover:bg-gray-50">
//                                         <td className="p-3 border font-medium">{role.name}</td>
//                                         <td className="p-3 border">{role.description}</td>
//                                         <td className="p-3 border text-center">
//                                             <button
//                                                 onClick={() => handleDelete(role._id)}
//                                                 className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
//                                             >
//                                                 Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>

//                         {roles.length === 0 && (
//                             <p className="text-center text-gray-500 mt-4">
//                                 No roles found
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

type Role = {
    _id: string;
    name: string;
    description?: string;
};

export default function RoleManagementPage() {

    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    /* ---------------- FETCH ROLES ---------------- */

    const fetchRoles = async () => {
        try {

            const res = await axios.get(
                "http://localhost:5000/api/v1/roles"
            );

            setRoles(res.data.data);

        } catch (error) {

            toast.error("Failed to load roles");

        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    /* ---------------- OPEN CREATE FORM ---------------- */

    const openCreateForm = () => {

        setEditId(null);

        setFormData({
            name: "",
            description: "",
        });

        setShowForm(true);

    };

    /* ---------------- EDIT ROLE ---------------- */

    const handleEdit = (role: Role) => {

        setEditId(role._id);

        setFormData({
            name: role.name,
            description: role.description || "",
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
                    `http://localhost:5000/api/v1/roles/${editId}`,
                    formData
                );

                toast.success("Role updated successfully");

            } else {

                await axios.post(
                    "http://localhost:5000/api/v1/roles/create-role",
                    formData
                );

                toast.success("Role created successfully");

            }

            setShowForm(false);

            fetchRoles();

        } catch (error: any) {

            toast.error(
                error?.response?.data?.message || "Operation failed"
            );

        }

        setLoading(false);

    };

    /* ---------------- DELETE ---------------- */

    const handleDelete = async (id: string) => {

        if (!confirm("Are you sure you want to delete this role?"))
            return;

        try {

            await axios.delete(
                `http://localhost:5000/api/v1/roles/${id}`
            );

            toast.success("Role deleted");

            fetchRoles();

        } catch {

            toast.error("Delete failed");

        }

    };

    return (

        <div className="bg-gray-100 min-h-screen p-8">

            <div className="max-w-5xl mx-auto bg-white shadow rounded-lg p-6">

                {/* ================= TABLE ================= */}

                {!showForm && (

                    <>
                        <div className="flex justify-between mb-4">

                            <h1 className="text-2xl font-bold">
                                Role Management
                            </h1>

                            <button
                                onClick={openCreateForm}
                                className="bg-indigo-600 text-white px-6 py-2 rounded"
                            >
                                Create Role
                            </button>

                        </div>

                        <table className="w-full border">

                            <thead className="bg-gray-100">

                                <tr>

                                    <th className="p-3 border">Role Name</th>

                                    <th className="p-3 border">Description</th>

                                    <th className="p-3 border text-center">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {roles.map((role) => (

                                    <tr key={role._id} className="text-center">

                                        <td className="p-3 border font-medium">
                                            {role.name}
                                        </td>

                                        <td className="p-3 border">
                                            {role.description}
                                        </td>

                                        <td className="p-3 border space-x-2">

                                            <button
                                                onClick={() => handleEdit(role)}
                                                className="bg-blue-500 text-white px-4 py-1 rounded"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(role._id)}
                                                className="bg-red-500 text-white px-4 py-1 rounded"
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                        {roles.length === 0 && (
                            <p className="text-center text-gray-500 mt-4">
                                No roles found
                            </p>
                        )}

                    </>
                )}

                {/* ================= FORM ================= */}

                {showForm && (

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        <h2 className="text-xl font-semibold">
                            {editId ? "Edit Role" : "Create Role"}
                        </h2>

                        <div className="flex flex-col">

                            <label className="mb-1 font-medium">
                                Role Name
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

                        <div className="flex gap-3">

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-indigo-600 text-white px-6 py-2 rounded"
                            >
                                {loading
                                    ? "Saving..."
                                    : editId
                                        ? "Update Role"
                                        : "Create Role"}
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