

import Image from "next/image";
const ourClients = [
    {
        id:'1',
        image: "/client-img-1.jpg",
    },
    {
        id:'2',
        image: "/client-img-2.jpg",
    },
    {
        id:'3',
        image: "/client-img-3.jpg",
    },
    {
        id:'4',
        image: "/client-img-4.jpg",
    },
    {
        id:'5',
        image: "/client-img-5.jpg",
    },
];

export default function OurClients({ clients }: any) {
    return (
        <div className="w-10/12 mx-auto my-28">
            <h1 className="text-center font-bold text-4xl mt-16">OUR AMAZING CLIENTS</h1>
            <p className="text-center mt-4">We trust in longlasting partnerships with the most important brands on the market</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 justify-items-center">
                {ourClients.map((clients: any) => (
                    <div key={clients.id} className="group relative w-full max-w-sm pt-0 border shadow-sm">

                        <Image
                            src={clients.image}
                            width={1200}
                            height={600}
                            alt={clients.id}
                            className=" bg-gray-500"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}