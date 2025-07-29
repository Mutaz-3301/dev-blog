"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Eye, User } from "lucide-react"
import type { BlogPost } from "@/lib/blog-posts"
import { motion } from "framer-motion"

interface BlogPostCardProps {
  post: BlogPost
  index: number
}

export default function BlogPostCard({ post, index }: BlogPostCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-200 group">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-2">
            <Link href={`/blog/category/${encodeURIComponent(post.category.toLowerCase())}`}>
              <Badge
                variant="secondary"
                className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
              >
                {post.category}
              </Badge>
            </Link>
            <span className="text-xs text-muted-foreground">{post.date}</span>
          </div>
          <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
            <Link href={`/blog/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            By{" "}
            <Link
              href={`/blog/author/${encodeURIComponent(post.author.toLowerCase().replace(/\s+/g, "-"))}`}
              className="hover:text-primary hover:underline transition-colors inline-flex items-center gap-1"
            >
              <User className="h-3 w-3" />
              {post.author}
            </Link>
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow flex flex-col justify-between">
          <Link href={`/blog/${post.slug}`} className="block mb-4">
            <p className="text-base text-gray-700 dark:text-gray-300 line-clamp-3 hover:text-primary transition-colors">
              {post.description}
            </p>
          </Link>

          
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                  <Heart className="h-4 w-4" />
                  {post.likes}
                </div>
                <Link
                  href={`/blog/${post.slug}#comments`}
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  {post.comments.length}
                </Link>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {post.views.toLocaleString()}
                </div>
              </div>
            </div>

            
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 3).map((tag) => (
                  <Link key={tag} href={`/blog/tag/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, "-"))}`}>
                    <Badge
                      variant="outline"
                      className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                    >
                      #{tag}
                    </Badge>
                  </Link>
                ))}
                {post.tags.length > 3 && (
                  <Link href={`/blog/${post.slug}`}>
                    <Badge
                      variant="outline"
                      className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                    >
                      +{post.tags.length - 3} more
                    </Badge>
                  </Link>
                )}
              </div>
            )}

            
            <Link href={`/blog/${post.slug}`} className="block">
              <Button
                variant="outline"
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
              >
                Read More
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
