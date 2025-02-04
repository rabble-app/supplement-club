"use client";
import PaymentCard from "@/components/dashboard/account/payment-details/PaymentCard";
import PaymentPage from "@/components/shared/PaymentPage";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUser } from "@/contexts/UserContext";
import { paymentService } from "@/services/paymentService";
import type { IPaymentCard } from "@/utils/models/api/IPaymentCard";
import type IUserPaymentOptionModel from "@/utils/models/api/IUserPaymentOptionModel";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AccountPaymentDetails() {
	const [defaultCard, setDefaultCard] = useState(1);
	const context = useUser();
	const [userCards, setUserCards] = useState<IUserPaymentOptionModel[]>([]);

	useEffect(() => {
		const fetchUserPaymentOptions = async () => {
			const model =
				await paymentService.getUserPaymentOptions("cus_O0RS64AsJf0wPO");
			setUserCards(model);

			console.log(context?.user?.stripeCustomerId);
		};
		fetchUserPaymentOptions();
	}, [context?.user?.stripeCustomerId]);

	async function setDefault(card: IPaymentCard, paymentId: string) {
		await paymentService.makeCardDefault(
			card.last4,
			paymentId,
			context?.user?.stripeCustomerId || "",
		);
	}

	async function payment() {}

	return (
		<>
			{userCards.length > 0 && (
				<div className="mx-auto max-w-[600px] py-[32px]">
					<div className="px-[16px] py-[32px] bg-white flex flex-col gap-[16px] justify-start">
						<div className="border-grey37 border-[1px] rounded-[4px]">
							{userCards?.map((item, idx) => (
								<>
									<RadioGroup
										key={`${item.card.last4} + 1`}
										value={defaultCard.toString()}
										onValueChange={(value) => setDefaultCard(Number(value))}
									>
										<PaymentCard
											model={item.card}
											topContent={
												<RadioGroupItem
													value={item.card.last4.toString()}
													className="mx-auto"
												/>
											}
										>
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
													onClick={() => setDefault(item.card, item.id)}
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
									{idx !== userCards.length - 1 && (
										<Separator
											key={`${item.card.last4}-separator `}
											className="bg-grey37 h-[1px]"
										/>
									)}
								</>
							))}
						</div>
					</div>
				</div>
			)}
			<PaymentPage />
		</>
	);
}
