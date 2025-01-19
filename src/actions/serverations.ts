"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "./session";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const createBlogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  image: z.string().url().optional(),
  category: z.string().min(3, "Category must be at least 3 characters long"),
  authorId: z.string().min(1, "Author ID is required"),
});

export async function getBlogs(filter: string = "all") {
  const session = await getSession();

  if (!session) {
    return [];
  }

  const blogs = await prisma.blog.findMany({
    include: {
      author: true,
      likes: {
        where: {
          userId: session.user.id,
        },
      },
      bookmarks: {
        where: {
          userId: session.user.id,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    where:
      filter === "liked"
        ? {
            likes: {
              some: {
                userId: session.user.id,
              },
            },
          }
        : filter === "bookmarked"
        ? {
            bookmarks: {
              some: {
                userId: session.user.id,
              },
            },
          }
        : undefined,
  });

  return blogs;
}

export async function toggleLike(blogId: string) {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const existingLike = await prisma.like.findUnique({
    where: {
      blogId_userId: {
        blogId,
        userId: session.user.id,
      },
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: {
        blogId_userId: {
          blogId,
          userId: session.user.id,
        },
      },
    });
    revalidatePath("/");
    return false;
  }

  await prisma.like.create({
    data: {
      blogId,
      userId: session.user.id,
    },
  });
  revalidatePath("/");
  return true;
}
export async function toggleBookmark(blogId: string) {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const existingBookmark = await prisma.bookmark.findUnique({
    where: {
      blogId_userId: {
        blogId,
        userId: session.user.id,
      },
    },
  });

  if (existingBookmark) {
    await prisma.bookmark.delete({
      where: {
        blogId_userId: {
          blogId,
          userId: session.user.id,
        },
      },
    });
    revalidatePath("/");
    return false;
  }

  await prisma.bookmark.create({
    data: {
      blogId,
      userId: session.user.id,
    },
  });
  revalidatePath("/");
  return true;
}

// ... other imports remain the same

export async function createBlog(data: unknown) {
  // Validate the input data
  const parsedData = createBlogSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error(parsedData.error.errors.map((e) => e.message).join(", "));
  }

  const { title, description, image, category, authorId } = parsedData.data;

  try {
    const newBlog = await prisma.blog.create({
      data: {
        title,
        description,
        image: image || "/placeholder.jpg",
        category,
        author: {
          connect: { id: authorId },
        },
        createdAt: new Date(),
        readTime: "5 min",
      },
    });

    // Add revalidation here after successful creation
    revalidatePath("/");

    return newBlog;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw new Error("Failed to create the blog. Please try again later.");
  }
}
