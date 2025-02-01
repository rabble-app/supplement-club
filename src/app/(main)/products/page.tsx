"use client";
import ExpansionSelector from "@/components/main/products/ExpansionSelector";
import SortBy from "@/components/main/products/SortBy";
import ProductCard from "@/components/shared/ProductCard";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";

import { productService } from "@/services/productService";
import type IProductCardModel from "@/utils/models/IProductCardModel";
import type { IProductTagResponse } from "@/utils/models/api/response/IProductTagResponse";

export default function Products() {
	const [showAll, setShowAll] = useState(true);
	const [categories, setCategories] = useState<string[]>([]);
	const [goals, setGoals] = useState<string[]>([]);
	const [sortItems, setSortItems] = useState<string[]>([]);
	const [products, setProducts] = useState<IProductCardModel[]>([]);
	const [initProducts, setInitProducts] = useState<IProductCardModel[]>([]);

	// Toggle "show all" products
	const toggleShowAll = () => setShowAll((prev) => !prev);

	const processTags = useCallback(
		(data: IProductTagResponse[], type: string) => {
			return data.filter((tag) => tag.type === type).map((tag) => tag.name);
		},
		[],
	);

	const fetchAndSetTags = useCallback(
		async (
			setCategories: (categories: string[]) => void,
			setGoals: (goals: string[]) => void,
			setSortItems: (sortItems: string[]) => void,
		) => {
			const response = await productService.productTags();

			setCategories(processTags(response, "CATEGORY"));
			setGoals(processTags(response, "GOALS"));
			setSortItems(processTags(response, "SORT"));
		},
		[processTags],
	);

	useEffect(() => {
		fetchAndSetTags(setCategories, setGoals, setSortItems);
	}, [fetchAndSetTags]);

	// Fetch and initialize products
	useEffect(() => {
		(async () => {
			const products = await productService.products();
			setProducts(products);
			setInitProducts(products);
		})();
	}, []);

	// Update products based on selected tags
	const updateProducts = useCallback(
		(tags: string[]) => {
			const filteredProducts = tags.length
				? initProducts.filter((product) =>
						product.tags?.some((tag) => tags.includes(tag)),
					)
				: initProducts;
			setProducts(filteredProducts);
		},
		[initProducts],
	);

	// Sort products based on selected sort item
	const sortProducts = useCallback(
		(item: string) => {
			const sortedProducts = item
				? initProducts.filter((product) => product.tags?.includes(item))
				: initProducts;
			setProducts(sortedProducts);
		},
		[initProducts],
	);

	return (
		<div className="pb-[50px] bg-grey11 md:bg-transparent">
			<p className="hidden md:block text-[32px] leading-[37px] font-hagerman text-black bg-yellow py-[16px] text-center">
				Everyone&apos;s Joining Supplement Club
			</p>

			<div className="min-h-screen container-width bg-grey11 md:bg-transparent">
				{/* Breadcrumb Navigation */}
				<div className="flex justify-between items-center mb-[6px] md:mb-[8px]">
					<Breadcrumb className="pt-[24px] md:pt-[50px]">
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href="/" className="breadcrumb-link">
									Home
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator>/</BreadcrumbSeparator>
							<BreadcrumbItem>
								<BreadcrumbPage className="breadcrumb-page">
									Best Teams
								</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
					<SortBy updateItems={sortProducts} categories={sortItems} />
				</div>

				{/* Main Content */}
				<div className="grid md:grid-cols-[340px_1fr_] gap-x-[72px]">
					{/* Filters Section */}
					<aside className="mb-[13px] md:mb-[0]">
						<p className="text-[24px] md:text-[40px] leading-[36px] md:leading-[60px] font-hagerman text-black mb-[23px]">
							Best Teams
						</p>
						<div className="flex flex-col gap-[13px] md:gap-[16px]">
							<ExpansionSelector
								title="Shop by Category"
								updateItems={updateProducts}
								categories={categories}
							/>
							<ExpansionSelector
								title="Shop by Goal"
								updateItems={updateProducts}
								categories={goals}
							/>
						</div>
					</aside>

					{/* Product Cards */}
					<main>
						<div className="grid md:grid-cols-2 gap-[16px]">
							{(showAll ? products : products.slice(0, 2)).map((product) => (
								<ProductCard key={product.id} {...product} />
							))}
						</div>
						{/* View More Button */}
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
