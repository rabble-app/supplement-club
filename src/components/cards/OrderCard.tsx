import Image from "next/image";

import type IOrderCardModel from "@/utils//models/IOrderCardModel";

export default function OrderCard(model: Readonly<IOrderCardModel>) {
	return (
		<div
			className={`grid gap-[8px] items-center ${model.src ? "grid-cols-[61px_1fr] md:grid-cols-[61px_1fr_210px]" : "md:grid-cols-[1fr_210px]"}`}
		>
			{model.src && (
				<Image src={model.src} alt={model.alt} width={61} height={61} />
			)}
			<div className="grid gap-[8px]">
				<p className="text-[14px] leading-[14px] font-inconsolata text-grey4">
					{model.description}
				</p>
				<p className="text-[16px] leading-[16px] font-[600] font-inconsolata">
					{model.name}
				</p>
				{model.delivery && (
					<p className="text-[14px] leading-[14px] font-inconsolata text-grey4">
						{model.delivery}
					</p>
				)}
				<div className="flex md:hidden">{model.children}</div>
			</div>
			<div className="md:flex hidden justify-end">{model.children}</div>
		</div>
	);
}
