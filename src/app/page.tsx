import Image from "next/image";
import { Button } from "@/components/ui/button"
import Link from 'next/link'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import HomeCardComponent from '@/components/cards/HomeCard'
import ProductCardComponent from '@/components/cards/ProductCard'
import { IFaqQuestionModel } from "@/utils/models/IFaqQuestionModel";
import { IProductModel } from "@/utils/models/IProductModel";
import { IHomeCardModel } from "@/utils/models/IHomeCardModel";

const faqs = [
  {
    question: 'What is Supplement Club?',
    answer: 'AG1 is a daily Foundational Nutrition supplement that supports your health holistically. It’s a science-driven blend of vitamins, good bacteria, and whole food sourced nutrients that lay the foundation for daily performance',
  },
  {
    question: 'How and when do I drink my AG1?',
    answer: '',
  },
  {
    question: 'Do I need to drink AG1 every day?',
    answer: '',
  },
  {
    question: 'Can I take more than one scoop a day?',
    answer: '',
  },
  {
    question: 'Is AG1 organic?',
    answer: '',
  },
  {
    question: 'Do I get anything for recommending AG1?',
    answer: '',
  }
] as IFaqQuestionModel[]

const products = [
  {
    src: "/images/homepage/supplement.svg",
    altSrc: "Supplement",
    corporation: "Balchem Corporation",
    name: "Magnesium Bisglycinate TRAACS",
    description: "Supports Muscle Function & Relaxation",
    subscribers: 1034,
    rrpPrice: 76.36,
    rrpDiscount: 45,
    price: 42.00
  },
  {
    src: "/images/homepage/supplement.svg",
    altSrc: "Supplement",
    corporation: "Balchem Corporation",
    name: "Magnesium Bisglycinate TRAACS",
    description: "Supports Muscle Function & Relaxation",
    subscribers: 678,
    rrpPrice: 76.36,
    rrpDiscount: 45,
    price: 42.00
  },
  {
    src: "/images/homepage/supplement.svg",
    altSrc: "Supplement",
    corporation: "Balchem Corporation",
    name: "Magnesium Bisglycinate TRAACS",
    description: "Supports Muscle Function & Relaxation",
    subscribers: 0,
    rrpPrice: 63.71,
    rrpDiscount: 38,
    price: 39.50,
    isComming: true
  }
] as IProductModel[]

const homeCards = [
  {
    src: "/images/homepage/truck.svg",
    alt: "Truck",
    title: "Get Started Today",
    subtitle: "Next Day Delivery",
    description: "Choose the supplements you want today, and we'll ship you a 'sync package' the next day. This ensures you have enough supply to last until the next quarterly drop."
  },
  {
    src: "/images/homepage/people.svg",
    alt: "People",
    title: "There’s Savings in Numbers",
    subtitle: "The More People Join the Cheaper it Gets",
    description: "Your sync package will align you with the rest of the country, so you’re always part of the nationwide quarterly drop. This means you’re never out of sync with the bulk ordering cycle."
  },
  {
    src: "/images/homepage/labs.svg",
    alt: "Labs",
    title: "Straight from the Source",
    subtitle: "Don’t Trust Expensive Branding. Trust Renowned Labs",
    description: "Each quarter, we combine individual orders and send them collectively to the worlds most prominent lab for that product. Your individual order is shipped to your door.."
  }
] as IHomeCardModel[]

