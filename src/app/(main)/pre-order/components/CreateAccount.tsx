import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const step1FormSchema = z.object({
	email: z
		.string({ required_error: "Field is required." })
		.email({ message: "Invalid email address." }),
	password: z.string({ required_error: "Field is required." }),
});

export default function CreateAccount({
	step,
	updateStepAction,
}: Readonly<{ step: number; updateStepAction: (newValue: number) => void }>) {
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
				className="flex flex-col gap-[24px] pt-[32px] px-[16px] md:p-[32px] md:border-grey12 md:border-[1px] md:border-solid"
			>
				<div className="grid gap-[16px]">
					<p className="text-[20px] leading-[24px] font-bold font-inconsolata">
						PRE-ORDER Now to become a Founding Member{" "}
					</p>
					<div className="grid gap-[8px]">
						<p className="text-[14px] leading-[16px] font-helvetica text-grey6">
							Only get charged when we hit 50 pre-orders.
						</p>
						<p className="text-[14px] leading-[16px] font-helvetica text-grey6">
							By becoming a founding member you get an extra 10% off the team
							price forever{" "}
						</p>
						<p className="text-[14px] leading-[16px] font-helvetica text-grey6">
							Lead time is 6 weeks from when we charge you - but you get 10% off
							your subscription forever
						</p>
					</div>
				</div>

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
						className="text-blue text-[16px] leading-[24px] font-roboto underline"
						href="/login"
					>
						Login
					</Link>
				</div>
			</form>
		</Form>
	);
}
