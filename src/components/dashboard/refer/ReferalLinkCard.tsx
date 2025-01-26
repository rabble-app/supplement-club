"use client";

import Image from "next/image";
import { useState } from "react";

import { toast } from "sonner";

import { Input } from "@/components/ui/input";

export default function ReferalLinkCard({
	children,
}: Readonly<{
	children?: React.ReactNode;
}>) {
	const [link] = useState("https://example.com/referral?ref=user123");

	function copyToClipboard() {
		toast.custom(() => (
			<div className="text-white bg-blue px-[10px] py-[2px]">
				Copied the refer link
			</div>
		));
	}

	return (
		<div className=" border-[1px] shadow-4 border-grey35 p-[16px] rounded-[5px] grid gap-[16px]">
			<div className="grid gap-[8px]">
				<p className="text-[16px] leading-[16px] font-bold font-inconsolata">
					Earn 10% of your Friend’s Spend in Club Coins!
				</p>
				<p className="text-[14px] leading-[16px] font-helvetica text-grey4">
					Every £1 spent by your friend earns you 1,000 CC. You can convert CC
					into Credit off your Subscriptions
				</p>
			</div>

			<div className="grid gap-[8px]">
				<p className="text-[16px] leading-[24px] font-helvetica">
					Your Referal Link
				</p>
				<div className="relative">
					<Input
						readOnly
						value={link}
						placeholder="referal link"
						className="pr-[40px] text-grey16"
					/>

					<Image
						src="/images/icons/copyright-icon.svg"
						className="absolute right-[10px] top-[10px] cursor-pointer"
						title="Copy and share your referral link"
						onClick={() => copyToClipboard}
						alt="copyright icon"
						width={24}
						height={24}
					/>
				</div>
			</div>
			{children}
		</div>
	);
}
