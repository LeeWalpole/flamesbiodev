import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { ProfileSocialsProps } from "@/types/all";

export default function ProfileSocials({ socials }: ProfileSocialsProps) {
  return (
    <section className="cta-buttons flex items-center justify-between p-4">
      <div className="grid-cols-auto grid w-full grid-flow-col gap-4">
        {socials.instagram && (
          <Button variant="secondary" asChild>
            <Link href={socials.instagram}>
              <Icons.instagram className="h-6 w-6" />
            </Link>
          </Button>
        )}

        {socials.twitch && (
          <Button variant="secondary" asChild>
            <Link href={socials.twitch}>
              <Icons.twitch className="h-6 w-6" />
            </Link>
          </Button>
        )}

        {socials.twitter && (
          <Button variant="secondary" asChild>
            <Link href={socials.twitter}>
              <Icons.twitter className="h-6 w-6" />
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
}
