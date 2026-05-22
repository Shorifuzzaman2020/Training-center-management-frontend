// "use client";

// import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { toast } from "react-toastify";
// export default function SuccessPage() {
//   const params = useSearchParams();
//   const router = useRouter();

//   const courseId = params.get("courseId");

//   useEffect(() => {
//     if (courseId) {
//       setTimeout(() => {
//         // router.push(`/admission/${courseId}`);
//         toast.success("Application submitted successfully");
//       }, 2000);
//     }
//   }, [courseId]);

//   return <h1 className="text-center py-20">Payment Successful 🎉</h1>;
// }


"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const params = useSearchParams();
  const router = useRouter();

  const courseId = params.get("courseId");
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  
      const fetchAdnission = async () => {
          const res = await axios.get(
              "http://localhost:5000/api/v1/admissions"
          );
  
          setAdmissions(res.data.data);
      };
  
      useEffect(() => {
          fetchAdnission();
      }, []);

  useEffect(() => {
    const updatePayment = async () => {
      const studentId = admissions.find((a) => a.nidNumber === studentId)?._id;

      if (!studentId) return;
      await axios.patch(
        `http://localhost:5000/api/v1/admission/${studentId}/update-fee`,
        {
          feeAmount: 5000, // or dynamic
          approve: true,
        }
      );

      // redirect
      router.push(`/admission/${courseId}`);
    };

    updatePayment();
  }, []);

  return <h1>Payment Success 🎉</h1>;
}