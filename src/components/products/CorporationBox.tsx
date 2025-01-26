import CorporationCardInfo from "@/components/cards/CorporationCardInfo";
import ImageBox from "@/components/products/ImageBox";

export default function CorporationBox({
	tags,
	businessName,
	name,
	description,
}: Readonly<{
	tags?: string[];
	name?: string;
	businessName?: string;
	description?: string;
}>) {
	return (
		<div className="flex flex-col gap-[16px] md:gap-[24px]">
			<CorporationCardInfo businessName={businessName} name={name} />

			<div className="flex flex-col gap-[16px] font-helvetica">
				<p>{description}</p>
				<ImageBox tags={tags} />
			</div>
		</div>
	);
}
