/** @format */

"use client";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useUser } from "@/contexts/UserContext";
import type ISummaryProductModel from "@/utils/models/ISummaryProductModel";

import ConfirmJoining from "@/components/main/products/[productID]/checkout/ConfirmJoining";
import CreateAccount from "@/components/main/products/[productID]/checkout/CreateAccount";
import Delivery from "@/components/main/products/[productID]/checkout/Delivery";
import DeliveryAddress from "@/components/main/products/[productID]/checkout/DeliveryAddress";
import AvailablePayment from "@/components/shared/AvailablePayment";
import PaymentList from "@/components/shared/PaymentList";
import Steps from "@/components/shared/Steps";
import SummaryProduct from "@/components/shared/SummaryProduct";
import { format } from "date-fns";
import IOrderSummaryModel from "@/utils/models/IOrderSummaryModel";
import AlignmentDialog from "@/components/main/products/[productID]/checkout/AlignmentDialog";
import ISubscriptionSummaryModel from "@/utils/models/ISubscriptionSummaryModel";
import useLocalStorage from "use-local-storage";
import { IMetadata } from "@/utils/models/api/response/IUserResponse";
import { productService } from "@/services/productService";
import { ITeamBasketModel } from "@/utils/models/api/ITeamBasketModel";
import { referalService } from "@/services/referalService";
import IReferalInfoModel from "@/utils/models/api/IReferalInfoModel";
import { usersService } from "@/services/usersService";
import IManagePlanModel from "@/utils/models/IManagePlanModel";
// import { paymentService } from "@/services/paymentService";
// import IMembershipSubscriptionResponse from "@/utils/models/api/response/IMembershipSubscriptionResponse";

