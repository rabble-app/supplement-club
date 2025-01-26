import type ICardModel from "@/utils/models/ICardModel";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import AddNewPaymentDialog from "./AddPaymentDialog";

import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Separator } from "@radix-ui/react-separator";
import { useState } from "react";

export default function YourCards({
	cards,
}: Readonly<{ cards: ICardModel[] }>) {
	const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

	const [defaultCard, setDefaultCard] = useState(1);
	return (
		<div className="px-[16px] py-[32px] bg-white flex flex-col gap-[16px] shadow-3 justify-start">
			<p className="text-[40px] leading-[48px] font-hagerman">Your cards</p>

			<div className="border-grey37 border-[1px] rounded-[4px]">
				{cards.map((card, idx) => (
					<>
						<div
							className="flex justify-between items-center py-[8px] px-[16px]"
							key={`${card.last4}-${idx}`}
						>
							<div className="flex itemx-center gap-[8px]">
								<RadioGroup
									value={defaultCard.toString()}
									onValueChange={(value) => setDefaultCard(Number(value))}
								>
									<RadioGroupItem value={idx.toString()} className="mx-auto" />
								</RadioGroup>
								<div className="grid gap-[4px]">
									<div className="flex gap-[4px]">
										<span className="text-[14px] font-hagerman">
											Ending in:
										</span>
										<span className="font-[600] font-inconsolata">
											...{card.last4}
										</span>
									</div>
									<div className="flex gap-[4px]">
										<span className="text-[14px] font-helvetica">
											Last time used:
										</span>
										<span className="font-[700] font-helvetica">
											Thu, Mar 18, 2023
										</span>
									</div>
								</div>
							</div>

							<div className="flex justify-center items-center gap-[14px]">
								<span className="rounded-[28px] bg-blue text-white px-[10px] text-[10px] leading-[10px] font-[600] font-inconsolata h-[20px] flex items-center">
									Default
								</span>
								<Image
									src="/images/visa-card.svg"
									alt="visa-card"
									width={60}
									height={32}
								/>
							</div>
						</div>
						{idx !== cards.length - 1 && (
							<Separator key={card.last4} className="bg-grey37 h-[1px]" />
						)}
					</>
				))}
			</div>

			<Elements stripe={stripePromise}>
				<AddNewPaymentDialog />
			</Elements>
		</div>
	);
}
