
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Header() {
    return <header>
        <div className="flex justify-center items-center h-[40px] bg-blue2">
            <a
                className="text-blue3 underline"
                href="https://www.google.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                <span className="hidden lg:block">Next Day Delivery on all Subscription start up packs. Getting you to the next drop on January 1st 2025</span>
                <span className="block lg:hidden">Refer a friend and get £5 reward</span>
            </a>
        </div>

        <div className="flex items-center h-[54px] px-[16px] lg:h-[90px] bg-blue">
            <div className="flex justify-between items-center container-width">
                <div className="grid grid-cols-2 gap-[51px] w-full text-white lg:max-w-[813px] lg:grid-cols-[1fr_123px]">
                    <Link className="font-[700] italic lg:text-[64px]" href="/">Supplement Club</Link>
                    <div className="hidden lg:flex lg:gap-x-[24px]">
                        <Link href="/products">Products</Link>
                        <Link href="/labs">Labs</Link>
                    </div>
                </div>

                <div className="hidden lg:flex lg:gap-x-[24px] lg:items-center">
                    <div className="flex gap-x-[8px] text-white">
                        <Image
                            src="/images/homepage/user-profile.svg"
                            alt="User profile icon"
                            width={16}
                            height={16}
                        />
                        <Link href="/login">Login</Link>
                    </div>
                    <Button className="bg-yellow text-blue" asChild>
                        <Link href="/buy">Buy Now</Link>
                    </Button>

                    <Link href="/buy">
                        <Image
                            src="/images/homepage/bag.svg"
                            alt="User profile bag"
                            width={19}
                            height={19}
                        />
                    </Link>

                </div>

                <Image
                    className="flex lg:hidden hover:cursor-pointer"
                    src="/images/homepage/bars.svg"
                    alt="Bars icon"
                    width={16}
                    height={16}
                />
            </div>
        </div>
    </header>
}
