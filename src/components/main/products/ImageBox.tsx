import { mapTagsToValues } from "@/utils/helpers";
import Image from "next/image";

export default function ImageBox({ tags }: Readonly<{ tags?: string[] }>) {
	const images = tags ? mapTagsToValues(tags) : [];
	return (
		<div className="h-[56px] border-[1px] border-grey18 flex justify-center items-center gap-[16px]">
			{images?.map((image, idx) => (
				<Image
					key={`${image} ${idx * 2}`}
					src={image}
					alt={image}
					width={24}
					height={24}
				/>
			))}
		</div>
	);
}
