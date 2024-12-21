"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ManageAccountCard from "./ManageAccountCard";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@radix-ui/react-separator";

const formSchema = z.object({
	email: z
		.string({ required_error: "Field is required." })
		.email({ message: "Invalid email address." }),
	firstName: z.string({ required_error: "Field is required." }),
	lastName: z.string({ required_error: "Field is required." }),
});

export default function EmailChangeDialog() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
		defaultValues: {
			firstName: "kate",
			lastName: "evans",
			email: "kate.evans@outlook.com",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// call api
		console.log(values);
	}

	return (
		<Dialog>
			<DialogTrigger>
				<ManageAccountCard
					title="Email"
					value="kate.evans@outlook.com"
					imageAlt="user profile"
					imageSrc="/images/icons/user-profile-blue-icon.svg"
				/>
			</DialogTrigger>
			<DialogContent
				border={"rounded"}
				className="w-full h-full sm:h-auto sm:max-w-[600px] gap-[16px] p-[0]"
			>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-[16px] p-[16px] justify-between md:justify-start"
					>
						<div className="md:contents grid gap-[16px]">
							<DialogHeader className="flex flex-row justify-between items-center">
								<DialogTitle className="text-[18px] leading-[28px] font-inconsolata font-bold">
									Email
								</DialogTitle>

								<DialogClose>
									<div className="border-[1px] border-grey32 w-[38px] h-[38px] rounded-[50%] flex justify-center">
										<Image
											src="/images/icons/close-black-icon.svg"
											alt="Close icon"
											width={16}
											height={16}
										/>
									</div>
								</DialogClose>
							</DialogHeader>

							<Separator className=" h-[1px] bg-grey32 mx-[-16px]" />

							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem className="mb-[16px]">
										<FormLabel className="text-[16px] font-bold font-inconsolata">
											First Name*
										</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Kate" />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="lastName"
								render={({ field, fieldState }) => (
									<FormItem
										className={`mb-[16px] ${fieldState.invalid ? "error" : ""}`}
									>
										<FormLabel className="flex justify-between text-[16px] font-bold font-inconsolata">
											Last Name*{" "}
										</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Evans" />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="email"
								render={({ field, fieldState }) => (
									<FormItem className={`${fieldState.invalid ? "error" : ""}`}>
										<FormLabel className="flex justify-between text-[16px] font-bold font-inconsolata">
											Email{" "}
										</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Kate.evans@outlook.com" />
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<div className="md:contents grid gap-[16px]">
							<Separator className=" h-[1px] bg-grey32 mx-[-16px]" />

							<Button
								type="submit"
								className={` text-white text[16px] md:text-[18px] md:leading-[27px] font-inconsolata w-[169px] flex ml-auto font-bold ${form.formState.isValid ? "bg-blue text-white" : "pointer-events-none bg-blue14 text-grey34"}`}
							>
								Save Changes
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
