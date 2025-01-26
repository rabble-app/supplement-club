import { DialogClose } from "@radix-ui/react-dialog";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export default function SubscriptionCancelDialog({
	confirmAction,
}: Readonly<{
	confirmAction: () => void;
}>) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="text-red h-[40px] flex justify-center items-center mx-auto text-[17px] leading-[22px] font-bold font-inconsolata">
					Cancel Plan
				</Button>
			</DialogTrigger>
			<DialogContent border={"rounded"} className="sm:max-w-[600px] gap-[16px]">
				<DialogHeader className="flex flex-row justify-between items-center h-[38px]">
					<DialogTitle className="text-[18px] leading-[28px] font-helvetica font-[400] h-[32px]">
						Are you sure you want to cancel your subscription?
					</DialogTitle>

					<DialogClose className="m-[0] p-[0]">
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

				<Button
					onClick={confirmAction}
					className="text-white bg-red4 h-[46px] flex justify-center items-center mx-auto text-[17px] leading-[22px] font-bold font-inconsolata mb-[16px]"
					type="submit"
				>
					Yes, Cancel My Plan
				</Button>

				<div className="text-[12px] leading-[18px] font-[400] font-helvetica text-grey6 text-center max-w-[422px] mx-auto">
					If you are a founding or early member you will lose your discounted
					rate if you later rejoin.
				</div>
			</DialogContent>
		</Dialog>
	);
}
