import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const step1FormSchema = z.object({
	email: z
		.string({ required_error: "Field is required." })
		.email({ message: "Invalid email address." }),
	password: z.string({ required_error: "Field is required." }),
});

export default function CreateAccount({
	step,
	updateStepAction,
	children,
}: Readonly<{
	step: number;
	updateStepAction: (newValue: number) => void;
	children?: React.ReactNode;
}>) {
	const currentForm = useForm<z.infer<typeof step1FormSchema>>({
		resolver: zodResolver(step1FormSchema),
	});
	const onSubmit: SubmitHandler<z.infer<typeof step1FormSchema>> = (data) => {
		// call api
		console.log(data);
		updateStepAction(step + 1);
	};

	return (
		<Form {...currentForm}>
			<form
				onSubmit={currentForm.handleSubmit(onSubmit)}
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
						href="/login"
					>
						Log in
					</Link>
				</div>
			</form>
		</Form>
	);
}
