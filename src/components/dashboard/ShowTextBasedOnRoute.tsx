"use client";

import { ChevronLeft } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

const ShowTextBasedOnRoute = () => {
	const pathname = usePathname();
	const params = useParams();
	const router = useRouter();
	const getTextForRoute = () => {
		switch (pathname) {
			case `/dashboard/manage-plans/${params.subscriptionID}/top-up-checkout`:
				return "Order Top Up Capsules";
			case `/dashboard/manage-plans/${params.subscriptionID}`:
				return "Subscription Management";
			case "/dashboard/manage-plans":
				return "Manage Plans";
			case "/dashboard/view-past-orders":
				return "View Past Orders";
			case "/dashboard/refer":
				return "Refer a Friend & You BOTH Save";
			case "/dashboard/shop-supplement-products":
				return "Shop Supplement Products";
			case "/dashboard/account":
				return "Manage Account";
			case "/dashboard/account/payment-details":
				return "Your Cards";
			default:
				return null;
		}
	};

	const routeText = getTextForRoute();

	if (!routeText) {
		return null;
	}

	function goToPrevious() {
		// Split the URL into segments by '/'
		const segments = pathname.split("/");

		// Remove the last segment
		segments.pop();

		// Join the remaining segments back together
		const baseUrl = segments.join("/");
		router.push(baseUrl);
	}

	return (
		<div className="text-[16px] leading-[18px] md:text-[24px] md:leading-[27px] font-[400] font-hagerman flex items-center justify-center h-[62px] border-b-[1px] border-grey30 relative">
			<Button
				className="absolute top-1/2 left-[16px] md:left-[32px] transform -translate-y-1/2 flex items-center gap-[8px] text-blue font-bold  text-[16px] leading-[18px] font-helvetica"
				onClick={() => goToPrevious()}
			>
				<ChevronLeft className="text-blue w-[20px] h-[20px]" /> Back
			</Button>
			{getTextForRoute()}
		</div>
	);
};

export default ShowTextBasedOnRoute;
