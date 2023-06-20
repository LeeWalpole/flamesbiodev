"use client";
import { Button } from "@/components/ui/button";

import { Icons } from "@/components/icons";
import { Loader2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const { form, isSubmitting, removeLink, onSubmit, goBack, isLoading } =
    useProfile(userId || "", pushURL || "");

  const { fields, append } = useFieldArray({
    name: "weblinks",
    control: form.control,
  });

  if (isLoading) {
    // Display loading state if Firebase values are being loaded
    return <p>Loading...</p>;
  }

  return (
    <>
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
                <div className="flex h-16 w-full items-center justify-end pr-1">
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
              {fields.map(
                (item, index) =>
                  item.linkUrl !== "" &&
                  item.linkText !== "" && (
                    <div
                      key={item.id}
                      className="relative mb-2 flex flex-row gap-4 rounded border p-4"
                    >
                      <aside className="absolute right-2 top-2">
                        <Button
                          className="text-slate-500"
                          type="button"
                          variant="danger"
                          onClick={() => removeLink(index)}
                        >
                          <Icons.close className="h-5 w-5" />
                        </Button>
                      </aside>
                      <div className="grid grid-cols-2 w-full items-stretch gap-4">
                        <FormField
                          control={form.control}
                          name={`weblinks.${index}.linkUrl`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Link URL</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="https://example.com"
                                  {...field}
                                />
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
                      </div>
                    </div>
                  )
              )}
            </section>
          </form>
        </Form>
      )}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Link</DialogTitle>
            <DialogDescription>Share your web links</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor={`weblinks.${index}.linkUrl`}
                className="text-right"
              >
                Full URL
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor={`weblinks.${index}.linkText`}
                className="text-right"
              >
                Name
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>

          <DialogFooter>
            <Button type="button">Cancel</Button>
            <Button
              type="button"
              onClick={() => {
                append({ linkUrl: "", linkText: "" });
                form.trigger("weblinks"); // Trigger validation for the added fields
              }}
            >
              Save Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileForm;
