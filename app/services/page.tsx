// "use client";

// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// type Service = {
//     _id: string;
//     serviceName: string;
//     serviceDescription: string;
//     serviceDate: string;
// };

// const ServicesPage = () => {
//     const [services, setServices] = useState<Service[]>([]);
//     const [loading, setLoading] = useState(true);

//     // Fetch Services
//     const fetchServices = async () => {
//         try {
//             const res = await fetch("http://localhost:5000/api/services");

//             if (!res.ok) throw new Error("Failed to load services");

//             const data = await res.json();
//             setServices(data);
//         } catch (err: any) {
//             toast.error(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchServices();
//     }, []);

//     if (loading)
//         return <h2 className="text-center mt-10 text-xl">Loading services...</h2>;

//     return (
//         <div className="p-8">
//             <h1 className="text-3xl font-bold mb-8 text-center">Our Services</h1>

//             {/* Card Grid */}
//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//                 {services.map((service) => (
//                     <div
//                         key={service._id}
//                         className="bg-white shadow-md rounded-xl p-6 border hover:shadow-xl transition duration-300"
//                     >
//                         {/* Title */}
//                         <h2 className="text-xl font-semibold text-blue-600 mb-3">
//                             {service.serviceName}
//                         </h2>

//                         {/* Description */}
//                         <p className="text-gray-600 mb-4 line-clamp-4">
//                             {service.serviceDescription}
//                         </p>

//                         {/* Date */}
//                         <div className="flex justify-between items-center">
//                             <span className="text-sm text-gray-500">
//                                 📅 {service.serviceDate}
//                             </span>

//                             <button
//                                 className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
//                                 onClick={() =>
//                                     toast.info(`Service: ${service.serviceName}`)
//                                 }
//                             >
//                                 View
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Empty State */}
//             {services.length === 0 && (
//                 <p className="text-center mt-10 text-gray-500">
//                     No services available
//                 </p>
//             )}
//         </div>
//     );
// };

// export default ServicesPage;


"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Service = {
    _id: string;
    serviceName: string;
    serviceDescription: string;
    serviceDate: string;
};

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchServices = async () => {
        const res = await fetch("http://localhost:5000/api/services");
        const data = await res.json();
        setServices(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchServices();
    }, []);

    // 🗑️ DELETE
    const handleDelete = async (id: string) => {
        if (!confirm("Delete this service?")) return;

        const res = await fetch(`http://localhost:5000/api/services/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            toast.success("Service deleted!");
            setServices(prev => prev.filter(s => s._id !== id));
        } else {
            toast.error("Delete failed");
        }
    };

    // ✏️ EDIT
    const handleEdit = (id: string) => {
        router.push(`/dashboard/services/edit/${id}`);
    };

    if (loading) return <h2 className="text-center mt-10">Loading...</h2>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Services</h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services.map(service => (
                    <div key={service._id} className="bg-white shadow-lg rounded-xl p-6 border">

                        <h2 className="text-xl font-semibold text-blue-600 mb-2">
                            {service.serviceName}
                        </h2>

                        <p className="text-gray-600 mb-4">
                            {service.serviceDescription}
                        </p>

                        <p className="text-sm text-gray-500 mb-4">
                            📅 {new Date(service.serviceDate).toLocaleDateString()}
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => handleEdit(service._id)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => handleDelete(service._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}