import Image from "next/image";

export default function AvailablePayment() {
	return (
		<div className="flex flex-col gap-[8px] my-8">
			<div className="flex justify-center gap-[8px] items-center h-[32px]">
				<Image
					src="/images/icons/security-card-icon.svg"
					alt="security-card-icon"
					width={24}
					height={24}
				/>
				<p className=" text-blue">Secure Payment</p>
			</div>
			<div className="flex justify-center gap-[4px] items-center">
				<Image
					src="/images/master-card.svg"
					alt="master-card"
					width={40}
					height={28}
				/>
				<Image
					src="/images/visa-card.svg"
					alt="visa-card"
					width={40}
					height={28}
				/>
			</div>
		</div>
	);
}
