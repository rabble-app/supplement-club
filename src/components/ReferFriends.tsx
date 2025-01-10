import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

export default function ReferFriends() {
	function copyToClipboard() {
		toast.custom(() => (
			<div className="text-white bg-blue px-[10px] py-[2px]">
				Copied the refer link
			</div>
		));
	}
	const [link] = useState("https://example.com/referral?ref=user123");
	return (
		<div className="flex flex-col gap-[16px] shadow-3 px-[16px] py-[32px] rounded-[12px]">
			<div className="text-[25px] leading-[30px] md:text-[32px] md:leading-[38px] font-hagerman uppercase">
				Refer your friends and both get 10% off!
			</div>

			<div className="grid gap-[8px]">
				<p className="text-[16px] leading-[24px] font-helvetica">
					Your Referal Link
				</p>
				<div className="relative">
					<Input
						value={link}
						placeholder="referal link"
						className="pr-[40px] text-grey16"
					/>

					<Image
						src="/images/icons/copyright-icon.svg"
						className="absolute right-[10px] top-[10px] cursor-pointer"
						title="Copy and share your referral link"
						onClick={copyToClipboard}
						alt="copyright icon"
						width={24}
						height={24}
					/>
				</div>
			</div>
			<Button
				className="bg-blue text-white h-[48px] text-[16px] leading-[24px]"
				asChild
			>
				<Link href="#">Track Your Referral Rewards Here</Link>
			</Button>
		</div>
	);
}
