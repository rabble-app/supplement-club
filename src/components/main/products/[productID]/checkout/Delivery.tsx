import { useUser } from "@/contexts/UserContext";
import { Separator } from "@radix-ui/react-separator";

export default function Delivery() {
	const context = useUser();
	return (
		<div className="p-[16px] md:p-[32px] grid gap-[24px] md:shadow-login md:border-[1px] md:border-grey12 md:mt-[21px] bg-grey12 md:bg-white">
			<p className="text-[24px] leading-[27px] font-hagerman">
				Delivery Address
			</p>
			<Separator className="bg-grey3 h-[1px]" />
			<div className="grid gap-[16px]">
				<p className="text-[16px] leading-[18px] text-grey4">{`${context?.user?.firstName} ${context?.user?.lastName}`}</p>
				{context?.user?.shipping?.address && (
					<p className="text-[16px] leading-[18px] text-grey4">
						{context?.user?.shipping?.address}
					</p>
				)}
				<p className="text-[16px] leading-[18px] text-grey4">
					{context?.user?.shipping?.city}
					<br />
					{context?.user?.shipping?.postalCode}
					<br />
					{context?.user?.shipping?.country}
				</p>
				{context?.user?.phone && (
					<p className="text-[16px] leading-[18px] text-grey4">
						{context?.user?.phone}
					</p>
				)}
			</div>
		</div>
	);
}
