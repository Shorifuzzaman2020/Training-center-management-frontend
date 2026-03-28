"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function EditServicePage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const [form, setForm] = useState({
        serviceName: "",
        serviceDescription: "",
        serviceDate: "",
    });

    // load service
    useEffect(() => {
        const loadService = async () => {
            const res = await fetch(`http://localhost:5000/api/services/${id}`);
            const data = await res.json();
            setForm(data);
        };
        if (id) loadService();
    }, [id]);

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const res = await fetch(`http://localhost:5000/api/services/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            toast.success("Service updated!");
            router.push("/dashboard/services");
        } else {
            toast.error("Update failed");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Edit Service</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <input
                    name="serviceName"
                    value={form.serviceName}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />

                <textarea
                    name="serviceDescription"
                    value={form.serviceDescription}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />

                <input
                    type="date"
                    name="serviceDate"
                    value={form.serviceDate?.slice(0,10)}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />

                <button className="bg-blue-600 text-white py-2 rounded">
                    Update Service
                </button>

            </form>
        </div>
    );
}