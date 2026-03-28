// import React from 'react';

// // Define the instructor data structure
// interface Instructor {
//     id: number;
//     name: string;
//     role: string;
//     imageUrl: string;
// }

// const instructors: Instructor[] = [
//     {
//         id: 1,
//         name: 'Richard David',
//         role: 'Marketing Expert',
//         // Using placeholder portraits. For production, use transparent PNG cutouts.
//         imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop&bg=transparent',
//     },
//     {
//         id: 2,
//         name: 'Millar Richard',
//         role: 'Business',
//         imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop&bg=transparent',
//     },
//     {
//         id: 3,
//         name: 'Kristin Watson',
//         role: 'UX/UI Expert',
//         imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop&bg=transparent',
//     },
//     {
//         id: 4,
//         name: 'Jacob Jones',
//         role: 'UX/UI Designer',
//         imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop&bg=transparent',
//     }
// ];

// const InstructorsSection: React.FC = () => {
//     return (
//         <section className="bg-white py-20 px-6 md:px-12 lg:px-24 font-sans text-center">
//             <div className="max-w-7xl mx-auto">

//                 {/* Section Header */}
//                 <div className="mb-16 flex flex-col items-center">
//                     <span className="uppercase tracking-widest text-sm font-semibold text-gray-500 mb-3 block">
//                         Our Instructors
//                     </span>

//                     <h2 className="text-3xl md:text-4xl font-bold text-[#1e1b4b] mb-6">
//                         From The Quiklearn <span className="relative inline-block">
//                             Community
//                             {/* Yellow Underline SVG */}
//                             <svg
//                                 className="absolute left-0 -bottom-2 w-full text-[#ffc221]"
//                                 viewBox="0 0 100 20"
//                                 fill="none"
//                                 preserveAspectRatio="none"
//                             >
//                                 <path
//                                     d="M5 15Q 50 8 95 12"
//                                     stroke="currentColor"
//                                     strokeWidth="3"
//                                     strokeLinecap="round"
//                                 />
//                             </svg>
//                         </span>
//                     </h2>

//                     <p className="text-gray-500 max-w-2xl text-sm md:text-base leading-relaxed">
//                         When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book It Has Survived Not Only Five Centuries
//                     </p>
//                 </div>

//                 {/* Instructors Grid */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//                     {instructors.map((instructor) => (
//                         <div
//                             key={instructor.id}
//                             className="bg-[#f9f9fb] border border-gray-100 rounded-xl p-4 pt-8 relative flex flex-col items-center group transition-transform hover:-translate-y-2 duration-300"
//                         >
//                             {/* Share Icon Button */}
//                             <button className="absolute top-4 right-4 bg-white p-2.5 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#5629c4] hover:bg-[#5629c4] hover:text-white transition-colors z-20">
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
//                                 </svg>
//                             </button>

//                             {/* Image Container */}
//                             <div className="relative w-full h-56 flex justify-center items-end mb-4">
//                                 {/* Abstract Brush Graphic (Simulated Background) */}
//                                 <svg className="absolute inset-0 w-full h-full text-gray-200/60 z-0 scale-125" viewBox="0 0 200 200" fill="currentColor">
//                                     <path d="M45,-76C58.3,-69.3,69,-56.3,76.5,-41.5C84,-26.8,88.3,-10.3,87.3,5.8C86.3,21.9,80,37.6,70.5,50.5C61,63.4,48.3,73.5,33.8,79.5C19.3,85.5,3.1,87.4,-11.9,84.1C-26.9,80.8,-40.7,72.3,-52.3,60.8C-63.9,49.3,-73.3,34.8,-79.1,18.8C-84.9,2.8,-87.1,-14.7,-81.7,-29.9C-76.3,-45.1,-63.3,-58,-49,-65.4C-34.7,-72.8,-17.3,-74.7,-0.4,-74.2C16.5,-73.7,31.7,-82.7,45,-76Z" transform="translate(100 100)" />
//                                 </svg>

//                                 {/* Instructor Image */}
//                                 <img
//                                     src={instructor.imageUrl}
//                                     alt={instructor.name}
//                                     className="relative z-10 h-[110%] w-auto object-cover object-bottom mix-blend-darken"
//                                 />
//                             </div>