export default function Home() {
  return (
    <div className="min-h-screen container-width grid lg:gap-y-[120px] bg-grey11 lg:bg-transparent">

      <div className="relative">
        <div className="flex flex-col lg:justify-center items-start absolute top-0 pt-[72px] md:pt-[131px] px-[16px] lg:px-[0] lg:left-[68px] lg:w-[600px] h-full">
          <div className="text-[32px] lg:text-[34px] leading-[48px] lg:leading-[51px] font-[700] font-helvetica text-blue mb-[23px]">Pharmaceutical Grade Supplements at a Fraction of the Cost</div>
          <p className="text-[16px] lg:text-[24px] leading-[24px] lg:leading-[36px] text-blue mb-[58px] max-w-[461px]">Join buying teams for 100% pure, premium ingredients direct from world-leading laboratories and get it delivered direct to you up to 73% cheaper.</p>
          <Image
            className="my-auto lg:ml-[175px] h-[160px]"
            src="/images/homepage/buy.svg"
            alt="Buy product"
            width={160}
            height={160}
          />
        </div>
        <Image
          className="hidden lg:block h-[726px]"
          src="/images/homepage/main.svg"
          alt="Vercel logomark"
          width={2000}
          height={726}
        />

        <Image
          className="lg:hidden"
          src="/images/homepage/supplement-mobile.svg"
          alt="Buy product"
          width={1600}
          height={760}
        />
      </div>

      <div className="grid lg:grid-cols-[632px_1fr] gap-x-[73px] bg-white">

        <div className="grid gap-y-[56px] justify-end my-[80px] lg:my-[0] px-[16px] lg:px-[0]">
          <div className="text-[40px] lg:text-[96px] leading-[46px] lg:leading-[110px] font-[700] font-helvetica text-blue">How does it work?</div>
          {homeCards.map((card, index) => (
            <HomeCardComponent key={index} model={card} />
          ))}
        </div>

        <div className="h-[700px] lg:h-[833px] bg-white">
          <div className="h-[350px] lg:h-[380px] bg-grey11 lg:bg-transparent"></div>
          <div className="bg-blue h-[350px] lg:h-[453px] relative">
            <Image
              className="absolute bottom-[70px] left-[-35px] h-[520px] lg:h-[700px]"
              src="/images/homepage/supplement.svg"
              alt="Supplement"
              width={1500}
              height={520}
            />
            <div className="px-[16px] py-[24px] lg:px-[32px] w-full grid items-end h-full lg:h-[453px]">
              <div>
                <div className="mb-[40px] text-white">
                  <div className="text-[32px] leading-[36px] font-[700] flex justify-between mb-[7px]">Ubiquinol<span className="text-[32px] leading-[36px] font-[700]">£45.00</span></div>
                  <div className="text-[20px] leading-[23px] flex justify-between text-grey2">BY KANEKA CORPRATION<p className="text-[20px] leading-[23px] text-blue4"><span className="text-[20px] leading-[23px] text-grey2 line-through">£144</span> 65% OFF</p></div>
                </div>
                <Button font={"bold"} className="bg-white text-blue w-full" asChild>
                  <Link href="/buy">Buy now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="lg:container-width grid lg:grid-cols-2 gap-x-[42px] py-[23px] px-[16px] lg:pt-[32px] lg:pb-[32px] lg:px-[0] bg-white">
        <div className="relative">
          <Image
            className="max-h-[716px]"
            src="/images/homepage/pillow.svg"
            alt="Checkmark icon"
            width={632}
            height={716}
          />
          <div className="absolute left-[0] top-[0] w-full h-full grid grid-cols-2 gap-[24px] items-end px-[17px] lg:px-[32px] py-[22px] lg:py-[42px]">
            <div className="flex flex-col gap-[4px] lg:gap-[22px]">
              <p className="text-center text-[20px] leading-[27px] font-[700] text-black">££££</p>
              <div className="flex flex-col">
                <div className="lg:py-[30px] h-[177px] lg:h-[326px] text-center bg-yellow text-[16px] lg:text-[20px] leading-[18px] lg:leading-[23px] font-[700] flex justify-center items-center w-full px-[10px] lg:px-[30px] text-center">Typical Advertising Spend</div>
                <div className="px-[5px] py-[25px] lg:py-[30px] text-center lg:h-[82px] bg-yello1 text-[15px] lg:text-[20px] leading-[17px] lg:leading-[23px] font-[700] flex justify-center items-center w-full">The Middlemen’s Cut</div>
                <div className="px-[5px] py-[14px] lg:py-[30px] text-center bg-white text-[12px] lg:text-[20px] leading-[14px] lg:leading-[23px] font-[700] flex justify-center items-center w-full">The Cost of Ingredients</div>
              </div>
              <p className="text-center text-[12px] lg:text-[18px] leading-[14px] lg:leading-[20px] font-[700] text-white">What brands charge</p>
            </div>
            <div className="flex flex-col gap-[4px] lg:gap-[22px]">
              <p className="text-center text-[20px] leading-[27px] font-[700] text-black">£</p>
              <Button className="bg-blue text-white w-full font-bold h-[58px] lg:h-[107px] text-[18px] lg:text-[24px] leading-[18px] lg:leading-[27px]" asChild>
                <Link href="/about">Club Price</Link>
              </Button>
              <p className="text-center text-[12px] lg:text-[18px] leading-[14px] lg:leading-[20px] font-[700] text-white">What we charge</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <p className="text-[24px] lg:text-[40px] leading-[32px] lg:leading-[58px] font-[700] text-blue pt-[32px] lg:pt-[18px] pb-[16px]">Pharmaceutical grade Ingredients aren’t expensive. Marketing them is.</p>
            <p className="text-[14px] leading-[26px] text-grey6">Before Supplement Club, you were forced to pay for bloated advertising costs and watered-down supplements. We cut out the advertising overheads and middlemen and send you 100% clinically effective, traceable ingredients.
              <br />
              <br />
              With Supplement Club, you get direct access to top labs in Japan, the US, and Europe. Our transparent model shows you exactly where your supplements come from—no more blindly trusting brands. You can research yourself and know you’re getting the best money can buy with 100% transparency.
              <br />
              <br />
              <br />
            </p>
            <p className="font-[700] mb-[32px] lg:mb-[18px]">Supplement Club Subscribers don't pay for:</p>
            <div className="grid grid-cols-2 gap-[32px] lg:gap-[0] lg:grid-cols-4 items-center mb-[48px] lg:mb-[0px]">

              <div className="flex flex-col gap-[8px]">
                <Image
                  src="/icons/buy-cashier-discount-icon.svg"
                  alt="Cashier discount icon"
                  width={32}
                  height={32}
                />
                <p className="leading-[16px]">Middlemen</p>
              </div>

              <div className="flex flex-col gap-[8px]">
                <Image
                  src="/icons/buy-discount-rack-icon.svg"
                  alt="Discountrack icon"
                  width={32}
                  height={32}
                />
                <p className="leading-[16px]">Expensive Advertising</p>
              </div>

              <div className="flex flex-col gap-[8px]">
                <Image
                  src="/icons/buy-discount-shop-icon.svg"
                  alt="Checkmark icon"
                  width={32}
                  height={32}
                />
                <p className="leading-[16px]">Retailer Markups</p>
              </div>

              <div className="flex flex-col gap-[8px]">
                <Image
                  src="/icons/buy-discount-shop-2-icon.svg"
                  alt="Checkmark icon"
                  width={32}
                  height={32}
                />
                <p className="leading-[16px]">Overpackging</p>
              </div>
            </div>
          </div>

          <Button className="bg-blue text-white w-full font-bold h-[54px]" asChild>
            <Link href="/about">Learn More About Supplement Club</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-y-[32px] lg:gap-y-[50px] pt-[48px] px-[16px] lg:p-[0]">
        <div className="flex justify-between items-center">
          <div className="grid gap-y-[16px]">
            <p className="text-[32px] leading-[36px] font-[700] text-black">Products</p>
            <p className="bg-white leading-[18px] text-grey1 py-[4px] px-[10px]">Next Drop: <span className="font-[700] ">January 1st 2025</span></p>
          </div>

          <Link href="/products" className="underline text-[18px] leading-[20px] text-black">View All</Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-[16px]">
          {products.map((product, index) => (
            <ProductCardComponent key={index} product={product} />
          ))}
        </div>
      </div>

      <div className="w-full grid grid-cols-2 lg:grid-cols-7 mx-[16px] py-[80px] lg:p-[0]">

        <div className="p-[12px] border-grey10 border-[1px] grid gap-[4px]">
          <Image
            src="/icons/heart-pulse-icon.svg"
            alt="Checkmark icon"
            width={40}
            height={40}
          />
          <p className="text-[18px] leading-[24px] text-black">Heart Health</p>

        </div>
        <div className="p-[12px] border-grey10 border-[1px] grid gap-[4px]">
          <Image
            src="/icons/baby-icon.svg"
            alt="Baby icon"
            width={40}
            height={40}
          />
          <p className="text-[18px] leading-[24px]  text-black">Fertility</p>

        </div>
        <div className="p-[12px] border-grey10 border-[1px] grid gap-[4px]">
          <Image
            src="/icons/bed-icon.svg"
            alt="Bed icon"
            width={40}
            height={40}
          />
          <p className="text-[18px] leading-[24px] text-black">Sleep</p></div>

        <div className="p-[12px] border-grey10 border-[1px] grid gap-[4px]">
          <Image
            src="/icons/energy-icon.svg"
            alt="Energy icon"
            width={40}
            height={40}
          />
          <p className="text-[18px] leading-[24px] text-black">Energy</p></div>

        <div className="p-[12px] border-grey10 border-[1px] grid gap-[4px]"> <Image
          src="/icons/hourglass-icon.svg"
          alt="Hourglass icon"
          width={40}
          height={40}
        />
          <p className="text-[18px] leading-[24px] text-black">Healthy Aging</p></div>

        <div className="p-[12px] border-grey10 border-[1px] grid gap-[4px]"> <Image
          src="/icons/tree-icon.svg"
          alt="Tree icon"
          width={40}
          height={40}
        />
          <p className="text-[18px] leading-[24px] text-black">Longevity</p></div>

        <div className="p-[12px] border-grey10 border-[1px] grid gap-[4px]"> <Image
          src="/icons/dumbell-icon.svg"
          alt="Dumbell icon"
          width={40}
          height={40}
        />
          <p className="text-[18px] leading-[24px] text-black">Weight Training</p></div>

        <div className="p-[12px] border-grey10 border-[1px] grid gap-[4px]"> <Image
          src="/icons/athletes-icon.svg"
          alt="Athletes icon"
          width={40}
          height={40}
        />
          <p className="text-[18px] leading-[24px] text-black">Athletes</p></div>

        <div className="p-[12px] border-grey10 border-[1px] grid gap-[4px]"> <Image
          src="/icons/shield-icon.svg"
          alt="Shield icon"
          width={40}
          height={40}
        />
          <p className="text-[18px] leading-[24px] text-black">Immunity</p></div>

        <div className="p-[12px] border-grey10 border-[1px] grid gap-[4px]"> <Image
          src="/icons/brain-icon.svg"
          alt="Brain icon"
          width={40}
          height={40}
        />
          <p className="text-[18px] leading-[24px] text-black">Cognitive Function</p></div>

        <div className="p-[12px] border-grey10 border-[1px] grid gap-[4px]"> <Image
          src="/icons/bones-icon.svg"
          alt="Bones icon"
          width={40}
          height={40}
        />
          <p className="text-[18px] leading-[24px] text-black">Joint Health</p></div>

        <div className="p-[12px] border-grey10 border-[1px] grid gap-[4px]"> <Image
          src="/icons/intensine-icon.svg"
          alt="Intensine icon"
          width={40}
          height={40}
        />
          <p className="text-[18px] leading-[24px] text-black">Gut Health</p></div>

        <div className="p-[12px] border-grey10 border-[1px] grid gap-[4px]"> <Image
          src="/icons/water-drop-icon.svg"
          alt="Water drop icon"
          width={40}
          height={40}
        />
          <p className="text-[18px] leading-[24px] text-black">Skin Health</p></div>

        <div className="p-[12px] border-grey10 border-[1px] grid gap-[4px]"> <Image
          src="/icons/flower-icon.svg"
          alt="Flower icon"
          width={40}
          height={40}
        />
          <p className="text-[18px] leading-[24px] text-black">Mood & Anxiety</p></div>
      </div>

      <div className="lg:container-width relative bg-blue w-auto lg:bg-transparent">
        <div className="bg-blue px-[16px] lg:px-[32px] pt-[40px] pb-[76px] lg:mr-[270px] grid gap-[56px] lg:gap-[112px]">
          <p className="max-w-[500px] text-[32px] lg:text-[50px] leading-[40px] lg:leading-[58px] text-white order-1">Get started on Supplement club</p>
          <div className="max-w-[500px] text-[24px] lg:text-[32px] leading-[27px] lg:leading-[36px] font-[700] text-white order-2">
            <p className="pb-[8px] text-[20px] leading-[24px] text-grey9">
              KANEKA CORPRATION
            </p>
            Coenzyme Q10 Ubiquinol Kaneka TM
          </div>
          <Image
            className="block lg:hidden order-3"
            src="/images/homepage/supplement.svg"
            alt="Supplement"
            width={700}
            height={541} />
          <div className="max-w-[410px] order-4">
            <p className="leading-[18px] text-grey9 mb-[2px]">Quarterly Subscription</p>

            <div className="text-[40px] leading-[46px] font-[700] text-white mb-[2px] flex items-center">£45.00 <span className="text-[16px] leading-[18px] text-grey9 ml-[2px]">(£0.25 / capsule)</span></div>

            <div className="text-[24px] leading-[27px] text-grey9 mb-[20px] lg:mb-[16px]">RRP <span className="text-[24px] leading-[27px] line-through font-[700]">£144</span> <span className="text-[24px] leading-[27px] font-[700] text-blue4">65% OFF</span></div>

            <Button className="bg-white leading-[18px] text-blue w-full font-bold mb-[14px]" asChild>
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
          className="hidden lg:block lg:absolute lg:top-[30px] lg:right-[5px] order-3"
          src="/images/homepage/supplement.svg"
          alt="Supplement"
          width={700}
          height={541}
        />
      </div>

      <div className="grid lg:grid-cols-[294px_1fr] items-start mx-[16px] py-[80px] lg:p-[0] lg:pb-[100px]">
        <p className="text-[32px] lg:text-[40px] leading-[36px] lg:leading-[55px] text-black3 lg:mb-[24px] lg:mb-[0]">FAQs</p>
        <div>
          {faqs.map((faq, index) => (
            <Accordion key={index} type="single" collapsible>
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
