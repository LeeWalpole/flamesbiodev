"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Loader2 } from "lucide-react";

import {
  Form,
  FormDescription,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/react-hook-form/form";
import useProfile from "@/lib/useCreateProfile";

interface ProfileFormProps {
  userId?: string | "" | null; // Make userId optional
  pushURL?: string; // Make the pushURL prop optional
  formTitle?: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  userId,
  pushURL,
  formTitle,
}) => {
  const { form, isSubmitting, removeLink, onSubmit, goBack } = useProfile(
    userId || "",
    pushURL || ""
  );

  return (
    <>
      {userId && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {isSubmitting && (
              <div className="fixed top-0 left-0 w-full h-full bg-background bg-opacity-50 flex flex-col justify-center items-center z-50">
                <p className="text-white m-4">Saving...</p>
                <Loader2 className="h-12 w-12 animate-spin opacity-25" />
              </div>
            )}
            <header className="fixed left-0 top-0 z-40 h-16 w-full border-b bg-background">
              <nav className="grid w-full auto-cols-fr grid-cols-3 px-2">
                <div className="flex h-16 w-full items-center justify-start">
                  <Button size="lg" variant="secondary" onClick={goBack}>
                    Go Back
                  </Button>
                </div>
                <div className="flex h-16 w-full items-center justify-center">
                  <h1 className="text-md mb-2 font-bold">{formTitle}</h1>
                </div>
                <div className=" flex h-16 w-full items-center justify-end pr-1">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Next 2"
                    )}
                  </Button>
                </div>
              </nav>
            </header>

            <section className="space-y-8">
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Display Name..." {...field} />
                    </FormControl>
                    <FormDescription>
                      {" "}
                      Display name is public and can be anything you want.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username / Handle</FormLabel>
                    <FormControl>
                      <Input placeholder="Pick username..." {...field} />
                    </FormControl>
                    <FormDescription>
                      {" "}
                      Your link will be flames.bio/
                      <span className="text-white">username</span>
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
