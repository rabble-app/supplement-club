/** @format */

"use client";

import Link from "next/link";

import ShowTextBasedOnRoute from "@/components/dashboard/ShowTextBasedOnRoute";
import DesktopHeaderButtons from "@/components/main/DesktopHeaderButtons";
import MobileNavigation from "@/components/main/MobileNavigation";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<div className=" sticky top-[0] z-[2] bg-white">
				<header className="w-full h-[52px] md:h-[62px] bg-blue text-white flex justify-center items-center m-auto px-[16px]">
					<Link
						href="/"
						className="text-[24px] leading-[27px] font-hagerman"
					>
						Supplement Club
					</Link>
					<div className="absolute right-[16px] p-[0]">
					    <DesktopHeaderButtons />
						<MobileNavigation />
					</div>		
				</header>
				<ShowTextBasedOnRoute />
			</div>
			<div className="px-[16px] md:px-[0] bg-grey12 md:bg-transparent">
				{children}
			</div>
		</div>
	);
}
