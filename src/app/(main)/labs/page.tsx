import Image from "next/image";

import Faqs from "@/components/main/Faqs";
import ProductInfo from "@/components/main/ProductInfo";
import GoalCardComponent from "@/components/main/labs/GoalCard";
import LaboratoryCard from "@/components/main/labs/LaboratoryCard";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

import { productService } from "@/services/productService";
import type { IGoalCardModel } from "@/utils/models/IGoalCardModel";
import type ILaboratoryCardModel from "@/utils/models/ILaboratoryCardModel";

export default async function Labs() {
	const laboratories = [
		{
			id: 1,
			logo: "/images/balchem.svg",
			altLogo: "Balchem logo",
			title: "Balchem Corporation",
			country: "USA",
			description:
				"Balchem is known for creating some of the highest-quality chelated minerals in the market, designed to optimize nutrient absorption. Balchem’s proprietary chelation technology binds essential minerals like zinc, copper, and magnesium to amino acids, significantly enhancing bioavailability and supporting various biological functions with superior efficiency.",
			url: "https://www.balchem.com",
		},
		/*{
			id: 2,
			logo: "/images/astraReal.svg",
			altLogo: "AstraReal logo",
			title: "AstaReal Corporation",
			country: "USA",
			description:
				"AstaReal is a leading global producer of natural astaxanthin, known for its high quality and extensive research backing. Their proprietary cultivation process uses Haematococcus pluvialis microalgae grown in fully enclosed, controlled environments to ensure optimal purity and stability.",
		}, */
		{
			id: 3,
			logo: "/images/alzchem_480.png",
			altLogo: "Alzchem Group AG logo",
			title: "Alzchem Group AG",
			country: "Germany",
			description:
				"Alzchem is recognized for producing Creapure®, the highest-purity creatine monohydrate, designed to optimize muscle performance, cognitive function, and energy production. Manufactured in Trostberg, Germany, under cGMP and ISO 9001 standards, Creapure® undergoes rigorous quality control, ensuring it is free from contaminants like DCD and DHT. Its exceptional purity and efficacy make it the gold standard for longevity research, brain health, and athletic performance",
			url: "https://www.creapure.com",
		},
		{
			id: 4,
			logo: "/images/kapeka.svg",
			altLogo: "Kapeka logo",
			title: "Kapeka Corporation",
			country: "JAPAN",
			description:
				"Kaneka Corporation is a global leader in the development and production of high-performance materials, chemicals, and health products. Founded in Japan in 1949, the company has expanded into diverse industries, including pharmaceuticals, food products, and synthetic fibers. Kaneka is known for its focus on research and development, creating products that support better health, sustainability, and innovative solutions in various fields.",
			url: "https://www.kaneka.com",
		},
	] as ILaboratoryCardModel[];

	const goalCards = [
		{
			id: 1,
			icon: "/images/icons/bed-icon.svg",
			altIcon: "Bed icon",
			title: "Sleep",
			image: "/images/bed.svg",
			altImage: "Bed image",
			description: "Optimize your sleep patterns.",
			url: "/products?goal=reduce-anxiety-and-stress",
		},
		{
			id: 2,
			icon: "/images/icons/brain-icon.svg",
			altIcon: "Brain icon",
			title: "Cognitive Funtion",
			image: "/images/brain.svg",
			altImage: "Brain image",
			description: "Enhance your brain’s performance and connectivity.",
			url: "/products?goal=boost-focus-and-memory",
		},
		{
			id: 3,
			icon: "/images/icons/health-icon.svg",
			altIcon: "Health icon",
			title: "Foundational Health",
			image: "/images/health.svg",
			altImage: "Health image",
			description: "Promoting healthy, natural deep sleep day to day.",
			url: "/products?goal=age-gracefully-and-healthily",
		},
		{
			id: 4,
			icon: "/images/icons/athlete-icon.svg",
			altIcon: "Athlete icon",
			title: "Athletic Performance",
			image: "/images/athlete.svg",
			altImage: "Athlete image",
			description: "Increase your health tissue, muscle, and energy.",
			url: "/products?goal=Athletics",
		},
		{
			id: 5,
			icon: "/images/icons/lightning-icon.svg",
			altIcon: "Lightning icon",
			title: "Hormone Support",
			image: "/images/lightning.svg",
			altImage: "Lightning image",
			description: "Boost your mood, libido, and vitality.",
			url: "/products?goal=mood-and-anxiety",
		},
	] as IGoalCardModel[];

	const product = await productService.product(
		process.env.NEXT_PUBLIC_PRODUCT_ID as string,
	);

	return (
		<div className="md:pt-[57px] bg-grey11 md:bg-transparent grid gap-[80px] md:gap-[140px]">
			<div className="lg:max-w-[1312px] lg:mx-[auto] w-full p-[16px] grid pt-[32px] md:pt-[0] md:grid-cols-[480px_1fr] gap-[40px] md:gap-x-[52px]">
				<div className="flex flex-col justify-between order-1 gap-[32px]">
					<div>
						<h1 className="text-[32px] md:text-[48px] leading-[38px] md:leading-[57px] font-[400] text-black4 pb-[32px] md:pb-[16px] font-hagerman">
							Take Control of Your Supplement Choices with Full Transparency
						</h1>
						<p className="text-grey6">
							Know exactly where your ingredients come from—trust the science,
							not brand marketing.
						</p>
					</div>
					<p className="font-bold text-blue underline  break-words">
						Make informed decisions about your supplements. Get access to the
						highest-quality ingredients—without the markups.
					</p>
				</div>

				<div className="grid order-2 pb-[18px] md:pb-[0]">
					<div className="bg-yellow p-[8px] text-[14px] leading-[28px] text-black h-[44px] font-inconsolata font-bold">
						POWER AND AFFORDABILITY IN NUMBERS
					</div>
					<div className="grid grid-cols-2 gap-[37px] mt-[19px] md:mt-[8px]">
						<div className="text-[60px] md:text-[89px] leading-[68px] font-[600] md:leading-[95px] text-black grid gap-[10px] md:gap-[8px] font-inconsolata">
							100%
							<p className="leading-[28px] font-[700] text-black font-helvetica">
								Traceability
							</p>
						</div>
						<div className="text-[60px] md:text-[89px] leading-[68px] font-[600] md:leading-[95px] text-black grid gap-[10px] md:gap-[8px] font-inconsolata">
							43%
							<p className="leading-[28px] font-[700] text-black font-helvetica">
								Cheaper on Average
							</p>
						</div>
					</div>

					<div className="text-grey6 whitespace-pre-line mt-[32px] md:mt-[40px]">
						At Supplement Club, we source ingredients directly from the
						world&apos;s leading laboratories, ensuring the highest purity and
						potency. Without middlemen or unnecessary markups, every product
						is third-party tested for quality and effectiveness.
						<br />
						<br />
						Unlike many brands that dilute their formulas with cheaper
						ingredients and offer vague labels, we provide clear, transparent
						sourcing. You&apos;ll know exactly how much of each active
						ingredient you&apos;re getting and why it works—no fillers, no
						hidden formulas.
						<br />
						<br />
						We partner with laboratories focused on ingredient
						integrity and clinical efficacy, so you can make informed decisions
						based on science rather than marketing. Our supplements deliver only
						what&apos;s needed, at a fraction of the cost.
					</div>
				</div>
			</div>

			<div className="lg:max-w-[1312px] lg:mx-[auto] p-[16px] w-[calc(100vw-32px)] md:w-auto">
				<div className="grid md:grid-cols-[1fr_335px]">
					<div>
						<p className="text-[24px] md:text-[56px] leading-[28px] md:leading-[67px] font-[400] text-black font-hagerman">
							Meet the Laboratories
						</p>
						<div className="md:max-w-[550px] text-[14px] md:text-[20px] leading-[21px] md:leading-[30px] text-grey6 font-inconsolata">
							Supplement industry is plagued by subpar ingredients that
							don&apos;t work. Know where your ingredients are coming from.
						</div>
					</div>
				</div>

				<Carousel className="mt-[100px] md:my-[24px]">
					<CarouselPrevious className="absolute left-[0] md:left-[calc(100%-160px)] top-[-55px] md:top-[-50px] h-[52px] w-[64px] rounded-[0] text-blue border-blue" />
					<CarouselNext className="absolute right-[calc(100%-144px)] md:right-0 top-[-55px] md:top-[-50px] h-[52px] w-[64px] rounded-[0] text-blue border-blue" />

					<CarouselContent className="md:-ml-1 max-h-[680px] md:max-h-auto">
						{laboratories.map((laboratory) => (
							<CarouselItem
								key={laboratory.id}
								className="p-[0] md:pr-[0] md:pl-[16px] min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/3"
							>
								<LaboratoryCard {...laboratory} />
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>

			<div className="lg:max-w-[1312px] lg:mx-[auto] w-full p-[16px] grid md:grid-cols-3 md:gap-x-[16px] gap-y-[54px]">
				<div className="flex flex-col gap-[10px]">
					<p className="text-[32px] leading-[36px] font-[400] text-black font-hagerman">
						Shop by Goal
					</p>
					<p className="text-grey6">
						Know exactly where your ingredients come from—trust the science, not
						brand marketing.
					</p>
				</div>

				{goalCards.map((card) => (
					<GoalCardComponent key={card.id} {...card} />
				))}
			</div>

			<div className="lg:max-w-[1312px] lg:mx-[auto] w-full p-[16px] grid gap-[16px] md:gap-[0] md:grid-cols-2">
				<div>
					<div className="font-inconsolata text-[24px] leading-[24px] font-[700] flex items-center justify-center bg-blue text-white h-[60px] rounded-t-[8px] md:rounded-tr-[0] md:rounded-tl-[8px] border-b-[1px] border-solid border-white">
						Supplement Club
					</div>
					<div className="flex gap-[3px] items-center bg-blue text-white h-[60px] leading-[16px] py-[12px] px-[18px] md:p-[18px] border-b-[1px] border-solid border-white">
						<Image
							src="/images/icons/user-profile-group-icon.svg"
							className="mb-auto"
							alt="User profile group icon"
							width={24}
							height={24}
						/>
						Our offering is so valuable Customers join us Through Word of Mouth
					</div>
					<div className="flex gap-[3px] items-center bg-blue text-white h-[60px] leading-[17px] p-[18px] border-b-[1px] border-solid border-white">
						<Image
							src="/images/icons/globe-icon.svg"
							className="mb-auto"
							alt="Global icon"
							width={24}
							height={24}
						/>
						Traceable from world leading labs{" "}
					</div>
					<div className="flex gap-[3px] items-center bg-blue text-white h-[60px] leading-[17px] p-[18px] rounded-b-[8px] md:rounded-bl-[8px] md:rounded-br-[0]">
						<Image
							src="/images/icons/delivery-icon.svg"
							className="mb-auto"
							alt="Delivery icon"
							width={24}
							height={24}
						/>
						Shipped Direct From Source
					</div>
				</div>
				<div>
					<div className="font-inconsolata text-[24px] leading-[24px] font-[700] flex items-center justify-center bg-yellow text-black h-[60px] rounded-t-[8px] md:rounded-tr-[8px] border-b-[1px] border-solid border-white">
						Brands
					</div>
					<div className="flex gap-[3px] items-center bg-yellow text-black h-[60px] leading-[17px] p-[18px] border-b-[1px] border-solid border-white">
						<Image
							src="/images/icons/currency-coin-icon.svg"
							className="mb-auto"
							alt="Currency coin icon"
							width={24}
							height={24}
						/>
						Forced to pay High Advertising Costs
					</div>
					<div className="flex gap-[3px] items-center bg-yellow text-black h-[60px] leading-[16px] py-[12px] px-[18px] md:p-[18px] border-b-[1px] border-solid border-white">
						<Image
							src="/images/icons/tag-icon.svg"
							className="mb-auto"
							alt="Tag icon"
							width={24}
							height={24}
						/>
						Opaque labeling of ingredients from unknown Sources
					</div>
					<div className="flex gap-[3px] items-center bg-yellow text-black h-[60px] leading-[16px] py-[12px] px-[18px] md:p-[18px] rounded-b-[8px] md:rounded-br-[8px] md:rounded-bl-[0]">
						<Image
							src="/images/icons/snowflake-icon.svg"
							className="mb-auto"
							alt="Snowflake icon"
							width={24}
							height={24}
						/>
						Stored in third party warehouses for long periods
					</div>
				</div>
			</div>

			<ProductInfo product={product} />

			<div className="lg:max-w-[1312px] lg:mx-[auto] w-full p-[16px]">
				<Faqs />
			</div>
		</div>
	);
}
