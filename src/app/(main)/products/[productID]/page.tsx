"use client";
import ReferFriends from "@/components/ReferFriends";
import OrderCard from "@/components/cards/OrderCard";
import TotalCard from "@/components/cards/TotalCard";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@radix-ui/react-separator";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import ProfuctTable from "../components/ProductTable";
import ReferalDiscounts from "../components/ReferalDiscounts";
import Subscription from "../components/Subscription";
import TeamPrice from "../components/TeamPrice";

const StickyFooter = dynamic(() => import("@/components/StickyFooter"), {
	ssr: false,
});

const images = [
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
];

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

const productImages = [
	{
		id: 1,
		image: "/images/supplement1.png",
		imageAlt: "Supplement image",
	},
	{
		id: 2,
		image: "/images/supplement1.png",
		imageAlt: "Supplement image",
	},
	{
		id: 3,
		image: "/images/supplement1.png",
		imageAlt: "Supplement image",
	},
	{
		id: 4,
		image: "/images/supplement1.png",
		imageAlt: "Supplement image",
	},
	{
		id: 5,
		image: "/images/supplement1.png",
		imageAlt: "Supplement image",
	},
	{
		id: 6,
		image: "/images/supplement1.png",
		imageAlt: "Supplement image",
	},
];

interface ProductDetailsProps {
	params: { productID: string };
}

