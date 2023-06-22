"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavSide from "@/components/NavSide";
// import Notifications from "@/components/Notifications"
import { Icons } from "@/components/icons";

export default function NavTop() {
  const [showNavbar, setShowNavbar] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const threshold = 100; // Adjust this value to control when the navbar appears

      setShowNavbar(scrolled > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const router = useRouter();
  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-20 h-16 w-full  bg-background  bg-gradient-to-b from-black/80 to-transparent transition-all duration-100
        ${
          showNavbar
            ? "border-b bg-background opacity-100"
            : "bg-transparent opacity-100 "
        }
      `}
    >
      <nav className="grid w-full auto-cols-fr grid-cols-3  px-2">
        <div className="flex h-16 w-full items-center justify-start">
          <Sheet>
            <SheetTrigger className="h-full px-2">
              <Icons.nav className="h-6 w-6 " />
            </SheetTrigger>
            <SheetContent position="left" size="default">
              {/* <SheetTitle></SheetTitle> */}
              {/* <SheetDescription>
              </SheetDescription> */}
              <NavSide />
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex h-16 w-full items-center  justify-center"></div>
        <div className=" flex h-16 w-full items-center justify-end pr-1">
          <Sheet>
            <SheetTrigger className="h-full px-2">
              <Icons.nav className="h-6 w-6 " />
            </SheetTrigger>
            <SheetContent position="left" size="default">
              {/* <SheetTitle></SheetTitle> */}
              {/* <SheetDescription>
              </SheetDescription> */}
              <NavSide />
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
