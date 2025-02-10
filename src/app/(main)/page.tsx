import Faqs from "@/components/main/Faqs";
import HomeCardComponent from "@/components/main/HomeCard";
import ProductInfo from "@/components/main/ProductInfo";
import ProductCardComponent from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import { productService } from "@/services/productService";
import type { IHomeCardModel } from "@/utils/models/IHomeCardModel";
import type IProductCardModel from "@/utils/models/IProductCardModel";
import { getQuarterDates, getQuarterInfo } from "@/utils/utils";

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
	},
	{
		id: 2,
		src: "/images/icons/baby-icon.svg",
		alt: "Baby icon",
		title: "Fertility",
	},
	{
		id: 3,
		src: "/images/icons/bed-icon.svg",
		alt: "Bed icon",
		title: "Sleep",
	},
	{
		id: 4,
		src: "/images/icons/energy-icon.svg",
		alt: "Energy icon",
		title: "Energy",
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
		src: "/images/icons/dumbell-icon.svg",
		alt: "Dumbell icon",
		title: "Weight Training",
	},
	{
		id: 8,
		src: "/images/icons/athletes-icon.svg",
		alt: "Athletes icon",
		title: "Athletes",
	},
	{
		id: 9,
		src: "/images/icons/shield-icon.svg",
		alt: "Shield icon",
		title: "Immunity",
	},
	{
		id: 10,
		src: "/images/icons/brain-icon.svg",
		alt: "Brain icon",
		title: "Cognitive Function",
	},
	{
		id: 11,
		src: "/images/icons/bones-icon.svg",
		alt: "Bones icon",
		title: "Joint Health",
	},
	{
		id: 12,
		src: "/images/icons/intensine-icon.svg",
		alt: "Intensine icon",
		title: "Gut Health",
	},
	{
		id: 13,
		src: "/images/icons/water-drop-icon.svg",
		alt: "Water drop icon",
		title: "Skin Health",
	},
	{
		id: 14,
		src: "/images/icons/flower-icon.svg",
		alt: "Flower icon",
		title: "Mood & Anxiety",
	},
];

