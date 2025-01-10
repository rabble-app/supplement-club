import { Separator } from "@radix-ui/react-separator";

import RetailPrice from "@/components/RetailPrice";
import CorporationCardInfo from "@/components/cards/CorporationCardInfo";
import OrderCard from "@/components/cards/OrderCard";
import TotalPercentCard from "@/components/cards/TotalPercentCard";

export default function OrderSummary({
	activeStep,
}: Readonly<{ activeStep: number }>) {
	return (
		<div className="flex flex-col gap-[24px] p-[16px] md:p-[24px] bg-grey12">
			{activeStep < 4 && (
				<h1 className="text-[24px] leading-[27px] font-hagerman text-blue mb-[8px]">
					Order Summary
				</h1>
			)}

			<CorporationCardInfo />

			<Separator className="bg-grey13 h-[1px]" />

			<OrderCard
				id={1}
				alt="supplement mockup"
				description="180 Capsules Every 3 months"
				delivery="Triggered when 50 pre-orders Complete"
				name="Quarterly Subscription"
				src="/images/supplement-mockup.svg"
			>
				<div className="text-[20px] font-bold text-black flex items-center gap-[5px] font-inconsolata">
					£45.00{" "}
					<span className="text-[12px] leading-[13px] md:leading-[12px] text-grey1 font-inconsolata">
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
				<div className="hidden md:grid">
					<RetailPrice />
				</div>
				<div className="md:hidden grid grid-cols-2 gap-[7px] items-center">
					<p className="text-[20px] leading-[21px] font-inconsolata line-through font-bold md:text-end">
						£18.00
					</p>
					<span className="text-[12px] leading-[12px] font-inconsolata font-bold text-grey1">
						FREE
					</span>
				</div>
			</OrderCard>

			<OrderCard
				id={3}
				alt="user badge"
				delivery="Forever"
				name="Founding Member 10% Discount"
				src="/images/user-badge.svg"
			>
				<div className="text-[20px] font-bold text-black flex items-center gap-[5px] font-inconsolata">
					£-4.50{" "}
					<span className="text-[12px] leading-[13px] md:leading-[12px] text-grey1 font-inconsolata">
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
							£40.50{" "}
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
