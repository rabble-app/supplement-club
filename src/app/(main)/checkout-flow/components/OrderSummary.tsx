import RetailPrice from "@/components/RetailPrice";
import CorporationCardInfo from "@/components/cards/CorporationCardInfo";
import OrderCard from "@/components/cards/OrderCard";
import TotalPercentCard from "@/components/cards/TotalPercentCard";
import { Separator } from "@radix-ui/react-separator";

export default function OrderSummary({
	activeStep,
}: Readonly<{ activeStep: number }>) {
	return (
		<div className="grid gap-[24px] p-[16px] md:p-[24px] bg-grey12">
			{activeStep < 4 && (
				<h1 className="text-[24px] leading-[27px] font-hagerman text-blue mb-[8px]">
					Order Summary
				</h1>
			)}

			<CorporationCardInfo />

			{activeStep === 1 && (
				<p className="text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata">
					FREE NEXT DAY DELIVERY
				</p>
			)}
			{activeStep !== 1 && (
				<p className="text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata">
					NEXT DAY DELIVERY
				</p>
			)}

			<OrderCard
				id={1}
				alt="supplement mockup"
				description="30 Capsules to align you with next drop"
				name="Alignment Capsules"
				src="/images/supplement-mockup.svg"
			>
				<div className="text-[20px] font-bold text-black flex items-center gap-[5px] font-inconsolata">
					£15.00{" "}
					<span className="text-[12px] leading-[16px] md:leading-[12px] text-grey1 font-inconsolata">
						(£0.25 / capsule)
					</span>
				</div>
			</OrderCard>

			<OrderCard
				id={2}
				alt="ubiquinol"
				description="Startup Package"
				name="Glass Bottle Container"
				src="/images/ubiquinol.svg"
			>
				<RetailPrice />
			</OrderCard>

			<Separator className="bg-grey13 h-[1px]" />

			{activeStep === 1 && (
				<p className="text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata">
					Quarterly Subscription
				</p>
			)}
			{activeStep !== 1 && (
				<p className="text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata">
					Subscriptions
				</p>
			)}

			<OrderCard
				id={3}
				alt="supplement mockup"
				src="/images/supplement-mockup.svg"
				description="180 Capsules Every 3 months"
				name="Q1 Subscription"
				delivery={
					activeStep === 1
						? "Free Delivery: January 1st 2025"
						: "Next Drop Delivered: January 1st 2025"
				}
			>
				<div className="text-[20px] font-bold text-black flex items-center justify-end gap-[5px] font-inconsolata">
					£45.00{" "}
					<span className="text-[12px] leading-[12px] text-grey1 font-inconsolata">
						(£0.25 / capsule)
					</span>
				</div>
			</OrderCard>

			<Separator className="bg-grey13 h-[1px]" />

			<div className="grid gap-[7px] md:gap-0 md:grid-cols-[84px_1fr]">
				<div>
					<p className="text-[32px] leading-[33px] font-inconsolata font-bold text-black">
						Total
					</p>
					<p className="text-[14px] leading-[15px] text-grey4 font-inconsolata">
						266 Capsules
					</p>
				</div>

				<div className="grid md:justify-end">
					{activeStep < 4 && (
						<div className="text-[32px] leading-[34px] font-bold font-inconsolata text-black mb-[2px] flex items-center">
							£60.00{" "}
							<span className="text-[12px] leading-[13px] font-inconsolata text-grey1 ml-[2px]">
								(£0.25 / capsule)
							</span>
						</div>
					)}
					{activeStep === 4 && (
						<div className="text-[16px] leading-[24px] font-inconsolata text-black flex items-center">
							Place Order - £68.20{" "}
							<span className="text-[12px] leading-[13px] font-inconsolata text-grey1 ml-[2px]">
								(£0.25 / capsule)
							</span>
						</div>
					)}
					<TotalPercentCard price={144} percent={65} />
				</div>
			</div>
		</div>
	);
}
