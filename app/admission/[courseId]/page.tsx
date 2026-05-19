// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function AdmissionPage() {
//   const [courses, setCourses] = useState<any[]>([]);
//   const [batches, setBatches] = useState<any[]>([]);
//   const [photo, setPhoto] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     fullName: "",
//     dateOfBirth: "",
//     gender: "",
//     bloodGroup: "",
//     nationality: "Bangladeshi",
//     nidNumber: "",

//     mobileNumber: "",
//     alternateMobile: "",
//     email: "",

//     presentAddress: "",
//     permanentAddress: "",

//     emergencyContactName: "",
//     emergencyContactNumber: "",
//     emergencyRelation: "",

//     highestQualification: "",
//     instituteName: "",
//     passingYear: "",
//     result: "",

//     currentOccupation: "",
//     companyName: "",
//     designation: "",

//     course: "",
//     preferredBatch: "",

//     trainingMode: "",

//     leadSource: "",
//     referenceName: "",
//     reasonForJoining: "",

//     hasLaptop: "",
//     computerSkill: "",
//     portfolioLink: "",

//     yearsOfExperience: "",
//     linkedinProfile: "",

//     tshirtSize: "",
//     specialNeeds: "",
//   });

//   /* ---------------- FETCH COURSES ---------------- */

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/v1/courses");

//       setCourses(res.data.data);
//     } catch {
//       toast.error("Failed to load courses");
//     }
//   };

//   /* ---------------- FETCH BATCHES ---------------- */

//   useEffect(() => {
//     if (form.course) {
//       fetchBatches(form.course);
//     }
//   }, [form.course]);

//   const fetchBatches = async (courseId: string) => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/v1/batches?course=${courseId}`,
//       );

//       setBatches(res.data.data);
//     } catch {
//       toast.error("Failed to load batches");
//     }
//   };

//   /* ---------------- HANDLE INPUT ---------------- */

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;

//     setForm({
//       ...form,
//       [name]: value,
//     });
//   };

//   /* ---------------- PHOTO ---------------- */

//   const handlePhoto = (e: any) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     setPhoto(file);
//   };

//   /* ---------------- SUBMIT ---------------- */

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     setLoading(true);

//     const formData = new FormData();

//     Object.entries(form).forEach(([key, value]) => {
//       formData.append(key, value);
//     });

//     if (photo) {
//       formData.append("photo", photo);
//     }

//     try {
//       await axios.post(
//         "http://localhost:5000/api/v1/admissions/create-admission",
//         formData,
//       );

//       toast.success("Application submitted successfully");
//     } catch (error: any) {
//       toast.error(error?.response?.data?.message || "Submission failed");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="max-w-5xl mx-auto py-12 px-6">
//       <h1 className="text-3xl font-bold mb-10 text-center">
//         Student Admission Form
//       </h1>

//       <form
//         onSubmit={handleSubmit}
//         className="grid md:grid-cols-2 gap-6 bg-white p-8 shadow rounded-lg"
//       >
//         <input
//           name="fullName"
//           placeholder="Full Name"
//           onChange={handleChange}
//           className="input"
//           required
//         />

//         <input
//           type="date"
//           name="dateOfBirth"
//           onChange={handleChange}
//           className="input"
//         />

//         <select name="gender" onChange={handleChange} className="input">
//           <option value="">Gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//         </select>

//         <select name="bloodGroup" onChange={handleChange} className="input">
//           <option value="">Blood Group</option>
//           <option>A+</option>
//           <option>B+</option>
//           <option>O+</option>
//         </select>

//         <input
//           name="nidNumber"
//           placeholder="NID / Passport"
//           onChange={handleChange}
//           className="input"
//         />

//         <input
//           name="mobileNumber"
//           placeholder="Mobile Number"
//           onChange={handleChange}
//           className="input"
//           required
//         />

//         <input
//           name="alternateMobile"
//           placeholder="Alternate Mobile"
//           onChange={handleChange}
//           className="input"
//         />

//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           onChange={handleChange}
//           className="input"
//           required
//         />

