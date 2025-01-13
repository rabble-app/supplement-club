import Image from "next/image";

import type { IReferalDiscountModel } from "@/utils/models/IReferalDiscountModel";

export default function ReferalDiscountCard(
	model: Readonly<IReferalDiscountModel>,
) {
	const initStep = model.initStep ?? 1;
	const isActive = model.activeIndex === model.id;
	return (
		<div
			className={`grid grid-cols-[63px_1fr_auto] gap-[16px] p-[16px] md:px-[32px] items-center rounded-[8px] 
				${isActive ? "bg-white mx-[-9px] md:mx-[-18px] shadow-3 h-[127px]" : "bg-grey19 min-h-[95px]"}`}
		>
			<div
				className={`rounded-[50%] flex justify-center items-center w-[63px] h-[63px] ${isActive || model.activeIndex > model.id ? "bg-blue8" : " bg-grey20"}`}
			>
				{!isActive && (
					<Image
						src={`${model.activeIndex > model.id ? "/images/icons/user-badge-icon.svg" : "/images/icons/lock-icon.svg"}`}
						alt="User profile group icon"
						className="my-auto"
						width={23}
						height={23}
					/>
				)}

				{isActive && model.activeImage && (
					<Image
						src={model.activeImage}
						alt="active picture"
						className="my-auto"
						width={64}
						height={64}
					/>
				)}

				{isActive && !model.activeImage && (
					<Image
						src="/images/icons/add-user-icon.svg"
						alt="active picture"
						className="my-auto"
						width={23}
						height={23}
					/>
				)}
			</div>

			<div className="text-[14px] leading-[16px] font-helvetica flex flex-col justify-center gap-[8px]">
				<p
					className={`text-[20px] leading-[23px] uppercase font-hagerman ${isActive ? "text-black" : "text-grey6"}`}
				>
					{model.name}{" "}
					<span
						className={`text-[20px] leading-[23px] uppercase font-hagerman ${isActive ? "text-black" : "text-grey6"}`}
					>
						({initStep}/{model.steps})
					</span>
				</p>
				{model.priceOff && (
					<p
						className={`text-[20px] leading-[21px] font-inconsolata ${isActive ? "text-black font-[600]" : " text-grey15"}`}
					>
						£{model.priceOff} off Team Price
					</p>
				)}
			</div>

			<div
				className={`font-inconsolata font-[800] flex items-center  ${isActive ? "text-blue text-[32px] leading-[33px]" : "text-grey15 text-[24px] leading-[25px]"}`}
			>
				£{model.price.toFixed(2)}
			</div>
		</div>
	);
}
