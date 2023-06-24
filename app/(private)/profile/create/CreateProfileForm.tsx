"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import { ReactNode } from "react";

interface CreateProfileFormProps {
  form: UseFormReturn<any>; // replace "any" with your form's data type
  formTitle: string;
  onSubmit: () => Promise<void>; // or any other type you're using for handlers
  isSaving: boolean;
  children: ReactNode;
}

export default function CreateProfileForm({
  form,
  formTitle,
  onSubmit,
  isSaving,
  children,
}: CreateProfileFormProps) {
  const router = useRouter();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <header className="fixed left-0 top-0 z-40 h-16 w-full border-b bg-background">
          <nav className="grid w-full auto-cols-fr grid-cols-3 px-4">
            {/* Back button */}
            <div className="flex h-16 w-full items-center justify-start">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => router.back()}
              >
                Go back
              </Button>
            </div>
            {/* Form title */}
            <div className="flex h-16 w-full items-center justify-center">
              <h1 className="text-md mb-2 font-bold">{formTitle}</h1>
            </div>
            {/* Submit button */}
            <div className="flex h-16 w-full items-center justify-end pr-1">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Next"}
              </Button>
            </div>
          </nav>
        </header>
        {children}
      </form>
    </Form>
  );
}
