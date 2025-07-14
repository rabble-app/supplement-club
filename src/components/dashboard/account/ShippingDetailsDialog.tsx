/** @format */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";

import AddressAutocomplete, {
  type AddressFormData,
  type AddressAutocompleteRef,
} from "@/components/shared/AddressAutocomplete";
import FormFieldComponent from "@/components/shared/FormFieldComponent";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usersService } from "@/services/usersService";
import type IUserModel from "@/utils/models/api/IUserModel";
import { shippingDetailsShema } from "@/validations";
import { Separator } from "@radix-ui/react-separator";
import { VisuallyHidden } from "@reach/visually-hidden";
import { useState, useRef } from "react";
import ManageAccountCard from "./ManageAccountCard";

type ShippingDialogProps = {
  user: IUserModel;
  updateUserAction: (user: IUserModel) => void;
};

export default function ShippingDetailsDialog({
  user,
  updateUserAction,
}: Readonly<ShippingDialogProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<AddressFormData>({
    resolver: zodResolver(shippingDetailsShema),
    mode: "onChange",
  });

  const addressAutocompleteRef = useRef<AddressAutocompleteRef>(null);

  const updateShippingData = () => {
    form.reset({
      userId: user.shipping?.userId,
      address: user.shipping?.address,
      address2: user.shipping?.address2,
      city: user.shipping?.city,
      country: user.shipping?.country,
      postalCode: user.shipping?.postalCode,
      buildingNo: user.shipping?.buildingNo,
    });
  };

  async function onSave() {
    const { userId, address, address2, buildingNo, city, country, postalCode } =
      form.getValues();
    await usersService.updateShippingInfo(
      userId || "",
      address,
      address2 || "",
      buildingNo ?? "",
      city,
      country,
      postalCode
    );
    user.shipping = form.getValues();
    updateUserAction(user);
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={updateShippingData}>
      <DialogTrigger onClick={() => setIsOpen(true)}>
        <ManageAccountCard
          title="Shipping address"
          value={user?.shipping?.address ?? "Not set"}
          imageAlt="Home icon"
          imageSrc="/images/icons/home-blue-icon.svg"
        />
      </DialogTrigger>
      <DialogContent className="w-full h-full sm:h-auto sm:max-w-[600px] p-0 gap-4 rounded-md">
        <Form {...form}>
          <div className="flex flex-col gap-4 p-4">
            <DialogHeader className="flex flex-row justify-between items-center">
              <DialogTitle className="text-lg font-bold font-inconsolata">
                Shipping Details
              </DialogTitle>
              <DialogClose onClick={() => setIsOpen(false)}>
                <div className="border border-grey32 w-10 h-10 rounded-full flex justify-center items-center">
                  <Image
                    src="/images/icons/close-black-icon.svg"
                    alt="Close icon"
                    width={16}
                    height={16}
                  />
                </div>
              </DialogClose>
            </DialogHeader>

            <VisuallyHidden>
              <DialogDescription />
            </VisuallyHidden>

            <Separator className="h-px bg-grey32 -mx-4" />

            <div className="relative">
              <FormField
                control={form.control}
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
              <AddressAutocomplete ref={addressAutocompleteRef} form={form} />
            </div>

            <FormFieldComponent
              form={form}
              label="Address Line 2"
              name="address2"
              placeholder="Near somewhere"
              id="address2"
            />

            <FormFieldComponent
              form={form}
              label="Building No"
              name="buildingNo"
              placeholder="43"
              id="building_number"
            />

            <FormFieldComponent
              form={form}
              label="City*"
              name="city"
              placeholder="London"
              id="city"
            />

            <FormFieldComponent
              form={form}
              label="Country*"
              name="country"
              placeholder="United Kingdom"
              id="country"
            />

            <FormFieldComponent
              form={form}
              label="Postcode*"
              name="postalCode"
              placeholder="SE167NX"
              id="postalCode"
            />

            <Separator className="h-px bg-grey32 -mx-4" />

            <Button
              onClick={onSave}
              className="w-40 font-bold font-inconsolata text-lg flex ml-auto bg-blue text-white"
            >
              Save Changes
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
