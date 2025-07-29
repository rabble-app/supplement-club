/** @format */

"use client";
import { useEffect, useState } from "react";

import TopUpCapsuleHeading from "@/components/dashboard/manage-plans/TopUpCapsuleHeading";
import AvailablePayment from "@/components/shared/AvailablePayment";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import PaymentList from "@/components/shared/PaymentList";
import Steps from "@/components/shared/Steps";
import SummaryProduct from "@/components/shared/SummaryProduct";
import { useUser } from "@/contexts/UserContext";
import { paymentService } from "@/services/paymentService";
import { usersService } from "@/services/usersService";
import type IManagePlanModel from "@/utils/models/IManagePlanModel";
import type ISummaryProductModel from "@/utils/models/ISummaryProductModel";
import type { SubscriptionProps } from "@/utils/props/SubscriptionProps";
import { useRouter } from "next/navigation";
import useProduct from "@/hooks/useProduct";
import { CustomToast, StatusToast } from "@/components/shared/Toast";
import SummaryProduct2 from "@/components/shared/SummaryProduct2";

export default function TopUpCheckout({
  params,
}: Readonly<{ params: Promise<SubscriptionProps> }>) {
  const [step, setStep] = useState<number>(1);
  const context = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [capsulesPerDay, setCapsulesPerDay] = useState<number>(1);
  const [months, setMonths] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const steps = ["Top Up Capsules", "Payment Details"];
  const router = useRouter();

  const [managePlan, setManagePlan] = useState<IManagePlanModel>();

  const { product, orderPackage, setHasAlignmentPackage } = useProduct(
    managePlan?.team?.id,
    context?.user?.id,
    managePlan?.team?.basket[0]?.product?.id
  );

  const gramsPerCount =
    Number(product?.gramsPerCount) === 0 ? 1 : Number(product?.gramsPerCount);

  const capsuleBase =
    orderPackage.units === "g"
      ? Number(capsulesPerDay) / gramsPerCount
      : Number(capsulesPerDay);

  const baseRrp = Number(product?.rrp) / 3;
  const totalRrp = baseRrp * capsuleBase * months;
  const totalDiscount =
    (Number(orderPackage.discount) + Number(orderPackage.extraDiscount)) / 100;
  const discountedPrice = totalRrp * (1 - totalDiscount);

  useEffect(() => {
    const fetchParams = async () => {
      const { subscriptionID } = await params;
      const response = await usersService.getSubscriptionPlan(subscriptionID);
      setManagePlan(response);
    };
    fetchParams();
    setTotalPrice(discountedPrice);
  }, [params, discountedPrice]);

  async function onOpenChange(val: boolean) {
    setIsDialogOpen(val);

    if (!val) {
      router.push("/dashboard/manage-plans/");
    }
  }

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const response = await paymentService.createPaymentIntent(
        Number(totalPrice.toFixed(2)),
        "gbp",
        context?.user?.stripeCustomerId ?? "",
        context?.user?.stripeDefaultPaymentMethodId ?? ""
      );
      await paymentService.topUpSubscription({
        amount: Number(totalPrice.toFixed(2)),
        teamId: managePlan?.team?.id ?? "",
        paymentIntentId: response.paymentIntentId ?? "",
        userId: context?.user?.id ?? "",
        productId: managePlan?.team.basket[0].product.id ?? "",
        price: orderPackage.price,
        quantity: months * capsuleBase,
        capsulePerDay: capsulesPerDay,
      });

      setIsDialogOpen(true);
    } catch (error) {
      console.log("error", error);
      CustomToast({
        title: "Error: Something went wrong",
        status: StatusToast.ERROR,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-[26px] md:gap-[16px] max-w-[1280px] mx-auto md:py-[40px] bg-grey12 md:bg-transparent">
      <div className="flex flex-col gap-[37px]">
        <Steps activeStep={step} alignStart steps={steps} />
        {step === 1 && (
          <TopUpCapsuleHeading
            updateCapsuleAction={(val) => {
              setCapsulesPerDay(+val);
            }}
            updateWeekAction={(val) => setMonths(+val)}
            successAction={() => setStep(step + 1)}
            units={product?.unitsOfMeasurePerSubUnit ?? ""}
            capsuleInfo={
              product?.capsuleInfo?.map((capInf) => capInf.capsuleCount) ?? []
            }
          />
        )}
        {step !== 1 && (
          <PaymentList
            orderPackage={{
              ...orderPackage,
              capsuleCount: orderPackage.capsuleCount * capsuleBase,
            }}
            poucheSize={product?.poucheSize}
            pricePerCount={product?.pricePerCount}
            productPrice={product?.price}
            productId={product?.id ?? ""}
            topupQuantity={capsulesPerDay * (months * 30)}
            teamId={managePlan?.team?.id ?? ""}
            totalPrice={totalPrice}
            isReactivatePlan={true}
            isLoadingSubmitAction={isLoading}
            submitAction={handlePayment}
            successAction={() => onOpenChange(false)}
          />
        )}

        <ConfirmDialog
          isDialogOpen={isDialogOpen}
          onOpenChange={onOpenChange}
          title="Top Up Capsules Order Received"
          description={`A confirmation email has been sent to ${context?.user?.email}`}
        />
      </div>

      <div className="grid gap-[73px]">
        <SummaryProduct2
          model={
            {
              id: "1",
              name: product?.name,
              corporation: product?.teamName,
              quantityOfSubUnitPerOrder: capsulesPerDay * (30 * months),
              unitsOfMeasurePerSubUnit: product?.unitsOfMeasurePerSubUnit,
              orderDate: product?.orderDate,
              leadTime: product?.leadTime,
            } as unknown as ISummaryProductModel
          }
          storageQuantity={capsulesPerDay * (months * 30)}
          setStorageQuantity={() => {}}
          daysUntilNextDrop={product?.daysUntilNextDrop ?? 0}
          nextEditableDate={product?.nextEditableDate ?? ""}
          orderPackage={{
            ...orderPackage,
            rrp: totalRrp,
            price: discountedPrice,
          }}
          hasAlignmentPackage={true}
          setHasAlignmentPackage={setHasAlignmentPackage}
          hasActiveSupplement={true}
          isReactivatePlan={true}
          isTopUp={true}
		  type="topUp"
        />

        <AvailablePayment />
      </div>
    </div>
  );
}
