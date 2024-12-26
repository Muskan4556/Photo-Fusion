"use server";

import cloudinary from "@/lib/cloudinary";

export default async function addOrRemoveFavoriteTag(
  publicId: string,
  tag: string
) {
  try {
    if (!publicId || !tag) {
      throw new Error("Please provide publicId and tag.");
    }
    const resource = await cloudinary.api.resource(publicId);
    const tagArray = resource.tags || [];
    const alreadyTaggedAsFavorite = tagArray.includes(tag);

    if (alreadyTaggedAsFavorite) {
      await cloudinary.uploader.remove_tag(tag, [publicId]);
      return { success: true, message: "Tag removed successfully" };
    }

    await cloudinary.uploader.add_tag(tag, [publicId]);
    return { success: true, message: "Tag added successfully" };
  } catch (err) {
    console.log(err);
  }
}