export default async function Home() {
	const productId = process.env.NEXT_PUBLIC_PRODUCT_ID!;

	const fetchProduct = async () => await productService.product(productId);

	const fetchProducts = async () => await productService.productsLimit(3);

	const { currentQuarter, year } = getQuarterInfo();
	const { endDate } = getQuarterDates(year, currentQuarter);
	const nextDeliveryText = `${endDate.toLocaleString("en", { month: "long" })} 1st ${year}`;

	const [productModel, products] = await Promise.all([
		fetchProduct(),
		fetchProducts(),
	]);

	return (
		<div className="min-h-screen container-width grid lg:gap-y-[120px] bg-grey11 lg:bg-transparent">
			<div className="relative mx-[-16px] lg:mx-[0] flex flex-col lg:flex-row justify-between w-full">
				<div className="flex flex-col items-start  pt-[32px] lg:pt-[72px] px-[16px] lg:px-[0] lg:left-[68px] lg:w-[600px] h-full">
					<div className="text-[48px] lg:text-[64px] leading-[48px] lg:leading-[74px] font-[400] font-hagerman text-blue mb-[23px]">
						Pharmaceutical Grade Supplements at a Fraction of the Cost
					</div>
					<p className="text-[16px] lg:text-[20px] leading-[24px] lg:leading-[36px] text-[#757575] mb-[58px]">
						Join buying teams for 100% pure, premium ingredients direct from
						world-leading laboratories and get it delivered direct to you up to
						73% cheaper.
					</p>
					<Image
						className="lg:ml-[5px] lg:h-[160px] lg:w-[160px]  h-[97px] w-[97px]"
						src="/images/buy.svg"
						alt="Buy product"
						width={160}
						height={160}
					/>
				</div>
				<Image
					className="hidden lg:block lg:mt-[20px]"
					src="/images/ubiquinol.png"
					alt="Vercel logomark"
					width={754}
					height={766}
				/>

				<Image
					className="lg:hidden"
					src="/images/ubiquinol.png"
					alt="Buy product"
					width={754}
					height={760}
				/>
			</div>

			<div className="grid lg:grid-cols-[1fr_575px] gap-x-[73px] bg-white mx-[-16px] md:mx-[0]">
				<div className="grid gap-y-[56px] justify-end  lg:my-[0] px-[16px] lg:px-[0]">
					<div className="text-[56px] h-fit lg:text-[64px] leading-[46px] lg:leading-[73px] font-[400] font-hagerman text-blue">
						How does it work?
					</div>
					{homeCards.map((card) => (
						<HomeCardComponent key={card.id} {...card} />
					))}
				</div>

				<div className="md:w-[574px] h-[700px] lg:h-[833px] bg-white mx-auto">
					<div className="h-[350px] lg:h-[380px] bg-grey11 lg:bg-transparent" />
					<div className="bg-blue h-[350px] lg:h-[453px] relative">
						<Image
							className="absolute bottom-[200px] left-0 right-0 w-fit mx-auto md:w-full h-[420px] lg:h-[533px]"
							src={productModel?.imageUrl}
							alt={productModel?.imageKey || "main product"}
							width={308}
							height={533}
						/>
						<div className="px-[16px] py-[24px] lg:px-[32px] w-full grid items-end h-full lg:h-[453px]">
							<div>
								<div className="mb-[40px] text-white">
									<div className="text-[32px] leading-[36px] font-[400] flex justify-between mb-[7px] font-hagerman">
										Ubiquinol{" "}
										<span className="text-[32px] leading-[36px] font-[700] font-inconsolata">
											£{Number(productModel?.price).toFixed(2)}{" "}
										</span>
									</div>
									<div className="text-[20px] leading-[23px] flex justify-between text-grey2 font-inconsolata">
										{productModel.producer?.businessName}
										<p className="text-[20px] leading-[23px] text-blue4 font-inconsolata">
											<span className="text-[20px] leading-[23px] text-grey2 line-through">
												£{productModel?.wholesalePrice}
											</span>{" "}
											{productModel
												? Number(productModel.price) / Number(productModel.rrp)
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
									<Link href="#">Buy Now</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="lg:container-width grid lg:grid-cols-2 gap-x-[42px] py-[23px] px-[16px] lg:pt-[32px] lg:pb-[32px] lg:px-[0] bg-white mx-[-16px] md:mx-[0]">
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
							your supplements come from—no more blindly trusting brands. You
							can research yourself and know you&apos;re getting the best money
							can buy with 100% transparency.
							<br />
							<br />
							<br />
						</p>
						<p className="font-[700] mb-[32px] lg:mb-[18px]">
							Supplement Club Subscribers don&apos;t pay for:
						</p>
						<div className="grid grid-cols-2 gap-[32px] lg:gap-[0] lg:grid-cols-4 items-center mb-[48px] lg:mb-[0px]">
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

							<div className="flex flex-col gap-[8px]">
								<Image
									src="/images/icons/buy-discount-shop-icon.svg"
									alt="Checkmark icon"
									width={32}
									height={32}
								/>
								<p className="leading-[16px]">Retailer Markups</p>
							</div>

							<div className="flex flex-col gap-[8px]">
								<Image
									src="/images/icons/buy-discount-shop-2-icon.svg"
									alt="Checkmark icon"
									width={32}
									height={32}
								/>
								<p className="leading-[16px]">Overpackaging</p>
							</div>
						</div>
					</div>

					<Button
						className="bg-blue text-white w-full font-bold h-[54px]"
						asChild
					>
						<Link href="#" className="font-inconsolata font-bold">
							Learn More About Supplement Club
						</Link>
					</Button>
				</div>
			</div>

			<div className="grid gap-y-[32px] lg:gap-y-[50px] pt-[48px] px-[16px] lg:p-[0] mx-[-16px] md:mx-[0]">
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

				<div className="grid lg:grid-cols-3 gap-[16px]">
					{products.map((item: IProductCardModel) => (
						<ProductCardComponent key={item.id} {...item} />
					))}
				</div>
			</div>

			<div className="grid grid-cols-2 lg:grid-cols-7 px-[16px] py-[80px] lg:p-[0] mx-[-16px] md:mx-[0]">
				{images.map((image) => (
					<div
						key={image.id}
						className="p-[12px] border-grey10 border-[1px] grid gap-[4px]"
					>
						<div className="flex flex-col gap-[4px]">
							<Image src={image.src} alt={image.alt} width={40} height={40} />
							<p className="text-[18px] leading-[24px] text-black font-inconsolata">
								{image.title}
							</p>
						</div>
					</div>
				))}
			</div>

			<ProductInfo product={productModel} />

			<div className="pt-[48px] lg:pt-[0]">
				<Faqs />
			</div>
		</div>
	);
}
