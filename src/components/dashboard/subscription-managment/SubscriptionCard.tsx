import Image from "next/image";

import type { ISubscriptionCardModel } from "@/utils/models/ISubscriptionCardModel";

export default function SubscriptionCard(
	model: Readonly<ISubscriptionCardModel>,
) {
	return (
		<div className="py-[16px] px-[12px] bg-white shadow-card grid gap-[16px] rounded-[12px]">
			<div className="flex items-start gap-[8px]">
				<Image
					src={model.imageSrc}
					alt={model.imageAlt}
					width={24}
					height={24}
				/>
				<div className="grid gap-[2px]">
					<p className="text-[12px] leading-[13px] font-helvetica text-grey4">
						{model.title}
					</p>
					<p className="text-[16px] leading-[18px] font-bold font-helvetica">
						{model.description}
					</p>
				</div>
			</div>

			{model.children}
		</div>
	);
}
