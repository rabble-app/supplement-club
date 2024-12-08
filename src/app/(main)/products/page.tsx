"use client";
import { useState } from "react";

import ExpansionSelector from "@/components/ExpansionSelector";
import ProductCard from "@/components/cards/ProductCard";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import SortBy from "./components/SortBy";

import type { ICategoryModel } from "@/utils/models/ICategoryModel";
import type IProductCardModel from "@/utils/models/IProductCardModel";

export default function Products() {
	const [showAll, setShowAll] = useState(false);
	const categories = [
		{
			id: 1,
			label: "Supplements",
		},
		{
			id: 2,
			label: "Sports Nutrition",
		},
		{
			id: 3,
			label: "Best Sellers",
		},
		{
			id: 4,
			label: "Stacks",
		},
	] as ICategoryModel[];

	const goals = [
		{
			id: 1,
			label: "Sleep",
		},
		{
			id: 2,
			label: "Cognitive Function",
		},
		{
			id: 3,
			label: "Athletic Performance",
		},
		{
			id: 4,
			label: "Hormone Support",
		},
		{
			id: 5,
			label: "Foundational Health",
		},
	] as ICategoryModel[];

	const products = [
		{
			id: 1,
			src: "/images/supplement2.png",
			altSrc: "Supplement",
			corporation: "Balchem Corporation",
			name: "Magnesium Bisglycinate TRAACS",
			description: "Supports Muscle Function & Relaxation",
			subscribers: 1034,
			ingredient: "100% Magnesium Bisglycinate TRAACS",
			rrpPrice: 76.36,
			rrpDiscount: 45,
			price: 42.0,
		},
		{
			id: 2,
			src: "/images/supplement2.png",
			altSrc: "Supplement",
			corporation: "KANEKA CORPORATION",
			name: "COENZYME Q10 UBIQUINOL",
			description: "Supports Cellular Energy & Heart Health",
			ingredient: "100% Kaneka Ubiquinol",
			subscribers: 678,
			rrpPrice: 76.36,
			rrpDiscount: 45,
			price: 42.0,
		},
		{
			id: 3,
			src: "/images/supplement2.png",
			altSrc: "Supplement",
			corporation: "ASTAREAL",
			name: "ASTAREAL ASTAXANTHIN",
			description: "Powerful Antioxidant for Skin & Muscle Health",
			ingredient: "100% AstaReal Astaxanthin",
			subscribers: 0,
			rrpPrice: 63.71,
			rrpDiscount: 38,
			price: 39.5,
			isComming: true,
		},
	] as IProductCardModel[];

	const showAllProduct = () => {
		setShowAll(!showAll);
	};

	return (
		<div>
			<p className="hidden md:block text-[32px] leading-[37px]  font-hagerman text-black bg-yellow py-[16px] text-center">
				Everyone&apos;s Joining Supplement Club
			</p>

			<div className="min-h-screen container-width bg-grey11 md:bg-transparent">
				<div className="flex justify-between items-center mb-[6px] md:mb-[8px]">
					<Breadcrumb className="pt-[24px] md:pt-[50px]">
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink
									className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] font-[400] font-helvetica text-black"
									href="/"
								>
									Home
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator>/</BreadcrumbSeparator>
							<BreadcrumbItem>
								<BreadcrumbPage className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] font-[400] font-helvetica text-black">
									Best Teams
								</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
					<SortBy />
				</div>
				<div className="grid md:grid-cols-[340px_1fr_] gap-x-[72px]">
					<div className="mb-[13px] md:mb-[0]">
						<p className="text-[24px] md:text-[40px] leading-[36px] md:leading-[60px] font-hagerman text-black mb-[23px] order-1">
							Best Teams
						</p>
						<div className="flex flex-col gap-[13px] md:gap-[16px]">
							<ExpansionSelector
								title="Shop by Category"
								categories={categories}
							/>

							<ExpansionSelector title="Shop by Goal" categories={goals} />
						</div>
					</div>
					<div className="hidden md:grid grid-cols-2 gap-[16px] order-2">
						{products.map((product) => (
							<ProductCard key={product.id} {...product} />
						))}
					</div>
					<div className="grid md:hidden gap-[16px] order-2">
						{products.slice(0, showAll ? undefined : 2).map((product) => (
							<ProductCard key={product.id} {...product} />
						))}

						{!showAll && (
							<Button
								onClick={showAllProduct}
								className="my-[50px] text-[16px] leading-[24px] text-blue bg-yellow font-bold font-inconsolata h-[48px] px-[10px] flex justify-center items-center"
							>
								View More Products
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
