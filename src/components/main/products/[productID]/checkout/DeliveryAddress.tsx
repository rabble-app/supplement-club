"use client";

import AddressAutocomplete, {
	type AddressFormData,
} from "@/components/shared/AddressAutocomplete";
import FormFieldComponent from "@/components/shared/FormFieldComponent";
import { CustomToast, StatusToast } from "@/components/shared/Toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useUser } from "@/contexts/UserContext";
import { usersService } from "@/services/usersService";
import { useUserStore } from "@/stores/userStore";
import { deliveryAddressSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition } from "react";
import { useForm } from "react-hook-form";

export default function DeliveryAddress({
	step,
	updateStepAction,
	children,
}: Readonly<{
	step: number;
	updateStepAction: (newValue: number) => void;
	children?: React.ReactNode;
}>) {
	const currentForm = useForm<AddressFormData>({
		resolver: zodResolver(deliveryAddressSchema),
		mode: "onChange",
	});

	const context = useUser();
	const { setUser } = useUserStore((state) => state);

	async function onSubmit(e: FormData) {
		const result = await usersService.addDeliveryAddress({
			userId: context?.user?.id ?? "",
			channel: "SUPPLEMENT",
			firstName: e.get("firstName")?.toString() ?? "",
			lastName: e.get("lastName")?.toString() ?? "",
			address: e.get("address")?.toString() ?? "",
			address2: e.get("address2")?.toString() ?? "",
			city: e.get("city")?.toString() ?? "",
			postalCode: e.get("postalCode")?.toString() ?? "",
			country: e.get("country")?.toString() ?? "",
			phone: e.get("mobileNumber")?.toString() ?? "",
		});

		// set payment card by default
		if (context?.user) {
			context.user.shipping = result.data;
			setUser(context.user);
		}

		if (result?.statusCode === 201 || result?.statusCode === 200) {
			updateStepAction(step + 1);
		} else {
			CustomToast({
				title: JSON.parse(result?.error).message,
				status: StatusToast.ERROR,
			});
		}
	}

	return (
		<Form {...currentForm}>
			<AddressAutocomplete form={currentForm} />
			<form
				action={(e) => startTransition(() => onSubmit(e))}
				className="flex flex-col gap-[24px] p-[16px] md:p-[32px] md:border-grey12 md:border-[1px] md:border-solid"
			>
				{children}

				<div className="grid grid-cols-2 gap-[24px]">
					<FormFieldComponent
						form={currentForm}
						label="First Name*"
						placeholder="Newton"
						id="firstName"
						name="firstName"
					/>

					<FormFieldComponent
						form={currentForm}
						label="Last Name*"
						placeholder="Vasyl"
						id="lastName"
						name="lastName"
					/>
				</div>

				<FormFieldComponent
					form={currentForm}
					label="Address Line 1*"
					placeholder="Somewhere around"
					id="address"
					name="address"
				/>

				<FormFieldComponent
					form={currentForm}
					label="Address Line 2*"
					placeholder="Near somewhere"
					id="address2"
					name="address2"
				/>

				<FormFieldComponent
					form={currentForm}
					label="City*"
					placeholder="London"
					id="city"
					name="city"
				/>

				<FormFieldComponent
					form={currentForm}
					label="Country*"
					placeholder="United Kingdom"
					id="country"
					name="country"
				/>

				<FormFieldComponent
					form={currentForm}
					label="Postcode*"
					placeholder="SE167NX"
					id="postalCode"
					name="postalCode"
				/>

				<FormFieldComponent
					form={currentForm}
					label="Mobile Number"
					placeholder="+71 638 236783"
					id="mobileNumber"
					name="mobileNumber"
				/>

				<Button type="submit" className="bg-blue text-white w-full font-bold">
					Next
				</Button>
			</form>
		</Form>
	);
}
