"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { Loader2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";

import {
  Form,
  FormDescription,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/react-hook-form/form";
import useProfile from "@/lib/useProfile";

interface ProfileFormProps {
  userId?: string; // Make userId optional
  pushURL?: string; // Make the pushURL prop optional
}

const ProfileForm: React.FC<ProfileFormProps> = ({ userId, pushURL }) => {
  const { form, isSubmitting, removeLink, onSubmit, goBack } = useProfile(
    userId || "",
    pushURL || ""
  );

  const { fields, append } = useFieldArray({
    name: "weblinks",
    control: form.control,
  });

  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div>ID: {userId ? userId : "No user"}</div>
      </section>

      {userId && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <header className="fixed left-0 top-0 z-40 h-16 w-full border-b bg-background">
              <nav className="grid w-full auto-cols-fr grid-cols-3 px-2">
                <div className="flex h-16 w-full items-center justify-start">
                  <Button size="lg" variant="secondary" onClick={goBack}>
                    Go Back
                  </Button>
                </div>
                <div className="flex h-16 w-full items-center justify-center">
                  <h1 className="text-md mb-2 font-bold">Add Socials</h1>
                </div>
                <div className=" flex h-16 w-full items-center justify-end pr-1">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Profile"
                    )}
                  </Button>
                </div>
              </nav>
            </header>

            <section className="space-y-8">
              <FormField
                control={form.control}
                name="socials.instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your Instagram handle.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socials.twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your Twitter handle.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
          </form>
        </Form>
      )}
    </>
  );
};

export default ProfileForm;
