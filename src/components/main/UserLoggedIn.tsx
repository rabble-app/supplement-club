/** @format */

import { DialogClose } from "@radix-ui/react-dialog";

import Image from "next/image";
import { Button } from "../ui/button";

import { useUser } from "@/contexts/UserContext";
import type { IUserResponse } from "@/utils/models/api/response/IUserResponse";
import { useEffect, useState } from "react";

export default function UserLoggedIn({
  user,
}: Readonly<{ user?: IUserResponse }>) {
  const context = useUser();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (user?.firstName && user?.lastName) {
      setUserName(`${user?.firstName} ${user?.lastName?.slice(0, 1)}.`);
    }
  }, [user]);
  return (
    <>
      <div className="font-inconsolata font-bold text-[16px] text-center px-[24px]">
        {userName}.
      </div>
      <DialogClose asChild className=" w-[72px]">
        <Button
          onClick={() => {
            context?.logout();
            localStorage.removeItem("hasAlignmentPackage");
            localStorage.removeItem("storageQuantity");
            localStorage.removeItem("capsuleCount");
          }}
          className="p-[0] flex gap-[10px] text-[16px] leading-[16px] font-inconsolata"
        >
          <Image
            src="/images/logout.svg"
            alt="Logout icon"
            width={18}
            height={18}
          />
          Logout
        </Button>
      </DialogClose>
    </>
  );
}
