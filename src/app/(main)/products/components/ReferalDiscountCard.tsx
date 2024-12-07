import Image from "next/image";

export default function ReferalDiscountCard({
	name,
	steps,
	price,
	priceOff,
	isActive,
}: {
	name: string;
	steps: number;
	price: number;
	priceOff: number;
	isActive?: boolean;
}) {
	return (
		<div
			className={`grid grid-cols-[63px_1fr_auto] gap-[16px] p-[16px] md:px-[32px] items-center rounded-[8px] ${isActive ? "bg-white mx-[-16px] md:mx-[-18px] shadow-3 h-[127px]" : "bg-grey21 h-[95px]"}`}
		>
			<div
				className={`rounded-[50%] flex justify-center items-center w-[63px] h-[63px] ${isActive ? "bg-blue8" : " bg-grey20"}`}
			>
				<Image
					src={`${isActive ? "/images/icons/add-user-icon.svg" : "/images/icons/lock-icon.svg"}`}
					alt="User profile group icon"
					className="my-auto"
					width={23}
					height={23}
				/>
			</div>
			<div className="text-[14px] leading-[16px] font-helvetica flex flex-col justify-center gap-[8px]">
				<p
					className={`text-[20px] leading-[23px] uppercase font-hagerman ${isActive ? "text-black" : "text-grey6"}`}
				>
					{name}{" "}
					<span
						className={`text-[20px] leading-[23px] uppercase font-hagerman ${isActive ? "text-black" : "text-grey6"}`}
					>
						(1/{steps})
					</span>
				</p>
				<p
					className={`text-[20px] leading-[21px] font-inconsolata ${isActive ? "text-black font-[600]" : " text-grey15"}`}
				>
					£{priceOff} off Team Price
				</p>
			</div>
			<div
				className={`font-inconsolata font-[800] flex items-center  ${isActive ? "text-blue text-[32px] leading-[33px]" : "text-grey15 text-[24px] leading-[25px]"}`}
			>
				£{price.toFixed(2)}
			</div>
		</div>
	);
}
