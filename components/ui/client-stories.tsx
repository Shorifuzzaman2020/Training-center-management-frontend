import React from 'react';

// Use standard Tailwind colors and add custom colors where needed.
// Custom color palette for this design:
// Dark Purple/Navy: #170F49 (for the right column background)
// Yellow/Orange for stars and underline: #FDBE0D
// Student background: #F6EDDB
// Pagination dots: #5E71E1 (blue), #A88DF3 (purple), #FFFFFF (white)
// Quote icon color: #FD5532 (starburst), #FFFFFF (quotes)

const TestimonialSection: React.FC = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-3 lg:w-11/12 lg:mx-auto rounded-lg overflow-hidden">
            {/* Left Column - takes 1 column */}
            <div className="col-span-1 w-full bg-[#F6EDDB] relative overflow-hidden flex items-center justify-center">
                {/* Concentric Circles Pattern */}
                <div className="absolute top-[10%] left-[-20%] md:left-[-15%] w-[1200px] h-[1200px] rounded-full border border-white opacity-[0.25]"></div>
                <div className="absolute top-[20%] left-[-10%] md:left-[-5%] w-[1000px] h-[1000px] rounded-full border border-white opacity-[0.2]"></div>
                <div className="absolute top-[30%] left-[0%] md:left-[5%] w-[800px] h-[800px] rounded-full border border-white opacity-[0.15]"></div>

                <img
                    src="https://images.unsplash.com/photo-1544717302-de2939b7ef71?q=80&w=600&h=800&auto=format&fit=crop&bg=F6EDDB"
                    alt="Smiling student with headphones, books, and phone"
                    className="relative z-10 w-auto"
                />
            </div>

            {/* Right Column - takes 2 columns */}
            <div className="col-span-2 w-full bg-[#170F49] px-16 relative flex flex-col justify-center text-white">
                {/* Red/Orange Starburst Quote Icon */}
                <div className="absolute top-16 right-16 flex items-center justify-center">
                    <svg className="w-24 h-24 text-[#FD5532]" viewBox="0 0 100 100">
                        <polygon points="50,0 60,30 90,30 65,50 75,80 50,60 25,80 35,50 10,30 40,30" fill="currentColor" />
                        <text x="50" y="55" textAnchor="middle" fill="#FFFFFF" fontSize="30px" fontWeight="bold">’’</text>
                    </svg>
                </div>

                {/* Rest of your content */}
                <div className=" max-w-xl">
                    <h2 className="text-5xl font-extrabold leading-tight mb-6">
                        <span className="relative">
                            What's our Real Client Stories
                            <span className="absolute -bottom-2 left-0 right-0 h-2 bg-[#FDBE0D] rounded-full opacity-70"></span>
                        </span>
                        <br />
                        About Our Work & Passion
                    </h2>

                    {/* Star Rating */}
                    <div className="flex gap-1 mb-8">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-7 h-7 text-[#FDBE0D] fill-current" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                        ))}
                    </div>

                    <p className="text-lg text-white opacity-90 leading-relaxed mb-8">
                        “When An Unknown Printer Took Alley Ffer Area Typey And Scrambled To Make A Type Specimen Book Hasswhen An Unknown Printer Took A Galley Offer Type Make Specimen Book Has Survived Type Make.”
                    </p>

                    <div>
                        <p className="font-bold text-2xl mb-1">Mr. K Jackerty</p>
                        <p className="text-base text-white opacity-80">CEO, Marketing</p>
                    </div>
                </div>

                {/* Vertical Pagination Dots */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                    <div className="w-4 h-4 rounded-full bg-[#5E71E1]"></div>
                    <div className="w-4 h-4 rounded-full bg-[#A88DF3]"></div>
                    <div className="w-4 h-4 rounded-full bg-white"></div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;