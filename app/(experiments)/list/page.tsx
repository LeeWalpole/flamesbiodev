"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DialogDemo() {
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
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add Website</Button>
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
              <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
                Cancel
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div>
        <h2>Websites:</h2>
        <ul>
          {websites.map((website, index) => (
            <li key={index}>
              <span>{website.title}</span>
              <span>{website.url}</span>
              <button onClick={() => handleDeleteWebsite(index)}>X</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
