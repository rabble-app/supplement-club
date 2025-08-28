/** @format */

"use client";
import AvailablePayment from "@/components/shared/AvailablePayment";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import PaymentList from "@/components/shared/PaymentList";
import SummaryProduct2 from "@/components/shared/SummaryProduct2";
import { CustomToast, StatusToast } from "@/components/shared/Toast";
import { useUser } from "@/contexts/UserContext";
import useProduct from "@/hooks/useProduct";
import { paymentService } from "@/services/paymentService";
import { teamsService } from "@/services/teamService";
import { usersService } from "@/services/usersService";
import type IManagePlanModel from "@/utils/models/IManagePlanModel";
import type ISummaryProductModel from "@/utils/models/ISummaryProductModel";
import type { SubscriptionProps } from "@/utils/props/SubscriptionProps";
import { getQuarterInfo } from "@/utils/utils";
import { addQuarters, format, startOfQuarter } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

export default function OptBackIn({
  params,
}: Readonly<{ params: Promise<SubscriptionProps> }>) {
  const context = useUser();
  const router = useRouter();

  const [managePlan, setManagePlan] = useState<IManagePlanModel>(
    {} as IManagePlanModel
  );
  const [subscriptionId, setSubscriptionId] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { remainsDaysToNextQuater } = getQuarterInfo();

  const [storageQuantity] = useLocalStorage("storageQuantity", 0);

  const now = new Date();
  const nextQuarterStart = startOfQuarter(addQuarters(now, 1));

  useEffect(() => {
    const fetchParams = async () => {
      const { subscriptionID } = await params;
      const response = await usersService.getSubscriptionPlan(subscriptionID);
      setManagePlan(response);
      setSubscriptionId(subscriptionID);
    };
    fetchParams();
  }, [params]);

  const { product, orderPackage, setHasAlignmentPackage } = useProduct(
    managePlan?.team?.id,
    context?.user?.id,
    managePlan?.team?.basket[0]?.product?.id
  );

  async function onOpenChange(val: boolean) {
    setIsDialogOpen(val);

    if (val) {
      await teamsService.optBackInForNextDelivery(subscriptionId);
    } else {
      router.push("/dashboard/manage-plans/");
    }
  }

  const gramsPerCount =
    Number(product?.gramsPerCount) === 0 ? 1 : Number(product?.gramsPerCount);

  const capsuleBase = managePlan.capsulePerDay / gramsPerCount;

  useEffect(() => {
    if (localStorage.getItem("packageAlignment") === "true") {
      setTotalPrice((orderPackage?.pricePerPoche ?? 0) * storageQuantity);
    } else {
      setTotalPrice(orderPackage.price * capsuleBase);
    }
  }, [storageQuantity, orderPackage]);

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
        price: Number(product?.price ?? 0),
        quantity: storageQuantity,
        capsulePerDay: managePlan.capsulePerDay,
      });

      await teamsService.reactivateSubscriptionPlan(subscriptionId);
	  await teamsService.optBackInForNextDelivery(subscriptionId);

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

  const bottomContent = (
    <div className="flex gap-[8px] items-center justify-center text-blue h-[60px] text-[20px] leading-[23px] font-bold">
      <div className="p-[13px] bg-blue6 rounded-[50px]">
        <Image
          src="/images/icons/delivery-blue-icon.svg"
          alt="Delivery icon"
          width={24}
          height={24}
        />
      </div>
      Delivering {product?.deliveryDate ? format(product?.deliveryDate, "MMMM d, yyyy") : format(nextQuarterStart, "MMMM d, yyyy")}
    </div>
  );

  console.log('orderPackage', orderPackage);
  console.log('product', product);
  console.log('storageQuantity', storageQuantity);
  console.log('capsuleBase', capsuleBase);

  return (
    <div className="grid gap-[16px] py-[24px] md:grid-cols-[600px_600px] md:justify-center">
      <div>
        <ConfirmDialog
          isDialogOpen={isDialogOpen}
          onOpenChange={onOpenChange}
          title={`You've been successfully opted back for ${product?.deliveryDate ? format(product?.deliveryDate, "MMMM, yyyy") : format(nextQuarterStart, "MMMM, yyyy")}`}
          description={`A confirmation email has been sent to ${context?.user?.email}`}
          bottomContent={bottomContent}
        />
        <PaymentList
          orderPackage={{
            ...orderPackage,
            capsuleCount: orderPackage.capsuleCount * capsuleBase,
          }}
          poucheSize={product?.poucheSize}
          pricePerCount={product?.pricePerCount}
          productPrice={product?.price}
          productId={product?.id ?? ""}
          topupQuantity={storageQuantity}
          teamId={managePlan?.team?.id ?? ""}
          totalPrice={totalPrice}
          isReactivatePlan={true}
          isLoadingSubmitAction={isLoading}
          submitAction={handlePayment}
          successAction={() => onOpenChange(false)}
        />
      </div>
      <div className="mx-[-16px] md:mx-[0] mt-[32px]">
        <SummaryProduct2
          model={
            {
              id: "1",
              name: product?.name,
              corporation: product?.teamName,
              quantityOfSubUnitPerOrder:
                remainsDaysToNextQuater * managePlan.capsulePerDay,
              unitsOfMeasurePerSubUnit: product?.unitsOfMeasurePerSubUnit,
              orderDate: product?.orderDate,
              leadTime: product?.leadTime,
            } as unknown as ISummaryProductModel
          }
          storageQuantity={storageQuantity}
          setStorageQuantity={() => {}}
          daysUntilNextDrop={product?.daysUntilNextDrop ?? 0}
          nextEditableDate={product?.nextEditableDate ?? ""}
          orderPackage={{
            ...orderPackage,
            rrp: Math.ceil(Number(remainsDaysToNextQuater * capsuleBase)/Number(product?.alignmentPoucheSize)) * Number(product?.pricePerPoche),
            price: Number(totalPrice.toFixed(2)),
			pochesRequired: Math.ceil(Number(remainsDaysToNextQuater * capsuleBase)/Number(product?.alignmentPoucheSize))
          }}
          hasAlignmentPackage={
            localStorage.getItem("packageAlignment") === "true" ? true : false
          }
          setHasAlignmentPackage={setHasAlignmentPackage}
          hasActiveSupplement={true}
          isReactivatePlan={true}
          isTopUp={true}
        />
        <AvailablePayment />
      </div>
    </div>
  );
}