export default function Checkout({
  params,
}: Readonly<{ params: Promise<{ productID: string }> }>) {
  const router = useRouter();

  const context = useUser();

  const [step, setStep] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [checkoutData, setCheckoutData] = useLocalStorage<IMetadata>(
    "checkoutData",
    {}
  );
  const [referralInfo, setReferralInfo] = useState<IReferalInfoModel>();
  const [basket, setBasket] = useState<ITeamBasketModel[]>([]);
  const [isInfoIconClicked, setIsInfoIconClicked] = useState<boolean>(false);
  const [subscriptionPlans, setSubscriptionPlans] = useState<IManagePlanModel[]>([]);
  // const [firstWord, setFirstWord] = useState
  const [, setIsReferralCodeApplied] =
    useState<boolean>(false);
  // const [membershipSubscription, setMembershipSubscription] =
  //   useState<IMembershipSubscriptionResponse>();
  const steps = ["Create an Account", "Delivery Address", "Payment Details"];

  // const checkoutData =
  //   Object.keys(JSON.parse(localStorage.getItem("checkoutData") || "{}"))
  //     .length > 0
  //     ? JSON.parse(localStorage.getItem("checkoutData") || "{}")
  //     : context?.user?.metadata;

  // const [data] = useState(
  //   () =>
  //     Object.keys(checkoutData).length > 0
  //       ? checkoutData
  //       : context?.user?.metadata
  // );

  const data = checkoutData as IMetadata;

  const nextDeliveryProductText = `Next Drop Delivered: ${
    data?.deliveryDate
      ? format(new Date(data?.deliveryDate ?? ""), "MMMM dd yyyy")
      : ""
  }`;

  const [capsulePerDay] = useState(data?.capsuleCount ?? 2);

  const units = data?.unitsOfMeasurePerSubUnit === "grams" ? "g" : " Capsules";

  const days = data?.pouchSize;

  const initialQty = Math.ceil(
    (capsulePerDay * (data?.daysUntilNextDrop ?? 0)) /
      (data?.alignmentPoucheSize ?? 0)
  );

  const [quantity, setQuantity] = useState<number>(initialQty);

  const capsulesPackage = quantity * (data?.alignmentPoucheSize ?? 0);

  const nextYearDate = new Date();
  nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);

  const membershipRrp = Number(process.env.NEXT_PUBLIC_MEMBERSHIP_RRP);
  const membershipAmount = Number(process.env.NEXT_PUBLIC_MEMBERSHIP_AMOUNT);
  const membershipPrice = Number(process.env.NEXT_PUBLIC_MEMBERSHIP_PRICE);
  const membershipDiscount = Number(
    process.env.NEXT_PUBLIC_MEMBERSHIP_DISCOUNT
  );
  const membershipExpiry = format(nextYearDate, "MMMM dd yyyy");

  const orders: IOrderSummaryModel[] = [];
  const subscriptions = [data?.orders?.[0]];
  const membership = [
    {
      id: "12",
      alt: "supplement mockup",
      description: "Free for your first 2 drops",
      name: `Renews at £${membershipAmount}/year ${data.isComming ?'': 'on'}`,
      delivery: data.isComming ? `` : `${format(membershipExpiry, "MMMM dd yyyy")}`,
      src: "/images/membership-card.svg",
      capsules: 0,
      price: membershipPrice,
      imageBorder: true,
      discount: membershipDiscount,
      rrp: membershipRrp,
      isMembership: true,
    },
  ];

  const obj = {
    title: "Order Summary",
    corporation: data?.teamName,
    name: data?.name,
    deliveryText: !data?.isComming ? "FREE NEXT DAY DELIVERY" : "",
    percentage:
      (capsulePerDay * (days ?? 0) * (data?.pricePerCount ?? 0)) /
      Number(data?.rrp),
    rrp: data?.rrp,
    quantityOfSubUnitPerOrder: data?.quantityOfSubUnitPerOrder,
    unitsOfMeasurePerSubUnit: data?.unitsOfMeasurePerSubUnit,
    orders: orders,
    id: 1,
    referals: [],
    subscriptions: subscriptions,
    membership: membership,
    capsulePerDay: capsulePerDay,
    gramsPerCount: data?.gramsPerCount ?? 0,
  };

  const [summary, setSummary] = useState<ISummaryProductModel>(
    obj as ISummaryProductModel
  );

  if (data?.isComming) {
    orders.push({
      price: 0,
      id: "1",
      alt: "supplement mockup",
      description: `${capsulePerDay * (days ?? 0)}${units} Every 3 months`,
      name: "Quarterly Subscription",
      delivery: nextDeliveryProductText,
      src: "/images/supplement-mockup.png",
      capsules: capsulePerDay * (days ?? 0),
      pricePerCount: data?.pricePerCount ?? 0,
      rrp: data?.rrp ?? 0,
      rrpPerCount: data?.rrpPerCount ?? 0,
      capsulePerDay: capsulePerDay,
      gramsPerCount: data?.gramsPerCount ?? 0,
    });
  } else {
    orders.unshift({
      id: "1",
      alt: "",
      description: `${data.alignmentPoucheSize} ${units} pouch`,
      name: "One time Alignment Package",
      src: "/images/supplement-mockup.png",
      delivery: "Delivered Tomorrow",
      capsules: capsulesPackage,
      price: Number(data?.pricePerPoche) ?? 0,
      quantity,
      pricePerCount: data?.pricePerCount ?? 0,
      rrp: data?.rrp ?? 0,
      rrpPerCount: data?.rrpPerCount ?? 0,
      capsulePerDay: capsulePerDay,
      gramsPerCount: data?.gramsPerCount ?? 0,
    });
  }

  const getSubscriptionPlan = (productID: string) => {
    return subscriptionPlans.find((plan) =>
      plan.team.basket.some((basket) => basket.product.id === productID)
    );
  };

  const subscriptionPlan = getSubscriptionPlan(data?.productId ?? "");

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

    fetchSubscriptionPlans();
  }, [context?.user?.id]);

  useEffect(() => {
    setSummary((prev) => ({
      ...prev,
      orders: orders.map((order) => ({
        ...order,
        rrp:
          (checkoutData.quantity ?? 0) *
          (Number(order?.price ?? 0) / (1 - Number(data?.discount) / 100)),
        price: (checkoutData.quantity ?? 0) * (Number(order?.price) ?? 0),
      })),
      subscriptions: subscriptions as ISubscriptionSummaryModel[],
      capsulePerDay: capsulePerDay,
      gramsPerCount: data?.gramsPerCount ?? 0,
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capsulePerDay, checkoutData?.quantity]);

  useEffect(() => {
    const fetchProduct = async () => {
      const { productID } = await params;
      const model = await productService.product(
        productID,
        data?.teamId ?? "",
        context?.user?.id ?? ""
      );
      setBasket(model?.supplementTeamProducts?.team.basket ?? []);
      // setUnits(model.unitsOfMeasurePerSubUnit === "grams" ? "g" : " Capsules");
      // const [word, ...others] = (model.name ?? "").split(" ");
      // setFirstWord(word);
      // setRest(others.join(" "));
      // setLoading(false);

      // setCapsulePerDay(model.capsuleInfo?.[1]?.capsuleCount ?? 0);
    };
    fetchProduct();
  }, [params, context?.user?.id, data?.teamId, step]);

  useEffect(() => {
    if (step === 4) {
      fetchReferralInfo();
    }
  }, [step]);

  const fetchReferralInfo = async () => {
    try {
      const response = await referalService.getReferalInfo();
      setReferralInfo(response);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    if (context?.user) {
      if (subscriptionPlan) {
        setStep(4);
      } else if (context.user.isVerified && !subscriptionPlan) {
        if (context?.user?.shipping) {
          setStep(3);
          return;
        }
        setStep(2);
      } else {
        router.push(
          `/auth/email-verify?redirect=/products/${data?.productId}/checkout`
        );
      }
    }
  }, [context?.user, router, data?.productId, subscriptionPlan]);

  useEffect(() => {
    const totalSum = summary?.orders?.reduce(
      (sum, item) => sum + (item.price ?? 0),
      0
    );

    const totalSumOfSubs =
      summary?.subscriptions?.reduce(
        (sum, item) => sum + (item?.price ?? 0),
        0
      ) ?? 0;

      const founderDiscountedTotalSum =  totalSumOfSubs * (1 - (data.founderDiscount ?? 0) / 100);
      const earlyMemberDiscountedTotalSum =  totalSumOfSubs * (1 - (data.earlyMemberDiscount ?? 0) / 100);

      let discountedTotalSum = totalSum;

      if (data.isComming) {
        discountedTotalSum = totalSum + founderDiscountedTotalSum;
      } else if (data.firstDelivery) {
        discountedTotalSum = totalSum + earlyMemberDiscountedTotalSum;
      } else {
        discountedTotalSum = totalSum + totalSumOfSubs;
      }

      setTotalPrice(discountedTotalSum);
  }, [summary]);

  // useEffect(() => {
  //   if (context?.user?.id) {
  //     getMembershipSubscription(context?.user?.id);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [context?.user?.id]);

  // async function getMembershipSubscription(id: string) {
  //   const response = await paymentService.getMembershipSubscription(id);
  //   console.log("response", response);
  //   setMembershipSubscription(response);
  // }

  const PreOrderMessage = () => {
  return (
    <div className="grid gap-[16px]">
      <p className="text-[20px] leading-[24px] font-bold font-inconsolata">
        PRE-ORDER Now to Become a Founding Member
      </p>
      <div className="grid gap-[8px]">
        <p className="text-[14px] leading-[16px] font-helvetica text-grey6">
          Only get charged when we hit {data.founderMembersNeeded} pre-orders.
        </p>
        <p className="text-[14px] leading-[16px] font-helvetica text-grey6">
          By becoming a founding member you get an extra {data.founderDiscount}% off the team price
          forever.
        </p>
        <p className="text-[14px] leading-[16px] font-helvetica text-grey6">
          Lead time is {data.leadTime} weeks from when we charge you - but you get {data.founderDiscount}% off
          your subscription forever.
        </p>
      </div>
    </div>
  );
};

  async function successAction() {
    const currentStep = step + 1;
    setStep(currentStep);
  }

  const updateQuantityAction = (val: number) => {
    setQuantity(val);
    setCheckoutData((prev) => {
      return {
        ...prev,
        quantity: val,
      };
    });
  };

  useEffect(() => {
    if (!context?.user) {
      setStep(1);
    }
  }, [context?.user]);

  useEffect(() => {
    if ((step !== 4)) {
      if (context?.user && (subscriptionPlan?.team.basket.length ?? 0) > 0) {
        router.push(`/products/${data?.productId}?teamId=${data?.teamId}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context?.user, subscriptionPlan, data?.productId, data?.teamId, step]);

  return (
    <>
      {(step !== 4 || (step===4 && data.isComming)) && (
        <AlignmentDialog
          daysUntilNextDrop={data?.daysUntilNextDrop ?? 0}
          deliveryDate={data?.deliveryDate ?? ""}
          orders={summary?.orders}
          updateQuantityAction={updateQuantityAction}
          discount={data?.discount ?? 0}
          setSummary={setSummary}
          isComming={data?.isComming}
          isInfoIconClicked={isInfoIconClicked}
          setIsInfoIconClicked={setIsInfoIconClicked}
          firstDelivery={data?.firstDelivery}
        />
      )}

      <div className="grid md:grid-cols-2 gap-[16px] px-[16px] mx-[-16px] container-width">
        <div className="flex flex-col gap-[40px] md:mb-[40px]">
          <Steps activeStep={step} steps={steps} />

          {step === 1 && (
            <CreateAccount params={params}>
              {data?.isComming && <PreOrderMessage />}{" "}
            </CreateAccount>
          )}
          {step === 2 && (
            <DeliveryAddress step={step} updateStepAction={setStep}>
              {data?.isComming && <PreOrderMessage />}{" "}
            </DeliveryAddress>
          )}
          {step === 3 && (
            <PaymentList
              productId={data?.productId ?? ""}
              topupQuantity={quantity}
              teamId={data?.teamId ?? ""}
              isComming={data?.isComming}
              totalPrice={totalPrice}
              successAction={successAction}
            />
          )}
          {step === 4 && (
            <ConfirmJoining
              email={context?.user?.email}
              userType="new"
              referralInfo={referralInfo}
              step={step}
            />
          )}
        </div>

        <div className="mx-[-16px] md:mx-[0] mt-[32px]">
          <SummaryProduct
            model={summary}
            showTopLine={data?.isComming}
            quantityAction={updateQuantityAction}
            step={step}
            referralInfo={referralInfo}
            setIsReferralCodeApplied={setIsReferralCodeApplied}
            setIsInfoIconClicked={setIsInfoIconClicked}
          />
          {step === 4 && <Delivery />}
          {step < 4 && <AvailablePayment />}
        </div>
      </div>
    </>
  );
}
