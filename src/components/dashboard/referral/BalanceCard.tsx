import Image from "next/image";
import { useFirst30Days } from "@/hooks/useFirst30Days";

export default function BalanceCard({
	balance,
	type = "subscription",
}: Readonly<{ balance: number, type?: "coin" | "subscription" }>) {
	const [, daysSinceFirstPayment] = useFirst30Days();
	return (
		<div className="bg-blue p-[18px] grid gap-[4px] rounded-[4px] shadow-3 border-[1px] border-grey35">
			<div className="text-[16px] leading-[18px] font-hagerman uppercase text-white text-center font-[400]">
				{type === "coin" ? "Current Club coin balance" : "Days remaining"}
			</div>
			<div className="flex justify-center items-center gap-[10px]">
			 {type == 'coin' ? <Image
					src="/images/coin.svg"
					alt="Coin balance"
					width={40}
					height={40}
				/>:''}	
				<div className="text-[48px] leading-[100%] font-inconsolata font-[600] text-white text-center">
					{ type == 'coin' ? balance?.toLocaleString() : daysSinceFirstPayment?.toLocaleString()}
				</div>
			</div>
			{type == 'subscription' && <p className="text-[12px] leading-[100%] font-[400] font-helvetica text-[white] text-center mt-[10px]">You have 30 days from sign up to maximise your free membership months</p>}
		</div>
	);
}
