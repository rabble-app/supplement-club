"use client";

import AddressAutocomplete from "@/components/shared/AddressAutocomplete";
import FormFieldComponent from "@/components/shared/FormFieldComponent";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useUser } from "@/contexts/UserContext";
import { usersService } from "@/services/usersService";
import { deliveryAddressSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
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
	const currentForm = useForm({
		resolver: zodResolver(deliveryAddressSchema),
		mode: "onChange",
	});

	const context = useUser();

	if (context?.user) {
		currentForm.setValue("userId", context?.user.id);
	}

	const onSubmit = async (values: z.infer<typeof deliveryAddressSchema>) => {
		await usersService.updateDeliveryAddress(
			values.userId,
			"SUPPLEMENT",
			values.firstName,
			values.lastName,
			values.address1, // need address2
			values.city,
			values.postcode,
			values.country,
			values.mobileNumber,
		);
		updateStepAction(step + 1);
	};

	return (
		<Form {...currentForm}>
			<AddressAutocomplete form={currentForm} />
			<form
				onSubmit={currentForm.handleSubmit(onSubmit)}
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
					id="address1"
					name="address1"
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
					id="postcode"
					name="postcode"
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
