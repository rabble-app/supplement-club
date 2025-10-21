/** @format */

"use client";;
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import FormFieldComponent from "@/components/shared/FormFieldComponent";
import { CustomToast, StatusToast } from "@/components/shared/Toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { authService } from "@/services/authService";
import type { IResponseModel } from "@/utils/models/api/response/IResponseModel";
import { createAccountSchema } from "@/validations";
import { Loader2Icon } from "lucide-react";
import useLocalStorage from "use-local-storage";
import { usersService } from "@/services/usersService";
import ILaunchPromotion from "@/utils/models/IUsersServiceModel";

export default function CreateAccount({
  params,
  children,
}: Readonly<{
  params: Promise<{ productID: string }>;
  children?: React.ReactNode;
}>) {
  const [productId, setProductId] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [capsuleCount] = useLocalStorage<number>("capsuleCount", 0);
  const [storageQuantity] = useLocalStorage<number>("storageQuantity", 0);
  const [hasAlignmentPackage] = useLocalStorage<boolean>("hasAlignmentPackage", false);

  const searchParams = useSearchParams();
  const teamId = searchParams.get("teamId");
  const [isLaunchPromotion, setIsLaunchPromotion] = useState<ILaunchPromotion>({ isEarly: false, availableSlots: 0 });

  const router = useRouter();

  useEffect(() => {
    const fetchProductId = async () => {
      const { productID } = await params;
      setProductId(productID);
    };
    fetchProductId();

    const fetchLaunchPromotion = async () => {
      const response = await usersService.getLaunchPromotion();
      setIsLaunchPromotion(response);
    };
    fetchLaunchPromotion();
  }, [params]);

  const currentForm = useForm({
    resolver: zodResolver(createAccountSchema),
    mode: "onChange",
  });

  async function handleSubmit(e: FormData) {
    setIsSubmitting(true);

    try {
      const result = (await authService.register(
        e.get("email")?.toString() ?? "",
        e.get("password")?.toString() ?? "",
        productId ?? "",
        teamId ?? "",
        {
          capsuleCount,
          storageQuantity,
          hasAlignmentPackage,
        },
        Cookies.get("refCode") ?? ""
      )) as IResponseModel;

      if (result.statusCode === 200 || result.statusCode === 201) {
        router.push(
          `/auth/email-verify?redirect=/products/${productId}/checkout`
        );
      } else {
        throw new Error(result?.error);
      }

      localStorage.removeItem("hasAlignmentPackage");
      localStorage.removeItem("storageQuantity");
      localStorage.removeItem("capsuleCount");
      localStorage.setItem("email", e.get("email")?.toString() ?? "");
      // remove from browser
      Cookies.remove("refCode");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      CustomToast({
        title: JSON.parse(error.error).message || "Something went wrong",
        status: StatusToast.ERROR,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...currentForm}>
      <form
        action={(e) => handleSubmit(e)}
        className="flex flex-col gap-[24px] md:p-[32px] md:border-grey12 md:border-[1px] md:border-solid"
      >
        {children}

        <FormFieldComponent
          form={currentForm}
          label="Email*"
          placeholder="e.g. newton@mail.com"
          id="email"
          name="email"
        />

        <FormFieldComponent
          form={currentForm}
          label="Password*"
          placeholder="*************"
          id="password"
          name="password"
          type="password"
        />

        <Button
          type="submit"
          className={`bg-blue text-white w-full font-bold ${
            isSubmitting ? "opacity-60" : ""
          }`}
        >
          {isSubmitting && <Loader2Icon className="animate-spin mr-2" />}
          Next
        </Button>

        <div className="flex justify-center gap-[5px] items-center text-[16px] leading-[24px] font-roboto">
          Have an account?
          <Link
            className="text-blue text-[16px] leading-[24px] font-roboto"
            href={`/auth/login?redirect=/products/${productId}/checkout`}
          >
            Log in
          </Link>
        </div>
        {isLaunchPromotion.isEarly && (
          <div className="text-blue bg-blue2 font-inconsolata font-bold p-[10px] rounded-sm text-[15.88px]">
            LAUNCH PROMOTION{" "}  - First 100 signs ups get their first year of membership for free: {isLaunchPromotion.availableSlots} spots remaining.
          </div>
        )}
      </form>
    </Form>
  );
}
