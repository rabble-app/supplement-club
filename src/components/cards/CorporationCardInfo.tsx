import Image from "next/image";

export default function CorporationCardInfo() {
	return (
		<div className="grid gap-[8px]">
			<p className="text-[20px] leading-[24px] md:font-[500] font-inconsolata md:text-grey4">
				KANEKA CORPRATION
			</p>
			<div className="text-[24px] md:text-[40px] leading-[28px] md:leading-[48px] font-hagerman">
				Coenzyme Q10 Ubiquinol Kaneka TM
			</div>
			<div className="flex items-center gap-[8px]">
				<Image
					src="/images/icons/link-icon.svg"
					alt="security-card-icon"
					width={24}
					height={24}
				/>
				<p className="text-[14px] leading-[16px] text-grey6">100mg</p>
			</div>
		</div>
	);
}
