"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { Search, SquarePen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { createBlog } from "@/actions/serverations";

interface HeaderProps {
  onFilterChange: (filter: "all" | "liked" | "bookmarked") => void;
  onSearch: (query: string) => void;
}

export default function Header({ onFilterChange, onSearch }: HeaderProps) {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateBlogOpen, setIsCreateBlogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Uncategorized",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      console.error("User not authenticated");
      return;
    }
    try {
      await createBlog({
        ...formData,
        authorId: session.user.id,
      });
      setIsCreateBlogOpen(false);
      setFormData({ title: "", description: "", category: "Uncategorized" });
      // You may want to add some feedback to the user here, like a toast notification
    } catch (error) {
      console.error("Error creating blog:", error);
      // You may want to show an error message to the user here
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center space-x-5">
          <Link href="/" className="flex items-center">
            <span className="font-bold">BlogVerse</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
            <NavLink href="/" onClick={() => onFilterChange("all")}>
              Home
            </NavLink>
            <NavLink href="/like" onClick={() => onFilterChange("liked")}>
              Like
            </NavLink>
            <NavLink
              href="/bookmarks"
              onClick={() => onFilterChange("bookmarked")}
            >
              Bookmarks
            </NavLink>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <SearchForm
            onSubmit={handleSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <CreateBlogDialog
            isOpen={isCreateBlogOpen}
            setIsOpen={setIsCreateBlogOpen}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          <UserAvatar session={session} />
        </div>
      </div>
    </div>
  );
}

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      className="text-muted-foreground hover:text-foreground transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

function SearchForm({
  onSubmit,
  searchQuery,
  setSearchQuery,
}: {
  onSubmit: (e: React.FormEvent) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="hidden md:block">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search articles..."
          className="pl-8 w-[200px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </form>
  );
}

function CreateBlogDialog({
  isOpen,
  setIsOpen,
  formData,
  handleChange,
  handleSubmit,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  formData: { title: string; description: string; category: string };
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
          <SquarePen className="h-5 w-5" />
          <span className="sr-only">Create Blog</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Create Blog</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-input bg-transparent"
              placeholder="Enter blog title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="min-h-[100px] w-full rounded-lg border border-input bg-transparent"
              placeholder="Enter blog description"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">
              Category
            </Label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-input bg-transparent"
              required
            >
              <option value="Uncategorized">Uncategorized</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Food">Food</option>
              <option value="Sports">Sports</option>
            </select>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full">
              Create Blog
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function UserAvatar({ session }: { session: any }) {
  return (
    <Avatar>
      <AvatarImage
        src={session?.user?.image ?? "https://github.com/shadcn.png"}
        alt={session?.user?.name ?? "User avatar"}
      />
      <AvatarFallback>
        {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "U"}
      </AvatarFallback>
    </Avatar>
  );
}
