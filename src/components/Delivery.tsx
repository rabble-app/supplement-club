import { Separator } from "@radix-ui/react-separator";

export default function Delivery() {
	return (
		<div className="p-[16px] md:p-[32px] grid gap-[24px] md:shadow-login md:border-[1px] md:border-grey12 md:mt-[21px] bg-grey12 md:bg-white">
			<p className="text-[24px] leading-[27px] font-hagerman">
				Delivery Address
			</p>
			<Separator className="bg-grey3 h-[1px]" />
			<div className="grid gap-[16px]">
				<p className="text-[16px] leading-[18px] text-grey4">Maxwell Beard</p>
				<p className="text-[16px] leading-[18px] text-grey4">8 Alpha Street</p>
				<p className="text-[16px] leading-[18px] text-grey4">
					London
					<br />
					SE154NX United
					<br />
					Kingdom
				</p>
				<p className="text-[16px] leading-[18px] text-grey4">07872076691</p>
			</div>
		</div>
	);
}
