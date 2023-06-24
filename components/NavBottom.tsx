"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";

const NavBottom = () => {
  const pathname = usePathname();
  // Check if user is not null

  return (
    <>
      <footer className="fixed bottom-0 left-0 z-40 h-16 w-full border-t bg-background">
        <nav className="grid-cols-auto m-auto grid h-full w-96 grid-flow-col items-stretch justify-stretch bg-background align-middle ">
          <Link href="/discover" className="flex items-center justify-center ">
            {pathname === "/discover" ? (
              <Icons.search className="h-6 w-6" />
            ) : (
              <Icons.search className="h-6 w-6" />
            )}
          </Link>

          <Link href="/" className="flex h-full items-center justify-center ">
            {/* <Icons.twitter className="h-5 w-5 fill-current" /> */}
            <Image
              className="h-8 w-auto "
              src="/flames-icon.webp"
              height={100}
              width={100}
              alt="Flames"
            />
          </Link>

          <Link href="/profile" className="flex items-center justify-center ">
            {pathname === "/profile" ? (
              <Icons.profileSolid className="h-6 w-6 " />
            ) : (
              <Icons.profile className="h-6 w-6" />
            )}
          </Link>
        </nav>
      </footer>
    </>
  );
};

export default NavBottom;
