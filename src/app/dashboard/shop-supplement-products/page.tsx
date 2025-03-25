"use client";

import ProductCard from "@/components/shared/ProductCard";
import Spinner from "@/components/shared/Spinner";
import { useUser } from "@/contexts/UserContext";
import { productService } from "@/services/productService";
import type IProductCardModel from "@/utils/models/IProductCardModel";
import { useEffect, useState } from "react";

export default function ShopSupplementProducts() {
	const [products, setProducts] = useState<IProductCardModel[]>([]);
	const [loading, setLoading] = useState(true);
	const context = useUser();

	useEffect(() => {
		(async () => {
			const products = await productService.products(context?.user?.id);
			setProducts(products);
			setLoading(false);
		})();
	}, [context]);

	if (loading) return <Spinner />;

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
