"use client";

import { useEffect, useState } from "react";

import { Progress } from "@/components/ui/progress";
import type IReferalModel from "@/utils/models/api/IReferalModel";

export default function MilestoneCard({
	balance,
	nextMilestone,
}: Readonly<{ balance: number; nextMilestone?: IReferalModel }>) {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (nextMilestone) {
			const precentage = nextMilestone
				? (100 * balance) / nextMilestone?.amount
				: 100;
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
					Earn {(nextMilestone.amount - balance).toLocaleString()} more Club
					Coins to Unlock £{nextMilestone.amount} Credit
				</span>
			)}

			<Progress value={progress} />
		</div>
	);
}
