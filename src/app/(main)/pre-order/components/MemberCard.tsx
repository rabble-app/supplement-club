import Image from "next/image";

export default function MemberCard({
	name,
	price,
	doseTitle,
	doseValue,
	discountTitle,
	capsulePrice,
	spotsRemainds,
	forever,
	isActive,
}: {
	name: string;
	doseTitle: string;
	discountTitle?: string;
	doseValue?: string;
	capsulePrice?: number;
	spotsRemainds?: number;
	price: number;
	forever?: boolean;
	isActive?: boolean;
}) {
	return (
		<div
			className={`grid gap-[16px] p-[16px] md:px-[36px] items-center rounded-[8px] mx-auto 
                ${isActive ? "grid-cols-[63px_1fr_auto] bg-white shadow-3 h-[138px] w-full" : "bg-grey21 h-[106px] w-[calc(100%-72px)]"}`}
		>
			{isActive && (
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
						{doseTitle}
					</p>{" "}
					{doseValue && (
						<p className="text-[14px] leading-[14px] text-blue font-inconsolata">
							{doseValue}
						</p>
					)}
				</div>
				<div className=" flex justify-between">
					<p className="text-[24px] leading-[27px] font-hagerman">{name}</p>
					<div className="flex gap-[5px] items-center">
						<span className="text-[20px] leading-[21px] font-bold font-inconsolata">
							£{price.toFixed(2)}
						</span>{" "}
						<p className="text-[12px] leading-[13px] font-bold font-inconsolata text-grey1">
							(£{capsulePrice} / capsule)
						</p>
					</div>
				</div>
				<div className="flex justify-between">
					<div className="flex gap-[5px] items-center text-[14px] leading-[14px] font-inconsolata text-grey4">
						{discountTitle}
						{forever && (
							<span
								className={`uppercase text-[14px] leading-[14px] font-inconsolata ${!isActive ? "text-blue font-[800]" : "text-grey6"}`}
							>
								Forever
							</span>
						)}
					</div>
					{spotsRemainds && (
						<p className="text-[14px] leading-[14px] font-inconsolata text-blue">
							<span className="text-[14px] leading-[14px] font-inconsolata font-bold">
								{spotsRemainds}{" "}
							</span>
							Founder Spots Remaining!
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
