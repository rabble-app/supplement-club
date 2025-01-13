import { Separator } from "@radix-ui/react-separator";

import CorporationCardInfo from "@/components/cards/CorporationCardInfo";
import OrderCard from "@/components/cards/OrderCard";
import TotalPercentCard from "@/components/cards/TotalPercentCard";

export default function TopUpOrderSummary() {
	return (
		<div className="flex flex-col gap-[24px] md:p-[24px] bg-grey12">
			<h1 className="text-[24px] leading-[27px] font-hagerman text-blue mb-[8px]">
				Top Up Order Summary
			</h1>

			<CorporationCardInfo />

			<OrderCard
				id={1}
				alt="supplement mockup"
				description="0 Top Up Capsules  "
				delivery="Delivered Tomorrow "
				name="One time Alignment Package"
				src="/images/supplement-mockup.svg"
			>
				<div className="text-[20px] font-bold text-black flex items-center gap-[5px] font-inconsolata">
					£0.00{" "}
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
						0 Capsules
					</p>
				</div>

				<div className="grid md:justify-end">
					<div className="text-[16px] leading-[24px] font-inconsolata text-black flex items-center font-bold">
						Place Order - £0.00{" "}
						<span className="text-[12px] leading-[13px] font-inconsolata text-grey1 ml-[2px]">
							(£0.25 / capsule)
						</span>
					</div>
					<TotalPercentCard price={200} percent={65} />
				</div>
			</div>
		</div>
	);
}
