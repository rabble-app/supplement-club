import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";

import PricePerCapsule from "@/components/shared/PricePerCapsule";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { getQuarterInfo } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ReactivatePlanDialog({ id }: Readonly<{ id: string }>) {
	const [packageAlignment, setPackageAlignment] = useState(false);
	const { remainsDaysToNextQuater, endDate, year, currentQuarter } =
		getQuarterInfo();
	const nextQuater = currentQuarter + 1 > 4 ? 1 : currentQuarter + 1;
	const nextDelivery = `${endDate.toLocaleString("en", { month: "long" })} 1st ${year}`;
	const router = useRouter();

	// need to get product data
	const product = {
		name: `86 Capsules to see you to Q${nextQuater}`,
		description: "One time Alignment Package",
	};

	async function confirmAction() {
		router.push(`/dashboard/manage-plans/${id}/reactivate-plan`);
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="text-blue flex justify-center items-center text-center h-[50px] rounded-[2px] bg-grey27/[12%] text-[17px] leading-[22px] font-bold font-inconsolata cursor-pointer">
					Re-Activate Plan
				</div>
			</DialogTrigger>
			<DialogContent
				border={"rounded"}
				className="sm:max-w-[600px] gap-[24px] p-[24px] pt-[56px]"
			>
				<DialogHeader className="flex flex-col justify-between items-center">
					<div className="grid gap-[8px] w-full">
						<DialogTitle className="text-[24px] leading-[28px] font-hagerman font-[400] mx-auto">
							Are you sure you want to reactive your plan?
						</DialogTitle>
						<p className="text-[16px] leading-[24px] font-helvetica font-[400] text-center">
							You are Re-Activating your plan and, the next delivery is on{" "}
							<span className="font-bold">{nextDelivery}</span>.
						</p>
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

				<div className="text-blue text-[16px] leading-[19px] font-inconsolata flex justify-center text-center bg-blue10 rounded-[100px] py-[9px] px-[15px] font-bold w-max mx-auto">
					{remainsDaysToNextQuater} days until the next quarterly drop{" "}
				</div>

				<div className="flex items-center gap-[8px] mx-auto">
					<Checkbox
						id="packageAlignment"
						checked={packageAlignment}
						onCheckedChange={(checked) => setPackageAlignment(checked)}
					/>
					<label
						htmlFor="packageAlignment"
						className="text-[16px] leading-[19px] text-black5 cursor-pointer"
					>
						Do you want an alignment package to get you there?
					</label>
				</div>

				{packageAlignment && (
					<div className="grid gap-[8px] items-center grid-cols-[61px_1fr_auto] bg-grey12 p-[24px]">
						<Image
							src="/images/supplement-mockup.svg"
							alt=""
							width={61}
							height={61}
						/>
						<div className="grid gap-[8px]">
							<p className="text-[14px] leading-[14px] font-inconsolata text-grey4">
								{product.name}
							</p>
							<p className="text-[16px] leading-[16px] font-[600] font-inconsolata">
								{product.description}
							</p>
							<p className="text-[14px] leading-[14px] font-inconsolata text-grey4">
								Delivered Tomorrow
							</p>
						</div>
						<PricePerCapsule capsules={100} price={100} />
					</div>
				)}

				<div className="grid gap-[12px]">
					<Button
						onClick={confirmAction}
						className="text-white bg-blue flex justify-center items-center w-full text-[17px] leading-[22px] font-bold font-inconsolata h-[46px] cursor-pointer"
					>
						Re-Activate My Plan
					</Button>

					<DialogClose asChild>
						<Button className="text-blue bg-[#7878801F] flex justify-center items-center  w-full text-[17px] leading-[22px] font-bold font-inconsolata h-[46px]">
							Cancel
						</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	);
}
