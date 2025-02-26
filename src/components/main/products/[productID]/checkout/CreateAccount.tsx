import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import FormFieldComponent from "@/components/shared/FormFieldComponent";
import { CustomToast, StatusToast } from "@/components/shared/Toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useUser } from "@/contexts/UserContext";
import { authService } from "@/services/authService";
import { useUserStore } from "@/stores/userStore";
import type { IResponseModel } from "@/utils/models/api/response/IResponseModel";
import type { IUserResponse } from "@/utils/models/api/response/IUserResponse";
import { createAccountSchema } from "@/validations";
import router from "next/router";
import { useEffect, useState } from "react";

export default function CreateAccount({
	params,
	children,
}: Readonly<{
	params: Promise<{ productID: string }>;
	children?: React.ReactNode;
}>) {
	const context = useUser();
	const { setUser } = useUserStore((state) => state);
	const [productId, setProductId] = useState<string>();

	useEffect(() => {
		const fetchProductId = async () => {
			const { productID } = await params;
			setProductId(productID);
		};
		fetchProductId();
	}, [params]);

	const currentForm = useForm({
		resolver: zodResolver(createAccountSchema),
		mode: "onChange",
	});

	async function handleSubmit(e: FormData) {
		const result = (await authService.register(
			e.get("email")?.toString() ?? "",
			e.get("password")?.toString() ?? "",
			productId ?? "",
		)) as IResponseModel;
		if (result.statusCode === 200 || result.statusCode === 201) {
			const userData = result.data as IUserResponse;
			setUser(userData);
			context?.setNewUser(userData);

			// logged the user
			await authService.login(
				e.get("email")?.toString() ?? "",
				e.get("password")?.toString() ?? "",
			);
			router.push(
				`/auth/email-verify?redirect=/products/${productId}/checkout`,
			);
		} else {
			CustomToast({
				title: JSON.parse(result?.error).message,
				status: StatusToast.ERROR,
			});
		}
	}

	return (
		<Form {...currentForm}>
			<form
				action={(e) => handleSubmit(e)}
				className="flex flex-col gap-[24px] md:p-[32px] md:border-grey12 md:border-[1px] md:border-solid"
			>
				{children}

				<FormFieldComponent
					form={currentForm}
					label="Email*"
					placeholder="e.g. newton@mail.com"
					id="email"
					name="email"
				/>

				<FormFieldComponent
					form={currentForm}
					label="Password*"
					placeholder="*************"
					id="password"
					name="password"
					type="password"
				/>

				<Button type="submit" className="bg-blue text-white w-full font-bold">
					Next
				</Button>

				<div className="flex justify-center gap-[5px] items-center text-[16px] leading-[24px] font-roboto">
					Have an account?
					<Link
						className="text-blue text-[16px] leading-[24px] font-roboto"
						href={`/auth/login?redirect=/products/${productId}/checkout`}
					>
						Log in
					</Link>
				</div>
			</form>
		</Form>
	);
}
