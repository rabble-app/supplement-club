import type { IManageAccountCard } from "@/utils/models/IManageAccountCard";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function ManageAccountCard(model: Readonly<IManageAccountCard>) {
	return (
		<div className="py-[16px] px-[12px] bg-white rounded-[12px] shadow-card">
			<div className="grid grid-cols-[32px_1fr_24px] gap-[8px] items-center">
				<Image
					src={model.imageSrc}
					alt={model.imageAlt}
					width={32}
					height={32}
				/>

				<div className="grid gap-[2px] justify-start">
					<p className="text-[12px] leading-[13px] font-helvetica text-grey4 text-start">
						{model.title}
					</p>
					<p className="text-[16px] leading-[18px] font-bold font-helvetica text-start">
						{model.value}
					</p>
				</div>

				<ChevronRight className="text-blue" />
			</div>
		</div>
	);
}
