// "use client";

// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Image from "next/image";
// import { useEffect } from "react";
// type Role = {
//     _id: string;
//     name: string;
// };
// const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// export default function CreateEmployeePage() {

//     const [loading, setLoading] = useState(false);
//     const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
//     const [weekends, setWeekends] = useState<string[]>([]);
//     const [preview, setPreview] = useState<string | null>(null);
//     const [roles, setRoles] = useState<Role[]>([]);

//     // role multi select
//     const handleRoleChange = (role: string) => {
//         setSelectedRoles(prev =>
//             prev.includes(role)
//                 ? prev.filter(r => r !== role)
//                 : [...prev, role]
//         );
//     };

//     // weekend multi select
//     const handleWeekend = (day: string) => {
//         setWeekends(prev =>
//             prev.includes(day)
//                 ? prev.filter(d => d !== day)
//                 : [...prev, day]
//         );
//     };

//     // image preview
//     const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (!file) return;
//         setPreview(URL.createObjectURL(file));
//     };

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setLoading(true);

//         const form = e.currentTarget;
//         const formData = new FormData(form);

//         // send arrays
//         formData.set("role", selectedRoles.join(","));
//         formData.set("weekendDays", weekends.join(","));

//         try {
//             await axios.post(
//                 "http://localhost:5000/api/v1/employees/create-employee",
//                 formData
//             );

//             toast.success("Employee Created Successfully 🎉");
//             form.reset();
//             setSelectedRoles([]);
//             setWeekends([]);
//             setPreview(null);

//         } catch (error: any) {
//             toast.error(error?.response?.data?.message || "Creation Failed ❌");
//         }

//         setLoading(false);
//     };
//     useEffect(() => {
//         const fetchRoles = async () => {
//             try {
//                 const res = await axios.get(
//                     "http://localhost:5000/api/v1/roles"
//                 );
//                 setRoles(res.data.data);
//             } catch (error) {
//                 toast.error("Failed to load roles");
//             }
//         };

//         fetchRoles();
//     }, []);

//     return (
//         <div className="bg-gray-100 min-h-screen py-10">
//         <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-8">

//             {/* TITLE */}
//             <div className="bg-white shadow rounded-xl p-6 text-center">
//                 <h1 className="text-3xl font-bold">Employee Registration</h1>
//                 <p className="text-gray-500">Fill all employee information</p>
//             </div>

//             {/* EMPLOYMENT INFORMATION */}
//             <Section title="Employment Information">
//                 <Input name="companyStaffId" label="Staff ID" required />
//                 <Input name="designation" label="Designation" required />

//                 <Select name="employmentType" label="Employment Type" options={["Full Time", "Part Time", "Contract", "Intern"]} />
//                 <Select name="employmentStatus" label="Employment Status" options={["Active", "Inactive", "Resigned", "Terminated"]} />

//                 <Input name="joiningDate" label="Joining Date" type="date" required />
//                 <Input name="salary" label="Salary" type="number" required />

//                 <Input name="probationPeriod" label="Probation Period (months)" />
//                 <Input name="reportingTo" label="Reporting To" />

//                 {/* Weekend selector */}
//                 <div className="col-span-2">
//                     <label className="font-semibold">Weekend Days</label>
//                     <div className="flex flex-wrap gap-3 mt-2">
//                         {days.map(day => (
//                             <button
//                                 key={day}
//                                 type="button"
//                                 onClick={() => handleWeekend(day)}
//                                 className={`px-3 py-2 rounded-lg border
//               ${weekends.includes(day)
//                                         ? "bg-indigo-600 text-white"
//                                         : "bg-white hover:bg-gray-100"}`}
//                             >
//                                 {day}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             </Section>

//             {/* ACCOUNT */}
//             <Section title="User Account">
//                 <Input name="userId" label="User ID" required />
//                 <Input name="password" label="Password" type="password" required />

