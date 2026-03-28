"use client";

import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

type Banner = {
    _id: string;
    heading: string;
    subHeading: string;
    imageUrl: string;
};

type Props = {
    banner?: Banner;
    onClose: () => void;
    refreshBanners: () => void;
};

const EditBannerModal = ({ banner, onClose, refreshBanners }: Props) => {

    const [heading, setHeading] = useState(banner?.heading || "");
    const [subHeading, setSubHeading] = useState(banner?.subHeading || "");
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    if (!banner) return null;

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("heading", heading);
        formData.append("subHeading", subHeading);

        if (image) {
            formData.append("image", image);
        }

        try {
            setLoading(true);

            const res = await fetch(
                `http://localhost:5000/api/v1/banners/${banner._id}`,
                {
                    method: "PATCH",
                    body: formData,
                }
            );

            if (!res.ok) throw new Error("Update failed");

            toast.success("Banner updated");

            refreshBanners();
            onClose();

        } catch {
            toast.error("Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white p-6 rounded-lg w-[450px]">

                <h2 className="text-xl font-bold mb-4">Edit Banner</h2>

                <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                        className="border p-2 rounded"
                    />

                    <input
                        type="text"
                        value={subHeading}
                        onChange={(e) => setSubHeading(e.target.value)}
                        className="border p-2 rounded"
                    />

                    <input
                        type="file"
                        onChange={(e) =>
                            e.target.files && setImage(e.target.files[0])
                        }
                        className="border p-2 rounded"
                    />

                    {banner?.imageUrl ? (
                        <Image
                            src={banner.imageUrl}
                            alt="Banner"
                            width={400}
                            height={128}
                            className="w-full h-32 object-cover rounded"
                        />
                    ) : (
                        <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                            No image available
                        </div>
                    )}

                    <div className="flex gap-3 justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-400 text-white rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            {loading ? "Updating..." : "Update"}
                        </button>
                    </div>
                </form>

            </div>

        </div>
    );
};

export default EditBannerModal;