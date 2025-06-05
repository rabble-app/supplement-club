/** @format */

import Image from "next/image";

const ReferralSection = ({ percentage, remainingDays }: { percentage: "0" | "30" | "60" | "90", remainingDays: number }) => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center justify-center bg-blue h-[180px] rounded-sm shadow-4 px-4">
        <h3 className="text-[16px] leading-[28px] font-hagerman uppercase text-center text-white">
          DAYS REMAINING
        </h3>
        <h1 className="text-[48px] leading-[48px] font-inconsolata text-white text-center py-1">
          {remainingDays}
        </h1>
        <p className="text-[12px] font-helvetica text-white text-center leading-tight">
          You have 30 days from sign up to maximise your free membership months
        </p>
      </div>

      <div className="flex flex-col items-center  bg-white h-[180px] rounded-sm shadow-3 p-4 border border-grey35">
        <h2 className="text-black text-base font-hagerman uppercase mb-2">
          NEXT MILESTONE
        </h2>
        <p className="text-[12px] font-helvetica leading-tight text-grey15 text-center h-[42px]">
          Get 6 months membership free for each successful referral you make in
          your first 30 days.
        </p>

        <div className="mt-[18px] w-full px-4">
          <div className="flex gap-10 relative justify-between w-full">
            <div className={`w-[26px] h-[26px] rounded-full  border z-20  ${percentage >= "0" ? "border-blue bg-white" : "bg-grey26"} relative`}>
              <Image
                src={percentage >= "0" ? "/images/membership-card.svg" : "/images/icons/lock-icon.svg"}
                alt="Check icon"
                width={12}
                height={8}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
              <p className="text-[12px] text-blue font-hagerman uppercase absolute w-[45px] top-7 leading-tight">
                6 MONTHS FREE
              </p>
            </div>
            <div
              className={`w-[${percentage}%] mx-auto h-2.5 bg-blue absolute top-1/2 left-1  -translate-y-1/2 z-[15]`}
            ></div>
            <div
              className={`w-[98%] mx-auto h-2.5 bg-grey26 absolute top-1/2 -translate-y-1/2 z-10`}
            ></div>
            <div className={`w-[26px] h-[26px] rounded-full  border z-20  ${percentage >= "30" ? "border-blue bg-white" : "border-grey26 bg-grey26"} relative`}>
              <Image
                src={percentage >= "30" ? "/images/membership-card.svg" : "/images/icons/lock-icon.svg"}
                alt="Check icon"
                width={12}
                height={8}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
              <p className={`text-[12px] ${percentage >= "30" ? "text-blue" : "text-grey15"} font-hagerman uppercase absolute w-[45px] top-7 leading-tight`}>
                12 MONTHS FREE
              </p>
            </div>
            <div className={`w-[26px] h-[26px] rounded-full  border z-20  ${percentage >= "60" ? "border-blue bg-white" : "border-grey26 bg-grey26"} relative`}>
              <Image
                src={percentage >= "60" ? "/images/membership-card.svg" : "/images/icons/lock-icon.svg"}
                alt="Check icon"
                width={12}
                height={8}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
              <p className={`text-[12px] ${percentage >= "60" ? "text-blue" : "text-grey15"} font-hagerman uppercase absolute w-[45px] top-7 leading-tight`}>
                18 MONTHS FREE
              </p>
            </div>
            <div className={`w-[26px] h-[26px] rounded-full  border z-20  ${percentage >= "90" ? "border-blue bg-white" : "border-grey26 bg-grey26"} relative `}>
              <Image
                    src={percentage >= "90" ? "/images/membership-card.svg" : "/images/icons/lock-icon.svg"}
                alt="Check icon"
                width={12}
                height={8}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 right-10"
              />
              <p className={`text-[12px] ${percentage >= "90" ? "text-blue" : "text-grey15"} font-hagerman uppercase absolute w-[50px] top-7 leading-tight`}>
                24 MONTHS FREE
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralSection;
