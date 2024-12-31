"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBox() {
  const [tagName, setTagName] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.replace(`/gallery?search=${encodeURIComponent(tagName)}`);
    router.refresh();
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          placeholder="Tag name. eg. people"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          className="w-auto mt-1"
        />
        <Button type="submit" variant={"outline"} className="mt-1">
          Search
        </Button>
      </form>
    </div>
  );
}
