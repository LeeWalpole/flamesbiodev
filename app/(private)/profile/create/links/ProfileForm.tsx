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
                      "Next"
                    )}
                  </Button>
                </div>
              </nav>
            </header>

            <section className="space-y-8">
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="relative mb-2 flex flex-row gap-4 rounded border p-4"
                >
                  <button
                    type="button"
                    className="absolute right-2 top-2  text-red-500"
                    onClick={() => removeLink(index)}
                  >
                    <Icons.close className="h-5 w-5" />
                  </button>

                  <FormField
                    control={form.control}
                    name={`weblinks.${index}.linkUrl`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`weblinks.${index}.linkText`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link Text</FormLabel>
                        <FormControl>
                          <Input placeholder="Link text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => removeLink(index)}
                  >
                    Remove Link
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                onClick={() => append({ linkUrl: "", linkText: "" })}
              >
                Add Link
              </Button>
            </section>
          </form>
        </Form>
      )}
    </>
  );
};

export default ProfileForm;
