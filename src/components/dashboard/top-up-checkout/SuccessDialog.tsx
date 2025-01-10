import Image from "next/image";

import {
	DialogClose,
	DialogDescription,
	DialogTitle,
} from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@reach/visually-hidden";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function SuccessDialog({
	isDialogOpen,
	onOpenChange,
}: Readonly<{ isDialogOpen: boolean; onOpenChange: (open: boolean) => void }>) {
	return (
		<Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<Button className="text-blue bg-grey27/[12%] h-[40px] flex justify-center items-center w-full text-[17px] leading-[22px] font-bold font-inconsolata">
					Skip Plan
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
							Top Up Capsules Order Received
						</p>
						<p className="text-[20px] leading-[24px] font-helvetica text-grey4 text-center w-full">
							A confirmation email has been sent to maxwelrd@gmail.com
						</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
