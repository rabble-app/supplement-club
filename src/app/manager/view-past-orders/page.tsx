"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { Separator } from "@radix-ui/react-separator";

import type { IPastOrderModel } from "@/utils/models/IPastOrderModel";

const orders = [
	{
		id: 1,
		name: "CoQ10",
		capsules: 180,
		number: 23355239,
		price: 5.8,
		pricePerCapsule: 0.25,
		date: "20 June 2024",
		imageSrc: "",
		imageAlt: "",
	},
	{
		id: 2,
		name: "CoQ10",
		capsules: 180,
		number: 23355239,
		price: 5.8,
		pricePerCapsule: 0.25,
		date: "20 June 2024",
		imageSrc: "",
		imageAlt: "",
	},
	{
		id: 3,
		name: "CoQ10",
		capsules: 180,
		number: 23355239,
		price: 5.8,
		pricePerCapsule: 0.25,
		date: "20 June 2024",
		imageSrc: "",
		imageAlt: "",
	},
	{
		id: 4,
		name: "CoQ10",
		capsules: 180,
		number: 23355239,
		price: 5.8,
		pricePerCapsule: 0.25,
		date: "20 June 2024",
		imageSrc: "",
		imageAlt: "",
	},
] as IPastOrderModel[];

export default function Orders() {
	return (
		<div className="grid gap-[16px] max-w-[600px] mx-auto py-[10px] md:py-[30px]">
			{orders.map((order) => (
				<Collapsible
					key={order.id}
					className="bg-white rounded-[12px] shadow-card py-[16px] px-[12px] "
				>
					{" "}
					<CollapsibleTrigger
						className="text-[16px] leading-[18px] font-[700] font-helvetica gap-x-[16px]
					gap-[10px] flex justify-between items-center w-full [&[data-state=open]>svg]:rotate-180"
					>
						<div className="grid grid-cols-[69px_1fr] gap-[8px]">
							<div className="rounded-[8px] border-[1px] border-grey28 w-[69px] p-[4px]">
								<Image
									src="/images/supplement-mockup.svg"
									alt="supplement icon"
									width={61}
									height={61}
								/>
							</div>
							<div className="flex flex-col gap-[6px]">
								<div className="flex items-center gap-[2px]">
									<span className="text-[12px] leading-[13px] font-hagerman text-grey4">
										{order.name}
										{"-"}
									</span>
									<span className="text-[12px] leading-[13px] font-inconsolata text-grey4">
										{order.capsules} Capsules
									</span>
								</div>

								<div className="text-[12px] leading-[13px] text-grey4 font-helvetica">
									Order Number: {order.number}
								</div>

								<div className="text-[16px] leading-[16px] font-[800] text-black flex items-center gap-[5px] font-inconsolata">
									£{order.price?.toFixed(2)}{" "}
									<span className="text-[10px] leading-[11px] text-grey1 font-[800] font-inconsolata">
										(£{order.pricePerCapsule} / capsule)
									</span>
								</div>

								<div className="text-[12px] leading-[13px] text-grey4 font-helvetica text-left">
									{order.date}
								</div>
							</div>
						</div>

						<ChevronDown className="h-[22px] w-[22px] shrink-0 text-muted-foreground transition-transform duration-200 text-blue" />
					</CollapsibleTrigger>
					<CollapsibleContent className="grid gap-[16px] bg-white">
						<p className="flex justify-between items-center text-[12px] leading-[13px] font-inconsolata text-grey4 pt-[16px]">
							smol plan non-bio{" "}
							<span className="text-[16px] leading-[16px] font-[800] font-inconsolata text-black">
								£5.80
							</span>
						</p>

						<Separator className="bg-grey33/[55%] h-[1px]" />

						<p className="flex justify-between items-center text-[12px] leading-[13px] font-inconsolata text-grey4">
							Subtotal{" "}
							<span className="text-[16px] leading-[16px] font-[800] font-inconsolata text-black">
								£5.80
							</span>
						</p>

						<p className="flex justify-between items-center text-[12px] leading-[13px] font-inconsolata text-grey4">
							Referral discounts{" "}
							<span className="text-[16px] leading-[16px] font-[800] font-inconsolata text-black">
								£0.00
							</span>
						</p>

						<p className="flex justify-between items-center text-[12px] leading-[13px] font-inconsolata text-grey4">
							Free delivery{" "}
							<span className="text-[16px] leading-[16px] font-[800] font-inconsolata text-black">
								£0.00
							</span>
						</p>

						<p className="flex justify-between items-center text-[12px] leading-[13px] font-inconsolata text-grey4">
							Total{" "}
							<span className="text-[16px] leading-[16px] font-[800] font-inconsolata text-black">
								£5.80
							</span>
						</p>
					</CollapsibleContent>
				</Collapsible>
			))}
		</div>
	);
}
