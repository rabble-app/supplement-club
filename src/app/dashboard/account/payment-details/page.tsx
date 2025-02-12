"use client";
import DeleteCardDialog from "@/components/dashboard/account/payment-details/DeleteCardDialog";
import PaymentCard from "@/components/dashboard/account/payment-details/PaymentCard";
import AddPaymentDialog from "@/components/shared/AddPaymentDialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUser } from "@/contexts/UserContext";
import { paymentService } from "@/services/paymentService";
import { useUserStore } from "@/stores/userStore";
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

export default function AccountPaymentDetails() {
	const context = useUser();
	const { setUser } = useUserStore((state) => state);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [defaultCard, setDefaultCard] = useState(
		context?.user?.stripeDefaultPaymentMethodId ?? "",
	);
	const [userCards, setUserCards] = useState<IUserPaymentOptionModel[]>([]);

	useEffect(() => {
		const fetchUserPaymentOptions = async () => {
			await retrivePaymentOptions(context?.user?.stripeCustomerId ?? "");
		};
		fetchUserPaymentOptions();
	}, [context?.user?.stripeCustomerId]);

	async function retrivePaymentOptions(stripeCustomerId?: string) {
		const model = await paymentService.getUserPaymentOptions(
			stripeCustomerId ?? "",
		);
		setUserCards(model);
	}

	async function setDefault(card: IPaymentCard, paymentId: string) {
		await paymentService.makeCardDefault(
			card.last4,
			paymentId,
			context?.user?.stripeCustomerId ?? "",
		);
		setDefaultCard(paymentId);

		if (context?.user) {
			context.user.stripeDefaultPaymentMethodId = paymentId;
			setUser(context.user);
		}
	}

	async function confirmDeleteAction(paymentId: string) {
		await paymentService.deleteCard(paymentId);
		setUserCards(userCards.filter((c) => c.id !== paymentId));
	}
	return (
		<div className="mx-auto max-w-[600px]">
			{userCards && userCards?.length > 0 && (
				<div className="grid gap-[16px] w-full px-[16px] py-[32px] rounded-[12px]">
					<div className=" bg-white flex flex-col gap-[16px] justify-start w-full">
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
											isDefault={defaultCard === item.id}
											topContent={
												<RadioGroupItem
													value={item.id.toString()}
													className="mx-auto"
												/>
											}
										>
											{defaultCard !== item.id && (
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
														hideWhenDetached
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
															onClick={() => setOpenDeleteDialog(true)}
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
													</DropdownMenuContent>
												</DropdownMenu>
											)}
										</PaymentCard>
									</RadioGroup>
									{idx !== userCards?.length - 1 && (
										<Separator
											key={`${item.card.last4}-separator `}
											className="bg-grey37 h-[1px]"
										/>
									)}

									<DeleteCardDialog
										setIsOpen={setOpenDeleteDialog}
										open={openDeleteDialog}
										paymentMethodId={item.id}
										confirmDeleteAction={confirmDeleteAction}
										last4={item.card.last4}
									/>
								</div>
							))}
						</div>
					</div>

					<AddPaymentDialog
						successAction={() =>
							retrivePaymentOptions(context?.user?.stripeCustomerId ?? "")
						}
					/>
				</div>
			)}
		</div>
	);
}
