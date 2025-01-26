import Image from "next/image";

import {
	DialogClose,
	DialogDescription,
	DialogTitle,
} from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@reach/visually-hidden";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function ConfirmNewSubscriptionQuantityDialog({
	capsule,
	changedCapsule,
	confirmAction,
}: Readonly<{
	capsule: number;
	changedCapsule: number;
	confirmAction: (val: number) => void;
}>) {
	function openClose(e: boolean) {
		if (!e) {
			confirmAction(changedCapsule);
		}
	}
	return (
		<Dialog onOpenChange={(e) => openClose(e)}>
			<DialogTrigger asChild>
				<Button className="bg-blue w-full text[16px] md:text-[17px] md:leading-[22px] font-inconsolata font-bold text-white rounded-[2px] h-[46px]">
					Confirm New Subscription Quantity
				</Button>
			</DialogTrigger>
			<DialogContent
				border={"rounded"}
				className="sm:max-w-[600px] gap-[16px] "
			>
				<DialogClose className="absolute right-[16px] top-[16px]">
					<div className="border-[1px] border-grey32 w-[38px] h-[38px] rounded-[50%] flex justify-center">
						<Image
							src="/images/icons/close-black-icon.svg"
							alt="Close icon"
							width={16}
							height={16}
						/>
					</div>
				</DialogClose>

				<VisuallyHidden>
					<DialogTitle>Your hidden title</DialogTitle>
				</VisuallyHidden>

				<VisuallyHidden>
					<DialogDescription />
				</VisuallyHidden>

				<div className="py-[25px] px-[8px] grid gap-[12px]">
					<div className="w-[87px] h-[87px] rounded-[50%] mx-auto flex items-center justify-center bg-blue text-white">
						<Image
							src="/images/icons/check-white-icon.svg"
							alt="Check icon"
							width={100}
							height={100}
						/>
					</div>

					<div className="grid gap-[16px]">
						<p className="text-[24px] leading-[28px] font-hagerman uppercase text-center">
							Subscription Quantity updated
						</p>
						<p className="text-[20px] leading-[24px] font-helvetica text-grey4 text-center w-full">
							You have changed your subscription quantity from {capsule} capsule
							to {changedCapsule} capsules per day, the next delivery is on X
							date.
						</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
