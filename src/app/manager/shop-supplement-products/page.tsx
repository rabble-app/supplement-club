"use client";

import ProductCard from "@/components/cards/ProductCard";
import type IProductCardModel from "@/utils/models/IProductCardModel";

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
export default function ShopSupplementProducts() {
	return (
		<div className="mx-auto max-w-[800px] py-[32px]">
			<div className="grid md:grid-cols-2 gap-[16px]">
				{products.map((product) => (
					<ProductCard key={product.id} {...product} />
				))}
			</div>
		</div>
	);
}
