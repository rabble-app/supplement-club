import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
} from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@reach/visually-hidden";
import Image from "next/image";
import type { ReactNode } from "react";
import { Button } from "../ui/button";

export default function ConfirmDialog({
	title,
	description,
	isDialogOpen,
	onOpenChange,
	topContent,
	bottomContent,
}: Readonly<{
	title: string;
	description: string;
	isDialogOpen?: boolean;
	onOpenChange: (open: boolean) => void;
	topContent?: ReactNode;
	bottomContent?: ReactNode;
}>) {
	return (
		<Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
			{topContent && (
				<DialogTrigger asChild>
					<Button className="bg-blue w-full text[16px] md:text-[17px] md:leading-[22px] font-inconsolata font-bold text-white rounded-[2px] h-[46px]">
						{topContent}
					</Button>
				</DialogTrigger>
			)}
			<DialogPortal>
				<DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]" />
				<DialogContent
					border="rounded"
					className="w-[calc(100%-20px)] max-w-[600px] gap-[16px] fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-white z-[201] p-[24px]"
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

					<div className="grid gap-[12px] pt-[20px]">
						<div className="w-[87px] h-[87px] rounded-[50%] mx-auto flex items-center justify-center bg-blue text-white">
							<Image
								src="/images/icons/check-white-icon.svg"
								alt="Check icon"
								width={100}
								height={100}
							/>
						</div>

						<div className="grid gap-[16px]">
							<p className="text-[24px] leading-[28px] font-hagerman uppercase text-center font-[400]">
								{title}
							</p>
							<p className="text-[20px] leading-[24px] font-helvetica text-grey4 text-center w-full font-[400]">
								{description}
							</p>
						</div>

						{bottomContent && <div>{bottomContent}</div>}
					</div>
				</DialogContent>
			</DialogPortal>
		</Dialog>
	);
}
