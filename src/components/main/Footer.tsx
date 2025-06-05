/** @format */

import Image from "next/image";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { productService } from "@/services/productService";

export default async function Footer() {
	const fetchProducts = async () => await productService.productsLimit(3);

	const products = await fetchProducts();
	return (
		<footer className="flex flex-col items-center pt-[40px] pb-[40px] lg:pt-[60px] lg:px-[32px] lg:pb-[30px] bg-cream1">
			<div className="container-width grid gap-[24px] lg:grid-cols-[1fr_805px] lg:gap-[0]">
				<div className="flex flex-col gap-[24px]">
					<p className="text-[24px] leading-[27px] font-hagerman font-normal text-black">
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
