"use client";
import DeleteCardDialog from "@/components/dashboard/account/payment-details/DeleteCardDialog";
import PaymentCard from "@/components/dashboard/account/payment-details/PaymentCard";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUser } from "@/contexts/UserContext";
import { paymentService } from "@/services/paymentService";
import type { IPaymentCard } from "@/utils/models/api/IPaymentCard";
import type IUserPaymentOptionModel from "@/utils/models/api/IUserPaymentOptionModel";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PaymentCards({
	editable,
}: Readonly<{ editable?: boolean }>) {
	const [defaultCard, setDefaultCard] = useState("");
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const context = useUser();
	const [userCards, setUserCards] = useState<IUserPaymentOptionModel[]>([]);

	useEffect(() => {
		const fetchUserPaymentOptions = async () => {
			const model = await paymentService.getUserPaymentOptions(
				context?.user?.stripeCustomerId || "",
			);
			setUserCards(model);
		};
		fetchUserPaymentOptions();
	}, [context?.user?.stripeCustomerId]);

	async function setDefault(card: IPaymentCard, paymentId: string) {
		await paymentService.makeCardDefault(
			card.last4,
			paymentId,
			context?.user?.stripeCustomerId || "",
		);
		setUserCards(userCards.filter((c) => c.id !== paymentId));
	}

	function confirmDeleteAction(id: string) {
		setUserCards(userCards.filter((c) => c.id !== id));
	}

	return (
		<>
			{userCards && userCards?.length > 0 && (
				<div className="px-[16px] py-[32px] bg-white flex flex-col gap-[16px] justify-start">
					<div className="border-grey37 border-[1px] rounded-[4px]">
						{userCards?.map((item, idx) => (
							<div key={item.id}>
								<RadioGroup
									key={item.id}
									value={defaultCard.toString()}
									onValueChange={(value) => setDefaultCard(value)}
								>
									<PaymentCard
										model={item.card}
										topContent={
											<RadioGroupItem
												value={item.id.toString()}
												className="mx-auto"
											/>
										}
									>
										{editable && (
											<DropdownMenu>
												<DropdownMenuTrigger>
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
													<DropdownMenuItem
														onClick={() => setDefault(item.card, item.id)}
														className="py-[12px] flex items-center gap-[10px] cursor-pointer outline-none"
													>
														<Image
															src="/images/icons/favorite-black-icon.svg"
															alt="Trash icon"
															width={24}
															height={24}
														/>
														<div className=" text-[18px] leading-[27px] font-bold font-inconsolata">
															Use as Default
														</div>
													</DropdownMenuItem>

													<DropdownMenuSeparator className="h-[1px] bg-grey18" />

													<DropdownMenuItem
														onClick={() => setShowDeleteDialog(true)}
														className="py-[12px] flex items-center gap-[10px] cursor-pointer outline-none"
													>
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
													<DeleteCardDialog
														open={showDeleteDialog}
														confirmDeleteAction={() =>
															confirmDeleteAction(item.id)
														}
														last4={item.card.last4}
														paymentMethodId={item.id}
													/>
												</DropdownMenuContent>
											</DropdownMenu>
										)}
									</PaymentCard>
								</RadioGroup>
								{idx !== userCards.length - 1 && (
									<Separator
										key={`${item.card.last4}-separator `}
										className="bg-grey37 h-[1px]"
									/>
								)}
							</div>
						))}
					</div>
				</div>
			)}
		</>
	);
}
