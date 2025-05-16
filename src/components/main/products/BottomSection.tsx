import Image from "next/image";

const lastSectionItems = [
	{
		id: 1,
		image: "/images/icons/science-icon.svg",
		imageAlt: "Science icon",
		title: "Science-driven nutrition supplment",
	},
	{
		id: 2,
		image: "/images/icons/wheat-bread-icon.svg",
		imageAlt: "Wheat bread-icon",
		title: "Over 70 ingredients your body can easily absorb",
	},
	{
		id: 3,
		image: "/images/icons/check-broken-icon.svg",
		imageAlt: "Check broken icon",
		title: "Certified by Cologne List",
	},
	{
		id: 4,
		image: "/images/icons/sweet-candy-icon.svg",
		imageAlt: "Sweet candy icon",
		title: "Optimised for flavour without artificial sweetners",
	},
	{
		id: 5,
		image: "/images/icons/female-inventor-icon.svg",
		imageAlt: "Female inventor icon",
		title: "Trusted by leading scientists and experts",
	},
	{
		id: 6,
		image: "/images/icons/refresh-cvv-icon.svg",
		imageAlt: "Refresh icon",
		title: "Continuously improved since 2010",
	},
];

export default function BottomSection() {
	return (
		<div className="grid grid-cols-2 md:grid-cols-3 gap-x-[16px] gap-y-[16px]">
			{lastSectionItems.map((item) => (
				<div
					key={item.id}
					className="grid gap-[8px] grid-cols-[24px_1fr] items-start text-[12px] leading-[14px] font-helvetica"
				>
					<Image
						src={item.image}
						alt={item.imageAlt}
						width={24}
						height={24}
						priority
					/>{" "}
					{item.title}
				</div>
			))}
		</div>
	);
}
