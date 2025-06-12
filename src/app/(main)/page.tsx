import Faqs from "@/components/main/Faqs";
import HomeCardComponent from "@/components/main/HomeCard";
import ProductInfo from "@/components/main/ProductInfo";
import ProductCardComponent from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import MembershipBox from "@/components/main/MembershipBox";
import { productService } from "@/services/productService";
import type { IHomeCardModel } from "@/utils/models/IHomeCardModel";
import type IProductCardModel from "@/utils/models/IProductCardModel";
import { getQuarterInfo } from "@/utils/utils";

const homeCards = [
	{
		id: 1,
		src: "/images/labs.svg",
		alt: "Labs",
		title: "Straight from the Source",
		subtitle: "Don’t Trust Expensive Branding. Trust Renowned Labs",
		description:
			"Each quarter, we combine individual orders and send them collectively to the worlds most prominent lab for that product. Your individual order is shipped to your door..",
	},
	{
		id: 2,
		src: "/images/truck.svg",
		alt: "Truck",
		title: "Get Started Today",
		subtitle: "Next Day Delivery",
		description:
			"Choose the supplements you want today, and we'll ship you a 'sync package' the next day. This ensures you have enough supply to last until the next quarterly drop.",
	},
	{
		id: 3,
		src: "/images/icons/people.svg",
		alt: "People",
		title: "There’s Savings in Numbers",
		subtitle: "The More People Join the Cheaper it Gets",
		description:
			"Your sync package will align you with the rest of the country, so you’re always part of the nationwide quarterly drop. This means you’re never out of sync with the bulk ordering cycle.",
	},
] as IHomeCardModel[];

const images = [
	{
		id: 1,
		src: "/images/icons/heart-pulse-icon.svg",
		alt: "Checkmark icon",
		title: "Heart Health",
		url: "/products?category=heart-health",
	},
	{
		id: 2,
		src: "/images/icons/baby-icon.svg",
		alt: "Baby icon",
		title: "Fertility",
		url: "/products?category=fertility",
	},
	{
		id: 3,
		src: "/images/icons/bed-icon.svg",
		alt: "Bed icon",
		title: "Sleep",
		url: "/products?category=sleep",
	},
	{
		id: 4,
		src: "/images/icons/energy-icon.svg",
		alt: "Energy icon",
		title: "Energy",
		url: "/products?category=energy",
	},
	{
		id: 5,
		src: "/images/icons/hourglass-icon.svg",
		alt: "Hourglass icon",
		title: "Healthy Aging",
		url: "/products?category=healthy-aging",
	},
	{
		id: 6,
		src: "/images/icons/tree-icon.svg",
		alt: "Tree icon",
		title: "Longevity",
		url: "/products?category=longevity",
	},
	{
		id: 7,
		src: "/images/icons/dumbell-icon.svg",
		alt: "Dumbell icon",
		title: "Weight Training",
		url: "/products?category=weight-training",
	},
	{
		id: 8,
		src: "/images/icons/athletes-icon.svg",
		alt: "Athletes icon",
		title: "Athletes",
		url: "/products?category=athletes",
	},
	{
		id: 9,
		src: "/images/icons/shield-icon.svg",
		alt: "Shield icon",
		title: "Immunity",
		url: "/products?category=immunity",
	},
	{
		id: 10,
		src: "/images/icons/brain-icon.svg",
		alt: "Brain icon",
		title: "Cognitive Function",
		url: "/products?category=cognitive-function",
	},
	{
		id: 11,
		src: "/images/icons/bones-icon.svg",
		alt: "Bones icon",
		title: "Joint Health",
		url: "/products?category=joint-health",
	},
	{
		id: 12,
		src: "/images/icons/intensine-icon.svg",
		alt: "Intensine icon",
		title: "Gut Health",
		url: "/products?category=gut-health",
	},
	{
		id: 13,
		src: "/images/icons/water-drop-icon.svg",
		alt: "Water drop icon",
		title: "Skin Health",
		url: "/products?category=skin-health",
	},
	{
		id: 14,
		src: "/images/icons/flower-icon.svg",
		alt: "Flower icon",
		title: "Mood & Anxiety",
		url: "/products?category=mood-&-anxiety",
	},
];

