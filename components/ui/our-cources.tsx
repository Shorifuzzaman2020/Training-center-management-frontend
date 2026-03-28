//Only Card
// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Image from "next/image";

// type Course = {
//     _id: string;
//     bannerImage: string;
//     course: {
//         name: string;
//     };
//     category: {
//         name: string;
//     };
//     shortDescription: string;
// };

// export default function OurCourses() {

//     const [courses, setCourses] = useState<Course[]>([]);

//     useEffect(() => {
//         fetchCourses();
//     }, []);

//     const fetchCourses = async () => {

//         try {

//             const res = await axios.get(
//                 "http://localhost:5000/api/v1/trainings"
//             );

//             setCourses(res.data.data);

//         } catch (err) {
//             console.log(err);
//         }

//     }

//     return (

//         <section className="py-16 bg-gray-50">

//             <div className="max-w-7xl mx-auto px-6">

//                 <h2 className="text-4xl font-bold text-center mb-12">
//                     Our Courses
//                 </h2>

//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

//                     {courses.map((course) => (
//                         <div
//                             key={course._id}
//                             className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
//                         >

//                             {/* Image */}

//                             <div className="relative">

//                                 <Image
//                                     src={course.bannerImage}
//                                     alt={course.course?.name}
//                                     width={400}
//                                     height={300}
//                                     className="w-full h-56 object-cover"
//                                 />

//                                 <span className="absolute top-4 left-4 bg-white px-3 py-1 text-sm rounded shadow">
//                                     {course.category?.name}
//                                 </span>

//                             </div>

//                             {/* Content */}

//                             <div className="p-6">

//                                 {/* Students + Lessons */}

//                                 <div className="flex items-center gap-4 text-gray-500 text-sm mb-3">

//                                     <span>👨‍🎓 27 Students</span>

//                                     {/* <span>📄 8 Lessons</span> */}

//                                 </div>

//                                 {/* Course Title */}

//                                 <h3 className="text-lg font-semibold mb-2">

//                                     {course.course?.name}

//                                 </h3>

//                                 {/* Instructor */}

//                                 <p className="text-gray-500 mb-3">

//                                     {course.shortDescription}

//                                 </p>

//                                 {/* Rating */}

//                                 {/* <div className="flex text-yellow-400 mb-3">

//                                     ★★★★★

//                                 </div> */}

//                                 {/* Price */}

//                                 {/* <div className="flex justify-between items-center">

//                                     <span className="text-gray-400 line-through">
//                                         $75.00
//                                     </span>

//                                     <span className="text-xl font-bold text-indigo-600">
//                                         $55.00
//                                     </span>

//                                 </div> */}

//                             </div>

//                         </div>
//                     ))}

//                 </div>

//             </div>

//         </section>

//     );
// }

//Slider
// "use client";

// import { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import Image from "next/image";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// type Course = {
//     _id: string;
//     bannerImage: string;
//     course: {
//         name: string;
//     };
//     category: {
//         name: string;
//     };
//     shortDescription: string;
// };

// export default function OurCourses() {
//     const [courses, setCourses] = useState<Course[]>([]);
//     const scrollRef = useRef<HTMLDivElement>(null);

//     const fetchCourses = async () => {
//         try {
//             const res = await axios.get(
//                 "http://localhost:5000/api/v1/trainings"
//             );
//             setCourses(res.data.data);
//         } catch (err) {
//             console.log(err);
//         }
//     };
//     useEffect(() => {
//         fetchCourses();
//     }, []);

//     const scroll = (direction: "left" | "right") => {
//         if (!scrollRef.current) return;

//         const scrollAmount = 350;

//         scrollRef.current.scrollBy({
//             left: direction === "left" ? -scrollAmount : scrollAmount,
//             behavior: "smooth",
//         });
//     };

//     return (
//         <section className="py-16 bg-gray-50 relative">
//             <div className="max-w-7xl mx-auto px-6 mb-10 relative">
//                 <h2 className="text-4xl font-bold text-center mb-12">
//                     Our Courses
//                 </h2>

//                 {/* Left Arrow */}
//                 <button
//                     onClick={() => scroll("left")}
//                     className="absolute left-0 top-[55%] -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
//                 >
//                     <ChevronLeft size={24} />
//                 </button>

//                 {/* Scroll Container */}
//                 <div
//                     ref={scrollRef}
//                     className="flex gap-8 overflow-x-hidden mb-10 scroll-smooth px-10"
//                 >
//                     {courses.map((course) => (
//                         <div
//                             key={course._id}
//                             className="min-w-[320px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition flex-shrink-0"
//                         >
//                             {/* Image */}
//                             <div className="relative">
//                                 <Image
//                                     src={course.bannerImage}
//                                     alt={course.course?.name}
//                                     width={400}
//                                     height={300}
//                                     className="w-full h-56 object-cover"
//                                 />

//                                 <span className="absolute top-4 left-4 bg-white px-3 py-1 text-sm rounded shadow">
//                                     {course.category?.name}
//                                 </span>
//                             </div>

//                             {/* Content */}
//                             <div className="p-6">
//                                 <div className="flex items-center gap-4 text-gray-500 text-sm mb-3">
//                                     <span>👨‍🎓 27 Students</span>
//                                 </div>

//                                 <h3 className="text-lg font-semibold mb-2">
//                                     {course.course?.name}
//                                 </h3>

//                                 <p className="text-gray-500 mb-3">
//                                     {course.shortDescription}
//                                 </p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Right Arrow */}
//                 <button
//                     onClick={() => scroll("right")}
//                     className="absolute right-0 top-[55%] -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
//                 >
//                     <ChevronRight size={24} />
//                 </button>
//             </div>
//         </section>
//     );
// }

//Category Card

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

type Course = {
  _id: string;
  bannerImage: string;
  course: {
    name: string;
  };
  category: {
    name: string;
  };
  shortDescription: string;
};

export default function OurCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/trainings");

      const data = res.data.data;

      setCourses(data);

      /* extract unique categories */

      const uniqueCategories = [
        "All",
        ...new Set(data.map((c: Course) => c.category?.name)),
      ];

      setCategories(uniqueCategories);
    } catch (err) {
      console.log(err);
    }
  };

  /* filter logic */

  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((c) => c.category?.name === activeCategory);

  /* limit 6 */

  const visibleCourses = filteredCourses.slice(0, 6);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}

        <h2 className="text-4xl font-bold text-center mb-10">Our Courses</h2>

        {/* CATEGORY BUTTONS */}

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full border transition
                ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-700 hover:bg-indigo-50"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* COURSE GRID */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleCourses.map((course) => (
            <Link
              key={course._id}
              href={`/courses/${course._id}`}
              className="bg-white rounded-xl overflow-hidden border-2 hover:shadow-lg transition"
            >
              <div className="relative">
                <Image
                  src={course.bannerImage}
                  alt={course.course?.name}
                  width={400}
                  height={300}
                  className="w-full h-56 object-cover"
                />

                <span className="absolute top-4 left-4 bg-white px-3 py-1 text-sm rounded shadow">
                  {course.category?.name}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">
                  {course.course?.name}
                </h3>

                <p className="text-gray-500 mb-3">{course.shortDescription}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* SEE ALL COURSES BUTTON */}

        <div className="flex justify-center mt-12">
          <Link
            href="/all-courses"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg transition"
          >
            See All Courses
          </Link>
        </div>
      </div>
    </section>
  );
}
