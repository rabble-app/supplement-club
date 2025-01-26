"use client";
import PaymentCard from "@/components/PaymentCard";
import type ICardModel from "@/utils/models/ICardModel";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Separator } from "@radix-ui/react-separator";
import { useState } from "react";

const yourcards = [
	{
		display_brand: "visa",
		exp_month: 12,
		exp_year: 2025,
		last4: "4242",
		default: true,
		dateUpdated: new Date("2023-03-18"),
	},
	{
		display_brand: "mastercard",
		exp_month: 12,
		exp_year: 2025,
		last4: "8846",
	},
	{
		display_brand: "jbc",
		exp_month: 12,
		exp_year: 2025,
		last4: "8846",
	},
	{
		display_brand: "unionpay",
		exp_month: 12,
		exp_year: 2025,
		last4: "8846",
	},
	{
		display_brand: "american express",
		exp_month: 12,
		exp_year: 2025,
		last4: "8846",
	},
	{
		display_brand: "discover",
		exp_month: 12,
		exp_year: 2025,
		last4: "8846",
	},
] as ICardModel[];

export default function AccountPaymentDetails() {
	const [defaultCard, setDefaultCard] = useState(1);
	return (
		<div className="mx-auto max-w-[600px] py-[32px]">
			<div className="px-[16px] py-[32px] bg-white flex flex-col gap-[16px] justify-start">
				<div
					key={`text-ss-${defaultCard}`}
					className="border-grey37 border-[1px] rounded-[4px]"
				>
					{yourcards.map((card, idx) => (
						<>
							<RadioGroup
								key={`${card.last4} + 1`}
								value={defaultCard.toString()}
								onValueChange={(value) => setDefaultCard(Number(value))}
							>
								<PaymentCard model={card} />
							</RadioGroup>
							{idx !== yourcards.length - 1 && (
								<Separator key={card.last4} className="bg-grey37 h-[1px]" />
							)}
						</>
					))}
				</div>
			</div>
		</div>
	);
}
