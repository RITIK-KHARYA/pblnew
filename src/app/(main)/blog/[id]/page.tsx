"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  readTime: string;
}

export default function BlogPost() {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating an API call to fetch blog data
    const fetchBlog = async () => {
      setIsLoading(true);
      // In a real application, you would fetch the blog data here
      // For now, we'll use a timeout to simulate a network request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setBlog({
        id: id as string,
        title: "The Future of Artificial Intelligence",
        content: `
          <p>Artificial Intelligence (AI) has been rapidly evolving, transforming industries and reshaping our daily lives. As we stand on the brink of a new era, it's crucial to explore the potential future developments in AI and their implications for society.</p>
          
          <h2>Machine Learning Advancements</h2>
          <p>Machine Learning, a subset of AI, has seen tremendous growth in recent years. Deep learning models are becoming increasingly sophisticated, capable of handling complex tasks with human-like efficiency. In the future, we can expect even more powerful algorithms that can learn from smaller datasets and adapt to new situations more quickly.</p>
          
          <h2>AI in Healthcare</h2>
          <p>The healthcare industry stands to benefit greatly from AI advancements. From early disease detection to personalized treatment plans, AI has the potential to revolutionize patient care. We may see AI-powered diagnostic tools that can detect diseases at earlier stages than ever before, leading to better outcomes and reduced healthcare costs.</p>
          
          <h2>Ethical Considerations</h2>
          <p>As AI becomes more prevalent, ethical considerations become increasingly important. Issues such as data privacy, algorithmic bias, and the impact of AI on employment need to be addressed. It's crucial that we develop AI systems that are transparent, fair, and aligned with human values.</p>
          
          <h2>The Future of Work</h2>
          <p>AI will continue to transform the job market, automating routine tasks and creating new roles that we can't yet imagine. While some jobs may become obsolete, AI will also create new opportunities. The key will be to ensure that our workforce is prepared for this shift through education and reskilling programs.</p>
          
          <h2>Conclusion</h2>
          <p>The future of AI is both exciting and challenging. As we continue to push the boundaries of what's possible, it's important that we approach AI development with careful consideration of its broader implications. By doing so, we can harness the power of AI to create a better future for all.</p>
        `,
        image: "/placeholder.svg?height=600&width=1200",
        author: {
          name: "Jane Doe",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        createdAt: "2023-06-15T10:00:00Z",
        readTime: "5 min read",
      });
      setIsLoading(false);
    };

    fetchBlog();
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">Blog post not found</div>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto my-8">
      <article className="p-6">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <div className="flex items-center mb-4">
          <Avatar className="mr-2">
            <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
            <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{blog.author.name}</p>
            <p className="text-sm text-gray-500">
              {new Date(blog.createdAt).toLocaleDateString()} · {blog.readTime}
            </p>
          </div>
        </div>
        <Image
          src={blog.image || "/placeholder.svg"}
          alt={blog.title}
          width={1200}
          height={600}
          className="w-full h-auto mb-8 rounded-lg"
        />
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        <div className="mt-8 flex justify-between items-center">
          <Button variant="outline">Share</Button>
          <Button>Subscribe</Button>
        </div>
      </article>
    </Card>
  );
}
