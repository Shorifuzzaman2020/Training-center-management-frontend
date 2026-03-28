"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateBlogPage() {
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (e: any) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append("author",author);
        formData.append("title", title);
        formData.append("description", description);

        if (image) {
            formData.append("image", image);
        }

        try {

            await axios.post(
                "http://localhost:5000/api/v1/blogs/create-blog",
                formData
            );

            toast.success("Blog uploaded successfully");
            setAuthor("");
            setTitle("");
            setDescription("");
            setImage(null);

        } catch (error) {

            toast.error("Upload failed");

        }

    };

    return (

        <div className="max-w-3xl mx-auto p-10">

            <h1 className="text-3xl font-bold mb-6">
                Create Blog
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-white p-8 shadow rounded-lg"
            >
                <div>
                    <label className="block mb-1 font-medium">
                        Blog Author
                    </label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    
                    <label className="block mb-1 font-medium">
                        Blog Title
                    </label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />

                </div>

                <div>

                    <label className="block mb-1 font-medium">
                        Description
                    </label>

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={5}
                        className="w-full border px-3 py-2 rounded"
                    />

                </div>

                <div>

                    <label className="block mb-1 font-medium">
                        Blog Image
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setImage(e.target.files?.[0] || null)
                        }
                    />

                </div>

                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-2 rounded"
                >
                    Publish Blog
                </button>

            </form>

        </div>

    );

}