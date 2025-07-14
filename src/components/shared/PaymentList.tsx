/** @format */

import { useEffect, useRef, useState } from "react";

import { Separator } from "@radix-ui/react-separator";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUser } from "@/contexts/UserContext";
import { paymentService } from "@/services/paymentService";
import type IUserPaymentOptionModel from "@/utils/models/api/IUserPaymentOptionModel";
import type IPaymentIntentApiResponse from "@/utils/models/services/IPaymentIntentApiResponse";
import type { PaymentMethod } from "@stripe/stripe-js";
import Link from "next/link";
import PaymentCard from "../dashboard/account/payment-details/PaymentCard";
import AddPaymentDialog from "./AddPaymentDialog";
import EmailReminders from "./EmailReminders";
import PaymentConfirmForm from "./PaymentConfirmForm";
import { CustomToast, StatusToast } from "./Toast";
import useLocalStorage from "use-local-storage";
import { Loader2 } from "lucide-react";
import BillingAddressMain, {
  BillingAddressRef,
} from "../main/products/[productID]/checkout/BillingAddressMain";
import { usersService } from "@/services/usersService";
import { AddressFormData } from "./AddressAutocomplete";
import IOrderPackageModel, { MemberType } from "@/utils/models/IOrderPackageModel";

export default function PaymentList({
  totalPrice, 
  teamId,
  topupQuantity,
  productId,
  successAction,
  orderPackage,
  poucheSize,
  pricePerCount,
  productPrice,
}: Readonly<{
  totalPrice: number;
  teamId: string;
  topupQuantity: number;
  productId: string;
  successAction: () => void;
  orderPackage: IOrderPackageModel;
  poucheSize?: number;
  pricePerCount?: number;
  productPrice?: number;
}>) {
  const [policyTerms, setPolicyTerms] = useState(true);
  const [address, setAddress] = useState(true);
  const [billingAddress, setBillingAddress] = useState<{
    addressLine1: string;
    addressLine2: string;
    city: string;
    postCode: string;
    country: string;
  }>();
  const [capsuleCount] = useLocalStorage<number>("capsuleCount", 0);
  const [isLoading, setIsLoading] = useState(false);

  const billingAddressRef = useRef<BillingAddressRef>(null);

  const context = useUser();

  const [defaultCard, setDefaultCard] = useState(
    context?.user?.stripeDefaultPaymentMethodId ?? ""
  );
  const [userCards, setUserCards] = useState<IUserPaymentOptionModel[]>([]);

  useEffect(() => {
    const fetchUserPaymentOptions = async () => {
      await retrivePaymentOptions(context?.user?.stripeCustomerId);
    };
    fetchUserPaymentOptions();
  }, [context?.user?.stripeCustomerId]);

  useEffect(() => {
    const fetchBillingAddress = async () => {
      const billing = await retriveBillingAddress(context?.user?.id);
      // If user has a billing address, checkbox should be unchecked (different from delivery)
      if (billing) {
        setAddress(false);
      }
    };
    fetchBillingAddress();
  }, [context?.user]);

  async function processPayment(cards: IUserPaymentOptionModel[]) {
    setIsLoading(true);
    try {
      if (!policyTerms) {
        CustomToast({
          title:
            "To continue, please agree to our Terms and Conditions and Privacy Policy.",
          status: StatusToast.ERROR,
          position: "top-center",
        });
        throw new Error("Error");
      }

      let currectCard = cards.find((u) => u.id === defaultCard);
      if (!currectCard) {
        currectCard = cards[0];
      }

      const quantity = Number((capsuleCount ?? 0) * (orderPackage.days)) /
      (poucheSize ?? 0);
      const price = totalPrice;
      const capsulePerDay = Number(orderPackage.capsuleCount);
      const pricePerCountq = pricePerCount?.toFixed(2) ?? "0.00";
      const discount = orderPackage.discount?.toFixed(2) ?? "0.00";

      if (orderPackage.memberType === MemberType.FOUNDING_MEMBER) {
        const response = (await paymentService.joinPreorderTeam(
          teamId ?? "",
          context?.user?.id ?? "",
          productId ?? "",
          quantity,
          price,
          capsulePerDay,
          pricePerCountq,
          discount
        )) as IPaymentIntentApiResponse;

        if (response.statusCode !== 200) {
          throw new Error(response?.error);
        }
      } else {
        const data = {
          amount: totalPrice,
          price: Number(productPrice),
          quantity:
            Number((capsuleCount ?? 0) * (orderPackage.days)) /
            (poucheSize ?? 0),
          paymentMethodId: currectCard?.id,
          capsuleCount: orderPackage.capsuleCount,
          topupQuantity: topupQuantity,
        };

        const response = (await paymentService.joinTeam({
          teamId: teamId ?? "",
          userId: context?.user?.id ?? "",
          productId: productId ?? "",
          quantity: data.quantity,
          price: data.price,
          capsulePerDay: data.capsuleCount ?? 0,
          amount: data.amount,
          paymentMethodId: currectCard?.id,
          topupQuantity: data.topupQuantity,
          pricePerCount: pricePerCountq,
          discount: discount,
        })) as IPaymentIntentApiResponse;

        if (response.statusCode !== 200) {
          throw new Error(response?.error);
        }
      }

      successAction();
    } catch (error: any) {
      console.error("Error in processPayment111:", error);
      CustomToast({
        title: JSON.parse(error.error).message,
        status: StatusToast.ERROR,
        position: "top-right",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function retrivePaymentOptions(
    stripeCustomerId?: string | PaymentMethod | null
  ) {
    const model = await paymentService.getUserPaymentOptions(
      (stripeCustomerId as string) ?? ""
    );
    setUserCards(model);
  }

  async function retriveBillingAddress(userId?: string | PaymentMethod | null) {
    const model = await usersService.getBillingAddress(
      (userId as string) ?? ""
    );
    setBillingAddress(model);
    return model;
  }

  async function addCreditCard(paymentMethod: string | PaymentMethod | null) {
    setIsLoading(true);

    try {
      if (!address && billingAddressRef.current) {
        const isValid = await billingAddressRef.current.submitForm();
        if (!isValid) {
          CustomToast({
            title: "Please fill in all required billing address fields",
            status: StatusToast.ERROR,
          });
          return;
        }
      }

      // 1. Add card
      await paymentService.addCard(
        (paymentMethod as string) ?? "",
        context?.user?.stripeCustomerId ?? ""
      );

      // 2. Get user cards
      const cards = await paymentService.getUserPaymentOptions(
        context?.user?.stripeCustomerId ?? ""
      );

      // 3. Process payment
      await processPayment(cards);
    } catch (error: any) {
      console.error("addCreditCard error:", JSON.parse(error.error).message);

      CustomToast({
        title: JSON.parse(error.error).message,
        status: StatusToast.ERROR,
        position: "top-right",
      });

      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  const handleBillingAddressSubmit = async (data: AddressFormData) => {
    try {
      const result = await usersService.addBillingAddress({
        addressLine1: data.address ?? "",
        addressLine2: data.address2 ?? "",
        city: data.city ?? "",
        postCode: data.postalCode ?? "",
        country: data.country ?? "",
      });

      if (result?.statusCode === 201 || result?.statusCode === 200) {
        // Update user context with billing address
        if (context?.user) {
          context.user.firstName = data.firstName ?? "";
          context.user.lastName = data.lastName ?? "";
          // setUser(context.user);
          context?.setNewUser(context.user);
        }

        CustomToast({
          title: "Billing address saved successfully",
          status: StatusToast.SUCCESS,
        });

        return true;
      } else {
        CustomToast({
          title: JSON.parse(result?.error).message,
          status: StatusToast.ERROR,
        });
        return false;
      }
    } catch (error: any) {
      CustomToast({
        title: error.message || "Failed to save billing address",
        status: StatusToast.ERROR,
      });
      return false;
    }
  };

  const handlePlaceOrder = async () => {
    // If billing address is not same as delivery address, validate and submit billing address form
    if (!address && billingAddressRef.current) {
      const isValid = await billingAddressRef.current.submitForm();
      if (!isValid) {
        CustomToast({
          title: "Please fill in all required billing address fields",
          status: StatusToast.ERROR,
        });
        return;
      }
    }

    await processPayment(userCards);
  };

  const ButtonSection = (
    <div className="grid gap-[24px]">
      <Separator className="bg-grey3 h-[1px] w-full" />

      <div className="flex items-start gap-[10px]">
        <Checkbox
          id="policyTerms"
          checked={policyTerms}
          onCheckedChange={(checked) => setPolicyTerms(checked === true)}
        />
        <label
          htmlFor="policyTerms"
          className="text-[16px] leading-[19px] text-black5 cursor-pointer"
        >
          By joining Supplement Club, you agree to our{" "}
          <Link
            target="_blank"
            href="https://swift-thorium-bdb.notion.site/Supplement-Club-Terms-Conditions-1cfa72b529ea80bf941dd08f4db13fd2?pvs=4"
            className="underline text-bold text-blue"
          >
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link
            target="_blank"
            href="https://swift-thorium-bdb.notion.site/Supplement-Club-Privacy-Policy-1cfa72b529ea805b8588d7bca35beff1?pvs=4"
            className="underline text-bold text-blue"
          >
            Privacy Policy
          </Link>
        </label>
      </div>

      {orderPackage.memberType !== MemberType.FOUNDING_MEMBER && (
        <p className="text-[14px] leading-[16px]">
          By making this purchase your supplement club will automatically renew
          and your card will be charged the supplement plan price. You can
          cancel or modify at any time using your customer login.
        </p>
      )}
      {orderPackage.memberType === MemberType.FOUNDING_MEMBER && (
        <p className="text-[14px] leading-[16px]">
          You’re saving your spot — no payment today. We’ll email you 24h before
          the first charge, and you can cancel or update anytime.
        </p>
      )}
    </div>
  );

  return (
    <div className="border-[1px] border-grey12 flex flex-col items-start p-[32px] gap-[24px] mx-[-30px] md:mx-[0]">
      <div className="grid gap-[24px]">
        <p className="text-[24px] leading-[27px] font-hagerman uppercase">
          Billing Address
        </p>
        <div className="flex items-center gap-[8px]">
          <Checkbox
            id="delivery"
            checked={address}
            onCheckedChange={(checked) => setAddress(checked === true)}
          />
          <label
            htmlFor="delivery"
            className="text-[16px] leading-[19px] text-black5 cursor-pointer"
          >
            Same as delivery address
          </label>
        </div>
      </div>

      {!address && (
        <div className=" w-full">
          <BillingAddressMain
            ref={billingAddressRef}
            handleSubmit={handleBillingAddressSubmit}
            defaultValues={
              billingAddress
                ? {
                    address: billingAddress.addressLine1,
                    address2: billingAddress.addressLine2,
                    city: billingAddress.city,
                    postalCode: billingAddress.postCode,
                    country: billingAddress.country,
                  }
                : undefined
            }
          />
        </div>
      )}

      <Separator className="bg-grey3 h-[1px] w-full" />

      {userCards && userCards?.length > 0 && (
        <>
          <div className="grid gap-[16px] w-full px-[16px] py-[32px] rounded-[12px] shadow-3">
            <div className="text-[40px] leading-[120%] uppercase font-hagerman">
              Your cards
            </div>

            <div className=" bg-white flex flex-col gap-[16px] justify-start w-full">
              <div className="border-grey37 border-[1px] rounded-[4px]">
                {userCards?.map((item, idx) => (
                  <div key={item.id}>
                    <RadioGroup
                      key={item.id}
                      value={defaultCard.toString()}
                      onValueChange={(value) => setDefaultCard(value)}
                    >
                      <PaymentCard
                        model={item.card}
                        isDefault={
                          (context?.user?.stripeDefaultPaymentMethodId ??
                            "") === item.id
                        }
                        topContent={
                          <RadioGroupItem
                            value={item.id.toString()}
                            className="mx-auto"
                          />
                        }
                      />
                    </RadioGroup>
                    {idx !== userCards?.length - 1 && (
                      <Separator
                        key={`${item.card.last4}-separator `}
                        className="bg-grey37 h-[1px]"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <AddPaymentDialog
              successAction={() =>
                retrivePaymentOptions(context?.user?.stripeCustomerId)
              }
            />
          </div>
          {ButtonSection}

          <Button
            onClick={handlePlaceOrder}
            className={` text-white font-bold w-full h-[51px] ${
              policyTerms ? "bg-blue" : "pointer-events-none bg-grey25"
            }`}
          >
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {`${
              orderPackage.memberType !== MemberType.MEMBER ? "Register Order" : "Place Order"
            } - £ ${totalPrice.toFixed(2)}`}{" "}
            {/* Use a regular string */}
          </Button>
        </>
      )}

      {!userCards ||
        (userCards?.length === 0 && (
          <PaymentConfirmForm successAction={addCreditCard}>
            {ButtonSection}

            <Button
              type="submit"
              className={` text-white font-bold w-full h-[51px] mt-[20px] ${
                policyTerms ? "bg-blue" : "pointer-events-none bg-grey25"
              }`}
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {`${
                orderPackage.memberType !== MemberType.MEMBER ? "Register Order" : "Place Order"
              } - £ ${totalPrice.toFixed(2)}`}{" "}
              {/* Use a regular string */}
            </Button>
          </PaymentConfirmForm>
        ))}

      {orderPackage.memberType !== MemberType.FOUNDING_MEMBER && <EmailReminders />}
      {orderPackage.memberType === MemberType.FOUNDING_MEMBER && (
        <p className="text-[14px] leading-[16px] text-grey4 font-semibold text-center mx-auto">
          No Charge Now. Cancel Anytime.
        </p>
      )}
    </div>
  );
}
