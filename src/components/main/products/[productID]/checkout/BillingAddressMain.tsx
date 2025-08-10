/** @format */

"use client";

import AddressAutocomplete, {
  type AddressFormData,
  type AddressAutocompleteRef,
} from "@/components/shared/AddressAutocomplete";
import FormFieldComponent from "@/components/shared/FormFieldComponent";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { billingAddressSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useForm } from "react-hook-form";

export interface BillingAddressRef {
  submitForm: () => Promise<boolean>;
  getFormData: () => AddressFormData | null;
  isValid: () => boolean;
}

const BillingAddressMain = forwardRef<
  BillingAddressRef,
  {
    handleSubmit: (data: AddressFormData) => void;
    defaultValues?: Partial<AddressFormData>;
  }
>(({ handleSubmit, defaultValues }, ref) => {
  const currentForm = useForm<AddressFormData>({
    resolver: zodResolver(billingAddressSchema),
    mode: "onChange",
    defaultValues: defaultValues || {},
  });

  const addressAutocompleteRef = useRef<AddressAutocompleteRef>(null);

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      const isValid = await currentForm.trigger();

      if (isValid) {
        const formData = currentForm.getValues();
        handleSubmit(formData);
        return true;
      } else {
        return false;
      }
    },
    getFormData: () => {
      const data = currentForm.getValues();
      return data;
    },
    isValid: () => {
      const valid = currentForm.formState.isValid;
      return valid;
    },
  }));

  return (
    <Form {...currentForm}>
      <div className="flex flex-col gap-[24px] py-[16px] md:py-[32px]">
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
          label="Address Line 2"
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
      </div>
    </Form>
  );
});

BillingAddressMain.displayName = "BillingAddressMain";

export default BillingAddressMain;
