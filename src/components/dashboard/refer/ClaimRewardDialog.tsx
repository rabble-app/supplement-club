import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export default function ClaimRewardDialog({
	credit,
	requires,
}: Readonly<{ credit: number; requires: number }>) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue text-white text[17px] font-inconsolata w-[146px">
					Claim Reward
				</Button>
			</DialogTrigger>
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

				<DialogTitle className="text-center text-[26px] leading-[39px] font-inconsolata font-bold">
					Claim Reward
				</DialogTitle>

				<DialogDescription className="text-center">
					<span className="text-[16px] leading-[24px] font-helvetica flex">
						Are you sure you want to convert {requires.toLocaleString()} CC into
						£{credit}?{" "}
					</span>
					<span className="text-[16px] leading-[24px] font-helvetica text-grey29 flex">
						This will automatically be credited off your next payment.
					</span>
				</DialogDescription>

				<DialogClose className="bg-blue text-white w-full font-bold font-inconsolata h-[48px]">
					Yes, Convert {requires.toLocaleString()} CC into £{credit}
				</DialogClose>

				<DialogClose className="bg-white text-blue w-full font-bold font-inconsolata h-[48px]">
					Cancel
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
}
