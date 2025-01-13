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
import InputMask from "@mona-health/react-input-mask";
import { Separator } from "@radix-ui/react-separator";

const formSchema = z.object({
	cardNumber: z
		.string()
		.regex(/^\d{16}$/, "Card number must be exactly 16 digits"),
	terms: z.boolean(),
});

export default function PaymentCardDialog() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
		defaultValues: {
			cardNumber: "9084000011112222",
		},
	});

	const autoFillCardNumber = async () => {
		const clipboardCardNumber = await navigator.clipboard.readText();
		if (clipboardCardNumber !== "" && clipboardCardNumber.length === 16) {
			form.setValue("cardNumber", clipboardCardNumber);
		}
	};

	const updateCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		form.setValue("cardNumber", e.target.value.replaceAll(" ", ""));
	};

	function onSubmit(values: z.infer<typeof formSchema>) {
		// call api
		console.log(values);
	}

	return (
		<Dialog>
			<DialogTrigger>
				<ManageAccountCard
					title="Payment card"
					value="9084 **** **** ****    11/2026"
					imageAlt="Card icon"
					imageSrc="/images/icons/card-blue-icon.svg"
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

							<div>
								<FormField
									control={form.control}
									name="cardNumber"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Card Number</FormLabel>
											<FormControl>
												<div className="grid grid-cols-[24px_1fr_92px] items-center gap-[12px] h-[48px] border-[1px] border-black px-[12px] py-[8px]">
													<Image
														src="/images/icons/card-icon.svg"
														alt="Card icon"
														width={24}
														height={24}
													/>
													<InputMask
														{...field}
														value={field.value ?? ""}
														mask="9999 9999 9999 9999"
														alwaysShowMask="true"
														maskPlaceholder={
															!field?.value || field.value === ""
																? "0000 0000 0000 0000"
																: ""
														}
														className="h-[24px] outline-none font-roboto text-grey16"
														onChange={(
															e: React.ChangeEvent<HTMLInputElement>,
														) => updateCardNumber(e)}
													/>
													<Button
														onClick={(e) => {
															e.preventDefault();
															autoFillCardNumber();
														}}
														className="bg-black text-white font-roboto cursor-pointer h-[32px]"
													>
														<div className="flex items-center gap-[2px]">
															Autofill <span className="text-green">link</span>
														</div>
													</Button>
												</div>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
						</div>

						<div className="md:contents grid gap-[16px]">
							<Separator className=" h-[1px] bg-grey32 mx-[-16px]" />

							<div className="flex justify-between">
								<Button
									variant={"outline"}
									type="submit"
									className=" text-blue text[16px] md:text-[18px] md:leading-[27px] font-inconsolata w-[199px] border-blue"
								>
									Add New Method
								</Button>
								<Button
									type="submit"
									className={` text-white text[16px] md:text-[18px] md:leading-[27px] font-inconsolata w-[169px] flex font-bold ${form.formState.isValid ? "bg-blue text-white" : "pointer-events-none bg-blue14 text-grey34"}`}
								>
									Save Changes
								</Button>
							</div>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
