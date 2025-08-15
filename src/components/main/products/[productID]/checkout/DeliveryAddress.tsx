/** @format */

"use client";

import AddressAutocomplete, {
  type AddressFormData,
  type AddressAutocompleteRef,
} from "@/components/shared/AddressAutocomplete";
import FormFieldComponent from "@/components/shared/FormFieldComponent";
import { CustomToast, StatusToast } from "@/components/shared/Toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUser } from "@/contexts/UserContext";
import { usersService } from "@/services/usersService";
import { useUserStore } from "@/stores/userStore";
import { deliveryAddressSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useRef } from "react";
import { useForm } from "react-hook-form";

export default function DeliveryAddress({
  step,
  updateStepAction,
  children,
}: Readonly<{
  step: number;
  updateStepAction: (newValue: number) => void;
  children?: React.ReactNode;
}>) {
  const currentForm = useForm<AddressFormData>({
    resolver: zodResolver(deliveryAddressSchema),
    mode: "onChange",
  });

  const addressAutocompleteRef = useRef<AddressAutocompleteRef>(null);

  const context = useUser();
  const { setUser } = useUserStore((state) => state);

  async function onSubmit(e: FormData) {
    try {
      const result = await usersService.addDeliveryAddress({
        userId: context?.user?.id ?? "",
        firstName: e.get("firstName")?.toString() ?? "",
        lastName: e.get("lastName")?.toString() ?? "",
        address: e.get("address")?.toString() ?? "",
        address2: e.get("address2")?.toString() ?? "",
        city: e.get("city")?.toString() ?? "",
        postalCode: e.get("postalCode")?.toString() ?? "",
        country: e.get("country")?.toString() ?? "",
        phone: e.get("mobileNumber")?.toString() ?? "",
      });

      if (result?.statusCode === 201 || result?.statusCode === 200) {
        // set payment card by default
        if (context?.user) {
          context.user.shipping = result.data;
          context.user.firstName = e.get("firstName")?.toString() ?? "";
          context.user.lastName = e.get("lastName")?.toString() ?? "";
          setUser(context.user);
          context?.setNewUser(context.user);
        }
        updateStepAction(step + 1);
      } else {
        // Display the error message from the API response
        const errorMessage = result?.error || result?.message || "An error occurred while saving the delivery address";
        CustomToast({
          title: errorMessage,
          status: StatusToast.ERROR,
        });
      }
    } catch (error) {
      // Handle network errors or other exceptions
      
      // Try to extract the API error message from the thrown error
      let errorMessage = "Failed to save delivery address. Please try again.";
      
      if (error && typeof error === 'object' && 'error' in error) {
        try {
          // The error might contain the API response as a JSON string
          const errorData = JSON.parse(error.error as string);
          if (errorData.error) {
            errorMessage = errorData.error;
          } else if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch {
          // If parsing fails, use the error message directly
          errorMessage = error.error as string || errorMessage;
        }
      }
      
      CustomToast({
        title: errorMessage,
        status: StatusToast.ERROR,
      });
    }
  }

  return (
    <Form {...currentForm}>
      <form
        action={(e) => startTransition(() => onSubmit(e))}
        className="flex flex-col gap-[24px] p-[16px] md:p-[32px] md:border-grey12 md:border-[1px] md:border-solid"
      >
        {children}

        <div className="grid grid-cols-2 gap-[24px]">
          <FormFieldComponent
            form={currentForm}
            label="First Name*"
            placeholder="Newton"
            id="firstName"
            name="firstName"
          />

          <FormFieldComponent
            form={currentForm}
            label="Last Name*"
            placeholder="Vasyl"
            id="lastName"
            name="lastName"
          />
        </div>

        <div className="relative">
          <FormField
            control={currentForm.control}
            name="address"
            render={({ field, fieldState }) => (
              <FormItem className={fieldState.invalid ? "error" : ""}>
                <FormLabel className="flex justify-between text-[16px] font-bold font-inconsolata">
                  Address Line 1*
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Somewhere around"
                    id="address"
                    onFocus={() =>
                      addressAutocompleteRef.current?.handleInputFocus()
                    }
                    onBlur={() =>
                      addressAutocompleteRef.current?.handleInputBlur()
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <AddressAutocomplete
            ref={addressAutocompleteRef}
            form={currentForm}
          />
        </div>

        <FormFieldComponent
          form={currentForm}
          label="Address Line 2*"
          placeholder="Near somewhere"
          id="address2"
          name="address2"
        />

        <FormFieldComponent
          form={currentForm}
          label="City*"
          placeholder="London"
          id="city"
          name="city"
        />

        <FormFieldComponent
          form={currentForm}
          label="Country*"
          placeholder="United Kingdom"
          id="country"
          name="country"
        />

        <FormFieldComponent
          form={currentForm}
          label="Postcode*"
          placeholder="SE167NX"
          id="postalCode"
          name="postalCode"
        />

        <FormFieldComponent
          form={currentForm}
          label="Mobile Number"
          placeholder="+44 7873 453389"
          id="mobileNumber"
          name="mobileNumber"
        />

        <Button type="submit" className="bg-blue text-white w-full font-bold mb-[70px]">
          Next
        </Button>
      </form>
    </Form>
  );
}
