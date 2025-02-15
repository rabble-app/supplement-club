import { useUser } from "@/contexts/UserContext";
import { referalService } from "@/services/referalService";
import type IReferalInfoModel from "@/utils/models/api/IReferalInfoModel";
import type IReferalModel from "@/utils/models/api/IReferalModel";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BalanceCard from "../dashboard/referral/BalanceCard";
import MilestoneCard from "../dashboard/referral/MilestoneCard";
import ReferInfoCard from "../dashboard/referral/ReferInfoCard";
import ReferalCard from "../dashboard/referral/ReferalCard";
import ReferalLinkCard from "../dashboard/referral/ReferalLinkCard";
import ViewTrakingDialog from "../dashboard/referral/ViewTrakingDialog";
import { Button } from "../ui/button";
import Spinner from "./Spinner";

export default function ReferralCardsWithLink() {
	const [loading, setLoading] = useState(true);
	const [nextMilestone, setNextMilestone] = useState<IReferalModel>();
	const [openReferal, setOpenReferal] = useState(false);
	const pathname = usePathname();
	const [isDashboard] = useState(pathname === "/dashboard/referral");
	const context = useUser();
	const [userName] = useState(
		`${context?.user?.firstName ?? ""} ${context?.user?.lastName ?? ""}`,
	);
	const [referalRewars, setReferalRewars] = useState<IReferalModel[]>([]);
	const [referalInfo, setReferalInfo] = useState<IReferalInfoModel>({
		balance: 0,
	} as IReferalInfoModel);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [referalInfoResponse, referalRewardsResponse] = await Promise.all(
					[referalService.getReferalInfo(), referalService.getRewars()],
				);

				setReferalInfo(referalInfoResponse);
				setReferalRewars(referalRewardsResponse);

				const next = referalRewardsResponse.find(
					(i) => i.amount > referalInfoResponse?.balance,
				);
				setNextMilestone(next);
			} catch (error) {
				console.error("Error fetching referral data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	function claimReward(val: number) {
		console.log(val);
	}

	function updateVisibility(val: boolean) {
		setOpenReferal(val);
	}

	if (loading) return <Spinner />;

	return (
		<div className="max-w-[600px] mx-auto pt-[16px] pb-[100px] md:py-[35px]">
			<div className="grid gap-[24px]">
				{isDashboard && (
					<div className="grid md:grid-cols-2 gap-[16px]">
						<ReferInfoCard
							totalCoint={referalInfo.balance + referalInfo.claimed || 0}
							name={userName}
							price={referalInfo.claimed}
							referrals={
								referalInfo.bonuses?.filter((b) => b.type === "REFERRAL")
									.length ?? 0
							}
							teams={referalInfo.teams ?? 0}
						/>

						<div className="grid gap-[10px]">
							<BalanceCard balance={referalInfo?.balance} />

							<MilestoneCard
								balance={referalInfo?.balance}
								nextMilestone={nextMilestone}
							/>
						</div>
					</div>
				)}
				{isDashboard && (
					<ViewTrakingDialog open={openReferal} openAction={updateVisibility} />
				)}
				<ReferalLinkCard refCode={context?.user?.refCode}>
					{!isDashboard && (
						<Button
							asChild
							className="bg-blue text-white text[17px] font-inconsolata w-[146px"
						>
							<Link href="/dashboard/referral">
								Track Your Referral Rewards Here
							</Link>
						</Button>
					)}
				</ReferalLinkCard>
				{isDashboard && (
					<div className="text-[32px] leading-[38px] font-hagerman mt-[10px]">
						Spend your club coins
					</div>
				)}

				<div className="grid gap-[16px]">
					{!isDashboard && (
						<>
							{" "}
							<MilestoneCard
								balance={referalInfo.balance}
								nextMilestone={nextMilestone}
							/>
							<div className="bg-grey11 md:hidden h-[16px] mx-[-16px] my-[-10px]" />
						</>
					)}
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
							key={`${referal.id} ${idx}`}
							credit={
								referalInfo?.balance ? referal.amount / referalInfo?.balance : 0
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
	);
}
