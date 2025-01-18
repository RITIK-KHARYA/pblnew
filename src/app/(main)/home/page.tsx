"use client";

import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import {
  getBlogs,
  toggleLike,
  toggleBookmark,
} from "@/actions/serverations";

interface Blog {
  id: string;
  title: string;
  description: string;
  image: string | null; // Allow null for image
  category: string;
  createdAt: string;
  readTime: string;
  author: {
    name: string;
    id: string;
    avatar: string | null; // Allow null for avatar
  };
  likes: { userId: string }[];
  bookmarks: { userId: string }[];
}

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "liked" | "bookmarked">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const fetchedBlogs = await getBlogs(filter);

      // Transform the fetched blogs to match the Blog interface
      const transformedBlogs: Blog[] = fetchedBlogs.map((blog) => ({
        id: blog.id,
        title: blog.title,
        description: blog.description,
        image: blog.image || "/placeholder.jpg", // Provide a default image if null
        category: blog.category,
        createdAt: blog.createdAt.toISOString(),
        readTime: blog.readTime || "5 min",
        author: {
          name: blog.author.name,
          id: blog.author.id,
          avatar: blog.author.image || "/default-avatar.jpg", // Provide a default avatar if null
        },
        likes: blog.likes,
        bookmarks: blog.bookmarks,
      }));

      setArticles(transformedBlogs);
      setLoading(false);
    };
    fetchBlogs();
  }, [filter]);

  const handleLike = useCallback(async (blogId: string) => {
    const liked = await toggleLike(blogId);
    setArticles((prev) =>
      prev.map((article) =>
        article.id === blogId
          ? {
              ...article,
              likes: liked
                ? [...article.likes, { userId: "currentUser" }]
                : article.likes.filter((like) => like.userId !== "currentUser"),
            }
          : article
      )
    );
  }, []);

  const handleBookmark = useCallback(async (blogId: string) => {
    const bookmarked = await toggleBookmark(blogId);
    setArticles((prev) =>
      prev.map((article) =>
        article.id === blogId
          ? {
              ...article,
              bookmarks: bookmarked
                ? [...article.bookmarks, { userId: "currentUser" }]
                : article.bookmarks.filter(
                    (bookmark) => bookmark.userId !== "currentUser"
                  ),
            }
          : article
      )
    );
  }, []);

  const filteredArticles = articles.filter(
    (article) =>
      (!selectedCategory || article.category === selectedCategory) &&
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = ["Technology", "Health", "Food", "Sports"];

  return (
    <div className="min-h-screen bg-background">
      <Header onFilterChange={setFilter} onSearch={setSearchQuery} />

      <main className="container mx-auto px-4 py-8">
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-serif font-bold">
              Welcome to BlogVerse
            </h1>
            <p className="text-muted-foreground">
              Discover stories, thinking, and expertise from writers on any
              topic.
            </p>
          </div>

          <div className="flex justify-center gap-4 flex-wrap mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() =>
                  setSelectedCategory(
                    category === selectedCategory ? null : category
                  )
                }
                variant={category === selectedCategory ? "default" : "outline"}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  title={article.title}
                  excerpt={article.description.slice(0, 100) + "..."}
                  category={article.category}
                  readTime={article.readTime}
                  image={article.image}
                  author={{
                    name: article.author.name,
                    avatar: article.author.avatar,
                    date: new Date(article.createdAt).toLocaleDateString(),
                  }}
                  isLiked={article.likes.some(
                    (like) => like.userId === "currentUser"
                  )}
                  isBookmarked={article.bookmarks.some(
                    (bookmark) => bookmark.userId === "currentUser"
                  )}
                  onLike={() => handleLike(article.id)}
                  onBookmark={() => handleBookmark(article.id)}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
