// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Image from "next/image";

// type Notice = {
//     _id: string;
//     title: string;
//     description: string;
//     publishDate: string;
//     fileUrl?: string;
// };

// export default function PublicNoticePage() {

//     const [notices, setNotices] = useState<Notice[]>([]);

//     const fetchNotices = async () => {
//         const res = await axios.get(
//             "http://localhost:5000/api/v1/notices"
//         );

//         setNotices(res.data.data);
//     };

//     useEffect(() => {
//         fetchNotices();
//     }, []);

//     return (

//         <div className="bg-gray-50 min-h-screen py-14">

//             <div className="max-w-6xl mx-auto px-6">

//                 {/* HEADER */}

//                 <div className="text-center mb-12">

//                     <h1 className="text-4xl font-bold text-gray-800">
//                         📢 Latest Notices
//                     </h1>

//                     <p className="text-gray-500 mt-2">
//                         Stay updated with the latest announcements
//                     </p>

//                 </div>


//                 {/* NOTICE LIST */}

//                 <div className="grid md:grid-cols-2 gap-8">

//                     {notices.map((notice) => {

//                         const isImage =
//                             notice.fileUrl?.endsWith(".jpg") ||
//                             notice.fileUrl?.endsWith(".png") ||
//                             notice.fileUrl?.endsWith(".jpeg");

//                         const isPDF =
//                             notice.fileUrl?.endsWith(".pdf");

//                         return (

//                             <div
//                                 key={notice._id}
//                                 className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition"
//                             >

//                                 {/* TITLE */}

//                                 <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                                     {notice.title}
//                                 </h2>

//                                 {/* DATE */}

//                                 <p className="text-sm text-gray-500 mb-4">

//                                     Published:
//                                     {" "}
//                                     {new Date(
//                                         notice.publishDate
//                                     ).toLocaleString()}

//                                 </p>

//                                 {/* DESCRIPTION */}

//                                 <p className="text-gray-600 mb-4">
//                                     {notice.description}
//                                 </p>


//                                 {/* FILE PREVIEW */}

//                                 {notice.fileUrl && (

//                                     <div className="mb-4">

//                                         {/* IMAGE PREVIEW */}

//                                         {isImage && (

//                                             <Image
//                                                 src={notice.fileUrl}
//                                                 alt="notice file"
//                                                 width={200}
//                                                 height={200}
//                                                 className="rounded-lg border object-cover"
//                                             />

//                                         )}

//                                         {/* PDF PREVIEW */}

//                                         {isPDF && (

//                                             <iframe
//                                                 src={notice.fileUrl}
//                                                 className="w-full h-60 border rounded-lg"
//                                             />

//                                         )}

//                                     </div>

//                                 )}


//                                 {/* DOWNLOAD BUTTON */}

//                                 {notice.fileUrl && (

//                                     <a
//                                         href={notice.fileUrl}
//                                         download
//                                         target="_blank"
//                                         className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm"
//                                     >
//                                         Download File
//                                     </a>

//                                 )}

//                             </div>

//                         );

//                     })}

//                 </div>


//                 {/* EMPTY */}

//                 {notices.length === 0 && (

//                     <p className="text-center text-gray-500 mt-10">
//                         No notices available
//                     </p>

//                 )}

//             </div>

//         </div>

//     );

// }

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

type Notice = {
    _id: string;
    title: string;
    description: string;
    publishDate: string;
    fileUrl?: string;
};

export default function PublicNoticePage() {

    const [notices, setNotices] = useState<Notice[]>([]);

    const fetchNotices = async () => {
        const res = await axios.get(
            "http://localhost:5000/api/v1/notices"
        );

        setNotices(res.data.data);
    };

    useEffect(() => {
        fetchNotices();
    }, []);


    return (

        <div className="bg-gray-50 min-h-screen py-14">

            <div className="max-w-6xl mx-auto px-6">

                {/* HEADER */}

                <div className="text-center mb-12">

                    <h1 className="text-4xl font-bold text-gray-800">
                        📢 Latest Notices
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Stay updated with the latest announcements
                    </p>

                </div>

                {/* NOTICE LIST */}

                <div className="grid md:grid-cols-2 gap-8">

                    {notices.map((notice) => {

                        const fileUrl = notice.fileUrl || "";

                        const isImage =
                            fileUrl.endsWith(".jpg") ||
                            fileUrl.endsWith(".jpeg") ||
                            fileUrl.endsWith(".png") ||
                            fileUrl.endsWith(".webp");

                        const isPDF = fileUrl.endsWith(".pdf");

                        // Fix Cloudinary preview for PDF
                        const pdfPreviewUrl = isPDF
                            ? fileUrl.replace("/image/upload/", "/raw/upload/")
                            : fileUrl;

                        return (

                            <div
                                key={notice._id}
                                className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition"
                            >

                                {/* TITLE */}

                                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                    {notice.title}
                                </h2>

                                {/* DATE */}

                                <p className="text-sm text-gray-500 mb-4">
                                    Published: {new Date(notice.publishDate).toLocaleString()}
                                </p>

                                {/* DESCRIPTION */}

                                <p className="text-gray-600 mb-4">
                                    {notice.description}
                                </p>

                                {/* FILE PREVIEW */}

                                {fileUrl && (

                                    <div className="mb-4">

                                        {/* IMAGE PREVIEW */}

                                        {isImage && (

                                            <Image
                                                src={fileUrl}
                                                alt="notice file"
                                                width={600}
                                                height={400}
                                                className="rounded-lg border w-full object-cover"
                                            />

                                        )}

                                        {/* PDF PREVIEW */}

                                        {isPDF && (

                                            <iframe
                                                src={pdfPreviewUrl}
                                                className="w-full h-[500px] border rounded-lg"
                                            />

                                        )}

                                    </div>

                                )}

                                {/* DOWNLOAD BUTTON */}

                                {fileUrl && (

                                    <a
                                        href={fileUrl}
                                        download
                                        target="_blank"
                                        className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm"
                                    >
                                        Download File
                                    </a>

                                )}

                            </div>

                        );

                    })}

                </div>

                {/* EMPTY */}

                {notices.length === 0 && (

                    <p className="text-center text-gray-500 mt-10">
                        No notices available
                    </p>

                )}

            </div>

        </div>

    );

}