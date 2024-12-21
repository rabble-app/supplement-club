import Image from "next/image";

import {
	DialogClose,
	DialogDescription,
	DialogTitle,
} from "@radix-ui/react-dialog";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Link from "next/link";

export default function UnlockedReferralDialog({
	isDialogOpen,
	onOpenChange,
	name,
	level,
	title,
}: Readonly<{
	isDialogOpen: boolean;
	name: string;
	level: number;
	title: string;
	onOpenChange: (open: boolean) => void;
}>) {
	return (
		<Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
			<DialogContent
				border={"rounded"}
				className="sm:max-w-[600px] gap-[16px] px-[11px]"
			>
				<DialogClose className="absolute right-[16px] top-[16px]">
					<div className="w-[38px] h-[38px] flex justify-center">
						<Image
							src="/images/icons/close-black-icon.svg"
							alt="Close icon"
							width={16}
							height={16}
						/>
					</div>
				</DialogClose>

				<DialogTitle className="text-center text-[24px] leading-[28px] font-figtree font-bold">
					New Badge Unlocked
				</DialogTitle>

				<DialogDescription className="px-[50px] text-center">
					Congrats {name}, You have just completed inviting 20 users on
					supplement club.
				</DialogDescription>

				<div className="px-[8px] grid gap-[12px] grid-cols-1">
					<Image
						src="/images/referral-rookie.svg"
						className=" mx-auto"
						alt="referral rookie"
						width={171}
						height={166}
					/>

					<p className="text-[24px] leading-[28px] font-hagerman uppercase text-center">
						{title}
					</p>
					<p className="text-[16px] leading-[18px] font-helvetica text-grey4 text-center w-full">
						Level {level}
					</p>
					<Button className="bg-blue text-white w-full font-bold">
						<Link href="/pre-order/checkout-flow/"> Invite More Friends</Link>
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
