import Image from "next/image";

export default function ReferalCard({
	name,
	price,
	steps,
	currentStep,
	description,
	isActive,
}: {
	name: string;
	steps: number;
	currentStep: number;
	price: number;
	description?: string;
	isActive?: boolean;
}) {
	return (
		<div
			className={`grid grid-cols-[63px_1fr_70px] gap-[16px] p-[16px] items-center rounded-[8px] mx-auto w-full 
                ${isActive ? " bg-white shadow-3 h-[127px]" : "bg-grey19 md:w-[calc(100%-16px)]"}`}
		>
			{isActive && steps === currentStep && (
				<div className="rounded-[50%] flex justify-center items-center w-[52px] h-[52px] bg-blue8">
					<Image
						src="/images/icons/add-user-icon.svg"
						alt="User badge"
						width={24}
						height={24}
					/>
				</div>
			)}

			{!isActive && steps === currentStep && (
				<div className="rounded-[50%] flex justify-center items-center w-[52px] h-[52px] bg-blue8">
					<Image
						src="/images/icons/user-badge-icon.svg"
						alt="User badge"
						width={24}
						height={24}
					/>
				</div>
			)}

			{!isActive && steps !== currentStep && (
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
					className={` font-hagerman ${isActive ? "text-black text-[20px] leading-[23px]" : " text-grey4 text-[18px] leading-[20px]"}`}
				>
					{name}{" "}
					<span
						className={` font-hagerman ${isActive ? "text-black text-[20px] leading-[23px]" : " text-grey4 text-[18px] leading-[20px]"}`}
					>
						({currentStep}/{steps})
					</span>
				</p>
				{description && (
					<p
						className={` font-inconsolata ${isActive ? "text-black text-[20px] leading-[20px]" : " text-grey4 text-[14px] leading-[14px]"}`}
					>
						{description}
					</p>
				)}
			</div>

			<div
				className={`font-inconsolata flex gap-[5px] items-center ${isActive ? "text-blue text-[24px] leading-[25px] font-bold" : " text-[18px] leading-[18px] font-inconsolata text-grey15"}`}
			>
				£{price.toFixed(2)}
			</div>
		</div>
	);
}
