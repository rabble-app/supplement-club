"use client";

import ProductCard from "@/components/cards/ProductCard";
import type IProductCardModel from "@/utils/models/IProductCardModel";

const commonProperties = {
	src: "/images/supplement2.png",
	altSrc: "Supplement",
};

const products: IProductCardModel[] = [
	{
		id: 1,
		...commonProperties,
		corporation: "Balchem Corporation_1",
		name: "Magnesium Bisglycinate TRAACS_1",
		description: "Supports Muscle Function & Relaxation_1",
		subscribers: 1034,
		ingredient: "80% Magnesium Bisglycinate TRAACS_1",
		rrpPrice: 76.36,
		rrpDiscount: 45,
		price: 42.02,
	},
	{
		id: 2,
		...commonProperties,
		corporation: "KANEKA CORPORATION_2",
		name: "COENZYME Q10 UBIQUINOL_2",
		description: "Supports Cellular Energy & Heart Health_2",
		ingredient: "90% Kaneka Ubiquinol_2",
		subscribers: 678,
		rrpPrice: 76.35,
		rrpDiscount: 45,
		price: 42.3,
	},
	{
		id: 3,
		...commonProperties,
		corporation: "ASTAREAL_3",
		name: "ASTAREAL ASTAXANTHIN_3",
		description: "Powerful Antioxidant for Skin & Muscle Health_3",
		ingredient: "100% AstaReal Astaxanthin_3",
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
