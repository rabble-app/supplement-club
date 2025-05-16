import Image from "next/image";
import Link from "next/link";

import type ILaboratoryCardModel from "@/utils/models/ILaboratoryCardModel";

export default function LaboratoryCard(card: Readonly<ILaboratoryCardModel>) {
	return (
		<Link href={card.url} target="_black" className="grid bg-grey8">
			<Image
				className="w-full h-full object-cover md:min-h-[260px]"
				src={card.logo}
				alt={card.altLogo}
				width={390}
				height={230}
			/>
			<div className="py-[32px] px-[24px] min-h-[460px]">
				<div className=" grid gap-[8px]">
					<div className="text-[24px] leading-[27px] text-black flex justify-between font-inconsolata font-bold">
						{card.title}
						<div className="text-[17px] leading-[20px] text-blue flex items-center gap-[4px]">
							<Image
								src="/images/icons/marker-icon.svg"
								alt="marker"
								width={20}
								height={20}
							/>
							{card.country}
						</div>
					</div>
					<div className="leading-[30px] text-black whitespace-pre-line">
						{card.description}
					</div>
				</div>
			</div>
		</Link>
	);
}
