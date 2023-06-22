import Link from "next/link";
import { ProfileHeaderProps } from "@/types/all";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "@/components/icons";

export default function ProfileHeader({
  displayName,
  username,
  avatarSrc,
}: ProfileHeaderProps) {
  return (
    <section className="relative z-10 grid grid-cols-[auto,1fr,auto] gap-4 overflow-visible rounded-t-[20px] px-2 ">
      <div className="avatar z-10 mt-[-50px] ">
        <div className="ring-offset-base-100  h-28 w-28 rounded-full ring ring-primary">
          <Link href="/profile">
            <Avatar className="h-28 w-28">
              <AvatarImage
                src={avatarSrc}
                alt="Colm Tuite"
                className="h-full w-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
      <Link href="/profile" className="bg-grey-800 flex ">
        <header className="bg-grey-800 ml-0 flex flex-col items-start justify-center">
          <h5 className="text-lg font-bold text-foreground">{displayName}</h5>
          <p className="text-xs text-muted-foreground">@{username}</p>
        </header>
      </Link>

      <div className="flex items-center justify-end ">
        <Dialog>
          <DialogTrigger className="h-full px-2">
            <Icons.dots className="h-6 w-6 text-muted-foreground" />
          </DialogTrigger>
          <DialogContent className="rounded-3xl border px-6 py-8">
            <nav>
              <Link
                href=""
                className="flex w-full items-center space-x-4 border-b p-4"
              >
                <Icons.tip className="h-6 w-6 text-brand-normal" />
                <div className="flex-1 space-y-1">
                  <p className="text-md font-medium leading-none">
                    Treat @username
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Show your love and support.
                  </p>
                </div>
              </Link>
              <Link
                href=""
                className="flex w-full items-center space-x-4 border-b p-4 opacity-50"
              >
                <Icons.message className="h-6 w-6 text-brand-normal" />
                <div className="flex-1 space-y-1">
                  <p className="text-md font-medium leading-none">
                    Send Private Message
                  </p>
                  <p className="text-xs text-muted-foreground">
                    *$0.50 / Message (Coming soon).
                  </p>
                </div>
              </Link>
              <Link
                href=""
                className="flex w-full items-center space-x-4 border-b p-4 opacity-50"
              >
                <Icons.phone className="h-6 w-6 text-brand-normal" />
                <div className="flex-1 space-y-1">
                  <p className="text-md font-medium leading-none">
                    Voice Call (Coming soon).
                  </p>
                  <p className="text-xs text-muted-foreground">
                    *$0.50 / 60 Seconds (Coming soon).
                  </p>
                </div>
              </Link>
              <Link
                href=""
                className="flex w-full items-center space-x-4  p-4 opacity-50"
              >
                <Icons.video className="h-6 w-6 text-brand-normal" />
                <div className="flex-1 space-y-1">
                  <p className="text-md font-medium leading-none">Video Call</p>
                  <p className="text-xs text-muted-foreground">
                    *$1.00 / 60 Seconds (Coming soon).
                  </p>
                </div>
              </Link>
            </nav>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
