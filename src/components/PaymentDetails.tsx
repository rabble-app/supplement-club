"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PaymentPage from "./shared/PaymentPage";

export default function PaymentDetails({
	successAction,
	children,
	totalPrice,
}: Readonly<{
	successAction: () => void;
	children?: React.ReactNode;
	totalPrice: number;
}>) {
	return (
		<div className="flex flex-col gap-[24px] md:p-[32px] md:border-grey12 md:border-[1px] md:border-solid">
			<div className="grid gap-[24px]">
				{children}

				<Separator className="bg-grey13 h-[1px]" />
			</div>
			<PaymentPage paymentIntentAction={successAction} totalPrice={totalPrice}>
				<Separator className="bg-grey13" />

				<p className="text-[14px] leading-[16px]">
					By making this purchase your supplement club will automatically renew
					and your card will be charged the supplement plan price. You can
					cancel or modify at any time using your customer login.
				</p>

				<Button type="submit" className="bg-blue text-white w-full font-bold">
					{`Place Order - £${totalPrice}`} {/* Use a regular string */}
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
