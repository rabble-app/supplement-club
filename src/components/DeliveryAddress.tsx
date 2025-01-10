/** @format */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
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
import { deliveryAddress } from "@/services/users";
import { useUserStore } from "@/stores/userStore";
import { deliveryAddressSchema } from "@/validations";

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

export default function DeliveryAddress({
	step,
	updateStepAction,
	children,
}: Readonly<{
	step: number;
	updateStepAction: (newValue: number) => void;
	children?: React.ReactNode;
}>) {
	const currentForm = useForm({
		resolver: zodResolver(deliveryAddressSchema),
		mode: "onChange",
	});

	const { user } = useUserStore((state) => state);

	if (user) {
		currentForm.setValue("userId", user.id);
	}

	async function onSubmit() {
		const values = currentForm.getValues();
		const formData = new FormData();
		// Append each value to the FormData object
		for (const key in values) {
			formData.append(key, values[key]);
		}

		await deliveryAddress(formData); // Pass the FormData object
		updateStepAction(step + 1);
	}
	return (
		<Form {...currentForm}>
			<form
				onSubmit={currentForm.handleSubmit(onSubmit)}
				className="flex flex-col gap-[24px] p-[16px] md:p-[32px] md:border-grey12 md:border-[1px] md:border-solid"
			>
				{children}

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
