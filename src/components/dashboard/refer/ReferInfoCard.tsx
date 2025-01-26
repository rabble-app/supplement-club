import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

export default function ReferInfoCard() {
	const [price] = useState(48.78);

	return (
		<div className="p-[16px] grid gap-[16px] rounded-[4px] shadow-3 border-[1px] border-grey35">
			<div>
				<p className="text-[32px] leading-[36px] font-hagerman uppercase">
					Maxwell Beard
				</p>
				<Link
					className="text-[14px] underline font-[600] font-inconsolata text-blue"
					href="#"
				>
					8 Referrals
				</Link>
				<p className="text-[14px] font-[600] font-inconsolata text-grey15">
					Member of 4 teams
				</p>
			</div>
			<div className="grid gap-[10px]">
				<p className="text-[16px] leading-[18px] font-hagerman uppercase">
					All Time CLub coin earned
				</p>
				<div className="flex items-center gap-[10px]">
					<Image
						src="/images/coin.svg"
						alt="Coin balance"
						width={24}
						height={24}
					/>
					<p className="text-[14px] leading-[14px] font-[600] font-inconsolata">
						100,000 CC
					</p>
				</div>
			</div>
			<div className="bg-grey36 p-[10px] rounded-[4px] flex justify-between items-center">
				<p className="text-[16px] leading-[18px] font-hagerman uppercase">
					Savings since joining
				</p>
				<p className="text-[14px] font-[900] font-inconsolata">£{price}</p>
			</div>
		</div>
	);
}