export default function ProductDetails({
	params,
}: { params: Promise<ProductDetailsProps> }) {
	const [api, setApi] = React.useState<CarouselApi>();
	const [current, setCurrent] = React.useState(0);
	const [count, setCount] = React.useState(0);
	console.log(params);

	React.useEffect(() => {
		if (!api) {
			return;
		}

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);
	const [loggedIn] = React.useState(true);

	return (
		<div className="grid md:grid-cols-2 gap-[16px] min-h-screen container-width relative overflow-hidden">
			<div className="contents md:grid gap-[32px]">
				<Carousel
					setApi={setApi}
					className="w-full relative order-1 md:order-none pt-[53px] md:pt-[0]"
				>
					<CarouselContent>
						{productImages.map((i) => (
							<CarouselItem key={i.id}>
								<Image
									src={i.image}
									alt={i.imageAlt}
									width={700}
									height={700}
								/>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="hidden md:flex absolute left-[16px] rounded-[50%] h-[48px] w-[48px] text-black border-black p-0 bg-white" />
					<CarouselNext className="hidden md:flex absolute right-[16px] rounded-[50%] h-[48px] w-[48px] text-black border-black p-0 bg-white" />

					<div className="hidden md:flex left-1/2 transform -translate-x-1/2 absolute bottom-[20px]">
						<div className="flex gap-[8px]">
							{Array.from({ length: count }).map((item, index) => (
								<div
									key={index}
									className={
										current === index + 1
											? "h-[8px] w-[8px] rounded-[50%] bg-black"
											: "h-[8px] w-[8px] rounded-[50%] bg-grey2"
									}
								/>
							))}
						</div>
					</div>

					<div className="flex justify-between items-center md:hidden">
						<p className="leading-[18px] text-grey4 mb-[2px]">
							Quarterly Subscription
						</p>
						<div className="grid grid-cols-[24px_28px] gap-[4px] text-blue text-[16px] leading-[24px]">
							<Image
								src="/images/icons/user-profile-group-blue-icon.svg"
								className="mb-auto"
								alt="User profile group icon"
								width={24}
								height={24}
							/>
							678
						</div>
					</div>
				</Carousel>

				<div className="order-3 md:order-none bg-grey11 md:bg-transparent mx-[-16px] md:mx-[0] px-[16px] md:px-[0]">
					<TeamPrice members={175} />

					<div className="grid gap-[60px] mt-[51px] md:mt-[0]">
						<div className="grid gap-[24px]">
							<div className="grid gap-[8px]">
								<p className="text-[26px] leading-[39px] font-inconsolata font-bold">
									Why Ubiquinol is Essential for Your Health
								</p>
								<p className="font-helvetica">
									Ubiquinol powers cellular energy production and protects your
									cells from oxidative stress, making it vital for staying
									healthy, energetic, and vibrant as you age.S
								</p>
							</div>

							<Separator className="bg-black h-[1px]" />

							<div className="grid gap-[8px]">
								<p className="text-[20px] leading-[30px] font-inconsolata font-bold">
									Boosts Cellular Energy
								</p>
								<p>
									Ubiquinol is key to making ATP, the fuel your cells need to
									function. Think of ATP as the battery that powers everything
									from muscle movement to heart function. Without enough ATP,
									your body slows down, causing fatigue and reduced performance.
								</p>
							</div>

							<Separator className="bg-black h-[1px]" />

							<div className="grid gap-[8px]">
								<p className="text-[20px] leading-[30px] font-inconsolata font-bold">
									Protects Against Free Radicals
								</p>
								<p>
									Ubiquinol acts as a shield against free radicals—unstable
									molecules that damage your cells. These molecules are produced
									during normal activities (like exercising) and from external
									factors (like pollution). Ubiquinol helps neutralize them,
									preventing cell damage and slowing down the aging process,
									especially in vital organs like your heart, brain, and
									muscles.
								</p>
							</div>

							<Separator className="bg-black h-[1px]" />

							<div className="grid gap-[8px]">
								<p className="text-[20px] leading-[30px] font-inconsolata font-bold">
									Supports Healthy Aging
								</p>
								<p>
									As you age, your body produces less Ubiquinol, which means
									less ATP and fewer antioxidants. This leads to low energy,
									slower recovery, and reduced heart health. Supplementing with
									Ubiquinol helps restore these vital functions and keeps you
									feeling energized and youthful.
								</p>
							</div>
						</div>

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

						<ProfuctTable />

						<div className="grid grid-cols-2 md:grid-cols-3 gap-x-[16px] gap-y-[16px] mb-[75px] md:mb-[84px]">
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
									/>{" "}
									{item.title}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-[16px] md:gap-[24px] order-2 md:order-none">
				<Breadcrumb className="p-[16px] md:p-[0] md:pt-[32px] absolute top-[0] left-[0] md:relative w-full bg-grey11 md:bg-transparent">
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink
								className="text-[14px] leading-[21px] font-[400] font-roboto text-black"
								href="/"
							>
								Home
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage className="text-[14px] leading-[21px] font-[600] font-roboto">
								Coenzyme Q10 Ubiquinol Kaneka TM
							</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<div className="grid gap-[8px]">
					<p className="text-[20px] leading-[24px] md:font-[500] font-inconsolata md:text-grey4">
						KANEKA CORPRATION
					</p>
					<div className="text-[24px] md:text-[40px] leading-[28px] md:leading-[48px] font-hagerman">
						Coenzyme Q10 Ubiquinol Kaneka TM
					</div>
					<div className="flex items-center gap-[8px]">
						<Image
							src="/images/icons/link-icon.svg"
							alt="security-card-icon"
							width={24}
							height={24}
						/>
						<p className="text-[14px] leading-[16px] text-grey6">100mg</p>
					</div>
				</div>

				<div className="flex flex-col gap-[16px] font-helvetica">
					<p>
						Ubiquinol is the body-ready and active form of CoQ10 important for
						virtually every cell in the body. It powers cellular energy
						production and protects your cells from oxidative stress, making it
						vital for staying healthy, energetic, and vibrant as you age.
						<br />
						<br />
						Kaneka Corporation are the leading manufacturer based in Japan.
					</p>
					<div className="h-[56px] border-[1px] border-grey18 flex justify-center items-center gap-[16px]">
						{images.map((image) => (
							<Image
								key={image.id}
								src={image.src}
								alt={image.alt}
								width={24}
								height={24}
							/>
						))}
					</div>
				</div>

				{!loggedIn && (
					<div className="flex flex-col gap-[24px]">
						<Subscription />

						<OrderCard
							id={2}
							alt="ubiquinol"
							description="86 Capsules to see you to Q1 "
							name="One time Alignment Package"
							delivery="Delivered Tomorrow "
							src="/images/ubiquinol.svg"
						>
							<div className="text-[20px] font-bold text-black flex items-center gap-[5px] font-inconsolata">
								£23.20{" "}
								<span className="text-[12px] leading-[16px] md:leading-[12px] text-grey1 font-inconsolata">
									(£0.25 / capsule)
								</span>
							</div>
						</OrderCard>

						<Separator className="bg-grey13 h-[1px]" />

						<OrderCard
							id={1}
							alt="supplement mockup"
							description="180 Capsules Every 3 months"
							name="Quarterly Subscription"
							delivery="Next Drop Delivered: January 1st 2025"
							src="/images/supplement-mockup.svg"
						>
							<div className="text-[20px] font-bold text-black flex items-center gap-[5px] font-inconsolata">
								£45.00{" "}
								<span className="text-[12px] leading-[16px] md:leading-[12px] text-grey1 font-inconsolata">
									(£0.25 / capsule)
								</span>
							</div>
						</OrderCard>

						<Separator className="bg-grey13 h-[1px]" />

						<TotalCard
							capsules={266}
							price={68.2}
							rrp={144}
							percent={65}
							capsulePrice={0.25}
						/>

						<Button className="bg-blue text-white w-full font-bold">
							Start My Subscription
						</Button>

						<div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-[45px] md:gap-[8px]">
							<div className="grid justify-center gap-[8px] md:max-w-[166px] text-[12px] leading-[14px] text-center">
								<Image
									className="mx-auto"
									src="/images/icons/delivery-blue-icon.svg"
									alt="delivery icon"
									width={24}
									height={24}
								/>
								Free bext day delivery on all UK orders
							</div>
							<div className="grid justify-center gap-[8px] md:max-w-[166px] text-[12px] leading-[14px] text-center">
								<Image
									className="mx-auto"
									src="/images/icons/edit-contained-icon.svg"
									alt="edit contained"
									width={24}
									height={24}
								/>
								Skip, pause or cancel your subscription any time
							</div>
							<div className="grid justify-center gap-[8px] md:max-w-[166px] text-[12px] leading-[14px] text-center">
								<Image
									className="mx-auto"
									src="/images/icons/gift-icon.svg"
									alt="gift icon"
									width={24}
									height={24}
								/>
								refer a friend and both get £5 off
							</div>
						</div>
					</div>
				)}

				{loggedIn && (
					<div className="grid gap-[28px]">
						<div className="grid gap-[10px] p-[24px] bg-grey12">
							<OrderCard
								id={1}
								alt="supplement mockup"
								description="180 Capsules Every 3 months"
								name="Quarterly Subscription"
								delivery="Triggered when 50 pre-orders Complete"
								src="/images/supplement-mockup.svg"
							>
								<div className="text-[20px] font-bold text-black flex items-center gap-[5px] font-inconsolata">
									£41.00{" "}
									<span className="text-[12px] leading-[13px] md:leading-[12px] text-grey1 font-inconsolata font-bold">
										(£0.25 / capsule)
									</span>
								</div>
							</OrderCard>

							<Separator className="bg-grey13 h-[1px]" />

							<OrderCard
								id={1}
								alt="supplement mockup"
								delivery="This Quarter"
								name="Succesful Referal x 1"
							>
								<div className="text-[20px] leading- font-bold text-black flex items-center gap-[5px] font-inconsolata">
									£-5.00{" "}
								</div>
							</OrderCard>

							<Separator className="bg-grey13 h-[1px]" />

							<TotalCard
								capsules={180}
								price={36}
								rrp={144}
								percent={75}
								capsulePrice={0.21}
							/>
						</div>

						<div className="hidden md:flex">
							<ReferFriends />
						</div>

						<StickyFooter className="md:hidden pt-[32px] bg-grey11">
							<ReferFriends />
						</StickyFooter>

						<div className="bg-grey11 md:hidden h-[16px] mx-[-16px] my-[-10px]" />
						<ReferalDiscounts />
					</div>
				)}
			</div>
		</div>
	);
}
