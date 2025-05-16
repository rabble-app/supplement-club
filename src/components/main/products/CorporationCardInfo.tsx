import Image from "next/image";
import { useState } from "react";

export default function CorporationCardInfo({
	name,
	businessName,
	unitsOfMeasurePerSubUnit,
	quantityOfSubUnitPerOrder,
}: Readonly<{
	name?: string;
	businessName?: string;
	unitsOfMeasurePerSubUnit?: string;
	quantityOfSubUnitPerOrder?: string;
}>) {
	const [firstWord, ...rest] = (name ?? "").split(" ");
	const [units] = useState(
		unitsOfMeasurePerSubUnit === "grams" ? "g" : " Capsules",
	);
	return (
		<div className="grid gap-[8px]">
			<p className="text-[20px] leading-[24px] tracking-[-0.43px] md:font-[500] font-inconsolata md:text-grey4">
				{businessName}
			</p>
			<div className="text-[24px] md:text-[32px] leading-[28px] md:leading-[150%] font-hagerman flex items-start gap-[5px]">
				{firstWord}
				<Image
					src="/images/TM-black.svg"
					alt="TM corporation"
					className="pt-[5px]"
					width={18}
					height={18}
				/>
				{rest?.join(" ")}
			</div>
			<div className="flex items-center gap-[8px]">
				<Image
					src={`${unitsOfMeasurePerSubUnit !== "grams" ? "/images/icons/link-icon.svg" : "/images/icons/gram-link-icon.svg"}`}
					alt="security-card-icon"
					width={24}
					height={24}
				/>
				<p className="text-[14px] leading-[16px] text-grey6">{`${quantityOfSubUnitPerOrder}${units}`}</p>
			</div>
		</div>
	);
}
