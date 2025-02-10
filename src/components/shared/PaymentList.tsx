import { useState } from "react";

import { Separator } from "@radix-ui/react-separator";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

import EmailReminders from "./EmailReminders";

export default function PaymentList({
	totalPrice,
}: Readonly<{ totalPrice: number }>) {
	const [policyTerms, setPolicyTerms] = useState(true);
	const [saveAddress, setSameAddress] = useState(true);

	console.log(totalPrice);

	return (
		<div className="border-[1px] border-grey12 flex flex-col items-start p-[32px] gap-[24px]">
			<div className="grid gap-[24px]">
				<p className="text-[24px] leading-[27px] font-hagerman uppercase">
					Billing Address
				</p>
				<div className="flex items-center gap-[8px]">
					<Checkbox
						id="delivery"
						checked={saveAddress}
						onCheckedChange={(checked) => setSameAddress(checked === true)}
					/>
					<label
						htmlFor="delivery"
						className="text-[16px] leading-[19px] text-black5 cursor-pointer"
					>
						Same as delivery address
					</label>
				</div>
			</div>
			<Separator className="bg-grey3 h-[1px]" />
			<div>Your cards</div>
			else
			<div>Form card</div>
			<Separator className="bg-grey3 h-[1px]" />
			<div className="flex items-center gap-[8px]">
				<Checkbox
					id="policyTerms"
					checked={policyTerms}
					onCheckedChange={(checked) => setPolicyTerms(checked === true)}
				/>
				<label
					htmlFor="policyTerms"
					className="text-[16px] leading-[19px] text-black5 cursor-pointer"
				>
					I accept the Terms of Service and Privacy Policy
				</label>
			</div>
			<p className="text-[14px] leading-[16px]">
				By making this purchase your supplement club will automatically renew
				and your card will be charged the supplement plan price. You can cancel
				or modify at any time using your customer login.
			</p>
			<Button type="submit" className="bg-blue text-white w-full font-bold">
				{`Place Order - £ ${totalPrice.toFixed(2)}`}{" "}
				{/* Use a regular string */}
			</Button>
			<EmailReminders />
		</div>
	);
}
