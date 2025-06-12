/** @format */

"use client";
import { useEffect, useMemo, useRef, useState } from "react";

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
import { productService } from "@/services/productService";
import { useProductStore } from "@/stores/productStore";
import type { IMemberCardModel } from "@/utils/models/IMemberCardModel";
import type IOrderSummaryModel from "@/utils/models/IOrderSummaryModel";
import type ISingleProductModel from "@/utils/models/ISingleProductModel";
import type ISummaryProductModel from "@/utils/models/ISummaryProductModel";
import { getQuarterInfo } from "@/utils/utils";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import ConfirmJoining from "@/components/main/products/[productID]/checkout/ConfirmJoining";
import { referalService } from "@/services/referalService";
import IReferalInfoModel from "@/utils/models/api/IReferalInfoModel";
import { ITeamBasketModel } from "@/utils/models/api/ITeamBasketModel";
import { usersService } from "@/services/usersService";
import IManagePlanModel from "@/utils/models/IManagePlanModel";
import Link from "next/link";

interface ProductDetailsProps {
  productID: string;
}

export default function ProductDetails({
  params,
}: Readonly<{ params: Promise<ProductDetailsProps> }>) {
  const [loading, setLoading] = useState(true);
  const context = useUser();
  const productStore = useProductStore();
  const [api, setApi] = useState<CarouselApi>();
  const [members, setMembers] = useState<IMemberCardModel[]>([]);
  const [orders, setOrders] = useState<IOrderSummaryModel[]>([]);
  const [, setHasUserProduct] = useState<boolean>();
  const [referralInfo, setReferralInfo] = useState<IReferalInfoModel>();
  const [basket, setBasket] = useState<ITeamBasketModel[]>([]);
  const [subscriptionPlans, setSubscriptionPlans] = useState<
    IManagePlanModel[]
  >([]);

  const searchParams = useSearchParams();
  const teamId = searchParams.get("teamId");

  const days = 90;

  const [current, setCurrent] = useState(1);
  const [firstWord, setFirstWord] = useState<string>("");
  const [rest, setRest] = useState<string>("");
  const [capsulePerDay, setCapsulePerDay] = useState(2);
  const [product, setProduct] = useState<ISingleProductModel>();
  const [units, setUnits] = useState("g");
  const [, setSummary] = useState<ISummaryProductModel>(
    {} as ISummaryProductModel
  );
  const [activeMemberIndex, setActiveMemberIndex] = useState(1);

  const gramsPerCount =
    Number(product?.gramsPerCount) === 0 ? 1 : Number(product?.gramsPerCount);
  const productPrice = (capsulePerDay / gramsPerCount) * (product?.price ?? 0);
  const productRrp = (capsulePerDay / gramsPerCount) * (product?.rrp ?? 0);

  const [selectedState, setSelectedState] = useState(2);
  const [capsuleCount, setCapsuleCount] = useState(0);
  const capsules = useMemo(() => selectedState * days, [selectedState]);
  const gPerCount = Number(gramsPerCount) === 0 ? 1 : Number(gramsPerCount);

  const { currentQuarter } = getQuarterInfo();
  useEffect(() => {
    if (product) {
      setHasUserProduct(
        context?.user?.basketsC?.map((c) => c.productId).includes(product.id) ??
          false
      );
    }
  }, [context, product]);

  const nextDeliveryProductText = `Next Drop Delivered: ${
    product?.deliveryDate
      ? format(new Date(product?.deliveryDate ?? ""), "MMMM dd yyyy")
      : ""
  }`;

  const [nextQuater] = useState(
    currentQuarter + 1 > 4 ? 1 : currentQuarter + 1
  );

  useEffect(() => {
    const fetchProduct = async () => {
      const { productID } = await params;
      const model = await productService.product(
        productID,
        teamId ?? "",
        context?.user?.id ?? ""
      );
      setProduct(model);
      setUnits(model.unitsOfMeasurePerSubUnit === "grams" ? "g" : " Capsules");
      const [word, ...others] = (model.name ?? "").split(" ");
      setFirstWord(word);
      setRest(others.join(" "));
      setLoading(false);

      setCapsulePerDay(model.capsuleInfo?.[1]?.capsuleCount ?? 0);

      if (context?.user?.id) {
        setBasket(model?.supplementTeamProducts?.team.basket ?? []);
      }
    };
    fetchProduct();
  }, [params, teamId, context?.user?.id]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  function updateCapsulePerDay(value: number) {
    setCapsulePerDay(value);
    productStore.setCapsulesPerDay(value);
  }

  useEffect(() => {
    const order = {
      id: "2",
      description: `${capsulePerDay * days} ${units} Every 3 months`,
      name: "Quarterly Subscription",
      delivery: nextDeliveryProductText,
      src: "/images/supplement-mockup.png",
      alt: "supplement mockup",
      capsules: capsulePerDay * days,
      price: productPrice,
      pricePerPoche: product?.pricePerPoche ?? 0,
      pricePerCount: product?.pricePerCount ?? 0,
      rrpPerCount: product?.rrpPerCount ?? 0,
      rrp: productRrp,
      capsulePerDay: capsulePerDay,
      gramsPerCount: product?.gramsPerCount ?? 0,
      topUpQuantity: capsulePerDay,
    };
    const summaryOrders = [order];
    const orders = [order];

    if (product?.isComming) {
      orders.unshift({
        id: "1",
        alt: "Founding Member Badge",
        name: "Founding Member 10% Discount",
        delivery: "Forever",
        src: "/images/icons/user-badge-icon.svg",
        capsules: 0,
        isFoundingMember: true,
        price: -4.5,
        pricePerPoche: product?.pricePerPoche ?? 0,
        pricePerCount: product?.pricePerCount ?? 0,
        rrpPerCount: product?.rrpPerCount ?? 0,
        rrp: productRrp,
        capsulePerDay: capsulePerDay,
        gramsPerCount: product?.gramsPerCount ?? 0,
        quantity: capsulePerDay,
      } as never);
    } else if (!product?.isComming) {
      summaryOrders.unshift({
        id: "1",
        alt: "",
        description: `${
          capsulePerDay * (product?.daysUntilNextDrop ?? 0)
        }${units} to see you to Q${nextQuater}`,
        name: "One time Alignment Package",
        delivery: "Delivered Tomorrow ",
        src: "/images/ubiquinol.svg",
        capsules: capsulePerDay * (product?.daysUntilNextDrop ?? 0),
        price: productPrice,
        pricePerPoche: product?.pricePerPoche ?? 0,
        pricePerCount: product?.pricePerCount ?? 0,
        rrpPerCount: product?.rrpPerCount ?? 0,
        rrp: productRrp,
        capsulePerDay: capsulePerDay,
        gramsPerCount: product?.gramsPerCount ?? 0,
      } as never);
    } else if (product) {
      const members = [
        {
          id: 1,
          doseTitle: `${capsulePerDay * days}${units} Every 3 months`,
          name: "FOUNDING MEMBER",
          discountTitle: `${product?.supplementTeamProducts?.foundingMembersDiscount}% OFF TEAM PRICE`,
          doseValue: "First 50 Spots",
          price: product?.supplementTeamProducts?.foundingMembersDiscount
            ? capsulePerDay * (product?.daysUntilNextDrop ?? 0) -
              (capsulePerDay *
                (product?.daysUntilNextDrop ?? 0) *
                product?.supplementTeamProducts?.foundingMembersDiscount) /
                100
            : capsulePerDay * (product?.daysUntilNextDrop ?? 0),
          capsulePrice: product?.pricePerCount ?? 0,
          spotsRemainds: 4,
          forever: true,
          isActive: true,
        },
        {
          id: 2,
          doseTitle: `${capsulePerDay * days}${units} Every 3 months`,
          name: "EARLY MEMBER",
          doseValue: "Next 200 Spots",
          discountTitle: `${product?.supplementTeamProducts?.earlyMembersDiscount}% OFF TEAM PRICE`,
          price: product?.supplementTeamProducts?.earlyMembersDiscount
            ? capsulePerDay * (product?.daysUntilNextDrop ?? 0) -
              (capsulePerDay *
                (product?.daysUntilNextDrop ?? 0) *
                product?.supplementTeamProducts?.earlyMembersDiscount) /
                100
            : capsulePerDay * (product?.daysUntilNextDrop ?? 0),
          capsulePrice: product?.pricePerCount ?? 0,
          forever: true,
        },
        {
          id: 3,
          doseTitle: `${capsulePerDay * days}${units} Every 3 months`,
          name: "MEMBER",
          capsulePrice: product?.pricePerCount ?? 0,
          discountTitle: "Standard Team Price",
          price: capsulePerDay * (product?.daysUntilNextDrop ?? 0),
        },
      ];
      setMembers(members);
    }
    const obj = {
      percentage:
        (capsulePerDay * days * (product?.pricePerCount ?? 0)) /
        Number(product?.rrp),
      rrp: productRrp,
      quantityOfSubUnitPerOrder: product?.unitsOfMeasurePerSubUnit,
      unitsOfMeasurePerSubUnit: product?.unitsOfMeasurePerSubUnit,
      orders: summaryOrders,
      price: productPrice,
      id: 1,
      referals: [],
      subscriptions: [],
      membership: [],
    };
    setSummary(obj);

    setOrders(orders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capsulePerDay, product, nextDeliveryProductText, nextQuater, units]);

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
    setCapsuleCount(subscriptionPlan?.team.basket[0]?.capsulePerDay ?? 0);
  }, [context?.user, subscriptionPlan]);

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
        const response = await referalService.getReferalInfo();
        setReferralInfo(response);
      } catch (error) {
        console.error("error", error);
      }
    };

    fetchReferralInfo();
    fetchSubscriptionPlans();
  }, [context?.user?.id]);

  if (loading) return <Spinner />;

  return (
    <div className="grid lg:grid-cols-2 md:gap-[32px] container-width relative overflow-x-hidden w-full">
      <div className="contents md:grid gap-[32px]">
        <Carousel
          setApi={setApi}
          className="w-full relative order-1 md:order-none pt-[53px] md:pt-[0] h-[430px] md:h-auto"
        >
          <CarouselContent
            className={`${product?.isComming ? "opacity-[40%]" : ""}`}
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

          {product?.isComming && (
            <div className="flex left-0 right-0 transform absolute bottom-[40px] w-full bg-blue py-[12px] h-[72px]">
              <div className="text-white text-[16px] leading-[24px] font-helvetica flex text-center max-w-[300px] mx-auto">
                PRE-ORDER TO BECOME FOUNDING MEMBER AND GET 10%OFF - FOREVER
              </div>
            </div>
          )}

          <div className="flex justify-between items-center md:hidden pt-[24px]">
            <p className="leading-[18px] text-grey4 mb-[2px]">
              Quarterly Subscription
            </p>
            <div className="grid grid-cols-[24px_28px] gap-[4px] text-blue text-[16px] leading-[24px]">
              <Image
                src="/images/icons/user-profile-group-blue-icon.svg"
                className="mb-auto"
                alt="User profile group icon"
                width={24}
                height={24}
                priority
              />
              678
            </div>
          </div>
        </Carousel>

        <div className="order-3 md:order-none bg-grey11 md:bg-transparent mx-[-16px] mt-20 md:mt-0 md:mx-[0] px-[16px] md:px-[0]">
          {product && (
            <TeamPrice
              rrp={product.rrp}
              isComming={product.isComming}
              members={product.members}
              price={product.price}
              priceInfo={product?.priceInfo ?? []}
              pricePerCount={product?.pricePerCount ?? 0}
              nextPriceDiscountLevel={
                product?.nextPriceDiscountLevel ?? {
                  membersNeeded: 0,
                  expectedDiscount: 0,
                }
              }
              activeMemberIndex={activeMemberIndex}
              discount={product?.discount ?? 0}
              activePercentageDiscount={product?.activePercentageDiscount ?? 0}
              gramsPerCount={product?.gramsPerCount ?? 0}
              capsuleCount={capsuleCount}
            />
          )}

          <div
            className={`grid gap-[60px] mt-[51px] ${
              product?.isComming ? "md:mt-[70px]" : "md:mt-[0] pb-[200px]"
            }`}
          >
            <PreOrderInfo productBenefits={product?.productBenefits} />

            <ProductFaqs healthCategories={product?.healthCategories} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[16px] md:gap-[24px] order-2 md:order-none md:top-[0] md:items-start md:self-start md:pb-[50px]">
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
        />

        {context?.user && product?.isComming && (
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

        {((context?.user && basket.length === 0 && !product?.isComming) ||
          (!context?.user && !product?.isComming)) && (
          <div className="flex flex-col gap-[24px]">
            <CapsuleBox
              rrp={productRrp}
              rrpPerCount={product?.rrpPerCount ?? 0}
              price={product?.price ?? 0}
              unitsOfMeasurePerSubUnit={product?.unitsOfMeasurePerSubUnit}
              capsuleInfo={product?.capsuleInfo}
              orders={orders}
              productId={product?.id}
              selectCapsulePerDayAction={updateCapsulePerDay}
              pricePerCount={product?.pricePerCount ?? 0}
              activeMemberIndex={activeMemberIndex}
              discount={product?.discount ?? 0}
              activePercentageDiscount={product?.activePercentageDiscount ?? 0}
              deliveryDate={product?.deliveryDate ?? ""}
              teamStatus={product?.supplementTeamProducts?.status ?? ""}
              daysUntilNextDrop={product?.daysUntilNextDrop ?? 0}
              isComming={product?.isComming ?? false}
              pouchSize={product?.poucheSize ?? 0}
              alignmentPoucheSize={product?.alignmentPoucheSize ?? 0}
              teamName={product?.producer?.businessName ?? ""}
              name={product?.name ?? ""}
              quantityOfSubUnitPerOrder={
                product?.quantityOfSubUnitPerOrder ?? 0
              }
              gramsPerCount={product?.gramsPerCount ?? 0}
              pricePerPoche={product?.pricePerPoche ?? 0}
              capsuleCount={capsuleCount}
              capsules={capsules}
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              setCapsuleCount={setCapsuleCount}
              gPerCount={gPerCount}
            />
            {/* Placeholder keeps layout when sticky becomes fixed */}
            <div
              ref={placeholderRef}
              style={{ height: isSticky ? stickyRef.current?.offsetHeight : 0 }}
            />
            <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-[45px] md:gap-[8px]">
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
          </div>
        )}

        {!context?.user && product?.isComming && (
          <div className="flex flex-col gap-[24px]">
            <CapsuleBox
              rrp={productRrp}
              rrpPerCount={product?.rrpPerCount ?? 0}
              price={product?.price ?? 0}
              orders={orders}
              unitsOfMeasurePerSubUnit={product.unitsOfMeasurePerSubUnit}
              selectCapsulePerDayAction={updateCapsulePerDay}
              capsuleInfo={product?.capsuleInfo}
              productId={product?.id}
              pricePerCount={product?.pricePerCount ?? 0}
              activeMemberIndex={activeMemberIndex}
              discount={product?.discount ?? 0}
              activePercentageDiscount={product?.activePercentageDiscount ?? 0}
              deliveryDate={product?.deliveryDate ?? ""}
              teamStatus={product?.supplementTeamProducts?.status ?? ""}
              daysUntilNextDrop={product?.daysUntilNextDrop ?? 0}
              isComming={product?.isComming ?? false}
              pouchSize={product?.poucheSize ?? 0}
              alignmentPoucheSize={product?.alignmentPoucheSize ?? 0}
              teamName={product?.producer?.businessName ?? ""}
              name={product?.name ?? ""}
              quantityOfSubUnitPerOrder={
                product?.quantityOfSubUnitPerOrder ?? 0
              }
              gramsPerCount={product?.gramsPerCount ?? 0}
              pricePerPoche={product?.pricePerPoche ?? 0}
              capsuleCount={capsuleCount}
              capsules={capsules}
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              setCapsuleCount={setCapsuleCount}
              gPerCount={gPerCount}
            />

            {members.length > 0 && (
              <div className="grid gap-[16px] bg-white">
                {members.map((item) => (
                  <MemberCard key={item.id} {...item} />
                ))}
              </div>
            )}
          </div>
        )}
        {context?.user && (
          <div className="grid gap-[28px] w-full">
            {/* {hasUserProduct && (
              <ReferralCardsWithLink className="border-[1px]" />
            )} */}

            <div>
              {basket.map((item) => (
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
                        CoQ10 - MEMBER
                      </p>
                      <p className="text-[16px] leading-[16px] font-[800] font-inconsolata text-black">
                        £
                        {(Number(item.price) * (item.quantity ?? 0)).toFixed(2)}
                        <span className="text-xs leading-3 text-grey1 font-inconsolata font-bold ml-0.5">
                          (£{Number(product?.pricePerCount ?? 0).toFixed(2)}
                          /count)
                        </span>
                      </p>
                      <div className="text-[12px] leading-[12px] text-grey4 font-bold font-inconsolata whitespace-nowrap">
                        RRP{" "}
                        <span className="text-[12px] leading-[12px] line-through font-bold font-inconsolata">
                          £
                          {(
                            Number(product?.rrp ?? 0) * (item.quantity ?? 0)
                          ).toFixed(2)}
                        </span>{" "}
                        <span className="text-[12px] leading-[12px] font-bold text-blue font-inconsolata whitespace-nowrap">
                          {product?.discount?.toFixed(2)}% OFF
                        </span>
                      </div>
                      <p className="text-[12px] leading-[12px] font-medium font-helvetica text-grey4">
                        {item.capsulePerDay} {units} per Day -{" "}
                        {days * Number(item.capsulePerDay)} {units}
                      </p>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-base font-normal text-blue bg-[#E5E6F4] px-2.5 py-1 rounded-full font-hagerman w-fit">
                        NEXT DROP:{" "}
                        {product?.deliveryDate
                          ? format(
                              new Date(product?.deliveryDate ?? ""),
                              "dd MMMM yyyy"
                            )
                          : "N/A"}
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

            {basket.length > 0 && (
              <ConfirmJoining
                email={context?.user?.email}
                userType="existing"
                referralInfo={referralInfo}
                step={1}
              />
            )}

            {/* <SummaryProduct
              showOnlyTotal={false}
              className={`bg-[#F6F6F6] ${
                product?.isComming ? "md:p-[24px]" : ""
              }`}
              model={summary}
            /> */}
          </div>
        )}
      </div>
    </div>
  );
}
