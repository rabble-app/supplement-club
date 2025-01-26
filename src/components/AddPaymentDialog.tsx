"use client";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import NewPayment from "./NewPayment";

export default function AddPaymentDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="flex justify-center items-center gap-[12px] h-[51px] cursor-pointer">
					<Image
						src="/images/icons/plus-icon.svg"
						alt="Plus icon"
						width={24}
						height={24}
					/>
					<p className="text-[18px] leading-[27px] font-bold font-inconsolata">
						Add a New Payment Method
					</p>
				</div>
			</DialogTrigger>
			<DialogContent border={"rounded"} className="sm:max-w-[600px] gap-[16px]">
				<DialogHeader className="flex flex-row justify-between items-center">
					<DialogTitle className="text-[18px] leading-[28px] font-inconsolata font-bold text-black5">
						Add A New Payment Method
					</DialogTitle>

					<DialogClose>
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

				<Separator className=" h-[1px] bg-grey32 mx-[-16px]" />
				<NewPayment />
			</DialogContent>
		</Dialog>
	);
}
