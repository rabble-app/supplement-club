import Image from "next/image";

import { DialogClose } from "@radix-ui/react-dialog";
import { Separator } from "@radix-ui/react-separator";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { getQuarterInfo } from "@/utils/utils";

export default function SubscriptionSkipDialog({
	confirmAction,
}: Readonly<{
	confirmAction: () => void;
}>) {
	const { nextDeliveryTextShort } = getQuarterInfo();
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="text-blue bg-grey27/[12%] h-[40px] flex justify-center items-center w-full text-[17px] leading-[22px] font-inconsolata font-bold">
					Skip Plan
				</Button>
			</DialogTrigger>
			<DialogContent border={"rounded"} className="sm:max-w-[600px] gap-[16px]">
				<DialogHeader className="flex flex-row justify-between items-center">
					<DialogTitle className="text-[18px] leading-[28px] font-helvetica font-[400]">
						Skipping a Drop?
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

				<div className="text-[16px] leading-[24px] font-[400] font-helvetica text-grey6">
					You are opting to skip the {nextDeliveryTextShort} Drop. Are you sure
					you want to Skip?
				</div>

				<Button
					onClick={confirmAction}
					className="text-white bg-blue h-[46px] flex justify-center items-center mx-auto text-[17px] leading-[22px] font-bold font-inconsolata"
					type="submit"
				>
					Yes, Skip This Drop
				</Button>

				<div className="text-[12px] leading-[18px] font-[400] font-helvetica text-grey6 text-center max-w-[422px] mx-auto">
					Please note Founding and Early Member rates will revert to standard
					Member rates if you skip twice in 1 year.
				</div>
			</DialogContent>
		</Dialog>
	);
}
