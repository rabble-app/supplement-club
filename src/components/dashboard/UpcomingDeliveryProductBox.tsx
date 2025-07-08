import Image from "next/image";

export default function UpcomingDeliveryProductBox({
	model,
}: Readonly<{
	model: {
		name: string;
		image: string;
		quantity: string;
		type: string;
	}
}>) {
	return (
		<div className="productBar flex flex-row gap-[10px] items-center w-[48%] mb-[25px]">
			<Image src="/images/supplement-new.png" alt="Delivery icon" width={35} height={40} className="ml-[10px] mr-[7px]" />
			<div className="flex flex-col">
				<div className="flex flex-row gap-[10px] font-Inconsolata items-center mb-[6px]">
					<p className="text-[#8E8E93] leading-[100%] tracking-[0] font-normal text-[12px]">{model.quantity}</p> <span className="text-[#00038F] bg-[#E5E6F4] rounded-[15px] text-[10px] py-[1px] px-[10px] font-bold">{model.type}</span>
				</div>
				<div className="leading-[120%] tracking-[0] text-[20px] font-hagerman text-[#000000]">
					{model.name}
				</div>
			</div>
		</div>
	);
}
