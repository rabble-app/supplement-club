/** @format */

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import type IProductCardModel from "@/utils/models/IProductCardModel";

export default function ProductCard(product: Readonly<IProductCardModel>) {
  return (
    <div className="grid gap-y-[24px] border-[1px] border-grey3 p-[16px] relative bg-white">
      <span className="leading-[18px] text-blue bg-yellow py-[4px] px-[10px] absolute top-[16px] left-[16px]">
        3 Month Supply
      </span>
      {product.isComming && (
        <p className="text-[36px] leading-[41px]  bg-[#FBF89F] py-[6px] px-[10px] font-[400] absolute top-[200px] left-[0] right-[0] text-blue font-inconsolata text-center">
          Coming Soon
        </p>
      )}
      <Image
        className="mx-auto"
        src={product.src}
        alt={product.altSrc}
        width={165}
        height={300}
      />
      <div className="grid gap-y-[16px]">
        <div className="flex justify-between items-center leading-[18px]">
          <div className="text-grey4">Quarterly Subscription</div>
          <div className="text-blue grid grid-cols-[18px_1fr] gap-x-[4px] items-center">
            <Image
              src="/images/people.svg"
              alt="People logomark"
              width={18}
              height={18}
            />
            {product.subscribers > 0 && <span>{product.subscribers}</span>}
          </div>
        </div>

        <div className="grid gap-y-[8px]">
          <p className="leading-[18px] text-black font-inconsolata text-base font-normal uppercase">
            {product.corporation}
          </p>
          <p className="text-[24px] leading-[23px] font-[400] text-black font-hagerman">
            {product.name}
          </p>
          <p className="leading-[18px] text-grey5">{product.description}</p>
        </div>

        <div className="grid grid-cols-[18px_1fr] gap-x-[4px] items-center">
          <Image
            src="/images/icons/checkmark-icon.svg"
            alt="Checkmark logomark"
            width={18}
            height={18}
          />
          <p className="leading-[18px] text-black text-base">
            {product.ingredient}
          </p>
        </div>

        <div className="text-[20px] leading-[23px] text-grey4 font-inconsolata">
          RRP{" "}
          <span className="text-[20px] leading-[23px] font-bold line-through">
            £{product.rrpPrice}
          </span>{" "}
          <span className="text-[20px] leading-[23px] font-[400] text-blue">
            {product.rrpDiscount}% OFF
          </span>
        </div>

        <Button className="bg-blue font-bold" asChild>
          <Link
            href="#"
            className="flex justify-between py-[16px] px-[24px] w-full"
          >
            <span className="leading-[18px] font-bold font-inconsolata text-lg">
              Join Team{" "}
            </span>
            <span className="leading-[18px] font-bold font-inconsolata">
              £{product.price.toFixed(2)}
            </span>
          </Link>
        </Button>

        <div className="flex flex-col text-center text-grey5 leading-[18px]">
          <p className="text-blue uppercase">NEXT DAY DELIVERY</p>
          Join today and your start up package getting you to the Jan 1st Drop
          will arrive tomorrow
        </div>
      </div>
    </div>
  );
}
