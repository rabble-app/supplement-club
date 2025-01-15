import Image from "next/image";
import DiscountBox from "./DiscountBox";
import ShareBox from "./ShareBox";

export default function ConfirmJoining() {
	return (
		<div className="grid gap-[24px]">
			<div className="py-[41px] px-[24px] grid gap-[12px] md:h-[264px]">
				<div className="w-[87px] h-[87px] rounded-[50%] mx-auto flex items-center justify-center bg-blue text-white">
					<Image
						src="/images/icons/check-white-icon.svg"
						alt="Check icon"
						width={87}
						height={87}
					/>
				</div>
				<div className="grid gap-[16px]">
					<p className="text-[24px] leading-[28px] font-hagerman uppercase text-center">
						Thank you For Joining Supplement Club
					</p>
					<p className="text-[20px] leading-[24px] font-helvetica text-grey4 text-center">
						A confirmation email has been sent to maxwelrd@gmail.com
					</p>
				</div>
			</div>

			<div className="bg-grey14 px-[16px] md:px-[18px] pt-[32px] pb-[16px] mx-[-16px] md:mx-[16px]">
				<DiscountBox />

				<div className="grid grid-cols-[63px_1fr_96px] gap-[14px] md:gap-[16px] items-center py-[21.5px] px-[16px] md:px-[32px] shadow-3 scale-[1.03] bg-white md:scale-[1.11] rounded-[12px]">
					<div className="p-[19px] flex justify-center items-center bg-blue8 rounded-[50%] w-[63px] h-[63px]">
						<Image
							src="/images/icons/add-user-icon.svg"
							alt="Lock icon"
							width={24}
							height={24}
						/>
					</div>

					<div className="grid gap-[8px]">
						<p className="text-[20px] leading-[23px] font-hagerman">
							Referral Rookie{" "}
							<span className="text-[20px] leading-[23px] font-hagerman">
								(1/1)
							</span>
						</p>
						<p className="text-[20px] leading-[20px] font-[600] font-inconsolata">
							£5 off{" "}
						</p>
					</div>

					<div className="text-[32px] leading-[33px] font-[800] font-inconsolata text-blue">
						£40.00
					</div>
				</div>

				<div className="grid grid-cols-[63px_1fr_75px] gap-[14px] md:gap-[16px] items-center py-[21.5px] px-[16px] md:px-[32px]">
					<div className="p-[19px] flex justify-center items-center bg-grey3 rounded-[50%] w-[63px] h-[63px]">
						<Image
							src="/images/icons/lock-icon.svg"
							alt="Lock icon"
							width={24}
							height={24}
						/>
					</div>

					<div className="grid gap-[8px]">
						<p className="text-[20px] leading-[23px] font-hagerman text-grey6">
							Team Builder{" "}
							<span className="text-[20px] leading-[23px] font-hagerman text-grey6">
								(1/2)
							</span>
						</p>
						<p className="text-[20px] leading-[20px] font-inconsolata text-grey15">
							£10 off{" "}
						</p>
					</div>

					<div className="text-[24px] leading-[25px] font-[800] font-inconsolata text-grey15">
						£40.00
					</div>
				</div>

				<div className="grid grid-cols-[63px_1fr_75px] gap-[14px] md:gap-[16px] items-center py-[21.5px] px-[16px] md:px-[32px]">
					<div className="p-[19px] flex justify-center items-center bg-grey3 rounded-[50%] w-[63px] h-[63px]">
						<Image
							src="/images/icons/lock-icon.svg"
							alt="Lock icon"
							width={24}
							height={24}
						/>
					</div>

					<div className="grid gap-[8px]">
						<p className="text-[20px] leading-[23px] font-hagerman text-grey6">
							Super Sharer{" "}
							<span className="text-[20px] leading-[23px] font-hagerman text-grey6">
								(1/3)
							</span>
						</p>
						<p className="text-[20px] leading-[20px] font-inconsolata text-grey15">
							£15 off{" "}
						</p>
					</div>

					<div className="text-[24px] leading-[25px] font-[800] font-inconsolata text-grey15">
						£35.00
					</div>
				</div>
			</div>

			<ShareBox />
		</div>
	);
}
