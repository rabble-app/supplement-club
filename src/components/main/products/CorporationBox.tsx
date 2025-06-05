import CorporationCardInfo from "@/components/main/products/CorporationCardInfo";
import ImageBox from "@/components/main/products/ImageBox";

export default function CorporationBox({
	tags,
	businessName,
	name,
	description,
	unitsOfMeasurePerSubUnit,
	quantityOfSubUnitPerOrder,
}: Readonly<{
	tags?: string[];
	name?: string;
	businessName?: string;
	description?: string;
	unitsOfMeasurePerSubUnit?: string;
	quantityOfSubUnitPerOrder?: string;
}>) {
	return (
		<div className="flex flex-col gap-[16px] md:gap-[24px] w-full">
			<CorporationCardInfo
				unitsOfMeasurePerSubUnit={unitsOfMeasurePerSubUnit}
				quantityOfSubUnitPerOrder={quantityOfSubUnitPerOrder}
				businessName={businessName}
				name={name}
			/>

			<div className="flex flex-col gap-[16px] font-helvetica">
				<p className="text-[16px] font-helvetica">{description}</p>
				<ImageBox tags={tags} />
			</div>
		</div>
	);
}
