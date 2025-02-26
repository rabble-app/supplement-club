import Image from "next/image";

export default function ShareBox() {
	return (
		<div className="grid gap-[8px] p-[32px] shadow-login border-[1px] border-grey12">
			<div className="flex w-max gap-[8px]">
				<div className="w-[44px] h-[44px] rounded-[50%] mx-auto flex items-center justify-center bg-blue text-white">
					<Image
						src="/images/icons/facebook-icon.svg"
						alt="facebook icon"
						width={12}
						height={12}
					/>
				</div>

				<div className="w-[44px] h-[44px] rounded-[50%] mx-auto flex items-center justify-center bg-blue text-white">
					<Image
						src="/images/icons/instagram-icon.svg"
						alt="instagram icon"
						width={20}
						height={20}
					/>
				</div>
				<div className="w-[44px] h-[44px] rounded-[50%] mx-auto flex items-center justify-center bg-blue text-white">
					<Image
						src="/images/icons/email-white-icon.svg"
						alt="email icon"
						width={20}
						height={20}
					/>
				</div>
			</div>
			<p className="text-[16px] leading-[18px] font-bold">
				Share the Supplement Club Revolution
			</p>
			<p className="text-[14px] leading-[16px] text-grey4">
				With your friends and family so you both get a £5 discount on your next
				cycle.
			</p>
		</div>
	);
}
