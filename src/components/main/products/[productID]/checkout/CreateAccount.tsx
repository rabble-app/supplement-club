"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import router from "next/router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import FormFieldComponent from "@/components/shared/FormFieldComponent";
import { CustomToast, StatusToast } from "@/components/shared/Toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useUser } from "@/contexts/UserContext";
import { authService } from "@/services/authService";
import { useUserStore } from "@/stores/userStore";
import type { IResponseModel } from "@/utils/models/api/response/IResponseModel";
import type { IUserResponse } from "@/utils/models/api/response/IUserResponse";
import { createAccountSchema } from "@/validations";

export default function CreateAccount({
	params,
	children,
}: Readonly<{
	params: Promise<{ productID: string }>;
	children?: React.ReactNode;
}>) {
  const [productId, setProductId] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutData] = useLocalStorage<IMetadata>("checkoutData", {});

  const router = useRouter();

  useEffect(() => {
    const fetchProductId = async () => {
      const { productID } = await params;
      setProductId(productID);
    };
    fetchProductId();
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
        checkoutData,
        Cookies.get("refCode") ?? ""
      )) as IResponseModel;

      if (result.statusCode === 200 || result.statusCode === 201) {
        router.push(
          `/auth/email-verify?redirect=/products/${productId}/checkout`
        );
      } else {
        throw new Error(result?.error);
      }

      localStorage.removeItem("checkoutData");
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
      </form>
    </Form>
  );
}
