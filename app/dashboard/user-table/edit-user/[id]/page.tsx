"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

type UserForm = {
    name: string;
    email: string;
    phone: string;
    address: string;
};

const EditUserPage = () => {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const [form, setForm] = useState<UserForm>({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    // 🔹 1. FETCH SINGLE USER (GET /api/user/:id)
    useEffect(() => {
        const loadUser = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/users/edit/${id}`);

                if (!res.ok) {
                    alert("User not found");
                    router.push("/dashboard/user-table");
                    return;
                }

                const data = await res.json();

                setForm({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    address: data.address,
                });

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (id) loadUser();
    }, [id, router]);

    // 🔹 handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // 2. UPDATE USER (PUT /api/user/:id)
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);

        try {
            const res = await fetch(`http://localhost:5000/api/users/edit/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Update failed");
                return;
            }

            toast.success(`User updated Successfully!`, {
                autoClose: 3000,
                hideProgressBar: true,
                pauseOnHover: true,
                draggable: true,
                closeOnClick: true,

            });
            router.push("/dashboard/user-table");

        } catch (error) {
            console.error(error);
            alert("Server error");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return <h2 className="text-center mt-10">Loading user data...</h2>;
    }

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Edit User</h1>

            <form onSubmit={handleUpdate} className="flex flex-col gap-4">

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={form.address}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />

                <button
                    type="submit"
                    disabled={updating}
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    {updating ? "Updating..." : "Update User"}
                </button>

            </form>
        </div>
    );
};

export default EditUserPage;