//         <textarea
//           name="presentAddress"
//           placeholder="Present Address"
//           onChange={handleChange}
//           className="input col-span-2"
//         />

//         <textarea
//           name="permanentAddress"
//           placeholder="Permanent Address"
//           onChange={handleChange}
//           className="input col-span-2"
//         />

//         <input
//           name="highestQualification"
//           placeholder="Highest Qualification"
//           onChange={handleChange}
//           className="input"
//         />

//         <input
//           name="instituteName"
//           placeholder="Institute Name"
//           onChange={handleChange}
//           className="input"
//         />

//         <input
//           name="passingYear"
//           type="number"
//           placeholder="Passing Year"
//           onChange={handleChange}
//           className="input"
//         />

//         <input
//           name="result"
//           placeholder="Result/GPA"
//           onChange={handleChange}
//           className="input"
//         />

//         {/* COURSE */}

//         <select
//           name="course"
//           onChange={handleChange}
//           className="input"
//           required
//         >
//           <option value="">Select Course</option>

//           {courses.map((course) => (
//             <option key={course._id} value={course._id}>
//               {course.name}
//             </option>
//           ))}
//         </select>

//         {/* BATCH */}

//         <select name="preferredBatch" onChange={handleChange} className="input">
//           <option value="">Select Batch</option>

//           {batches.map((batch) => (
//             <option key={batch._id} value={batch._id}>
//               {batch.batchName}
//             </option>
//           ))}
//         </select>

//         {/* TRAINING MODE */}

//         <select name="trainingMode" onChange={handleChange} className="input">
//           <option value="">Training Mode</option>
//           <option value="online">Online</option>
//           <option value="offline">Offline</option>
//           <option value="hybrid">Hybrid</option>
//         </select>

//         {/* PHOTO */}

//         <div className="col-span-2">
//           <label className="font-medium">Student Photo</label>

//           <input
//             type="file"
//             accept="image/*"
//             onChange={handlePhoto}
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         {/* REASON */}

//         <textarea
//           name="reasonForJoining"
//           placeholder="Reason for joining"
//           onChange={handleChange}
//           className="input col-span-2"
//         />

//         {/* SUBMIT */}

//         <button
//           disabled={loading}
//           className="col-span-2 bg-indigo-600 text-white py-3 rounded-lg"
//         >
//           {loading ? "Submitting..." : "Submit Application"}
//         </button>
//       </form>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function AdmissionPage() {
//   const [courses, setCourses] = useState<any[]>([]);
//   const [batches, setBatches] = useState<any[]>([]);
//   const [photo, setPhoto] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     fullName: "",
//     dateOfBirth: "",
//     gender: "",
//     bloodGroup: "",
//     nationality: "Bangladeshi",
//     nidNumber: "",

//     mobileNumber: "",
//     alternateMobile: "",
//     email: "",

//     presentAddress: "",
//     permanentAddress: "",

//     emergencyContactName: "",
//     emergencyContactNumber: "",
//     emergencyRelation: "",

//     highestQualification: "",
//     instituteName: "",
//     passingYear: "",
//     result: "",

//     currentOccupation: "",
//     companyName: "",
//     designation: "",

//     course: "",
//     preferredBatch: "",

//     trainingMode: "",

//     leadSource: "",
//     referenceName: "",
//     reasonForJoining: "",

//     hasLaptop: "",
//     computerSkill: "",
//     portfolioLink: "",

//     yearsOfExperience: "",
//     linkedinProfile: "",

//     tshirtSize: "",
//     specialNeeds: "",
//   });

//   /* ---------------- FETCH COURSES ---------------- */

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/v1/courses");

//       setCourses(res.data.data);
//     } catch {
//       toast.error("Failed to load courses");
//     }
//   };

//   /* ---------------- FETCH BATCHES ---------------- */

//   useEffect(() => {
//     if (form.course) {
//       fetchBatches(form.course);
//     }
//   }, [form.course]);

//   const fetchBatches = async (courseId: string) => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/v1/batches?course=${courseId}`,
//       );

