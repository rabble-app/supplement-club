import Image from "next/image";

export default function BalanceCard({
	balance,
}: Readonly<{ balance: number }>) {
	return (
		<div className="bg-blue px-[16px] py-[35px] grid gap-[4px] rounded-[4px] shadow-3 border-[1px] border-grey35">
			<div className="text-[16px] leading-[18px] font-hagerman uppercase text-white text-center">
				Current Club coin balance
			</div>
			<div className="flex justify-center items-center gap-[10px]">
				<Image
					src="/images/coin.svg"
					alt="Coin balance"
					width={40}
					height={40}
				/>
				<div className="text-[48px] leading-[50px] font-inconsolata font-[600] text-white text-center">
					{balance.toLocaleString()}
				</div>
			</div>
		</div>
	);
}
