"use client";
import PaymentCard from "@/components/PaymentCard";
import type ICardModel from "@/utils/models/ICardModel";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
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
								<PaymentCard model={card}>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Image
												src="/images/icons/dots-black-icon.svg"
												alt="Trash icon"
												className="cursor-pointer"
												width={24}
												height={24}
											/>
										</DropdownMenuTrigger>
										<DropdownMenuContent
											align="end"
											className="bg-white rounded-[8px] shadow-3 px-[16px]"
										>
											<DropdownMenuLabel className="py-[12px] flex items-center gap-[10px] cursor-pointer outline-none">
												<Image
													src="/images/icons/favorite-black-icon.svg"
													alt="Trash icon"
													width={24}
													height={24}
												/>
												<div className=" text-[18px] leading-[27px] font-bold font-inconsolata">
													Use as Default
												</div>
											</DropdownMenuLabel>
											<DropdownMenuSeparator className="h-[1px] bg-grey18" />
											<DropdownMenuItem className="py-[12px] flex items-center gap-[10px] cursor-pointer outline-none">
												<Image
													src="/images/icons/trash-red-icon.svg"
													alt="Trash icon"
													width={24}
													height={24}
												/>
												<div className="text-red text-[18px] leading-[27px] font-bold font-inconsolata">
													Delete Card
												</div>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</PaymentCard>
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
