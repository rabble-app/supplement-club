import ShareBox from "@/components/ShareBox";
import Image from "next/image";
import ShareDiscounts from "./ShareDiscounts";

export default function ConfirmJoining() {
	return (
		<div className="grid gap-[24px] md:p-[16px]">
			<div className="py-[41px] px-[24px] grid gap-[12px] md:h-[264px]">
				<div className="grid gap-[16px]">
					<p className="text-[24px] leading-[28px] font-hagerman uppercase text-center">
						Congratualtions On Joining Supplement Club!
					</p>
					<div className="w-[87px] h-[87px] rounded-[50%] mx-auto flex items-center justify-center bg-blue text-white">
						<Image
							src="/images/icons/check-white-icon.svg"
							alt="Check icon"
							width={87}
							height={87}
						/>
					</div>
					<p className="text-[20px] leading-[24px] font-helvetica text-grey4 text-center">
						A confirmation email has been sent to maxwelrd@gmail.com
					</p>
				</div>
			</div>

			<div className="mx-[-16px] md:mx-0">
				<ShareDiscounts />
			</div>
			<ShareBox />
		</div>
	);
}
