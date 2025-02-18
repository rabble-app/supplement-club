import Image from "next/image";
import Link from "next/link";

import type { IGoalCardModel } from "@/utils/models/IGoalCardModel";

export default function GoalCard(card: Readonly<IGoalCardModel>) {
	return (
		<div className="grid gap-[10px]">
			<div className="grid gap-[16px]">
				<div className="flex items-center gap-[8px] text-[24px] leading-[27px] font-inconsolata font-semibold">
					<Image src={card.icon} alt={card.altIcon} width={28} height={28} />
					{card.title}
				</div>
				<Image src={card.image} alt={card.altImage} width={450} height={178} />
			</div>
			<p className="text-grey6">{card.description}</p>
			<Link
				className="text-[18px] leading-[27px] font-[700] text-blue font-inconsolata"
				href={card.url}
			>
				Shop Now
			</Link>
		</div>
	);
}
