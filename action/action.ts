"use server";

import { prisma } from "@/lib/db";
import { deleteFileFromPinata, uploadFileToPinata } from "@/utils/uploadFile";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createPost(data: {
  title: string;
  content: string;
  file?: File;
}) {
  try {
    let imageUrl = "";

    if (data.file) {
      imageUrl = await uploadFileToPinata(data.file);
    }

    await prisma.post.create({
      data: {
        title: data.title,
        slug: data.title.replace(/\s+/g, "-").toLowerCase(),
        content: data.content,
        imageUrl: imageUrl,
        author: {
          connect: {
            email: "test@mail.com",
          },
        },
      },
    });

    revalidatePath("/posts");
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log("There is a unique constraint violation");
      }
    } else {
      console.error("Create post error:", error);
    }
  }
}

export async function editPost(formData: FormData, id: string) {
  await prisma.post.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string)
        .replace(/\s+/g, "-")
        .toLowerCase(),
      content: formData.get("content") as string,
    },
  });
}

export async function deletePost(id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
    select: { imageUrl: true },
  });

  if (post?.imageUrl) {
    const match = post.imageUrl.match(/\/ipfs\/([^/?]+)/);
    const ipfsHash = match?.[1];

    if (ipfsHash) {
      try {
        await deleteFileFromPinata(ipfsHash);
        console.log("✅ Image removed from Pinata");
      } catch (error) {
        console.error("❌ Failed to remove image from Pinata", error);
      }
    }
  }

  await prisma.post.delete({ where: { id } });

  revalidatePath("/posts");
}