//                             {/* Name Plate */}
//                             <div className="bg-white w-[105%] rounded-xl py-5 text-center shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] relative z-20">
//                                 <h3 className="text-[#5629c4] font-bold text-lg">{instructor.name}</h3>
//                                 <p className="text-gray-500 text-sm mt-1">{instructor.role}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//             </div>
//         </section>
//     );
// };

// export default InstructorsSection;

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

// Import the Carousel components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Define the expected structure from your API
interface Instructor {
  _id: string; // Updated to _id assuming it matches your backend
  fullName: string;
  role: string;
  photo: string;
}

const InstructorsSection: React.FC = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/employees",
      );

      // Assuming the API returns data in the same 'res.data.data' shape as your blogs
      // We use slice(0, 8) as an example to limit the number of trainers in the slider
      setInstructors(res.data.data.slice(0, 8));
    } catch (err) {
      console.error("Error fetching instructors:", err);
    }
  };

  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24 font-sans text-center">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center">
          <span className="uppercase tracking-widest text-sm font-semibold text-gray-500 mb-3 block">
            Our Instructors
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-[#1e1b4b] mb-6">
            From The Quiklearn{" "}
            <span className="relative inline-block">
              Community
              {/* Yellow Underline SVG */}
              <svg
                className="absolute left-0 -bottom-2 w-full text-[#ffc221]"
                viewBox="0 0 100 20"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M5 15Q 50 8 95 12"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="text-gray-500 max-w-2xl text-sm md:text-base leading-relaxed">
            When An Unknown Printer Took A Galley Of Type And Scrambled It To
            Make A Type Specimen Book It Has Survived Not Only Five Centuries
          </p>
        </div>

        {/* Instructors Carousel */}
        <div className="relative px-10">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4 pb-10 pt-4">
              {instructors.map((instructor) => (
                <CarouselItem
                  key={instructor._id}
                  // Shows 1 on mobile, 2 on tablet, 3 on desktop, 4 on large screens
                  className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="bg-[#f9f9fb] border border-gray-100 rounded-xl p-4 pt-8 relative flex flex-col items-center group transition-transform hover:-translate-y-2 duration-300 mx-auto w-full max-w-sm">
                    {/* Share Icon Button */}
                    <button className="absolute top-4 right-4 bg-white p-2.5 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[#5629c4] hover:bg-[#5629c4] hover:text-white transition-colors z-20">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                    </button>

                    {/* Image Container */}
                    <div className="relative w-full h-56 flex justify-center items-end mb-4">
                      {/* Abstract Brush Graphic (Simulated Background) */}
                      <svg
                        className="absolute inset-0 w-full h-full text-gray-200/60 z-0 scale-125"
                        viewBox="0 0 200 200"
                        fill="currentColor"
                      >
                        <path
                          d="M45,-76C58.3,-69.3,69,-56.3,76.5,-41.5C84,-26.8,88.3,-10.3,87.3,5.8C86.3,21.9,80,37.6,70.5,50.5C61,63.4,48.3,73.5,33.8,79.5C19.3,85.5,3.1,87.4,-11.9,84.1C-26.9,80.8,-40.7,72.3,-52.3,60.8C-63.9,49.3,-73.3,34.8,-79.1,18.8C-84.9,2.8,-87.1,-14.7,-81.7,-29.9C-76.3,-45.1,-63.3,-58,-49,-65.4C-34.7,-72.8,-17.3,-74.7,-0.4,-74.2C16.5,-73.7,31.7,-82.7,45,-76Z"
                          transform="translate(100 100)"
                        />
                      </svg>

                      {/* Instructor Image */}
                      {/* Note: I left this as an standard <img> tag instead of next/image so your h-[110%] and mix-blend-darken CSS doesn't break. */}
                      <img
                        src={instructor.photo}
                        alt={instructor.name}
                        className="relative z-10 h-[110%] w-auto object-cover object-bottom mix-blend-darken"
                      />
                    </div>

                    {/* Name Plate */}
                    <div className="bg-white w-[105%] rounded-xl py-5 text-center shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] relative z-20">
                      <h3 className="text-[#5629c4] font-bold text-lg">
                        {instructor.fullName}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">
                        {instructor.role}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default InstructorsSection;
