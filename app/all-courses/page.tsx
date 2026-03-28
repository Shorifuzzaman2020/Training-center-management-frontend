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

// export default function AllCoursesPage() {

//     const [courses, setCourses] = useState<Course[]>([]);
//     const [search, setSearch] = useState("");

//     const [currentPage, setCurrentPage] = useState(1);

//     const coursesPerPage = 9;

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

//     };

//     /* ---------------- SEARCH ---------------- */

//     const filteredCourses = courses.filter((course) =>
//         course.course?.name
//             ?.toLowerCase()
//             .includes(search.toLowerCase())
//     );

//     /* ---------------- PAGINATION ---------------- */

//     const indexOfLastCourse = currentPage * coursesPerPage;

//     const indexOfFirstCourse =
//         indexOfLastCourse - coursesPerPage;

//     const currentCourses = filteredCourses.slice(
//         indexOfFirstCourse,
//         indexOfLastCourse
//     );

//     const totalPages = Math.ceil(
//         filteredCourses.length / coursesPerPage
//     );

//     return (

//         <section className="py-16 bg-gray-50 min-h-screen cursor-pointer">

//             <div className="max-w-7xl mx-auto px-6">

//                 {/* TITLE */}

//                 <h1 className="text-4xl font-bold text-center mb-10">
//                     All Courses
//                 </h1>

//                 {/* SEARCH */}

//                 <div className="flex justify-center mb-12">

//                     <input
//                         type="text"
//                         placeholder="Search courses..."
//                         value={search}
//                         onChange={(e) => {
//                             setSearch(e.target.value);
//                             setCurrentPage(1);
//                         }}
//                         className="w-full max-w-md border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                     />

//                 </div>

//                 {/* COURSE GRID */}

//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

//                     {currentCourses.map((course) => (

//                         <div
//                             key={course._id}
//                             className="bg-white rounded-xl overflow-hidden border-2"
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

//                 {/* PAGINATION */}

//     <div className="flex justify-center mt-12 gap-2 flex-wrap">

//         {Array.from(
//             { length: totalPages },
//             (_, index) => index + 1
//         ).map((page) => (

//             <button
//                 key={page}
//                 onClick={() => setCurrentPage(page)}
//                 className={`px-4 py-2 rounded border
//   ${currentPage === page
//                         ? "bg-indigo-600 text-white"
//                         : "bg-white"
//                     }`}
//             >
//                 {page}
//             </button>

//         ))}

//     </div>

//             </div>

//         </section>

//     );

// }

"use client";

import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
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

// 1. We move the main logic into a separate component so we can wrap it in Suspense
function CoursesContent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const coursesPerPage = 9;

  // Initialize search params
  const searchParams = useSearchParams();
  const courseQuery = searchParams.get("course");

  // 2. Automatically update the search state if a URL parameter exists
  useEffect(() => {
    if (courseQuery) {
      setSearch(courseQuery);
    } else {
      setSearch("");
    }
  }, [courseQuery]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/trainings");
      setCourses(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  /* ---------------- SEARCH ---------------- */
  const filteredCourses = courses.filter((course) =>
    course.course?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  /* ---------------- PAGINATION ---------------- */
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse,
  );
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* TITLE */}
      <h1 className="text-4xl font-bold text-center mb-10">All Courses</h1>

      {/* SEARCH */}
      <div className="flex justify-center mb-12 relative">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full max-w-md border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />

        {/* Optional: Add a clear button if a URL query is active */}
        {search && (
          <button
            onClick={() => {
              setSearch("");
              // Optionally, you could also clear the URL parameter here using next/navigation's useRouter
            }}
            className="absolute right-[calc(50%-13rem)] top-2 text-gray-400 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>

      {/* COURSE GRID */}
      {currentCourses.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentCourses.map((course) => (
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
      ) : (
        // Show a friendly message if the URL parameter doesn't match any courses
        <div className="text-center text-gray-500 py-12">
          No courses found matching `{search}`.
        </div>
      )}

      {/* PAGINATION */}
      {/* {totalPages > 1 && (
        <div className="flex justify-center mt-12 gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded border transition-colors
                                ${
                                  currentPage === page
                                    ? "bg-indigo-600 text-white border-indigo-600"
                                    : "bg-white hover:bg-gray-50"
                                }`}
              >
                {page}
              </button>
            ),
          )}
        </div>
      )} */}

      <div className="flex justify-center mt-12 gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded border
              ${
                currentPage === page ? "bg-indigo-600 text-white" : "bg-white"
              }`}
            >
              {page}
            </button>
          ),
        )}
      </div>
    </div>
  );
}

// 3. This is the main default export that wraps our content in a Suspense boundary
export default function AllCoursesPage() {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      {/* Suspense prevents Next.js build errors when using useSearchParams */}
      <Suspense
        fallback={<div className="text-center mt-20">Loading courses...</div>}
      >
        <CoursesContent />
      </Suspense>
    </section>
  );
}
