/** @format */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z
    .string({ required_error: "Field is required." })
    .email({ message: "Invalid email address." }),
  password: z.string({ required_error: "Field is required." }),
});

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // call api
    console.log(values);
  }

  return (
    <div className="max-w-[632px] mx-auto my-[24px] md:my-[200px] md:px-[16px] min-h-screen md:min-h-max">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-[24px] px-[16px] md:p-[32px] md:border-grey12 md:border-[1px] border-solid shadow-login"
        >
          <div className="grid gap-[16px]">
            <p className="text-[20px] font-bold font-inconsolata">
              Login To Your Account
            </p>
            <p className="text-[14px] leading-[16px] font-helvetica text-grey6">
              Welcome back! Please enter your details.
            </p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-bold font-inconsolata">
                  Email*
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. newton@mail.com" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem className={`${fieldState.invalid ? "error" : ""}`}>
                <FormLabel className="flex justify-between text-[16px] font-bold font-inconsolata">
                  Password*{" "}
                  <Link
                    className="text-blue font-roboto font-[400] underline"
                    href="/auth/forgot-password/"
                  >
                    Forgot password?
                  </Link>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    placeholder="*************"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Link href="/dashboard">
            <Button
              type="submit"
              className={` text-white w-full text[16px] md:text-[18px] md:leading-[27px] font-inconsolata font-bold ${
                form.formState.isValid
                  ? "bg-blue"
                  : "pointer-events-none bg-grey25"
              }`}
            >
              Login
            </Button>
          </Link>
        </form>
      </Form>
    </div>
  );
}
