"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ArticleCardProps {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string | null;
  };
  image?: string;
  category: string;
  likes: { userId: string }[];
  bookmarks: { userId: string }[];
  isLiked: boolean;
  isBookmarked: boolean;
  onLike: () => void;
  onBookmark: () => void;
}

export default function ArticleCard({
  id,
  title,
  description,
  author,
  image,
  category,
  isLiked,
  isBookmarked,
  onLike,
  onBookmark,
}: ArticleCardProps) {
  console.log(id)
  return (
    <Card className="overflow-hidden">
      <Link href={`/blog/${id}`}>
        <div className="aspect-[16/9] relative">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground mb-2">{category}</div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground line-clamp-2">{description}</p>
          <div className="text-sm mt-4">{author.name}</div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.preventDefault();
            onLike();
          }}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-primary" : ""}`} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.preventDefault();
            onBookmark();
          }}
        >
          <Bookmark
            className={`w-5 h-5 ${isBookmarked ? "fill-primary" : ""}`}
          />
        </Button>
      </CardFooter>
    </Card>
  );
}
