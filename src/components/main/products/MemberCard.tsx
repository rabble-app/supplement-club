import Image from "next/image";

import type { IMemberCardModel } from "@/utils/models/IMemberCardModel";

export default function MemberCard(model: Readonly<IMemberCardModel>) {
	let rootClass =
		"grid gap-[16px] p-[16px] md:px-[36px] items-center rounded-[8px] mx-auto w-full";
	if (model.isActive) {
		rootClass +=
			" grid-cols-[52px_1fr] bg-white w-full shadow-3 h-[138px] mx-[-16px] md:mx-[0] py-[32px] md:px-[16px]";
	} else {
		rootClass += " bg-grey21 h-[106px] md:w-[calc(100%-72px)]";
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
			<div className="flex justify-between">
				<div className="flex flex-col gap-[8px] justify-center">
					<p className="text-[14px] leading-[14px] font-inconsolata text-grey4">
						{model.doseTitle}
					</p>
					<p className="text-[24px] leading-[27px] font-hagerman">
						{model.name}
					</p>
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
				</div>

				<div className="flex flex-col gap-[8px] justify-center">
					{model.doseValue && (
						<p className="text-[14px] leading-[14px] text-blue font-inconsolata text-end">
							{model.doseValue}
						</p>
					)}
					<div className="flex gap-[5px] items-center justify-end">
						<span className="text-[20px] leading-[20px] font-bold font-inconsolata">
							£{model.price}
						</span>{" "}
						<p className="text-[12px] my-[auto] font-bold font-inconsolata text-grey1">
							(£{model.capsulePrice} / capsule)
						</p>
					</div>

					{model.spotsRemainds && (
						<p className="text-[14px] leading-[14px] font-inconsolata text-blue text-end">
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
