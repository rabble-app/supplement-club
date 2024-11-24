"use client";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	type SubmitHandler,
	type UseFormReturn,
	useForm,
} from "react-hook-form";
import { z } from "zod";

import OrderCard from "@/components/cards/OrderCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const step1FormSchema = z.object({
	email: z
		.string({ required_error: "Field is required." })
		.email({ message: "Invalid email address." }),
	password: z.string({ required_error: "Field is required." }).min(1),
});

const step2FormSchema = z.object({
	firstName: z.string({ required_error: "Field is required." }),
	lastName: z.string({ required_error: "Field is required." }),
	address1: z.string({ required_error: "Field is required." }),
	address2: z.string({ required_error: "Field is required." }),
	city: z.string({ required_error: "Field is required." }),
	postcode: z.string({ required_error: "Field is required." }),
	country: z.string({ required_error: "Field is required." }),
	mobileNumber: z.string({ required_error: "Field is required." }),
});

const step3FormSchema = z.object({
	cardNumber: z.string({ required_error: "Field is required." }),
});

type AllFormTypes =
	| z.infer<typeof step1FormSchema>
	| z.infer<typeof step2FormSchema>
	| z.infer<typeof step3FormSchema>;

export default function Checkout() {
	const [step, setStep] = useState(1);

	// Initialize all forms unconditionally
	const step1Form = useForm<z.infer<typeof step1FormSchema>>({
		resolver: zodResolver(step1FormSchema),
	});

	const step2Form = useForm<z.infer<typeof step2FormSchema>>({
		resolver: zodResolver(step2FormSchema),
	});

	const step3Form = useForm<z.infer<typeof step3FormSchema>>({
		resolver: zodResolver(step3FormSchema),
	});

	const currentForm = (
		step === 1 ? step1Form : step === 2 ? step2Form : step3Form
	) as UseFormReturn<AllFormTypes>;

	const onSubmit: SubmitHandler<AllFormTypes> = (data) => {
		console.log("Form data:", data);

		// Example step transition
		if (step < 4) {
			setStep(step + 1);
		} else {
			alert("Form completed!");
		}
	};

	return (
		<div className="grid md:grid-cols-2 gap-[16px] px-[16px] container-width mx-[-16px] md:mx-0">
			<div className="flex flex-col gap-[40px] my-[32px]">
				{step < 4 && (
					<div className="flex justify-between items-center">
						<div className="grid gap-[8px] text-[12px] md:text-[14px] leading-[12px] md:leading-[15px] font-bold font-inconsolata">
							<div
								className={`w-[40px] h-[40px] rounded-[50%] flex items-center justify-center mx-[42px] ${step === 1 || step > 1 ? "bg-blue text-white" : "bg-grey12 text-grey13"}`}
							>
								{step === 1 ? (
									1
								) : (
									<Image
										src="/images/icons/check-white-icon.svg"
										alt="Check icon"
										width={16}
										height={16}
									/>
								)}
							</div>
							Create an Account
						</div>

						<div className="grid gap-[8px] text-[12px] md:text-[14px] leading-[12px] md:leading-[15px] font-bold font-inconsolata">
							<div
								className={`w-[40px] h-[40px] rounded-[50%] flex items-center justify-center mx-[42px] ${step === 2 || step > 2 ? "bg-blue text-white" : "bg-grey12 text-grey13"}`}
							>
								{step === 2 ? (
									2
								) : (
									<Image
										src="/images/icons/check-white-icon.svg"
										alt="Check icon"
										width={16}
										height={16}
									/>
								)}
							</div>
							Delivery Address
						</div>

						<div className="grid gap-[8px] text-[12px] md:text-[14px] leading-[12px] md:leading-[15px] font-bold font-inconsolata">
							<div
								className={`w-[40px] h-[40px] rounded-[50%] flex items-center justify-center mx-[42px] ${step === 3 ? "bg-blue text-white" : "bg-grey12 text-grey13"}`}
							>
								{step === 3 ? (
									3
								) : (
									<Image
										src="/images/icons/check-white-icon.svg"
										alt="Check icon"
										width={16}
										height={16}
									/>
								)}
							</div>
							Delivery Address
						</div>
					</div>
				)}

				{step < 4 && (
					<Form {...currentForm}>
						<form
							onSubmit={currentForm.handleSubmit(onSubmit)}
							className="flex flex-col gap-[24px] md:p-[32px] md:border-grey12 md:border-[1px] md:border-solid"
						>
							{step === 1 && (
								<>
									<FormField
										control={currentForm.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email*</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={currentForm.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password*</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
								</>
							)}

							{step === 2 && (
								<>
									<div className="grid grid-cols-2 gap-[24px]">
										<FormField
											control={currentForm.control}
											name="firstName"
											render={({ field }) => (
												<FormItem>
													<FormLabel>First Name*</FormLabel>
													<FormControl>
														<Input {...field} />
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
														<Input {...field} />
													</FormControl>
												</FormItem>
											)}
										/>
									</div>

									<FormField
										control={currentForm.control}
										name="postcode"
										render={({ field }) => (
											<FormItem className="hidden md:grid">
												<FormLabel>Postcode*</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={currentForm.control}
										name="address1"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Address1*</FormLabel>
												<FormControl>
													<Input {...field} placeholder="Somewhere around" />
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={currentForm.control}
										name="address2"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Address2*</FormLabel>
												<FormControl>
													<Input {...field} placeholder="Near somewhere" />
												</FormControl>
											</FormItem>
										)}
									/>
									<div className="grid grid-cols-2 gap-[24px] md:contents">
										<FormField
											control={currentForm.control}
											name="city"
											render={({ field }) => (
												<FormItem>
													<FormLabel>City*</FormLabel>
													<FormControl>
														<Input {...field} placeholder="London" />
													</FormControl>
												</FormItem>
											)}
										/>
										<FormField
											control={currentForm.control}
											name="postcode"
											render={({ field }) => (
												<FormItem className="md:hidden">
													<FormLabel>Postcode*</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
												</FormItem>
											)}
										/>
									</div>

									<div className="grid grid-cols-2 gap-[24px] md:contents">
										<FormField
											control={currentForm.control}
											name="country"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Country*</FormLabel>
													<FormControl>
														<Input {...field} placeholder="United Kingdom" />
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
														<Input {...field} />
													</FormControl>
												</FormItem>
											)}
										/>
									</div>
								</>
							)}

							{step === 3 && (
								<div className="grid gap-[24px]">
									<p className="text-[16px] leading-[19px] font-bold">
										Billing Address
									</p>
									<div className="flex items-center gap-[8px]">
										<Checkbox id="delivery" />
										<label
											htmlFor="delivery"
											className="text-[16px] leading-[19px] text-black5 cursor-pointer"
										>
											Same as delivery address
										</label>
									</div>

									<Separator className="bg-grey13" />

									<div>
										<FormField
											control={currentForm.control}
											name="cardNumber"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Card Number</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
												</FormItem>
											)}
										/>
									</div>

									<Separator className="bg-grey13" />

									<div className="flex items-center gap-[8px]">
										<Checkbox id="terms" />
										<label
											htmlFor="terms"
											className="text-[16px] leading-[19px] text-black5 cursor-pointer"
										>
											I accept the Terms of Service and Privacy Policy
										</label>
									</div>

									<p className="text-[14px] leading-[16px]">
										By making this purchase your supplement club will
										automatically renew and your card will be charged the
										supplement plan price. You can cancel or modify at any time
										using your customer login.
									</p>
								</div>
							)}

							<Button
								type="submit"
								className="bg-blue text-white w-full font-bold"
							>
								{step !== 3 ? "Next" : "Place Order - £68.20"}
							</Button>

							{step === 1 && (
								<div className="flex justify-center gap-[5px] items-center text-[16px] leading-[24px] font-roboto">
									Have an account?
									<Link
										className="text-blue text-[16px] leading-[24px] font-roboto"
										href="/login"
									>
										Log in
									</Link>
								</div>
							)}

							{step === 3 && (
								<div className="grid gap-[11px]">
									<div className="flex gap-[5px] items-center font-bold text-[16px] leading-[18px]">
										<Image
											src="/images/icons/email-icon.svg"
											alt="Email icon"
											width={24}
											height={24}
										/>{" "}
										Email Reminders
									</div>
									<p className="text-[12px] leading-[13px] text-grey4">
										We notify you with enough time to make changes before each
										order
									</p>
								</div>
							)}
						</form>
					</Form>
				)}

				{step === 4 && (
					<div className="grid gap-[24px]">
						<div className="py-[41px] px-[24px] grid gap-[12px]">
							<div className="w-[87px] h-[87px] rounded-[50%] mx-auto flex items-center justify-center bg-blue text-white">
								<Image
									src="/images/icons/check-white-icon.svg"
									alt="Check icon"
									width={87}
									height={87}
								/>
							</div>
							<div className="grid gap-[16px]">
								<p className="text-[24px] leading-[28px] font-hagerman uppercase text-center">
									Thank you For Joining Supplement Club
								</p>
								<p className="text-[20px] leading-[24px] font-helvetica text-grey4 text-center">
									A confirmation email has been sent to maxwelrd@gmail.com
								</p>
							</div>
						</div>

						<div className="bg-grey14 px-[16px] md:px-[18px] pt-[32px] pb-[16px] mx-[-16px] md:mx-[16px]">
							<div className="grid gap-[8px] mb-[11px]">
								<p className="text-[32px] leading-[38px] font-hagerman">
									Your Discounts
								</p>
								<p className="text-[14px] leading-[16px] text-grey4">
									Every Quarter you have up to £15.00 in referral credits. Share
									with friends and you both get £5 off when they sign up.{" "}
								</p>
								<p className="text-[16px] leading-[18px] font-bold">
									Your current price for the next quarter
								</p>
								<p className="text-[32px] leading-[34px] font-bold font-inconsolata">
									£45.00
								</p>
								<Button className="bg-blue text-white w-full font-bold flex justify-center items-center font-inconsolata">
									Invite Friends & Earn £5
								</Button>
								<p className="text-[14px] leading-[14px] font-bold font-inconsolata text-blue flex justify-center items-center bg-blue7 h-[31px]">
									Earn £5 for each friend who joins! They get £5 off too.
								</p>
							</div>

							<div className="grid grid-cols-[63px_1fr_96px] gap-[14px] md:gap-[16px] items-center py-[21.5px] px-[16px] md:px-[32px] shadow-3 scale-[1.03] bg-white md:scale-[1.11] rounded-[12px]">
								<div className="p-[19px] flex justify-center items-center bg-blue8 rounded-[50%] w-[63px] h-[63px]">
									<Image
										src="/images/icons/add-user-icon.svg"
										alt="Lock icon"
										width={24}
										height={24}
									/>
								</div>

								<div className="grid gap-[8px]">
									<p className="text-[20px] leading-[23px] font-hagerman">
										Referral Rookie{" "}
										<span className="text-[20px] leading-[23px] font-hagerman">
											(1/1)
										</span>
									</p>
									<p className="text-[20px] leading-[20px] font-[600] font-inconsolata">
										£5 off{" "}
									</p>
								</div>

								<div className="text-[32px] leading-[33px] font-[800] font-inconsolata text-blue">
									£40.00
								</div>
							</div>

							<div className="grid grid-cols-[63px_1fr_75px] gap-[14px] md:gap-[16px] items-center py-[21.5px] px-[16px] md:px-[32px]">
								<div className="p-[19px] flex justify-center items-center bg-grey3 rounded-[50%] w-[63px] h-[63px]">
									<Image
										src="/images/icons/lock-icon.svg"
										alt="Lock icon"
										width={24}
										height={24}
									/>
								</div>

								<div className="grid gap-[8px]">
									<p className="text-[20px] leading-[23px] font-hagerman text-grey6">
										Team Builder{" "}
										<span className="text-[20px] leading-[23px] font-hagerman text-grey6">
											(1/2)
										</span>
									</p>
									<p className="text-[20px] leading-[20px] font-inconsolata text-grey15">
										£10 off{" "}
									</p>
								</div>

								<div className="text-[24px] leading-[25px] font-[800] font-inconsolata text-grey15">
									£40.00
								</div>
							</div>

							<div className="grid grid-cols-[63px_1fr_75px] gap-[14px] md:gap-[16px] items-center py-[21.5px] px-[16px] md:px-[32px]">
								<div className="p-[19px] flex justify-center items-center bg-grey3 rounded-[50%] w-[63px] h-[63px]">
									<Image
										src="/images/icons/lock-icon.svg"
										alt="Lock icon"
										width={24}
										height={24}
									/>
								</div>

								<div className="grid gap-[8px]">
									<p className="text-[20px] leading-[23px] font-hagerman text-grey6">
										Super Sharer{" "}
										<span className="text-[20px] leading-[23px] font-hagerman text-grey6">
											(1/3)
										</span>
									</p>
									<p className="text-[20px] leading-[20px] font-inconsolata text-grey15">
										£15 off{" "}
									</p>
								</div>

								<div className="text-[24px] leading-[25px] font-[800] font-inconsolata text-grey15">
									£35.00
								</div>
							</div>
						</div>

						<div className="grid gap-[8px] p-[32px] shadow-login border-[1px] border-grey12">
							<div className="flex w-max gap-[8px]">
								<div className="w-[44px] h-[44px] rounded-[50%] mx-auto flex items-center justify-center bg-blue text-white">
									<Image
										src="/images/icons/facebook-icon.svg"
										alt="facebook icon"
										width={20}
										height={20}
									/>
								</div>

								<div className="w-[44px] h-[44px] rounded-[50%] mx-auto flex items-center justify-center bg-blue text-white">
									<Image
										src="/images/icons/instagram-icon.svg"
										alt="facebook icon"
										width={20}
										height={20}
									/>
								</div>
								<div className="w-[44px] h-[44px] rounded-[50%] mx-auto flex items-center justify-center bg-blue text-white">
									<Image
										src="/images/icons/email-white-icon.svg"
										alt="facebook icon"
										width={20}
										height={20}
									/>
								</div>
							</div>
							<p className="text-[16px] leading-[18px] font-bold">
								Share the Supplement Club Revolution
							</p>
							<p className="text-[14px] leading-[16px] text-grey4">
								With your friends and family so you both get a £5 discount on
								your next cycle.
							</p>
						</div>
					</div>
				)}
			</div>

			<div className="mx-[-16px] md:mx-[0] my-[32px]">
				<div className="grid gap-[24px] p-[16px] md:p-[24px] bg-grey12">
					<h1 className="text-[24px] leading-[27px] font-hagerman text-blue mb-[8px]">
						Order Summary
					</h1>

					<div className="grid gap-[8px]">
						<p className="text-[20px] leading-[24px] font-inconsolata text-grey4">
							KANEKA CORPRATION
						</p>
						<div className="text-[24px] md:text-[40px] leading-[28px] md:leading-[48px] font-hagerman font-bold">
							Coenzyme Q10 Ubiquinol Kaneka TM
						</div>
						<div className="flex items-center gap-[8px]">
							<Image
								src="/images/icons/link-icon.svg"
								alt="security-card-icon"
								width={24}
								height={24}
							/>
							<p className="text-[14px] leading-[16px] text-grey6">100mg</p>
						</div>
					</div>

					<p className="text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata">
						FREE NEXT DAY DELIVERY
					</p>

					<OrderCard
						id={1}
						alt="supplement mockup"
						description="30 Capsules to align you with next drop"
						name="Sign Up Alignment Capsules"
						src="/images/supplement-mockup.svg"
					>
						<div className="text-[20px] font-bold text-black flex items-center gap-[5px] font-inconsolata">
							£-4.50{" "}
							<span className="text-[12px] leading-[16px] md:leading-[12px] text-grey1 font-inconsolata">
								(£0.25 / capsule)
							</span>
						</div>
					</OrderCard>

					<OrderCard
						id={2}
						alt="ubiquinol"
						description="Startup Package"
						name="Glass Bottle Container"
						src="/images/ubiquinol.svg"
					>
						<div className="text-[12px] leading-[100%] text-grey1 flex items-center gap-[5px]">
							<span className="text-[20px] leading-[20px] text-black font-bold font-inconsolata line-through">
								£18.00
							</span>
							FREE
						</div>
					</OrderCard>

					<Separator className="bg-grey13" />

					<p className="text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata">
						Quarterly Subscription
					</p>

					<OrderCard
						id={3}
						alt="supplement mockup"
						src="/images/supplement-mockup.svg"
						description="180 Capsules Every 3 months"
						name="Q1 Subscription"
						delivery="Free Delivery: January 1st 2025"
					>
						<div className="text-[20px] font-bold text-black flex items-center justify-end gap-[5px] font-inconsolata">
							£45.00{" "}
							<span className="text-[12px] leading-[12px] text-grey1 font-inconsolata">
								(£0.25 / capsule)
							</span>
						</div>
					</OrderCard>

					<Separator className="bg-grey13" />

					<div className="grid grid-cols-[84px_1fr]">
						<div>
							<p className="text-[32px] leading-[33px] font-inconsolata font-bold text-black mb-[2px]">
								Total
							</p>
							<p className="text-[14px] leading-[15px] text-grey4 font-inconsolata">
								266 Capsules
							</p>
						</div>

						<div className="grid justify-end">
							<div className="text-[32px] leading-[34px] font-bold font-inconsolata text-black mb-[2px] flex items-center">
								£60.00{" "}
								<span className="text-[12px] leading-[13px] text-grey1 ml-[2px]">
									(£0.25 / capsule)
								</span>
							</div>
							<div className="text-[24px] leading-[25px] font-inconsolata font-[400] text-grey4 mb-[16px]">
								RRP{" "}
								<span className="text-[24px] leading-[25px] font-inconsolata line-through font-bold">
									£144
								</span>{" "}
								<span className="text-[24px] leading-[25px] font-inconsolata font-bold text-blue">
									65% OFF
								</span>
							</div>
						</div>
					</div>
				</div>
				{step < 4 && (
					<div className="flex justify-center gap-[8px] items-center p-[24px]">
						<Image
							src="/images/icons/security-card-icon.svg"
							alt="security-card-icon"
							width={24}
							height={24}
						/>
						<p className=" text-blue">Secure Payment</p>
					</div>
				)}
				{step < 4 && (
					<div className="flex justify-center gap-[4px] items-center">
						<Image
							src="/images/master-card.svg"
							alt="master-card"
							width={40}
							height={28}
						/>
						<Image
							src="/images/visa-card.svg"
							alt="visa-card"
							width={40}
							height={28}
						/>
					</div>
				)}
				{step === 4 && (
					<div className="p-[32px] grid gap-[24px] shadow-login border-[1px] border-grey12 mt-[21px]">
						<p className="text-[24px] leading-[27px] font-hagerman">
							Delivery Address
						</p>
						<Separator className="bg-grey13" />
						<div className="grid gap-[16px]">
							<p className="text-[16px] leading-[18px] text-grey4">
								Maxwell Beard
							</p>
							<p className="text-[16px] leading-[18px] text-grey4">
								8 Alpha Street
							</p>
							<p className="text-[16px] leading-[18px] text-grey4">
								London
								<br />
								SE154NX United
								<br />
								Kingdom
							</p>
							<p className="text-[16px] leading-[18px] text-grey4">
								07872076691
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
