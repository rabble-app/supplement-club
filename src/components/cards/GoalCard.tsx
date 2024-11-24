import type { IGoalCardModel } from "@/utils/models/IGoalCardModel";
import Image from "next/image";
import Link from "next/link";

export default function GoalCard(card: Readonly<IGoalCardModel>) {
	return (
		<div className="grid gap-[10px]">
			<div className="grid gap-[16px]">
				<div className="flex items-center gap-[8px] text-[24px] leading-[27px]">
					<Image src={card.icon} alt={card.altIcon} width={28} height={28} />
					{card.title}
				</div>
				<Image src={card.image} alt={card.altImage} width={450} height={178} />
			</div>
			<p className="text-grey6">{card.description}</p>
			<Link
				className="text-[18px] leading-[27px] font-bold text-blue"
				href="/show-now"
			>
				Shop Now
			</Link>
		</div>
	);
}