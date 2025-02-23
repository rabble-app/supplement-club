"use client";

import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import FormFieldComponent from "@/components/shared/FormFieldComponent";
import { CustomToast, StatusToast } from "@/components/shared/Toast";
import { authService } from "@/services/authService";
import { forgotPasswordSchema } from "@/validations";

export default function ForgotPasswordPage() {
	const form = useForm({
		resolver: zodResolver(forgotPasswordSchema),
		mode: "onChange",
	});
	const [isPending, startTransition] = useTransition();
	const [resend, setResend] = useState(false);
	const [email, setEmail] = useState<string>("");

	async function postResetPassword(e: FormData) {
		const email = e.get("email")?.toString() ?? "";
		await authService.resetPassword(email);
		setEmail(email);
		setResend(true);
	}

	async function resetPassword() {
		await authService.resetPassword(email);
		CustomToast({
			title: "A new link has been sent to your email",
			status: StatusToast.SUCCESS,
			position: "top-center",
		});
	}

	return (
		<div className="flex justify-center items-center py-[40px] md:py-[80px]">
			<div className="max-w-[632px] w-full px-[16px]">
				{!resend && (
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

							<FormFieldComponent
								form={form}
								label="Email*"
								placeholder="e.g. newton@mail.com"
								id="email"
								name="email"
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
				)}
				{resend && (
					<div className="w-full px-[20px] grid gap-[24px] justify-center">
						<h1 className="text-[40px] leading-[48px] font-hagerman text-center">
							Link sent to your email
						</h1>
						<Image
							className="mx-auto"
							src="/images/verify-email.svg"
							alt="verify image"
							width={171}
							height={146}
						/>
						<div className="text-[20px] leading-[24px] text-grey4 font-helvetica text-center">
							An email has been sent to with a link to your email address.
							<br /> If you have not received the email in a few minutes, please
							check your spam folder
						</div>
						<Button
							onClick={() => resetPassword()}
							className=" text-white w-[280px] text[16px] leading-[24px] mx-auto font-inconsolata font-bold bg-blue"
						>
							Request a New Link
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
