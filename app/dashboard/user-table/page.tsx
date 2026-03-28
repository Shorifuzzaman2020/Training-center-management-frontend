"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type User = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
};


const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch Users
    const fetchUsers = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/v1/employees");
            const result = await res.json();
            setUsers(result.data);
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // DELETE USER
    const handleDelete = async (id: string) => {
        const confirmDelete = confirm("Are you sure?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://localhost:5000/api/users/user/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message);
                return;
            }

            // now remove from UI
            setUsers(prev => prev.filter(user => user._id !== id));
            toast.success("User deleted successfully!", {
                autoClose: 2000,
                hideProgressBar: true,
                pauseOnHover: true,
                draggable: true,
                closeOnClick: true,
            })

        } catch (error) {
            console.error(error);
        }
    };

    // EDIT USER (redirect)
    const handleEdit = (id: string) => {
        window.location.href = `/dashboard/user-table/edit-user/${id}`;
    };

    if (loading) return <h2 className="text-center mt-10">Loading users...</h2>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">User Management</h1>

            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Email</th>
                            <th className="p-3 border">Phone</th>
                            <th className="p-3 border">Address</th>
                            <th className="p-3 border text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="p-3 border">{user.name}</td>
                                <td className="p-3 border">{user.email}</td>
                                <td className="p-3 border">{user.phone}</td>
                                <td className="p-3 border">{user.address}</td>

                                <td className="p-3 border text-center space-x-2">
                                    {/* EDIT BUTTON */}
                                    <button
                                        onClick={() => handleEdit(user._id)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
                                    >
                                        Edit
                                    </button>

                                    {/* DELETE BUTTON */}
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {users.length === 0 && (
                    <p className="text-center mt-6 text-gray-500">No users found</p>
                )}
            </div>
        </div>
    );
};

export default UsersPage;