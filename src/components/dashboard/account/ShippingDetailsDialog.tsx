"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import ManageAccountCard from "./ManageAccountCard";

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

const formSchema = z.object({
	address1: z.string({ required_error: "Field is required." }),
	address2: z.string({ required_error: "Field is required." }),
	city: z.string({ required_error: "Field is required." }),
	postcode: z.string({ required_error: "Field is required." }),
	country: z.string({ required_error: "Field is required." }),
});

export default function ShippingDetailsDialog() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
		defaultValues: {
			address1: "Penthouse 4",
			address2: "Rotherfield",
			city: "UK",
			country: "London",
			postcode: " N1 3BU",
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
					title="Shipping address"
					value="Penthouse 4, Rotherfield Street, London, N1 3BU"
					imageAlt="Home icon"
					imageSrc="/images/icons/home-blue-icon.svg"
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
									Shipping Details
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
									control={form.control}
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
								control={form.control}
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
								control={form.control}
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
								control={form.control}
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
