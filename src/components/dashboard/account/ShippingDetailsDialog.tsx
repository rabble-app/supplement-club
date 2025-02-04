"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import AddressAutocomplete from "@/components/shared/AddressAutocomplete";
import FormFieldComponent from "@/components/shared/FormFieldComponent";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { usersService } from "@/services/usersService";
import type IUserModel from "@/utils/models/api/IUserModel";
import { shippingDetailsShema } from "@/validations";
import { Separator } from "@radix-ui/react-separator";
import { VisuallyHidden } from "@reach/visually-hidden";
import { useState } from "react";
import ManageAccountCard from "./ManageAccountCard";

type ShippingDialogProps = {
	user: IUserModel;
	updateUserAction: (user: IUserModel) => void;
};

export default function ShippingDetailsDialog({
	user,
	updateUserAction,
}: ShippingDialogProps) {
	const [isOpen, setIsOpen] = useState(false);
	const form = useForm<z.infer<typeof shippingDetailsShema>>({
		resolver: zodResolver(shippingDetailsShema),
		mode: "onChange",
	});

	const updateShippingData = () => {
		form.reset({
			address: user.shipping?.address,
			address2: user.shipping?.address2,
			city: user.shipping?.city,
			country: user.shipping?.country,
			postalCode: user.shipping?.postalCode,
			buildingNo: user.shipping?.buildingNo,
		});
	};

	const onSubmit = async (values: z.infer<typeof shippingDetailsShema>) => {
		await usersService.updateShippingInfo(
			user.id || "0eaf5135-f229-4749-bb3b-7336d3739974",
			values.address,
			values.address2,
			values.buildingNo || "",
			values.city,
			values.country,
			values.postalCode,
		);
		user.shipping = values;
		updateUserAction(user);
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={updateShippingData}>
			<DialogTrigger onClick={() => setIsOpen(true)}>
				<ManageAccountCard
					title="Shipping address"
					value={
						user?.shipping?.address || user?.shipping?.address1 || "Not set"
					}
					imageAlt="Home icon"
					imageSrc="/images/icons/home-blue-icon.svg"
				/>
			</DialogTrigger>
			<DialogContent className="w-full h-full sm:h-auto sm:max-w-[600px] p-0 gap-4 rounded-md">
				<AddressAutocomplete form={form} />
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-4 p-4"
					>
						<DialogHeader className="flex flex-row justify-between items-center">
							<DialogTitle className="text-lg font-bold font-inconsolata">
								Shipping Details
							</DialogTitle>
							<DialogClose onClick={() => setIsOpen(false)}>
								<div className="border border-grey32 w-10 h-10 rounded-full flex justify-center items-center">
									<Image
										src="/images/icons/close-black-icon.svg"
										alt="Close icon"
										width={16}
										height={16}
									/>
								</div>
							</DialogClose>
						</DialogHeader>

						<VisuallyHidden>
							<DialogDescription />
						</VisuallyHidden>

						<Separator className="h-px bg-grey32 -mx-4" />

						<FormFieldComponent
							form={form}
							label="Address Line 1*"
							name="address"
							placeholder="Somewhere around"
							id="address"
						/>

						<FormFieldComponent
							form={form}
							label="Address Line 2"
							name="address2"
							placeholder="Near somewhere"
							id="address2"
						/>

						<FormFieldComponent
							form={form}
							label="Building No"
							name="buildingNo"
							placeholder="43"
							id="building_number"
						/>

						<FormFieldComponent
							form={form}
							label="City*"
							name="city"
							placeholder="London"
							id="city"
						/>

						<FormFieldComponent
							form={form}
							label="Country*"
							name="country"
							placeholder="United Kingdom"
							id="country"
						/>

						<FormFieldComponent
							form={form}
							label="Postcode*"
							name="postalCode"
							placeholder="SE167NX"
							id="postalCode"
						/>

						<Separator className="h-px bg-grey32 -mx-4" />

						<Button
							type="submit"
							className="w-40 font-bold font-inconsolata text-lg flex ml-auto bg-blue text-white"
						>
							Save Changes
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
