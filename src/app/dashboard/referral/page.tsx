"use client";

import { useState } from "react";

import RererralCardsWithLink from "@/components/shared/ReferralCardsWithLink";

export default function Refer() {
	const [claimValue] = useState(0);

	return (
		<>
			{claimValue > 0 && (
				<div className="bg-blue2 text-center py-[8px] text-blue font-bold font-inconsolata text-[16px] leading-[16px] border-t-[1px] border-grey30">
					🎉 You have purchased a £{claimValue.toFixed(2)} credit that will be
					credited off your next payment
				</div>
			)}
			<div className="max-w-[600px] mx-auto">
				<RererralCardsWithLink className="bg-transparent border-0" />
			</div>
		</>
	);
}
