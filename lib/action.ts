"use server";

import { auth } from "@/auth";
import slugify from "slugify";

import { writeClient } from "@/sanity/lib/write-client";
import { parseServerActionResponse } from "@/lib/utils";

export const createIdea = async (state: any, form: FormData, pitch: string) => {
  const session = await auth();
  if (!session)
    parseServerActionResponse({ error: "Not signed in", status: "ERROR" });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const idea = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };

    const result = await writeClient.create({ _type: "startup", ...idea });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log("Error", error);

    return parseServerActionResponse({
      error: JSON.stringify(error) || "Unknown error",
      status: "ERROR",
    });
  }
};
