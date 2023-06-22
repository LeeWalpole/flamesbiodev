"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { db } from "@/lib/firebaseConfig";
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

type ProfileFormValues = z.infer<typeof FormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  username: "",
  displayName: "",
  socials: {
    instagram: "",
    twitter: "",
  },
  weblinks: [{ linkUrl: "", linkText: "" }],
};

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  displayName: z.string().min(2, {
    message: "Display Name Here",
  }),
  socials: z.object({
    instagram: z.string().min(2, {
      message: "instagram",
    }),
    twitter: z.string().min(2, {
      message: "twitter",
    }),
  }),
  weblinks: z
    .array(
      z.object({
        linkUrl: z.string().url({ message: "Please enter a valid URL." }),
        linkText: z.string(),
      })
    )
    .optional(),
});

interface ProfileFormProps {
  userId: string;
  pushURL: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ userId, pushURL }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const removeLink = (index: number) => {
    const updatedLinks = form.getValues("weblinks") as {
      linkUrl: string;
      linkText: string;
    }[];
    updatedLinks.splice(index, 1);
    form.setValue("weblinks", updatedLinks);
  };

  const { fields, append } = useFieldArray({
    name: "weblinks",
    control: form.control,
  });

  useEffect(() => {
    const getProfileData = async () => {
      try {
        if (userId) {
          const profileRef = doc(db, "profiles", userId);
          const profileSnapshot = await getDoc(profileRef);
          if (profileSnapshot.exists()) {
            const profileData = profileSnapshot.data();
            const { socials, weblinks, ...rest } = profileData;
            form.reset({ ...rest, socials, weblinks });
          }
        }
      } catch (error) {
        console.error("Error retrieving profile data:", error);
      }
    };

    getProfileData();
  }, [form, userId]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      if (userId) {
        setIsSubmitting(true);
        const profileRef = doc(db, "profiles", userId);
        const { socials, weblinks, ...rest } = data;
        await updateDoc(profileRef, { ...rest, socials, weblinks });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error updating profile data:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-24">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <header className="fixed left-0 top-0 z-40 h-16 w-full border-b bg-background">
              <nav className="grid w-full auto-cols-fr grid-cols-3 px-2">
                <div className="flex h-16 w-full items-center justify-start">
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={() => router.back()}
                  >
                    Go Back
                  </Button>
                </div>
                <div className="flex h-16 w-full items-center justify-center">
                  <h1 className="text-md mb-2 font-bold">Edit Profile</h1>
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              {fields.map((item, index) => (
                <div key={item.id}>
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

                  <Button type="button" onClick={() => removeLink(index)}>
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
      </section>
    </>
  );
};

export default ProfileForm;
