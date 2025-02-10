"use client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { paymentService } from "@/services/paymentService";
import { Elements } from "@stripe/react-stripe-js";
import { type PaymentMethod, loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import PaymentSetupForm from "./PaymentSetupForm";
const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,
);

export default function AddPaymentDialog({
	successAction,
}: Readonly<{
	successAction: (val: string | PaymentMethod | null) => void;
}>) {
	const [isOpen, setIsOpen] = useState(false);

	const [clientSecret, setClientSecret] = useState("");

	useEffect(() => {
		const fetchSetupIntent = async () => {
			const model = await paymentService.setupIntent();
			setClientSecret(model.clientSecret);
		};

		fetchSetupIntent();
	}, []);

	function addNewCard(val: string | PaymentMethod | null) {
		setIsOpen(false);
		successAction(val);
	}

	return (
		<Dialog open={isOpen}>
			<DialogTrigger asChild onClick={() => setIsOpen(true)}>
				<Button className="text-black text-[18px] font-inconsolata font-bold w-max overflow-hidden flex mx-auto gap-[12px]">
					<Image
						src="/images/icons/plus-icon.svg"
						alt="Plus icon"
						width={24}
						height={24}
					/>{" "}
					Add a New Payment Method
				</Button>
			</DialogTrigger>
			<DialogContent
				border={"rounded"}
				className="sm:max-w-[600px] gap-[16px] px-[11px]"
			>
				<DialogTitle className="text-left text-[18px] leading-[28px] font-inconsolata font-bold space-y-4">
					Add A New Payment Method
				</DialogTitle>
				<DialogClose
					onClick={() => setIsOpen(false)}
					className="absolute right-[7px] top-[9px]"
				>
					<div className="border border-grey32 w-10 h-10 rounded-full flex justify-center items-center">
						<Image
							src="/images/icons/close-black-icon.svg"
							alt="Close icon"
							width={16}
							height={16}
						/>
					</div>
				</DialogClose>

				<div className="h-[1px] bg-grey w-full" />

				<div className="mx-auto w-full">
					<Elements options={{ clientSecret }} stripe={stripePromise}>
						<PaymentSetupForm
							cardAction={addNewCard}
							clientSecret={clientSecret}
						/>
					</Elements>
				</div>
			</DialogContent>
		</Dialog>
	);
}
