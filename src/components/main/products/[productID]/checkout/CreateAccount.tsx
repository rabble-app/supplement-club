import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Notify from "@/components/shared/Notify";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUser } from "@/contexts/UserContext";
import { authService } from "@/services/authService";
import { useUserStore } from "@/stores/userStore";
import type { IUserResponse } from "@/utils/models/api/response/IUserResponse";
import { createAccountSchema } from "@/validations";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CreateAccount({
	step,
	params,
	updateStepAction,
	children,
}: Readonly<{
	step: number;
	params: Promise<{ productID: string }>;
	updateStepAction: (newValue: number) => void;
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
		const result = await authService.register(
			e.get("email")?.toString() ?? "",
			e.get("password")?.toString() ?? "",
			e.get("role")?.toString() ?? "USER",
		);
		if (result.statusCode === 200) {
			const userData = result.data as IUserResponse;
			setUser(userData);
			context?.setNewUser(userData);
			updateStepAction(step + 1);
		} else {
			toast.custom(
				() => <Notify message={JSON.parse(result.error).message} />,
				{
					position: "top-right",
				},
			);
		}
	}

	return (
		<Form {...currentForm}>
			<form
				action={(e) => handleSubmit(e)}
				className="flex flex-col gap-[24px] md:p-[32px] md:border-grey12 md:border-[1px] md:border-solid"
			>
				{children}

				<FormField
					control={currentForm.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email*</FormLabel>
							<FormControl>
								<Input {...field} placeholder="e.g. newton@mail.com" />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={currentForm.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password*</FormLabel>
							<FormControl>
								<Input {...field} type="password" placeholder="*************" />
							</FormControl>
						</FormItem>
					)}
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
