"use client";

import Image from "next/image";
import * as React from "react";

import { Progress } from "@/components/ui/progress";

export default function ReferralCard() {
	const [progress, setProgress] = React.useState(0);

	React.useEffect(() => {
		const timer = setTimeout(() => setProgress(25), 500);
		return () => clearTimeout(timer);
	}, []);
	return (
		<div className="border-[1px] border-grey35 p-[16px] grid grid-cols-[64px_1fr] gap-[16px] rounded-[4px] shadow-3">
			<Image
				src="/images/referral-rookie.svg"
				alt="referral rookie"
				width={64}
				height={64}
			/>
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
