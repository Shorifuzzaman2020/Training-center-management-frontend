// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Image from "next/image";
// import Link from "next/link";

// import {
//   Card,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// type Blog = {
//   _id: string;
//   title: string;
//   author: string;
//   description: string;
//   imageUrl: string;
//   createdAt: string;
// };

// export default function OurLatestBlog() {
//   const [blogs, setBlogs] = useState<Blog[]>([]);

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const fetchBlogs = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/v1/blogs");

//       setBlogs(res.data.data.slice(0, 3));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-center font-bold text-3xl my-16">
//         LATEST FROM THE BLOG
//       </h1>

//       <div className="w-10/12 mx-auto">
//         <div className="mt-10 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
//           {blogs.map((post) => (
//             <Card
//               key={post._id}
//               className="group relative w-full max-w-sm pt-0 overflow-hidden"
//             >
//               {/* Image */}

//               <Image
//                 src={post.imageUrl}
//                 width={1200}
//                 height={600}
//                 alt={post.title}
//                 className="aspect-video w-full object-cover grayscale group-hover:grayscale-0 transition duration-500"
//               />

//               <CardHeader>
//                 <CardTitle className="text-center group-hover:text-blue-600 transition">
//                   {post.title}
//                 </CardTitle>

//                 <div className="text-center text-gray-400 text-sm">
//                   {/* {new Date(post.createdAt).toDateString()} */}
//                   By {post.author}
//                 </div>

//                 <CardDescription className="text-center">
//                   {post.description.slice(0, 120)}...
//                 </CardDescription>

//                 {/* READ MORE BUTTON */}

//                 <div className="text-center mt-4">
//                   <Link
//                     href={`/blogs/${post._id}`}
//                     className="text-blue-600 font-semibold hover:underline"
//                   >
//                     Read More →
//                   </Link>
//                 </div>
//               </CardHeader>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Import the new Carousel components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Blog = {
  _id: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  createdAt: string;
};

export default function OurLatestBlog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/blogs");
      setBlogs(res.data.data.slice(0, 5)); // Increased to 5 so you can actually slide!
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="text-center font-bold text-3xl my-16">
        LATEST FROM THE BLOG
      </h1>

      <div className="w-10/12 mx-auto relative px-10">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {blogs.map((post) => (
              <CarouselItem
                key={post._id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="group relative w-full h-full max-w-sm pt-0 overflow-hidden mx-auto">
                  {/* Image */}
                  <Image
                    src={post.imageUrl}
                    width={1200}
                    height={600}
                    alt={post.title}
                    className="aspect-video w-full object-cover grayscale group-hover:grayscale-0 transition duration-500"
                  />

                  <CardHeader>
                    <CardTitle className="text-center group-hover:text-blue-600 transition">
                      {post.title}
                    </CardTitle>

                    <div className="text-center text-gray-400 text-sm">
                      By {post.author}
                    </div>

                    <CardDescription className="text-center line-clamp-3">
                      {post.description}
                    </CardDescription>

                    {/* READ MORE BUTTON */}
                    <div className="text-center mt-4">
                      <Link
                        href={`/blogs/${post._id}`}
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        Read More →
                      </Link>
                    </div>
                  </CardHeader>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
