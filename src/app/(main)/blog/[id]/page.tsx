import Image from "next/image";
import { Bookmark, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getBlogById,
  toggleBookmark,
  toggleLike,
} from "@/actions/serverations";
import { getSession } from "@/actions/session";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LikeButton from "./LIkebutton";
import BookmarkButton from "./Bookmarkbutton";

interface BlogDetailProps {
  params: {
    id: string;
  };
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const blogId = (await params).id;
  const blog = await getBlogById(blogId);
  const session = await getSession();

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const isLiked = blog.likes.some((like) => like.userId === session?.user.id);
  const isBookmarked = blog.bookmarks.some(
    (bookmark) => bookmark.userId === session?.user.id
  );

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="space-y-8 mb-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
          {blog.title}
        </h1>

        <div className="flex items-center justify-between py-4 border-y">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={blog.author.image!} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{blog.author.name}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <span>{blog.readTime} read</span>
                <span>·</span>
                <time>{new Date(blog.createdAt).toLocaleDateString()}</time>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <LikeButton blogId={blog.id} initialIsLiked={isLiked} />
            <BookmarkButton
              blogId={blog.id}
              initialIsBookmarked={isBookmarked}
            />
          </div>
        </div>
      </header>

      {blog.image && (
        <div className="aspect-[3/2] relative mb-8">
          <Image
            src={blog.image || "/placeholder.svg"}
            alt="Blog cover image"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        <p>{blog.description}</p>
      </div>
    </article>
  );
}
