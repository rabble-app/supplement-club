/** @format */
"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { useUser } from "@/contexts/UserContext";
import type IProductCardModel from "@/utils/models/IProductCardModel";
import { getLastWord, getQuarterInfo } from "@/utils/utils";
import { useEffect, useMemo, useState } from "react";
import { usersService } from "@/services/usersService";
import IManagePlanModel from "@/utils/models/IManagePlanModel";

export default function ProductCard(model: Readonly<IProductCardModel>) {
  const { nextQuarterShort } = getQuarterInfo();
  const [userProducts, setUserProducts] = useState<IManagePlanModel[]>([]);
  const context = useUser();


  useEffect(() => {
    const fetchProduct = async () => {
      const model  = await usersService.getSubscriptionPlans(
        context?.user?.id ?? ""
      );

      setUserProducts(model ?? []);
    };
    fetchProduct();
  }, [context?.user]);

  const hasProduct = userProducts.find((p) => p.team?.basket.some((b) => b.product.id === model.id));

  const discount = useMemo(
    () => Math.abs((model.price / model.rrp - 1) * 100).toFixed(2),
    [model]
  );
  let titleButton = "Join Team";

  if (model.isComming && !hasProduct) {
    titleButton = "Reserve Place";
  }else if (model.firstDelivery) {
    titleButton = "Pre-Order Now";
  } else if (!!hasProduct) {
    titleButton = "See Team";
  }

  const productLink = `/products/${model.id}?teamId=${model.teamId}`;

  const [firstWord, ...rest] = (model.name ?? "").split(" ");
  const earlyMemberText = `This product is currently in production. Pre-order today and get 5% off forever`;
  const foundingMemberText = "Register your interest in this product today and lock in an extra 10% off when the team launches";
  const normalMemberText = "Join today and we’ll send you an alignment package to take you to the " + nextQuarterShort + " Drop";

  const deliveryText = model.firstDelivery ? earlyMemberText : model.status=='PREORDER' ? foundingMemberText : normalMemberText;

  return (
    <div className="grid gap-y-[24px] border-[1px] border-grey3 p-[16px] relative bg-white">
      <span className="text=[16px] leading-[18px] font-helvetica text-blue bg-[#D8FF75] py-[4px] px-[10px] absolute top-[16px] left-[16px] z-[1]">
        3 Month Supply
      </span>
      {model.isComming && (
        <p className="text-[36px] leading-[37px]  bg-[#D8FF75] py-[6px] px-[10px] font-[400] absolute top-[200px] left-[0] right-[0] text-blue font-inconsolata text-center z-[1]">
          Coming Soon
        </p>
      )}
      <div className={`${model.isComming ? "blur-[4px] bg-black/25" : ""}`}>
        <Image
          className={`h-[300px] w-[165px] object-cover mx-auto ${model.isComming ? "rounded-[4px]" : ""}`}
          src={model.imageUrl}
          alt={model.imageKey ?? model.name}
          width={165}
          height={300}
          unoptimized
        />
      </div>
      <div className="grid gap-y-[16px]">
        <div className="flex justify-between items-center leading-[18px]">
          <div className="text-grey4">Quarterly Subscription</div>
          <div className="text-blue grid grid-cols-[18px_1fr] gap-x-[4px] items-center">
            <Image
              src="/images/icons/people.svg"
              alt="People logomark"
              width={18}
              height={18}
            />
            {model.subscribers > 0 && <span>{model.subscribers}</span>}
          </div>
        </div>
        <div className="grid gap-y-[8px]">
          {model.businessName && (
            <p className="leading-[18px] text-[#767676] font-inconsolata text-base font-normal uppercase mb-[10px]">
              {model.businessName} | {getLastWord(model.businessAddress ?? "")}
            </p>
          )}
          <div className="text-[24px] font-[400] text-black font-hagerman flex items-start gap-[5px]">
            {firstWord}
            <Image
              src="/images/TM-black.svg"
              alt="TM corporation"
              width={14}
              height={14}
            />
            {rest?.join(" ")}
          </div>
          <p className="leading-[18px] text-grey5">{model.description}</p>
        </div>

        <div className="grid grid-cols-[18px_1fr] gap-x-[4px] items-start">
          <Image
            src="/images/icons/checkmark-icon.svg"
            alt="Checkmark logomark"
            width={18}
            height={18}
          />
          <p className="leading-[18px] text-black text-base">
            {model.formulationSummary ? model.formulationSummary[0] : null}
          </p>
        </div>

        <div className="text-[16px] leading-[23px] text-grey4 font-inconsolata">
          Monthly:{" "}
          <span className="text-[32px] leading-[23px] font-bold text-black font-inconsolata">
            £{Number(model.price/3).toFixed(2)}
          </span> <span className="text-[16px] leading-[23px] font-bold text-grey4 font-inconsolata">(£{Number(model.price).toFixed(2)}/Drop)</span>
        </div>

        <div className="text-[16px] leading-[23px] text-grey4 font-inconsolata">
          RRP{" "}
          <span className="text-[20px] leading-[23px] font-bold line-through font-inconsolata">
            £{Number(model.rrp/3).toFixed(2)}
          </span>{" "}
          <span className="text-[20px] leading-[23px] font-bold text-blue font-inconsolata">
            {discount}% OFF
          </span>
        </div>

        <Button className="bg-blue font-bold" asChild>
          <Link
            href={productLink}
            className="flex justify-center py-[16px] px-[24px] w-full"
          >
            <span className={`leading-[18px] font-bold font-inconsolata text-lg ${!!hasProduct ? 'mx-auto' : ''}`}>
              {titleButton}{" "}
            </span>
            {/* {!hasProduct && <span className="leading-[18px] font-bold font-inconsolata">
              £{Number(model.price).toFixed(2)}
            </span>} */}
          </Link>
        </Button>

        <div className="flex flex-col text-center text-grey5 leading-[18px] font-helvetica">
          <p className="text-blue uppercase text-[16px] font-helvetica">
            FREE DELIVERY
          </p>
          {/* {model.firstDelivery && (
            <span>Pre-Order Now</span>
          )} */}
          <span>{deliveryText}</span>
        </div>
      </div>
    </div>
  );
}
