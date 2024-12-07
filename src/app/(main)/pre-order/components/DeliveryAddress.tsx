/** @format */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
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

type AddressAutofillProps = {
	accessToken: string;
	children: React.ReactNode;
};
const AddressAutofill = dynamic(
	() =>
		import("@mapbox/search-js-react").then(
			(r) => r.AddressAutofill as React.ComponentType<AddressAutofillProps>,
		),
	{
		ssr: false,
	},
);

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

const step2FormSchema = z.object({
	firstName: z.string({ required_error: "Field is required." }),
	lastName: z.string({ required_error: "Field is required." }),
	address1: z.string({ required_error: "Field is required." }),
	address2: z.string({ required_error: "Field is required." }),
	city: z.string({ required_error: "Field is required." }),
	postcode: z.string({ required_error: "Field is required." }),
	country: z.string({ required_error: "Field is required." }),
	mobileNumber: z.number({ required_error: "Field is required." }).optional(),
});

export default function DeliveryAddress({
	step,
	updateStepAction,
}: Readonly<{ step: number; updateStepAction: (newValue: number) => void }>) {
	const currentForm = useForm<z.infer<typeof step2FormSchema>>({
		resolver: zodResolver(step2FormSchema),
	});

	const onSubmit: SubmitHandler<z.infer<typeof step2FormSchema>> = (data) => {
		// call api
		console.log(data);
		updateStepAction(step + 1);
	};
	return (
		<Form {...currentForm}>
			<form
				onSubmit={currentForm.handleSubmit(onSubmit)}
				className="flex flex-col gap-[24px] p-[16px] md:p-[32px] md:border-grey12 md:border-[1px] md:border-solid"
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
							price forever
						</p>
						<p className="text-[14px] leading-[16px] font-helvetica text-grey6">
							Lead time is 6 weeks from when we charge you - but you get 10% off
							your subscription forever
						</p>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-[24px]">
					<FormField
						control={currentForm.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>First Name*</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Newton" />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={currentForm.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last Name*</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Vasyl" />
								</FormControl>
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={currentForm.control}
					name="postcode"
					render={({ field }) => (
						<FormItem className="grid">
							<FormLabel>Postcode*</FormLabel>
							<FormControl>
								<Input
									{...field}
									autoComplete="postal-code"
									placeholder="SE167NX"
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<AddressAutofill accessToken={MAPBOX_ACCESS_TOKEN}>
					<FormField
						control={currentForm.control}
						name="address1"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Address Line 1*</FormLabel>
								<FormControl>
									<Input
										{...field}
										autoComplete="address-line1"
										placeholder="Somewhere around"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</AddressAutofill>

				<FormField
					control={currentForm.control}
					name="address2"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Address Line 2*</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Near somewhere"
									autoComplete="address-line2"
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={currentForm.control}
					name="city"
					render={({ field }) => (
						<FormItem>
							<FormLabel>City*</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="London"
									autoComplete="address-level2"
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={currentForm.control}
					name="country"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Country*</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="United Kingdom"
									autoComplete="address-level1"
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={currentForm.control}
					name="mobileNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mobile Number</FormLabel>
							<FormControl>
								<Input {...field} placeholder="+71 638 236783" />
							</FormControl>
						</FormItem>
					)}
				/>

				<Button type="submit" className="bg-blue text-white w-full font-bold">
					Next
				</Button>
			</form>
		</Form>
	);
}
