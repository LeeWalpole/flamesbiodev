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
  DialogClose,
} from "@/components/ui/dialog";
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

  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [websites, setWebsites] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddWebsite = () => {
    const newWebsite = {
      url: linkUrl,
      title: linkText,
    };
    setWebsites([...websites, newWebsite]);
    setLinkUrl("");
    setLinkText("");
    setIsDialogOpen(false);
  };

  const handleCancelDialog = () => {
    setLinkUrl("");
    setLinkText("");
    setIsDialogOpen(false);
  };

  const handleDeleteWebsite = (index) => {
    const updatedWebsites = [...websites];
    updatedWebsites.splice(index, 1);
    setWebsites(updatedWebsites);
  };

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
                  <Button variant="" className="mb-4 w-full">
                    Add Website
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Website</DialogTitle>
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
                      <Button type="button" onClick={handleAddWebsite}>
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

              <div>
                <ul>
                  {websites.map((website, index) => (
                    <li
                      key={index}
                      className="relative mb-4 flex flex-col rounded border p-4"
                    >
                      <section className="relative flex flex-col gap-1 ">
                        <h5 className="text-white text-base">
                          {website.title}
                        </h5>
                        <p className="text-slate-500 text-xs">{website.url}</p>
                      </section>
                      <Button
                        className="text-slate-500 absolute right-0 "
                        type="button"
                        variant="danger"
                        onClick={() => handleDeleteWebsite(index)}
                      >
                        <Icons.close className="h-5 w-5" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </form>
        </Form>
      )}
    </>
  );
};

export default ProfileForm;
