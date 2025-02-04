import type { IPaymentCard } from "@/utils/models/api/IPaymentCard";
import { getCardImage } from "@/utils/utils";
import Image from "next/image";

export default function PaymentCard({
	model,
	children,
	topContent,
}: Readonly<{
	model: IPaymentCard;
	children?: React.ReactNode;
	topContent?: React.ReactNode;
}>) {
	const dateUpdated = new Date();
	return (
		<div>
			<div className="flex justify-between items-center py-[20px] px-[16px]">
				<div className="flex items-center gap-[8px]">
					{topContent}
					<div className="grid gap-[4px]">
						<div className="flex gap-[4px]">
							<span className="text-[14px] leading-[16px] font-hagerman">
								Ending in:
							</span>
							<span className="text-[14px] font-[600] leading-[16px] font-inconsolata">
								...{model.last4}
							</span>
						</div>
						{dateUpdated && (
							<div className="flex gap-[4px]">
								<span className="text-[10px] leading-[11px] font-[400] font-helvetica text-black6">
									Last time used:
								</span>
								<span className="text-[10px] leading-[11px] font-[700] font-helvetica text-black6">
									Thu, Mar 18, 2023
								</span>
							</div>
						)}
						{!dateUpdated && (
							<span className="text-[10px] leading-[11px] font-[400] font-helvetica text-black6">
								Never Used
							</span>
						)}
					</div>
				</div>

				<div className="flex justify-between items-center gap-[14px]">
					{true && (
						<span className="rounded-[28px] bg-blue text-white px-[10px] text-[10px] leading-[10px] font-[600] font-inconsolata h-[20px] flex items-center">
							Default
						</span>
					)}
					<Image
						src={getCardImage(model.display_brand)}
						alt={model.display_brand}
						width={60}
						height={32}
					/>

					{children}
				</div>
			</div>
		</div>
	);
}
