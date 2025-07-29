/** @format */

"use client";

import { useEffect, useMemo, useState } from "react";

import { format } from "date-fns";

import { productService } from "@/services/productService";
import ISingleProductModel from "@/utils/models/ISingleProductModel";
import { ITeamBasketModel } from "@/utils/models/api/ITeamBasketModel";
import { useParams, usePathname } from "next/navigation";
import useLocalStorage from "use-local-storage";
import IOrderPackageModel, {
  MemberType,
} from "@/utils/models/IOrderPackageModel";

const useProduct = (teamId?: string, userId?: string, pId?: string) => {
  const [product, setProduct] = useState<ISingleProductModel>();
  const [units, setUnits] = useState("g");
  const [firstWord, setFirstWord] = useState<string>("");
  const [rest, setRest] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [basket, setBasket] = useState<ITeamBasketModel[]>([]);
  const [current, setCurrent] = useState(1);
  const [activeMemberIndex, setActiveMemberIndex] = useState(1);

  const days = 90;
  const [capsuleCount, setCapsuleCount] = useState(1);
  const [storageCapsuleCount, setStorageCapsuleCount] = useLocalStorage<number>(
    "capsuleCount",
    1
  );
  const [hasAlignmentPackage, setHasAlignmentPackage] = useLocalStorage(
    "hasAlignmentPackage",
    false
  );
  const capsules = useMemo(() => capsuleCount * days, [capsuleCount]);

  const gramsPerCount =
    Number(product?.gramsPerCount) === 0 ? 1 : Number(product?.gramsPerCount);
  const productPrice = (capsuleCount / gramsPerCount) * (product?.price ?? 0);
  const productRrp = (capsuleCount / gramsPerCount) * (product?.rrp ?? 0);

  const gPerCount = Number(gramsPerCount) === 0 ? 1 : Number(gramsPerCount);

  const { productID: productId } = useParams();
  const pathname = usePathname();

  useEffect(() => {
    const fetchProduct = async () => {
      const model = await productService.product(
        productId as string ?? pId,
        teamId ?? "",
        userId ?? ""
      );
      setProduct(model);
      setUnits(model.unitsOfMeasurePerSubUnit === "grams" ? "g" : " Capsules");
      const [word, ...others] = (model.name ?? "").split(" ");
      setFirstWord(word);
      setRest(others.join(" "));
      setLoading(false);

      if (pathname.includes("checkout")) {
        setCapsuleCount(storageCapsuleCount ?? 0);
      } else if (model.unitsOfMeasurePerSubUnit === "grams") {
        setStorageCapsuleCount(model.capsuleInfo?.[0]?.capsuleCount ?? 0);
        setCapsuleCount(model.capsuleInfo?.[0]?.capsuleCount ?? 0);
      } else if (model.unitsOfMeasurePerSubUnit === "capsules") {
        setStorageCapsuleCount(model.capsuleInfo?.[1]?.capsuleCount ?? 0);
        setCapsuleCount(model.capsuleInfo?.[1]?.capsuleCount ?? 0);
      }

      if (userId) {
        setBasket(model?.supplementTeamProducts?.team.basket ?? []);
      }
    };
    fetchProduct();
  }, [productId, pId, teamId, userId]);

  // const foundingMemberPrice =
  //   Number(productRrp) *
  //   (1 - (product?.supplementTeamProducts?.foundingMembersDiscount ?? 0) / 100);

  const earlyMemberDiscount =
    Number(product?.supplementTeamProducts?.earlyMembersDiscount ?? 0) +
    Number(product?.discount ?? 0);

  const earlyMemberPrice =
    Number(productRrp) * (1 - (earlyMemberDiscount ?? 0) / 100);

  const earlyMemberPricePerCount =
    Number(product?.rrpPerCount) * (1 - (earlyMemberDiscount ?? 0) / 100);

  const foundingMemberDiscount =
    Number(product?.supplementTeamProducts?.foundingMembersDiscount ?? 0) +
    Number(product?.discount ?? 0);

  const foundingMemberPricePerCount =
    Number(product?.rrpPerCount) * (1 - (foundingMemberDiscount ?? 0) / 100);

    console.log(product?.rrpPerCount)

  const isFoundingProduct =
    product?.supplementTeamProducts?.status === "PREORDER";
  const isEarlyProduct =
    product?.supplementTeamProducts?.status === "ACTIVE" &&
    product?.firstDelivery;
  const isLiveProduct =
    product?.supplementTeamProducts?.status === "ACTIVE" &&
    !product?.firstDelivery;

  let orderProductPrice = productPrice;
  let orderProductPricePerCount = product?.pricePerCount;
  let memberType = MemberType.MEMBER;
  let extraDiscount = 0;
  let remainingSpots = 0;

  if (isFoundingProduct) {
    orderProductPrice = Number(
      (Number(productRrp) * (1 - foundingMemberDiscount / 100)).toFixed(2)
    );
    orderProductPricePerCount = Number(foundingMemberPricePerCount.toFixed(2));
    memberType = MemberType.FOUNDING_MEMBER;
    extraDiscount =
      product?.supplementTeamProducts?.foundingMembersDiscount ?? 0;
    remainingSpots = product?.nextPriceDiscountLevel?.membersNeeded ?? 0;
  } else if (isEarlyProduct) {
    orderProductPrice = Number(
      (Number(productRrp) * (1 - earlyMemberDiscount / 100)).toFixed(2)
    );
    orderProductPricePerCount = Number(earlyMemberPricePerCount.toFixed(2));
    memberType = MemberType.EARLY_MEMBER;
    extraDiscount = product?.supplementTeamProducts?.earlyMembersDiscount ?? 0;
    remainingSpots = product?.nextPriceDiscountLevel?.membersNeeded ?? 0;
  }

  const orderPackage: IOrderPackageModel = {
    memberType: memberType,
    capsuleCount: capsuleCount,
    storageCapsuleCount: storageCapsuleCount ?? 0,
    days: days,
    units: units,
    pricePerCount: orderProductPricePerCount,
    price: orderProductPrice,
    rrp: productRrp,
    rrpPerCount: product?.rrpPerCount ?? 0,
    hasAlignmentPackage: hasAlignmentPackage,
    deliveryDate: product?.deliveryDate
      ? format(new Date(product?.deliveryDate ?? ""), "MMMM dd yyyy")
      : "",
    discount: product?.discount,
    extraDiscount: extraDiscount,
    remainingSpots: remainingSpots,
    imageSrc: "/images/supplement-mockup.png",
    stockStatus: product?.status,
    pochesRequired: product?.pochesRequired ?? 0,
    alignmentPoucheSize: product?.alignmentPoucheSize ?? 0,
    producer: product?.producer?.businessName ?? "",
    pricePerPoche: product?.pricePerPoche ?? 0,
    gPerCount: gPerCount,
  };

  const membersSection = [
    {
      id: 1,
      doseTitle: `${capsuleCount * days}${units} Every 3 months`,
      name: "EARLY MEMBER",
      discountTitle: `${product?.supplementTeamProducts?.earlyMembersDiscount}% OFF TEAM PRICE`,
      capsulePrice: Number(earlyMemberPricePerCount.toFixed(2)),
      price: Number(
        (Number(productRrp) * (1 - earlyMemberDiscount / 100)).toFixed(2)
      ),
      forever: true,
    },
    {
      id: 2,
      doseTitle: `${capsuleCount * days}${units} Every 3 months`,
      name: "MEMBER",
      discountTitle: "Standard Team Price",
      capsulePrice: Number(product?.pricePerCount?.toFixed(2)),
      price: Number(productPrice.toFixed(2)),
    },
  ];

  return {
    product,
    units,
    firstWord,
    rest,
    loading,
    capsuleCount,
    basket,
    orderPackage,
    membersSection,
    isFoundingProduct,
    isEarlyProduct,
    isLiveProduct,
    orderProductPrice,
    hasAlignmentPackage,
    setHasAlignmentPackage,
    orderProductPricePerCount,
    current,
    activeMemberIndex,
    capsules,
    setCapsuleCount,
    storageCapsuleCount,
    setStorageCapsuleCount,
    setActiveMemberIndex,
    setCurrent,
    setBasket,
    setProduct,
    setUnits,
    setFirstWord,
    setRest,
    setLoading,
    productRrp,
    foundingMemberPricePerCount,
    gPerCount,
    productPrice,
    earlyMemberPricePerCount,
    earlyMemberPrice,
    days,
    productId,
    teamId,
  };
};

export default useProduct;
