/** @format */

"use client";

import AddressAutocomplete, {
  type AddressFormData,
} from "@/components/shared/AddressAutocomplete";
import FormFieldComponent from "@/components/shared/FormFieldComponent";
import { Form } from "@/components/ui/form";
import { billingAddressSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useImperativeHandle } from "react";
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

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      console.log("=== BILLING ADDRESS FORM DEBUG ===");
      console.log("Form values:", currentForm.getValues());
      console.log("Form errors:", currentForm.formState.errors);
      console.log("Form isValid:", currentForm.formState.isValid);

      const isValid = await currentForm.trigger();
      console.log("After trigger - isValid:", isValid);
      console.log("After trigger - errors:", currentForm.formState.errors);

      if (isValid) {
        const formData = currentForm.getValues();
        console.log("Form is valid, submitting data:", formData);
        handleSubmit(formData);
        return true;
      } else {
        console.log("Form is invalid, validation failed");
        console.log(
          "Invalid fields:",
          Object.keys(currentForm.formState.errors)
        );
        return false;
      }
    },
    getFormData: () => {
      const data = currentForm.getValues();
      console.log("Getting form data:", data);
      return data;
    },
    isValid: () => {
      const valid = currentForm.formState.isValid;
      console.log("Checking if form is valid:", valid);
      console.log("Current errors:", currentForm.formState.errors);
      return valid;
    },
  }));

  return (
    <Form {...currentForm}>
      <div className="flex flex-col gap-[24px] py-[16px] md:py-[32px]">
        <div className="relative">
          <FormFieldComponent
            form={currentForm}
            label="Address Line 1*"
            placeholder="Somewhere around"
            id="address"
            name="address"
          />
          <AddressAutocomplete form={currentForm} />
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
