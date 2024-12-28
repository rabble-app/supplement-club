"use client";

import Image from "next/image";
import Link from "next/link";

import ShowTextBasedOnRoute from "@/components/dashboard/ShowTextBasedOnRoute";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<header className="w-full h-[52px] md:h-[62px] bg-blue text-white flex justify-between md:justify-center items-center m-auto px-[16px]">
				<Link
					className="text-[16px] md:text-[24px] leading-[18px] text-blue12 md:hidden flex items-center font-helvetica gap-[8px]"
					href="/"
				>
					<Image
						src="/images/icons/home-icon.svg"
						alt="Lock icon"
						width={24}
						height={24}
					/>
					Home
				</Link>
				<div className=" text-[24px] leading-[27px] font-hagerman">
					Supplement Club
				</div>
			</header>
			<ShowTextBasedOnRoute />

			<div className="px-[16px] md:px-[0] bg-grey12 md:bg-transparent">
				{children}
			</div>
		</div>
	);
}
