"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface MobileSummaryDrawerProps {
  children: React.ReactNode;
  totalPrice: number;
  isOpen: boolean;
  onToggle: () => void;
}

export default function MobileSummaryDrawer({
  children,
  totalPrice,
  isOpen,
  onToggle,
}: MobileSummaryDrawerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on mobile devices
    const checkMobile = () => {
      setIsVisible(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Trigger bar - fixed at bottom when closed, fixed at top when open */}
      <div
        className={`fixed left-0 right-0 z-50 h-[70px] bg-white border-t border-gray-200 flex items-center justify-between px-4 cursor-pointer transition-all duration-300 ${
          isOpen ? "top-0 border-b" : "bottom-0 border-t"
        }`}
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          <span
            className="font-hagerman font-normal text-[24px] leading-[100%] text-[#00038F]"
          >
            Order Summary
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!isOpen && (
            <span
              className="font-hagerman font-normal text-[24px] leading-[100%] text-[#00038F]"
            >
              ${totalPrice.toFixed(2)}
            </span>
          )}
          <Image
            src={`/images/icons/${isOpen ? "arrowDown" : "arrowUp"}.svg`}
            alt={isOpen ? "Close drawer" : "Open drawer"}
            width={20}
            height={20}
            className="transition-transform duration-300"
          />
        </div>
      </div>

      {/* Drawer overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={onToggle} />
      )}

      {/* Drawer content */}
      <div
        className={`fixed left-0 right-0 z-50 bg-white transition-transform duration-300 ease-in-out ${
          isOpen
            ? "top-[70px] bottom-0 transform translate-y-0"
            : "top-full transform translate-y-0"
        }`}
      >
        <div className="h-full overflow-y-auto pb-[28px]">
          {children}
        </div>
      </div>
    </>
  );
} 