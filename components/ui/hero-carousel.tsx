
"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type Slide = {
    id: string;
    title: string;
    subtitle: string;
    image: string;
};

export default function HeroCarousel() {
    const [slides, setSlides] = React.useState<Slide[]>([]);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    // Fetch banners from Express
    React.useEffect(() => {
        const loadBanners = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/v1/banners");
                const json = await res.json();

                // important line
                const banners = json.data;

                const mappedSlides: Slide[] = banners.map((banner: any) => ({
                    id: banner._id,
                    title: banner.heading,
                    subtitle: banner.subHeading,
                    image: banner.imageUrl,
                }));

                setSlides(mappedSlides);
            } catch (err) {
                console.error("Banner fetch error:", err);
            }
        };

        loadBanners();
    }, []);

    const scrollPrev = () => emblaApi?.scrollPrev();
    const scrollNext = () => emblaApi?.scrollNext();

    if (!slides.length) {
        return (
            <div className="h-[650px] flex items-center justify-center">
                <h2>Loading banners...</h2>
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {slides.map((slide) => (
                        // <div key={slide.id} className="relative min-w-full w-full">
                        <div key={slide.id} className="relative min-w-full w-full h-[140px] md:h-[250] lg:h-[580px]">
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                sizes="100vw"
                                quality={100}
                                priority
                                className="object-contain lg:object-cover"
                            />

                            {/* <div className="absolute inset-0" /> */}
                            {/* </div> */}

                            <div className="absolute inset-0" />

                            {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                                <h1 className="text-5xl md:text-6xl font-bold tracking-wide text-white">
                                    {slide.title}
                                </h1>

                                <p className="mt-4 text-lg md:text-xl tracking-[4px] text-white">
                                    {slide.subtitle}
                                </p>

                                <Link
                                    href="/about"
                                    className="mt-8 inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 transition px-8 py-3 rounded text-white font-semibold"
                                >
                                    READ MORE →
                                </Link>
                            </div> */}
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={scrollPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-3 rounded-full"
            >
                <ChevronLeft />
            </button>

            <button
                onClick={scrollNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-3 rounded-full"
            >
                <ChevronRight />
            </button>
        </div>

        // <div>
        //     <Image
        //         src={`https://i.ibb.co.com/WpdkNKdG/6eb0eb24509b.png`}
        //         alt="slider"
        //         width={2107}
        //         height={803}
        //         className="object-contain"
        //     />
        // </div>
    );
}



// "use client";

// import * as React from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// type Slide = {
//     id: string;
//     image: string;
// };

// export default function HeroCarousel() {
//     const [slides, setSlides] = React.useState<Slide[]>([]);
//     const [imageErrors, setImageErrors] = React.useState<{[key: string]: boolean}>({});
//     const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

//     // Fetch banners from Express
//     React.useEffect(() => {
//         const loadBanners = async () => {
//             try {
//                 const res = await fetch("http://localhost:5000/api/v1/banners");
//                 const json = await res.json();
//                 const banners = json.data;

//                 console.log("Banners data:", banners); // CHECK WHAT IMAGES YOU'RE GETTING

//                 const mappedSlides: Slide[] = banners.map((banner: any) => ({
//                     id: banner._id,
//                     image: banner.imageUrl,
//                 }));

//                 setSlides(mappedSlides);
//             } catch (err) {
//                 console.error("Banner fetch error:", err);
//             }
//         };

//         loadBanners();
//     }, []);

//     const scrollPrev = () => emblaApi?.scrollPrev();
//     const scrollNext = () => emblaApi?.scrollNext();

//     const handleImageError = (slideId: string) => {
//         setImageErrors(prev => ({ ...prev, [slideId]: true }));
//         console.error(`Failed to load image for slide: ${slideId}`);
//     };

//     const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
//         const img = e.currentTarget;
//         console.log(`Image loaded - Natural dimensions: ${img.naturalWidth}x${img.naturalHeight}`);
//     };

//     if (!slides.length) {
//         return (
//             <div className="h-[650px] flex items-center justify-center">
//                 <h2>Loading banners...</h2>
//             </div>
//         );
//     }

//     return (
//         <div className="relative">
//             <div className="overflow-hidden" ref={emblaRef}>
//                 <div className="flex">
//                     {slides.map((slide) => (
//                         <div key={slide.id} className="relative min-w-full">
//                             {imageErrors[slide.id] ? (
//                                 <div className="w-full bg-gray-200 flex items-center justify-center">
//                                     <p className="text-red-500">Failed to load image</p>
//                                 </div>
//                             ) : (
//                                 <img
//                                     src={slide.image}
//                                     alt="banner"
//                                     onError={() => handleImageError(slide.id)}
//                                     onLoad={handleImageLoad}
//                                     className="object-cover"
//                                     style={{
//                                         width: "100%",
//                                         height: "auto",
//                                         display: "block",
//                                         imageRendering: "-webkit-optimize-contrast", // Helps with sharpness
//                                         imageRendering: "crisp-edges", // Alternative
//                                     }}
//                                 />
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <button
//                 onClick={scrollPrev}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-3 rounded-full"
//             >
//                 <ChevronLeft />
//             </button>

//             <button
//                 onClick={scrollNext}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-3 rounded-full"
//             >
//                 <ChevronRight />
//             </button>
//         </div>
//     );
// }