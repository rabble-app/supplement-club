/** @format */

"use client";
import AvailablePayment from "@/components/shared/AvailablePayment";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import PaymentList from "@/components/shared/PaymentList";
import SummaryProduct from "@/components/shared/SummaryProduct";
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
import { useRouter } from "next/navigation";
import { useEffect,  useState } from "react";
import useLocalStorage from "use-local-storage";

export default function ReactivatePlan({
  params,
}: Readonly<{ params: Promise<SubscriptionProps> }>) {
  const context = useUser();
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [managePlan, setManagePlan] = useState<IManagePlanModel>(
    {} as IManagePlanModel
  );
  const [subscriptionId, setSubscriptionId] = useState<string>("");
  const { remainsDaysToNextQuater } = getQuarterInfo();

  const { product, orderPackage, setHasAlignmentPackage } =
    useProduct(
      managePlan?.team?.id,
      context?.user?.id,
      managePlan?.team?.basket[0]?.product?.id
    );

//   const [storageQuantity] = useLocalStorage("storageQuantity", 0);
	const storageQuantity = Number(localStorage.getItem("storageQuantity"));

  useEffect(() => {
    const fetchParams = async () => {
      const { subscriptionID } = await params;
      const response = await usersService.getSubscriptionPlan(subscriptionID);
      setManagePlan(response);
      setSubscriptionId(subscriptionID);
    };
    fetchParams();
  }, [params]);

  async function onOpenChange(val: boolean) {
    setIsDialogOpen(val);

    if (val) {
      await teamsService.reactivateSubscriptionPlan(subscriptionId);
    } else {
      router.push("/dashboard/manage-plans/");
    }
  }

  const gramsPerCount =
    Number(product?.gramsPerCount) === 0 ? 1 : Number(product?.gramsPerCount);

  const capsuleBase = managePlan.capsulePerDay / gramsPerCount;

  useEffect(() => {
    if (localStorage.getItem("packageAlignment") === "true") {
      setTotalPrice(
        (orderPackage?.pricePerPoche ?? 0) * storageQuantity 
      );
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
        price: orderPackage.price,
        quantity: storageQuantity,
        capsulePerDay: managePlan.capsulePerDay,
      });

	  await teamsService.reactivateSubscriptionPlan(subscriptionId);

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
    <div className="grid gap-[16px] py-[24px] md:grid-cols-[600px_600px] md:justify-center">
      <div>
        <ConfirmDialog
          isDialogOpen={isDialogOpen}
          onOpenChange={onOpenChange}
          title="Your plan has been re-activated"
          description={`A confirmation email has been sent to ${context?.user?.email}`}
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
				quantityOfSubUnitPerOrder:remainsDaysToNextQuater * managePlan.capsulePerDay,
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
			pochesRequired: Math.ceil(Number(remainsDaysToNextQuater * capsuleBase)/Number(product?.alignmentPoucheSize)),
			pricePerCount: product?.pricePerCount,
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
