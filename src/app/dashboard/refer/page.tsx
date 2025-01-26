"use client";

import { useEffect, useState } from "react";

import BalanceCard from "@/components/dashboard/refer/BalanceCard";
import CoinCard from "@/components/dashboard/refer/CoinCard";
import MilestoneCard from "@/components/dashboard/refer/MilestoneCard";
import ReferInfoCard from "@/components/dashboard/refer/ReferInfoCard";
import ReferalLinkCard from "@/components/dashboard/refer/ReferalLinkCard";

import ViewTrakingDialog from "@/components/dashboard/refer/ViewTrakingDialog";
import type { IReferCoinModel } from "@/utils/models/IReferCoinModel";

const milestones = [
	{
		isActive: true,
		isQuickWin: true,
		rate: 1000,
		requires: 50000,
		credit: 5,
	},
	{
		isActive: true,
		isQuickWin: false,
		rate: 980,
		requires: 98000,
		credit: 10,
	},
	{
		isActive: false,
		rate: 960,
		requires: 192000,
		credit: 20,
	},
	{
		isActive: false,
		rate: 950,
		requires: 475000,
		credit: 50,
		isBestValue: true,
	},
] as IReferCoinModel[];

export default function Refer() {
	const [nextMilestone, setNextMilestone] = useState<
		IReferCoinModel | undefined
	>();
	const [balance] = useState(99000);

	useEffect(() => {
		milestones.map((item) => {
			item.percentage = Math.round((balance * 100) / item.requires);
		});
		const next = milestones.find((i) => i.requires > balance);
		setNextMilestone(next);
	}, [balance]);

	return (
		<>
			<div className="bg-blue2 text-center py-[8px] text-blue font-bold font-inconsolata text-[16px] leading-[16px] border-t-[1px] border-grey30">
				🎉 You have purchased a £5 credit that will be credited off your next
				payment
			</div>
			<div className="max-w-[600px] mx-auto pt-[16px] pb-[100px] md:py-[35px]">
				<div className="grid gap-[40px]">
					<div className="grid md:grid-cols-2 gap-[16px]">
						<ReferInfoCard />

						<div className="grid gap-[10px]">
							<BalanceCard balance={balance} />
							<MilestoneCard balance={balance} nextMilestone={nextMilestone} />
						</div>
					</div>

					<ViewTrakingDialog />

					<ReferalLinkCard />

					<div className="grid gap-[16px]">
						<div className="text-[32px] leading-[38px] font-hagerman">
							Spend your club coins
						</div>
						{milestones.map((milestone, idx) => (
							<CoinCard key={`coin-${idx + 1}`} model={milestone} />
						))}
					</div>
				</div>
			</div>
		</>
	);
}
