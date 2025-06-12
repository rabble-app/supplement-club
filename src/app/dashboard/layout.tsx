/** @format */

"use client";

import Image from "next/image";
import Link from "next/link";

import ShowTextBasedOnRoute from "@/components/dashboard/ShowTextBasedOnRoute";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { IMetadata } from "@/utils/models/api/response/IUserResponse";
import useLocalStorage from "use-local-storage";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const router = useRouter();
	const context = useUser();
	const [, setCheckoutData] = useLocalStorage<IMetadata>("checkoutData", {});

	function handleLogout() {
		context?.logout();
		router.push("/");
		setCheckoutData(undefined);
	}
	return (
		<div>
			<div className=" sticky top-[0] z-[2] bg-white">
				<header className="w-full h-[52px] md:h-[62px] bg-blue text-white flex justify-center items-center m-auto px-[16px]">
					<Link
						href="/"
						className="font-helvetica text-[16px] leading-[18px] font-bold text-base md:hidden flex gap-[8px] items-center absolute left-[16px]"
					>
						<Image
							src="/images/icons/home-icon.svg"
							alt="Logout icon"
							width={24}
							height={24}
						/>
						Home
					</Link>
					<Link
						href="/"
						className="text-[24px] leading-[27px] font-hagerman"
					>
						Supplement Club
					</Link>

					<Button
						onClick={() => handleLogout()}
						className="absolute right-[16px] p-[0]"
					>
						<Image
							src="/images/logout.svg"
							alt="Logout icon"
							width={24}
							height={24}
						/>
					</Button>
				</header>
				<ShowTextBasedOnRoute />
			</div>
			<div className="px-[16px] md:px-[0] bg-grey12 md:bg-transparent">
				{children}
			</div>
		</div>
	);
}
