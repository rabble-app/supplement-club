"use client";

import ProductCard from "@/components/shared/ProductCard";
import type IProductCardModel from "@/utils/models/IProductCardModel";

const commonProperties = {
	imageUrl: "/images/supplement2.png",
};

const products: IProductCardModel[] = [
	{
		id: "1",
		...commonProperties,
		teamName: "Balchem Corporation_1",
		name: "Magnesium Bisglycinate TRAACS_1",
		description: "Supports Muscle Function & Relaxation_1",
		subscribers: 1034,
		imageKey: "alt img",
		rrp: 76.36,
		price: 42.02,
		wholesalePrice: 100,
	},
	{
		id: "2",
		...commonProperties,
		teamName: "KANEKA CORPORATION_2",
		name: "COENZYME Q10 UBIQUINOL_2",
		description: "Supports Cellular Energy & Heart Health_2",
		subscribers: 678,
		imageKey: "alt img",
		rrp: 76.35,
		price: 42.3,
		wholesalePrice: 100,
	},
	{
		id: "3",
		...commonProperties,
		teamName: "ASTAREAL_3",
		name: "ASTAREAL ASTAXANTHIN_3",
		description: "Powerful Antioxidant for Skin & Muscle Health_3",
		subscribers: 2,
		imageKey: "alt img",
		rrp: 63.73,
		price: 42,
		isComming: true,
		wholesalePrice: 100,
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
