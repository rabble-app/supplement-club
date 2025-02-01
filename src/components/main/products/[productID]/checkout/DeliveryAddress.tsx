/** @format */

"use client";

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
import { useUser } from "@/contexts/UserContext";
import { deliveryAddressSchema } from "@/validations";

import { usersService } from "@/services/usersService";
import { useEffect } from "react";

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

	useEffect(() => {
		// Dynamically import the library to avoid SSR issues
		import("getaddress-autocomplete").then((getAddress) => {
			getAddress
				.autocomplete("address1", process.env.NEXT_PUBLIC_GETADDRESS_API_KEY)
				.then((autocomplete) => {
					// Handle the promise here
					autocomplete?.addEventListener(
						"getaddress-autocomplete-address-selected",
						(e) => {
							currentForm.setValue(
								"address1",
								e.address.formatted_address[0] || "",
							);
							currentForm.setValue(
								"address2",
								e.address.formatted_address[1] || "",
							);
							currentForm.setValue(
								"city",
								e.address.formatted_address[3] || "",
							);
							currentForm.setValue(
								"county",
								e.address.formatted_address[4] || "",
							);
							currentForm.setValue("postcode", e.address.postcode || "");
						},
					);
				});
		});
	}, [currentForm.setValue]);

	const context = useUser();

	if (context?.user) {
		currentForm.setValue("userId", context?.user.id);
	}

	async function onSubmit() {
		const values = currentForm.getValues();
		const formData = new FormData();
		// Append each value to the FormData object
		for (const key in values) {
			formData.append(key, values[key]);
		}

		await usersService.updateDeliveryAddress(
			formData.get("userId")?.toString() ?? "",
			"SUPPLEMENT",
			formData.get("firstName")?.toString() ?? "",
			formData.get("lastName")?.toString() ?? "",
			`${formData.get("address1")?.toString()} ${formData.get("address2")?.toString()}`,
			formData.get("city")?.toString() ?? "",
			formData.get("postcode")?.toString() ?? "",
			formData.get("country")?.toString() ?? "",
			formData.get("mobileNumber")?.toString() ?? "",
		);
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
					name="address1"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Address Line 1*</FormLabel>
							<FormControl>
								<Input
									{...field}
									id="address1"
									placeholder="Somewhere around"
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={currentForm.control}
					name="address2"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Address Line 2</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Near somewhere" id="address2" />
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
								<Input {...field} placeholder="London" id="city" />
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
								<Input {...field} placeholder="United Kingdom" id="county" />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={currentForm.control}
					name="postcode"
					render={({ field }) => (
						<FormItem className="grid">
							<FormLabel>Postcode*</FormLabel>
							<FormControl>
								<Input {...field} id="postcode" placeholder="SE167NX" />
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
