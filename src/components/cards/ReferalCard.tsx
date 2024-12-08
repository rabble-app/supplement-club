import type { IReferalCardModel } from "@/utils/models/IReferalCardModel";
import Image from "next/image";

export default function ReferalCard(model: Readonly<IReferalCardModel>) {
	const activeClasses = "bg-white shadow-3 h-[127px]";
	const inactiveClasses = "bg-grey19 md:w-[calc(100%-16px)]";
	const circleBaseClasses =
		"rounded-[50%] flex justify-center items-center w-[52px] h-[52px]";
	const activeTextClasses = "text-black text-[20px] leading-[23px]";
	const inactiveTextClasses = "text-grey4 text-[18px] leading-[20px]";
	const descriptionTextClasses = model.isActive
		? "text-black text-[20px] leading-[20px]"
		: "text-grey4 text-[14px] leading-[14px]";
	const priceTextClasses = model.isActive
		? "text-blue text-[24px] leading-[25px] font-bold"
		: "text-grey15 text-[18px] leading-[18px]";

	const getImageSrc = () => {
		if (model.isActive && model.steps === model.currentStep)
			return "/images/icons/add-user-icon.svg";
		if (!model.isActive && model.steps === model.currentStep)
			return "/images/icons/user-badge-icon.svg";
		return "/images/icons/lock-icon.svg";
	};

	const getImageBgClass = () =>
		model.steps === model.currentStep ? "bg-blue8" : "bg-grey20";

	return (
		<div
			className={`grid grid-cols-[63px_1fr_70px] gap-[16px] p-[16px] items-center rounded-[8px] mx-auto w-full 
            ${model.isActive ? activeClasses : inactiveClasses}`}
		>
			<div className={`${circleBaseClasses} ${getImageBgClass()}`}>
				<Image src={getImageSrc()} alt="User badge" width={24} height={24} />
			</div>
			<div className="grid gap-[8px]">
				<p
					className={`font-hagerman ${model.isActive ? activeTextClasses : inactiveTextClasses}`}
				>
					{model.name}{" "}
					<span
						className={model.isActive ? activeTextClasses : inactiveTextClasses}
					>
						({model.currentStep}/{model.steps})
					</span>
				</p>
				{model.description && (
					<p className={`font-inconsolata ${descriptionTextClasses}`}>
						{model.description}
					</p>
				)}
			</div>
			<div
				className={`font-inconsolata flex gap-[5px] items-center ${priceTextClasses}`}
			>
				£{model.price.toFixed(2)}
			</div>
		</div>
	);
}
