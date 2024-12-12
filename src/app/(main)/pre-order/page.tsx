"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import BottomSection from "@/components/BottomSection";
import ProductFaqs from "@/components/ProductFaqs";
import TotalCard from "@/components/cards/TotalCard";
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
import CapsuleBox from "../products/components/CapsuleBox";
import ProfuctTable from "../products/components/ProductTable";
import CorporationBox from "./components/CorporationBox";
import FoundingBox from "./components/FoundingBox";
import MemberCard from "./components/MemberCard";
import MembersBox from "./components/MembersBox";
import PreOrderInfo from "./components/PreOrderInfo";

import type { IMemberCardModel } from "@/utils/models/IMemberCardModel";

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

export default function Preorder() {
	const [api, setApi] = React.useState<CarouselApi>();
	const [current, setCurrent] = React.useState(0);

	React.useEffect(() => {
		if (!api) {
			return;
		}

		setCurrent(api.selectedScrollSnap() + 1);

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);
	const [loggedIn] = React.useState(false);
	return (
		<div className="grid md:grid-cols-2 gap-[16px] min-h-screen container-width relative">
			<div className="contents bg-grey11 md:bg-transparent mx-[-16px] md:mx-[0] px-[16px] md:px-[0] md:grid">
				<Carousel
					setApi={setApi}
					className="w-full relative order-1 md:order-none mt-[20px] md:mt-[0] h-[430px] md:h-auto"
				>
					<CarouselContent className="opacity-[40%]">
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
					<CarouselPrevious className="flex absolute left-[16px] rounded-[50%] h-[48px] w-[48px] text-black border-black p-0 bg-white" />
					<CarouselNext className="flex absolute right-[16px] rounded-[50%] h-[48px] w-[48px] text-black border-black p-0 bg-white" />

					<div className="flex left-1/2 transform -translate-x-1/2 absolute bottom-[20px]">
						<div className="flex gap-[8px]">
							{Array.from({ length: productImages.length }).map((_, idx) => (
								<div
									key={`len-${idx + 1}`}
									className={`h-[8px] w-[8px] rounded-[50%]  ${current === idx + 1 ? "bg-black" : "bg-grey2"}`}
								/>
							))}
						</div>
					</div>

					<div className="flex left-0 right-0 transform absolute bottom-[40px] w-full bg-blue py-[12px] h-[72px]">
						<div className="text-white text-[16px] leading-[24px] font-helvetica flex text-center max-w-[300px] mx-auto">
							PRE-ORDER TO BECOME FOUNDING MEMBER AND GET 10%OFF - FOREVER
						</div>
					</div>
				</Carousel>

				<div className="flex justify-between items-center order-2 md:hidden">
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

				<div className="order-4 md:order-none">
					<MembersBox />
				</div>

				<div className="order-5 md:order-none md:pt-[70px] md:pb-[60px]">
					<PreOrderInfo />
				</div>

				<div className="order-6 md:order-none">
					<ProductFaqs />
				</div>

				<div className="order-7 md:order-none md:py-[60px]">
					<ProfuctTable />
				</div>

				<div className="mt-[60px] md:mt-[0] mb-[84px] order-8 md:order-none">
					<BottomSection />
				</div>
			</div>

			<div className="flex flex-col gap-[16px] md:gap-[24px] order-3 md:order-none">
				<Breadcrumb className="p-[16px] md:p-[0] md:pt-[32px] absolute top-[0] left-[0] md:relative w-full bg-grey11 md:bg-transparent">
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink
								className="text-[14px] leading-[21px] font-[400] font-roboto"
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

				<CorporationBox />

				{!loggedIn && (
					<div className="flex flex-col gap-[24px]">
						<CapsuleBox />

						<div className="grid gap-[16px] bg-white">
							{itemsMembers.map((item) => (
								<MemberCard key={item.id} {...item} />
							))}
						</div>

						<TotalCard
							capsules={180}
							price={40.5}
							rrp={144}
							percent={65}
							capsulePrice={0.25}
						/>

						<Button className="bg-blue text-white w-full font-bold">
							<Link href="/pre-order/checkout-flow/"> REGISTER PRE-ORDER</Link>
						</Button>
					</div>
				)}

				{loggedIn && <FoundingBox />}
			</div>
		</div>
	);
}
