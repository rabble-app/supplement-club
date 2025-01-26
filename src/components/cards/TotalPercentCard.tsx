export default function TotalPercentCard({
	price,
	percent,
}: Readonly<{ price?: number; percent: number }>) {
	return (
		<div className="text-[24px] leading-[25px] font-inconsolata font-[400] text-grey4 md:text-end">
			RRP{" "}
			<span className="text-[24px] leading-[25px] font-inconsolata line-through font-bold">
				£{price}
			</span>{" "}
			<span className="text-[24px] leading-[25px] font-inconsolata font-bold text-blue">
				{percent}% OFF
			</span>
		</div>
	);
}
