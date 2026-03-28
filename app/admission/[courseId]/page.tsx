"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
      const res = await axios.get("http://localhost:5000/api/v1/courses");

      setCourses(res.data.data);
    } catch {
      toast.error("Failed to load courses");
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
      const res = await axios.get(
        `http://localhost:5000/api/v1/batches?course=${courseId}`,
      );

      setBatches(res.data.data);
    } catch {
      toast.error("Failed to load batches");
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

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (photo) {
      formData.append("photo", photo);
    }

    try {
      await axios.post(
        "http://localhost:5000/api/v1/admissions/create-admission",
        formData,
      );

      toast.success("Application submitted successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Submission failed");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-10 text-center">
        Student Admission Form
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-6 bg-white p-8 shadow rounded-lg"
      >
        <input
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          className="input"
          required
        />

        <input
          type="date"
          name="dateOfBirth"
          onChange={handleChange}
          className="input"
        />

        <select name="gender" onChange={handleChange} className="input">
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select name="bloodGroup" onChange={handleChange} className="input">
          <option value="">Blood Group</option>
          <option>A+</option>
          <option>B+</option>
          <option>O+</option>
        </select>

        <input
          name="nidNumber"
          placeholder="NID / Passport"
          onChange={handleChange}
          className="input"
        />

        <input
          name="mobileNumber"
          placeholder="Mobile Number"
          onChange={handleChange}
          className="input"
          required
        />

        <input
          name="alternateMobile"
          placeholder="Alternate Mobile"
          onChange={handleChange}
          className="input"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="input"
          required
        />

        <textarea
          name="presentAddress"
          placeholder="Present Address"
          onChange={handleChange}
          className="input col-span-2"
        />

        <textarea
          name="permanentAddress"
          placeholder="Permanent Address"
          onChange={handleChange}
          className="input col-span-2"
        />

        <input
          name="highestQualification"
          placeholder="Highest Qualification"
          onChange={handleChange}
          className="input"
        />

        <input
          name="instituteName"
          placeholder="Institute Name"
          onChange={handleChange}
          className="input"
        />

        <input
          name="passingYear"
          type="number"
          placeholder="Passing Year"
          onChange={handleChange}
          className="input"
        />

        <input
          name="result"
          placeholder="Result/GPA"
          onChange={handleChange}
          className="input"
        />

        {/* COURSE */}

        <select
          name="course"
          onChange={handleChange}
          className="input"
          required
        >
          <option value="">Select Course</option>

          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.name}
            </option>
          ))}
        </select>

        {/* BATCH */}

        <select name="preferredBatch" onChange={handleChange} className="input">
          <option value="">Select Batch</option>

          {batches.map((batch) => (
            <option key={batch._id} value={batch._id}>
              {batch.batchName}
            </option>
          ))}
        </select>

        {/* TRAINING MODE */}

        <select name="trainingMode" onChange={handleChange} className="input">
          <option value="">Training Mode</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="hybrid">Hybrid</option>
        </select>

        {/* PHOTO */}

        <div className="col-span-2">
          <label className="font-medium">Student Photo</label>

          <input
            type="file"
            accept="image/*"
            onChange={handlePhoto}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* REASON */}

        <textarea
          name="reasonForJoining"
          placeholder="Reason for joining"
          onChange={handleChange}
          className="input col-span-2"
        />

        {/* SUBMIT */}

        <button
          disabled={loading}
          className="col-span-2 bg-indigo-600 text-white py-3 rounded-lg"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}
