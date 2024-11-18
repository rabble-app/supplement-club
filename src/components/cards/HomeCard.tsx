import type { IHomeCardModel } from "@/utils/models/IHomeCardModel";
import Image from "next/image";

export default function HomeCard(model: Readonly<IHomeCardModel>) {
	return (
		<div className="grid gap-y-[16px]">
			<div className="flex gap-x-[8px] items-center">
				<Image src={model.src} alt={model.alt} width={32} height={32} />
				<span className="text-[20px] md:text-[28px] leading-[23px] md:leading-[32px] font-[700] text-blue">
					{model.title}
				</span>
			</div>
			<div className="text-[16px] md:text-[20px] leading-[18px] md:leading-[24px] font-[700] text-black">
				{model.subtitle}
			</div>
			<div className="text-[14px] md:text-[16px] leading-[26px] text-grey1">
				{model.description}
			</div>
		</div>
	);
}
