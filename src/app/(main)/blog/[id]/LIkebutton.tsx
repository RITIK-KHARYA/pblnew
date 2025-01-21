"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleLike } from "@/actions/serverations";

interface LikeButtonProps {
  blogId: string;
  initialIsLiked: boolean;
}

export default function LikeButton({
  blogId,
  initialIsLiked,
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const handleLike = async () => {
    try {
      await toggleLike(blogId);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleLike}>
      <Heart className={`w-5 h-5 ${isLiked ? "fill-primary" : ""}`} />
    </Button>
  );
}
