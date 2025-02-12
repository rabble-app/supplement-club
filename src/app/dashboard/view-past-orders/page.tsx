"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { Separator } from "@radix-ui/react-separator";

import { useUser } from "@/contexts/UserContext";
import { usersService } from "@/services/usersService";
import type IUserPastOrderReponse from "@/utils/models/api/response/IUserPastOrderReponse";
import { useEffect, useState } from "react";

export default function Orders() {
	const [orders, setOrders] = useState<IUserPastOrderReponse[]>([]);
	const context = useUser();

	useEffect(() => {
		const fetchUserPastOrders = async () => {
			const model = await usersService.getPastOrders(context?.user?.id ?? "");
			setOrders(model);
		};
		fetchUserPastOrders();
	}, [context?.user?.id]);

	return (
		<div className="grid gap-[16px] max-w-[600px] mx-auto py-[10px] md:py-[30px]">
			{orders.map((item) => (
				<Collapsible
					key={item.id}
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
									src={item.order?.basket[0]?.product.imageUrl}
									alt="supplement icon"
									width={61}
									height={61}
								/>
							</div>
							<div className="flex flex-col gap-[6px]">
								<div className="flex items-center gap-[2px]">
									<span className="text-[12px] leading-[13px] font-hagerman text-grey4">
										{item.order?.team?.producer?.businessName}
										{" -"}
									</span>
									<span className="text-[12px] leading-[13px] font-inconsolata text-grey4">
										{Number(item.order?.basket[0]?.capsulePerDay) * 90} Capsules
									</span>
								</div>

								<div className="flex text-[12px] leading-[13px] text-grey4 font-helvetica">
									Order Number: {item.order?.accumulatedAmount}
								</div>

								<div className="text-[16px] leading-[16px] font-[800] text-black flex items-center gap-[5px] font-inconsolata">
									£{item.order?.basket[0]?.price}{" "}
									<span className="text-[10px] leading-[11px] text-grey1 font-[800] font-inconsolata">
										(£{item.order?.basket[0]?.price} / capsule)
									</span>
								</div>

								<div className="text-[12px] leading-[13px] text-grey4 font-helvetica text-left">
									{new Intl.DateTimeFormat("en-GB", {
										day: "numeric",
										month: "long",
										year: "numeric",
									}).format(new Date(item?.order?.deadline ?? new Date()))}
								</div>
							</div>
						</div>

						<ChevronDown className="h-[22px] w-[22px] shrink-0 text-muted-foreground transition-transform duration-200 text-blue" />
					</CollapsibleTrigger>
					<CollapsibleContent className="grid gap-[16px] bg-white">
						<p className="flex justify-between items-center text-[12px] leading-[13px] font-inconsolata text-grey4 pt-[16px]">
							smol plan non-bio{" "}
							<span className="text-[16px] leading-[16px] font-[800] font-inconsolata text-black">
								£0.00
							</span>
						</p>

						<Separator className="bg-grey33/[55%] h-[1px]" />

						<p className="flex justify-between items-center text-[12px] leading-[13px] font-inconsolata text-grey4">
							Subtotal{" "}
							<span className="text-[16px] leading-[16px] font-[800] font-inconsolata text-black">
								£0.00
							</span>
						</p>

						<p className="flex justify-between items-center text-[12px] leading-[13px] font-inconsolata text-grey4">
							Referral discounts{" "}
							<span className="text-[16px] leading-[16px] font-[800] font-inconsolata text-black">
								£{Number(item.discount).toFixed(2)}
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
								£{item.order?.basket[0]?.price}
							</span>
						</p>
					</CollapsibleContent>
				</Collapsible>
			))}
		</div>
	);
}
