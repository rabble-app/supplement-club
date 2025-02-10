"use client";
import { useEffect, useMemo, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import BottomSection from "@/components/main/products/BottomSection";
import CapsuleBox from "@/components/main/products/CapsuleBox";
import CorporationBox from "@/components/main/products/CorporationBox";
import MemberCard from "@/components/main/products/MemberCard";
import MembersBox from "@/components/main/products/MembersBox";
import PreOrderInfo from "@/components/main/products/PreOrderInfo";
import ProductFaqs from "@/components/main/products/ProductFaqs";
import ProfuctTable from "@/components/main/products/ProductTable";
import TeamPrice from "@/components/main/products/TeamPrice";
import ReferralCardsWithLink from "@/components/shared/ReferralCardsWithLink";
import SummaryProduct from "@/components/shared/SummaryProduct";
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
import { useUser } from "@/contexts/UserContext";
import { productService } from "@/services/productService";
import { useProductStore } from "@/stores/productStore";
import type { IMemberCardModel } from "@/utils/models/IMemberCardModel";
import type ISingleProductModel from "@/utils/models/ISingleProductModel";
import type ISummaryProductModel from "@/utils/models/ISummaryProductModel";
import { getQuarterInfo } from "@/utils/utils";

interface ProductDetailsProps {
	productID: string;
}

const itemsMembers = [
	{
		id: 1,
		doseTitle: "180 Capsules Every 3 months",
		name: "FOUNDING MEMBER",
		discountTitle: "10% OFF TEAM PRICE",
		doseValue: "First 50 Spots",
		price: 40.5,
		capsulePrice: 0.22,
		spotsRemainds: 4,
		forever: true,
		isActive: true,
	},
	{
		id: 2,
		doseTitle: "180 Capsules Every 3 months",
		name: "EARLY MEMBER",
		doseValue: "Next 200 Spots",
		discountTitle: "5% Off Team Price",
		price: 43,
		capsulePrice: 0.23,
		forever: true,
	},
	{
		id: 3,
		doseTitle: "180 Capsules Every 3 months",
		name: "MEMBER",
		capsulePrice: 0.25,
		discountTitle: "Standard Team Price",
		price: 45,
	},
] as IMemberCardModel[];

export default function ProductDetails({
	params,
}: Readonly<{ params: Promise<ProductDetailsProps> }>) {
	const context = useUser();
	const productStore = useProductStore();
	const [api, setApi] = useState<CarouselApi>();

	const days = 90;

	const [current, setCurrent] = useState(0);
	const [capsulePerDay, setCapsulePerDay] = useState(2);
	const [product, setProduct] = useState<ISingleProductModel>();

	const { currentQuarter, year, endDate, remainsDaysToNextQuater } =
		getQuarterInfo();

	const nextDeliveryProductText = `Next Drop Delivered: ${endDate.toLocaleString("en", { month: "long" })} 1st ${year}`;
	const [nextQuater] = useState(
		currentQuarter + 1 > 4 ? 1 : currentQuarter + 1,
	);

	const capsulesPackage = useMemo(
		() => remainsDaysToNextQuater * capsulePerDay,
		[remainsDaysToNextQuater, capsulePerDay],
	);

	const [summary, setSummary] = useState<ISummaryProductModel>(
		calculateSummary(2),
	);

	useEffect(() => {
		const fetchProduct = async () => {
			const { productID } = await params;
			const model = await productService.product(productID);
			setProduct(model);
		};
		fetchProduct();
	}, [params]);

	useEffect(() => {
		if (!api) {
			return;
		}

		setCurrent(api.selectedScrollSnap() + 1);

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	function updateCapsulePerDay(value: number) {
		setCapsulePerDay(value);
		productStore.setCapsulesPerDay(value);
	}

	useEffect(() => {
		setSummary(
			calculateSummary(capsulePerDay, product?.rrp, product?.isComming),
		);
	}, [capsulePerDay, product?.rrp, product?.isComming]);

	function calculateSummary(
		capsulePerDay: number,
		rrp?: number,
		isComming?: boolean,
	) {
		const orders = [
			{
				id: 2,
				alt: "supplement mockup",
				description: `${capsulePerDay * days} Capsules Every 3 months`,
				name: "Quarterly Subscription",
				delivery: nextDeliveryProductText,
				src: "/images/supplement-mockup.svg",
				capsules: capsulePerDay * days,
			},
		];

		if (!isComming) {
			orders.unshift({
				id: 1,
				alt: "",
				description: `${capsulesPackage} Capsules to see you to Q${nextQuater}`,
				name: "One time Alignment Package",
				delivery: "Delivered Tomorrow ",
				src: "/images/ubiquinol.svg",
				capsules: capsulesPackage,
			});
		}
		return {
			percentage: (capsulePerDay * days * 0.25) / Number(rrp),
			rrp: rrp,
			quantityOfSubUnitPerOrder: product?.unitsOfMeasurePerSubUnit,
			unitsOfMeasurePerSubUnit: product?.unitsOfMeasurePerSubUnit,
			orders: orders,
		} as ISummaryProductModel;
	}

	return (
		<div className="grid md:grid-cols-2 gap-[16px] container-width relative">
			<div className="contents md:grid gap-[32px]">
				<Carousel
					setApi={setApi}
					className="w-full relative order-1 md:order-none pt-[53px] md:pt-[0] h-[430px] md:h-auto"
				>
					<CarouselContent
						className={`${product?.isComming ? "opacity-[40%]" : ""}`}
					>
						{product?.gallery.map((item, idx) => (
							<CarouselItem key={`img-${idx + 1}`} className="flex">
								<Image
									className="w-auto md:w-full object-cover"
									src={item}
									alt={item}
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
							{product?.gallery.map((_, idx) => (
								<div
									key={`dot-${idx + 1}`}
									className={`h-[8px] w-[8px] rounded-[50%] ${
										current === idx + 1 ? "bg-black" : "bg-grey2"
									}`}
								/>
							))}
						</div>
					</div>

					{product?.isComming && (
						<div className="flex left-0 right-0 transform absolute bottom-[40px] w-full bg-blue py-[12px] h-[72px]">
							<div className="text-white text-[16px] leading-[24px] font-helvetica flex text-center max-w-[300px] mx-auto">
								PRE-ORDER TO BECOME FOUNDING MEMBER AND GET 10%OFF - FOREVER
							</div>
						</div>
					)}

					<div className="flex justify-between items-center md:hidden pt-[24px]">
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
					{product && !product.isComming && (
						<TeamPrice
							rrp={product.rrp}
							members={product.members}
							wholesalePrice={product.wholesalePrice}
							price={product.price}
							priceInfo={product?.priceInfo ?? []}
						/>
					)}
					{product?.isComming && (
						<div className="order-4 md:order-none">
							<MembersBox />
						</div>
					)}

					<div className="grid gap-[60px] mt-[51px] md:mt-[0]">
						<PreOrderInfo />

						<ProductFaqs />

						<ProfuctTable />

						<div className="mb-[75px] md:mb-[84px]">
							<BottomSection />
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-[16px] md:gap-[24px] order-2 md:order-none md:sticky md:top-[0] md:items-start md:self-start pb-[50px]">
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
								{product?.name}
							</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<CorporationBox
					tags={product?.tags}
					businessName={product?.producer?.businessName}
					description={product?.description}
					name={product?.name}
					quantityOfSubUnitPerOrder={product?.quantityOfSubUnitPerOrder}
					unitsOfMeasurePerSubUnit={product?.unitsOfMeasurePerSubUnit}
				/>
				{context?.user && product?.isComming && (
					<div className="flex justify-between gap-[10px] px-[10px] text-[16px] leading-[16px] font-bold font-inconsolata text-blue bg-blue2 h-[37px] w-max items-center rounded-[100px]">
						<Image
							src="/images/icons/user-badge-icon.svg"
							alt="User badge"
							width={15}
							height={15}
						/>
						YOU’RE A FOUNDING MEMBER!
					</div>
				)}
				{!context?.user && !product?.isComming && (
					<div className="flex flex-col gap-[24px]">
						<CapsuleBox
							rrp={product?.rrp}
							capsuleInfo={product?.capsuleInfo}
							selectCapsulePerDayAction={updateCapsulePerDay}
						/>

						<SummaryProduct className="bg-white" model={summary} />

						<Button className="bg-blue text-white w-full font-bold fixed bottom-[0] left-[0] md:relative z-[100]">
							<Link href={`/products/${product?.id}/checkout`}>
								Start My Subscription
							</Link>
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
				{!context?.user && product?.isComming && (
					<div className="flex flex-col gap-[24px]">
						<CapsuleBox
							rrp={product?.rrp}
							selectCapsulePerDayAction={updateCapsulePerDay}
							capsuleInfo={product?.capsuleInfo}
						/>

						<div className="grid gap-[16px] bg-white">
							{itemsMembers.map((item) => (
								<MemberCard key={item.id} {...item} />
							))}
						</div>

						<SummaryProduct
							showOnlyTotal={true}
							className="bg-white"
							model={summary}
						/>

						<Button className="bg-blue text-white w-full font-bold">
							<Link href={`/products/${product?.id}/checkout`}>
								{" "}
								REGISTER PRE-ORDER
							</Link>
						</Button>
					</div>
				)}
				{context?.user && (
					<div className="grid gap-[28px] w-full">
						<SummaryProduct model={summary} />

						<ReferralCardsWithLink />
					</div>
				)}

				{context?.user && !product?.isComming && (
					<Button className="bg-blue text-white w-full font-bold fixed bottom-[0] left-[0] md:relative z-[100]">
						<Link href={`/products/${product?.id}/checkout`}>
							Start My Subscription
						</Link>
					</Button>
				)}

				{context?.user && product?.isComming && (
					<Button className="bg-blue text-white w-full font-bold">
						<Link href={`/products/${product?.id}/checkout`}>
							{" "}
							REGISTER PRE-ORDER
						</Link>
					</Button>
				)}
			</div>
		</div>
	);
}
