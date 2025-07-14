/** @format */

"use client";
import { useEffect, useState } from "react";

import { useParams, useRouter, useSearchParams } from "next/navigation";

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
import AlignmentDialog from "@/components/main/products/[productID]/checkout/AlignmentDialog";
import useLocalStorage from "use-local-storage";
import { referalService } from "@/services/referalService";
import IReferalInfoModel from "@/utils/models/api/IReferalInfoModel";
import { usersService } from "@/services/usersService";
import IManagePlanModel from "@/utils/models/IManagePlanModel";
import useProduct from "@/hooks/useProduct";
import { MemberType } from "@/utils/models/IOrderPackageModel";

export default function Checkout({
  params,
}: Readonly<{ params: Promise<{ productID: string }> }>) {
  const router = useRouter();

  const context = useUser();

  const [step, setStep] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [storageQuantity, setStorageQuantity] = useLocalStorage(
    "storageQuantity",
    0
  );

  const [referralInfo, setReferralInfo] = useState<IReferalInfoModel>();
  const [isInfoIconClicked, setIsInfoIconClicked] = useState<boolean>(false);
  const [subscriptionPlans, setSubscriptionPlans] = useState<
    IManagePlanModel[]
  >([]);
  const [, setIsReferralCodeApplied] = useState<boolean>(false);
  const steps = ["Create an Account", "Delivery Address", "Payment Details"];

  const getSubscriptionPlan = (productID: string) => {
    return subscriptionPlans.find((plan) =>
      plan.team.basket.some((basket) => basket.product.id === productID)
    );
  };

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

  const searchParams = useSearchParams();
  const { productID } = useParams<{ productID: string }>();

  const contextTeamId = context?.user?.metadata?.teamId;
  let teamId = subscriptionPlans.length > 0 ? searchParams.get("teamId") : contextTeamId;

  const {
    product: productMain,
    orderPackage,
    gPerCount,
    hasAlignmentPackage,
    setHasAlignmentPackage,
  } = useProduct(searchParams.get("teamId") ?? contextTeamId ?? "", context?.user?.id ?? "");

  const subscriptionPlan = getSubscriptionPlan(orderPackage?.productId ?? "");

  useEffect(() => {
    let totalPrice = orderPackage.price;

    if ([MemberType.FOUNDING_MEMBER, MemberType.EARLY_MEMBER].includes(orderPackage.memberType)) {
      totalPrice = orderPackage.price;
    } else if (orderPackage.memberType === MemberType.MEMBER) {
      if(hasAlignmentPackage) {
      totalPrice =
          (orderPackage?.pricePerPoche ?? 0) *
          (storageQuantity) + orderPackage.price;
      } else {
        totalPrice = orderPackage.price;
      }
    }

    setTotalPrice(totalPrice);
  }, [orderPackage, storageQuantity, hasAlignmentPackage]);

  useEffect(() => {
    if (step === 4) {
      fetchReferralInfo();
    }
  }, [step]);

  useEffect(() => {
    if (orderPackage.memberType === MemberType.MEMBER && storageQuantity > 0) {
      setHasAlignmentPackage(true);
    } else {
      setHasAlignmentPackage(false);
    }
  }, [storageQuantity]);

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
          `/auth/email-verify?redirect=/products/${orderPackage?.productId}/checkout`
        );
      }
    }
  }, [context?.user, router, orderPackage?.productId, subscriptionPlan]);

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
            Only get charged when we hit {orderPackage.remainingSpots}{" "}
            pre-orders.
          </p>
          <p className="text-[14px] leading-[16px] font-helvetica text-grey6">
            By becoming a founding member you get an extra{" "}
            {orderPackage.extraDiscount}% off the team price forever.
          </p>
          <p className="text-[14px] leading-[16px] font-helvetica text-grey6">
            Lead time is {productMain?.leadTime} weeks from when we charge you -
            but you get {orderPackage.extraDiscount}% off your subscription
            forever.
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
    setStorageQuantity(val);
  };

  useEffect(() => {
    if (!context?.user) {
      setStep(1);
    }
  }, [context?.user]);

  useEffect(() => {
    if (step !== 4) {
      if (context?.user && (subscriptionPlan?.team.basket.length ?? 0) > 0) {
        router.push(
          `/products/${orderPackage?.productId}?teamId=${orderPackage?.teamId}`
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    context?.user,
    subscriptionPlan,
    orderPackage?.productId,
    orderPackage?.teamId,
    step,
  ]);

  return (
    <>
      {productMain && (
        <AlignmentDialog
          orderPackage={orderPackage}
          daysUntilNextDrop={productMain?.daysUntilNextDrop ?? 0}
          deliveryDate={productMain?.deliveryDate ?? ""}
          orderDate={productMain?.orderDate ?? ""}
          updateQuantityAction={updateQuantityAction}
          isInfoIconClicked={isInfoIconClicked}
          setIsInfoIconClicked={setIsInfoIconClicked}
          step={step}
          leadTime={productMain?.leadTime ?? 0}
          gPerCount={gPerCount}
          storageQuantity={storageQuantity}
          setHasAlignmentPackage={setHasAlignmentPackage}
          hasSubscriptionPlan={subscriptionPlans.length > 0}
        />
      )}

      <div className="grid md:grid-cols-2 gap-[16px] px-[16px] mx-[-16px] container-width">
        <div className="flex flex-col gap-[40px] md:mb-[40px]">
          <Steps activeStep={step} steps={steps} />

          {step === 1 && (
            <CreateAccount params={params}>
              {orderPackage.memberType === MemberType.FOUNDING_MEMBER && (
                <PreOrderMessage />
              )}{" "}
            </CreateAccount>
          )}
          {step === 2 && (
            <DeliveryAddress step={step} updateStepAction={setStep}>
              {orderPackage.memberType === MemberType.FOUNDING_MEMBER && (
                <PreOrderMessage />
              )}{" "}
            </DeliveryAddress>
          )}
          {step === 3 && (
            <PaymentList
              orderPackage={orderPackage}
              poucheSize={productMain?.poucheSize}
              pricePerCount={productMain?.pricePerCount}
              productPrice={productMain?.price}
              productId={productID ?? ""}
              topupQuantity={storageQuantity}
              teamId={teamId ?? ""}
              totalPrice={totalPrice}
              successAction={successAction}
            />
          )}
          {step === 4 && (
            <ConfirmJoining
              orderPackage={orderPackage}
              productName={productMain?.name}
              email={context?.user?.email}
              userType="new"
              referralInfo={referralInfo}
              step={step}
            />
          )}
        </div>

        <div className="mx-[-16px] md:mx-[0] mt-[32px]">
          <SummaryProduct
            model={
              {
                id: "1",
                name: productMain?.name,
                corporation: productMain?.teamName,
                quantityOfSubUnitPerOrder:
                  productMain?.quantityOfSubUnitPerOrder,
                unitsOfMeasurePerSubUnit: productMain?.unitsOfMeasurePerSubUnit,
                orderDate: productMain?.orderDate,
                leadTime: productMain?.leadTime,
              } as unknown as ISummaryProductModel
            }
            storageQuantity={storageQuantity}
            setStorageQuantity={setStorageQuantity}
            daysUntilNextDrop={productMain?.daysUntilNextDrop ?? 0}
            orderPackage={orderPackage}
            step={step}
            referralInfo={referralInfo}
            setIsReferralCodeApplied={setIsReferralCodeApplied}
            setIsInfoIconClicked={setIsInfoIconClicked}
            hasAlignmentPackage={hasAlignmentPackage}
            setHasAlignmentPackage={setHasAlignmentPackage}
          />
          {step === 4 && <Delivery />}
          {step < 4 && <AvailablePayment />}
        </div>
      </div>
    </>
  );
}
