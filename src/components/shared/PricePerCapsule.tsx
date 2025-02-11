export default function PricePerCapsule({
	price,
}: Readonly<{
	price: number;
}>) {
	return (
		<div className="text-[20px] font-bold text-black flex items-center gap-[5px] font-inconsolata">
			£{price}{" "}
			<span className="text-[12px] leading-[13px] md:leading-[12px] text-grey1 font-inconsolata font-bold">
				(£0.25 / capsule)
			</span>
		</div>
	);
}
