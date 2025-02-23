/** @format */

"use client";
import Image from "next/image";
import Link from "next/link";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@/contexts/UserContext";
import { getQuarterInfo } from "@/utils/utils";
import DesktopHeaderButtons from "./DesktopHeaderButtons";
import UserLoggedIn from "./UserLoggedIn";
import UserLoggedOut from "./UserLoggedOut";

export default function Header() {
	const context = useUser();

	const { nextDeliveryText } = getQuarterInfo();
	return (
		<header>
			<div className="flex justify-center items-center h-[40px] bg-blue2">
				<div className="text-blue3 underline">
					<span className="hidden lg:block font-inconsolata font-bold">
						Next Day Delivery on all Subscription start up packs. Getting you to
						the next drop on {nextDeliveryText}
					</span>
					<span className="block lg:hidden">
						Refer a friend and get £5 reward
					</span>
				</div>
			</div>

			<div className="flex items-center h-[70px] lg:px-[16px] lg:h-[90px] bg-blue">
				<div className="flex justify-between items-center container-width">
					<div className="grid gap-[51px] w-max text-white md:grid-cols-[auto_123px]">
						<Link
							className="font-normal lg:text-[64px] text-[48px] font-hagerman"
							href={context?.user ? "/dashboard" : "/"}
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

					<Dialog>
						<DialogTrigger asChild>
							<Image
								className="flex lg:hidden hover:cursor-pointer"
								src="/images/bars.svg"
								alt="Bars icon"
								width={16}
								height={16}
							/>
						</DialogTrigger>
						<DialogContent
							align={"top"}
							className="w-[calc(100%-32px)] grid gap-[32px] p-[16px] bg-blue text-white"
						>
							<DialogHeader>
								<DialogTitle className="text-[32px] leading-[36px] text-left flex justify-between items-center">
									Supplement Club
									<DialogClose asChild>
										<Image
											src="/images/icons/close-icon.svg"
											alt="Close icon"
											width={24}
											height={24}
										/>
									</DialogClose>
								</DialogTitle>
							</DialogHeader>
							<div className="grid gap-[24px] mt-[20px]">
								<DialogClose asChild>
									<Link href="/products">Products</Link>
								</DialogClose>
								<DialogClose asChild>
									<Link href="/labs">Labs</Link>
								</DialogClose>
							</div>
							<DialogFooter className="grid gap-[16px]">
								{!context?.user && <UserLoggedOut />}
								{context?.user && <UserLoggedIn user={context?.user} />}
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</div>
		</header>
	);
}
