"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  Feather,
  Zap,
  Menu,
  ChevronLeft,
  ChevronRight,
  Plus,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

export default function Landing() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-blue-900/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link
              href="/"
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:opacity-80 transition-opacity"
            >
              Scribe
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Button
                variant="ghost"
                onClick={() => router.push("/auth")}
                className="text-gray-300 hover:text-white hover:bg-blue-500/10 transition-all duration-300 relative group"
              >
                Sign In
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 relative overflow-hidden group">
                <span className="relative z-10">Sign Up Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-800 group-hover:opacity-0 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </div>
            <Button
              variant="ghost"
              className="md:hidden text-gray-300 hover:text-white hover:bg-blue-500/10"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-44">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-black to-black opacity-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-blue-900/5 to-transparent"></div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="text-center">
            <div className="inline-block animate-float">
              <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6">
                Transform Your Ideas Into Reality
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 animate-gradient">
                Unleash Your Thoughts
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
              Where ideas come to life and stories unfold. Join our community of
              passionate writers and readers.
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white text-lg py-6 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 group">
              Start Writing
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-800/20 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            Why Choose Our Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Feather className="h-10 w-10 text-blue-500" />}
              title="Easy to Use"
              description="Intuitive interface designed for writers of all levels."
            />
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-blue-400" />}
              title="Fast Performance"
              description="Lightning-fast load times for a seamless writing experience."
            />
            <FeatureCard
              icon={<Feather className="h-10 w-10 text-blue-500" />}
              title="Wide Readership"
              description="Connect with a global audience passionate about great content."
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12">
            You asked, we answered.
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border-blue-900/20">
                <AccordionTrigger className="text-lg hover:text-blue-400 transition-colors">
                  Does it cost money to start a blog?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  No, you can start a blog completely free of charge. We offer a
                  generous free tier that includes all essential features you
                  need to begin your blogging journey.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-blue-900/20">
                <AccordionTrigger className="text-lg hover:text-blue-400 transition-colors">
                  Will I have to pay for a custom domain name?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  While we provide free subdomains, custom domain names are
                  available as a paid feature. This gives you more professional
                  branding and control over your blog's identity.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-blue-900/20">
                <AccordionTrigger className="text-lg hover:text-blue-400 transition-colors">
                  How do bloggers earn money?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  Bloggers can earn through various methods including
                  advertising, sponsored content, affiliate marketing, digital
                  products, and premium subscriptions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0 text-lg">
              © 2025 Scribe. All rights reserved.
            </div>
            <nav>
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors hover:text-blue-400"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors hover:text-blue-400"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors hover:text-blue-400"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors hover:text-blue-400"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:to-blue-600/10 transition-all duration-300"></div>
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-semibold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-blue-600 transition-all duration-300">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg group-hover:from-blue-600 group-hover:to-blue-800 transition-all duration-300">
            {icon}
          </div>
          <span className="ml-3">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 group-hover:text-white transition-all duration-300">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
