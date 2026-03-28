
import Image from "next/image"
import { FaChrome, FaLightbulb, FaPaintBrush } from "react-icons/fa"
import { FaMobileScreenButton } from "react-icons/fa6"
import { GiStack } from "react-icons/gi"
import { IoMdSettings } from "react-icons/io"
export default function Outstanding() {
    return (
        <div>
            <div>
                <h1 className="text-center font-bold text-3xl my-16">OUTSTANDING FEATURES</h1>
            </div>
            <div className="w-10/12 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div>
                        <div className="flex items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-right font-bold text-2xl mt-4">Gorgious Design</h1>
                                <p className="text-right mt-2">Our design is clean, modern and user-friendly. Lorem ipsum dolor sit amet.</p>
                            </div>
                            <div className="border p-8 rounded-full bg-blue-400">
                                <FaPaintBrush className="text-white text-4xl" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-right font-bold text-2xl mt-4">Responsive Design</h1>
                                <p className="text-right mt-2">Our design is clean, modern and user-friendly. Lorem ipsum dolor sit amet.</p>
                            </div>
                            <div className="border p-8 rounded-full bg-blue-400">
                                <FaMobileScreenButton className="text-white text-4xl" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-right font-bold text-2xl mt-4">Cross Browser Support</h1>
                                <p className="text-right mt-2">Our design is clean, modern and user-friendly. Lorem ipsum dolor sit amet.</p>
                            </div>
                            <div className="border p-8 rounded-full bg-blue-400">
                                <FaChrome className="text-white text-4xl" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Image
                            src="/iphone.png"
                            alt="Outstanding Feature"
                            width={250}
                            height={100}
                            className="mx-auto" />
                    </div>
                    <div>
                        <div className="flex items-center justify-between gap-4 mb-8">
                            <div className="border p-8 rounded-full bg-blue-400">
                                <IoMdSettings className="text-white text-4xl" />
                            </div>
                            <div>
                                <h1 className="text-left font-bold text-2xl mt-4">Easy to Customize</h1>
                                <p className="text-left mt-2">Our design is clean, modern and user-friendly. Lorem ipsum dolor sit amet.</p>
                            </div>
                            
                        </div>
                        <div className="flex items-center justify-between gap-4 mb-8">
                            <div className="border p-8 rounded-full bg-blue-400">
                                <GiStack className="text-white text-4xl" />
                            </div>
                            <div>
                                <h1 className="text-left font-bold text-2xl mt-4">Exclusive Features</h1>
                                <p className="text-left mt-2">Our design is clean, modern and user-friendly. Lorem ipsum dolor sit amet.</p>
                            </div>
                            
                        </div>
                        <div className="flex items-center justify-between gap-4 mb-8">
                            <div className="border p-8 rounded-full bg-blue-400">
                                <FaLightbulb className="text-white text-4xl" />
                            </div>
                            <div>
                                <h1 className="text-left font-bold text-2xl mt-4">Innovative Ideas</h1>
                                <p className="text-left mt-2">Our design is clean, modern and user-friendly. Lorem ipsum dolor sit amet.</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}