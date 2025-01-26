"use client";

import { useEffect, useState } from "react";

import { Progress } from "@/components/ui/progress";

import type { IReferCoinModel } from "@/utils/models/IReferCoinModel";

export default function MilestoneCard({
	balance,
	nextMilestone,
}: Readonly<{ balance: number; nextMilestone?: IReferCoinModel }>) {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (nextMilestone) {
			const precentage = (100 * balance) / nextMilestone?.requires;
			const timer = setTimeout(() => setProgress(precentage), 100);
			return () => clearTimeout(timer);
		}
	}, [nextMilestone, balance]);

	return (
		<div className="grid gap-[8px] border-[1px] border-grey35 p-[16px] rounded-[4px] shadow-3">
			<p className="text-[16px] leading-[18px] font-hagerman font-[400] text-center uppercase">
				Next Milestone
			</p>

			{nextMilestone && (
				<span className="text-[12px] leading-[13px] font-helvetica text-grey15">
					Earn {(nextMilestone.requires - balance).toLocaleString()} more Club
					Coins to Unlock £{nextMilestone.credit} Credit
				</span>
			)}

			<Progress value={progress} />
		</div>
	);
}
