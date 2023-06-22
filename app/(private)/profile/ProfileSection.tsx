"use client";
import useViewProfile from "@/lib/useViewProfile";
import ProfileLinks from "./view/ProfileLinks";
import ProfileSocials from "./view/ProfileSocials";
import ProfileHeader from "./view/ProfileHeader";

import Image from "next/image";
import Link from "next/link";
import { Icons } from "@/components/icons";
import placeholderImage from "@/public/placeholder.png";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Swiper from "@/components/Swiper";

export default function ProfileSection({ userId }: { userId: string }) {
  const { profileData } = useViewProfile(userId);
  if (!profileData) {
    return <div>Loading...</div>;
  }

  const { displayName, username, images, socials, weblinks } = profileData;
  const renderSwiper =
    images.length > 0 ? (
      <Swiper
        // shuffle={shuffle}
        images={images}
        imageClassName="object-fill w-full h-full aspect-[1/1]"
      />
    ) : (
      <Image
        height={640}
        width={640}
        src={placeholderImage}
        alt="Flames Placeholder"
        className="aspect-[1/1] h-full w-full object-fill opacity-20"
      />
    );
  return (
    <section className="  ">
      <article className="w-full border-2 border-slate-800 p-0 shadow-lg rounded-lg sm:w-96">
        <figure className="relative aspect-[1/1] w-full">{renderSwiper}</figure>

        <ProfileHeader
          username={username}
          displayName={displayName}
          avatarSrc={images[0]}
        />

        <div className="cta-buttons mt-4 flex items-center justify-between px-4">
          <div className="grid w-full gap-4">
            <Dialog>
              <DialogTrigger className="h-full w-full">
                {/* <Button>View My Links</Button> */}
                <Button
                  variant="default"
                  className="w-full rounded-xl"
                  size="lg"
                >
                  View My Links
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-3xl border px-6 py-8">
                <ProfileLinks weblinks={weblinks} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <ProfileSocials socials={socials} />
      </article>
    </section>
  );
}