//                 <div className="col-span-2">
//                     <label className="font-semibold">Assign Roles</label>
//                     <div className="flex flex-wrap gap-3 mt-2">
//                         {roles.map(role => (
//                             <button
//                                 type="button"
//                                 key={role._id}
//                                 onClick={() => handleRoleChange(role.name)}
//                                 className={`px-4 py-2 rounded-full border transition
//   ${selectedRoles.includes(role.name)
//                                         ? "bg-black text-white border-black"
//                                         : "bg-white hover:bg-gray-100"}`}
//                             >
//                                 {role.name}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             </Section>

//             {/* PERSONAL */}
//             <Section title="Personal Information">
//                 <Input name="fullName" label="Full Name" required />
//                 <Input name="dateOfBirth" label="Date of Birth" type="date" required />
//                 <Input name="fatherName" label="Father Name" required />
//                 <Input name="motherName" label="Mother Name" required />
//             </Section>

//             {/* CONTACT */}
//             <Section title="Contact Information">
//                 <Input name="phone" label="Phone" required />
//                 <Input name="alternatePhone" label="Alternate Phone" />
//                 <Textarea name="presentAddress" label="Present Address" required />
//                 <Textarea name="permanentAddress" label="Permanent Address" required />
//             </Section>

//             {/* PHOTO */}
//             <Section title="Photo Upload">
//                 <div className="col-span-2">
//                     <input
//                         name="photo"
//                         type="file"
//                         accept="image/*"
//                         required
//                         onChange={handleImage}
//                         className="w-full border rounded-lg p-2"
//                     />
//                     {preview && (
//                         <Image src={preview}
//                             alt="Preview"
//                             width={160}
//                             height={160}
//                             className="mt-4 h-40 rounded-lg border"
//                         />
//                     )}
//                 </div>
//             </Section>

//             {/* SUBMIT */}
//             <div className="text-center">
//                 <button
//                     disabled={loading}
//                     className="bg-indigo-600 text-white px-10 py-3 rounded-xl hover:bg-indigo-700 transition"
//                 >
//                     {loading ? "Creating..." : "Create Employee"}
//                 </button>
//             </div>

//         </form>
//         </div>
//     );
// }



// const Section = ({ title, children }: { title: string, children: any }) => (
//     <div className="bg-white shadow rounded-xl p-6 grid grid-cols-2 gap-5">
//         <h2 className="col-span-2 text-xl font-semibold border-b pb-2">{title}</h2>
//         {children}
//     </div>
// );

// const Input = ({ label, ...props }: any) => (
//     <div className="flex flex-col">
//         <label className="mb-1 font-medium">{label}</label>
//         <input {...props} className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500" />
//     </div>
// );

// const Textarea = ({ label, ...props }: any) => (
//     <div className="flex flex-col col-span-2">
//         <label className="mb-1 font-medium">{label}</label>
//         <textarea {...props} className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500" />
//     </div>
// );

// const Select = ({ label, options, ...props }: any) => (
//     <div className="flex flex-col">
//         <label className="mb-1 font-medium">{label}</label>
//         <select {...props} className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500">
//             <option value="">Select</option>
//             {options.map((o: string) => <option key={o}>{o}</option>)}
//         </select>
//     </div>
// );


// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Image from "next/image";

// type Role = {
//     _id: string;
//     name: string;
// };

// const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// export default function CreateEmployeePage() {

//     const [employees, setEmployees] = useState<any[]>([])
//     const [roles, setRoles] = useState<Role[]>([])
//     const [showForm, setShowForm] = useState(false)
//     const [editId, setEditId] = useState<string | null>(null)

//     const [loading, setLoading] = useState(false)

//     const [selectedRoles, setSelectedRoles] = useState<string[]>([])
//     const [weekends, setWeekends] = useState<string[]>([])
//     const [preview, setPreview] = useState<string | null>(null)

//     const [search, setSearch] = useState("")
//     const [currentPage, setCurrentPage] = useState(1)

//     const rowsPerPage = 5

//     /* ================= FETCH ================= */

//     const fetchEmployees = async () => {

//         const res = await axios.get(
//             "http://localhost:5000/api/v1/employees"
//         )

