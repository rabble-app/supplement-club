/** @format */

"use client";
import { useEffect, useMemo, useRef, useState } from "react";

import dynamic from "next/dynamic";
import Image from "next/image";

import CorporationBox from "@/components/main/products/CorporationBox";
import TeamPrice from "@/components/main/products/TeamPrice";
import Spinner from "@/components/shared/Spinner";

const CapsuleBox = dynamic(
	() => import("@/components/main/products/CapsuleBox"),
);
const MemberCard = dynamic(
	() => import("@/components/main/products/MemberCard"),
);
const PreOrderInfo = dynamic(
	() => import("@/components/main/products/PreOrderInfo"),
);
const ProductFaqs = dynamic(
	() => import("@/components/main/products/ProductFaqs"),
);
const ProfuctTable = dynamic(
	() => import("@/components/main/products/ProductTable"),
);
const SummaryProduct = dynamic(
	() => import("@/components/shared/SummaryProduct"),
);
const BottomSection = dynamic(
	() => import("@/components/main/products/BottomSection"),
);
const ReferralCardsWithLink = dynamic(
	() => import("@/components/shared/ReferralCardsWithLink"),
);

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import type IOrderSummaryModel from "@/utils/models/IOrderSummaryModel";
import type ISingleProductModel from "@/utils/models/ISingleProductModel";
import type ISummaryProductModel from "@/utils/models/ISummaryProductModel";
import { getQuarterInfo } from "@/utils/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface ProductDetailsProps {
	productID: string;
}

