"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@/contexts/UserContext";
import UserLoggedIn from "./UserLoggedIn";
import UserLoggedOut from "./UserLoggedOut";

interface MobileNavigationProps {
  className?: string;
}

export default function MobileNavigation({ className }: MobileNavigationProps) {
  const context = useUser();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          className={`flex lg:hidden hover:cursor-pointer ${className || ""}`}
          src="/images/bars.svg"
          alt="Bars icon"
          width={16}
          height={16}
        />
      </DialogTrigger>
      <DialogContent
        align={"top"}
        className="w-[calc(100%-32px)] grid gap-[32px] p-[16px] bg-blue text-white z-[1500]"
      >
        <DialogHeader>
          <DialogTitle className="text-[32px] leading-[36px] text-left flex justify-between items-center">
            Supplement Club
            <DialogClose asChild>
              <Image
                src="/images/icons/close-icon.svg"
                alt="Close icon"
                width={24}
                height={24}
                className="cursor-pointer !text-white"
              />
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-[24px] mt-[20px]">
          <DialogClose asChild>
            <Link href="/products">Products</Link>
          </DialogClose>
          <DialogClose asChild>
            <Link href="/labs">Labs</Link>
          </DialogClose>
          {context?.user && (
            <DialogClose asChild>
              <Link href="/dashboard">Dashboard</Link>
            </DialogClose>
          )}
        </div>
        <DialogFooter className="grid gap-[16px]">
          {!context?.user && <UserLoggedOut />}
          {context?.user && (
            <Link href="/dashboard">
              <UserLoggedIn user={context?.user} />
            </Link>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
