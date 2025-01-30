import type IOrderSummaryModel from "@/utils/models/IOrderSummaryModel";
import Image from "next/image";

const renderPrice = (model: IOrderSummaryModel) => (
	<div className="text-lg font-bold text-black flex items-center gap-1 font-inconsolata">
		£{model.price}
		<span className="text-xs leading-3 text-grey1 font-bold">
			(£{model.pricePerCapsule} / capsule)
		</span>
	</div>
);

export default function OrderSummaryCard({
	model,
}: Readonly<{ model: IOrderSummaryModel }>) {
	return (
		<div
			className={`grid gap-2 items-center ${
				model.src
					? "grid-cols-[61px_1fr] md:grid-cols-[61px_1fr_210px]"
					: "md:grid-cols-[1fr_210px]"
			}`}
		>
			{model.src && (
				<Image src={model.src} alt={model.alt || ""} width={61} height={61} />
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
