import type IOrderSummaryModel from "@/utils/models/IOrderSummaryModel";
import type ISubscriptionSummaryModel from "@/utils/models/ISubscriptionSummaryModel";
import Image from "next/image";

function renderPrice(model: IOrderSummaryModel | ISubscriptionSummaryModel) {
	if (model.isFree) {
		return (
			<div className="grid gap-[7px]">
				<div className="gap-[2px] text-[20px] leading-[20px] font-inconsolata font-bold flex md:justify-end items-center line-through">
					£{model.price?.toFixed(2)}{" "}
				</div>
				<div className="text-[20px] leading-[20px] font-inconsolata font-[400] text-grey4 md:text-end">
					RRP{" "}
					<span className="text-[20px] leading-[20px] font-inconsolata line-through font-bold">
						£{model.rrp}
					</span>{" "}
					<span className="text-[20px] leading-[20px] font-inconsolata font-bold text-blue">
						FREE
					</span>
				</div>
			</div>
		);
	}

	return (
		<div className="text-lg font-bold text-black flex items-center gap-1 font-inconsolata">
			£{model.capsules * 0.25}
			<span className="text-xs leading-3 text-grey1 font-inconsolata font-bold">
				(£0.25/capsule)
			</span>
		</div>
	);
}

export default function OrderSummaryCard({
	model,
}: Readonly<{ model: IOrderSummaryModel | ISubscriptionSummaryModel }>) {
	return (
		<div
			className={`grid gap-2 items-center ${
				model.src
					? "grid-cols-[61px_1fr] md:grid-cols-[61px_1fr_210px]"
					: "md:grid-cols-[1fr_210px]"
			}`}
		>
			{model.src && (
				<Image
					src={model.src}
					alt={model.alt ?? ""}
					width={61}
					height={61}
					priority
				/>
			)}

			<div className="grid gap-2">
				<p className="text-[14px] leading-[14px] font-inconsolata text-grey4">
					{model.description}
				</p>
				<p className="text-[16px] leading-[16px] font-[600] font-inconsolata">
					{model.name}
				</p>
				{model.delivery && (
					<p className="text-[14px] leading-[14px] font-inconsolata text-grey4">
						{model.delivery}
					</p>
				)}

				<div className="flex md:hidden">{renderPrice(model)}</div>
			</div>

			<div className="hidden md:flex justify-end">{renderPrice(model)}</div>
		</div>
	);
}
