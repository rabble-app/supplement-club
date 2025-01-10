"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { resetPassword } from "@/services/auth";
import { forgotPasswordSchema } from "@/validations";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
	const router = useRouter();
	const form = useForm({
		resolver: zodResolver(forgotPasswordSchema),
		mode: "onChange",
	});
	const [isPending, startTransition] = useTransition();

	async function postResetPassword(e: FormData) {
		await resetPassword(e);
		router.push("/auth/reset-password");
	}

	return (
		<div className="max-w-[632px] mx-auto my-[24px] md:my-[200px] md:px-[16px] min-h-screen md:min-h-max">
			<Form {...form}>
				<form
					action={(e) => startTransition(() => postResetPassword(e))}
					className="grid gap-[24px] px-[16px] md:p-[32px] md:border-grey12 md:border-[1px] border-solid shadow-login"
				>
					<div className="grid gap-[16px]">
						<p className="text-[20px] font-bold font-inconsolata">
							Forgot Your Password?
						</p>
						<p className="text-[14px] leading-[16px] font-helvetica text-grey6">
							Enter your email and we’ll send a link to reset.
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

					<Button
						type="submit"
						className={` text-white w-full text[16px] md:text-[18px] md:leading-[27px] font-inconsolata font-bold ${form.formState.isValid ? "bg-blue" : "pointer-events-none bg-grey25"}`}
					>
						{isPending ? (
							<Loader2 className="animate-spin" />
						) : (
							"Send a Link to Reset My Password"
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
}
