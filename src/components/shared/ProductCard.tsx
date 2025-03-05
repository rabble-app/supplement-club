/** @format */

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import type IProductCardModel from "@/utils/models/IProductCardModel";
import { getQuarterInfo } from "@/utils/utils";

export default function ProductCard(model: Readonly<IProductCardModel>) {
	const { nextDeliveryTextShort } = getQuarterInfo();
	const precentage =
		model.price && model.rrp
			? Number(Number(model.price) / Number(model.rrp)).toFixed(2)
			: 0;
	const titleButton = model.isComming ? "Pre - Join Team" : "Join Team";
	return (
		<div className="grid gap-y-[24px] border-[1px] border-grey3 p-[16px] relative bg-white">
			<span className="text=[16px] leading-[18px] font-helvetica text-blue bg-yellow py-[4px] px-[10px] absolute top-[16px] left-[16px] z-[1]">
				3 Month Supply
			</span>
			{model.isComming && (
				<p className="text-[36px] leading-[37px]  bg-[#FBF89F] py-[6px] px-[10px] font-[400] absolute top-[200px] left-[0] right-[0] text-blue font-inconsolata text-center z-[1]">
					Coming Soon
				</p>
			)}
			<div className={`${model.isComming ? "blur-[4px] bg-black/25" : ""}`}>
				<Image
					className={`mx-auto w-full ${model.isComming ? "rounded-[4px]" : ""}`}
					src={model.imageUrl}
					alt={model.imageKey ?? model.name}
					width={165}
					height={300}
				/>
			</div>
			<div className="grid gap-y-[16px]">
				<div className="flex justify-between items-center leading-[18px]">
					<div className="text-grey4">Quarterly Subscription</div>
					<div className="text-blue grid grid-cols-[18px_1fr] gap-x-[4px] items-center">
						<Image
							src="/images/icons/people.svg"
							alt="People logomark"
							width={18}
							height={18}
						/>
						{model.subscribers > 0 && <span>{model.subscribers}</span>}
					</div>
				</div>

				<div className="grid gap-y-[8px]">
					{model.producer?.businessName && (
						<p className="leading-[18px] text-black font-inconsolata text-base font-normal uppercase">
							{model.producer?.businessName}
						</p>
					)}
					<div className="text-[24px] font-[400] text-black font-hagerman flex items-center gap-[5px]">
						{model.name}
						<Image
							src="/images/TM-blue.svg"
							alt="TM corporation"
							width={20}
							height={20}
						/>
					</div>
					<p className="leading-[18px] text-grey5">{model.description}</p>
				</div>

				<div className="grid grid-cols-[18px_1fr] gap-x-[4px] items-start">
					<Image
						src="/images/icons/checkmark-icon.svg"
						alt="Checkmark logomark"
						width={18}
						height={18}
					/>
					<p className="leading-[18px] text-black text-base">
						{model.formulationSummary ? model.formulationSummary[0] : null}
					</p>
				</div>

				<div className="text-[20px] leading-[23px] text-grey4 font-inconsolata">
					RRP{" "}
					<span className="text-[20px] leading-[23px] font-bold line-through font-inconsolata">
						£{model.wholesalePrice}
					</span>{" "}
					<span className="text-[20px] leading-[23px] font-bold text-blue font-inconsolata">
						{precentage}% OFF
					</span>
				</div>

				<Button className="bg-blue font-bold" asChild>
					<Link
						href={`/products/${model.id}?teamId=${model.teamId}`}
						className="flex justify-between py-[16px] px-[24px] w-full"
					>
						<span className="leading-[18px] font-bold font-inconsolata text-lg">
							{titleButton}{" "}
						</span>
						<span className="leading-[18px] font-bold font-inconsolata">
							£{Number(model.price).toFixed(2)}
						</span>
					</Link>
				</Button>

				<div className="flex flex-col text-center text-grey5 leading-[18px] font-helvetica">
					<p className="text-blue uppercase text-[16px] font-helvetica">
						NEXT DAY DELIVERY
					</p>
					Join today and your start up package getting you to the{" "}
					{nextDeliveryTextShort} Drop will arrive tomorrow
				</div>
			</div>
		</div>
	);
}