//         setEmployees(res.data.data)

//     }

//     const fetchRoles = async () => {

//         const res = await axios.get(
//             "http://localhost:5000/api/v1/roles"
//         )

//         setRoles(res.data.data)

//     }

//     useEffect(() => {
//         fetchEmployees()
//         fetchRoles()
//     }, [])

//     /* ================= SEARCH ================= */

//     const filteredEmployees = employees.filter((emp: any) =>
//         emp.fullName?.toLowerCase().includes(search.toLowerCase()) ||
//         emp.companyStaffId?.toLowerCase().includes(search.toLowerCase())
//     )

//     useEffect(() => {
//         setCurrentPage(1)
//     }, [search])

//     /* ================= PAGINATION ================= */

//     const indexOfLast = currentPage * rowsPerPage
//     const indexOfFirst = indexOfLast - rowsPerPage

//     const currentEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast)

//     const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage)

//     /* ================= ROLE ================= */

//     const handleRoleChange = (role: string) => {

//         setSelectedRoles(prev =>
//             prev.includes(role)
//                 ? prev.filter(r => r !== role)
//                 : [...prev, role]
//         )

//     }

//     /* ================= WEEKEND ================= */

//     const handleWeekend = (day: string) => {

//         setWeekends(prev =>
//             prev.includes(day)
//                 ? prev.filter(d => d !== day)
//                 : [...prev, day]
//         )

//     }

//     /* ================= IMAGE ================= */

//     const handleImage = (e: any) => {

//         const file = e.target.files?.[0]

//         if (!file) return

//         setPreview(URL.createObjectURL(file))

//     }

//     /* ================= EDIT ================= */

//     const handleEdit = (emp: any) => {

//         setEditId(emp._id)

//         setSelectedRoles(emp.role || [])
//         setWeekends(emp.weekendDays || [])

//         setPreview(emp.photo || null)

//         setShowForm(true)

//         setTimeout(() => {

//             const form: any = document.getElementById("employeeForm")

//             if (!form) return

//             Object.keys(emp).forEach(key => {

//                 if (!form[key]) return

//                 // Skip file input
//                 if (key === "photo") return

//                 if (key === "joiningDate" || key === "dateOfBirth") {
//                     form[key].value = emp[key]?.slice(0, 10)
//                 }
//                 else {
//                     form[key].value = emp[key]
//                 }

//             })

//         }, 100)

//     }

//     /* ================= DELETE ================= */

//     const handleDelete = async (id: string) => {

//         if (!confirm("Delete employee?")) return

//         await axios.delete(
//             `http://localhost:5000/api/v1/employees/${id}`
//         )

//         toast.success("Employee deleted")

//         fetchEmployees()

//     }

//     /* ================= SUBMIT ================= */

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

//         e.preventDefault()

//         setLoading(true)

//         const form = e.currentTarget

//         const formData = new FormData(form)

//         formData.set("role", selectedRoles.join(","))
//         formData.set("weekendDays", weekends.join(","))

//         try {

//             if (editId) {

//                 await axios.patch(
//                     `http://localhost:5000/api/v1/employees/${editId}`,
//                     formData
//                 )

//                 toast.success("Employee updated")

//             }
//             else {

//                 await axios.post(
//                     "http://localhost:5000/api/v1/employees/create-employee",
//                     formData
//                 )

//                 toast.success("Employee created")

//             }

//             form.reset()

//             setSelectedRoles([])
//             setWeekends([])
//             setPreview(null)
//             setEditId(null)
//             setShowForm(false)

//             fetchEmployees()

//         }
//         catch (error: any) {

//             toast.error(error?.response?.data?.message || "Operation failed")

//         }

//         setLoading(false)

//     }

//     /* ================= UI ================= */

//     return (

//         <div className="bg-gray-100 min-h-screen py-10">

//             <div className="max-w-6xl mx-auto">

//                 {/* ================= TABLE ================= */}

//                 {!showForm && (

//                     <div className="bg-white shadow rounded-xl p-6">

//                         <div className="flex justify-between mb-4">

