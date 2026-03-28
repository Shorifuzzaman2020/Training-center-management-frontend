
// import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
import { FaComments } from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";

import { IoRocketSharp } from "react-icons/io5";
import { MdOutlineSecurity, MdOutlineStorage } from "react-icons/md";
import { SiSimpleanalytics } from "react-icons/si";
export default function OurServices() {
    return (
        <div>
            <div className="">
                <h1 className="text-center font-bold text-3xl my-4">OUR SERVICES</h1>
            </div>
            <div className="w-10/12 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

                    {/* analytics card */}
                    <div className="">
                        <Card className="relative mx-auto  w-full max-w-sm py-8 bg-gray-100 group p-6 text-center hover:bg-blue-600 transition-all duration-300">
                            <div className="absolute inset-0 z-30 aspect-video" />
                            <div className="flex items-center mx-auto">
                                <SiSimpleanalytics className="text-8xl text-blue-500 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <CardHeader>
                                <CardTitle className="text-2xl text-center group-hover:text-white transition-colors duration-300">ANALYTICS</CardTitle>
                                <CardDescription className="text-center group-hover:text-white transition-colors duration-300">
                                    A practical talk on component APIs, accessibility, and shipping
                                    faster.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                    {/* Storage Card */}
                    <div className="">
                        <Card className="relative mx-auto  w-full max-w-sm py-8 bg-gray-100 group p-6 text-center hover:bg-blue-600 transition-all duration-300">
                            <div className="absolute inset-0 z-30 aspect-video" />
                            <div className="flex items-center mx-auto">
                                <MdOutlineStorage className="text-8xl text-blue-500 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <CardHeader>
                                <CardTitle className="text-2xl text-center group-hover:text-white transition-colors duration-300">STORAGE</CardTitle>
                                <CardDescription className="text-center group-hover:text-white transition-colors duration-300">
                                    A practical talk on component APIs, accessibility, and shipping
                                    faster.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>

                    {/* Security Card */}
                    <div className="">
                        <Card className="relative mx-auto  w-full max-w-sm py-8 bg-gray-100 group p-6 text-center hover:bg-blue-600 transition-all duration-300">
                            <div className="absolute inset-0 z-30 aspect-video" />
                            <div className="flex items-center mx-auto">
                                <MdOutlineSecurity className="text-8xl text-blue-500 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <CardHeader>
                                <CardTitle className="text-2xl text-center group-hover:text-white transition-colors duration-300">SECURITY</CardTitle>
                                <CardDescription className="text-center group-hover:text-white transition-colors duration-300">
                                    A practical talk on component APIs, accessibility, and shipping
                                    faster.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                    {/* Worth card */}
                    <div className="">
                        <Card className="relative mx-auto  w-full max-w-sm py-8 bg-gray-100 group p-6 text-center hover:bg-blue-600 transition-all duration-300">
                            <div className="absolute inset-0 z-30 aspect-video" />
                            <div className="flex items-center mx-auto">
                                <IoRocketSharp className="text-8xl text-blue-500 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <CardHeader>
                                <CardTitle className="text-2xl text-center group-hover:text-white transition-colors duration-300">WORTH</CardTitle>
                                <CardDescription className="text-center group-hover:text-white transition-colors duration-300">
                                    A practical talk on component APIs, accessibility, and shipping
                                    faster.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                    {/* Dialogue card */}
                    <div className="">
                        <Card className="relative mx-auto  w-full max-w-sm py-8 bg-gray-100 group p-6 text-center hover:bg-blue-600 transition-all duration-300">
                            <div className="absolute inset-0 z-30 aspect-video" />
                            <div className="flex items-center mx-auto">
                                <FaComments className="text-8xl text-blue-500 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <CardHeader>
                                <CardTitle className="text-2xl text-center group-hover:text-white transition-colors duration-300">DIALOGUE</CardTitle>
                                <CardDescription className="text-center group-hover:text-white transition-colors duration-300">
                                    A practical talk on component APIs, accessibility, and shipping
                                    faster.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                    {/* Direction Card */}
                    <div className="">
                        <Card className="relative mx-auto  w-full max-w-sm py-8 bg-gray-100 group p-6 text-center hover:bg-blue-600 transition-all duration-300">
                            <div className="absolute inset-0 z-30 aspect-video" />
                            <div className="flex items-center mx-auto">
                                <HiSpeakerphone className="text-8xl text-blue-500 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <CardHeader>
                                <CardTitle className="text-2xl text-center group-hover:text-white transition-colors duration-300">DIRECTION</CardTitle>
                                <CardDescription className="text-center group-hover:text-white transition-colors duration-300">
                                    A practical talk on component APIs, accessibility, and shipping
                                    faster.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}