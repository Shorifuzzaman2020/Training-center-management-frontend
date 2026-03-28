// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//     images: {
//         domains: ["i.ibb.co"],
//     },

// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: [
            "i.ibb.co",
            "i.ibb.co.com",
            "res.cloudinary.com"
        ],
        qualities: [75, 100],
    },
};

export default nextConfig;
