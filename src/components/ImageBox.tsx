import Image from "next/image";

import type { ICorporationModel } from "@/utils/models/ICorporationModel";

const iconDetails = [
	{
		id: 1,
		file: "heart-pulse-icon.svg",
		alt: "Checkmark icon",
		title: "Heart Health",
	},
	{ id: 2, file: "baby-icon.svg", alt: "Baby icon", title: "Fertility" },
	{ id: 3, file: "energy-icon.svg", alt: "Energy icon", title: "Energy" },
	{
		id: 4,
		file: "dumbell-icon.svg",
		alt: "Dumbell icon",
		title: "Weight Training",
	},
	{
		id: 5,
		file: "hourglass-icon.svg",
		alt: "Hourglass icon",
		title: "Healthy Aging",
	},
	{ id: 6, file: "tree-icon.svg", alt: "Tree icon", title: "Longevity" },
	{ id: 7, file: "athletes-icon.svg", alt: "Athletes icon", title: "Athletes" },
	{
		id: 8,
		file: "brain-icon.svg",
		alt: "Brain icon",
		title: "Cognitive Function",
	},
	{
		id: 9,
		file: "water-drop-icon.svg",
		alt: "Water drop icon",
		title: "Skin Health",
	},
];

const listOfImages = iconDetails.map(({ id, file, alt, title }) => ({
	id,
	src: `/images/icons/${file}`,
	alt,
	title,
})) as ICorporationModel[];

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
