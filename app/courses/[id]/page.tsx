"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import * as React from "react"

export default function CourseDetails({ params }: any) {
  const { id } = React.use(params);

  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    const res = await axios.get(`http://localhost:5000/api/v1/trainings/${id}`);

    setCourse(res.data.data);
  };

  if (!course) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      <Image
        src={course.bannerImage}
        width={1000}
        height={500}
        alt={course.course?.name}
        className="rounded-lg mb-10"
      />

      <h1 className="text-4xl font-bold mb-6">{course.course?.name}</h1>

      <p className="text-gray-600 mb-8">{course.longDescription}</p>

      {/* Apply Button */}

      <Link
        href={`/admission/${course._id}`}
        className="bg-indigo-600 text-white px-8 py-3 rounded-lg"
      >
        Apply Now
      </Link>
    </div>
  );
}
