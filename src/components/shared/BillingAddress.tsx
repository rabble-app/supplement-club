import { Checkbox } from "@/components/ui/checkbox";

export default function BillingAddress() {
	return (
		<div className="grid gap-[24px]">
			<p className="text-[24px] leading-[27px] font-hagerman uppercase">
				Billing Address
			</p>
			<div className="flex items-center gap-[8px]">
				<Checkbox id="delivery" />
				<label
					htmlFor="delivery"
					className="text-[16px] leading-[19px] text-black5 cursor-pointer"
				>
					Same as delivery address
				</label>
			</div>
		</div>
	);
}
