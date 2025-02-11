import type IUpcomingDeliveryModel from "@/utils/models/api/IUpcomingDeliveryModel";
import { formatDate } from "@/utils/utils";
import Image from "next/image";

export default function UpcomingDeliveryCard({
	model,
}: Readonly<{ model: IUpcomingDeliveryModel }>) {
	return (
		<div className="bg-[#fff] py-[16px] grid gap-[16px] rounded-[12px] shadow-card">
			<div className="h-[50px] px-[12px] grid grid-cols-[50px_1fr] gap-[8px] text-[20px] leading-[23px] font-bold text-blue items-center">
				<div className="p-[13px] bg-blue6 rounded-[50px]">
					<Image
						src="/images/icons/delivery-blue-icon.svg"
						alt="Delivery icon"
						width={24}
						height={24}
					/>
				</div>
				{formatDate(model.deliveryDate)}
			</div>
			<div className="px-[12px] grid md:grid-cols-[1fr_185px] md:justify-between md:items-center gap-[8px]">
				<div className="grid gap-[4px]">
					<p className="text-[12px] leading-[13px] text-grey4 uppercase font-inconsolata font-[600]">
						{model.businessName}
					</p>
					<p className="text-[20px] leading-[24px] font-hagerman">
						{model.name}
					</p>
					<p className="text-[12px] leading-[13px] text-grey4 font-inconsolata font-[600]">
						{model.quantity} Capsules
					</p>
				</div>
				<p className="text-[12px] leading-[13px] flex text-end">
					{model.address}, {model.city}, {model.country}
				</p>
			</div>
		</div>
	);
}
