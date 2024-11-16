import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { IFaqQuestionModel } from "@/utils/models/IFaqQuestionModel";

import GoalCardComponent from '@/components/cards/GoalCard';
import LaboratoryCard from '@/components/cards/LaboratoryCard';
import ILaboratoryCardModel from "@/utils/models/ILaboratoryCardModel";
import { IGoalCardModel } from "@/utils/models/IGoalCardModel";

export default function Labs() {

    const faqs = [
        {
            id: 1,
            question: 'What is Supplement Club?',
            answer: 'AG1 is a daily Foundational Nutrition supplement that supports your health holistically. It’s a science-driven blend of vitamins, good bacteria, and whole food sourced nutrients that lay the foundation for daily performance',
        },
        {
            id: 2,
            question: 'How and when do I drink my AG1?',
            answer: '',
        },
        {
            id: 3,
            question: 'Do I need to drink AG1 every day?',
            answer: '',
        },
        {
            id: 4,
            question: 'Can I take more than one scoop a day?',
            answer: '',
        },
        {
            id: 5,
            question: 'Is AG1 organic?',
            answer: '',
        },
        {
            id: 6,
            question: 'Do I get anything for recommending AG1?',
            answer: '',
        }
    ] as IFaqQuestionModel[];

    const laboratories = [
        {
            id: 1,
            logo: "/images/labs/balchem.svg",
            altLogo: "Balchem logo",
            title: "Balchem Corporation",
            country: "USA",
            description: "Balchem is known for creating some of the highest-quality chelated minerals in the market, designed to optimize nutrient absorption. Balchem’s proprietary chelation technology binds essential minerals like zinc, copper, and magnesium to amino acids, significantly enhancing bioavailability and supporting various biological functions with superior efficiency.",
        },
        {
            id: 2,
            logo: "/images/labs/astraReal.svg",
            altLogo: "AstraReal logo",
            title: "AstaReal Corporation",
            country: "USA",
            description: "AstaReal is a leading global producer of natural astaxanthin, known for its high quality and extensive research backing. Their proprietary cultivation process uses Haematococcus pluvialis microalgae grown in fully enclosed, controlled environments to ensure optimal purity and stability.",

        },
        {
            id: 3,
            logo: "/images/labs/kapeka.svg",
            altLogo: "Kapeka logo",
            title: "Kapeka Corporation",
            country: "JAPAN",
            description: "Kaneka Corporation is a global leader in the development and production of high-performance materials, chemicals, and health products. Founded in Japan in 1949, the company has expanded into diverse industries, including pharmaceuticals, food products, and synthetic fibers. Kaneka is known for its focus on research and development, creating products that support better health, sustainability, and innovative solutions in various fields.",

        },
        {
            id: 4,
            logo: "/images/labs/astraReal.svg",
            altLogo: "AstraReal logo",
            title: "AstaReal Corporation",
            country: "USA",
            description: "AstaReal is a leading global producer of natural astaxanthin, known for its high quality and extensive research backing. Their proprietary cultivation process uses Haematococcus pluvialis microalgae grown in fully enclosed, controlled environments to ensure optimal purity and stability.",

        },
        {
            id: 5,
            logo: "/images/labs/kapeka.svg",
            altLogo: "Kapeka logo",
            title: "Kapeka Corporation",
            country: "JAPAN",
            description: "Kaneka Corporation is a global leader in the development and production of high-performance materials, chemicals, and health products. Founded in Japan in 1949, the company has expanded into diverse industries, including pharmaceuticals, food products, and synthetic fibers. Kaneka is known for its focus on research and development, creating products that support better health, sustainability, and innovative solutions in various fields.",
        }
    ] as ILaboratoryCardModel[];

    const goalCards = [
        {
            id: 1,
            icon: "/icons/bed-icon.svg", altIcon: "Bed icon", title: "Sleep", image: "/images/labs/bed.svg", altImage: "Bed image", description: "Optimize your sleep patterns."
        },
        {
            id: 2,
            icon: "/icons/brain-icon.svg", altIcon: "Brain icon", title: "Cognitive Funtion", image: "/images/labs/brain.svg", altImage: "Brain image", description: "Enhance your brain’s performance and connectivity."
        },
        {
            id: 3,
            icon: "/icons/health-icon.svg", altIcon: "Health icon", title: "Foundational Health", image: "/images/labs/health.svg", altImage: "Health image", description: "Promoting healthy, natural deep sleep day to day."
        },
        {
            id: 4,
            icon: "/icons/athlete-icon.svg", altIcon: "Athlete icon", title: "Athletic Performance", image: "/images/labs/athlete.svg", altImage: "Athlete image", description: "Increase your health tissue, muscle, and energy."
        },
        {
            id: 5,
            icon: "/icons/lightning-icon.svg", altIcon: "Lightning icon", title: "Hormone Support", image: "/images/labs/lightning.svg", altImage: "Lightning image", description: "Boost your mood, libido, and vitality."
        }
    ] as IGoalCardModel[];

    return (
        <div className="container-width md:pt-[57px] bg-grey11 md:bg-transparent">

            <div className="grid pt-[32px] md:pt-[0] md:grid-cols-[480px_1fr] gap-[40px] md:gap-x-[52px]">
                <div className="flex flex-col justify-between order-1 gap-[32px]">
                    <div>
                        <h1 className="text-[32px] md:text-[56px] leading-[38px] md:leading-[67px] font-[700] text-black4 pb-[32px] md:pb-[16px]">Take Control of Your Supplement Choices with Full Transparency</h1>
                        <p className="text-grey6">Know exactly where your ingredients come from—trust the science, not brand marketing.</p>
                    </div>
                    <p className="font-[700] text-blue underline">Make informed decisions about your supplements. Get access to the highest-quality ingredients—without the markups.</p>
                </div>

                <div className="grid order-2 mb-[98px] md:mb-[0]">
                    <div className="bg-yellow p-[8px] text-[14px] leading-[28px] text-black h-[44px]">POWER AND AFFORDABILITY IN NUMBERS</div>
                    <div className="grid grid-cols-2 gap-[37px] mt-[19px] md:mt-[8px]">
                        <div className="text-[60px] md:text-[89px] leading-[68px] md:leading-[95px] text-black grid gap-[10px] md:gap-[8px]">
                            100%
                            <p className="leading-[28px] font-[700] text-black">Traceability</p>
                        </div>
                        <div className="text-[60px] md:text-[89px] leading-[68px] md:leading-[95px] text-black grid gap-[10px] md:gap-[8px]">
                            43%
                            <p className="leading-[28px] font-[700] text-black">Cheaper on Average</p>
                        </div>
                    </div>

                    <div className="text-grey7 whitespace-pre-line mt-[32px] md:mt-[40px]">
                        At Supplement Club, we source ingredients directly from the world’s leading laboratories, ensuring the highest purity and potency. Without middlemen or unnecessary markups, every product is third-party tested for quality and effectiveness.
                        <br /><br />Unlike many brands that dilute their formulas with cheaper ingredients and offer vague labels, we provide clear, transparent sourcing. You’ll know exactly how much of each active ingredient you’re getting and why it works—no fillers, no hidden formulas.
                        <br /><br />We partner with laboratories focused on ingredient integrity and clinical efficacy, so you can make informed decisions based
                        on science rather than marketing. Our supplements deliver only what’s needed, at a fraction of the cost.
                    </div>
                </div>

            </div>

            <div className="grid md:grid-cols-[1fr_335px] md:mt-[120px]">
                <div>
                    <p className="text-[24px] md:text-[56px] leading-[28px] md:leading-[67px] font-[700] text-black">Meet the Laboratories</p>
                    <div className="md:max-w-[550px] text-[14px] md:text-[20px] leading-[21px] md:leading-[30px] text-grey6">Supplement industry is plagued by subpar ingredients that don’t work. Know where your ingredients are coming from.</div>
                </div>

            </div>

            <Carousel className="w-full mt-[100px] md:mt-[24px]">
                <CarouselPrevious className="absolute left-[16px] md:left-[calc(100%-160px)] top-[-55px] md:top-[-40px] h-[52px] w-[64px] rounded-[0] text-blue border-blue" />
                <CarouselNext className="absolute right-[calc(100%-160px)] md:right-0 top-[-55px] md:top-[-40px] h-[52px] w-[64px] rounded-[0] text-blue border-blue" />

                <CarouselContent className="-ml-1">
                    {laboratories.map((laboratory) => (
                        <CarouselItem key={laboratory.id} className="p-[0] md:pr-[0] md:pl-[16px] md:basis-1/2 lg:basis-1/3">
                            <LaboratoryCard {...laboratory} />
                        </CarouselItem>
                    ))}
                </CarouselContent>

            </Carousel>


            <div className="grid md:grid-cols-3 md:gap-x-[16px] gap-y-[54px] mt-[80px] md:mt-[140px]">
                <div className="flex flex-col gap-[10px]">
                    <p className="text-[32px] leading-[36px] font-[700] text-black">Shop by Goal</p>
                    <p className="text-grey6">Know exactly where your ingredients come from—trust the science, not brand marketing.</p>
                </div>

                {goalCards.map((card) => <GoalCardComponent key={card.id} {...card} />)}

            </div>

            <div className="grid gap-[16px] md:gap-[0] md:grid-cols-2 md:mt-[140px] md:py-[64px] mt-[80px]">
                <div>
                    <div className="text-[24px] leading-[24px] font-[700] flex items-center justify-center bg-blue text-white h-[60px] rounded-t-[8px] md:rounded-tr-[0] md:rounded-tl-[8px] border-b-[1px] border-solid border-white">Supplement Club</div>
                    <div className='flex gap-[3px] flex items-center bg-blue text-white h-[60px] leading-[16px] py-[12px] px-[18px] md:p-[18px] border-b-[1px] border-solid border-white'>
                        <Image
                            src="/icons/user-profile-group-icon.svg"
                            className="mb-auto"
                            alt="User profile group icon"
                            width={24}
                            height={24}
                        />Our offering is so valuable Customers join us Through Word of Mouth</div>
                    <div className='flex gap-[3px] flex items-center bg-blue text-white h-[60px] leading-[17px] p-[18px] border-b-[1px] border-solid border-white'>
                        <Image
                            src="/icons/globe-icon.svg"
                            className="mb-auto"
                            alt="Global icon"
                            width={24}
                            height={24}
                        />Traceable from world leading labs </div>
                    <div className='flex gap-[3px] flex items-center bg-blue text-white h-[60px] leading-[17px] p-[18px] rounded-b-[8px] md:rounded-bl-[8px] md:rounded-br-[0]'>
                        <Image
                            src="/icons/delivery-icon.svg"
                            className="mb-auto"
                            alt="Delivery icon"
                            width={24}
                            height={24}
                        />Shipped Direct From Source</div>
                </div>
                <div>
                    <div className='text-[24px] leading-[24px] font-[700] flex items-center justify-center bg-yellow text-black h-[60px] rounded-t-[8px] md:rounded-tr-[0] md:rounded-tr-[8px] border-b-[1px] border-solid border-white'>Brands</div>
                    <div className='flex gap-[3px] flex items-center bg-yellow text-black h-[60px] leading-[17px] p-[18px] border-b-[1px] border-solid border-white'>
                        <Image
                            src="/icons/currency-coin-icon.svg"
                            className="mb-auto"
                            alt="Currency coin icon"
                            width={24}
                            height={24}
                        />Forced to pay High Advertising Costs</div>
                    <div className='flex gap-[3px] flex items-center bg-yellow text-black h-[60px] leading-[16px] py-[12px] px-[18px] md:p-[18px] border-b-[1px] border-solid border-white'>
                        <Image
                            src="/icons/tag-icon.svg"
                            className="mb-auto"
                            alt="Tag icon"
                            width={24}
                            height={24}
                        />Opaque labeling of ingredients from unknown Sources</div>
                    <div className='flex gap-[3px] flex items-center bg-yellow text-black h-[60px] leading-[16px] py-[12px] px-[18px] md:p-[18px] rounded-b-[8px] md:rounded-br-[8px] md:rounded-bl-[0]'>
                        <Image
                            src="/icons/snowflake-icon.svg"
                            className="mb-auto"
                            alt="Snowflake icon"
                            width={24}
                            height={24}
                        />Stored in third party warehouses for long periods</div>
                </div>
            </div>

            <div className="layout-width mt-[80px] md:mt-[104px] relative md:bg-transparent md:mb-[75px] bg-blue w-auto">
                <div className="bg-blue mx-[-16px] md:ml-[0] px-[16px] md:px-[32px] pt-[40px] pb-[76px] md:mr-[270px] grid gap-[56px] md:gap-[112px]">
                    <div className="max-w-[500px] text-[32px] md:text-[50px] leading-[40px] md:leading-[58px] text-white order-1">Get started on Supplement club</div>
                    <div className="max-w-[500px] text-[24px] md:text-[32px] leading-[27px] md:leading-[36px] font-[700] text-white order-2">
                        <p className="pb-[8px] text-[20px] leading-[24px] text-grey9">
                            KANEKA CORPRATION
                        </p>
                        Coenzyme Q10 Ubiquinol Kaneka TM
                    </div>
                    <Image
                        className="block md:hidden order-3"
                        src="/images/homepage/supplement.svg"
                        alt="Supplement"
                        width={700}
                        height={541} />
                    <div className="max-w-[410px] order-4">
                        <p className="leading-[18px] text-grey9 mb-[2px]">Quarterly Subscription</p>

                        <div className="text-[40px] leading-[47px] font-[700] text-white mb-[2px] flex items-center">£45.00 <span className="leading-[18px] text-grey9 ml-[2px]">(£0.25 / capsule)</span></div>

                        <div className="text-[24px] leading-[27px] text-grey9 mb-[16px]">RRP <span className="text-[24px] leading-[27px] line-through font-[700]">£144</span> <span className="text-[24px] leading-[27px] font-[700] text-blue4">65% OFF</span></div>

                        <Button className="bg-white text-blue w-full font-bold mb-[14px]" asChild>
                            <Link href="/buy">Buy now</Link>
                        </Button>

                        <div className="flex justify-between">
                            <div className="flex gap-[6px] items-center text-[12px] leading-[20px] font-inter text-white">
                                <Image
                                    className="text-white"
                                    src="/icons/check-icon.svg"
                                    alt="Checkmark icon"
                                    width={16}
                                    height={16}
                                />
                                Update or cancel anytime</div>
                            <div className="flex gap-[6px] items-center text-[12px] leading-[20px] font-inter text-white">
                                <Image
                                    src="/icons/check-icon.svg"
                                    alt="Checkmark icon"
                                    width={16}
                                    height={16}
                                />
                                Next day delivery startup pack</div>
                        </div>
                    </div>
                </div>

                <Image
                    className="hidden md:block md:absolute md:top-[30px] md:right-[5px] order-3"
                    src="/images/homepage/supplement.svg"
                    alt="Supplement"
                    width={700}
                    height={541}
                />
            </div>

            <div className="grid lg:grid-cols-[294px_1fr] items-start py-[80px] lg:p-[0] lg:pb-[100px]">
                <p className="text-[32px] lg:text-[40px] leading-[36px] lg:leading-[55px] text-black3 lg:mb-[24px] lg:mb-[0]">FAQs</p>
                <div>
                    {faqs.map((faq) => (
                        <Accordion key={faq.id} type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ))}
                </div>
            </div>
        </div>
    );
}
