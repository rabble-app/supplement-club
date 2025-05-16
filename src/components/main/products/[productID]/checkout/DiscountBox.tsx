import { Button } from "@/components/ui/button";

export default function DiscountBox() {
	return (
		<div className="grid gap-[8px] mb-[11px]">
			<p className="text-[32px] leading-[38px] font-hagerman">Your Discounts</p>
			<p className="text-[14px] leading-[16px] text-grey4">
				Every Quarter you have up to £15.00 in referral credits. Share with
				friends and you both get £5 off when they sign up.{" "}
			</p>
			<p className="text-[16px] leading-[18px] font-bold">
				Your current price for the next quarter
			</p>
			<p className="text-[32px] leading-[34px] font-bold font-inconsolata">
				£45.00
			</p>
			<Button className="bg-blue text-white w-full font-bold flex justify-center items-center font-inconsolata">
				Invite Friends & Earn £5
			</Button>
			<p className="text-[14px] leading-[14px] font-bold font-inconsolata text-blue flex justify-center items-center bg-blue2 h-[31px] px-[8px]">
				Earn £5 for each friend who joins! They get £5 off too.
			</p>
		</div>
	);
}
