"use client";

import React, { useEffect, useState } from "react";
// import Image from 'next/image';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { TiSocialFacebook } from "react-icons/ti";
import {
  FaGoogle,
  FaLinkedin,
  FaLinkedinIn,
  FaSearch,
  FaTwitter,
} from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { ChevronDown, Heart, Phone, Share2, ShoppingCart } from "lucide-react";
import axios from "axios";
import { HiMenu, HiX } from "react-icons/hi";
type Course = {
  _id: string;
  name: string;
};

const Page = () => {
  // const frameworks = ["English", "French", "Relish"]
  const HOVER_CARD_SIDES = [
    "HOME",
    "PAGES",
    "ABOUT",
    "SERVICES",
    "TEAM",
    "JOBS",
    "BLOG",
    "CONTACT",
  ] as const;
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetchCourses();
  }, []);
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/courses");

      setCourses(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const [notices, setNotices] = useState<string[]>([]);

  const fetchNotices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/notices");

      const titles = res.data.data.map((n: any) => n.title);

      setNotices(titles);
    } catch (error) {
      console.log("Notice fetch failed");
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  const handleCertificate = async () => {
    const studentId = localStorage.getItem("studentId");

    if (!studentId) {
      alert("Login first");
      return;
    }

    window.open(
      `http://localhost:5000/api/v1/instructor/certificate/${studentId}`,
      "_blank",
    );
  };

  const [showModal, setShowModal] = useState(false);
  const [nid, setNid] = useState("");

  /* LOAD COURSES */
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/courses")
      .then((res) => setCourses(res.data.data));
  }, []);

  /* HANDLERS */
  //   const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleOpen = () => setShowModal(true);

  const handleClose = () => {
    setShowModal(false);
    setNid(""); // reset
  };

  const handleSubmit = () => {
    if (!nid) return alert("Enter Student ID");

    window.open(`http://localhost:5000/api/v1/certificate/${nid}`, "_blank");

    handleClose();
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-indigo-900 shadow-sm">
      <div className=" bg-indigo-950 hidden md:block py-3">
        <div className="w-10/12 mx-auto">
          <nav className="flex justify-between items-center">
            <div className="flex justify-center items-center gap-3">
              <ul className="text-white">
                <IoCall />{" "}
              </ul>
              <ul className="border-r-2 text-white pr-3">+88 019 963 86373</ul>
              <ul className="text-white border-r-2 pr-3">kineo@gmail.com</ul>
            </div>
            <div className="relative w-7/12 overflow-hidden">
              {/* ticker */}

              <div className="group overflow-hidden">
                <div className="flex gap-10 whitespace-nowrap animate-ticker group-hover:[animation-play-state:paused] text-yellow-300 font-medium">
                  {notices.concat(notices).map((notice, index) => (
                    <a
                      key={index}
                      href="/notices"
                      className="hover:text-white transition"
                    >
                      📢 {notice}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-3">
              <div>
                <TiSocialFacebook className="text-white" />
              </div>
              <div>
                <FaTwitter className="text-white" />
              </div>
              <div>
                <FaGoogle className="text-white" />
              </div>
              <div>
                <FaLinkedinIn className="text-white" />
              </div>
            </div>
          </nav>
        </div>
      </div>

      <header className="w-full bg-indigo-900 shadow-sm">
        <div className="w-10/12 mx-auto py-4 flex items-center justify-between">
          {/* LEFT SECTION */}
          <div className="flex items-center gap-6">
            <div>
              <img
                src="/6849b90569768a13a6edcecf_kineo-mtc-logo.png"
                alt=""
                className="h-16 w-full"
              />
            </div>
          </div>

          {/* CENTER NAV LINKS */}
          <nav className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">
            <Link
              href="/"
              className="flex text-white items-center gap-1 hover:text-indigo-600"
            >
              Home
            </Link>

            <div className="relative group">
              <Link
                href="#"
                className="flex text-white items-center gap-1 hover:text-indigo-600"
              >
                Courses <ChevronDown size={16} />
              </Link>

              <div className="absolute left-0 top-full mt-3 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50">
                <ul className="py-2 text-sm text-black">
                  {courses.map((course) => (
                    <li key={course._id}>
                      <Link
                        href={`/all-courses?course=${course.name}`}
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        {course?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link
              href="#"
              className="flex text-white items-center gap-1 hover:text-indigo-600"
            >
              Events <ChevronDown size={16} />
            </Link>

            <Link
              href="#"
              className="flex text-white items-center gap-1 hover:text-indigo-600"
            >
              Pages <ChevronDown size={16} />
            </Link>

            <Link
              href="../notices"
              className="flex text-white items-center gap-1 hover:text-indigo-600"
            >
              Notice
            </Link>
          </nav>

          {/* RIGHT SECTION */}
          <div className=" flex items-center gap-6">
            <nav className="relative">
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-6">
                <button
                  onClick={handleOpen}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Certificate
                </button>
                <button>
                  <Link
                    href="/login"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Login
                  </Link>
                </button>
              </div>
              {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
                    <h2 className="text-lg font-bold mb-4">
                      Enter Student ID (NID)
                    </h2>

                    <input
                      type="text"
                      value={nid}
                      onChange={(e) => setNid(e.target.value)}
                      placeholder="Enter NID"
                      className="w-full border p-2 mb-4 rounded"
                    />

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={handleClose}
                        className="px-3 py-1 bg-gray-400 text-white rounded"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={handleSubmit}
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                      >
                        Generate
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <button
                  type="button"
                  onClick={toggleMobileMenu}
                  className="text-white font-bold text-4xl focus:outline-none"
                >
                  {isMobileMenuOpen ? <HiX /> : <HiMenu />}
                </button>
              </div>

              {/* Mobile Menu Overlay */}
              {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 bg-black bg-opacity-50"
                    onClick={closeMobileMenu}
                  />

                  {/* Slide-out Menu */}
                  <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
                    {/* Close button inside menu (optional) */}
                    <button
                      onClick={closeMobileMenu}
                      className="absolute top-4 right-4 text-gray-600 text-2xl"
                    >
                      <HiX />
                    </button>

                    {/* Navigation Links */}
                    <div className="flex flex-col mt-16 p-4">
                      <Link
                        href="/"
                        className="py-3 px-4 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Home
                      </Link>

                      <Link
                        href="/about"
                        className="py-3 px-4 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={closeMobileMenu}
                      >
                        About
                      </Link>
                      <Link
                        href="/courses"
                        className="py-3 px-4 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Courses
                      </Link>

                      {/* Certificate button for mobile (optional) */}
                      <button
                        onClick={handleOpen}
                        className="px-4 py-2 bg-yellow-500 text-white rounded"
                      >
                        Certificate
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Page;
