import type { IUpcomingDeliveryResponse } from "@/utils/models/api/response/IUpcomingDeliveryResponse";
import { formatDate } from "@/utils/utils";
import Image from "next/image";
import UpcomingDeliveryProductBox from "./UpcomingDeliveryProductBox";
import { uniqueId } from "lodash";

export default function UpcomingDeliveryCard({
	model,
}: Readonly<{ model: IUpcomingDeliveryResponse }>) {
	return (
		<div className="bg-[#fff] p-[16px] flex-col gap-[16px] !rounded-[12px] !shadow-card">
			<div className="flex flex-row justify-between mb-[18px] flex-wrap">
				<div className="flex flex-row gap-[10px] items-center">
					<Image src="/images/delivery.svg" alt="Delivery icon" width={54} height={54} />
					<div className="font-Helvetica text-[20px] text-[#00038F] font-bold">
						{formatDate(model.deliveryDate)}
					</div>
				</div>
				<div className="addressBar text-[12px] leading-[13px] flex text-end">
					{model.user?.address}, {model.user?.city}<br /> {model.user?.country}, {model.user?.postalCode}
				</div>
			</div>
			<div className="flex flex-row justify-between flex-wrap">
				{model.deliveries.map((delivery, index) => (
					<UpcomingDeliveryProductBox 
						key={index + uniqueId()}
						model={{
							name: delivery.product.name,
							image: delivery.product.imageUrl || '/images/supplement-new.png',
							quantity: `${delivery.product.poucheSize}${delivery.product.unitsOfMeasurePerSubUnit === "grams" ? "g" : " capsules"} Pouch(${delivery.product.quantity})`,
							type: delivery.type,
						}} 
					/>
				))}
			</div>
		</div>
	);
}