//       setBatches(res.data.data);
//     } catch {
//       toast.error("Failed to load batches");
//     }
//   };

//   /* ---------------- HANDLE INPUT ---------------- */

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;

//     setForm({
//       ...form,
//       [name]: value,
//     });
//   };

//   /* ---------------- PHOTO ---------------- */

//   const handlePhoto = (e: any) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     setPhoto(file);
//   };

//   /* ---------------- SUBMIT ---------------- */

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     setLoading(true);

//     const formData = new FormData();

//     Object.entries(form).forEach(([key, value]) => {
//       formData.append(key, value);
//     });

//     if (photo) {
//       formData.append("photo", photo);
//     }

//     try {
//       await axios.post(
//         "http://localhost:5000/api/v1/admissions/create-admission",
//         formData,
//       );

//       toast.success("Application submitted successfully");
//     } catch (error: any) {
//       toast.error(error?.response?.data?.message || "Submission failed");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-10">
//           <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
//             <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//             </svg>
//           </div>
//           <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
//             Student Admission Form
//           </h1>
//           <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
//             Begin your learning journey with us. Fill out the form below to apply.
//           </p>
//         </div>

//         {/* Form Card */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
//             <h2 className="text-xl font-semibold text-white">Application Form</h2>
//             <p className="text-indigo-100 text-sm mt-1">Please fill in all required fields</p>
//           </div>

//           <form onSubmit={handleSubmit} className="p-6 md:p-8">
//             {/* Personal Information Section */}
//             <div className="mb-8">
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
//                 <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
//                   <input
//                     name="fullName"
//                     placeholder="Enter your full name"
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
//                   <input
//                     type="date"
//                     name="dateOfBirth"
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   />
//                 </div>

//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">Gender</label>
//                   <select name="gender" onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200">
//                     <option value="">Select Gender</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                   </select>
//                 </div>

//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">Blood Group</label>
//                   <select name="bloodGroup" onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200">
//                     <option value="">Select Blood Group</option>
//                     <option>A+</option>
//                     <option>A-</option>
//                     <option>B+</option>
//                     <option>B-</option>
//                     <option>AB+</option>
//                     <option>AB-</option>
//                     <option>O+</option>
//                     <option>O-</option>
//                   </select>
//                 </div>

//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">NID / Passport</label>
//                   <input
//                     name="nidNumber"
//                     placeholder="Enter NID or Passport number"
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Contact Information Section */}
//             <div className="mb-8">
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
//                 <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">Mobile Number <span className="text-red-500">*</span></label>
//                   <input
//                     name="mobileNumber"
//                     placeholder="Enter mobile number"
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">Alternate Mobile</label>
//                   <input
//                     name="alternateMobile"
//                     placeholder="Enter alternate mobile number"
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   />
//                 </div>

//                 <div className="space-y-1 md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
//                   <input
//                     name="email"
//                     type="email"
//                     placeholder="Enter email address"
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-1 md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700">Present Address</label>
//                   <textarea
//                     name="presentAddress"
//                     placeholder="Enter present address"
//                     rows={2}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   />
//                 </div>

//                 <div className="space-y-1 md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700">Permanent Address</label>
//                   <textarea
//                     name="permanentAddress"
//                     placeholder="Enter permanent address"
//                     rows={2}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Academic Information Section */}
//             <div className="mb-8">
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
//                 <h3 className="text-lg font-semibold text-gray-800">Academic Information</h3>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">Highest Qualification</label>
//                   <input
//                     name="highestQualification"
//                     placeholder="e.g., Bachelor's in Computer Science"
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   />
//                 </div>

//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">Institute Name</label>
//                   <input
//                     name="instituteName"
//                     placeholder="Name of institute"
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   />
//                 </div>

//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">Passing Year</label>
//                   <input
//                     name="passingYear"
//                     type="number"
//                     placeholder="Year of passing"
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   />
//                 </div>