//                             <h1 className="text-2xl font-bold">Employee List</h1>

//                             <button
//                                 onClick={() => setShowForm(true)}
//                                 className="bg-indigo-600 text-white px-6 py-2 rounded"
//                             >
//                                 Create Employee
//                             </button>

//                         </div>

//                         <input
//                             placeholder="Search employee..."
//                             className="border p-2 w-full mb-4"
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                         />

//                         <table className="w-full border">

//                             <thead className="bg-gray-100">

//                                 <tr>

//                                     <th className="p-2 border">Staff ID</th>
//                                     <th className="p-2 border">Name</th>
//                                     <th className="p-2 border">Phone</th>
//                                     <th className="p-2 border">Designation</th>
//                                     <th className="p-2 border">Action</th>

//                                 </tr>

//                             </thead>

//                             <tbody>

//                                 {currentEmployees.map(emp => (

//                                     <tr key={emp._id} className="text-center">

//                                         <td className="border p-2">{emp.companyStaffId}</td>
//                                         <td className="border p-2">{emp.fullName}</td>
//                                         <td className="border p-2">{emp.phone}</td>
//                                         <td className="border p-2">{emp.designation}</td>

//                                         <td className="border p-2 space-x-2">

//                                             <button
//                                                 onClick={() => handleEdit(emp)}
//                                                 className="bg-blue-500 text-white px-3 py-1 rounded"
//                                             >
//                                                 Edit
//                                             </button>

//                                             <button
//                                                 onClick={() => handleDelete(emp._id)}
//                                                 className="bg-red-500 text-white px-3 py-1 rounded"
//                                             >
//                                                 Delete
//                                             </button>

//                                         </td>

//                                     </tr>

//                                 ))}

//                             </tbody>

//                         </table>

//                         <div className="flex justify-center gap-2 mt-4">

//                             {Array.from({ length: totalPages }, (_, i) => (

//                                 <button
//                                     key={i}
//                                     onClick={() => setCurrentPage(i + 1)}
//                                     className={`px-3 py-1 border rounded
// ${currentPage === i + 1 ? "bg-indigo-600 text-white" : ""}`}
//                                 >
//                                     {i + 1}
//                                 </button>

//                             ))}

//                         </div>

//                     </div>

//                 )}

//                 {/* ================= ORIGINAL FORM ================= */}

//                 {showForm && (

//                     <form
//                         id="employeeForm"
//                         onSubmit={handleSubmit}
//                         className="max-w-6xl mx-auto space-y-8"
//                     >

//                         {/* TITLE */}
//                         <div className="bg-white shadow rounded-xl p-6 text-center">
//                             <h1 className="text-3xl font-bold">Employee Registration</h1>
//                             <p className="text-gray-500">Fill all employee information</p>
//                         </div>

//                         {/* EMPLOYMENT INFORMATION */}
//                         <Section title="Employment Information">

//                             <Input name="companyStaffId" label="Staff ID" required />
//                             <Input name="designation" label="Designation" required />

//                             <Select name="employmentType" label="Employment Type"
//                                 options={["Full Time", "Part Time", "Contract", "Intern"]}
//                             />

//                             <Select name="employmentStatus" label="Employment Status"
//                                 options={["Active", "Inactive", "Resigned", "Terminated"]}
//                             />

//                             <Input name="joiningDate" label="Joining Date" type="date" required />

//                             <Input name="salary" label="Salary" type="number" required />

//                             <Input name="probationPeriod" label="Probation Period (months)" />

//                             <Input name="reportingTo" label="Reporting To" />

//                             <div className="col-span-2">

//                                 <label className="font-semibold">Weekend Days</label>

//                                 <div className="flex flex-wrap gap-3 mt-2">

//                                     {days.map(day => (

//                                         <button
//                                             key={day}
//                                             type="button"
//                                             onClick={() => handleWeekend(day)}
//                                             className={`px-3 py-2 rounded-lg border
// ${weekends.includes(day)
//                                                     ? "bg-indigo-600 text-white"
//                                                     : "bg-white hover:bg-gray-100"}`}
//                                         >
//                                             {day}
//                                         </button>

