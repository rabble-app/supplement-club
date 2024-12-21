"use client";

import Image from "next/image";
import React, { useState } from "react";

import ReferalDiscountCard from "@/app/(main)/products/components/ReferalDiscountCard";
import type { IReferalDiscountModel } from "@/utils/models/IReferalDiscountModel";
import InputMask from "@mona-health/react-input-mask";
import ReferralCard from "../components/ReferralCard";
import ReferralProgress from "../components/ReferralProgress";
import UnlockedReferralDialog from "../components/UnlockedReferralDialog";

export default function Refer() {
	const [cardModel, setCardModel] = React.useState<string>("");
	const [activeRefer] = React.useState<number>(1);
	const [inProgress] = React.useState<boolean>(true);

	const referralCards = Array.from({ length: 3 }, (_, index) => ({
		id: index + 1,
		imageSrc: "/images/team-builder.svg",
		imageAlt: "team builder",
	}));

	const discountCards = [
		{
			id: 0,
			name: "Subscription",
			initStep: 0,
			steps: 0,
			price: 40,
		},
		{
			id: 1,
			name: "Referral Rookie",
			initStep: 1,
			steps: 1,
			price: 36,
			priceOff: 5,
			activeImage: inProgress ? "/images/referral-rookie.svg" : null,
		},
		{
			id: 2,
			name: "Team Builder",
			steps: 2,
			price: 30,
			priceOff: 10,
			activeImage: inProgress ? "/images/team-builder.svg" : null,
		},
		{
			id: 3,
			name: "Subscription",
			steps: 3,
			price: 25,
			priceOff: 15,
			activeImage: inProgress ? "/images/super-sharer.svg" : null,
		},
	] as IReferalDiscountModel[];

	const copyContent = async () => {
		try {
			await navigator.clipboard.writeText(cardModel);
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	};

	const updateCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCardModel(e.target.value.replaceAll(" ", ""));
	};

	const [isDialogOpen, setIsDialogOpen] = useState(true);

	function onOpenChange(open: boolean) {
		setIsDialogOpen(open);
	}
	function getCardVisibility(id: number) {
		if (activeRefer === id) {
			return "";
		}

		if (inProgress) {
			return "opacity-[4%]";
		}
		return "opacity-10";
	}

	return (
		<div className="max-w-[600px] mx-auto pt-[16px] pb-[100px] md:py-[90px]">
			<div className="md:px-[16px] md:py-[32px] border-[1px] border-grey12 grid gap-[40px]">
				<div className="grid grid-cols-3 gap-[27px] mx-auto">
					{referralCards.map((card) => (
						<div className="relative" key={card.id}>
							<Image
								className={getCardVisibility(card.id)}
								src={card.imageSrc}
								alt={card.imageAlt}
								width={171}
								height={166}
							/>

							{activeRefer !== card.id && inProgress && (
								<Image
									src="/images/referral-lock-grey.svg"
									alt="referral lock"
									className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
									width={64}
									height={64}
								/>
							)}
						</div>
					))}
				</div>

				{inProgress && (
					<>
						<ReferralCard />

						<ReferralProgress />

						<UnlockedReferralDialog
							isDialogOpen={isDialogOpen}
							onOpenChange={onOpenChange}
							name="User"
							level={1}
							title="REFERRAL ROOKIE"
						/>
					</>
				)}

				<div className="grid gap-[16px]">
					<div className="flex w-max gap-[8px]">
						<div className="w-[44px] h-[44px] rounded-[50%] mx-auto flex items-center justify-center bg-blue text-white">
							<Image
								src="/images/icons/facebook-icon.svg"
								alt="facebook icon"
								width={14}
								height={20}
							/>
						</div>

						<div className="w-[44px] h-[44px] rounded-[50%] mx-auto flex items-center justify-center bg-blue text-white">
							<Image
								src="/images/icons/instagram-icon.svg"
								alt="facebook icon"
								width={20}
								height={20}
							/>
						</div>
						<div className="w-[44px] h-[44px] rounded-[50%] mx-auto flex items-center justify-center bg-blue text-white">
							<Image
								src="/images/icons/email-white-icon.svg"
								alt="facebook icon"
								width={20}
								height={20}
							/>
						</div>
					</div>
					<div className="grid gap-[8px]">
						<p className="text-[16px] leading-[16px] font-bold font-inconsolata">
							Share the Supplement Club Revolution
						</p>
						<p className="text-[14px] leading-[16px] font-helvetica text-grey4">
							With your friends and family so you both get a £5 discount on your
							next cycle.
						</p>
					</div>
				</div>

				<div className="grid gap-[8px]">
					<p className="text-[16px] leading-[24px] font-helvetica">
						Your Referal Link
					</p>
					<div className="grid grid-cols-[1fr_25px] items-center gap-[12px] h-[48px] border-[1px] border-black px-[12px] py-[8px]">
						<InputMask
							value={cardModel ?? ""}
							mask="9999 9999 9999 9999"
							alwaysShowMask="true"
							maskPlaceholder={
								!cardModel || cardModel === "" ? "0000 0000 0000 0000" : ""
							}
							className="h-[24px] outline-none font-roboto text-grey16"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								updateCardNumber(e)
							}
						/>
						<Image
							src="/images/icons/copy-right-icon.svg"
							alt="Copy right icon"
							className="cursor-pointer"
							width={24}
							height={24}
							onClick={(e) => {
								e.preventDefault();
								copyContent();
							}}
						/>
					</div>
				</div>

				<div className="grid gap-[16px] md:bg-white">
					{discountCards.map((card) => (
						<ReferalDiscountCard
							key={card.id}
							{...card}
							activeIndex={activeRefer}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
