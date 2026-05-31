
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

export default function TrainingManagementPage() {
    const [trainings, setTrainings] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);

    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState("");
    const [loading, setLoading] = useState(false); 

    const [banner, setBanner] = useState<File | null>(null);
    const [gallery, setGallery] = useState<File[]>([]);

    const [facilityInput, setFacilityInput] = useState("");
    const [facilities, setFacilities] = useState<string[]>([]);

    const [form, setForm] = useState({
        course: "",
        category: "",
        banner: "",
        gallary: "",
        shortDescription: "",
        longDescription: ""
    });

    /* ---------------- FETCH DATA ---------------- */
    const fetchTrainings = async () => {
        const res = await axios.get("http://localhost:5000/api/v1/trainings");
        setTrainings(res.data.data);
    };

    const fetchCourses = async () => {
        const res = await axios.get("http://localhost:5000/api/v1/courses");
        setCourses(res.data.data);
    };

    const fetchCategories = async () => {
        const res = await axios.get("http://localhost:5000/api/v1/categories");
        setCategories(res.data.data);
    };

    useEffect(() => {
        fetchTrainings();
        fetchCourses();
        fetchCategories();
    }, []);

    /* ---------------- ADD FACILITY ---------------- */
    const addFacility = () => {
        if (!facilityInput.trim()) return;
        setFacilities([...facilities, facilityInput]);
        setFacilityInput("");
    };

    const removeFacility = (index: number) => {
        const updated = [...facilities];
        updated.splice(index, 1);
        setFacilities(updated);
    };

    /* ---------------- OPEN CREATE FORM ---------------- */
    const openCreateForm = () => {
        setEditId("");
        setForm({
            course: "",
            category: "",
            banner: "",
            gallary: "",
            shortDescription: "",
            longDescription: ""
        });
        setFacilities([]);
        setBanner(null);
        setGallery([]);
        setShowForm(true);
    };

    /* ---------------- EDIT ---------------- */
    const handleEdit = (training: any) => {
        setEditId(training._id);
        setForm({
            course: training.course?._id || "",
            category: training.category?._id || "",
            banner: training.bannerImage || "",
            gallary: training.galleryImages || "",
            shortDescription: training.shortDescription || "",
            longDescription: training.longDescription || ""
        });
        setFacilities(training.facilities || []);
        setBanner(null);
        setGallery([]);
        setShowForm(true);
    };

    /* ---------------- DELETE ---------------- */
    const deleteTraining = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/trainings/${id}`);
            toast.success("Training deleted");
            fetchTrainings();
        } catch (error: any) {
            toast.error("Failed to delete training");
        }
    };

    /* ---------------- SUBMIT (OPTIMIZED) ---------------- */
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true); 

        const data = new FormData();
        data.append("course", form.course);
        data.append("category", form.category);
        data.append("shortDescription", form.shortDescription);
        data.append("longDescription", form.longDescription);

        const options = {
            maxSizeMB: 0.5, 
            maxWidthOrHeight: 1280,
            useWebWorker: true 
        };

        try {
            
            if (banner) {
                try {
                    const compressedBanner = await imageCompression(banner, options);
                    data.append("bannerImage", compressedBanner);
                } catch (error) {
                    data.append("bannerImage", banner);
                }
            }

            
            if (gallery.length > 0) {
                const compressionPromises = gallery.map(async (img) => {
                    try {
                        return await imageCompression(img, options);
                    } catch (error) {
                        return img;
                    }
                });
                
                const compressedImages = await Promise.all(compressionPromises);
                compressedImages.forEach((img) => data.append("galleryImages", img));
            }

            facilities.forEach(f => data.append("facilities", f));

            if (editId) {
                await axios.patch(`http://localhost:5000/api/v1/trainings/${editId}`, data);
                toast.success("Training updated successfully");
            } else {
                await axios.post("http://localhost:5000/api/v1/trainings/create-training", data);
                toast.success("Training created successfully");
            }

            setShowForm(false);
            fetchTrainings();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Operation failed");
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-10 bg-white shadow rounded">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Training List</h1>
                {!showForm && (
                    <button
                        onClick={openCreateForm}
                        className="bg-blue-600 text-white px-5 py-2 rounded cursor-pointer hover:bg-blue-700 transition"
                    >
                        Create Training
                    </button>
                )}
            </div>

            {/* ================= TABLE ================= */}
            {!showForm && (
                <table className="w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">Training</th>
                            <th className="p-2 border">Category</th>
                            <th className="p-2 border">Facilities</th>
                            <th className="p-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainings.map((t) => (
                            <tr key={t._id} className="text-center border">
                                <td className="p-2 border">{t.course?.name}</td>
                                <td className="p-2 border">{t.category?.name}</td>
                                <td className="p-2 border">
                                    {t.facilities?.map((f: string, i: number) => (
                                        <span key={i} className="bg-blue-100 px-2 py-1 rounded mr-1 text-sm">
                                            {f}
                                        </span>
                                    ))}
                                </td>
                                <td className="p-2 border space-x-2">
                                    <button
                                        onClick={() => handleEdit(t)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-600 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteTraining(t._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-600 transition"
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
                        {editId ? "Edit Training" : "Create Training"}
                    </h2>

                    {/* Course */}
                    <select
                        className="w-full border p-3 rounded"
                        value={form.course}
                        onChange={(e) => setForm({ ...form, course: e.target.value })}
                        required
                    >
                        <option value="">Select Training</option>
                        {courses.map((c: any) => (
                            <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                    </select>

                    {/* Category */}
                    <select
                        className="w-full border p-3 rounded"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((c: any) => (
                            <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                    </select>

                    {/* Short Description */}
                    <textarea
                        rows={3}
                        className="w-full border p-3 rounded"
                        placeholder="Short Description"
                        value={form.shortDescription}
                        onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                    />

                    {/* Long Description */}
                    <textarea
                        rows={5}
                        className="w-full border p-3 rounded"
                        placeholder="Long Description"
                        value={form.longDescription}
                        onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
                    />

                    {/* Banner Image */}
                    <div>
                        <label className="block mb-2 font-medium">Training Banner Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border p-2 rounded-md"
                            onChange={(e) => setBanner(e.target.files?.[0] || null)}
                        />
                    </div>

                    {/* Gallery Images */}
                    <div>
                        <label className="block mb-2 font-medium">Training Gallery Images</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="w-full border p-2 rounded-md"
                            onChange={(e) => setGallery(Array.from(e.target.files || []))}
                        />
                    </div>

                    {/* Facilities */}
                    <div>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                placeholder="Add facility"
                                value={facilityInput}
                                onChange={(e) => setFacilityInput(e.target.value)}
                                className="border p-2 w-full rounded"
                            />
                            <button
                                type="button"
                                onClick={addFacility}
                                className="bg-green-600 text-white px-4 rounded cursor-pointer hover:bg-green-700 transition"
                            >
                                Add
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {facilities.map((f, i) => (
                                <span key={i} className="bg-blue-200 px-3 py-1 rounded flex items-center gap-2">
                                    {f}
                                    <button type="button" onClick={() => removeFacility(i)} className="text-red-600">×</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* ACTIONS BUTTONS */}
                    <div className="flex gap-3">
                        <button 
                            type="submit"
                            disabled={loading} 
                            className="bg-blue-600 text-white px-6 py-2 rounded cursor-pointer hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? "Processing & Uploading..." : editId ? "Update Training" : "Save Training Page"}
                        </button>

                        <button
                            type="button"
                            disabled={loading}
                            onClick={() => setShowForm(false)}
                            className="bg-gray-500 text-white px-6 py-2 rounded cursor-pointer hover:bg-gray-600 transition disabled:bg-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}