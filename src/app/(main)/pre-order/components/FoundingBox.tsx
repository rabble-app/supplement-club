import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import Link from "next/link";

import OrderCard from "@/components/cards/OrderCard";
import TotalCard from "@/components/cards/TotalCard";
import { Button } from "@/components/ui/button";

import DiscoutCard from "./DiscountCard";

export default function FoundingBox() {
	return (
		<div className="grid gap-[24px]">
			<div className="flex justify-between gap-[10px] px-[10px] text-[16px] leading-[16px] font-bold font-inconsolata text-blue bg-blue2 h-[37px] w-max items-center rounded-[100px]">
				<Image
					src="/images/icons/user-badge-icon.svg"
					alt="User badge"
					width={15}
					height={15}
				/>
				YOU’RE A FOUNDING MEMBER!
			</div>

			<div className="grid gap-[10px] p-[24px] bg-grey12">
				<OrderCard
					id={1}
					alt="supplement mockup"
					description="180 Capsules Every 3 months"
					name="Quarterly Subscription"
					delivery="Triggered when 50 pre-orders Complete"
					src="/images/supplement-mockup.svg"
				>
					<div className="text-[20px] font-bold text-black flex items-center gap-[5px] font-inconsolata">
						£41.00{" "}
						<span className="text-[12px] leading-[13px] md:leading-[12px] text-grey1 font-inconsolata font-bold">
							(£0.25 / capsule)
						</span>
					</div>
				</OrderCard>

				<OrderCard
					id={1}
					alt="supplement mockup"
					description="Startup Package"
					name="Glass Bottle Container"
					src="/images/ubiquinol.svg"
				>
					<div className="grid gap-[7px]">
						<p className="text-[20px] leading-[21px] font-inconsolata line-through font-bold md:text-end">
							£0.00
						</p>
						<div className="text-[20px] leading-[21px] font-inconsolata text-grey4 mb-[16px]">
							RRP{" "}
							<span className="text-[20px] leading-[21px] font-inconsolata line-through font-bold">
								£18
							</span>{" "}
							<span className="text-[20px] leading-[21px] font-inconsolata font-bold text-blue">
								FREE
							</span>
						</div>
					</div>
				</OrderCard>

				<Separator className="bg-grey13 h-[1px]" />

				<OrderCard
					id={1}
					alt="supplement mockup"
					delivery="This Quarter"
					name="Succesful Referal x 1"
				>
					<div className="text-[20px] leading- font-bold text-black flex items-center gap-[5px] font-inconsolata">
						£-5.00{" "}
					</div>
				</OrderCard>

				<Separator className="bg-grey13 h-[1px]" />

				<TotalCard
					capsules={180}
					price={35.5}
					rrp={144}
					percent={75}
					capsulePrice={0.21}
				/>
			</div>

			<div className="bg-grey14 p-[16px] md:py-[32px] md:px-[18px] mx-[-16px] md:mx-[16px] grid gap-[33px]">
				<div className="grid gap-[8px] px-[16px]">
					<p className="text-[24px] leading-[28px] font-bold font-inconsolata">
						Share With Others For More Discounts
					</p>

					<p className="text-[14px] leading-[16px] font-helvetica text-grey4">
						Every Quarter you have up to £15.00 in referral credits. Share with
						friends and you both get £5 off when they sign up.
					</p>

					<Button className="bg-blue text-white w-full font-bold h-[48px]">
						<Link
							className="text-[16px] leading-[24px] font-[600] font-inconsolata"
							href="#"
						>
							Invite Friends & Earn £5
						</Link>
					</Button>

					<div className="text-[14px] leading-[14px] font-inconsolata font-[600] flex justify-center items-center text-blue bg-blue2 h-[31px]">
						Earn £5 for each friend who joins! They get £5 off too.
					</div>
				</div>

				<div className="grid gap-[16px] md:px-[16px]">
					<DiscoutCard
						name="Subscription"
						currentStep={0}
						steps={0}
						price={40}
					/>
					<div className="md:mx-[-48px]">
						<DiscoutCard
							name="Referral Rookie"
							description="£5 off Team Price"
							currentStep={1}
							isActive={true}
							steps={1}
							price={36}
						/>
					</div>

					<DiscoutCard
						name="Team Builder"
						currentStep={1}
						steps={2}
						description="£10 off Team Price"
						price={30}
					/>

					<DiscoutCard
						name="Super Sharer"
						currentStep={1}
						steps={3}
						description="£15 off Team Price"
						price={25}
					/>
				</div>
			</div>
		</div>
	);
}
