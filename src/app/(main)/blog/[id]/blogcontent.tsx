"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import { useOptimistic } from "react";
import {
  Heart,
  Bookmark,
  MessageSquare,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleLike, toggleBookmark } from "@/actions/serverations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BlogContentProps {
  blog: {
    id: string;
    title: string;
    description: string;
    content: string;
    image: string;
    category: string;
    createdAt: string;
    readTime: string;
    author: {
      name: string;
      avatar?: string;
      bio?: string;
    };
    likes: { userId: string }[];
    bookmarks: { userId: string }[];
  };
}

export default function BlogContent({ blog }: BlogContentProps) {
  const { data: session } = useSession();
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    blog.likes,
    (state, newLike: { userId: string }) =>
      state.some((like) => like.userId === newLike.userId)
        ? state.filter((like) => like.userId !== newLike.userId)
        : [...state, newLike]
  );

  const [optimisticBookmarks, addOptimisticBookmark] = useOptimistic(
    blog.bookmarks,
    (state, newBookmark: { userId: string }) =>
      state.some((bookmark) => bookmark.userId === newBookmark.userId)
        ? state.filter((bookmark) => bookmark.userId !== newBookmark.userId)
        : [...state, newBookmark]
  );

  const handleLike = async () => {
    if (!session?.user?.id) return;

    addOptimisticLike({ userId: session.user.id });
    await toggleLike(blog.id);
  };

  const handleBookmark = async () => {
    if (!session?.user?.id) return;

    addOptimisticBookmark({ userId: session.user.id });
    await toggleBookmark(blog.id);
  };

  const isLiked = optimisticLikes.some(
    (like) => like.userId === session?.user?.id
  );

  const isBookmarked = optimisticBookmarks.some(
    (bookmark) => bookmark.userId === session?.user?.id
  );

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="space-y-8 mb-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
            {blog.title}
          </h1>
          <p className="text-xl text-muted-foreground">{blog.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
              <AvatarFallback>{blog.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{blog.author.name}</div>
              <div className="text-sm text-muted-foreground">
                {new Date(blog.createdAt).toLocaleDateString()} ·{" "}
                {blog.readTime} read
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLike}
              className={isLiked ? "text-red-500" : ""}
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBookmark}
              className={isBookmarked ? "text-blue-500" : ""}
            >
              <Bookmark className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {blog.image && (
        <figure className="my-8">
          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg">
            <Image
              src={blog.image || "/placeholder.svg"}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </figure>
      )}

      <div className="prose prose-lg dark:prose-invert max-w-none">
        {blog.content}
      </div>

      <footer className="mt-16 pt-8 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-2">
              {optimisticLikes.slice(0, 3).map((like, i) => (
                <Avatar key={i} className="border-2 border-background h-8 w-8">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              {optimisticLikes.length} likes
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={handleBookmark}>
              {isBookmarked ? "Saved" : "Save for later"}
            </Button>
            <Button>Share</Button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-4">About the author</h2>
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
              <AvatarFallback>{blog.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{blog.author.name}</h3>
              <p className="text-muted-foreground mt-1">
                {blog.author.bio || "Writer at BlogVerse"}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
}
