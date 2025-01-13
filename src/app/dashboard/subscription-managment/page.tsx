"use client";

import { Separator } from "@radix-ui/react-separator";
import { useState } from "react";

import AvailablePayment from "@/components/AvailablePayment";
import BillingAddress from "@/components/BillingAddress";
import PaymentDetails from "@/components/PaymentDetails";
import CorporationCardInfo from "@/components/cards/CorporationCardInfo";
import OrderCard from "@/components/cards/OrderCard";
import TotalCard from "@/components/cards/TotalCard";
import TotalPercentCard from "@/components/cards/TotalPercentCard";
import SubscriptionCancelDialog from "@/components/dashboard/subscription-managment/SubscriptionCancelDialog";
import SubscriptionCard from "@/components/dashboard/subscription-managment/SubscriptionCard";
import SubscriptionPlan from "@/components/dashboard/subscription-managment/SubscriptionPlan";
import SubscriptionSkipDialog from "@/components/dashboard/subscription-managment/SubscriptionSkipDialog";
import { Button } from "@/components/ui/button";

export default function Subscriptions() {
	const [step, setStep] = useState<number>(1);

	function confirmAction(capsule: number) {
		console.log(capsule);
		setStep(2);
	}

	return (
		<div
			className={`mx-auto py-[30px] ${step === 1 ? "max-w-[600px] " : " max-w-[1280px]"}`}
		>
			{step === 1 && (
				<div className="grid gap-[16px]">
					<div className="text-[28px] leading-[28px] font-hagerman font-[400]">
						Plan settings
					</div>

					<SubscriptionCard
						title="Next Quarterly Drop"
						description="1 Jan 2025 - 78 Days"
						imageSrc="/images/icons/calendar-blue-icon.svg"
						imageAlt="Calendar icon"
					/>

					<SubscriptionPlan confirmAction={confirmAction} />

					<SubscriptionCard
						title="Your Stock"
						description="You should have 148 Capsules to tie you over to the Jan 1st 2024 drop"
						imageSrc="/images/icons/truck-icon.svg"
						imageAlt="Truck icon"
					>
						<Button
							type="submit"
							className="bg-blue13 w-full text[16px] md:text-[17px] md:leading-[22px] font-inconsolata font-bold text-blue rounded-[2px] h-[50px]"
						>
							Order Top Up Capsules
						</Button>
					</SubscriptionCard>

					<div className="grid gap-[10px] p-[24px] bg-grey12">
						<div className="grid gap-[24px]">
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

							<Separator className="bg-grey13 h-[1px]" />

							<OrderCard
								id={1}
								alt="supplement mockup"
								delivery="This Quarter"
								name="Succesful Referal x 1"
							>
								<div className="text-[20px] font-bold text-black flex items-center gap-[5px] font-inconsolata">
									£-5.00{" "}
								</div>
							</OrderCard>

							<Separator className="bg-grey13 h-[1px]" />
						</div>

						<div className="grid gap-[10px]">
							<TotalCard
								capsules={180}
								price={36}
								rrp={144}
								percent={75}
								capsulePrice={0.21}
							/>

							<SubscriptionCancelDialog />

							<SubscriptionSkipDialog />
						</div>
					</div>
				</div>
			)}

			{step === 2 && (
				<div className="grid md:grid-cols-2 gap-[26px] md:gap-[16px] max-w-[1280px] mx-auto md:py-[40px] bg-grey12 md:bg-transparent">
					<PaymentDetails step={step} updateStepAction={setStep}>
						<BillingAddress />
					</PaymentDetails>

					<div className="grid gap-[73px]">
						<div className="grid gap-[24px] p-[16px] md:p-[24px] bg-grey12">
							<h1 className="text-[24px] leading-[27px] font-hagerman text-blue mb-[8px]">
								Order Summary
							</h1>

							<CorporationCardInfo />

							<Separator className="bg-grey13 h-[1px]" />

							<p className="text-[24px] leading-[27px] md:leading-[16px] font-[400] font-hagerman">
								Changing Plan To
							</p>

							<OrderCard
								id={1}
								alt="supplement mockup"
								description="86 Capsules to see you to Q1"
								delivery="Delivered Tomorrow"
								name="One time Alignment Package"
								src="/images/supplement-mockup.svg"
							>
								<div className="text-[20px] font-bold text-black flex items-center gap-[5px] font-inconsolata">
									£23.20{" "}
									<span className="text-[12px] leading-[16px] md:leading-[12px] text-grey1 font-inconsolata">
										(£0.25 / capsule)
									</span>
								</div>
							</OrderCard>

							<Separator className="bg-grey13 h-[1px]" />

							<OrderCard
								id={2}
								alt="ubiquinol"
								description="180 Capsules Every 3 months"
								delivery="Delivered"
								name="Quarterly Subscription"
								src="/images/ubiquinol.svg"
							>
								<div className="text-[20px] font-bold text-black flex items-center gap-[5px] font-inconsolata">
									£45.00{" "}
									<span className="text-[12px] leading-[16px] md:leading-[12px] text-grey1 font-inconsolata">
										(£0.25 / capsule)
									</span>
								</div>
							</OrderCard>

							<Separator className="bg-grey13 h-[1px]" />

							<div className="grid gap-[7px] md:gap-0 md:grid-cols-[84px_1fr]">
								<div>
									<p className="text-[32px] leading-[33px] font-inconsolata font-bold text-black">
										Total
									</p>
									<p className="text-[14px] leading-[15px] text-grey4 font-inconsolata">
										266 Capsules
									</p>
								</div>

								<div className="grid md:justify-end">
									<div className="text-[16px] leading-[24px] font-inconsolata text-black flex items-center font-[700]">
										Place Order - 80.20{" "}
										<span className="text-[12px] leading-[13px] font-inconsolata text-grey1 ml-[2px] font-[700]">
											(£0.25 / capsule)
										</span>
									</div>
									<TotalPercentCard price={200} percent={65} />
								</div>
							</div>
						</div>
						<AvailablePayment />
					</div>
				</div>
			)}
		</div>
	);
}
