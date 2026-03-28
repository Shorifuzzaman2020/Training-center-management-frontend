"use client";

import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"
import { TiSocialFacebook } from 'react-icons/ti';
import { FaGoogle, FaLinkedin, FaLinkedinIn, FaSearch, FaTwitter } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';
import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import Link from 'next/link';
import { ChevronDown, Heart, Phone, Share2, ShoppingCart } from 'lucide-react';
import axios from 'axios';
import { HiMenu, HiX } from 'react-icons/hi';
type Course = {
    _id: string;
    name: string;
};

// const renderHoverContent = (side: string) => {
//     switch (side) {


//         case "SERVICES":
//             return (
//                 <ul className="flex flex-col gap-4 py-2.5 w-60">
//                     <li><Link href="/services" className="block border-b pb-1">Service Version 1</Link></li>
//                     <li><Link href="/shop" className="block border-b pb-1">Service Version 2</Link></li>
//                     <li><Link href="/services" className="block border-b pb-1">Service Version 3</Link></li>
//                     <li><Link href="/team" className="block border-b pb-1">Service Version 4</Link></li>
//                     <li><Link href="/jobs" className="block border-b pb-1">Jobs</Link></li>
//                     <li><Link href="/blog" className="block border-b pb-1">Blog</Link></li>
//                     <li><Link href="/contact" className="block border-b pb-1">Contact</Link></li>
//                 </ul>
//             );
//     }
// };
// const NAV_LINKS = [
//     { name: "HOME", href: "/" },
//     { name: "PAGES", href: "/pages" },
//     { name: "ABOUT", href: "/about" },
//     { name: "SERVICES", href: "/services" },
//     { name: "TEAM", href: "/team" },
//     { name: "JOBS", href: "/jobs" },
//     { name: "BLOG", href: "/blog" },
//     { name: "CONTACT", href: "/contact" },
// ];


