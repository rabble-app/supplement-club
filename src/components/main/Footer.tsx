/** @format */

"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator";
import { productService } from "@/services/productService";
import type IProductCardModel from "@/utils/models/IProductCardModel";

export default function Footer() {
	const pathname = usePathname();
	const isCheckoutPage = pathname?.includes('/checkout');
	const [products, setProducts] = useState<IProductCardModel[]>([]);
	
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const productsData = await productService.productsLimit(3);
				setProducts(productsData);
			} catch (error) {
				console.error('Error fetching products:', error);
			}
		};
		
		fetchProducts();
	}, []);
	
	// For checkout pages, hide footer on mobile
	if (isCheckoutPage) {
		return (
			<footer className="hidden md:flex flex-col items-center pt-[40px] pb-[40px] lg:pt-[60px] lg:pb-[30px] bg-cream1">
				{/* Footer content will be loaded dynamically */}
			</footer>
		);
	}
	
	// For non-checkout pages, show footer normally
	return (
		<footer className="flex flex-col items-center pt-[40px] pb-[40px] lg:pt-[60px] lg:pb-[30px] bg-cream1">
			<div className="max-w-[1500px] px-4 mx-auto w-full grid gap-[24px] lg:grid-cols-[1fr_805px] lg:gap-[0]">
				<div className="flex flex-col gap-[24px]">
					<p className="text-[24px] leading-[27px] font-hagerman font-normal text-[#00038F]">
						Supplement Club
					</p>
					<div className="flex items-center justify-start gap-x-[16px]">
						<Link href={"#"}>
							<Image
								src="/images/facebook.svg"
								alt="User profile bag"
								width={13}
								height={25}
							/>
						</Link>
						<Link href={"#"}>
							<Image
								src="/images/instagram.svg"
								alt="User profile bag"
								width={25}
								height={25}
							/>
						</Link>
						<Link href={"#"}>
							<Image
								src="/images/tiktok.svg"
								alt="User profile bag"
								width={21}
								height={25}
							/>
						</Link>
					</div>
				</div>
				<div className="grid lg:grid-cols-3 gap-[24px] lg:gap-[85px]">
					<div>
						<p className="text-[18px] leading-[21px] font-[700] font-inconsolata text-black1">
							Shop
						</p>
						{products?.map((product) => (
							<Link
								className="text-[15px] leading-[18px] mt-[12px] font-figtree text-black1 line-clamp-3 truncate block"
								href={`/products/${product.id}`}
								key={product.id}
							>
								{product.name}
							</Link>
						))}
					</div>
					<div>
						<p className="text-[18px] leading-[21px] font-[700] font-inconsolata text-black1">
							Learn
						</p>
						<Link
							href="/labs"
							className="text-[15px] leading-[18px] mt-[12px] font-figtree text-black1"
						>
							Meet the Labs
						</Link>
					</div>
					<div>
						<p className="text-[18px] leading-[21px] font-[700] font-inconsolata text-black1">
							Support
						</p>
						<Link
							href="#faqs"
							className="text-[15px] leading-[18px] mt-[12px] font-figtree text-black1"
						>
							FAQs
						</Link>
						<p className="text-[15px] leading-[18px] mt-[12px] font-figtree text-black1">
							Contact Us
						</p>
						<p className="text-[15px] leading-[18px] mt-[12px] font-figtree text-black1">
							Shipping
						</p>
						<Link
							className="text-[15px] leading-[18px] mt-[12px] font-figtree text-black1 flex"
							href="/auth/login"
						>
							Log In
						</Link>
						<p className="text-[15px] leading-[18px] mt-[12px] font-figtree text-black1">
							Returns & Other Policies
						</p>
					</div>
				</div>
			</div>

			<Separator className="mt-[24px] mb-[32px] lg:mt-[53px]" />

			<div className="container-width flex flex-col justify-between gap-[24px] lg:flex-row lg:items-center">
				<p className="text-[15px] leading-[18px] font-roboto text-black1">
					© 2024 Supplement Club. All rights reserved.
				</p>
				<div className="flex items-center justify-between lg:justify-center gap-x-[24px] text-[14px] leading-[21px] underline text-black2">
					<Link href="#">Privacy Policy</Link>
					<Link href="#">Terms of Service</Link>
					<Link href="#">Cookies Settings</Link>
				</div>
			</div>
		</footer>
	);
}
