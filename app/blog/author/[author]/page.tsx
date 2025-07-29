import { getBlogPosts } from "@/lib/blog-posts"
import BlogPostCard from "@/components/blog-post-card"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { User, ArrowLeft, Calendar, BookOpen } from "lucide-react"

interface AuthorPageProps {
  params: {
    author: string
  }
}

export default function AuthorPage({ params }: AuthorPageProps) {
  const authorSlug = decodeURIComponent(params.author).replace(/-/g, " ")
  const allPosts = getBlogPosts()

 
  const authorPosts = allPosts.filter((post) => post.author.toLowerCase() === authorSlug.toLowerCase())

  if (authorPosts.length === 0) {
    notFound()
  }

  
  const correctAuthorName = authorPosts[0].author

  
  const totalViews = authorPosts.reduce((sum, post) => sum + post.views, 0)
  const totalLikes = authorPosts.reduce((sum, post) => sum + post.likes, 0)
  const categories = Array.from(new Set(authorPosts.map((post) => post.category)))
  const tags = Array.from(new Set(authorPosts.flatMap((post) => post.tags)))

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      
      <div className="mb-8 space-y-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all posts
        </Link>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{correctAuthorName}</h1>
            <p className="text-xl text-muted-foreground mt-2">
              Author • {authorPosts.length} {authorPosts.length === 1 ? "post" : "posts"}
            </p>

            
            <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {totalViews.toLocaleString()} total views
              </div>
              <div className="flex items-center gap-1">
                <span>❤️</span>
                {totalLikes} total likes
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {categories.length} {categories.length === 1 ? "category" : "categories"}
              </div>
            </div>
          </div>
        </div>
      </div>


      {categories.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Categories by {correctAuthorName}</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link key={category} href={`/blog/category/${encodeURIComponent(category.toLowerCase())}`}>
                <Badge
                  variant="secondary"
                  className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                >
                  {category}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {authorPosts.map((post, index) => (
          <BlogPostCard key={post.slug} post={post} index={index} />
        ))}
      </div>

      
      {tags.length > 0 && (
        <div className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-4">Popular Tags by {correctAuthorName}</h2>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 15).map((tag) => (
              <Link key={tag} href={`/blog/tag/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, "-"))}`}>
                <Badge
                  variant="outline"
                  className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                >
                  #{tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
