import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function DeleteCardDialog({
	open,
	last4,
	confirmDeleteAction,
}: Readonly<{
	open: boolean;
	last4: string;
	confirmDeleteAction: () => void;
}>) {
	const [isOpen] = useState(open);

	async function confirmAction() {
		//await paymentService.deleteCard(paymentMethodId);
		confirmDeleteAction();
	}
	return (
		<Dialog open={isOpen}>
			<DialogContent
				border={"rounded"}
				className="sm:max-w-[600px] gap-[24px] p-[24px] pt-[56px]"
			>
				<DialogHeader className="flex flex-col justify-between items-center">
					<div className="grid gap-[8px] w-full">
						<DialogTitle className="text-[24px] leading-[28px] font-hagerman font-[400] mx-auto">
							Are you sure you want to delete this card?
						</DialogTitle>
					</div>

					<DialogClose className="m-[0] p-[0] absolute top-[16px] right-[16px]">
						<div className="border-[1px] border-grey32 w-[38px] h-[38px] rounded-[50%] flex justify-center">
							<Image
								src="/images/icons/close-black-icon.svg"
								alt="Close icon"
								width={16}
								height={16}
							/>
						</div>
					</DialogClose>
				</DialogHeader>

				<div className="text-grey4 text-[16px] leading-[19px] font-inconsolata flex justify-center text-center bg-white font-bold w-full">
					Deleting this card .... {last4} will some text will be here according
					to the situation.
				</div>

				<div className="grid gap-[12px]">
					<Button
						onClick={confirmAction}
						className="text-white bg-red flex justify-center items-center w-full text-[17px] leading-[22px] font-bold font-inconsolata h-[46px] cursor-pointer"
					>
						Yes Delete
					</Button>

					<DialogClose asChild>
						<Button className="text-blue bg-[#7878801F]  flex justify-center items-center  w-full text-[17px] leading-[22px] font-bold font-inconsolata h-[46px]">
							Cancel
						</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	);
}
