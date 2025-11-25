import Image from "next/image";
import Link from "next/link";

export default function ReferInfoCard({
	name,
	referrals,
	teams,
	price,
	totalCoint,
	type = "subscription",
	freeMonthsReceived,
}: Readonly<{
	name: string;
	referrals: number;
	teams: number;
	price: number;
	totalCoint: number;
	type?: "coin" | "subscription";
	freeMonthsReceived: number;
}>) {
	return (
		<div className="p-[16px] flex flex-col rounded-[4px] shadow-3 border-[1px] border-grey35 justify-between">
			<div>
				<p className="text-[32px] leading-[36px] font-hagerman uppercase">
					{name}
				</p>
				<Link
					className="text-[14px] underline font-[600] font-inconsolata text-blue"
					href="#"
				>
					{referrals} Referrals
				</Link>
				<p className="text-[14px] font-[600] font-inconsolata text-grey15">
					Member of {teams} teams
				</p>
			</div>
			<div className="grid gap-[10px] mt-[15px] md:mt-[-62px]">
				<p className="text-[16px] leading-[18px] font-hagerman uppercase">
					{type === "coin" ? "All Time CLub coin earned" : "Membership Months earned"}
				</p>
				<div className="flex items-center gap-[10px]">
					<Image
						src={type === "coin" ? "/images/coin.svg" : "/images/membership-card.svg"}
						alt={type === "coin" ? "Coin balance" : "Membership card"}
						width={24}
						height={24}
					/>
					<p className="text-[14px] leading-[100%] font-[600] font-inconsolata">
						{type === "coin" ? `${totalCoint} CC` : `${freeMonthsReceived} months free earned so far!`}
					</p>
				</div>
			</div>
			<div className="bg-grey36 py-[5px] px-[0] md:px-[10px] rounded-[4px] flex justify-between items-center mt-[15px] md:mt-0">
				<p className="text-[16px] leading-[18px] font-hagerman uppercase">
					Savings since joining
				</p>
				<p className="text-[14px] font-[900] font-inconsolata">£{type === "coin" ? price : freeMonthsReceived/12 * +process.env.NEXT_PUBLIC_MEMBERSHIP_AMOUNT!}</p>
			</div>
		</div>
	);
}
