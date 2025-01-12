"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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

const formSchema = z
	.object({
		password: z.string({ required_error: "Field is required." }),
		confirmPassword: z.string({ required_error: "Field is required." }),
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: "custom",
				path: ["confirmPassword"],
			});
		}
	});

export default function ChangePasswordPage() {
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
					<p className="text-[20px] font-bold font-inconsolata">
						Reset Your Password.
					</p>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-[16px] font-bold font-inconsolata">
									New Password*
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
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-[16px] font-bold font-inconsolata">
									Confirm Password*
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

					<Button
						type="submit"
						className={` text-white w-full text[16px] md:text-[18px] md:leading-[27px] font-inconsolata font-bold ${form.formState.isValid ? "bg-blue" : "pointer-events-none bg-grey25"}`}
					>
						Reset My Password
					</Button>
				</form>
			</Form>
		</div>
	);
}
