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

const categories: ICategoryModel[] = [
	{ id: 1, label: "Supplements" },
	{ id: 2, label: "Sports Nutrition" },
	{ id: 3, label: "Best Sellers" },
	{ id: 4, label: "Stacks" },
];

const goals: ICategoryModel[] = [
	{ id: 1, label: "Sleep" },
	{ id: 2, label: "Cognitive Function" },
	{ id: 3, label: "Athletic Performance" },
	{ id: 4, label: "Hormone Support" },
	{ id: 5, label: "Foundational Health" },
];

const products: IProductCardModel[] = [
	{
		id: 1,
		src: "/images/supplement2.png",
		altSrc: "Supplement",
		corporation: "Balchem Corporation",
		name: "Magnesium Bisglycinate TRAACS",
		description: "Supports Muscle Function & Relaxation",
		subscribers: 1034,
		ingredient: "80% Magnesium Bisglycinate TRAACS",
		rrpPrice: 76.36,
		rrpDiscount: 45,
		price: 42.02,
	},
	{
		id: 2,
		src: "/images/supplement2.png",
		altSrc: "Supplement",
		corporation: "KANEKA CORPORATION",
		name: "COENZYME Q10 UBIQUINOL",
		description: "Supports Cellular Energy & Heart Health",
		ingredient: "90% Kaneka Ubiquinol",
		subscribers: 678,
		rrpPrice: 76.35,
		rrpDiscount: 45,
		price: 42.3,
	},
	{
		id: 3,
		src: "/images/supplement2.png",
		altSrc: "Supplement",
		corporation: "ASTAREAL2",
		name: "ASTAREAL ASTAXANTHIN2",
		description: "Powerful Antioxidant for Skin & Muscle Health2",
		ingredient: "100% AstaReal Astaxanthin2",
		subscribers: 2,
		rrpPrice: 63.73,
		rrpDiscount: 39,
		price: 42,
		isComming: true,
	},
	// Add other products...
];

export default function Products() {
	const [showAll, setShowAll] = useState(true);

	const toggleShowAll = () => setShowAll((prev) => !prev);

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

					<main>
						<div className="grid md:grid-cols-2 gap-[16px] order-2">
							{(showAll ? products : products.slice(0, 2)).map((product) => (
								<ProductCard key={product.id} {...product} />
							))}
						</div>
						{!showAll && (
							<Button
								onClick={toggleShowAll}
								className="md:hidden mt-12 text-base font-bold text-blue bg-yellow"
							>
								View More Products
							</Button>
						)}
					</main>
				</div>
			</div>
		</div>
	);
}
