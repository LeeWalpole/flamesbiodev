"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { Loader2 } from "lucide-react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useCreateProfileForm } from "@/app/(private)/profile/create/useCreateProfileForm";
import CreateProfileForm from "@/app/(private)/profile/create/CreateProfileForm";
import { Input } from "@/components/ui/input";

type LinkData = {
  linkUrl: string;
  linkText: string;
};

export default function CreateProfileLinksPage() {
  const formTitle: string = "Create Profile";
  const pushURL: string = "/profile/create/gallery/";

  const { form, onSubmit, isSaving } = useCreateProfileForm(pushURL);

  const {
    fields,
    append,
    remove,
  }: {
    fields: LinkData[];
    append: (data: LinkData) => void;
    remove: (index: number) => void;
  } = useFieldArray({
    name: "weblinks",
    control: form.control,
  });

  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleAddWeblink = () => {
    append({ linkUrl, linkText });
    setLinkUrl("");
    setLinkText("");
    setIsOpen(false); // Update isOpen state to close the dialog
  };

  const handleCancelDialog = () => {
    setLinkUrl("");
    setLinkText("");
    setIsOpen(false); // Update isOpen state to close the dialog
  };

  return (
    <section>
      <CreateProfileForm
        form={form}
        formTitle={formTitle}
        onSubmit={onSubmit}
        isSaving={isSaving}
      >
        <section className="space-y-8">
          {fields.map((item: LinkData, index: number) => (
            <div
              key={item.linkText}
              className="relative mb-2 flex flex-row gap-4 rounded border p-4"
            >
              <aside className="absolute right-2 top-2">
                <button
                  className="text-red-500"
                  type="button"
                  onClick={() => remove(index)}
                >
                  <Icons.close className="h-5 w-5" />
                </button>
              </aside>
              <div className="grid grid-cols-2 w-full items-stretch gap-4">
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
              </div>
            </div>
          ))}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mb-4 w-full">Add Weblink</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Weblink</DialogTitle>
                <DialogDescription>
                  Add some links you want to share...
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="linkUrl" className="text-right">
                    Link/URL
                  </Label>
                  <Input
                    id="linkUrl"
                    type="url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className="col-span-3"
                    placeholder="https://www.google.com"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="linkText" className="text-right">
                    Link Title
                  </Label>
                  <Input
                    id="linkText"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    className="col-span-3"
                    placeholder="Google"
                  />
                </div>
              </div>

              <DialogFooter>
                <DialogTrigger>
                  <Button
                    type="button"
                    disabled={!linkText || !linkUrl}
                    {...(!linkText || !linkUrl
                      ? {}
                      : { onClick: handleAddWeblink })}
                  >
                    Add Link
                  </Button>
                </DialogTrigger>
                <DialogTrigger>
                  <Button variant="outline" onClick={() => setIsOpen(true)}>
                    Cancel
                  </Button>
                </DialogTrigger>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>
      </CreateProfileForm>
    </section>
  );
}