//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">Result / GPA</label>
//                   <input
//                     name="result"
//                     placeholder="e.g., 3.50 or First Class"
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Course Selection Section */}
//             <div className="mb-8">
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
//                 <h3 className="text-lg font-semibold text-gray-800">Course & Training Details</h3>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">Select Course <span className="text-red-500">*</span></label>
//                   <select
//                     name="course"
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                     required
//                   >
//                     <option value="">Select Course</option>
//                     {courses.map((course) => (
//                       <option key={course._id} value={course._id}>
//                         {course.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">Preferred Batch</label>
//                   <select name="preferredBatch" onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200">
//                     <option value="">Select Batch</option>
//                     {batches.map((batch) => (
//                       <option key={batch._id} value={batch._id}>
//                         {batch.batchName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">Training Mode</label>
//                   <select name="trainingMode" onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200">
//                     <option value="">Select Mode</option>
//                     <option value="online">Online</option>
//                     <option value="offline">Offline</option>
//                     <option value="hybrid">Hybrid</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Photo Upload Section */}
//             <div className="mb-8">
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
//                 <h3 className="text-lg font-semibold text-gray-800">Documents</h3>
//               </div>
//               <div className="bg-gray-50 rounded-xl p-5 border-2 border-dashed border-gray-300 hover:border-indigo-400 transition-all duration-200">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Student Photo</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handlePhoto}
//                   className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all duration-200"
//                 />
//                 <p className="text-xs text-gray-400 mt-2">Upload a recent passport-sized photograph (JPG, PNG format)</p>
//               </div>
//             </div>

