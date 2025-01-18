import { Heart, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string | null;
  author: {
    name: string;
    avatar: string | null;
    date: string;
  };
  isLiked: boolean;
  isBookmarked: boolean;
  onLike: () => void;
  onBookmark: () => void;
  featured?: boolean;
}

export default function ArticleCard({
  title,
  excerpt,
  category,
  readTime,
  image,
  author,
  isLiked,
  isBookmarked,
  onLike,
  onBookmark,
  featured = false,
}: ArticleCardProps) {
  return (
    <Card className={`overflow-hidden ${featured ? "border-primary" : ""}`}>
      <div className="relative aspect-video">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          layout="fill"
          objectFit="cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 text-xs rounded">
          {category}
        </div>
      </div>
      <CardHeader>
        <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={author.avatar || "/default-avatar.jpg"}
              alt={author.name}
            />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{author.name}</p>
            <p className="text-xs text-muted-foreground">
              {author.date} · {readTime} min read
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onLike}
            aria-label={isLiked ? "Unlike" : "Like"}
          >
            <Heart
              className={`h-4 w-4 ${
                isLiked ? "fill-current text-red-500" : ""
              }`}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onBookmark}
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark"}
          >
            <Bookmark
              className={`h-4 w-4 ${
                isBookmarked ? "fill-current text-primary" : ""
              }`}
            />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
