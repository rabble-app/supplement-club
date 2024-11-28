/** @format */

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="flex justify-center items-center h-[40px] bg-blue2">
        <div className="text-blue3 underline">
          <span className="hidden lg:block font-inconsolata font-bold">
            Next Day Delivery on all Subscription start up packs. Getting you to
            the next drop on January 1st 2025
          </span>
          <span className="block lg:hidden">
            Refer a friend and get £5 reward
          </span>
        </div>
      </div>

      <div className="flex items-center h-[70px] pl-1 pr-[16px] lg:h-[90px] bg-blue">
        <div className="flex justify-between items-center container-width">
          <div className="grid gap-[51px] w-full text-white lg:max-w-[813px] lg:grid-cols-[1fr_123px]">
            <Link
              className="font-normal lg:text-[64px] text-[48px] font-hagerman"
              href="/"
            >
              Supplement Club
            </Link>
            <div className="hidden lg:flex lg:gap-x-[24px]">
              <Link href="#" className="font-inconsolata font-bold text-base">
                Products
              </Link>
              <Link
                href="/labs"
                className="font-inconsolata font-bold text-base"
              >
                Labs
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex lg:gap-x-[24px] lg:items-center">
            <div className="flex gap-x-[8px] text-white">
              <Image
                src="/images/user-profile.svg"
                alt="User profile icon"
                width={16}
                height={16}
              />
              <Link href="#" className="font-inconsolata font-bold text-base">
                Login
              </Link>
            </div>
            <Button className="bg-yellow text-blue" asChild>
              <Link href="#" className="font-inconsolata font-bold text-base">
                Buy Now
              </Link>
            </Button>

            <Link href="#">
              <Image
                src="/images/bag.svg"
                alt="User profile bag"
                width={19}
                height={19}
              />
            </Link>
          </div>
          <Link href="/labs" className="font-inconsolata font-bold text-base text-white lg:hidden">
            Labs
          </Link>
          {/* <Image
            className="flex lg:hidden hover:cursor-pointer"
            src="/images/bars.svg"
            alt="Bars icon"
            width={16}
            height={16}
          /> */}
        </div>
      </div>
    </header>
  );
}
