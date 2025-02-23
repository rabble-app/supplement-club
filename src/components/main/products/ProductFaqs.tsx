import Image from "next/image";

import { Separator } from "@radix-ui/react-separator";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { mapTagToValue } from "@/utils/helpers";
import type { IHealthCategories } from "@/utils/models/api/IHealthCategories";

export default function ProductFaqs({
	healthCategories,
}: Readonly<{ healthCategories?: IHealthCategories[] }>) {
	return (
		healthCategories?.length && (
			<div>
				{healthCategories?.map((faq) => (
					<Accordion key={faq.category} type="single" collapsible>
						<Separator className="bg-black h-[1px]" />
						<AccordionItem value="products">
							<AccordionTrigger>
								<div className="grid gap-[16px] grid-cols-[32px_1fr] items-center text-[20px] font-inconsolata font-bold text-black">
									<Image
										src={mapTagToValue(faq.category)}
										alt={faq.category}
										width={32}
										height={32}
									/>{" "}
									{faq.category}
								</div>
							</AccordionTrigger>
							<AccordionContent>
								<div className="mt-[-8px]">
									<p className="text-[20px] leading-[30px] font-bold font-inconsolata mb-[8px]">
										{faq.category}
									</p>
									<div className="text-[16px] leading-[24px] font-helvetica mb-[16px]">
										{faq.whyItMatters}
									</div>

									<div className="grid gap-[8px]">
										<div className="text-[16px] leading-[24px] font-helvetica font-bold italic">
											Benefits:
										</div>
										{faq.benefits && (
											<ul className="list-disc list-inside">
												{faq.benefits.map((option) => (
													<li
														className="pl-[10px] text-[16px] font-helvetica"
														key={option}
													>
														{option}
													</li>
												))}
											</ul>
										)}
									</div>
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				))}
			</div>
		)
	);
}
