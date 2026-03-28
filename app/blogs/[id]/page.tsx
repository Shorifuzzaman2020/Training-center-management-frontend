"use client";

import { use, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function BlogDetailsPage({ params }: any) {

    const { id } = use (params);

    const [blog, setBlog] = useState<any>(null);
    const fetchBlog = async () => {

        try {

            const res = await axios.get(
                `http://localhost:5000/api/v1/blogs/${id}`
            );

            setBlog(res.data.data);

        } catch (err) {

            console.log(err);

        }

    };
    useEffect(() => {
        fetchBlog();
    }, []);


    if (!blog) return <p className="text-center py-20">Loading...</p>;

    return (

        <div className="max-w-4xl mx-auto py-16 px-6">

            {/* TITLE */}

            <h1 className="text-4xl font-bold mb-6">

                {blog.title}

            </h1>
            <p className="text-gray-500 mb-6">
                By {blog.author} / {new Date(blog.createdAt).toDateString()}
            </p>

            {/* DATE */}

            {/* <p className="text-gray-500 mb-6">

                {new Date(blog.createdAt).toDateString()}

            </p> */}

            {/* IMAGE */}

            <Image
                src={blog.imageUrl}
                width={1200}
                height={600}
                alt={blog.title}
                className="w-full rounded-lg mb-10"
            />

            {/* FULL DESCRIPTION */}

            <p className="text-gray-700 leading-8 text-lg">

                {blog.description}

            </p>

        </div>

    );

}