import type IViewTrakingModel from "@/utils/models/IViewTrakingModel";
import Image from "next/image";

export default function ViewTrakingCard({
	model,
}: Readonly<{ model: IViewTrakingModel }>) {
	return (
		<div className="border-[1px] border-grey35 shadow-3 p-[16px] grid grid-cols-[63px_1fr] gap-[16px] w-full">
			<Image src="/images/coin.svg" alt="Coin balance" width={63} height={63} />
			<div className="grid gap-[8px] items-center">
				<span className="text-[20px] leading-[20px] font-[600] font-inconsolata text-left">
					You earned {model.price.toLocaleString()} CC for referring Tom!
				</span>
				<span className="text-[16px] leading-[16px] font-bold font-inconsolata text-blue text-left">
					{model.name}
				</span>
			</div>
		</div>
	);
}
