import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";

export default function RegisterMemberDialog() {
	const [open, setOpen] = useState(true); // Dialog initially open

	const handleClose = () => setOpen(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent
				border={"rounded"}
				className="sm:max-w-[600px] gap-[24px] p-[24px]"
			>
				<DialogHeader className="flex flex-col justify-between items-center">
					<div className="grid gap-[8px] w-full">
						<DialogTitle className="text-[24px] leading-[28px] font-hagerman font-[400] mx-auto">
							YOU’RE REGISTERING AS A FOUNDING MEMBER
						</DialogTitle>
						<p className="text-[16px] leading-[24px] font-helvetica font-[400] text-center">
							We haven’t launched this team yet
						</p>
					</div>
				</DialogHeader>

				<div className="grid gap-[24px] p-[24px] bg-[#F6F6F6]">
					<div className="grid gap-[32px]">
						<div className="grid gap-[8px]">
							<p className="text-[18px] font-hagerman">
								We’ll notify you when the team launches and orders go to the
								lab.
							</p>
							<p className="text-[14px] font-helvetica text-[E5E6F4]">
								Once all founding slots are filled, the team will launch and
								your order will go to the lab. We’ll email you with your
								delivery date and give you 24h before charging
							</p>
						</div>
						<div className="grid gap-[8px]">
							<p>Launch Package Includes:</p>
							<div className="grid grid-cols-2 gap-[16px]">
								<div className="rounded-[12px] bg-white flex flex-col justify-center gap-[10px] py-[16px] px-[12px]">
									<p className="text-[16px] font-[600] font-inconsolata text-center">
										<Image
											src="/images/supplement-mockup.svg"
											alt="/images/supplement-mockup.svg"
											className="mx-auto"
											width={61}
											height={61}
										/>
										Alignment Package
									</p>
									<p className="text-[14px] font-inconsolata text-center">
										Capsule amount set at launch
									</p>
								</div>
								<div className="rounded-[12px] bg-white flex flex-col justify-center gap-[10px] py-[16px] px-[12px]">
									<p className="text-[16px] font-[600] font-inconsolata text-center">
										<Image
											src="/images/supplement-mockup.svg"
											alt="/images/supplement-mockup.svg"
											className="mx-auto"
											width={61}
											height={61}
										/>
										1st Quarterly Drop
									</p>
									<p className="text-[14px] font-inconsolata text-center">
										180 Capsules pouch
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="text-blue text-[12px]  font-inconsolata flex justify-center text-center bg-blue10 rounded-[100px] ppx-[15px] font-bold w-full mx-auto h-[25px]">
						No action needed — we’ll email you 24h before charging.
					</div>
				</div>

				<div className="grid gap-[12px]">
					<Button
						onClick={handleClose}
						className="text-white bg-blue flex justify-center items-center w-full text-[17px] leading-[22px] font-bold font-inconsolata h-[46px] cursor-pointer"
					>
						Ok
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
