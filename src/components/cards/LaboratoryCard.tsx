import type ILaboratoryCardModel from "@/utils/models/ILaboratoryCardModel";
import Image from "next/image";

export default function cardCard(card: Readonly<ILaboratoryCardModel>) {
	return (
		<div className="grid bg-grey8">
			<Image src={card.logo} alt={card.altLogo} width={390} height={230} />
			<div className="py-[32px] px-[24px] min-h-[430px]">
				<div className=" grid gap-[8px]">
					<div className="text-[24px] leading-[27px] text-black flex justify-between">
						{card.title}
						<div className="text-[17px] leading-[20px] text-blue flex items-center gap-[4px]">
							<Image src="/images/icons/marker-icon.svg" alt="marker" width={20} height={20} />
							{card.country}
						</div>
					</div>
					<div className="leading-[30px] text-grey1 whitespace-pre-line">
						{card.description}
					</div>
				</div>
			</div>
		</div>
	);
}
