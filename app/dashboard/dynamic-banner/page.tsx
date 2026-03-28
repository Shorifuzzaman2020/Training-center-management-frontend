
// "use client";


// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { toast } from "react-toastify";

// const Page = () => {
//     const [heading, setHeading] = useState("");
//     const [subHeading, setSubHeading] = useState("");
//     const [image, setImage] = useState<File | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");
//     const router = useRouter();
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!image) {
//             setMessage("Please select an image");
//             return;
//         }

//         setLoading(true);
//         setMessage("");

//         try {
//             const formData = new FormData();
//             formData.append("heading", heading);
//             formData.append("subHeading", subHeading);
//             formData.append("image", image);

//             const res = await fetch("http://localhost:5000/api/v1/banners/create-banner", {
//                 method: "POST",
//                 body: formData,
//             });

//             if (!res.ok) throw new Error("Failed to create banner");

//             const data = await res.json();
//             toast.success(`Banner created Successfully!`, {
//                 autoClose: 3000,
//                 hideProgressBar: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 closeOnClick: true,

//             });
//             router.push("/");

//             setHeading("");
//             setSubHeading("");
//             setImage(null);
//         } catch (err: any) {
//             setMessage(err.message || "Something went wrong");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
//             <h1 className="text-2xl font-bold mb-6">Create New Banner</h1>

//             <form onSubmit={handleSubmit} className="flex flex-col gap-4">

//                 <div>
//                     <label className="block mb-1 font-semibold">Heading</label>
//                     <input
//                         type="text"
//                         value={heading}
//                         onChange={(e) => setHeading(e.target.value)}
//                         required
//                         className="w-full border p-2 rounded"
//                     />
//                 </div>

//                 <div>
//                     <label className="block mb-1 font-semibold">Sub Heading</label>
//                     <input
//                         type="text"
//                         value={subHeading}
//                         onChange={(e) => setSubHeading(e.target.value)}
//                         required
//                         className="w-full border p-2 rounded"
//                     />
//                 </div>

//                 <div>
//                     <label className="block mb-1 font-semibold">Upload Image</label>
//                     <input
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) => {
//                             if (e.target.files) {
//                                 setImage(e.target.files[0]);
//                             }
//                         }}
//                         required
//                         className="w-full border p-2 rounded"
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//                 >
//                     {loading ? "Creating..." : "Create Banner"}
//                 </button>
//             </form>

//             {message && <p className="mt-4 text-green-600">{message}</p>}
//         </div>
//     );
// };

// export default Page;


"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Banner = {
    _id: string;
    heading: string;
    subHeading: string;
    image: string;
};

const Page = () => {
    const router = useRouter();

    const [heading, setHeading] = useState("");
    const [subHeading, setSubHeading] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(false);

    // ================= FETCH BANNERS =================
    const fetchBanners = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/v1/banners");
            const data = await res.json();
            setBanners(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    // ================= CREATE BANNER =================
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!image) {
            toast.error("Please select an image");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("heading", heading);
            formData.append("subHeading", subHeading);
            formData.append("image", image);

            const res = await fetch(
                "http://localhost:5000/api/v1/banners/create-banner",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!res.ok) throw new Error("Failed to create banner");

            toast.success("Banner created successfully");

            setHeading("");
            setSubHeading("");
            setImage(null);

            fetchBanners();
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    // ================= DELETE BANNER =================
    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(
                `http://localhost:5000/api/v1/banners/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (!res.ok) throw new Error("Delete failed");

            toast.success("Banner deleted");

            fetchBanners();
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">

            {/* ================= CREATE FORM ================= */}
            <div className="p-6 border rounded shadow mb-10">
                <h1 className="text-2xl font-bold mb-6">Create New Banner</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <input
                        type="text"
                        placeholder="Heading"
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                        className="border p-2 rounded"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Sub Heading"
                        value={subHeading}
                        onChange={(e) => setSubHeading(e.target.value)}
                        className="border p-2 rounded"
                        required
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            e.target.files && setImage(e.target.files[0])
                        }
                        className="border p-2 rounded"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white py-2 rounded"
                    >
                        {loading ? "Creating..." : "Create Banner"}
                    </button>

                </form>
            </div>

            {/* ================= BANNER LIST ================= */}

            <div className="border rounded shadow p-6">
                <h2 className="text-xl font-bold mb-4">Existing Banners</h2>

                <table className="w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 border">Heading</th>
                            <th className="p-3 border">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {banners.map((banner) => (
                            <tr key={banner._id}>
                                <td className="p-3 border">{banner.heading}</td>


                                <td className="p-3 border flex gap-3">

                                    {/* EDIT */}
                                    <button
                                        onClick={() => router.push(`/dashboard/dynamic-banner/edit/${banner._id}`)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>

                                    {/* DELETE */}
                                    <button
                                        onClick={() => handleDelete(banner._id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default Page;