import React from 'react';

const WhyChooseUs: React.FC = () => {
    return (
        <section className="bg-[#241744] text-white py-20 px-6 md:px-12 lg:px-24 font-sans overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-8">

                {/* Left Column - Content */}
                <div className="w-full lg:w-1/2">
                    <span className="uppercase tracking-widest text-sm font-semibold text-[#a59fb8] block mb-4">
                        Why Choose Us
                    </span>

                    <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                        Don’t Know How To <span className="relative inline-block">
                            Start
                            {/* Yellow Underline SVG */}
                            <svg
                                className="absolute left-0 -bottom-2 w-full text-[#ffc221]"
                                viewBox="0 0 100 20"
                                fill="none"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M5 15Q 30 5 95 12"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M10 18Q 40 10 90 15"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span> With Quiklearn Courses
                    </h2>

                    <p className="text-[#b1aac5] mb-10 max-w-lg leading-relaxed">
                        When An Unknown Printer Took A Galley Offer Area Type And Scrambled To Make A Type Specimen Book .
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-4 mb-10">
                        {[
                            "Special Lessons And Courses",
                            "Get Every General Answers",
                            "World Largest Language",
                            "A Residential Campus",
                            "15 Language For Beginners",
                            "A Residential Campus"
                        ].map((item, index) => (
                            <li key={index} className="flex items-center text-[#e5e3eb] font-medium text-sm md:text-base">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#6941C6] flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                {item}
                            </li>
                        ))}
                    </ul>

                    <button className="bg-white text-[#5629c4] font-semibold py-3 px-8 rounded-full flex items-center gap-2 hover:bg-gray-100 transition-colors">
                        Explore All Courses
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>

                {/* Right Column - Images & Graphics */}
                <div className="w-full lg:w-1/2 flex justify-center relative">
                    <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px]">

                        {/* Dotted pattern background */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-30"
                            style={{ backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)', backgroundSize: '16px 16px' }}>
                        </div>

                        {/* Main large circular image */}
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
                            alt="Students collaborating"
                            className="absolute right-0 top-0 w-4/5 h-4/5 object-cover rounded-full"
                        />

                        {/* Overlapping smaller circular image */}
                        <img
                            src="https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=600&auto=format&fit=crop"
                            alt="Smiling student"
                            className="absolute left-0 bottom-4 w-3/5 h-3/5 object-cover rounded-full border-[8px] border-[#241744]"
                        />

                        {/* Discount Badge */}
                        <div className="absolute -top-4 left-4 md:left-12 w-28 h-28 bg-[#8a42ff] border-[6px] border-white rounded-full flex flex-col items-center justify-center text-white shadow-xl z-10">
                            <span className="text-3xl font-extrabold leading-none tracking-tight">0%</span>
                            <span className="text-sm font-medium">Discount</span>
                        </div>

                        {/* Green Zigzag Graphic */}
                        <svg
                            className="absolute -top-8 left-28 w-16 h-16 text-[#00E58C] z-0"
                            viewBox="0 0 50 50"
                            fill="none"
                        >
                            <path
                                d="M10,35 L20,15 L30,40 L45,10"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default WhyChooseUs;