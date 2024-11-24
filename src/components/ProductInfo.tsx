import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function ProductInfo() {
	return (
		<div className="lg:container-width relative bg-blue w-auto lg:bg-transparent mx-[-16px] lg:mx-0">
			<div className="bg-blue px-[16px] lg:px-[32px] pt-[40px] pb-[76px] lg:mr-[270px] grid gap-[56px] lg:gap-[112px]">
				<p className="max-w-[500px] text-[32px] lg:text-[50px] leading-[40px] lg:leading-[58px] text-white order-1">
					Get started on Supplement club
				</p>
				<div className="max-w-[500px] text-[24px] lg:text-[32px] leading-[27px] lg:leading-[36px] font-bold text-white order-2">
					<p className="pb-[8px] text-[20px] leading-[24px] text-grey9">
						KANEKA CORPRATION
					</p>
					Coenzyme Q10 Ubiquinol Kaneka TM
				</div>
				<Image
					className="block lg:hidden order-3"
					src="/images/supplement.svg"
					alt="Supplement"
					width={700}
					height={541}
				/>
				<div className="max-w-[410px] order-4">
					<p className="leading-[18px] text-grey9 mb-[2px]">
						Quarterly Subscription
					</p>

					<div className="text-[40px] leading-[46px] font-bold text-white mb-[2px] flex items-center">
						£45.00{" "}
						<span className="text-[16px] leading-[18px] text-grey9 ml-[2px]">
							(£0.25 / capsule)
						</span>
					</div>

					<div className="text-[24px] leading-[27px] text-grey9 mb-[20px] lg:mb-[16px]">
						RRP{" "}
						<span className="text-[24px] leading-[27px] line-through font-bold">
							£144
						</span>{" "}
						<span className="text-[24px] leading-[27px] font-bold text-blue4">
							65% OFF
						</span>
					</div>

					<Button
						className="bg-white leading-[18px] text-blue w-full font-bold mb-[14px]"
						asChild
					>
						<Link href="/buy">Buy now</Link>
					</Button>

					<div className="flex justify-between">
						<div className="flex gap-[6px] items-center text-[12px] leading-[20px] font-inter text-white">
							<Image
								className="text-white"
								src="/images/icons/check-icon.svg"
								alt="Checkmark icon"
								width={16}
								height={16}
							/>
							Update or cancel anytime
						</div>
						<div className="flex gap-[6px] items-center text-[12px] leading-[20px] font-inter text-white">
							<Image
								src="/images/icons/check-icon.svg"
								alt="Checkmark icon"
								width={16}
								height={16}
							/>
							Next day delivery startup pack
						</div>
					</div>
				</div>
			</div>

			<Image
				className="hidden lg:block lg:absolute lg:top-[30px] lg:right-[5px] order-3"
				src="/images/supplement.svg"
				alt="Supplement"
				width={700}
				height={541}
			/>
		</div>
	);
}