const Page = () => {
    // const frameworks = ["English", "French", "Relish"]
    const HOVER_CARD_SIDES = ["HOME", "PAGES", "ABOUT", "SERVICES", "TEAM", "JOBS", "BLOG", "CONTACT"] as const
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        fetchCourses();
    }, []);
    const fetchCourses = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/v1/courses"
            );

            setCourses(res.data.data);

        } catch (err) {
            console.log(err);
        }

    }
    const [notices, setNotices] = useState<string[]>([]);

    const fetchNotices = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/v1/notices"
            );

            const titles = res.data.data.map(
                (n: any) => n.title
            );

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

    return (
        <div className='sticky top-0 z-50 w-full bg-indigo-900 shadow-sm'>
            <div className=' bg-indigo-950 hidden md:block py-3'>
                <div className='w-10/12 mx-auto'>
                    <nav className='flex justify-between items-center'>
                        <div className='flex justify-center items-center gap-3'>
                            <ul className='text-white'><IoCall /> </ul>
                            <ul className='border-r-2 text-white pr-3'>+1 123 456 7890</ul>
                            <ul className='text-white border-r-2 pr-3'>example@example.com</ul>
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
                        <div className='flex justify-center items-center gap-3'>

                            {/* <div>
                                <Combobox items={frameworks}>
                                    <ComboboxInput placeholder="English" />
                                    <ComboboxContent>
                                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                                        <ComboboxList>
                                            {(item) => (
                                                <ComboboxItem key={item} value={item}>
                                                    {item}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </div> */}
                            <div>
                                <TiSocialFacebook className='text-white' />
                            </div>
                            <div>
                                <FaTwitter className='text-white' />
                            </div>
                            <div>
                                <FaGoogle className='text-white' />
                            </div>
                            <div>
                                <FaLinkedinIn className='text-white' />
                            </div>
                        </div>
                    </nav>
                </div>

            </div>
            {/* <div className='border-b-2 bg-blue-900'>
                <div className='flex justify-between items-center w-10/12 mx-auto py-3'>
                    <div>
                        <img src="https://i.ibb.co.com/DHyYyhDC/logo.png" alt="" />
                    </div>
                    <div>
                        <div className="flex flex-wrap justify-center gap-2">
                            
                            {NAV_LINKS.map((item) => {

                                // SERVICES 
                                if (item.name === "SERVICES") {
                                    return (
                                        <HoverCard key={item.name} openDelay={100} closeDelay={500}>
                                            <HoverCardTrigger asChild>
                                                <Button className="capitalize bg-white text-black border-none hover:bg-blue-400">
                                                    {item.name}
                                                </Button>
                                            </HoverCardTrigger>

                                            <HoverCardContent
                                                side="bottom"
                                                align="start"
                                                sideOffset={10}
                                                className="w-64 p-4"
                                            >
                                                {renderHoverContent(item.name)}
                                            </HoverCardContent>
                                        </HoverCard>
                                    );
                                }

                                // ALL OTHER NAVIGATION
                                return (
                                    <Link key={item.name} href={item.href}>
                                        <Button
                                            variant="outline"
                                            className="capitalize border-none hover:bg-blue-400"
                                        >
                                            {item.name}
                                        </Button>
                                    </Link>
                                );
                            })}
                            <div className='bg-gray-300 text-center p-3 rounded'>
                                <FaSearch />
                            </div>
                        </div>


                    </div>
                </div>
            </div> */}

            <header className="w-full bg-indigo-900 shadow-sm">
                <div className="w-10/12 mx-auto py-4 flex items-center justify-between">

                    {/* LEFT SECTION */}
                    <div className="flex items-center gap-6">

                        {/* All Categories Button */}
                        {/* <button className="flex items-center gap-2 bg-gray-100 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition">
                            <Share2 size={16} />
                            All Categories
                            <ChevronDown size={16} />
                        </button> */}
                        <div>
                            <img src="/6849b90569768a13a6edcecf_kineo-mtc-logo.png" alt="" className='h-16 w-full' />
                        </div>

                    </div>

                    {/* CENTER NAV LINKS */}
                    <nav className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">

                        <Link href="/" className="flex text-white items-center gap-1 hover:text-indigo-600">
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
                                    {/* <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                            
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                            Home 2
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                            Home 3
                                        </a>
                                    </li> */}
                                </ul>
                            </div>
                        </div>

                        <Link href="#" className="flex text-white items-center gap-1 hover:text-indigo-600">
                            Events <ChevronDown size={16} />
                        </Link>

                        <Link href="#" className="flex text-white items-center gap-1 hover:text-indigo-600">
                            Pages <ChevronDown size={16} />
                        </Link>

                        {/* <Link href="#" className="flex text-white items-center gap-1 hover:text-indigo-600">
                            Blogs
                        </Link> */}

                        <Link href="../notices" className="flex text-white items-center gap-1 hover:text-indigo-600">
                            Notice
                        </Link>

                    </nav>

                    {/* RIGHT SECTION */}
                    <div className=" flex items-center gap-6">
                        <nav className="relative">
                            {/* Desktop Navigation */}
                            <div className="hidden lg:flex items-center gap-6">
                                <button type="button" className="px-3 py-2  rounded-sm cursor-pointer text-white text-base uppercase font-semibold  border-0 outline-0 bg-[#ffcd20] hover:bg-yellow-500 duration-300">
                                    Certificate
                                </button>
                            </div>

                            {/* Mobile Menu Button */}
                            <div className='lg:hidden'>
                                <button
                                    type="button"
                                    onClick={toggleMobileMenu}
                                    className='text-white font-bold text-4xl focus:outline-none'
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
                                            {/* <Link
                                                href="/blogs"
                                                className="py-3 px-4 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                                                onClick={closeMobileMenu}
                                            >
                                                Blogs
                                            </Link> */}
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
                                                type="button"
                                                className="mt-4 py-2 rounded-lg cursor-pointer text-white text-xl font-bold tracking-wider bg-red-600 hover:bg-indigo-500 transition-colors"
                                                onClick={closeMobileMenu}
                                            >
                                                Certificate
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}


                        </nav>
                        {/* Emergency Help */}
                        {/* <div className="hidden md:flex items-center gap-3">
                            <div className="bg-indigo-50 p-2 rounded-full">
                                <Phone size={18} className="text-indigo-600" />
                            </div>
                            <div className="text-sm">
                                <p className="text-gray-500">Emergency Help!</p>
                                <p className="font-semibold text-gray-800">
                                    +1212-226-3126
                                </p>
                            </div>
                        </div> */}

                        {/* Wishlist */}
                        {/* <div className="relative">
                            <Heart className="text-gray-700 cursor-pointer hover:text-indigo-600" size={22} />
                            <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs px-1.5 rounded-full">
                                0
                            </span>
                        </div> */}

                        {/* Cart */}
                        {/* <div className="flex items-center gap-2">
                            <div className="relative">
                                <ShoppingCart className="text-gray-700 cursor-pointer hover:text-indigo-600" size={22} />
                                <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs px-1.5 rounded-full">
                                    0
                                </span>
                            </div>
                            <span className="text-gray-700 font-medium">$0.00</span>
                        </div> */}

                    </div>
                </div>
            </header>
        </div>
    );
};

export default Page;