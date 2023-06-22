import Link from "next/link";

import { Icons } from "@/components/icons";

interface ProfileLinksProps {
  weblinks: { linkUrl?: URL | any; linkText?: string }[];
}

export default function ProfileLinks({ weblinks }: ProfileLinksProps) {
  return (
    <nav id="weblinks">
      {weblinks.map((link, index) => (
        <Link
          key={index}
          href={link.linkUrl}
          target="_blank"
          className="flex w-full items-center space-x-4 border-b p-4"
        >
          {/* <Icons.tip className="h-6 w-6 text-brand-normal" /> */}
          <div className="flex-1 space-y-1">
            <p className="text-md font-medium leading-none">{link.linkText}</p>
            <p className="text-xs text-muted-foreground">{link.linkUrl}</p>
          </div>
        </Link>
      ))}
    </nav>
  );
}
