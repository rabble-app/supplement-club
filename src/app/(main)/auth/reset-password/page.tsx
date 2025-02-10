"use client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { authService } from "@/services/authService";

export default function ResetPasswordPage() {
	const context = useUser();

	async function resetPassword() {
		await authService.resetPassword(context?.user?.email || "");
	}

	return (
		<div className="w-full md:w-[800px] mx-auto py-[200px] px-[20px] grid gap-[24px] justify-center">
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
				<br /> If you have not received the email in a few minutes, please check
				your spam folder
			</div>
			<Button
				onClick={resetPassword}
				className=" text-white w-[280px] text[16px] leading-[24px] mx-auto font-inconsolata font-bold bg-blue"
			>
				Request a New Link
			</Button>
		</div>
	);
}
