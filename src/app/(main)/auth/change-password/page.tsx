"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useTransition } from "react";
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

import { changePasswordSchema } from "@/validations";

import { authService } from "@/services/authService";
import { useRouter, useSearchParams } from "next/navigation";

export default function ChangePasswordPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	useEffect(() => {
		const fetchToken = async () => {
			if (token) {
				await authService.emailVerify(token);
			}
		};
		if (token) {
			fetchToken();
		}
	}, [token]);

	const form = useForm({
		resolver: zodResolver(changePasswordSchema),
		mode: "onChange",
	});

	const [isPending, startTransition] = useTransition();

	async function postChangePassword(e: FormData) {
		await authService.changePassword(
			e.get("password")?.toString() || "",
			token ?? "",
		);
		router.push("/");
	}

	return (
		<div className="max-w-[632px] mx-auto my-[24px] md:my-[200px] md:px-[16px] min-h-screen md:min-h-max">
			<Form {...form}>
				<form
					action={(e) => startTransition(() => postChangePassword(e))}
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
						{isPending ? (
							<Loader2 className="animate-spin" />
						) : (
							"Reset My Password"
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
}
