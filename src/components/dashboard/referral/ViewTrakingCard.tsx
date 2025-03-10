import type IEarningHistoryModel from "@/utils/models/IEarningHistoryModel";
import Image from "next/image";

export default function ViewTrakingCard({
	model,
}: Readonly<{ model: IEarningHistoryModel }>) {
	return (
		<div className="border-[1px] border-grey35 shadow-3 p-[16px] grid grid-cols-[63px_1fr] gap-[16px] w-full">
			<Image src="/images/coin.svg" alt="Coin balance" width={63} height={63} />
			<div className="grid gap-[8px] items-center">
				<span className="text-[20px] leading-[20px] font-[600] font-inconsolata text-left">
					You earned {model.amount.toLocaleString()} CC for referring Tom!
				</span>
				{model.referral?.firstName && (
					<span className="text-[16px] leading-[16px] font-bold font-inconsolata text-blue text-left">
						{model.referral.firstName} {model.referral.lastName}
					</span>
				)}
			</div>
		</div>
	);
}
