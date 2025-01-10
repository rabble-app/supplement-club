export default function RetailPrice() {
	return (
		<div className="grid gap-[7px]">
			<p className="text-[20px] leading-[21px] font-inconsolata line-through font-bold md:text-end">
				£0.00
			</p>
			<div className="text-[20px] leading-[21px] font-inconsolata text-grey4 mb-[16px]">
				RRP{" "}
				<span className="text-[20px] leading-[21px] font-inconsolata line-through font-bold">
					£18
				</span>{" "}
				<span className="text-[20px] leading-[21px] font-inconsolata font-bold text-blue">
					FREE
				</span>
			</div>
		</div>
	);
}
