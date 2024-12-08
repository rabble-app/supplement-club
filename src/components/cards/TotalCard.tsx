import TotalPercentCard from "./TotalPercentCard";

export default function TotalCard({
	capsules,
	price,
	rrp,
	percent,
	capsulePrice,
}: Readonly<{
	capsules: number;
	price: number;
	rrp: number;
	percent: number;
	capsulePrice: number;
}>) {
	return (
		<div className="flex gap-[7px] md:gap-[0] justify-between items-center">
			<div className="grid gap-[2px]">
				<p className="text-[32px] leading-[33px] font-inconsolata font-bold text-black">
					Total
				</p>
				<p className="text-[14px] leading-[15px] text-grey4 font-inconsolata">
					{capsules} Capsules
				</p>
			</div>

			<div className="grid md:justify-end gap-[7px]">
				<div className="text-[32px] leading-[34px] font-bold font-inconsolata text-black flex items-center">
					£{price.toFixed(2)}{" "}
					<span className="text-[12px] leading-[13px] text-grey1 ml-[2px] font-bold font-inconsolata">
						(£{capsulePrice} / capsule)
					</span>
				</div>

				<TotalPercentCard price={rrp} percent={percent} />
			</div>
		</div>
	);
}