//             {/* Additional Information */}
//             <div className="mb-8">
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
//                 <h3 className="text-lg font-semibold text-gray-800">Additional Information</h3>
//               </div>
//               <div className="space-y-5">
//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">Reason for joining</label>
//                   <textarea
//                     name="reasonForJoining"
//                     placeholder="Tell us why you want to join this course"
//                     rows={3}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="pt-4 border-t border-gray-200">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Submitting Application...
//                   </span>
//                 ) : (
//                   "Submit Application"
//                 )}
//               </button>
//               <p className="text-center text-xs text-gray-400 mt-4">
//                 By submitting this form, you agree to our terms and conditions
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default function AdmissionPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [batches, setBatches] = useState<any[]>([]);
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    nationality: "Bangladeshi",
    nidNumber: "",

    mobileNumber: "",
    alternateMobile: "",
    email: "",

    presentAddress: "",
    permanentAddress: "",

    emergencyContactName: "",
    emergencyContactNumber: "",
    emergencyRelation: "",

    highestQualification: "",
    instituteName: "",
    passingYear: "",
    result: "",

    currentOccupation: "",
    companyName: "",
    designation: "",

    course: "",
    preferredBatch: "",

    trainingMode: "",

    leadSource: "",
    referenceName: "",
    reasonForJoining: "",

    hasLaptop: "",
    computerSkill: "",
    portfolioLink: "",

    yearsOfExperience: "",
    linkedinProfile: "",

    tshirtSize: "",
    specialNeeds: "",
  });

  /* ---------------- FETCH COURSES ---------------- */

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses");
      setCourses(res.data.data);
    } catch (error: any) {
      console.error("Error fetching courses:", error);
      toast.error(error?.response?.data?.message || "Failed to load courses");
    }
  };

  /* ---------------- FETCH BATCHES ---------------- */

  useEffect(() => {
    if (form.course) {
      fetchBatches(form.course);
    }
  }, [form.course]);

  const fetchBatches = async (courseId: string) => {
    try {
      const res = await api.get(`/batches?course=${courseId}`);
      setBatches(res.data.data);
    } catch (error: any) {
      console.error("Error fetching batches:", error);
      toast.error(error?.response?.data?.message || "Failed to load batches");
    }
  };

  /* ---------------- HANDLE INPUT ---------------- */

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  /* ---------------- PHOTO ---------------- */

  const handlePhoto = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(file);
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      
      // Append all form fields
      Object.entries(form).forEach(([key, value]) => {
        if (value) { // Only append non-empty values
          formData.append(key, value);
        }
      });

      if (photo) {
        formData.append("photo", photo);
      }

      // Log the form data for debugging
      console.log("Submitting form data:");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const response = await api.post("/admissions/create-admission", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000, // 30 seconds timeout
      });

      console.log("Response:", response.data);
      toast.success("Application submitted successfully");
      
      // Optional: Reset form after successful submission
      // resetForm();
      
    } catch (error: any) {
      console.error("Submission error details:", error);
      
      if (error.code === "ECONNABORTED") {
        toast.error("Request timeout. Please try again.");
      } else if (error.code === "ERR_NETWORK") {
        toast.error("Network error. Please check if the backend server is running on http://localhost:5000");
      } else if (error.response) {
        // Server responded with error status
        toast.error(error.response.data?.message || `Server error: ${error.response.status}`);
      } else if (error.request) {
        // Request was made but no response received
        toast.error("No response from server. Please check if backend is running.");
      } else {
        toast.error(error?.message || "Submission failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Student Admission Form
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Begin your learning journey with us. Fill out the form below to apply.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Application Form</h2>
            <p className="text-indigo-100 text-sm mt-1">Please fill in all required fields</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            {/* Personal Information Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
                <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                  <input
                    name="fullName"
                    placeholder="Enter your full name"
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <select name="gender" onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                  <select name="bloodGroup" onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200">
                    <option value="">Select Blood Group</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">NID / Passport</label>
                  <input
                    name="nidNumber"
                    placeholder="Enter NID or Passport number"
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Mobile Number <span className="text-red-500">*</span></label>
                  <input
                    name="mobileNumber"
                    placeholder="Enter mobile number"
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Alternate Mobile</label>
                  <input
                    name="alternateMobile"
                    placeholder="Enter alternate mobile number"
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Present Address</label>
                  <textarea
                    name="presentAddress"
                    placeholder="Enter present address"
                    rows={2}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Permanent Address</label>
                  <textarea
                    name="permanentAddress"
                    placeholder="Enter permanent address"
                    rows={2}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Academic Information Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
                <h3 className="text-lg font-semibold text-gray-800">Academic Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Highest Qualification</label>
                  <input
                    name="highestQualification"
                    placeholder="e.g., Bachelor's in Computer Science"
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Institute Name</label>
                  <input
                    name="instituteName"
                    placeholder="Name of institute"
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Passing Year</label>
                  <input
                    name="passingYear"
                    type="number"
                    placeholder="Year of passing"
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Result / GPA</label>
                  <input
                    name="result"
                    placeholder="e.g., 3.50 or First Class"
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Course Selection Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
                <h3 className="text-lg font-semibold text-gray-800">Course & Training Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Select Course <span className="text-red-500">*</span></label>
                  <select
                    name="course"
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    required
                  >
                    <option value="">Select Course</option>
                    {courses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Preferred Batch</label>
                  <select name="preferredBatch" onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200">
                    <option value="">Select Batch</option>
                    {batches.map((batch) => (
                      <option key={batch._id} value={batch._id}>
                        {batch.batchName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Training Mode</label>
                  <select name="trainingMode" onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200">
                    <option value="">Select Mode</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Photo Upload Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
                <h3 className="text-lg font-semibold text-gray-800">Documents</h3>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border-2 border-dashed border-gray-300 hover:border-indigo-400 transition-all duration-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">Student Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all duration-200"
                />
                <p className="text-xs text-gray-400 mt-2">Upload a recent passport-sized photograph (JPG, PNG format)</p>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
                <h3 className="text-lg font-semibold text-gray-800">Additional Information</h3>
              </div>
              <div className="space-y-5">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Reason for joining</label>
                  <textarea
                    name="reasonForJoining"
                    placeholder="Tell us why you want to join this course"
                    rows={3}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting Application...
                  </span>
                ) : (
                  "Submit Application"
                )}
              </button>
              <p className="text-center text-xs text-gray-400 mt-4">
                By submitting this form, you agree to our terms and conditions
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}