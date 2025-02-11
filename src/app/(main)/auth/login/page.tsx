/** @format */

"use client";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import FormFieldComponent from "@/components/shared/FormFieldComponent";
import Notify from "@/components/shared/Notify";
import { useUser } from "@/contexts/UserContext";
import { authService } from "@/services/authService";
import { useUserStore } from "@/stores/userStore";
import type { IResponseModel } from "@/utils/models/api/response/IResponseModel";
import type { IUserResponse } from "@/utils/models/api/response/IUserResponse";
import { loginSchema } from "@/validations";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
	const router = useRouter();
	const [redirect, setRedirect] = useState("/dashboard");
	const form = useForm({
		resolver: zodResolver(loginSchema),
		mode: "onChange",
	});

	const [isPending, startTransition] = useTransition();
	const { setUser } = useUserStore((state) => state);
	const context = useUser();

	const searchParams = useSearchParams();

	// included redirected url after user is loggin
	useEffect(() => {
		const searchRedirect = searchParams.get("redirect");
		if (searchRedirect) {
			setRedirect(searchRedirect);
		}
	}, [searchParams]);

	async function handleSubmit(e: FormData) {
		const result = (await authService.login(
			e.get("email")?.toString() ?? "",
			e.get("password")?.toString() ?? "",
			e.get("role")?.toString() ?? "USER",
		)) as IResponseModel;

		if (result.statusCode === 200) {
			const userData = result.data as IUserResponse;
			setUser(userData);
			context?.setNewUser(userData);
			router.push(redirect);
		} else {
			toast.custom(
				() => (
					<Notify
						message={
							JSON.parse(result.error || "Incorrect email/password").message
						}
					/>
				),
				{
					position: "top-right",
				},
			);
		}
	}

	const passwordLabelContent = () => (
		<>
			<span>Password*</span>
			<Link
				className="text-blue font-roboto font-[400] underline"
				href="/auth/forgot-password/"
			>
				Forgot password?
			</Link>
		</>
	);

	return (
		<div className="max-w-[632px] mx-auto my-[24px] md:my-[200px] md:px-[16px] min-h-screen md:min-h-max">
			<Form {...form}>
				<form
					action={(e) => startTransition(() => handleSubmit(e))}
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

					<FormFieldComponent
						form={form}
						label="Email*"
						placeholder="e.g. newton@mail.com"
						id="email"
						name="email"
					/>

					<FormFieldComponent
						form={form}
						placeholder="e.g. newton@mail.com"
						id="password"
						name="password"
						type="password"
						labelContent={passwordLabelContent()}
					/>

					<Button
						type="submit"
						className={` text-white w-full text[16px] md:text-[18px] md:leading-[27px] font-inconsolata font-bold ${form.formState.isValid ? "bg-blue" : "pointer-events-none bg-grey25"}`}
					>
						{isPending ? <Loader2 className="animate-spin" /> : "Login"}
					</Button>
				</form>
			</Form>
		</div>
	);
}
