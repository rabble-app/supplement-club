/** @format */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { IFilterModel } from "@/utils/models/IFilterModel";

const step1FormSchema = z.object({
  monthly: z.string({
    required_error: "Please select an monthly value",
  }),
  capsules: z.string({
    required_error: "Please select an capsules value",
  }),
});

const monthsSupply = [
  {
    id: 1,
    value: "1 Month",
  },
  {
    id: 2,
    value: "2 Months",
  },
  {
    id: 3,
    value: "3 Months",
  },
] as IFilterModel[];

export default function TopUpCapsuleHeading({
  updateWeekAction,
  updateCapsuleAction,
  successAction,
  units,
  capsuleInfo,
}: Readonly<{
  updateWeekAction: (val: string) => void;
  updateCapsuleAction: (val: string) => void;
  successAction: () => void;
  capsuleInfo: number[];
  units: string;
}>) {
  const form = useForm<z.infer<typeof step1FormSchema>>({
    resolver: zodResolver(step1FormSchema),
    mode: "onChange",
    defaultValues: {
      monthly: "1",
      capsules: capsuleInfo.length > 0 ? capsuleInfo[0].toString() : "",
    },
  });

  // Set default values and notify parent components
  useEffect(() => {
    // Set default monthly value
    // updateWeekAction("1");

    // Set default capsules value when capsuleInfo is available
    if (capsuleInfo.length > 0 && !form.getValues("capsules")) {
      const defaultCapsuleValue = capsuleInfo[0].toString();
      form.setValue("capsules", defaultCapsuleValue, { shouldValidate: true });
      updateCapsuleAction(defaultCapsuleValue);
    }
  }, [capsuleInfo, form, updateCapsuleAction]);

  const onSubmit: SubmitHandler<z.infer<typeof step1FormSchema>> = async () => {
    successAction();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-[24px] px-[16px] py-[32px] md:px-[32px] md:border-grey12 md:border-[1px] md:border-solid"
      >
        <div className="grid gap-[16px]">
          <p className="text-[20px] leading-[24px] font-bold font-inconsolata">
            Top Up Order
          </p>
          <p className="text-[14px] leading-[16px] font-helvetica text-grey6">
            Order more stock to keep you aligned with the next drop.
          </p>
        </div>
        <FormField
          control={form.control}
          name="monthly"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Months Supply</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value); // Update form state
                  updateWeekAction(value); // Call your method
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="e.g 1 Month" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {monthsSupply.map((el) => (
                    <SelectItem key={el.id} value={el.id.toString()}>
                      {el.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="capsules"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">{units} Per Day</FormLabel>
              <Select
                key={`capsules-${capsuleInfo.length}-${field.value}`}
                onValueChange={(value) => {
                  field.onChange(value); // Update form state
                  updateCapsuleAction(value); // Call your method
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="e.g. 1" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {capsuleInfo.map((el) => (
                    <SelectItem key={el} value={el.toString()}>
                      {el}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className={` text-white w-full text[16px] md:text-[18px] md:leading-[27px] font-inconsolata font-bold ${
            form.formState.isValid ? "bg-blue" : "pointer-events-none bg-grey29"
          }`}
        >
          Next
        </Button>
      </form>
    </Form>
  );
}
