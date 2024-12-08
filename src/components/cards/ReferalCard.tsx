import type { IReferalCardModel } from "@/utils/models/IReferalCardModel";
import Image from "next/image";

export default function ReferalCard(model: Readonly<IReferalCardModel>) {
	let imageAlt = "Add user";
	let imageSrc = "/images/icons/add-user-icon.svg";
	let imageClasses =
		"rounded-[50%] flex justify-center items-center w-[52px] h-[52px] bg-blue8";

	if (!model.isActive && model.steps === model.currentStep) {
		imageAlt = "User badge";
		imageSrc = "/images/icons/user-badge-icon.svg";
		imageClasses += " bg-blue8";
	} else if (!model.isActive && model.steps !== model.currentStep) {
		imageAlt = "Lock image";
		imageSrc = "/images/icons/lock-icon.svg";
		imageClasses += " bg-grey20";
	}

	let priceClass = "font-inconsolata flex gap-[5px] items-center font-[800]";
	if (model.isActive) {
		priceClass += " text-blue text-[32px] leading-[33px]";
	} else {
		priceClass += " text-[24px] leading-[25px] text-grey15";
	}

	return (
		<div
			className={`grid grid-cols-[63px_1fr_auto] gap-[16px] p-[16px] items-center rounded-[8px] mx-auto w-full 
                ${model.isActive ? " bg-white shadow-3 h-[127px]" : "bg-grey19 md:w-[calc(100%-16px)]"}`}
		>
			<div className={imageClasses}>
				<Image src={imageSrc} alt={imageAlt} width={24} height={24} />
			</div>
			<div className="grid gap-[8px]">
				<p
					className={` font-hagerman ${model.isActive ? "text-black text-[20px] leading-[23px]" : " text-grey4 text-[18px] leading-[20px]"}`}
				>
					{model.name}{" "}
					<span
						className={` font-hagerman ${model.isActive ? "text-black text-[20px] leading-[23px]" : " text-grey4 text-[18px] leading-[20px]"}`}
					>
						({model.currentStep}/{model.steps})
					</span>
				</p>
				{model.description && (
					<p
						className={` font-inconsolata ${model.isActive ? "text-black text-[20px] leading-[20px]" : " text-grey4 text-[14px] leading-[14px]"}`}
					>
						{model.description}
					</p>
				)}
			</div>

			<div className={priceClass}>£{model.price.toFixed(2)}</div>
		</div>
	);
}
