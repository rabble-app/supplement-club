"use client";
import Image from "next/image";

import { useUser } from "@/contexts/UserContext";
import { authService } from "@/services/authService";
import { useUserStore } from "@/stores/userStore";
import type { IUserResponse } from "@/utils/models/api/response/IUserResponse";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
export default function EmailVerification() {
	const searchParams = useSearchParams();
	const context = useUser();
	const token = searchParams.get("token");
	const { setUser } = useUserStore((state) => state);
	const router = useRouter();

	useEffect(() => {
		const fetchToken = async () => {
			const response = (await authService.emailVerify(token as string)) as {
				data: IUserResponse;
			};

			if (context?.user) {
				context.user.isVerified = response.data.isVerified;
				setUser(context.user);

				if (response.data.metadata?.productId) {
					router.push(
						`/products/${response.data.metadata?.productId}/checkout/`,
					);
				}
			}
		};
		if (token && !context?.user?.isVerified) {
			fetchToken();
		}
	}, [token, context, setUser, router]);

	return (
		<div className="w-full md:w-[800px] mx-auto py-[200px] px-[20px] grid gap-[24px] justify-center">
			<h1 className="text-[40px] leading-[48px] font-hagerman text-center">
				<p className="text-center mb-[8px] text-[20px] leading-[24px] font-inconsolata text-grey4">
					Welcome to Supplement Club
				</p>
				Your email address was successfully verified.
			</h1>
			<Image
				className="mx-auto"
				src="/images/verify-email.svg"
				alt="verify image"
				width={171}
				height={146}
			/>
		</div>
	);
}
