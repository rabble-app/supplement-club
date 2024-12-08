import type { IMemberCardModel } from "@/utils/models/IMemberCardModel";
import Image from "next/image";

export default function MemberCard(model: Readonly<IMemberCardModel>) {
	let rootClass =
		"grid gap-[16px] p-[16px] md:px-[36px] items-center rounded-[8px] mx-auto w-full";
	if (model.isActive) {
		rootClass +=
			"grid-cols-[52px_1fr_auto] bg-white shadow-3 h-[138px] mx-[-16px] md:mx-[0]";
	} else {
		rootClass += "bg-grey21 h-[106px] md:w-[calc(100%-72px)]";
	}
	return (
		<div className={rootClass}>
			{model.isActive && (
				<div className="rounded-[50%] flex justify-center items-center w-[52px] h-[52px] bg-blue8">
					<Image
						src="/images/icons/user-badge-icon.svg"
						alt="User badge"
						className="my-auto"
						width={32}
						height={32}
					/>
				</div>
			)}
			<div className="flex flex-col justify-center gap-[8px]">
				<div className=" flex justify-between">
					<p className="text-[14px] leading-[14px] font-inconsolata text-grey4">
						{model.doseTitle}
					</p>{" "}
					{model.doseValue && (
						<p className="text-[14px] leading-[14px] text-blue font-inconsolata">
							{model.doseValue}
						</p>
					)}
				</div>
				<div className=" flex justify-between">
					<p className="text-[24px] leading-[27px] font-hagerman">
						{model.name}
					</p>
					<div className="flex gap-[5px] items-center">
						<span className="text-[20px] leading-[21px] font-bold font-inconsolata">
							£{model.price.toFixed(2)}
						</span>{" "}
						<p className="text-[12px] leading-[13px] font-bold font-inconsolata text-grey1">
							(£{model.capsulePrice} / capsule)
						</p>
					</div>
				</div>
				<div className="flex justify-between">
					<div className="flex gap-[5px] items-center text-[14px] leading-[14px] font-inconsolata text-grey4">
						{model.discountTitle}
						{model.forever && (
							<span
								className={`uppercase text-[14px] leading-[14px] font-inconsolata ${!model.isActive ? "text-blue font-[800]" : "text-grey6"}`}
							>
								Forever
							</span>
						)}
					</div>
					{model.spotsRemainds && (
						<p className="text-[14px] leading-[14px] font-inconsolata text-blue">
							<span className="text-[14px] leading-[14px] font-inconsolata font-bold">
								{model.spotsRemainds}
							</span>{" "}
							Founder Spots Remaining!
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
