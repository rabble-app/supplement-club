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
}: Readonly<{ step: number; updateStepAction: (newValue: number) => void }>) {
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
				className="flex flex-col gap-[24px] px-[16px] pt-[32px] md:p-[32px] md:border-grey12 md:border-[1px] md:border-solid"
			>
				<div className="grid gap-[16px]">
					<p className="text-[20px] leading-[24px] font-bold font-inconsolata">
						PRE-ORDER Now to Become a Founding Member
					</p>
					<div className="grid gap-[8px]">
						<p className="text-[14px] leading-[16px] font-helvetica text-grey6">
							Only get charged when we hit 50 pre-orders.
						</p>
						<p className="text-[14px] leading-[16px] font-helvetica text-grey6">
							By becoming a founding member you get an extra 10% off the team
							price forever{" "}
						</p>
						<p className="text-[14px] leading-[16px] font-helvetica text-grey6">
							Lead time is 6 weeks from when we charge you - but you get 10% off
							your subscription forever
						</p>
					</div>
				</div>

				<div className="grid gap-[24px]">
					<p className="text-[24px] leading-[27px] font-bold uppercase font-hagerman">
						Billing Address
					</p>

					<div className="flex items-center gap-[8px]">
						<Checkbox id="delivery" />
						<label
							htmlFor="delivery"
							className="text-[16px] leading-[19px] text-black5 cursor-pointer font-helvetica"
						>
							Same as delivery address
						</label>
					</div>

					<div className="text-blue text-[16px] leading-[19px] font-helvetica flex justify-center text-center bg-blue10 rounded-[100px] py-[4px] px-[10px] w-full">
						Register now. Only be charged when we reach 50 pre-orders.{" "}
					</div>

					<Separator className="bg-grey13" />

					<div className="w-full">
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
												className="h-[24px] outline-none font-roboto text-grey16 w-full"
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
							className="text-[16px] leading-[19px] text-black5 cursor-pointer font-helvetica"
						>
							I accept the Terms of Service and Privacy Policy
						</label>
					</div>

					<p className="text-[14px] leading-[16px] flex flex-wrap">
						By making this purchase your supplement club will automatically
						renew and your card will be charged the supplement plan price. You
						can cancel or modify at any time using your customer login.
					</p>
				</div>

				<Button
					type="submit"
					className="bg-blue text-white w-full font-bold font-inconsolata"
				>
					Register
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
