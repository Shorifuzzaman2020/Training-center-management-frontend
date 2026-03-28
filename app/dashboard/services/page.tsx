"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

const CreateServicePage = () => {
    const [serviceName, setServiceName] = useState("");
    const [serviceDescription, setServiceDescription] = useState("");
    const [serviceDate, setServiceDate] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/services", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    serviceName,
                    serviceDescription,
                    serviceDate,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to create service");
            }

            // Success Toast
            toast.success("Service created successfully!", {
                autoClose: 2000,
                hideProgressBar: true,
            });

            // Reset form
            setServiceName("");
            setServiceDescription("");
            setServiceDate("");

        } catch (err: any) {
            toast.error(err.message || "Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Create New Service</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* Service Name */}
                <div>
                    <label className="block mb-1 font-semibold">Service Name</label>
                    <input
                        type="text"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        required
                        className="w-full border p-2 rounded"
                        placeholder="Enter service name"
                    />
                </div>

                {/* Service Description */}
                <div>
                    <label className="block mb-1 font-semibold">Service Description</label>
                    <textarea
                        value={serviceDescription}
                        onChange={(e) => setServiceDescription(e.target.value)}
                        required
                        rows={4}
                        className="w-full border p-2 rounded"
                        placeholder="Enter service description"
                    />
                </div>

                {/* Service Date */}
                <div>
                    <label className="block mb-1 font-semibold">Service Date</label>
                    <input
                        type="date"
                        value={serviceDate}
                        onChange={(e) => setServiceDate(e.target.value)}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    {loading ? "Creating..." : "Create Service"}
                </button>

            </form>
        </div>
    );
};

export default CreateServicePage;