"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import { getBlogs, toggleLike, toggleBookmark } from "@/actions/serverations";
import { useSession } from "@/lib/auth-client";

export default function Index() {
  const { data: session } = useSession();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "liked" | "bookmarked">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      setIsLoading(true);
      try {
        const data = await getBlogs(filter);
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
      setIsLoading(false);
    }

    if (session) {
      fetchBlogs();
    }
  }, [filter, session]);

  const filteredBlogs = blogs.filter((blog) => {
    if (selectedCategory && blog.category !== selectedCategory) return false;
    if (!searchQuery) return true;

    const searchLower = searchQuery.toLowerCase();
    return (
      blog.title.toLowerCase().includes(searchLower) ||
      blog.description.toLowerCase().includes(searchLower) ||
      blog.category.toLowerCase().includes(searchLower) ||
      blog.author.name.toLowerCase().includes(searchLower)
    );
  });

  const handleLike = async (blogId: string) => {
    try {
      const isLiked = await toggleLike(blogId);
      setBlogs(
        blogs.map((blog) => {
          if (blog.id === blogId) {
            return {
              ...blog,
              likes: isLiked ? [{ userId: session?.user.id }] : [],
            };
          }
          return blog;
        })
      );
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  const handleBookmark = async (blogId: string) => {
    try {
      const isBookmarked = await toggleBookmark(blogId);
      setBlogs(
        blogs.map((blog) => {
          if (blog.id === blogId) {
            return {
              ...blog,
              bookmarks: isBookmarked ? [{ userId: session?.user.id }] : [],
            };
          }
          return blog;
        })
      );
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onFilterChange={setFilter}
        onSearch={(query: string) => setSearchQuery(query)}
      />

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

          <CategoryFilter
            categories={["Technology", "Health", "Food", "Sports"]}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-[400px] rounded-lg bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => (
                <ArticleCard
                  key={blog.id}
                  {...blog}
                  isLiked={blog.likes.length > 0}
                  isBookmarked={blog.bookmarks.length > 0}
                  onLike={() => handleLike(blog.id)}
                  onBookmark={() => handleBookmark(blog.id)}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}) {
  return (
    <div className="flex justify-center gap-4 flex-wrap mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() =>
            onSelectCategory(category === selectedCategory ? null : category)
          }
          className={`px-4 py-2 rounded-full transition-colors ${
            category === selectedCategory
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
