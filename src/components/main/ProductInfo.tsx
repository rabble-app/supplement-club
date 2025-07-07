/** @format */

import Image from "next/image";
import Link from "next/link";

import type ISingleProductModel from "@/utils/models/ISingleProductModel";
import { Button } from "../ui/button";

export default function ProductInfo({
  product,
}: Readonly<{ product?: ISingleProductModel }>) {
  return (
    <div className="grid lg:grid-cols-2">
      <div className="bg-blue lg:ml-auto w-full">
        <div className="grid gap-[56px] lg:gap-[112px] pt-[40px] pb-[76px] px-[16px] lg:px-[32px]">
          <p className="max-w-[612px] text-[44px] lg:text-[50px] leading-[40px] lg:leading-[58px] text-white order-1 font-hagerman">
            Get started on <br /> Supplement club
          </p>
          <div className="max-w-[500px] text-[32px] lg:text-[48px] leading-[36px] lg:leading-[55px] font-[400] text-white order-2 font-hagerman">
            <p className="pb-[8px] text-[20px] leading-[24px] text-grey9 font-inconsolata">
              {product?.producer?.businessName}
            </p>
            {product?.name}
          </div>
          {product && (
            <Image
              className="block lg:hidden order-3 mx-auto w-full"
              src={product.imageUrl}
              alt={product.imageKey ?? product.name}
              width={366}
              height={635}
              unoptimized
            />
          )}
          <div className="w-full mx-auto lg:m-0 lg:max-w-[410px] order-4">
            <p className="leading-[18px] text-grey9 mb-[2px]">
              Quarterly Subscription
            </p>

            <div className="text-[40px] leading-[46px] font-[700] text-white mb-[2px] flex items-center font-inconsolata">
              £{Number(product?.price ?? 0).toFixed(2)}{" "}
              <span className="text-[16px] leading-[18px] text-grey9 ml-[2px]">
                (£{Number(product?.pricePerCount ?? 0).toFixed(2)} / count)
              </span>
            </div>

            <div className="text-[24px] leading-[27px] text-grey9 mb-[20px] lg:mb-[16px] font-inconsolata">
              RRP{" "}
              <span className="text-[24px] leading-[27px] line-through font-[400] font-inconsolata">
                £{product?.rrp}
              </span>{" "}
              <span className="text-[24px] leading-[27px] font-[700] text-blue4 font-inconsolata">
                {Number(product?.activePercentageDiscount)}% OFF
              </span>
            </div>

            <Button
              className="bg-[#FBF89F] leading-[18px] text-blue w-full font-bold mb-[14px] font-inconsolata"
              asChild
            >
              <Link href={`/products/${product?.id}`}>Buy Now</Link>
            </Button>

            <div className="flex justify-between">
              <div className="flex gap-[6px] items-center text-[12px] leading-[20px] font-inter text-white">
                <Image
                  className="text-white"
                  src="/images/icons/check-icon.svg"
                  alt="Checkmark icon"
                  width={16}
                  height={16}
                />
                Update or cancel anytime
              </div>
              <div className="flex gap-[6px] items-center text-[12px] leading-[20px] font-inter text-white">
                <Image
                  src="/images/icons/check-icon.svg"
                  alt="Checkmark icon"
                  width={16}
                  height={16}
                />
                Next day delivery startup pack
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[736px] mr-auto relative hidden w-0 lg:w-full lg:grid lg:grid-cols-2">
        <div className="bg-blue" />
        <div />
        {product && (
          <Image
            className="hidden lg:block order-3 lg:h-full absolute"
            src={product.imageUrl}
            alt={product.imageKey ?? product.name}
            width={736}
            height={736}
            unoptimized
          />
        )}
      </div>
    </div>
  );
}
