import ReferalDiscountCard from "./ReferalDiscountCard";

export default function ReferalDiscounts() {
	return (
		<div className="mx-[-18px] md:mx-[18px] p-[16px] md:p-[32px] md:border-[1px] bg-white md:border-grey12 ">
			<div className="grid gap-[8px]">
				<p className="text-[32px] leading-[38px] font-hagerman">
					Your Referal Discounts
				</p>
				<p className="text-[14px] leading-[16px] font-helvetica text-grey4">
					Every Quarter you have up to £15.00 in referral credits. Share with
					friends and you both get £5 off when they sign up.{" "}
				</p>
			</div>

			<div className="grid gap-[16px] bg-white pt-[24px]">
				<ReferalDiscountCard
					name="Referral Rookie"
					steps={1}
					price={36}
					priceOff={5}
					isActive={true}
				/>

				<ReferalDiscountCard
					name="Team Builder"
					steps={2}
					price={30}
					priceOff={10}
				/>

				<ReferalDiscountCard
					name="Super Sharer"
					steps={3}
					price={25}
					priceOff={15}
				/>
			</div>
		</div>
	);
}