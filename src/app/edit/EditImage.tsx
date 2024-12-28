"use client";

import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { CldImage } from "next-cloudinary";
import { useState } from "react";

type Props = {
  publicId: string;
};

export default function EditImage({ publicId }: Props) {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  return (
    <div>
      {/* <Separator className="my-8"/> */}
      <div className="mt-4 flex flex-row flex-wrap gap-4 whitespace-nowrap">
        <Button
          className="w-auto "
          variant={"outline"}
          onClick={() => setFilter("generative-fill")}
        >
          Apply Generative Fill
        </Button>
        <Button
          className="w-auto "
          variant={"outline"}
          onClick={() => setFilter("blur")}
        >
          Apply Blur
        </Button>
        <Button
          className="w-auto"
          variant={"outline"}
          onClick={() => setFilter("grayscale")}
        >
          Apply Grayscale
        </Button>

        {/* <Button
          className="w-[40%] md:w-auto"
          variant={"outline"}
          onClick={(value: string) => setFilter(search)}
        >
          Apply Re-color
        </Button> */}

        <Button
          className="w-auto"
          variant={"destructive"}
          onClick={() => setFilter("")}
        >
          Clear All
        </Button>
      </div>

      {/* <div className="mt-4 flex gap-4">
        <Input
          onChange={(e) => setSearch(e.target.value)}
          className="w-auto"
          placeholder="Object, color"
        ></Input>
        <Button variant={"outline"}>Apply</Button>
      </div> */}

      <div className="flex lg:flex-row flex-col lg:gap-8 md:gap-2 gap-2">
        <CldImage
          className="rounded-md mt-8"
          width="400"
          height="300"
          alt="Description of my image"
          src={publicId}
          sizes="100vw"
        />

        {filter === "generative-fill" && (
          <CldImage
            className="rounded-md md:mt-8 mt-4"
            width="400"
            height="300"
            alt="Description of my gen image"
            src={publicId}
            sizes="100vw"
            crop="pad" // Returns the given size with padding
            fillBackground
          />
        )}

        {filter === "blur" && (
          <CldImage
            className="rounded-md md:mt-8 mt-4"
            width="400"
            height="300"
            alt="Description of my gen image"
            src={publicId}
            sizes="100vw"
            blur="1200"
          />
        )}

        {filter === "grayscale" && (
          <CldImage
            className="rounded-md md:mt-8 mt-4"
            width="400"
            height="300"
            alt="Description of my gen image"
            src={publicId}
            sizes="100vw"
            grayscale
          />
        )}

        {filter === "re-color" && (
          <CldImage
            className="rounded-md md:mt-8 mt-4"
            width="400"
            height="300"
            alt="Description of my gen image"
            src={publicId}
            sizes="100vw"
            recolor={["tree", "yellow"]}
          />
        )}
      </div>
    </div>
  );
}
