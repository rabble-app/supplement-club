import type { IReferalCardModel } from "@/utils/models/IReferalCardModel";
import Image from "next/image";
export default function DiscoutCard(model: Readonly<IReferalCardModel>) {
	return (
		<div
			className={`grid grid-cols-[63px_1fr_auto] w-full gap-[16px] p-[16px] items-center mx-auto 
                ${model.isActive ? " bg-white shadow-3 h-[127px] rounded-[8px]" : ""}`}
		>
			{model.isActive && model.steps === model.currentStep && (
				<div className="rounded-[50%] flex justify-center items-center w-[52px] h-[52px] bg-blue8">
					<Image
						src="/images/icons/add-user-icon.svg"
						alt="User badge"
						width={24}
						height={24}
					/>
				</div>
			)}

			{!model.isActive && model.steps === model.currentStep && (
				<div className="rounded-[50%] flex justify-center items-center w-[52px] h-[52px] bg-blue8">
					<Image
						src="/images/icons/user-badge-icon.svg"
						alt="User badge"
						width={24}
						height={24}
					/>
				</div>
			)}

			{!model.isActive && model.steps !== model.currentStep && (
				<div className="rounded-[50%] flex justify-center items-center w-[52px] h-[52px] bg-grey20">
					<Image
						src="/images/icons/lock-icon.svg"
						alt="Lock icon"
						width={24}
						height={24}
					/>
				</div>
			)}
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

			<div
				className={`font-inconsolata flex gap-[5px] items-center font-[800] ${model.isActive ? "text-blue text-[32px] leading-[33px]" : "text-[24px] leading-[25px] text-grey15"}`}
			>
				£{model.price.toFixed(2)}
			</div>
		</div>
	);
}
