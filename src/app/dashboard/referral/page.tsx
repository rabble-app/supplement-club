"use client";

import { useEffect, useState } from "react";

import BalanceCard from "@/components/dashboard/referral/BalanceCard";
import MilestoneCard from "@/components/dashboard/referral/MilestoneCard";
import ReferInfoCard from "@/components/dashboard/referral/ReferInfoCard";
import ReferalLinkCard from "@/components/dashboard/referral/ReferalLinkCard";

import ReferalCard from "@/components/dashboard/referral/ReferalCard";
import ViewTrakingDialog from "@/components/dashboard/referral/ViewTrakingDialog";
import { useUser } from "@/contexts/UserContext";
import { referalService } from "@/services/referalService";
import type IReferalInfoModel from "@/utils/models/api/IReferalInfoModel";
import type IReferalModel from "@/utils/models/api/IReferalModel";

export default function Refer() {
	const [nextMilestone, setNextMilestone] = useState<IReferalModel>();
	const [claimValue, setClaimValue] = useState(0);
	const [openReferal, setOpenReferal] = useState(false);
	const context = useUser();
	const [userName] = useState(
		`${context?.user?.firstName || ""} ${context?.user?.lastName ?? ""}`,
	);
	const [referalRewars, setReferalRewars] = useState<IReferalModel[]>([]);
	const [referalInfo, setReferalInfo] = useState<IReferalInfoModel>({
		balance: 0,
	} as IReferalInfoModel);

	useEffect(() => {
		const fetchReferalRewars = async () => {
			const model = await referalService.getRewars();
			setReferalRewars(model);

			const next = model.find((i) => i.amount > referalInfo?.balance);
			setNextMilestone(next);
		};
		fetchReferalRewars();
	}, [referalInfo?.balance]);

	useEffect(() => {
		const fetchReferaInfo = async () => {
			const model = await referalService.getReferalInfo();
			setReferalInfo(model);
		};
		fetchReferaInfo();
	}, []);

	function claimReward(val: number) {
		setClaimValue(val);
	}

	function updateVisibility(val: boolean) {
		setOpenReferal(val);
	}

	return (
		<>
			{claimValue > 0 && (
				<div className="bg-blue2 text-center py-[8px] text-blue font-bold font-inconsolata text-[16px] leading-[16px] border-t-[1px] border-grey30">
					🎉 You have purchased a £{claimValue.toFixed(2)} credit that will be
					credited off your next payment
				</div>
			)}
			<div className="max-w-[600px] mx-auto pt-[16px] pb-[100px] md:py-[35px]">
				<div className="grid gap-[40px]">
					<div className="grid md:grid-cols-2 gap-[16px]">
						<ReferInfoCard
							totalCoint={referalInfo.balance + referalInfo.claimed || 0}
							name={userName}
							price={referalInfo.claimed}
							referrals={
								referalInfo.bonuses?.filter((b) => b.type === "REFERRAL")
									.length || 0
							}
							teams={referalInfo.teams || 0}
						/>

						<div className="grid gap-[10px]">
							<BalanceCard balance={referalInfo?.balance} />
							<MilestoneCard
								balance={referalInfo?.balance}
								nextMilestone={nextMilestone}
							/>
						</div>
					</div>
					before
					<ViewTrakingDialog open={openReferal} openAction={updateVisibility} />
					after
					<ReferalLinkCard refCode={context?.user?.refCode} />
					<div className="grid gap-[16px]">
						<div className="text-[32px] leading-[38px] font-hagerman">
							Spend your club coins
						</div>
						{referalRewars.map((referal, idx) => (
							<ReferalCard
								openAction={updateVisibility}
								claimRewardAction={claimReward}
								percentage={
									referalInfo?.balance
										? (referal.amount * 100) / referalInfo?.balance
										: 0
								}
								isActive={referalInfo?.claimed >= referal.amount}
								key={referal.id}
								credit={
									referalInfo?.balance
										? referal.amount / referalInfo?.balance
										: 0
								}
								rate={referal.rate}
								requires={referal.amount}
								isQuickWin={idx === 0}
								isBestValue={idx + 1 === referalRewars.length}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
