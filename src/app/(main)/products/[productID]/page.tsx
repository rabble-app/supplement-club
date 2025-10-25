/** @format */

"use client";
import { useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";
import Image from "next/image";

import CorporationBox from "@/components/main/products/CorporationBox";
import TeamPrice from "@/components/main/products/TeamPrice";
import Spinner from "@/components/shared/Spinner";

const CapsuleBox = dynamic(
  () => import("@/components/main/products/CapsuleBox")
);
const MemberCard = dynamic(
  () => import("@/components/main/products/MemberCard")
);
const PreOrderInfo = dynamic(
  () => import("@/components/main/products/PreOrderInfo")
);
const ProductFaqs = dynamic(
  () => import("@/components/main/products/ProductFaqs")
);

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useUser } from "@/contexts/UserContext";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import ConfirmJoining from "@/components/main/products/[productID]/checkout/ConfirmJoining";
import { referalService } from "@/services/referalService";
import IReferalInfoModel from "@/utils/models/api/IReferalInfoModel";
import { usersService } from "@/services/usersService";
import IManagePlanModel from "@/utils/models/IManagePlanModel";
import Link from "next/link";
import useProduct from "@/hooks/useProduct";
import { MemberType } from "@/utils/models/IOrderPackageModel";

export default function ProductDetails() {
  const context = useUser();
  const [api, setApi] = useState<CarouselApi>();
  const [, setHasUserProduct] = useState<boolean>();
  const [referralInfo, setReferralInfo] = useState<IReferalInfoModel>();
  const [subscriptionPlans, setSubscriptionPlans] = useState<
    IManagePlanModel[]
  >([]);

  const searchParams = useSearchParams();
  const teamId = searchParams.get("teamId");

  const {
    product,
    units,
    firstWord,
    rest,
    loading,
    capsuleCount,
    current,
    activeMemberIndex,
    capsules,
    orderPackage,
    membersSection,
    isFoundingProduct,
    isLiveProduct,
    setCurrent,
    setActiveMemberIndex,
    setCapsuleCount,
    foundingMemberPricePerCount,
    gPerCount,
    productRrp,
    setStorageCapsuleCount
  } = useProduct(teamId ?? "", context?.user?.id ?? "");

  useEffect(() => {
    if (product) {
      setHasUserProduct(
        context?.user?.basketsC?.map((c) => c.productId).includes(product.id) ??
          false
      );
    }
  }, [context, product]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // implement sticky button
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const placeholderRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current || !bottomRef.current || !placeholderRef.current)
        return;

      const bottomRect = bottomRef.current.getBoundingClientRect();
      const placeholderRect = placeholderRef.current.getBoundingClientRect();

      const stickyHeight = stickyRef.current.offsetHeight;

      const hasScrolledPast = placeholderRect.top <= 0;
      const isAboveBottom = bottomRect.top > stickyHeight;

      if (hasScrolledPast && isAboveBottom) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getSubscriptionPlan = (productID: string) => {
    return subscriptionPlans.find((plan) =>
      plan.team.basket.some((basket) => basket.product.id === productID)
    );
  };

  const subscriptionPlan = getSubscriptionPlan(product?.id ?? "");

  useEffect(() => {
    if (!product?.priceInfo || typeof product.members !== "number") return;
    const idx =
      product.priceInfo
        .map((p) => p.teamMemberCount)
        .filter((count) => product.members >= count).length - 1;
    setActiveMemberIndex(idx);
  }, [product]);

  useEffect(() => {
    if (!context?.user) return;
    setCapsuleCount(subscriptionPlan?.team.basket[0]?.capsulePerDay ?? capsuleCount);
    setStorageCapsuleCount(subscriptionPlan?.team.basket[0]?.capsulePerDay ?? capsuleCount);
  }, [context?.user, subscriptionPlan, product]);

  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
      try {
        const response = await usersService.getSubscriptionPlans(
          context?.user?.id ?? ""
        );
        setSubscriptionPlans(response);
      } catch (error) {
        console.error("error", error);
      }
    };

    const fetchReferralInfo = async () => {
      try {
        // make this call only if the user is logged in
        if (!context?.user) return;
        const response = await referalService.getReferalInfo();
        setReferralInfo(response);
      } catch (error) {
        console.error("error", error);
      }
    };

    fetchReferralInfo();
    fetchSubscriptionPlans();
  }, [context?.user?.id]);

  const hasProduct = subscriptionPlans.find((p) => p.team.basket.some((basket) => basket.product.id === product?.id));


  let basketPrice = 0;
  let basketPricePerCount = 0;

  if (orderPackage.memberType === MemberType.FOUNDING_MEMBER) {
    basketPrice = Number(subscriptionPlan?.team?.basket[0]?.price);
    basketPricePerCount = Number(foundingMemberPricePerCount);
  } else {
    basketPrice = Number(((product?.rrp ?? 0) * capsuleCount) / gPerCount) * (1 - Number(Number(orderPackage.discount) + Number(orderPackage.extraDiscount)) / 100);
    basketPricePerCount = Number(product?.pricePerCount);
  }

  if (loading) return <Spinner />;

  return (
    <div className="grid lg:grid-cols-2 md:gap-[32px] container-width relative overflow-x-hidden w-full">
      <div className="contents md:grid gap-[32px]">
        <Carousel
          setApi={setApi}
          className="w-full relative order-1 md:order-none pt-[53px] md:pt-[0] h-[430px] md:h-[700px]"
        >
          <CarouselContent
            className={`${isFoundingProduct ? "opacity-[40%]" : ""}`}
          >
            {product?.gallery?.map((item, idx) => (
              <CarouselItem key={`img-${idx + 1}`} className="flex">
                <Image
                  className="w-auto md:w-full object-contain md:h-[700px]"
                  src={item}
                  alt={item}
                  width={300}
                  height={700}
                  priority
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex absolute left-[16px] rounded-[50%] h-[48px] w-[48px] text-black border-black p-0 bg-white" />
          <CarouselNext className="hidden md:flex absolute right-[16px] rounded-[50%] h-[48px] w-[48px] text-black border-black p-0 bg-white" />

          <div className="hidden md:flex left-1/2 transform -translate-x-1/2 absolute bottom-[20px]">
            <div className="flex gap-[8px]">
              {product?.gallery?.map((_, idx) => (
                <div
                  key={`dot-${idx + 1}`}
                  className={`h-[8px] w-[8px] rounded-[50%] ${
                    current === idx + 1 ? "bg-black" : "bg-grey2"
                  }`}
                />
              ))}
            </div>
          </div>

          {isFoundingProduct && !hasProduct && (
            <div className="flex left-0 right-0 transform absolute bottom-[40px] w-full bg-yellow py-[12px] h-[50px] md:h-[72px]">
              <div className="text-blue text-[12px] md:text-[16px] font-bold leading-[14px] md:leading-[24px] font-helvetica flex text-center max-w-[380px] mx-auto px-4 md:px-0">
                PRE-ORDER TO BECOME A FOUNDING MEMBER AND GET AN EXTRA{" "}
                {product?.supplementTeamProducts?.foundingMembersDiscount}% OFF
                FOREVER
              </div>
            </div>
          )}
        </Carousel>
        <div className="order-2 md:order-none bg-white md:bg-transparent mx-[-16px] !mt-0 md:mt-20 md:mx-[0] px-[16px] md:px-[0] mb-[-250px] md:mb-[5px]">
          {product && (
            <TeamPrice
              isFoundingProduct={isFoundingProduct}
              activeMemberIndex={activeMemberIndex}
              capsuleCount={capsuleCount}
              members={product.members}
              price={product.price}
              rrp={product.rrp}
              priceInfo={product.priceInfo!}
              pricePerCount={product.pricePerCount!}
              nextPriceDiscountLevel={product.nextPriceDiscountLevel!}
              discount={product.discount!}
              activePercentageDiscount={product?.activePercentageDiscount ?? 0}
              gramsPerCount={product?.gramsPerCount ?? 0}
              daysUntilNextDrop={product?.daysUntilNextDrop ?? 0}
            />
          )}
        </div>
      </div>
      <div id="breadcrumb" className="flex flex-col gap-[16px] md:gap-[24px] order-3 md:order-none md:top-[0] md:items-start md:self-start md:pb-[50px]">
        <Breadcrumb className="p-[16px] md:p-[0] md:pt-[32px] absolute top-[0] left-[0] md:relative w-full bg-grey11 md:bg-transparent">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="" />
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-start gap-[5px]">
                {firstWord}
                <Image
                  src="/images/TM-black.svg"
                  alt="TM corporation"
                  width={14}
                  height={14}
                />
                {rest}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <CorporationBox
          tags={product?.tags}
          businessName={product?.producer?.businessName}
          description={product?.description}
          name={product?.name}
          quantityOfSubUnitPerOrder={product?.quantityOfSubUnitPerOrder}
          unitsOfMeasurePerSubUnit={product?.unitsOfMeasurePerSubUnit}
          orderPackage={orderPackage}
          businessAddress={product?.producer?.businessAddress}
        />

        {context?.user &&
          isFoundingProduct &&
          subscriptionPlan?.role === "FOUNDING_MEMBER" && (
            <div className="flex justify-between gap-[10px] px-[10px] text-[16px] leading-[16px] font-bold font-inconsolata text-blue bg-blue2 h-[37px] w-max items-center rounded-[100px]">
              <Image
                src="/images/icons/user-badge-icon.svg"
                alt="User badge"
                width={15}
                height={15}
                priority
              />
              YOU&apos;RE A FOUNDING MEMBER!
            </div>
          )}

        {((context?.user && !subscriptionPlan) || !context?.user) && (
          <div className="flex flex-col gap-[24px]">
            <CapsuleBox
              orderPackage={orderPackage}
              rrp={productRrp}
              price={product?.price ?? 0}
              unitsOfMeasurePerSubUnit={product?.unitsOfMeasurePerSubUnit}
              capsuleInfo={product?.capsuleInfo}
              productId={product?.id}
              pricePerCount={product?.pricePerCount ?? 0}
              discount={product?.discount ?? 0}
              activePercentageDiscount={product?.activePercentageDiscount ?? 0}
              isFoundingProduct={isFoundingProduct}
              capsuleCount={capsuleCount}
              capsules={capsules}
              setCapsuleCount={setCapsuleCount}
              setStorageCapsuleCount={setStorageCapsuleCount}
              gPerCount={gPerCount}
              firstDelivery={product?.firstDelivery}
            />

            {isLiveProduct ? (
              <>
                {/* Placeholder keeps layout when sticky becomes fixed */}
                <div
                  ref={placeholderRef}
                  style={{
                    height: isSticky ? stickyRef.current?.offsetHeight : 0,
                  }}
                />
                <div className="flex flex-row justify-center items-center md:items-start gap-[45px] md:gap-[8px]">
                  <div className="grid justify-center gap-[8px] md:max-w-[166px] text-[12px] leading-[14px] text-center">
                    <Image
                      className="mx-auto"
                      src="/images/icons/delivery-blue-icon.svg"
                      alt="delivery icon"
                      width={24}
                      height={24}
                      priority
                    />
                    Free delivery on all orders
                  </div>
                  <div className="grid justify-center gap-[8px] md:max-w-[166px] text-[12px] leading-[14px] text-center">
                    <Image
                      className="mx-auto"
                      src="/images/icons/edit-contained-icon.svg"
                      alt="edit contained"
                      width={24}
                      height={24}
                      priority
                    />
                    Skip, pause or cancel your subscription any time
                  </div>
                  <div className="grid justify-center gap-[8px] md:max-w-[166px] text-[12px] leading-[14px] text-center">
                    <Image
                      className="mx-auto"
                      src="/images/icons/gift-icon.svg"
                      alt="gift icon"
                      width={24}
                      height={24}
                      priority
                    />
                    Refer friends for added discounts
                  </div>
                </div>
              </>
            ) : (
              membersSection.length > 0 && (
                <div className="grid gap-[16px] bg-white">
                  {(isFoundingProduct
                    ? membersSection
                    : [membersSection[1]]
                  ).map((item) => (
                    <MemberCard key={item.id} {...item} />
                  ))}
                </div>
              )
            )}
          </div>
        )}

        {context?.user && (
          <div className="grid gap-[28px] w-full">
            {/* {hasUserProduct && (
              <ReferralCardsWithLink className="border-[1px]" />
            )} */}

            <div>
              {subscriptionPlan?.team.basket.map((item) => (
                <Link
                  href={`/dashboard/manage-plans/${subscriptionPlan?.id}`}
                  className="w-full"
                  key={item.id}
                >
                  <div
                    className={`grid gap-2 items-center grid-cols-[61px_1fr] md:grid-cols-[61px_1fr_210px] shadow-2xl rounded-[12px] py-4 px-3 mr-2`}
                  >
                    <div className="w-[61px] h-[61px] border border-grey28 rounded-[8px]">
                      <Image
                        src="/images/supplement-mockup.png"
                        alt={"supplement-mockup"}
                        width={61}
                        height={61}
                        unoptimized
                      />
                    </div>

                    <div className="grid gap-2">
                      <p className="text-[12px] leading-[12px] font-hagerman text-grey4">
                        CoQ10 - {subscriptionPlan.role.replaceAll("_", " ")}
                      </p>
                      <p className="text-[16px] leading-[16px] font-[800] font-inconsolata text-black">
                        £{basketPrice.toFixed(2)}
                        <span className="text-xs leading-3 text-grey1 font-inconsolata font-bold ml-0.5">
                          (£
                          {Number(basketPricePerCount ?? 0).toFixed(2)}
                          /count)
                        </span>
                      </p>
                      <div className="text-[12px] leading-[12px] text-grey4 font-bold font-inconsolata whitespace-nowrap">
                        RRP{" "}
                        <span className="text-[12px] leading-[12px] line-through font-bold font-inconsolata">
                          £{Number(orderPackage.rrp).toFixed(2)}
                        </span>{" "}
                        <span className="text-[12px] leading-[12px] font-bold text-blue font-inconsolata whitespace-nowrap">
                          {Number(Number(item?.discount) + Number(orderPackage.extraDiscount))?.toFixed(2)}% OFF
                        </span>
                      </div>
                      <p className="text-[12px] leading-[12px] font-medium font-helvetica text-grey4">
                        {item.capsulePerDay}{units} per Day -{" "}
                        {Number(orderPackage.days) * Number(item.capsulePerDay)}{units}
                      </p>
                    </div>
                    <div className="flex justify-between items-center gap-2 w-full">
                      <p
                        className={`text-base font-normal ${
                          orderPackage.memberType === MemberType.FOUNDING_MEMBER
                            ? "bg-[#FFF5E9] text-[#BF6A02]"
                            : "bg-[#E5E6F4] text-blue"
                        } px-2.5 py-1 rounded-full font-hagerman w-fit whitespace-nowrap`}
                      >
                        {orderPackage.memberType === MemberType.FOUNDING_MEMBER ? (
                          "WAITING TO LAUNCH"
                        ) : (
                          <>
                            NEXT DROP:{" "}
                            {product?.deliveryDate
                              ? format(
                                  new Date(product?.deliveryDate ?? ""),
                                  "dd MMMM yyyy"
                                )
                              : "N/A"}
                          </>
                        )}
                      </p>
                      <Image
                        src="/images/icons/chevron-right-icon.svg"
                        alt="chevron right"
                        width={24}
                        height={24}
                        priority
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {product && (subscriptionPlan?.team.basket?.length ?? 0)  > 0 && orderPackage.memberType !== MemberType.FOUNDING_MEMBER && (
              <ConfirmJoining
                orderPackage={orderPackage}
                productName={product?.name}
                email={context?.user?.email}
                userType="existing"
                referralInfo={referralInfo}
                step={1}
              />
            )}
          </div>
        )}
      </div>
      
      {/* Product info moved to standalone container */}
      <div
        id="product-info"
        className={`mt-[50px] md:mt-[-320px] grid gap-[60px] order-4 md:order-none bg-white md:bg-transparent mx-[-16px] md:mx-[0] px-[16px] md:px-[0] ${
          isFoundingProduct ? "" : "pb-[200px]"
        }`}
      >
        <PreOrderInfo productBenefits={product?.productBenefits} />

        <ProductFaqs healthCategories={product?.healthCategories} />
      </div>
    </div>
  );
}