const membershipData = [
	{
		src: "/images/membership-1.svg",
		alt: "membership1",
		width: 200,
		description:
			"Alzchem is recognized for producing Creapure®, the highest-purity creatine monohydrate, designed to optimize muscle performance, cognitive function, and energy production. Manufactured in Trostberg, Germany, under cGMP and ISO 9001 standards, Creapure® undergoes rigorous quality control, ensuring it is free from contaminants like DCD and DHT. Its exceptional purity and efficacy make it the gold standard for longevity research, brain health, and athletic performance",

		height: 66,
	},
	{
		src: "/images/membership-2.svg",
		alt: "membership2",
		width: 163,
		description:
			"Kaneka Corporation is a global leader in the development and production of high-performance materials, chemicals, and health products. Founded in Japan in 1949, the company has expanded into diverse industries, including pharmaceuticals, food products, and synthetic fibers. Kaneka is known for its focus on research and development, creating products that support better health, sustainability, and innovative solutions in various fields.",

		height: 72,
	},
	{
		src: "/images/membership-3.svg",
		alt: "membership3",
		width: 244,
		description:
			"Balchem is known for creating some of the highest-quality chelated minerals in the market, designed to optimize nutrient absorption. Balchem’s proprietary chelation technology binds essential minerals like zinc, copper, and magnesium to amino acids, significantly enhancing bioavailability and supporting various biological functions with superior efficiency.",
		height: 71,
	},
];

