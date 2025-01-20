"use client";

import { useState, useEffect, useCallback } from "react";
import { useOptimistic } from "react";
import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import { getBlogs, toggleLike, toggleBookmark } from "@/actions/serverations";
import { useSession } from "@/lib/auth-client";

interface Blog {
  id: string;
  title: string;
  description: string;
  category: string;
  author: {
    name: string;
  };
  likes: { userId: string }[];
  bookmarks: { userId: string }[];
}

export default function Index() {
  const { data: session } = useSession();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "liked" | "bookmarked">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [optimisticBlogs, addOptimisticBlog] = useOptimistic(
    blogs,
    (state, updatedBlog: Blog) =>
      state.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
  );

  const fetchBlogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getBlogs(filter);
      setBlogs(data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
    setIsLoading(false);
  }, [filter]);

  useEffect(() => {
    if (session) {
      fetchBlogs();
    }
  }, [fetchBlogs, session]);

  const filteredBlogs = optimisticBlogs.filter((blog) => {
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
    const blogToUpdate = blogs.find((blog) => blog.id === blogId);
    if (!blogToUpdate) return;

    const isCurrentlyLiked = blogToUpdate.likes.some(
      (like) => like.userId === session?.user.id
    );
    const optimisticBlog = {
      ...blogToUpdate,
      likes: isCurrentlyLiked
        ? blogToUpdate.likes.filter((like) => like.userId !== session?.user.id)
        : [...blogToUpdate.likes, { userId: session?.user.id }],
    };

    addOptimisticBlog(optimisticBlog);

    try {
      await toggleLike(blogId);
      fetchBlogs(); // Refresh the blogs to get the updated state from the server
    } catch (error) {
      console.error("Failed to toggle like:", error);
      fetchBlogs(); // Refresh the blogs to revert to the correct state
    }
  };

  const handleBookmark = async (blogId: string) => {
    const blogToUpdate = blogs.find((blog) => blog.id === blogId);
    if (!blogToUpdate) return;

    const isCurrentlyBookmarked = blogToUpdate.bookmarks.some(
      (bookmark) => bookmark.userId === session?.user.id
    );
   const optimisticBlog = {
     ...blogToUpdate,
     bookmarks: isCurrentlyBookmarked
       ? blogToUpdate.bookmarks.filter(
           (bookmark) => bookmark.userId !== session?.user.id
         )
       : [...blogToUpdate.bookmarks, { userId: session?.user.id ?? "" }],
   };

    addOptimisticBlog(optimisticBlog);

    try {
      await toggleBookmark(blogId);
      fetchBlogs(); // Refresh the blogs to get the updated state from the server
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
      fetchBlogs(); // Refresh the blogs to revert to the correct state
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
                  isLiked={blog.likes.some(
                    (like) => like.userId === session?.user.id
                  )}
                  isBookmarked={blog.bookmarks.some(
                    (bookmark) => bookmark.userId === session?.user.id
                  )}
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
