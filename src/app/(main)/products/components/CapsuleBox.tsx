import Image from "next/image";
import React from "react";

import { Separator } from "@radix-ui/react-separator";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import type { ISubscriptionModel } from "@/utils/models/ISubscriptionModel";
const generateImage = (count: number) => (
	<div
		className="flex justify-center mx-auto relative h-[24px]"
		style={{ width: `${20 * count}px` }}
	>
		{Array.from({ length: count }).map((_, index) => (
			<Image
				key={`pill-${index}`}
				className="absolute"
				style={{
					left: `${index * 20}px`,
				}}
				src="/images/icons/pillow-icon.svg"
				alt={`pillow icon ${index + 1}`}
				width={24}
				height={24}
			/>
		))}
	</div>
);

const options = [
	{
		value: "1",
		title: "1 Capsule per Day",
		subtitle1: "General wellness",
		description: "Heart health, energy, 40+.",
		subtitle2: "Early Fertility",
		description2: "Mitochondrial support for egg/sperm quality.",
		image: generateImage(1),
	},
	{
		value: "2",
		title: "2 Capsules per Day",
		subtitle1: "Mild fatigue",
		description: "Energy, cardio boost, active individuals.",
		subtitle2: "Anti-aging",
		description2: "Mitochondrial function, antioxidant support.",
		image: generateImage(2),
	},
	{
		value: "3",
		title: "3 Capsules per Day",
		subtitle1: "Moderate fatigue",
		description: "Recovery, athletes, physical training.",
		subtitle2: "Advanced Fertility",
		description2: "Energy support during IVF.",
		image: generateImage(3),
	},
	{
		value: "4",
		title: "4 Capsules per Day",
		subtitle1: "Therapeutic",
		description: "Heart health, weightlifting recovery.",
		subtitle2: "Advanced anti-aging",
		description2: "High-dose longevity support.",
		image: generateImage(4),
	},
] as ISubscriptionModel[];
const descriptions = [
	{
		value: "1",
		title: "3 Month Subscription (180 Capsules)",
		price: 45,
		rrp: 144,
		percent: 65,
		option: "1 Capsules Per Day",
		description:
			"Boosts energy and cardiovascular health for active individuals, such as runners or those starting strength training. Enhances mitochondrial function and antioxidant protection, helping combat signs of aging for men and women.",
	},
	{
		value: "2",
		title: "3 Month Subscription (180 Capsules)",
		price: 45,
		rrp: 144,
		percent: 65,
		option: "2 Capsules Per Day",
		description:
			"Boosts energy and cardiovascular health for active individuals, such as runners or those starting strength training. Enhances mitochondrial function and antioxidant protection, helping combat signs of aging for men and women.",
	},
	{
		value: "3",
		title: "3 Month Subscription (180 Capsules)",
		price: 45,
		rrp: 144,
		percent: 65,
		option: "3 Capsules Per Day",
		description:
			"Boosts energy and cardiovascular health for active individuals, such as runners or those starting strength training. Enhances mitochondrial function and antioxidant protection, helping combat signs of aging for men and women.",
	},
	{
		value: "4",
		title: "3 Month Subscription (180 Capsules)",
		price: 45,
		rrp: 144,
		percent: 65,
		option: "4 Capsules Per Day",
		description:
			"Boosts energy and cardiovascular health for active individuals, such as runners or those starting strength training. Enhances mitochondrial function and antioxidant protection, helping combat signs of aging for men and women.",
	},
] as const;

