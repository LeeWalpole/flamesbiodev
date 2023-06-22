import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateProfilePage() {
  return (
    <div className="flex h-full justify-center items-center">
      <div className="text-center">
        <h1>Ready to Create a profile?</h1>
        <Button asChild className="mt-6">
          <Link href="/profile/create/details">Get started</Link>
        </Button>
      </div>
    </div>
  );
}