export default async function Home() {
	const productId = process.env.NEXT_PUBLIC_PRODUCT_ID as string;

	const fetchProduct = async () => await productService.product(productId);

	const fetchProducts = async () => await productService.productsLimit(3);

	const { nextDeliveryText } = getQuarterInfo();

	const [productModel, products] = await Promise.all([
		fetchProduct(),
		fetchProducts(),
	]);

	return (
		<div className="min-h-screen grid gap-[32px] bg-grey11 lg:bg-transparent">
			<div className="relative lg:max-w-[1312px] lg:mx-[auto] w-full p-[16px] flex flex-col lg:flex-row justify-between">
				<div className="flex flex-col items-start  pt-[32px] lg:pt-[72px] lg:left-[68px] lg:w-[600px] h-full">
					<div className="text-[48px] lg:text-[64px] leading-[48px] lg:leading-[74px] font-[400] font-hagerman text-blue mb-[23px]">
					YOU DON’T NEED ANOTHER SUPPLEMENT BRAND
					</div>
					<p className="text-[16px] lg:text-[20px] leading-[24px] lg:leading-[36px] text-[#757575] mb-[58px]">
						Join buying teams for 100% pure, premium ingredients direct from
						world-leading laboratories and get it delivered direct to you up to
						73% cheaper.
					</p>
					<a href="#products">
						<Image
							className="lg:ml-[5px] lg:h-[160px] lg:w-[160px]  h-[97px] w-[97px]"
							src="/images/buy.svg"
							alt="Buy product"
							width={160}
							height={160}
						/>
					</a>
				</div>
				<Image
					className="hidden lg:block lg:m-auto"
					src="/images/hero-image.png"
					alt="Vercel logomark"
					width={754}
					height={465}
					unoptimized
				/>
				<a href="#products">
					<Image
						className="lg:hidden m-auto"
						src="/images/hero-image.png"
						alt="Buy product"
						width={754}
						height={465}
						unoptimized
					/>
				</a>
			</div>

			<div className="grid md:grid-cols-2 gap-x-[42px] lg:pt-[100px]">
				<div className="max-w-[612px] ml-auto">
					{" "}
					<div className="grid gap-y-[56px] justify-end  lg:my-[0] px-[16px] lg:px-[0]">
						<div className="text-[56px] h-fit lg:text-[64px] leading-[46px] lg:leading-[64px] font-[400] font-hagerman text-blue">
							How does it work?
						</div>
						{homeCards.map((card) => (
							<HomeCardComponent key={card.id} {...card} />
						))}
					</div>
				</div>
				<div className="relative flex flex-col md:max-h-[750px]">
					<div className="md:w-[574px] h-full">
						<Image
							className="w-max mx-auto h-max lg:absolute lg:left-[0] lg:top-[0px] lg:w-[574px]"
							src={productModel?.imageUrl ?? ""}
							alt={productModel?.imageKey ?? "main product"}
							width={308}
							height={533}
							unoptimized
						/>
					</div>
					<div className="bg-blue">
						<div className="md:w-[574px] md:h-[450px] flex flex-col justify-end">
							<div className="w-full grid items-end pt-[20px] px-[16px] lg:px-[32px] py-[32px]">
								<div>
									<div className="mb-[40px] text-white">
										<div className="text-[32px] leading-[36px] font-[400] flex justify-between mb-[7px] font-hagerman">
											Ubiquinol{" "}
											<span className="text-[32px] leading-[36px] font-[700] font-inconsolata">
												£{Number(productModel?.price).toFixed(2)}{" "}
											</span>
										</div>
										<div className="text-[20px] leading-[23px] flex justify-between text-grey2 font-inconsolata">
											{productModel?.producer?.businessName}
											<p className="text-[20px] leading-[23px] text-blue4 font-inconsolata">
												<span className="text-[20px] leading-[23px] text-grey2 line-through">
													£{Number(productModel?.wholesalePrice).toFixed(2)}
												</span>{" "}
												{productModel
													? Number(
															Number(productModel.price) /
																Number(productModel.rrp),
														).toFixed(2)
													: 0}
												% OFF
											</p>
										</div>
									</div>
									<Button
										font={"bold"}
										className="bg-[#FBF89F] text-blue w-full font-helvetica text-base font-bold"
										asChild
									>
										<Link href={`/products/${productId}`}>Buy Now</Link>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="lg:max-w-[1312px] lg:mx-[auto] w-full grid lg:grid-cols-2 gap-x-[42px] px-[16px] bg-white">
				<div className="relative">
					<Image
						className="max-h-[716px] lg:h-[716px]"
						src="/images/pillow.png"
						alt="Checkmark icon"
						width={632}
						height={716}
					/>
					<div className="absolute left-[0] top-[0] w-full h-full grid grid-cols-2 gap-[24px] items-end px-[17px] lg:px-[32px] py-[10px] lg:py-[42px]">
						<div className="flex flex-col gap-[4px] lg:gap-[22px]">
							<p className="text-center text-[20px] leading-[27px] font-[700] text-black">
								££££
							</p>
							<div className="flex flex-col">
								<div className="lg:py-[30px] h-[157px] lg:h-[326px] text-center bg-yellow text-[16px] lg:text-[20px] leading-[18px] lg:leading-[23px] font-[700] flex justify-center items-center w-full px-[10px] lg:px-[30px]">
									Typical Advertising Spend
								</div>
								<div className="px-[5px] py-[25px] lg:py-[50px] text-center lg:h-[100px] bg-yello1 text-[15px] lg:text-[20px] leading-[17px] lg:leading-[23px] font-[700] flex justify-center items-center w-full">
									The Middlemen&apos;s Cut
								</div>
								<div className="px-[5px] py-[14px] lg:py-[30px] text-center lg:h-[72px] bg-white text-[12px] lg:text-[20px] leading-[14px] lg:leading-[23px] font-[700] flex justify-center items-center w-full">
									The Cost of Ingredients
								</div>
							</div>
							<p className="text-center text-[12px] lg:text-[18px] leading-[14px] lg:leading-[20px] font-[700] text-white">
								What brands charge
							</p>
						</div>
						<div className="flex flex-col gap-[4px] lg:gap-[22px]">
							<p className="text-center text-[20px] leading-[27px] font-[700] text-black">
								£
							</p>
							<Button
								className="bg-blue text-white w-full font-bold h-[58px] lg:h-[107px] text-[18px] lg:text-[24px] leading-[18px] lg:leading-[27px]"
								asChild
							>
								<Link href="#">Club Price</Link>
							</Button>
							<p className="text-center text-[12px] lg:text-[18px] leading-[14px] lg:leading-[20px] font-[700] text-white">
								What we charge
							</p>
						</div>
					</div>
				</div>

				<div className="flex flex-col justify-between">
					<div>
						<p className="text-[32px] lg:text-[40px] leading-[32px] lg:leading-[58px] font-[800] text-blue pt-[32px] lg:pt-[18px] pb-[16px] font-inconsolata">
							Pharmaceutical Grade Ingredients Aren&apos;t Expensive. <br />
							Marketing them is.
						</p>
						<p className="text-[14px] lg:text-[18px] leading-[26px] text-grey6">
							Before Supplement Club, you were forced to pay for bloated
							advertising costs and watered-down supplements. We cut out the
							advertising overheads and middlemen and send you 100% clinically
							effective, traceable ingredients.
							<br />
							<br />
							With Supplement Club, you get direct access to top labs in Japan,
							the US, and Europe. Our transparent model shows you exactly where
							your supplements come from, no more blindly trusting brands. You
							can research yourself and know you&apos;re getting the best money
							can buy with 100% transparency.
							<br />
							<br />
							<br />
						</p>
						<p className="font-[700] mb-[32px] lg:mb-[18px]">
							Supplement Club Subscribers don&apos;t pay for:
						</p>
						<div className="grid grid-cols-2 gap-[32px] lg:gap-[0] lg:grid-cols-4 items-start mb-[48px] lg:mb-[0px]">
							<div className="flex flex-col gap-[8px]">
								<Image
									src="/images/icons/buy-cashier-discount-icon.svg"
									alt="Cashier discount icon"
									width={32}
									height={32}
								/>
								<p className="leading-[16px]">Middlemen</p>
							</div>

							<div className="flex flex-col gap-[8px]">
								<Image
									src="/images/icons/buy-discount-rack-icon.svg"
									alt="Discountrack icon"
									width={32}
									height={32}
								/>
								<p className="leading-[16px]">Expensive Advertising</p>
							</div>

							<div className="flex flex-col gap-[8px] max-w-[100px]">
								<Image
									src="/images/icons/buy-discount-shop-icon.svg"
									alt="Checkmark icon"
									width={32}
									height={32}
								/>
								<p className="leading-[16px]">Retailer Markups</p>
							</div>

							<div className="flex flex-col gap-[8px] max-w-[100px] h-full">
								<Image
									src="/images/icons/buy-discount-shop-2-icon.svg"
									className="h-full flex flex-col items-start"
									alt="Checkmark icon"
									width={32}
									height={32}
								/>
								<p className="leading-[16px]">Warehousing</p>
							</div>
						</div>
					</div>

					<Button
						className="bg-blue text-white w-full font-bold h-[54px]"
						asChild
					>
						<Link href="/labs" className="font-inconsolata font-bold">
							Learn More About Supplement Club
						</Link>
					</Button>
				</div>
			</div>

			<div className="lg:max-w-[1312px] lg:mx-[auto] w-full grid lg:grid-cols-2 gap-[16px] px-[16px] ">
				<div className="bg-blue w-full py-[60px] px-[32px] text-white flex flex-col gap-[24px]">
					<div className="flex gap-[20px] flex-col">
						<div className="text-[48px] leading-[48px] font-hagerman">
							Supplement club Membership
						</div>
						<div className="text-[16px] leading-[18px] font-helvetica tracking-[-0.43px]">
							Access the world’s best supplement labs — in Japan, Germany, the
							US & more
						</div>
					</div>
					<div className="flex flex-col gap-[48px]">
						<div className="flex items-center gap-[8px] text-[56px] font-bold font-inconsolata">
							£29.00
							<div className="text-[16px] font-bold font-inconsolata text-[#D1D1D1]">
								Per Year (Less than £2.50 per month)
							</div>
						</div>
						<div className="flex flex-col gap-[32px] max-w-[604px] w-full mx-auto">
							<div className="text-left text-[32px] leading-[34px] font-hagerman uppercase">
								Membership Benefits
							</div>
							<div className="flex flex-col gap-[24px]">
								<div className="text-[18px] font-inconsolata flex gap-[8px] items-center tracking-[-0.43px]">
									<Image
										src="/images/icons/verified-icon.svg"
										className="mb-auto"
										alt="Snowflake icon"
										width={24}
										height={24}
									/>{" "}
									Direct access to the world’s best labs
								</div>
								<div className="text-[18px] font-inconsolata flex gap-[8px] items-center tracking-[-0.43px]">
									<Image
										src="/images/icons/verified-icon.svg"
										className="mb-auto"
										alt="Snowflake icon"
										width={24}
										height={24}
									/>{" "}
									Free delivery on all orders
								</div>
								<div className="text-[18px] font-inconsolata flex gap-[8px] items-center tracking-[-0.43px]">
									<Image
										src="/images/icons/verified-icon.svg"
										className="mb-auto"
										alt="Snowflake icon"
										width={24}
										height={24}
									/>{" "}
									Unlimited drops
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-[16px] mx-auto w-full">
							<Button
								font={"bold"}
								className="bg-[#FBF89F] text-blue w-full text-[18px] font-helvetica text-base font-bold h-[49px]"
								asChild
							>
								<Link href="/products">Join Supplement Club</Link>
							</Button>
							<div className="text-center text-[16px] font-helvetica italic tracking-[-0.43px]">
								Try it free — no membership fee on your first 2 drops
							</div>
						</div>
					</div>
				</div>

				<div className="grid gap-[16px]">
					{membershipData.map((item, index) => (
						<MembershipBox key={`membership-${index + 1}`} {...item} />
					))}
				</div>
			</div>

			<div className="lg:max-w-[1312px] lg:mx-[auto] w-full grid gap-y-[32px] lg:gap-y-[50px] pt-[48px] px-[16px]">
				<div className="flex justify-between items-center">
					<div className="grid gap-y-[16px]">
						<p className="text-[32px] leading-[36px] font-[400] text-black font-hagerman">
							Products
						</p>
						<p className="bg-white leading-[18px] text-grey1 py-[4px] px-[10px]">
							Next Drop: <span className="font-[700] ">{nextDeliveryText}</span>
						</p>
					</div>

					<Link
						href="/products/"
						className="underline text-[18px] leading-[20px] text-black font-inconsolata"
					>
						View All
					</Link>
				</div>

				<div id="products" className="grid lg:grid-cols-3 gap-[16px]">
					{products?.map((item: IProductCardModel) => (
						<ProductCardComponent key={item.id} {...item} />
					))}
				</div>
			</div>

			<div className="lg:max-w-[1312px] lg:mx-[auto] w-full grid grid-cols-2 lg:grid-cols-7 px-[16px] py-[48px]">
				{images.map((image) => (
					<Link
						key={image.id}
						href={image.url}
						className="p-[12px] border-grey10 border-[1px] grid gap-[4px]"
					>
						<div className="flex flex-col gap-[4px]">
							<Image
								src={image.src ?? ""}
								alt={image.alt}
								width={40}
								height={40}
							/>
							<p className="text-[18px] leading-[24px] text-black font-inconsolata">
								{image.title}
							</p>
						</div>
					</Link>
				))}
			</div>

			{productModel && <ProductInfo product={productModel} />}

			<div
				id="faqs"
				className="lg:max-w-[1312px] lg:mx-[auto] w-full pt-[48px] lg:pt-[0] p-[16px]"
			>
				<Faqs />
			</div>
		</div>
	);
}
