"use client";
// CreateProfileSocialsPage.jsx
import { useAuth } from "@/lib/(auth)/useAuth";
import { useCreateProfileForm } from "@/app/(private)/profile/create/useCreateProfileForm";
import CreateProfileForm from "@/app/(private)/profile/create/CreateProfileForm";
import {
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function CreateProfileSocialsPage() {
  const { user } = useAuth();

  const userId = user!.uid;
  const formTitle = "Create Profile";
  const pushURL = "/profile/create/links/";

  const { form, onSubmit, isSaving } = useCreateProfileForm(pushURL);

  return (
    <section>
      <CreateProfileForm
        form={form}
        formTitle={formTitle}
        onSubmit={onSubmit}
        isSaving={isSaving}
      >
        <section className="space-y-8">
          <FormField
            control={form.control}
            name="socials.instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <div className="relative">
                    <p className="absolute text-sm text-slate-600 flex justify-center left-0 w-8 align-middle h-full p-0 items-center">
                      @
                    </p>
                    <Input
                      placeholder="Your Instagram username..."
                      className="pl-8"
                      {...field}
                    />
                  </div>
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
                  <div className="relative">
                    <p className="absolute text-sm text-slate-600 flex justify-center left-0 w-8 align-middle h-full p-0 items-center">
                      @
                    </p>
                    <Input
                      placeholder="Your Twitter handle..."
                      className="pl-8"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>This is your Twitter handle.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
      </CreateProfileForm>
    </section>
  );
}
