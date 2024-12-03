import Image from "next/image";
import Link from "next/link";

import type IManagerOptionCardModel from "@/utils/models/IManagerOptionCardModel";

export default function ManagerOptionCard(
	model: Readonly<IManagerOptionCardModel>,
) {
	return (
		<Link
			href={model.link}
			className="text-[16px] leading-[18px] p-[16px] border-[1px] border-grey3 grid grid-cols-[24px_1fr_24px] gap-[8px] items-center"
		>
			<Image src={model.image} alt={model.imageAlt} width={24} height={24} />
			{model.title}
			<Image
				src="/images/icons/chevron-right-icon.svg"
				alt="Chevron right icon"
				width={24}
				height={24}
			/>
		</Link>
	);
}