export default function ProductDetails({
	params,
}: Readonly<{ params: Promise<ProductDetailsProps> }>) {
	const [loading, setLoading] = useState(true);
	const context = useUser();
	const productStore = useProductStore();
	const [api, setApi] = useState<CarouselApi>();
	const [members, setMembers] = useState<IMemberCardModel[]>([]);
	const [orders, setOrders] = useState<IOrderSummaryModel[]>([]);
	const [hasUserProduct, setHasUserProduct] = useState<boolean>();

	const days = 90;

	const [current, setCurrent] = useState(1);
	const [firstWord, setFirstWord] = useState<string>("");
	const [rest, setRest] = useState<string>("");
	const [capsulePerDay, setCapsulePerDay] = useState(2);
	const [product, setProduct] = useState<ISingleProductModel>();
	const [units, setUnits] = useState("g");
	const [summary, setSummary] = useState<ISummaryProductModel>(
		{} as ISummaryProductModel,
	);

	const { currentQuarter, year, endDate, remainsDaysToNextQuater } =
		getQuarterInfo();
	useEffect(() => {
		if (product) {
			setHasUserProduct(
				context?.user?.basketsC?.map((c) => c.productId).includes(product.id) ??
					false,
			);
		}
	}, [context, product]);

	const nextDeliveryProductText = `Next Drop Delivered: ${endDate.toLocaleString("en", { month: "long" })} 1st ${year}`;

	const discount = useMemo(
		() =>
			product
				? (Math.abs(product?.price / product.rrp - 1) * 100).toFixed(0)
				: 0,
		[product],
	);

	const nextDeliveryText = `Next Drop: 1st ${endDate.toLocaleString("en", { month: "long" })} ${year}`;
	const [nextQuater] = useState(
		currentQuarter + 1 > 4 ? 1 : currentQuarter + 1,
	);
	const capsulesPackage = useMemo(
		() => remainsDaysToNextQuater * capsulePerDay,
		[remainsDaysToNextQuater, capsulePerDay],
	);
	useEffect(() => {
		const fetchProduct = async () => {
			const { productID } = await params;
			const model = await productService.product(productID);
			setProduct(model);
			setUnits(model.unitsOfMeasurePerSubUnit === "grams" ? "g" : " Capsules");
			const [word, ...others] = (model.name ?? "").split(" ");
			setFirstWord(word);
			setRest(others.join(" "));
			setLoading(false);
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
		const order = {
			id: "2",
			alt: "supplement mockup",
			description: `${capsulePerDay * days} ${units} Every 3 months`,
			name: "Quarterly Subscription",
			delivery: nextDeliveryProductText,
			src: "/images/supplement-mockup.svg",
			capsules: capsulePerDay * days,
			price: 0,
		};
		const summaryOrders = [order];
		const orders = [order];

		if (product?.isComming) {
			orders.unshift({
				id: "1",
				alt: "Founding Member Badge",
				name: "Founding Member 10% Discount",
				delivery: "Forever",
				src: "/images/icons/user-badge-icon.svg",
				capsules: 0,
				isFoundingMember: true,
				price: -4.5,
			} as never);
		} else if (!product?.isComming) {
			summaryOrders.unshift({
				id: "1",
				alt: "",
				description: `${capsulesPackage}${units} to see you to Q${nextQuater}`,
				name: "One time Alignment Package",
				delivery: "Delivered Tomorrow ",
				src: "/images/ubiquinol.svg",
				capsules: capsulesPackage,
				price: 0,
			} as never);
		} else if (product) {
			const members = [
				{
					id: 1,
					doseTitle: `${capsulePerDay * days}${units} Every 3 months`,
					name: "FOUNDING MEMBER",
					discountTitle: `${product?.supplementTeamProducts?.foundingMembersDiscount}% OFF TEAM PRICE`,
					doseValue: "First 50 Spots",
					price: product?.supplementTeamProducts?.foundingMembersDiscount
						? capsulesPackage -
							(capsulesPackage *
								product?.supplementTeamProducts?.foundingMembersDiscount) /
								100
						: capsulesPackage,
					capsulePrice: 0.25,
					spotsRemainds: 4,
					forever: true,
					isActive: true,
				},
				{
					id: 2,
					doseTitle: `${capsulePerDay * days}${units} Every 3 months`,
					name: "EARLY MEMBER",
					doseValue: "Next 200 Spots",
					discountTitle: `${product?.supplementTeamProducts?.earlyMembersDiscount}% OFF TEAM PRICE`,
					price: product?.supplementTeamProducts?.earlyMembersDiscount
						? capsulesPackage -
							(capsulesPackage *
								product?.supplementTeamProducts?.earlyMembersDiscount) /
								100
						: capsulesPackage,
					capsulePrice: 0.25,
					forever: true,
				},
				{
					id: 3,
					doseTitle: `${capsulePerDay * days}${units} Every 3 months`,
					name: "MEMBER",
					capsulePrice: 0.25,
					discountTitle: "Standard Team Price",
					price: capsulesPackage ?? 0,
				},
			];
			setMembers(members);
		}
		const obj = {
			percentage: (capsulePerDay * days * 0.25) / Number(product?.rrp),
			rrp: product?.rrp,
			quantityOfSubUnitPerOrder: product?.unitsOfMeasurePerSubUnit,
			unitsOfMeasurePerSubUnit: product?.unitsOfMeasurePerSubUnit,
			orders: summaryOrders,
			id: 1,
			referals: [],
			subscriptions: [],
			membership: [],
		};
		setSummary(obj);

		setOrders(orders);
	}, [
		capsulePerDay,
		product,
		capsulesPackage,
		nextDeliveryProductText,
		nextQuater,
		units,
	]);
	// implement sticky button
	const stickyRef = useRef<HTMLDivElement | null>(null);
	const bottomRef = useRef<HTMLDivElement | null>(null);
	const placeholderRef = useRef<HTMLDivElement | null>(null);
	const [isSticky, setIsSticky] = useState<boolean>(false);

	useEffect(() => {
		const handleScroll = () => {
			if (!stickyRef.current || !bottomRef.current || !placeholderRef.current)
				return;

			const bottomRect = bottomRef.current.getBoundingClientRect();
			const placeholderRect = placeholderRef.current.getBoundingClientRect();

			const stickyHeight = stickyRef.current.offsetHeight;

			const hasScrolledPast = placeholderRect.top <= 0;
			const isAboveBottom = bottomRect.top > stickyHeight;

			if (hasScrolledPast && isAboveBottom) {
				setIsSticky(true);
			} else {
				setIsSticky(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	if (loading) return <Spinner />;

	return (
		<div className="grid lg:grid-cols-2 md:gap-[32px] container-width relative">
			<div className="contents md:grid gap-[32px]">
				<Carousel
					setApi={setApi}
					className="w-full relative order-1 md:order-none pt-[53px] md:pt-[0] h-[430px] md:h-auto"
				>
					<CarouselContent
						className={`${product?.isComming ? "opacity-[40%]" : ""}`}
					>
						{product?.gallery?.map((item, idx) => (
							<CarouselItem key={`img-${idx + 1}`} className="flex">
								<Image
									className="w-auto md:w-full object-contain md:h-[700px]"
									src={item}
									alt={item}
									width={300}
									height={700}
									priority
								/>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="hidden md:flex absolute left-[16px] rounded-[50%] h-[48px] w-[48px] text-black border-black p-0 bg-white" />
					<CarouselNext className="hidden md:flex absolute right-[16px] rounded-[50%] h-[48px] w-[48px] text-black border-black p-0 bg-white" />

					<div className="hidden md:flex left-1/2 transform -translate-x-1/2 absolute bottom-[20px]">
						<div className="flex gap-[8px]">
							{product?.gallery?.map((_, idx) => (
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
								priority
							/>
							678
						</div>
					</div>
				</Carousel>

				<div className="order-3 md:order-none bg-grey11 md:bg-transparent mx-[-16px] md:mx-[0] px-[16px] md:px-[0]">
					{product && (
						<TeamPrice
							rrp={product.rrp}
							isComming={product.isComming}
							members={product.members}
							wholesalePrice={product.wholesalePrice}
							price={product.price}
							priceInfo={product?.priceInfo ?? []}
						/>
					)}

					<div
						className={`grid gap-[60px] mt-[51px] ${product?.isComming ? "md:mt-[70px]" : "md:mt-[0]"}`}
					>
						<PreOrderInfo productBenefits={product?.productBenefits} />

						<ProductFaqs healthCategories={product?.healthCategories} />

						<ProfuctTable />

						<div ref={bottomRef} className="mb-[75px] md:mb-[84px]">
							<BottomSection />
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-[16px] md:gap-[24px] order-2 md:order-none md:top-[0] md:items-start md:self-start md:pb-[50px]">
				<Breadcrumb className="p-[16px] md:p-[0] md:pt-[32px] absolute top-[0] left-[0] md:relative w-full bg-grey11 md:bg-transparent">
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/">Home</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className="" />
						<BreadcrumbItem>
							<BreadcrumbPage className="flex items-start gap-[5px]">
								{firstWord}
								<Image
									src="/images/TM-black.svg"
									alt="TM corporation"
									width={14}
									height={14}
								/>
								{rest}
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
				{context?.user && hasUserProduct && (
					<div className="bg-white rounded-[12px] shadow-card py-[16px] px-[12px] w-full">
						<div
							className="text-[16px] leading-[18px] font-[700] font-helvetica gap-x-[16px]
					gap-[10px] flex justify-between items-center w-full [&[data-state=open]>svg]:rotate-180"
						>
							<div className="grid grid-cols-[69px_1fr] gap-[8px]">
								<div className="rounded-[8px] border-[1px] border-grey28 w-[69px] p-[4px]">
									<Image
										src={product?.gallery[0] ?? ""}
										alt="supplement icon"
										width={61}
										height={61}
									/>
								</div>

								<div className="flex flex-col gap-[6px]">
									<div className="flex items-center gap-[2px] text-grey4 leading-[13px]">
										<span className="text-[12px] leading-[13px] font-inconsolata font-[700] text-grey4">
											{product?.producer?.businessName}
										</span>
										{" - "}
										<span className="text-[12px] leading-[13px] font-[300] font-inconsolata text-grey4 capitalize">
											{product?.approvalStatus}
										</span>
									</div>
									<div className="text-[16px] leading-[16px] font-[800] text-black flex items-center gap-[5px] font-inconsolata">
										£{product?.price}{" "}
										<span className="text-[10px] leading-[11px] text-grey1 font-[800] font-inconsolata">
											(£25 / count)
										</span>
									</div>

									<div className="text-[16px] leading-[16px] text-grey4 font-inconsolata">
										RRP{" "}
										<span className="text-[16px] leading-[16px] line-through font-bold font-inconsolata">
											£{product?.rrp}
										</span>{" "}
										<span className="text-[16px] leading-[16px] font-bold text-blue font-inconsolata">
											{discount}% OFF
										</span>
									</div>
									<div className="text-xs leading-[13px] text-grey4 font-helvetica text-left">
										{`${product?.quantityOfSubUnitPerOrder ? +product.quantityOfSubUnitPerOrder / 90 : 0} ${product?.unitsOfMeasurePerSubUnit} per Day - ${product?.quantityOfSubUnitPerOrder} ${product?.unitsOfMeasurePerSubUnit}`}
									</div>
								</div>
							</div>
							<div className=" flex items-center gap-[16px]">
								<div className="bg-[#F6F6FF] rounded-[12px] text-[#00038F] text-[16px] font-hagerman px-[12px] py-[4px]">
									{nextDeliveryText}
								</div>
								<Link href={`/dashboard/manage-plans/${product?.id}`}>
									<ChevronRight className="h-[22px] w-[22px] shrink-0 text-muted-foreground transition-transform duration-200 text-blue" />
								</Link>
							</div>
						</div>
					</div>
				)}
				{context?.user && product?.isComming && (
					<div className="flex justify-between gap-[10px] px-[10px] text-[16px] leading-[16px] font-bold font-inconsolata text-blue bg-blue2 h-[37px] w-max items-center rounded-[100px]">
						<Image
							src="/images/icons/user-badge-icon.svg"
							alt="User badge"
							width={15}
							height={15}
							priority
						/>
						YOU’RE A FOUNDING MEMBER!
					</div>
				)}
				{!context?.user && !product?.isComming && (
					<div className="flex flex-col gap-[24px]">
						<CapsuleBox
							rrp={product?.rrp ?? 0}
							price={product?.price ?? 0}
							unitsOfMeasurePerSubUnit={product?.unitsOfMeasurePerSubUnit}
							capsuleInfo={product?.capsuleInfo}
							orders={orders}
							productId={product?.id}
							selectCapsulePerDayAction={updateCapsulePerDay}
						/>
						{/* Placeholder keeps layout when sticky becomes fixed */}
						<div
							ref={placeholderRef}
							style={{ height: isSticky ? stickyRef.current?.offsetHeight : 0 }}
						/>
						<div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-[45px] md:gap-[8px]">
							<div className="grid justify-center gap-[8px] md:max-w-[166px] text-[12px] leading-[14px] text-center">
								<Image
									className="mx-auto"
									src="/images/icons/delivery-blue-icon.svg"
									alt="delivery icon"
									width={24}
									height={24}
									priority
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
									priority
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
									priority
								/>
								refer a friend and both get £5 off
							</div>
						</div>
					</div>
				)}
				{!context?.user && product?.isComming && (
					<div className="flex flex-col gap-[24px]">
						<CapsuleBox
							rrp={product?.rrp ?? 0}
							price={product?.price ?? 0}
							orders={orders}
							unitsOfMeasurePerSubUnit={product.unitsOfMeasurePerSubUnit}
							selectCapsulePerDayAction={updateCapsulePerDay}
							capsuleInfo={product?.capsuleInfo}
							productId={product?.id}
						/>

						{members.length > 0 && (
							<div className="grid gap-[16px] bg-white">
								{members.map((item) => (
									<MemberCard key={item.id} {...item} />
								))}
							</div>
						)}
					</div>
				)}
				{context?.user && (
					<div className="grid gap-[28px] w-full">
						{hasUserProduct && (
							<ReferralCardsWithLink className="border-[1px]" />
						)}

						<SummaryProduct
							showOnlyTotal={false}
							className={`bg-[#F6F6F6] ${product?.isComming ? "md:p-[24px]" : ""}`}
							model={summary}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
