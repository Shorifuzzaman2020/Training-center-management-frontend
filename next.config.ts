// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//     images: {
//         domains: ["i.ibb.co"],
//     },

// };

// export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//     images: {
//         domains: [
//             "i.ibb.co",
//             "i.ibb.co.com",
//             "res.cloudinary.com"
//         ],
//         qualities: [75, 100],
//     },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.ibb.co",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "i.ibb.co.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "/**",
            },
        ],
        // ওয়ার্নিং দূর করার জন্য এই লাইনটি যোগ করুন
        qualities: [75, 100], 
    },
    // বোনাস ফিক্স: আপনার লকফাইলের ওয়ার্নিংটি যদি বন্ধ করতে চান, তবে এটি যোগ করতে পারেন
};

export default nextConfig;