"use client"; // only if this is a client component

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import EditBannerModal from "@/components/ui/EditBannerModal";
import { toast } from "react-toastify";

type Banner = {
    _id: string;
    heading: string;
    subHeading: string;
    imageUrl: string;
};

const Page = () => {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [banner, setBanner] = useState<Banner | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/v1/banners/${id}`);
                if (!res.ok) throw new Error("Banner not found");
                const data = await res.json();
                setBanner(data.data);
            } catch (err) {
                toast.error("Failed to load banner");
            } finally {
                setLoading(false);
            }
        };
        fetchBanner();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!banner) return <p>Banner not found</p>;

    return (
        <EditBannerModal
            banner={banner}
            onClose={() => router.push("/dashboard/dynamic-banner")}
            refreshBanners={() => { }}
        />
    );
};

export default Page;