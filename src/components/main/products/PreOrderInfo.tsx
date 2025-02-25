import type { IProductBenefits } from "@/utils/models/IProductBenefits";
import { Separator } from "@radix-ui/react-separator";

export default function PreOrderInfo({
	productBenefits,
}: Readonly<{ productBenefits?: IProductBenefits[] }>) {
	return (
		<div>
			{productBenefits?.map((item, index) => (
				<div key={`${item.benefit} ${index}`}>
					<div className="grid gap-[8px]">
						<p className="text-[20px] leading-[30px] font-inconsolata font-bold">
							{item.benefit}
						</p>
						<p className="font-helvetica">{item.whyItMatters}</p>
					</div>

					{index !== productBenefits.length && (
						<Separator className="bg-black h-[1px] my-[23px]" />
					)}
				</div>
			))}
		</div>
	);
}
