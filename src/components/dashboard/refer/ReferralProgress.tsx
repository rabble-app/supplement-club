"use client";

import Image from "next/image";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export default function ReferralProgress() {
	const [progress, setProgress] = useState(0);

	const items = [
		{
			id: 1,
			imageSrc: "/images/referral-rookie.svg",
			imageAlt: "referral rookie",
		},
		{
			id: 2,
			imageSrc: "/images/referral-lock-blue.svg",
			imageAlt: "referral rookie",
		},
		{
			id: 3,
			imageSrc: "/images/referral-lock-blue.svg",
			imageAlt: "referral rookie",
		},
		{
			id: 4,
			imageSrc: "/images/referral-lock-blue.svg",
			imageAlt: "referral rookie",
		},
	];

	useEffect(() => {
		const timer = setTimeout(() => setProgress(25), 500);
		return () => clearTimeout(timer);
	}, []);
	return (
		<div className="border-[1px] border-grey35 p-[16px] grid gap-[16px] rounded-[4px] shadow-3">
			<div className="flex justify-between">
				{items.map((item) => (
					<Image
						key={item.id}
						src={item.imageSrc}
						alt={item.imageAlt}
						width={64}
						height={64}
					/>
				))}
			</div>
			<div className="grid gap-[8px]">
				<p className="text-[24px] leading-[27px] font-hagerman font-[400]">
					Referral Rookie
				</p>

				<Progress value={progress} />

				<div className="flex justify-between items-center">
					<span className="text-[16px] leading-[16px] font-[500] font-inconsolata text-grey15">
						25/100 User Referrals
					</span>{" "}
					<span className="text-[16px] leading-[16px] font-[500] font-inconsolata text-grey15">
						Level 1
					</span>
				</div>
			</div>
		</div>
	);
}
