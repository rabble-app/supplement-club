import Image from "next/image";

import type { IHomeCardModel } from "@/utils/models/IHomeCardModel";

export default function HomeCard(model: Readonly<IHomeCardModel>) {
	return (
		<div className="grid gap-y-[16px]">
			<div className="flex gap-x-[8px] items-center">
				<Image
					src={model.src}
					alt={model.alt}
					width={35}
					height={35}
					priority
				/>
				<span className="text-[32px] leading-[32px] md:leading-[40px] text-blue font-[400] font-hagerman">
					{model.title}
				</span>
			</div>
			<div className="text-[20px] md:text-[22px] leading-[22px] font-bold text-black font-inconsolata">
				{model.subtitle}
			</div>
			<div className="text-[14px] md:text-[18px] leading-[26px] text-grey1 font-helvetica">
				{model.description}
			</div>
		</div>
	);
}
