"use client";

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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import type { IFilterModel } from "@/utils/models/IFilterModel";

const step1FormSchema = z.object({
	weekly: z.string({
		required_error: "Please select an weekly value",
	}),
	capsules: z.string({
		required_error: "Please select an capsules value",
	}),
});

const weeksSupply = [
	{
		id: 1,
		value: "1 Week",
	},
	{
		id: 2,
		value: "2 Weeks",
	},
	{
		id: 3,
		value: "1 Month",
	},
	{
		id: 4,
		value: "6 Months",
	},
] as IFilterModel[];

const capsulesPerDay = [
	{
		id: 1,
		value: "1",
	},
	{
		id: 2,
		value: "2",
	},
	{
		id: 3,
		value: "3",
	},
	{
		id: 4,
		value: "4",
	},
] as IFilterModel[];

export default function TopUpCapsuleHeading({
	step,
	updateStepAction,
}: Readonly<{
	step: number;
	updateStepAction: (newValue: number) => void;
}>) {
	const form = useForm<z.infer<typeof step1FormSchema>>({
		resolver: zodResolver(step1FormSchema),
		mode: "onChange",
	});
	const onSubmit: SubmitHandler<z.infer<typeof step1FormSchema>> = (data) => {
		// call api
		console.log(data);
		updateStepAction(step + 1);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-[24px] px-[16px] py-[32px] md:px-[32px] md:border-grey12 md:border-[1px] md:border-solid"
			>
				<div className="grid gap-[16px]">
					<p className="text-[20px] leading-[24px] font-bold font-inconsolata">
						Top Up Capsules Heading
					</p>
					<p className="text-[14px] leading-[16px] font-helvetica text-grey6">
						A subheading here as well.
					</p>
				</div>
				<FormField
					control={form.control}
					name="weekly"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Weeks Supply</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="e.g 2 Weeks" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{weeksSupply.map((el) => (
										<SelectItem key={el.id} value={el.id.toString()}>
											{el.value}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="capsules"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Capsules Per Day</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="e.g. 2" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{capsulesPerDay.map((el) => (
										<SelectItem key={el.id} value={el.id.toString()}>
											{el.value}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					className={` text-white w-full text[16px] md:text-[18px] md:leading-[27px] font-inconsolata font-bold ${form.formState.isValid ? "bg-blue" : "pointer-events-none bg-grey29"}`}
				>
					Next
				</Button>
			</form>
		</Form>
	);
}
