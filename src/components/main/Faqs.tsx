import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

import type { IFaqQuestionModel } from "@/utils/models/IFaqQuestionModel";
import { Separator } from "@radix-ui/react-separator";

const faqs = [
	{
		id: 1,
		question: "How does Supplement Club work?",
		answer:
			"We orchestrate quarterly drops from the world's leading supplement manufacturers at a fraction of the cost. By ordering in sync, you save up to 72% off retail prices. When you sign up, we send you a alignment package to align you with the next quarterly drop. As you and others share referral invites to the team, prices drop even further.",
	},
	{
		id: 2,
		question: "Why is it so cheap?",
		answer:
			"Supplement Club saves you money in two key ways. First, traditional supplement brands spend heavily on advertising, inflating their prices. Instead, we rely on referrals, paying you for successful invites and passing those savings on. Second, we synchronize team orders into quarterly drops, cutting out costly middlemen and transferring the savings directly to you.",
	},
	{
		id: 3,
		question: "How do I know it's good quality?",
		answer:
			"We provide full transparency on where every supplement is sourced and why we selected that laboratory. You'll have access to detailed information about the lab's reputation and product quality. No need to trust our branding—trust the science and the transparency.",
	},
	{
		id: 4,
		question: "What happens if I miss a drop?",
		answer:
			"No problem. We'll send you a alignment package via Next Day Delivery with enough capsules to align you with the next drop, so you can still benefit from synchronized ordering.",
	},
	{
		id: 5,
		question: "What happens if I run out between drops?",
		answer:
			"We keep extra stock on hand to ensure you're never left waiting. You can order top-up capsules with Next Day Delivery at any time. These are priced at a 25% premium to the drop price due to the higher costs of this service.",
	},
	{
		id: 6,
		question: "When do you charge for a quarterly drop?",
		answer:
			"We charge for the next drop shortly after the most recent one. For example, after the January 1st drop, we'll process payments for the April 1st drop. This helps us lock in the best pricing and pass maximum savings on to you.",
	},
	{
		id: 7,
		question: "Can I cancel at any point?",
		answer:
			"Yes, you can cancel or skip a quarter anytime. If a payment has already been made, the cancellation will apply to the following drop. For example, canceling on February 1st means you'll still receive the April 1st drop. You can manage this easily in your account settings.",
	},
] as IFaqQuestionModel[];

export default function Faqs() {
	return (
		<div className="grid lg:grid-cols-[294px_1fr] items-start pb-[80px] lg:pb-[100px]">
			<p className="text-[32px] lg:text-[55px] leading-[36px] lg:leading-[58px] text-black3 lg:mb-[0] font-hagerman">
				FAQs
			</p>
			<div>
				{faqs.map((faq) => (
					<Accordion key={faq.id} type="single" collapsible>
						<AccordionItem value="item-2">
							<AccordionTrigger>{faq.question}</AccordionTrigger>
							<AccordionContent>{faq.answer}</AccordionContent>
						</AccordionItem>
						<Separator className="border-b h-[1px]" />
					</Accordion>
				))}
			</div>
		</div>
	);
}
