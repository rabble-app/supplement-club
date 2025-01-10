"use client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { resendEmailVerification, verifyEmail } from "@/services/auth";
import { useUserStore } from "@/stores/userStore";
import type { IUserResponse } from "@/utils/models/api/response/IUserResponse";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function EmailVerifyPage() {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const { user, setUser } = useUserStore((state) => state);

	useEffect(() => {
		const fetchToken = async () => {
			if (token) {
				const response = await verifyEmail(token);
				const { data } = response as { data: IUserResponse };
				setUser(data);
			}
		};
		if (token) {
			fetchToken();
		}
	}, [token, setUser]);

	return (
		<div className="w-full md:w-[800px] mx-auto py-[200px] px-[20px] grid gap-[24px] justify-center">
			<h1 className="text-[40px] leading-[48px] font-hagerman text-center">
				<p className="text-center mb-[8px] text-[20px] leading-[24px] font-inconsolata text-grey4">
					Welcome to Supplement Club
				</p>
				Lets verify your email address
			</h1>
			<Image
				className="mx-auto"
				src="/images/verify-email.svg"
				alt="verify image"
				width={171}
				height={146}
			/>
			<div className="text-[20px] leading-[24px] text-grey4 font-helvetica text-center">
				An email has been sent to with a link to verify your email address.{" "}
				<br />
				If you have not received the email in a few minutes, please check your
				spam folder
			</div>
			<Button
				onClick={() =>
					user?.email != null ? resendEmailVerification(user.email) : undefined
				}
				className=" text-white w-[280px] text[16px] leading-[24px] mx-auto font-inconsolata font-bold bg-blue"
			>
				Request a New Link
			</Button>
		</div>
	);
}
