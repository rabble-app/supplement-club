/** @format */

"use client";
import Link from "next/link";

import { getQuarterInfo } from "@/utils/utils";
import { usePathname } from "next/navigation";
import DesktopHeaderButtons from "./DesktopHeaderButtons";
import MobileNavigation from "./MobileNavigation";

export default function Header() {
  const pathname = usePathname();

  const { remainsDaysToNextQuater } = getQuarterInfo();
  return (
    <>
      <div
        className={`flex justify-center items-center flex-nowrap overflow-auto whitespace-nowrap h-[40px] bg-blue2 ${
          pathname === "/" ? "sticky top-0 z-[1000]" : ""
        }`}
      >
        <div className="text-blue underline">
          <span className="font-inconsolata font-bold text-blue">
            NEXT DROP: {remainsDaysToNextQuater} DAYS!{" "}
            <span className="hidden md:inline font-inconsolata">
              - Join Today and Get 6 Months Free. Cancel Anytime.
            </span>
          </span>
        </div>
      </div>
      <header>
        <div className="flex items-center h-[70px] px-[16px] lg:px-[32px] lg:h-[90px] bg-blue">
          <div className="flex justify-between items-center w-full max-w-[1500px] mx-auto">
            <div className="grid gap-[51px] w-max text-white md:grid-cols-[auto_123px]">
              <Link
                className="font-normal lg:text-[40px] text-[24px] font-hagerman"
                href="/"
              >
                Supplement Club
              </Link>
              <div className="hidden lg:flex lg:gap-x-[24px]">
                <Link
                  href="/products"
                  className="font-inconsolata font-bold text-[16px]"
                >
                  Products
                </Link>
                <Link
                  href="/labs"
                  className="font-inconsolata font-bold text-[16px]"
                >
                  Labs
                </Link>
              </div>
            </div>

            <DesktopHeaderButtons />

            <MobileNavigation />
          </div>
        </div>
      </header>
    </>
  );
}
