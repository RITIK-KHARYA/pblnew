"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleBookmark } from "@/actions/serverations";

interface BookmarkButtonProps {
  blogId: string;
  initialIsBookmarked: boolean;
}

export default function BookmarkButton({
  blogId,
  initialIsBookmarked,
}: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);

  const handleBookmark = async () => {
    try {
      await toggleBookmark(blogId);
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleBookmark}>
      <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-primary" : ""}`} />
    </Button>
  );
}
