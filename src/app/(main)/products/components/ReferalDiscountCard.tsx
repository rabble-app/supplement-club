import Image from "next/image";

import type { IReferalDiscountModel } from "@/utils/models/IReferalDiscountModel";

export default function ReferalDiscountCard(
	model: Readonly<IReferalDiscountModel>,
) {
	return (
		<div
			className={`grid grid-cols-[63px_1fr_auto] gap-[16px] p-[16px] md:px-[32px] items-center rounded-[8px] ${model.isActive ? "bg-white mx-[-16px] md:mx-[-18px] shadow-3 h-[127px]" : "bg-grey21 h-[95px]"}`}
		>
			<div
				className={`rounded-[50%] flex justify-center items-center w-[63px] h-[63px] ${model.isActive ? "bg-blue8" : " bg-grey20"}`}
			>
				<Image
					src={`${model.isActive ? "/images/icons/add-user-icon.svg" : "/images/icons/lock-icon.svg"}`}
					alt="User profile group icon"
					className="my-auto"
					width={23}
					height={23}
				/>
			</div>
			<div className="text-[14px] leading-[16px] font-helvetica flex flex-col justify-center gap-[8px]">
				<p
					className={`text-[20px] leading-[23px] uppercase font-hagerman ${model.isActive ? "text-black" : "text-grey6"}`}
				>
					{model.name}{" "}
					<span
						className={`text-[20px] leading-[23px] uppercase font-hagerman ${model.isActive ? "text-black" : "text-grey6"}`}
					>
						(1/{model.steps})
					</span>
				</p>
				<p
					className={`text-[20px] leading-[21px] font-inconsolata ${model.isActive ? "text-black font-[600]" : " text-grey15"}`}
				>
					£{model.priceOff} off Team Price
				</p>
			</div>
			<div
				className={`font-inconsolata font-[800] flex items-center  ${model.isActive ? "text-blue text-[32px] leading-[33px]" : "text-grey15 text-[24px] leading-[25px]"}`}
			>
				£{model.price.toFixed(2)}
			</div>
		</div>
	);
}