//                                     ))}

//                                 </div>

//                             </div>

//                         </Section>

//                         {/* ACCOUNT */}
//                         <Section title="User Account">

//                             <Input name="userId" label="User ID" required />

//                             <Input name="password" label="Password" type="password" required />

//                             <div className="col-span-2">

//                                 <label className="font-semibold">Assign Roles</label>

//                                 <div className="flex flex-wrap gap-3 mt-2">

//                                     {roles.map(role => (

//                                         <button
//                                             type="button"
//                                             key={role._id}
//                                             onClick={() => handleRoleChange(role.name)}
//                                             className={`px-4 py-2 rounded-full border transition
// ${selectedRoles.includes(role.name)
//                                                     ? "bg-black text-white border-black"
//                                                     : "bg-white hover:bg-gray-100"}`}
//                                         >
//                                             {role.name}
//                                         </button>

//                                     ))}

//                                 </div>

//                             </div>

//                         </Section>

//                         {/* PERSONAL */}
//                         <Section title="Personal Information">

//                             <Input name="fullName" label="Full Name" required />
//                             <Input name="dateOfBirth" label="Date of Birth" type="date" required />
//                             <Input name="fatherName" label="Father Name" required />
//                             <Input name="motherName" label="Mother Name" required />

//                         </Section>

//                         {/* CONTACT */}
//                         <Section title="Contact Information">

//                             <Input name="phone" label="Phone" required />
//                             <Input name="alternatePhone" label="Alternate Phone" />

//                             <Textarea name="presentAddress" label="Present Address" required />

//                             <Textarea name="permanentAddress" label="Permanent Address" required />

//                         </Section>

//                         {/* PHOTO */}
//                         <Section title="Photo Upload">

//                             <div className="col-span-2">

//                                 <input
//                                     name="photo"
//                                     type="file"
//                                     accept="image/*"
//                                     onChange={handleImage}
//                                     className="w-full border rounded-lg p-2"
//                                 />

//                                 {preview && typeof preview === "string" && (
//                                     <Image
//                                         src={preview.startsWith("http") ? preview : `${preview}`}
//                                         alt="Preview"
//                                         width={160}
//                                         height={160}
//                                         className="mt-4 h-40 rounded-lg border"
//                                     />
//                                 )}

//                             </div>

//                         </Section>

//                         <div className="text-center">

//                             <button
//                                 disabled={loading}
//                                 className="bg-indigo-600 text-white px-10 py-3 rounded-xl hover:bg-indigo-700 transition"
//                             >
//                                 {loading ? "Saving..." : "Save Employee"}
//                             </button>

//                         </div>

//                     </form>

//                 )}

//             </div>

//         </div>

//     )

// }

// /* ================= COMPONENTS ================= */

// const Section = ({ title, children }: { title: string, children: any }) => (
//     <div className="bg-white shadow rounded-xl p-6 grid grid-cols-2 gap-5">
//         <h2 className="col-span-2 text-xl font-semibold border-b pb-2">{title}</h2>
//         {children}
//     </div>
// )

// const Input = ({ label, ...props }: any) => (
//     <div className="flex flex-col">
//         <label className="mb-1 font-medium">{label}</label>
//         <input {...props} className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500" />
//     </div>
// )

// const Textarea = ({ label, ...props }: any) => (
//     <div className="flex flex-col col-span-2">
//         <label className="mb-1 font-medium">{label}</label>
//         <textarea {...props} className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500" />
//     </div>
// )

// const Select = ({ label, options, ...props }: any) => (
//     <div className="flex flex-col">
//         <label className="mb-1 font-medium">{label}</label>
//         <select {...props} className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500">
//             <option value="">Select</option>
//             {options.map((o: string) => (<option key={o}>{o}</option>))}
//         </select>
//     </div>
// )


"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";

