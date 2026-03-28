
// components/after-banner.tsx
import { GraduationCap, BookOpen, Trophy } from "lucide-react";
import { GiRolledCloth } from "react-icons/gi";
import { TbBulb } from "react-icons/tb";

export default function AfterBanner() {
    const features = [
        {
            id: 1,
            icon: <GiRolledCloth className="w-14 h-14 text-[#0EA5E9]" />,
            title: "Get Achieve New Level",
            description: "It is a long established fact to follow reader will be Follow readace on page."
        },
        {
            id: 2,
            icon: <TbBulb className="w-14 h-14 text-[#e6bc24]" />,
            title: "Learn With Effective",
            description: "It is a long established fact to follow reader will be Follow readace on page."
        },
        {
            id: 3,
            icon: <Trophy className="w-14 h-14 text-[#e92f0e]" />,
            title: "Award Winning Team",
            description: "It is a long established fact to follow reader will be Follow readace on page."
        }
    ];

    return (
        <section className=" mx-auto py-16 md:py-20 bg-purple-950">
            <div className="container w-10/12 mx-auto">

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-20 ">
                    {features.map((feature) => (
                        <div key={feature.id} className="flex items-center justify-center text-center gap-6">
                            {/* Icon Container */}
                            <div className="">
                                <div className=" flex items-center justify-center">
                                    {feature.icon}
                                </div>
                            </div>

                            {/* Title */}
                            <div className="">
                                <div>
                                    <h3 className="text-white text-justify font-bold">
                                        {feature.title}
                                    </h3>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-justify">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
        // <div className="grid grid-cols-1 lg:grid-cols-3">
        //     <div>
        //         <img src="/Home Page(picture use left).jpg" alt="" />
        //     </div>
        //     <div>
        //         <img src="/Home Page(picture use middle).jpg" alt="" />
        //     </div>
        //     <div>
        //         <img src="/Home Page(picture use right).jpg" alt="" />
        //     </div>
        // </div>
    );
}



// import React from "react";
// import { Target, BookOpen, Award } from "lucide-react";

// const AfterBanner = () => {
//     return (
//         <section className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-4 md:py-24">
//             <div className="container mx-auto max-w-7xl">
//                 <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">

//                     {/* Card 1: Get Achieve New Level */}
//                     <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
//                         {/* Background decoration */}
//                         <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-blue-100 opacity-60 transition-all group-hover:bg-blue-200"></div>

//                         {/* Icon with colored background */}
//                         <div className="relative mb-6 inline-block">
//                             <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
//                                 <Target className="h-8 w-8" />
//                             </div>
//                         </div>

//                         {/* Content */}
//                         <h3 className="relative mb-3 text-2xl font-bold text-gray-800 md:text-3xl">
//                             Get Achieve New Level
//                         </h3>
//                         <p className="relative text-gray-600 leading-relaxed">
//                             It is a long established fact to follow reader will be Follow readace on page.
//                         </p>

//                         {/* Hover effect line */}
//                         <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></div>
//                     </div>

//                     {/* Card 2: Learn With Effective */}
//                     <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
//                         {/* Background decoration */}
//                         <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-green-100 opacity-60 transition-all group-hover:bg-green-200"></div>

//                         {/* Icon with colored background */}
//                         <div className="relative mb-6 inline-block">
//                             <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-600 text-white shadow-md">
//                                 <BookOpen className="h-8 w-8" />
//                             </div>
//                         </div>

//                         {/* Content */}
//                         <h3 className="relative mb-3 text-2xl font-bold text-gray-800 md:text-3xl">
//                             Learn With Effective
//                         </h3>
//                         <p className="relative text-gray-600 leading-relaxed">
//                             It is a long established fact to follow reader will be Follow readace on page.
//                         </p>

//                         {/* Hover effect line */}
//                         <div className="absolute bottom-0 left-0 h-1 w-0 bg-green-600 transition-all duration-300 group-hover:w-full"></div>
//                     </div>

//                     {/* Card 3: Award Winning Team */}
//                     <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
//                         {/* Background decoration */}
//                         <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-purple-100 opacity-60 transition-all group-hover:bg-purple-200"></div>

//                         {/* Icon with colored background */}
//                         <div className="relative mb-6 inline-block">
//                             <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-md">
//                                 <Award className="h-8 w-8" />
//                             </div>
//                         </div>

//                         {/* Content */}
//                         <h3 className="relative mb-3 text-2xl font-bold text-gray-800 md:text-3xl">
//                             Award Winning Team
//                         </h3>
//                         <p className="relative text-gray-600 leading-relaxed">
//                             It is a long established fact to follow reader will be Follow readace on page.
//                         </p>

//                         {/* Hover effect line */}
//                         <div className="absolute bottom-0 left-0 h-1 w-0 bg-purple-600 transition-all duration-300 group-hover:w-full"></div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default AfterBanner;