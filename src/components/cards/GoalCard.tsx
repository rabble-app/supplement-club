import Link from 'next/link';
import Image from "next/image";
import { IGoalCardModel } from "@/utils/models/IGoalCardModel";

export default function GoalCard(card: Readonly<IGoalCardModel>) {
    return (
        <div className="grid gap-[10px]">
            <div className="grid gap-[16px]">
                <div className="flex items-center gap-[8px] text-[24px] leading-[27px]">
                    <Image
                        className='h-[28px]'
                        src={card.icon}
                        alt={card.altIcon}
                        width={28}
                        height={28}
                    />
                    {card.title}
                </div>
                <Image
                    className='h-[178px]'
                    src={card.image}
                    alt={card.altImage}
                    width={450}
                    height={178}
                />
                <p className="text-grey6">{card.description}</p>
            </div>
            <Link className="text-[18px] leading-[27px] font-[700] text-blue" href="/show-now">Shop Now</Link>
        </div>
    )
}
