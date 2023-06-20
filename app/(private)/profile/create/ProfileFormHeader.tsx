import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { ProfileFormValues } from "./types";

type FormHeaderProps = {
  formTitle: string;
  isSubmitting: boolean;
};

const FormHeader = ({ formTitle, isSubmitting }: FormHeaderProps) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
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
  );
};

export default FormHeader;
