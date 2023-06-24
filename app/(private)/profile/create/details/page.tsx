"use client";
// CreateProfileDetailsPage.jsx
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
import { useAuth } from "@/lib/(auth)/useAuth";

export default function CreateProfileDetailsPage() {
  const formTitle = "Create Profile"; // This gets used at the top of the form header from child component <CreateProfileForm>
  const pushURL = "/profile/create/socials/"; // When the form is submitted successfully, users get directed here <useCreateProfileForm>

  const { form, onSubmit, isSaving } = useCreateProfileForm(pushURL);
  const { user } = useAuth();
  return (
    <section>
      <p>User and Doc ID = {user?.uid}</p>
      <CreateProfileForm
        form={form}
        formTitle={formTitle}
        onSubmit={onSubmit}
        isSaving={isSaving}
      >
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="Display Name" {...field} />
              </FormControl>
              <FormDescription>
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
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormDescription>
                Your link will be flames.bio/
                <span className="text-white text-bold">{field.value}</span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CreateProfileForm>
    </section>
  );
}