type Role = {
    _id: string;
    name: string;
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const API_BASE_URL = "http://localhost:5000";

export default function CreateEmployeePage() {

    const [employees, setEmployees] = useState<any[]>([])
    const [roles, setRoles] = useState<Role[]>([])
    const [showForm, setShowForm] = useState(false)
    const [editId, setEditId] = useState<string | null>(null)

    const [loading, setLoading] = useState(false)

    const [selectedRoles, setSelectedRoles] = useState<string[]>([])
    const [weekends, setWeekends] = useState<string[]>([])
    const [preview, setPreview] = useState<string | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const rowsPerPage = 5

    /* ================= FETCH ================= */

    const fetchEmployees = async () => {

        const res = await axios.get(
            `${API_BASE_URL}/api/v1/employees`
        )

        setEmployees(res.data.data)

    }

    const fetchRoles = async () => {

        const res = await axios.get(
            `${API_BASE_URL}/api/v1/roles`
        )

        setRoles(res.data.data)

    }

    useEffect(() => {
        fetchEmployees()
        fetchRoles()
    }, [])

    /* ================= SEARCH ================= */

    const filteredEmployees = employees.filter((emp: any) =>
        emp.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        emp.companyStaffId?.toLowerCase().includes(search.toLowerCase())
    )

    useEffect(() => {
        setCurrentPage(1)
    }, [search])

    /* ================= PAGINATION ================= */

    const indexOfLast = currentPage * rowsPerPage
    const indexOfFirst = indexOfLast - rowsPerPage

    const currentEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast)

    const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage)

    /* ================= ROLE ================= */

    const handleRoleChange = (role: string) => {

        setSelectedRoles(prev =>
            prev.includes(role)
                ? prev.filter(r => r !== role)
                : [...prev, role]
        )

    }

    /* ================= WEEKEND ================= */

    const handleWeekend = (day: string) => {

        setWeekends(prev =>
            prev.includes(day)
                ? prev.filter(d => d !== day)
                : [...prev, day]
        )

    }

    /* ================= IMAGE ================= */

    const handleImage = (e: any) => {

        const file = e.target.files?.[0]

        if (!file) return

        setSelectedFile(file)
        setPreview(URL.createObjectURL(file))

    }

    /* ================= GET FULL IMAGE URL ================= */

    const getFullImageUrl = (photoPath: string | null) => {
        if (!photoPath) return null;

        // If it's already an absolute URL, return as is
        if (photoPath.startsWith('http://') || photoPath.startsWith('https://')) {
            return photoPath;
        }

        // If it's a data URL (from file input preview), return as is
        if (photoPath.startsWith('data:')) {
            return photoPath;
        }

        // If it's a blob URL (from URL.createObjectURL), return as is
        if (photoPath.startsWith('blob:')) {
            return photoPath;
        }

        // Remove any leading/trailing slashes and backslashes, then construct the URL
        const cleanPath = photoPath.replace(/^[\\/]+|[\\/]+$/g, '').replace(/\\/g, '/');
        return `${API_BASE_URL}/${cleanPath}`;
    };

    /* ================= EDIT ================= */

    const handleEdit = (emp: any) => {

        setEditId(emp._id)

        setSelectedRoles(emp.role || [])
        setWeekends(emp.weekendDays || [])

        setPreview(emp.photo || null)
        setSelectedFile(null)

        setShowForm(true)

        setTimeout(() => {

            const form: any = document.getElementById("employeeForm")

            if (!form) return

            Object.keys(emp).forEach(key => {

                if (!form[key]) return

                // Skip file input
                if (key === "photo") return

                if (key === "joiningDate" || key === "dateOfBirth") {
                    form[key].value = emp[key]?.slice(0, 10)
                }
                else {
                    form[key].value = emp[key]
                }

            })

        }, 100)

    }

    /* ================= DELETE ================= */

    const handleDelete = async (id: string) => {

        if (!confirm("Delete employee?")) return

        try {
            await axios.delete(
                `${API_BASE_URL}/api/v1/employees/${id}`
            )

            toast.success("Employee deleted")
            fetchEmployees()
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Delete failed")
        }

    }

    /* ================= SUBMIT ================= */

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        setLoading(true)

        const form = e.currentTarget

        const formData = new FormData(form)

        // Handle file upload - if there's a new selected file, append it
        if (selectedFile) {
            formData.set("photo", selectedFile);
        }

        formData.set("role", selectedRoles.join(","))
        formData.set("weekendDays", weekends.join(","))

        try {

            if (editId) {

                await axios.patch(
                    `${API_BASE_URL}/api/v1/employees/${editId}`,
                    formData
                )

                toast.success("Employee updated")

            }
            else {

                await axios.post(
                    `${API_BASE_URL}/api/v1/employees/create-employee`,
                    formData
                )

                toast.success("Employee created")

            }

            form.reset()

            setSelectedRoles([])
            setWeekends([])
            setPreview(null)
            setSelectedFile(null)
            setEditId(null)
            setShowForm(false)

            fetchEmployees()

        }
        catch (error: any) {

            toast.error(error?.response?.data?.message || "Operation failed")

        }

        setLoading(false)

    }

    /* ================= UI ================= */

    return (

        <div className="bg-gray-100 min-h-screen py-10">

            <div className="max-w-6xl mx-auto">

                {/* ================= TABLE ================= */}

                {!showForm && (

                    <div className="bg-white shadow rounded-xl p-6">

                        <div className="flex justify-between mb-4">

                            <h1 className="text-2xl font-bold">Employee List</h1>

                            <button
                                onClick={() => setShowForm(true)}
                                className="bg-indigo-600 text-white px-6 py-2 rounded"
                            >
                                Create Employee
                            </button>

                        </div>

                        <input
                            placeholder="Search employee..."
                            className="border p-2 w-full mb-4"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <table className="w-full border">

                            <thead className="bg-gray-100">

                                <tr>

                                    <th className="p-2 border">Staff ID</th>
                                    <th className="p-2 border">Name</th>
                                    <th className="p-2 border">Phone</th>
                                    <th className="p-2 border">Designation</th>
                                    <th className="p-2 border">Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {currentEmployees.map(emp => (

                                    <tr key={emp._id} className="text-center">

                                        <td className="border p-2">{emp.companyStaffId}</td>
                                        <td className="border p-2">{emp.fullName}</td>
                                        <td className="border p-2">{emp.phone}</td>
                                        <td className="border p-2">{emp.designation}</td>

                                        <td className="border p-2 space-x-2">

                                            <button
                                                onClick={() => handleEdit(emp)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(emp._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                        <div className="flex justify-center gap-2 mt-4">

                            {Array.from({ length: totalPages }, (_, i) => (

                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-1 border rounded
${currentPage === i + 1 ? "bg-indigo-600 text-white" : ""}`}
                                >
                                    {i + 1}
                                </button>

                            ))}

                        </div>

                    </div>

                )}

                {/* ================= ORIGINAL FORM ================= */}

                {showForm && (

                    <form
                        id="employeeForm"
                        onSubmit={handleSubmit}
                        className="max-w-6xl mx-auto space-y-8"
                    >

                        {/* TITLE */}
                        <div className="bg-white shadow rounded-xl p-6 text-center">
                            <h1 className="text-3xl font-bold">Employee Registration</h1>
                            <p className="text-gray-500">Fill all employee information</p>
                        </div>

                        {/* EMPLOYMENT INFORMATION */}
                        <Section title="Employment Information">

                            <Input name="companyStaffId" label="Staff ID" required />
                            <Input name="designation" label="Designation" required />

                            <Select name="employmentType" label="Employment Type"
                                options={["Full Time", "Part Time", "Contract", "Intern"]}
                            />

                            <Select name="employmentStatus" label="Employment Status"
                                options={["Active", "Inactive", "Resigned", "Terminated"]}
                            />

                            <Input name="joiningDate" label="Joining Date" type="date" required />

                            <Input name="salary" label="Salary" type="number" required />

                            <Input name="probationPeriod" label="Probation Period (months)" />

                            <Input name="reportingTo" label="Reporting To" />

                            <div className="col-span-2">

                                <label className="font-semibold">Weekend Days</label>

                                <div className="flex flex-wrap gap-3 mt-2">

                                    {days.map(day => (

                                        <button
                                            key={day}
                                            type="button"
                                            onClick={() => handleWeekend(day)}
                                            className={`px-3 py-2 rounded-lg border
${weekends.includes(day)
                                                    ? "bg-indigo-600 text-white"
                                                    : "bg-white hover:bg-gray-100"}`}
                                        >
                                            {day}
                                        </button>

                                    ))}

                                </div>

                            </div>

                        </Section>

                        {/* ACCOUNT */}
                        <Section title="User Account">

                            <Input name="userId" label="User ID" required />

                            <Input name="password" label="Password" type="password" required />

                            <div className="col-span-2">

                                <label className="font-semibold">Assign Roles</label>

                                <div className="flex flex-wrap gap-3 mt-2">

                                    {roles.map(role => (

                                        <button
                                            type="button"
                                            key={role._id}
                                            onClick={() => handleRoleChange(role.name)}
                                            className={`px-4 py-2 rounded-full border transition
${selectedRoles.includes(role.name)
                                                    ? "bg-black text-white border-black"
                                                    : "bg-white hover:bg-gray-100"}`}
                                        >
                                            {role.name}
                                        </button>

                                    ))}

                                </div>

                            </div>

                        </Section>

                        {/* PERSONAL */}
                        <Section title="Personal Information">

                            <Input name="fullName" label="Full Name" required />
                            <Input name="dateOfBirth" label="Date of Birth" type="date" required />
                            <Input name="fatherName" label="Father Name" required />
                            <Input name="motherName" label="Mother Name" required />

                        </Section>

                        {/* CONTACT */}
                        <Section title="Contact Information">

                            <Input name="phone" label="Phone" required />
                            <Input name="alternatePhone" label="Alternate Phone" />
                            <Input name="email" label="Email" required />

                            <Textarea name="presentAddress" label="Present Address" required />

                            <Textarea name="permanentAddress" label="Permanent Address" required />

                        </Section>

                        {/* PHOTO */}
                        <Section title="Photo Upload">

                            <div className="col-span-2">

                                <input
                                    name="photo"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImage}
                                    className="w-full border rounded-lg p-2"
                                />

                                {preview && (
                                    <div className="mt-4 relative h-40 w-40 rounded-lg border overflow-hidden">
                                        <Image
                                            src={getFullImageUrl(preview) || ''}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 160px"
                                            onError={(e) => {
                                                // Fallback if image fails to load
                                                console.error('Image failed to load:', preview);
                                            }}
                                        />
                                    </div>
                                )}

                            </div>

                        </Section>

                        <div className="text-center">

                            <button
                                disabled={loading}
                                className="bg-indigo-600 text-white px-10 py-3 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
                            >
                                {loading ? "Saving..." : "Save Employee"}
                            </button>

                        </div>

                    </form>

                )}

            </div>

        </div>

    )

}

/* ================= COMPONENTS ================= */

const Section = ({ title, children }: { title: string, children: any }) => (
    <div className="bg-white shadow rounded-xl p-6 grid grid-cols-2 gap-5">
        <h2 className="col-span-2 text-xl font-semibold border-b pb-2">{title}</h2>
        {children}
    </div>
)

const Input = ({ label, ...props }: any) => (
    <div className="flex flex-col">
        <label className="mb-1 font-medium">{label}</label>
        <input {...props} className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500" />
    </div>
)

const Textarea = ({ label, ...props }: any) => (
    <div className="flex flex-col col-span-2">
        <label className="mb-1 font-medium">{label}</label>
        <textarea {...props} className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500" />
    </div>
)

const Select = ({ label, options, ...props }: any) => (
    <div className="flex flex-col">
        <label className="mb-1 font-medium">{label}</label>
        <select {...props} className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500">
            <option value="">Select</option>
            {options.map((o: string) => (<option key={o}>{o}</option>))}
        </select>
    </div>
)