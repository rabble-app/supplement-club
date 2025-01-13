import Link from "next/link";

import ReferalCard from "@/components/cards/ReferalCard";
import { Button } from "@/components/ui/button";

export default function ShareDiscounts() {
	return (
		<div className="grid gap-[16px] bg-grey12 py-[32px] px-[16px]">
			<div className="grid gap-[8px] md:px-[16px]">
				<p className="text-[24px] leading-[28px] font-bold font-inconsolata">
					Share With Others For Discounts
				</p>

				<p className="text-[14px] leading-[16px] font-helvetica text-grey4">
					Every Quarter you have up to £15.00 in referral credits. Share with
					friends and you both get £5 off when they sign up.{" "}
				</p>

				<p className="text-[18px] leading-[18px] font-bold font-inconsolata">
					Your current price for the next quarter
				</p>

				<p className="text-[32px] leading-[33px] font-bold font-inconsolata">
					£35.50
				</p>

				<Button className="bg-blue text-white w-full font-bold">
					<Link
						className="text-[16px] leading-[24px] font-[600] font-inconsolata"
						href="#"
					>
						Invite Friends & Earn £5
					</Link>
				</Button>

				<div className="text-[14px] leading-[14px] font-inconsolata font-[600] flex justify-center items-center text-center py-[4px] px-[10px] text-blue bg-blue2 h-[31px]">
					Earn £5 for each friend who joins! They get £5 off too.
				</div>
			</div>

			<ReferalCard
				currentStep={0}
				steps={0}
				name="Founding Member Subscription"
				price={40}
				rootClass="bg-grey19"
			/>

			<div className="mx-[-16px] md:mx-[-32px]">
				<ReferalCard
					currentStep={1}
					steps={1}
					name="Referral Rookie"
					description="£5 off"
					price={35.5}
					isActive={true}
					rootClass="bg-grey19"
				/>
			</div>

			<ReferalCard
				currentStep={1}
				steps={2}
				name="Team Builder"
				description="£10 off"
				price={30.5}
				rootClass="bg-grey19"
			/>

			<ReferalCard
				currentStep={1}
				steps={3}
				name="Super Sharer"
				description="£15 off"
				price={25.5}
				rootClass="bg-grey19"
			/>
		</div>
	);
}
