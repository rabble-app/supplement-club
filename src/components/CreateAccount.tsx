import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { register } from "@/services/auth";
import { useUserStore } from "@/stores/userStore";
import type { IUserResponse } from "@/utils/models/api/response/IUserResponse";
import { createAccountSchema } from "@/validations";
import { toast } from "sonner";
import Motify from "./notify";

export default function CreateAccount({
	step,
	updateStepAction,
	children,
}: Readonly<{
	step: number;
	updateStepAction: (newValue: number) => void;
	children?: React.ReactNode;
}>) {
	const { setUser } = useUserStore((state) => state);
	const currentForm = useForm({
		resolver: zodResolver(createAccountSchema),
		mode: "onChange",
	});

	async function handleSubmit(e: FormData) {
		const result = await register(e);
		if (result.statusCode === 200) {
			const userData = result.data as IUserResponse;
			setUser(userData);
			updateStepAction(step + 1);
		} else {
			toast.custom(
				() => <Motify message={JSON.parse(result.error).message} />,
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
						href="/auth/login"
					>
						Log in
					</Link>
				</div>
			</form>
		</Form>
	);
}
