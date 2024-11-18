import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { IFaqQuestionModel } from "@/utils/models/IFaqQuestionModel";

const faqs = [
	{
		id: 1,
		question: "What is Supplement Club?",
		answer:
			"AG1 is a daily Foundational Nutrition supplement that supports your health holistically. It’s a science-driven blend of vitamins, good bacteria, and whole food sourced nutrients that lay the foundation for daily performance",
	},
	{
		id: 2,
		question: "How and when do I drink my AG1?",
		answer: "",
	},
	{
		id: 3,
		question: "Do I need to drink AG1 every day?",
		answer: "",
	},
	{
		id: 4,
		question: "Can I take more than one scoop a day?",
		answer: "",
	},
	{
		id: 5,
		question: "Is AG1 organic?",
		answer: "",
	},
	{
		id: 6,
		question: "Do I get anything for recommending AG1?",
		answer: "",
	},
] as IFaqQuestionModel[];

export default function Faqs() {
	return (
		<div className="grid lg:grid-cols-[294px_1fr] items-start pb-[80px] lg:pb-[100px]">
			<p className="text-[32px] lg:text-[40px] leading-[36px] lg:leading-[55px] text-black3 lg:mb-[0]">
				FAQs
			</p>
			<div>
				{faqs.map((faq) => (
					<Accordion key={faq.id} type="single" collapsible>
						<AccordionItem value="item-2">
							<AccordionTrigger>{faq.question}</AccordionTrigger>
							<AccordionContent>{faq.answer}</AccordionContent>
						</AccordionItem>
					</Accordion>
				))}
			</div>
		</div>
	);
}
