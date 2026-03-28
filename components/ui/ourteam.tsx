import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { TiSocialFacebook } from "react-icons/ti";
import { FaGoogle, FaLinkedinIn, FaTwitter } from "react-icons/fa";
const teamMembers = [
    {
        id: 1,
        name: "Jeff Walsh",
        designation: "CEO",
        description: "Donec venenatis, turpis vel hendrerit interdum, dui ligula ultricies purus, sed posuere libero dui id orci.",
        image: "/team-img-1-1.jpg",
    },
    {
        id: 2,
        name: "Sarah Johnson",
        designation: "CTO",
        description: "Sarah leads our engineering team with a focus on innovation and scalability.",
        image: "/team-img-1-2.jpg",
    },
    {
        id: 3,
        name: "Michael Chen",
        designation: "CFO",
        description: "Michael manages our financial operations and strategic investments.",
        image: "/team-img-1-3.jpg",
    },
    {
        id: 4,
        name: "Emily Rodriguez",
        designation: "CMO",
        description: "Emily drives our marketing strategy and brand awareness initiatives.",
        image: "/team-img-1-4.jpg",
    },
];


export default function OurTeam({ members }: any) {
    return (
        <div className="w-10/12 mx-auto mb-14">
            <div className="my-14">
                <h1 className="text-3xl font-bold text-center">Our Team</h1>
            </div>
            <div className="mt-10 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center">
                {teamMembers.map((member: any) => (
                    <Card key={member.id} className="group relative w-full max-w-sm pt-0 border-none">

                        <Image
                            src={member.image}
                            width={1200}
                            height={600}
                            alt={member.name}
                            className=""
                        />

                        <CardHeader>
                            <CardTitle className="text-center group-hover:text-blue-600 transition">
                                {member.name}
                            </CardTitle>

                            <div className="text-center text-gray-400">
                                BY {member.designation} / {member.designation} COMMENTS
                            </div>

                            <CardDescription className="text-center">
                                {member.description}
                            </CardDescription>
                            <div className="flex items-center justify-center gap-3 w-10/12 mx-auto">
                                <div>
                                    <TiSocialFacebook />
                                </div>
                                <div>
                                    <FaTwitter />
                                </div>
                                <div>
                                    <FaGoogle />
                                </div>
                                <div>
                                    <FaLinkedinIn />
                                </div>
                            </div>
                        </CardHeader>

                    </Card>
                ))}
            </div>
        </div>
    )
}