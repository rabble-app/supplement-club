export default function PricePerCapsule({
	price,
	pricePerCount,
}: Readonly<{
	price: number;
	pricePerCount: number;
}>) {
	return (
		<div className="text-[20px] font-bold text-black flex items-center gap-[5px] font-inconsolata">
			£{price}{" "}
			<span className="text-[12px] leading-[13px] md:leading-[12px] text-grey1 font-inconsolata font-bold">
				(£{pricePerCount.toFixed(2)} / count)
			</span>
		</div>
	);
}