export default function CapsuleBox() {
	const [selected, setSelected] = React.useState("2");
	const currentOption = descriptions.find((d) => d.value === selected);

	return (
		<div className="grid  gap-[5px]">
			<RadioGroup
				value={selected}
				onValueChange={setSelected}
				className="md:grid-cols-4"
			>
				{options.map((option) => (
					<div
						key={option.value}
						onClick={() => setSelected(option.value.toString())}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								setSelected(option.value.toString());
							}
						}}
						className={`grid gap-[8px] p-[8px] relative cursor-pointer ${selected === option.value ? "outline outline-[2px] outline-blue border-b-transparent pb-[7px] mb-[-2px]" : "border-[1px] border-grey18"}  `}
					>
						<div className="grid gap-[8px] justify-center">
							<RadioGroupItem value={option.value} className="mx-auto" />

							{option.image}
						</div>

						<p className="text-[12px] leading-[13px] font-bold font-helvetica text-center">
							{option.title}
						</p>

						<Separator className="bg-grey13 h-[1px]" />

						<div className="grid gap-[4px]">
							<p className="text-grey6 text-[14px] leading-[16px]">
								{option.subtitle1}
							</p>
							<p className="text-grey7 text-[12px] leading-[14px]">
								{option.description}
							</p>
						</div>

						{currentOption?.value === option.value.toString() && (
							<div className="hidden md:flex absolute bottom-[-10px] w-full h-[20px] bg-white" />
						)}

						<Separator className="bg-grey13 h-[1px]" />

						<div className="grid gap-[4px]">
							<p className="text-grey6 text-[14px] leading-[16px] font-helvetica">
								{option.subtitle2}
							</p>
							<p className="text-grey7 text-[12px] leading-[13px]">
								{option.description2}
							</p>
						</div>

						{currentOption?.value === option.value.toString() && (
							<Separator className="md:hidden bg-grey13 h-[1px]" />
						)}
						{currentOption?.value === option.value.toString() && (
							<div
								key={currentOption?.option}
								className="grid md:hidden gap-[8px]"
							>
								<div className="flex justify-between gap-[7px]">
									<p className="text-grey7 text-[12px] leading-[14px] max-w-[132px]">
										{currentOption.title}
									</p>
									<div className="max-w-[164px] grid grid-cols-2 gap-[7px]">
										<div className="flex flex-col gap-[7px] text-[16px] leading-[18px] font-bold">
											£{currentOption.price}.00{" "}
											<span className="text-[10px] leading-[11.5px] font-bold text-grey1">
												(£0.25/capsule)
											</span>
										</div>

										<div>
											<div className="text-[16px] leading-[18px] text-grey4">
												RRP{" "}
												<span className="text-[16px] leading-[18px] font-bold">
													£{currentOption.rrp}{" "}
												</span>
											</div>
											<div className="text-[16px] leading-[18px] font-bold text-blue">
												{currentOption.percent}% OFF
											</div>
										</div>
									</div>
								</div>

								<div className="flex flex-col gap-[2px]">
									<p className="text-grey7 text-[12px] leading-[13px]">
										{currentOption.option}
									</p>
									<p className="text-[12px] leading-[13px]">
										{currentOption.description}
									</p>
								</div>
							</div>
						)}
					</div>
				))}
			</RadioGroup>

			{currentOption && (
				<div
					key={currentOption?.option}
					className="hidden md:grid grid-cols-[132px_1fr] gap-[16px] outline outline-[2px] outline-blue p-[16px]"
				>
					<div className="grid gap-[7px]">
						<p className="text-grey7 text-[12px] leading-[14px]">
							{currentOption.title}
						</p>
						<div className="flex items-center gap-[2px] text-[16px] leading-[18px] font-bold">
							£{currentOption.price}.00{" "}
							<span className="text-[10px] leading-[11.5px] font-bold text-grey1">
								(£0.25/capsule)
							</span>
						</div>
						<div>
							<div className="text-[16px] leading-[18px] text-grey4">
								RRP{" "}
								<span className="text-[16px] leading-[18px] font-bold">
									£{currentOption.rrp}{" "}
								</span>
							</div>
							<div className="text-[16px] leading-[18px] font-bold text-blue">
								{currentOption.percent}% OFF
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-[2px]">
						<p className="text-grey7 text-[12px] leading-[13px]">
							{currentOption.option}
						</p>
						<p className="text-[12px] leading-[13px]">
							{currentOption.description}
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
