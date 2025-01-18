import { prisma } from "@/lib/prisma";

export async function createBlog(data: {
  title: string;
  description: string;
  authorId: string;
}) {
  try {
    const newBlog = await prisma.blog.create({
      data: {
        title: data.title,
        description: data.description,
        category: "General", // Default category
        author: { connect: { id: data.authorId } },
        createdAt: new Date(),
        readTime: "5 min", // Default read time
      },
    });

    return newBlog;
  } catch (error) {
    throw new Error("Failed to create the blog.");
  }
}
