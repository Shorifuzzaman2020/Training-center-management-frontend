
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

const HOVER_CARD_SIDES = ["ALL", "ANALYTICS", "DIALOGUE", "DIRECTION", "GROWTH", "SECURITY", "STORAGE"] as const


export default function OurRecentWork() {
    return (
        <div>
            <div>
                <h1 className="text-center font-bold text-3xl my-16">OUR RECENT WORK</h1>
            </div>
            {/* <div className="flex gap-4 justify-center items-center my-5">
                {HOVER_CARD_SIDES.map((side) => (
                    <HoverCard key={side} openDelay={100} closeDelay={100}>
                        <HoverCardTrigger asChild>
                            <Button variant="outline" className="capitalize border-blue-300 text-blue-400 hover:bg-blue-400 hover:text-white font-bold">
                                {side}
                            </Button>
                        </HoverCardTrigger>
                        <HoverCardContent side={side}>
                            <div className="flex flex-col gap-1">
                                <h4 className="font-medium">1</h4>
                                <p>This hover card appears on the {side} side of the trigger.</p>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                ))}
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div>
                    <Image
                        src="/img-1.jpg"
                        alt="Our Recent Work"
                        width={1200}
                        height={600}
                        className="w-full h-auto object-cover" />
                </div>
                <div>
                    <Image
                        src="/img-2.jpg"
                        alt="Our Recent Work"
                        width={1200}
                        height={600}
                        className="w-full h-auto object-cover" />
                </div>
                <div>
                    <Image
                        src="/img-3.jpg"
                        alt="Our Recent Work"
                        width={1200}
                        height={600}
                        className="w-full h-auto object-cover" />
                </div>
                <div>
                    <Image
                        src="/img-4.jpg"
                        alt="Our Recent Work"
                        width={1200}
                        height={600}
                        className="w-full h-auto object-cover" />
                </div>
                <div>
                    <Image
                        src="/img-5.jpg"
                        alt="Our Recent Work"
                        width={1200}
                        height={600}
                        className="w-full h-auto object-cover" />
                </div>
                <div>
                    <Image
                        src="/img-6.jpg"
                        alt="Our Recent Work"
                        width={1200}
                        height={600}
                        className="w-full h-auto object-cover" />
                </div>
            </div>
        </div>
    )
}