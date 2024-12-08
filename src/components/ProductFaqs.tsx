import Image from "next/image";

import { Separator } from "@radix-ui/react-separator";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
	{
		id: 1,
		image: "/images/icons/cells-icon.svg",
		imageAlt: "snowflake icon",
		question: "Aging (40+)",
		title: "Why Ubiquinol Matters",
		description:
			"As you age, your body produces less Ubiquinol, reducing your ability to create ATP, the energy your cells need to function. This leads to low energy, slower recovery, and reduced heart health. Ubiquinol helps replenish the active form of CoQ10, restoring cellular energy and protecting against oxidative stress.",
		optionName: "Benefits",
		options: [
			"Increased energy levels ",
			"Improved heart health",
			"Slows down the aging process by reducing oxidative damage to cells",
		],
	},
	{
		id: 2,
		image: "/images/icons/heart-pulse-icon.svg",
		imageAlt: "heart pulse icon",
		question: "Heart Health",
		title: "",
		description: "",
		optionName: "",
		options: [],
	},
	{
		id: 3,
		image: "/images/icons/dumbell-icon.svg",
		imageAlt: "Dumbell icon",
		question: "Training/Athletics",
		title: "",
		description: "",
		optionName: "",
		options: [],
	},
	{
		id: 4,
		image: "/images/icons/hourglass-icon.svg",
		imageAlt: "Hourglass icon",
		question: "Anti Aging",
		title: "",
		description: "",
		optionName: "",
		options: [],
	},
	{
		id: 5,
		image: "/images/icons/baby-icon.svg",
		imageAlt: "Baby icon",
		question: "Fertility",
		title: "",
		description: "",
		optionName: "",
		options: [],
	},
	{
		id: 6,
		image: "/images/icons/energy-icon.svg",
		imageAlt: "Energy icon",
		question: "Energy and Fatigue",
		title: "",
		description: "",
		optionName: "",
		options: [],
	},
	{
		id: 7,
		image: "/images/icons/brain-icon.svg",
		imageAlt: "Brain icon",
		question: "Brain Health",
		title: "",
		description: "",
		optionName: "",
		options: [],
	},
];

export default function ProductFaqs() {
	return (
		<div>
			{faqs.map((faq, index) => (
				<Accordion key={faq.id} type="single" collapsible>
					<Separator
						className={`${index === faqs.length - 1 ? "" : ""} bg-black h-[1px]`}
					/>
					<AccordionItem value="products">
						<AccordionTrigger>
							<div className="grid gap-[16px] grid-cols-[32px_1fr] items-center text-[26px] leading-[27px] font-inconsolata font-bold text-black">
								<Image
									src={faq.image}
									alt={faq.imageAlt}
									width={32}
									height={32}
								/>{" "}
								{faq.question}
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<div className="mt-[-8px]">
								<p className="text-[20px] leading-[30px] font-bold font-inconsolata mb-[8px]">
									{faq.title}
								</p>
								<div className="text-[16px] leading-[24px] font-helvetica mb-[16px]">
									{faq.description}
								</div>
								{faq.optionName && (
									<div className="text-[16px] leading-[24px] font-bold font-helvetica italic mb-[8px]">
										{faq.optionName}
									</div>
								)}
								{faq.options && (
									<ul className="list-disc list-inside">
										{faq.options.map((option) => (
											<li className="pl-[10px]" key={option}>
												{option}
											</li>
										))}
									</ul>
								)}
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			))}
		</div>
	);
}
