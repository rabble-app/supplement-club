import { Separator } from "@radix-ui/react-separator";

const items = [
	{
		id: 1,
		title: "Why Ubiquinol is Essential for Your Health",
		description:
			"Ubiquinol powers cellular energy production and protects your cells from oxidative stress, making it vital for staying healthy, energetic, and vibrant as you age.",
	},
	{
		id: 2,
		title: "Boosts Cellular Energy",
		description:
			"Ubiquinol is key to making ATP, the fuel your cells need to function. Think of ATP as the battery that powers everything from muscle movement to heart function. Without enough ATP, your body slows down, causing fatigue and reduced performance.",
	},
	{
		id: 3,
		title: "Protects Against Free Radicals",
		description:
			"Ubiquinol acts as a shield against free radicals—unstable molecules that damage your cells. These molecules are produced during normal activities (like exercising) and from external factors (like pollution). Ubiquinol helps neutralize them, preventing cell damage and slowing down the aging process, especially in vital organs like your heart, brain, and muscles.",
	},
	{
		id: 4,
		title: "Supports Healthy Aging",
		description:
			"As you age, your body produces less Ubiquinol, which means less ATP and fewer antioxidants. This leads to low energy, slower recovery, and reduced heart health. Supplementing with Ubiquinol helps restore these vital functions and keeps you feeling energized and youthful.",
	},
];
export default function PreOrderInfo() {
	return (
		<div>
			{items.map((item, index) => (
				<div key={item.id}>
					<div className="grid gap-[8px]">
						<p
							className={`${item.id === 1 ? "text-[26px] leading-[39px] font-inconsolata font-bold" : "text-[20px] leading-[30px] font-inconsolata font-bold"}`}
						>
							{item.title}
						</p>
						<p className="font-helvetica">{item.description}</p>
					</div>

					{index < items.length - 1 && (
						<Separator className="bg-black h-[1px] my-[23px]" />
					)}
				</div>
			))}
		</div>
	);
}
