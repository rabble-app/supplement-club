"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { useForm } from "react-hook-form";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { paymentCardSchema } from "@/validations/schemas/payment";
import PaymentPage from "./shared/PaymentPage";
import { PaymentIntent } from "@stripe/stripe-js";

export default function PaymentDetails({
	step,
	updateStepAction,
	children,
	isComming,
}: Readonly<{
	step: number;
	updateStepAction: (newValue: number) => void;
	isComming?: boolean;
	children?: React.ReactNode;
}>) {
	const currentForm = useForm<z.infer<typeof paymentCardSchema>>({
		resolver: zodResolver(paymentCardSchema),
		mode: "onChange",
	});

	function onSubmit(val: PaymentIntent) {
		// call api
		console.log(data);
		updateStepAction(step + 1);
	}
	return (
		<div className="flex flex-col gap-[24px] md:p-[32px] md:border-grey12 md:border-[1px] md:border-solid">
			<div className="grid gap-[24px]">
				{children}

				<Separator className="bg-grey13 h-[1px]" />
			</div>
			<PaymentPage paymentIntentAction={onSubmit}>
				<Separator className="bg-grey13" />

				<FormField
					control={currentForm.control}
					name="terms"
					render={({ field }) => (
						<FormItem className="grid grid-cols-[20px_1fr] gap-[8px] items-center">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>

							<FormLabel className="p-[0] mt-[0]">
								<div className="text-[16px] leading-[19px] text-black5 cursor-pointer mt-[-8px]">
									I accept the Terms of Service and Privacy Policy
								</div>
							</FormLabel>
						</FormItem>
					)}
				/>

				<p className="text-[14px] leading-[16px]">
					By making this purchase your supplement club will automatically renew
					and your card will be charged the supplement plan price. You can
					cancel or modify at any time using your customer login.
				</p>

				<Button type="submit" className="bg-blue text-white w-full font-bold">
					{isComming ? "Register" : "Place Order - £68.20"}{" "}
					{/* Use a regular string */}
				</Button>
			</PaymentPage>

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
		</div>
	);
}
