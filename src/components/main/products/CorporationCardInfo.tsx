import Image from "next/image";

export default function CorporationCardInfo({
	name,
	businessName,
	quantityOfSubUnitPerOrder,
	unitsOfMeasurePerSubUnit,
}: Readonly<{
	name?: string;
	businessName?: string;
	quantityOfSubUnitPerOrder?: string;
	unitsOfMeasurePerSubUnit?: string;
}>) {
	return (
		<div className="grid gap-[8px]">
			<p className="text-[20px] leading-[24px] tracking-[-0.43px] md:font-[500] font-inconsolata md:text-grey4">
				{businessName}
			</p>
			<div className="text-[24px] md:text-[32px] leading-[28px] md:leading-[150%] font-hagerman flex items-center gap-[5px]">
				{name}
				<Image
					src="/images/TM-black.svg"
					alt="TM corporation"
					width={24}
					height={24}
				/>
			</div>
			<div className="flex items-center gap-[8px]">
				<Image
					src="/images/icons/link-icon.svg"
					alt="security-card-icon"
					width={24}
					height={24}
				/>
				<p className="text-[14px] leading-[16px] text-grey6">{`${quantityOfSubUnitPerOrder} ${unitsOfMeasurePerSubUnit}`}</p>
			</div>
		</div>
	);
}
