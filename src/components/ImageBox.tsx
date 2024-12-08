import Image from "next/image";

import type { ICorporationModel } from "@/utils/models/ICorporationModel";

const listOfImages = [
	{
		id: 1,
		src: "/images/icons/heart-pulse-icon.svg",
		alt: "Checkmark icon",
		title: "Heart Health",
	},
	{
		id: 2,
		src: "/images/icons/baby-icon.svg",
		alt: "Baby icon",
		title: "Fertility",
	},
	{
		id: 3,
		src: "/images/icons/energy-icon.svg",
		alt: "Energy icon",
		title: "Energy",
	},
	{
		id: 4,
		src: "/images/icons/dumbell-icon.svg",
		alt: "Dumbell icon",
		title: "Weight Training",
	},
	{
		id: 5,
		src: "/images/icons/hourglass-icon.svg",
		alt: "Hourglass icon",
		title: "Healthy Aging",
	},
	{
		id: 6,
		src: "/images/icons/tree-icon.svg",
		alt: "Tree icon",
		title: "Longevity",
	},
	{
		id: 7,
		src: "/images/icons/athletes-icon.svg",
		alt: "Athletes icon",
		title: "Athletes",
	},
	{
		id: 8,
		src: "/images/icons/brain-icon.svg",
		alt: "Brain icon",
		title: "Cognitive Function",
	},
	{
		id: 9,
		src: "/images/icons/water-drop-icon.svg",
		alt: "Water drop icon",
		title: "Skin Health",
	},
] as ICorporationModel[];

export default function ImageBox() {
	return (
		<div className="h-[56px] border-[1px] border-grey18 flex justify-center items-center gap-[16px]">
			{listOfImages.map((image) => (
				<Image
					key={image.id}
					src={image.src}
					alt={image.alt}
					width={24}
					height={24}
				/>
			))}
		</div>
	);
}
