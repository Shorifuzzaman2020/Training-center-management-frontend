"use client";

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const CreateUserPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("address", address);

            const res = await fetch("http://localhost:5000/api/users", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Failed to create user");
            }

            const data = await res.json();

            //SUCCESS TOAST
                toast.success(`User created Successfully!`, {
                autoClose: 3000,
                hideProgressBar: true,
                pauseOnHover: true,
                draggable: true,
                closeOnClick: true,

            });

            // reset form
            setName("");
            setEmail("");
            setPhone("");
            setAddress("");

        } catch (err: any) {

            toast.error(err.message || "Something went wrong");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Create New User</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block mb-1 font-semibold">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Phone</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    {loading ? "Creating..." : "Create User"}
                </button>
            </form>

            {/* {message && (
                <ToastContainer position="top-right" />
            )} */}
        </div>
    );
};

export default CreateUserPage;