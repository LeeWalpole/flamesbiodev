"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Form,
  FormDescription,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useProfile from "@/lib/old/useCreateProfileOld";

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

  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [Weblinks, setWeblinks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddWeblink = () => {
    const newWeblink = {
      linkUrl: linkUrl,
      linkText: linkText,
    };
    append(newWeblink);
    setLinkUrl("");
    setLinkText("");
    setIsDialogOpen(false);
  };

  const handleCancelDialog = () => {
    setLinkUrl("");
    setLinkText("");
    setIsDialogOpen(false);
  };

  const handleDeleteWeblink = (index: number) => {
    const updatedWeblinks = [...Weblinks];
    updatedWeblinks.splice(index, 1);
    setWeblinks(updatedWeblinks);
  };

  return (
    <>
      {userId && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Add an overlay if submitting */}
            {isSubmitting && (
              <div className="fixed top-0 left-0 w-full h-full bg-background bg-opacity-50 flex flex-col justify-center items-center z-50">
                <p className="text-white m-4">Saving Links</p>
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
                      "Next"
                    )}
                  </Button>
                </div>
              </nav>
            </header>
            <section className="space-y-8">
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
                      <Button
                        variant="outline"
                        onClick={() => setIsDialogOpen(true)}
                      >
                        Cancel
                      </Button>
                    </DialogTrigger>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <section className="space-y-8">
                {fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="relative mb-2 flex flex-row gap-4 rounded border p-4"
                  >
                    <aside className="absolute right-2 top-2">
                      <button
                        className="text-red-500"
                        type="button"
                        onClick={() => removeLink(index)}
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
                ))}
              </section>
            </section>
          </form>
        </Form>
      )}
    </>
  );
};

export default ProfileForm;
