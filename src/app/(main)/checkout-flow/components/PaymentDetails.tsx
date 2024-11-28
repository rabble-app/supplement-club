"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import InputMask from "@mona-health/react-input-mask";
import Image from "next/image";

import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

const step3FormSchema = z.object({
	cardNumber: z
		.string()
		.regex(/^\d{16}$/, "Card number must be exactly 16 digits"),
});

export default function PaymentDetails({
	step,
	updateStepAction,
}: { step: number; updateStepAction: (newValue: number) => void }) {
	const currentForm = useForm<z.infer<typeof step3FormSchema>>({
		resolver: zodResolver(step3FormSchema),
	});

	const autoFillCardNumber = async () => {
		const clipboardCardNumber = await navigator.clipboard.readText();
		if (clipboardCardNumber !== "" && clipboardCardNumber.length === 16) {
			currentForm.setValue("cardNumber", clipboardCardNumber);
		}
	};

	const updateCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		currentForm.setValue("cardNumber", e.target.value.replaceAll(" ", ""));
	};

	const onSubmit: SubmitHandler<z.infer<typeof step3FormSchema>> = (data) => {
		// call api
		console.log(data);
		updateStepAction(step + 1);
	};
	return (
		<Form {...currentForm}>
			<form
				onSubmit={currentForm.handleSubmit(onSubmit)}
				className="flex flex-col gap-[24px] md:p-[32px] md:border-grey12 md:border-[1px] md:border-solid"
			>
				<div className="grid gap-[24px]">
					<p className="text-[16px] leading-[19px] font-bold">
						Billing Address
					</p>
					<div className="flex items-center gap-[8px]">
						<Checkbox id="delivery" />
						<label
							htmlFor="delivery"
							className="text-[16px] leading-[19px] text-black5 cursor-pointer"
						>
							Same as delivery address
						</label>
					</div>

					<Separator className="bg-grey13" />

					<div>
						<FormField
							control={currentForm.control}
							name="cardNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Card Number</FormLabel>
									<FormControl>
										<div className="grid grid-cols-[24px_1fr_92px] items-center gap-[12px] h-[48px] border-[1px] border-black px-[12px] py-[8px]">
											<Image
												src="/images/icons/card-icon.svg"
												alt="Card icon"
												width={24}
												height={24}
											/>
											<InputMask
												{...field}
												mask="9999 9999 9999 9999"
												maskPlaceholder="0000 0000 0000 0000"
												className="h-[24px] outline-none font-roboto text-grey16"
												onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
													updateCardNumber(e)
												}
											/>
											<Button
												onClick={(e) => {
													e.preventDefault();
													autoFillCardNumber();
												}}
												className="bg-black text-white font-roboto cursor-pointer h-[32px]"
											>
												<div className="flex items-center gap-[2px]">
													Autofill <span className="text-green">link</span>
												</div>
											</Button>
										</div>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>

					<Separator className="bg-grey13" />

					<div className="flex items-center gap-[8px]">
						<Checkbox id="terms" />
						<label
							htmlFor="terms"
							className="text-[16px] leading-[19px] text-black5 cursor-pointer"
						>
							I accept the Terms of Service and Privacy Policy
						</label>
					</div>

					<p className="text-[14px] leading-[16px]">
						By making this purchase your supplement club will automatically
						renew and your card will be charged the supplement plan price. You
						can cancel or modify at any time using your customer login.
					</p>
				</div>

				<Button type="submit" className="bg-blue text-white w-full font-bold">
					Place Order - £68.20
				</Button>

				<div className="grid gap-[11px]">
					<div className="flex gap-[5px] items-center font-bold text-[16px] leading-[18px]">
						<Image
							src="/images/icons/email-icon.svg"
							alt="Email icon"
							width={24}
							height={24}
						/>{" "}
						Email Reminders
					</div>
					<p className="text-[12px] leading-[13px] text-grey4">
						We notify you with enough time to make changes before each order
					</p>
				</div>
			</form>
		</Form>
	);
}
