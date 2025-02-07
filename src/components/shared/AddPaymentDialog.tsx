import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import PaymentPage from "./PaymentPage";

export default function AddPaymentDialog({
	successAction,
}: Readonly<{
	successAction: () => void;
}>) {
	const [isOpen, setIsOpen] = useState(false);
	const [futurePurchase, setFuturePurchase] = useState(true);
	const [defaultCard, setDefaultCard] = useState(true);

	async function onSave() {
		setIsOpen(false);
		successAction();
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
					<div className="w-[38px] h-[38px] flex justify-center">
						<Image
							src="/images/icons/close-black-icon.svg"
							alt="Close icon"
							width={16}
							height={16}
						/>
					</div>
				</DialogClose>

				<div className="h-[1px] bg-grey w-full" />
				<PaymentPage totalPrice={0}>
					<div className="flex items-center gap-[8px] mx-auto">
						<Checkbox
							id="futurePurchase"
							checked={futurePurchase}
							onCheckedChange={(checked) => setFuturePurchase(checked)}
						/>
						<label
							htmlFor="futurePurchase"
							className="text-[16px] leading-[19px] text-black5 cursor-pointer"
						>
							Save card for future purchase
						</label>
					</div>

					<div className="flex items-center gap-[8px] mx-auto">
						<Checkbox
							id="defaultCard"
							checked={defaultCard}
							onCheckedChange={(checked) => setDefaultCard(checked)}
						/>
						<label
							htmlFor="defaultCard"
							className="text-[16px] leading-[19px] text-black5 cursor-pointer"
						>
							Use this card as default payment method
						</label>
					</div>

					<div className="h-[1px] bg-grey w-full" />
					<Button
						onClick={onSave}
						className="bg-blue text-[16px] flex ml-auto text-white font-bold font-inconsolata h-[48px] w-[179px]"
					>
						Add Card Details
					</Button>
				</PaymentPage>
			</DialogContent>
		</Dialog>
	);
}
