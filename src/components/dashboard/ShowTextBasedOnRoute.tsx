"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ShowTextBasedOnRoute = () => {
	const pathname = usePathname();

	const getTextForRoute = () => {
		switch (pathname) {
			case "/dashboard/manage-plans":
				return "Manage Plans";
			case "/dashboard/top-up-checkout":
				return "Order Top Up Capsules";
			case "/dashboard/subscription-managment":
				return "Subscription Management";
			case "/dashboard/view-past-orders":
				return "View Past Orders";
			case "/dashboard/refer":
				return "Refer a Friend & You BOTH Save";
			case "/dashboard/shop-supplement-products":
				return "Shop Supplement Products";
			case "/dashboard/account":
				return "Manage Account";
			default:
				return null;
		}
	};

	const routeText = getTextForRoute();

	if (!routeText) {
		return null;
	}

	return (
		<div className="text-[16px] leading-[18px] md:text-[24px] md:leading-[27px] font-[400] font-hagerman flex items-center justify-center h-[62px] border-b-[1px] border-grey30 relative">
			<Link
				className="absolute top-1/2 left-[16px] md:left-[32px] transform -translate-y-1/2 flex items-center gap-[8px] text-blue font-bold  text-[16px] leading-[18px] font-helvetica"
				href="/dashboard/"
			>
				<ChevronLeft className="text-blue w-[20px] h-[20px]" /> Back
			</Link>
			{getTextForRoute()}
		</div>
	);
};

export default ShowTextBasedOnRoute;
