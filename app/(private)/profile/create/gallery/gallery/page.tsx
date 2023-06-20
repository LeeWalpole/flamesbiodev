import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import GalleryForm from "./GalleryForm";

const GalleryPage = () => {
  return (
    <Card>
      <CardHeader className="space-y-1 ">
        <CardTitle className="text-2xl">Create Profile</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <GalleryForm
          formTitle="Gallery Old"
          userId="user_2RMk223nawkKwvwyAKJ6uloXqDx"
          pushURL="/profile/view/"
        />
      </CardContent>
    </Card>
  );
};

export default GalleryPage;
