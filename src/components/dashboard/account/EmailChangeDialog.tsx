"use client";

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
import type IUserModel from "@/utils/models/api/IUserModel";
import { emailChangeDialogSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-separator";
import { VisuallyHidden } from "@reach/visually-hidden";
import Image from "next/image";
import { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import ManageAccountCard from "./ManageAccountCard";

type EmailChangeDialogProps = {
	user: IUserModel;
	updateUserAction: (user: IUserModel) => void;
};

export default function EmailChangeDialog({
	user,
	updateUserAction,
}: EmailChangeDialogProps) {
	const [isOpen, setIsOpen] = useState(false);

	const form = useForm({
		resolver: zodResolver(emailChangeDialogSchema),
		mode: "onChange",
	});
	const updateUserData = () => {
		form.reset({
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
		});
	};

	const onSubmit = async () => {
		const { firstName, lastName, email } = form.getValues();
		/* await usersService.updateUserInfo(
			firstName,
			lastName,
			email,
		); */
		const updatedUser = { ...user, firstName, lastName, email };
		updateUserAction(updatedUser);
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={updateUserData}>
			<DialogTrigger onClick={() => setIsOpen(true)}>
				<ManageAccountCard
					title="Email"
					value={user.email}
					imageAlt="User profile"
					imageSrc="/images/icons/user-profile-blue-icon.svg"
				/>
			</DialogTrigger>
			<DialogContent className="w-full h-full sm:h-auto sm:max-w-[600px] gap-4 p-0 rounded">
				<Form {...form}>
					<form
						action={() => startTransition(() => onSubmit())}
						className="flex flex-col gap-4 p-4 justify-between md:justify-start"
					>
						<DialogHeader className="flex flex-row justify-between items-center">
							<DialogTitle className="text-[18px] leading-[28px] font-inconsolata font-bold">
								Email
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
						<Separator className="h-px bg-grey32 mx-[-16px]" />

						<FormFieldComponent
							form={form}
							label="First Name*"
							name="firstName"
							placeholder="Kate"
							id="firstName"
						/>

						<FormFieldComponent
							form={form}
							label="Last Name*"
							name="lastName"
							placeholder="Evans"
							id="lastName"
						/>

						<FormFieldComponent
							form={form}
							label="Email*"
							name="email"
							placeholder="kate.evans@outlook.com"
							id="email"
						/>

						<Separator className="h-px bg-grey32 mx-[-16px]" />
						<Button
							type="submit"
							className={`text-white text-[16px] md:text-[18px] font-inconsolata w-40 ml-auto font-bold ${
								form.formState.isValid
									? "bg-blue"
									: "pointer-events-none bg-blue14 text-grey34"
							}`}
						>
							Save Changes
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
